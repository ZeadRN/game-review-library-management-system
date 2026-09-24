// ==========================================
// FEATURE: Help Controller
// ==========================================

const helpModel = require('../models/helpModel');
const NotificationController = require('./notificationController');

async function getAllQuestions(req, res) {
    try {
        const questions = await helpModel.getAllQuestions();
        res.json({ success: true, questions });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching questions' });
    }
}

async function getChatHistory(req, res) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Login required' });
    }

    try {
        const messages = await helpModel.getChatMessages(req.session.user.id);
        res.json({ success: true, messages });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching chat history' });
    }
}

async function sendChatMessage(req, res) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Login required' });
    }

    const { message } = req.body;

    if (!message || message.trim() === '') {
        return res.status(400).json({ success: false, message: 'Message cannot be empty' });
    }

    try {
        await helpModel.createChatMessage(req.session.user.id, message);
        res.json({ success: true, message: 'Message sent' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error sending message' });
    }
}

async function askQuestion(req, res) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Login required' });
    }

    const { question } = req.body;

    if (!question || question.trim() === '') {
        return res.status(400).json({ success: false, message: 'Question cannot be empty' });
    }

    try {
        await helpModel.createHelpQuestion(req.session.user.id, question);
        NotificationController.notifyAdmins(req, 'HELP', 'New Help Question', 'A user needs assistance');
        res.json({ success: true, message: 'Question submitted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error submitting question' });
    }
}

async function getUserChat(req, res) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'Login required' });
    }

    const userId = req.session.user.type === 'admin' ? req.params.userId : req.session.user.id;

    try {
        const messages = await helpModel.getChatMessages(userId);
        res.json({ success: true, messages });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching messages' });
    }
}

async function getChatUsers(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    try {
        const users = await helpModel.getChatUsers();
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
}

async function getAllChatMessages(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    try {
        const messages = await helpModel.getChatMessages();
        res.json({ success: true, messages });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching chat messages' });
    }
}

async function replyToMessage(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { reply } = req.body;

    if (!reply || reply.trim() === '') {
        return res.status(400).json({ success: false, message: 'Reply cannot be empty' });
    }

    try {
        const originalMessages = await helpModel.getOriginalMessage(req.params.messageId);

        if (originalMessages.length === 0) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        await helpModel.createAdminReply(
            originalMessages[0].user_id,
            req.session.user.id,
            reply
        );

        res.json({ success: true, message: 'Reply sent' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error sending reply' });
    }
}

async function getAdminQuestions(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    try {
        const questions = await helpModel.getHelpQuestions();
        res.json({ success: true, questions });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching questions' });
    }
}

async function answerQuestion(req, res) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' });
    }

    const { questionId, answer } = req.body;

    try {
        const questions = await helpModel.getQuestionById(questionId);
        if (questions.length === 0) {
            return res.status(404).json({ success: false, message: 'Question not found' });
        }

        await helpModel.answerQuestion(answer, req.session.user.id, questionId);

        await NotificationController.sendNotification(req, questions[0].user_id, 'SYSTEM',
            'Question Answered',
            'Your help question has been answered!',
            '/help'
        );

        res.json({ success: true, message: 'Answer submitted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error answering question' });
    }
}

module.exports = {
    getAllQuestions,
    getChatHistory,
    sendChatMessage,
    askQuestion,
    getUserChat,
    getChatUsers,
    getAllChatMessages,
    replyToMessage,
    getAdminQuestions,
    answerQuestion
};