// ==========================================
// FEATURE: Community Routes
// ==========================================

const express = require('express');
const communityController = require('../controllers/communityController');

const router = express.Router();

// Public routes
router.get('/community/threads', communityController.getAllThreads);
router.get('/community/thread/:id', communityController.getThreadById);

// User routes
router.post('/community/thread/create', communityController.createThread);
router.post('/community/thread/:id/upvote', communityController.upvoteThread);
router.post('/community/comment/create', communityController.createComment);
router.post('/community/comment/:id/upvote', communityController.upvoteComment);

module.exports = router;