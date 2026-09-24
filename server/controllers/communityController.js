// ==========================================
// FEATURE: Community Controller
// ==========================================

const communityModel = require('../models/communityModel');
const NotificationController = require('./notificationController');

async function getAllThreads(req, res) {
    const { sort } = req.query;

    try {
        const threads = await communityModel.getAllThreads(sort);
        res.json({ success: true, threads });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching threads' });
    }
}

async function getThreadById(req, res) {
    const threadId = req.params.id;

    try {
        const threads = await communityModel.getThreadById(threadId);
        if (threads.length === 0) {
            return res.status(404).json({ success: false, message: 'Thread not found' });
        }

        const comments = await communityModel.getThreadComments(threadId);

        let userUpvoted = false;
        if (req.session.user) {
            userUpvoted = await communityModel.checkUserThreadUpvote(threadId, req.session.user.id);
        }

        res.json({ success: true, thread: threads[0], comments, userUpvoted });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching thread' });
    }
}

async function createThread(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    const { title, content } = req.body;

    try {
        const result = await communityModel.createThread(title, content, req.session.user.id);
        res.json({ success: true, message: 'Thread created', threadId: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating thread' });
    }
}

async function upvoteThread(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    const threadId = req.params.id;

    try {
        const existing = await communityModel.checkUserThreadUpvote(threadId, req.session.user.id);

        if (existing) {
            await communityModel.removeThreadUpvote(threadId, req.session.user.id);
            res.json({ success: true, action: 'removed' });
        } else {
            await communityModel.addThreadUpvote(threadId, req.session.user.id);
            res.json({ success: true, action: 'added' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error upvoting' });
    }
}

async function createComment(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    const { threadId, commentText } = req.body;

    try {
        await communityModel.createComment(threadId, commentText, req.session.user.id);

        const thread = await communityModel.getThreadAuthor(threadId);
        if (thread && thread.user_id !== req.session.user.id) {
            await NotificationController.sendNotification(req, thread.user_id, 'COMMENT',
                'New Comment',
                `Someone commented on your thread "${thread.title}"`,
                '/user-dashboard'
            );
        }

        res.json({ success: true, message: 'Comment added' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error adding comment' });
    }
}

async function upvoteComment(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    const commentId = req.params.id;

    try {
        const existing = await communityModel.checkUserCommentUpvote(commentId, req.session.user.id);

        if (existing) {
            await communityModel.removeCommentUpvote(commentId, req.session.user.id);
            res.json({ success: true, action: 'removed' });
        } else {
            await communityModel.addCommentUpvote(commentId, req.session.user.id);
            res.json({ success: true, action: 'added' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error upvoting' });
    }
}

module.exports = {
    getAllThreads,
    getThreadById,
    createThread,
    upvoteThread,
    createComment,
    upvoteComment
};