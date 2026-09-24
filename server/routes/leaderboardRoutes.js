// ==========================================
// FEATURE: Leaderboard Routes
// ==========================================

const express = require('express');
const LeaderboardController = require('../controllers/leaderboardController');

const router = express.Router();
const leaderboardController = new LeaderboardController();

router.get('/leaderboard', (req, res) => leaderboardController.getLeaderboard(req, res));

module.exports = router;