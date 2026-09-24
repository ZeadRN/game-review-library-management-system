// ==========================================
// FEATURE: Balance Model
// ==========================================

const { query } = require('../config/db');

class BalanceModel {
    async createBalanceRequest(userId, amount) {
        return query('INSERT INTO Balance_Request (user_id, amount) VALUES (?, ?)', [userId, amount]);
    }

    async getUserBalanceRequests(userId) {
        return query('SELECT * FROM Balance_Request WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    }
}

module.exports = new BalanceModel();