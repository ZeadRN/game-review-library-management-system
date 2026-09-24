// ==========================================
// FEATURE: Leaderboard Model
// ==========================================

const { query } = require('../config/db');

class LeaderboardModel {
    async getLeaderboard() {
        return query(`
            SELECT user_id, username, total_sales, 
                   (SELECT COUNT(*) FROM Game_Listing WHERE seller_id = u.user_id AND status = 'SOLD') as games_sold
            FROM User u 
            WHERE total_sales > 0 
            ORDER BY total_sales DESC 
            LIMIT 50
        `);
    }
}

module.exports = new LeaderboardModel();