// ==========================================
// FEATURE: Leaderboard Controller
// ==========================================

const leaderboardModel = require('../models/leaderboardModel');

class LeaderboardController {
    // GET /api/leaderboard
    async getLeaderboard(req, res) {
        try {
            const leaderboard = await leaderboardModel.getLeaderboard();
            res.json({ success: true, leaderboard });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error fetching leaderboard' });
        }
    }
}

module.exports = LeaderboardController;