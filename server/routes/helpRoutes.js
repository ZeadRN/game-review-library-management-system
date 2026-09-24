// ==========================================
// FEATURE: Help Routes
// ==========================================

const express = require('express');
const helpController = require('../controllers/helpController');

const router = express.Router();

// Public/user routes
router.get('/help/questions', helpController.getAllQuestions);
router.get('/help/chat-history', helpController.getChatHistory);
router.post('/help/chat', helpController.sendChatMessage);
router.post('/help/ask', helpController.askQuestion);
router.get('/help/chat/:userId', helpController.getUserChat);

// Admin routes
router.get('/admin/chat-users', helpController.getChatUsers);
router.get('/admin/chat-messages', helpController.getAllChatMessages);
router.post('/admin/chat/:messageId/reply', helpController.replyToMessage);
router.get('/admin/help-questions', helpController.getAdminQuestions);
router.post('/admin/answer-question', helpController.answerQuestion);

module.exports = router;