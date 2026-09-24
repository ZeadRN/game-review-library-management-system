// ==========================================
// FEATURE: Notification Model
// ==========================================

const { query } = require('../config/db');

async function createNotification(userId, type, title, message, link) {
    return query(
        'INSERT INTO Notification (user_id, type, title, message, link) VALUES (?, ?, ?, ?, ?)',
        [userId, type, title, message, link]
    );
}

module.exports = {
    createNotification
};
