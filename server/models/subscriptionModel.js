// ==========================================
// FEATURE: Subscription Model
// ==========================================

const { query } = require('../config/db');

class SubscriptionModel {
    getPlans() {
        return [
            { type: 'MONTHLY', price: 9.99, discount: 20, features: ['20% off all purchases', 'Priority support', 'Early access to events'] },
            { type: 'YEARLY', price: 99.99, discount: 20, features: ['20% off all purchases', 'Priority support', 'Early access to events', '2 months free'] }
        ];
    }

    async getActiveSubscription(userId) {
        return query(
            `SELECT subscription_id, user_id, plan_type, status, discount_percentage, start_date, end_date, created_at
             FROM Subscription
             WHERE user_id = ? AND status = 'ACTIVE'
             ORDER BY created_at DESC
             LIMIT 1`,
            [userId]
        );
    }

    async checkExistingSubscription(userId) {
        const result = await query(
            "SELECT * FROM Subscription WHERE user_id = ? AND status = 'ACTIVE'",
            [userId]
        );
        return result.length > 0;
    }

    async getUserBalance(userId) {
        const result = await query('SELECT balance FROM User WHERE user_id = ?', [userId]);
        return result.length > 0 ? result[0].balance : 0;
    }

    async deductBalance(userId, amount) {
        return query('UPDATE User SET balance = balance - ? WHERE user_id = ?', [amount, userId]);
    }

    async createSubscription(userId, planType, endDate, discountPercentage) {
        return query(
            `INSERT INTO Subscription (user_id, plan_type, status, discount_percentage, start_date, end_date)
             VALUES (?, ?, 'ACTIVE', ?, NOW(), ?)`,
            [userId, planType, discountPercentage, endDate]
        );
    }

    async cancelSubscription(userId) {
        return query(
            "UPDATE Subscription SET status = 'CANCELLED' WHERE user_id = ? AND status = 'ACTIVE'",
            [userId]
        );
    }
}

module.exports = new SubscriptionModel();
