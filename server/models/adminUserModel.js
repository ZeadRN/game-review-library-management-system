// ==========================================
// FEATURE: Admin User Model
// ==========================================

const { query } = require('../config/db')

async function fetchAdminUsers() {
    return query(
        `SELECT u.user_id, u.username, u.email, u.balance, u.is_restricted, u.total_sales, u.created_at,
                s.plan_type, s.status as subscription_status
         FROM User u 
         LEFT JOIN Subscription s ON u.user_id = s.user_id AND s.status = 'ACTIVE'`
    )
}

async function setUserRestriction(userId, restrict) {
    return query('UPDATE User SET is_restricted = ? WHERE user_id = ?', [restrict, userId])
}

async function deleteUser(userId) {
    const deletes = [
        'DELETE FROM Notification WHERE user_id = ?',
        'DELETE FROM Chat_Message WHERE user_id = ?',
        'DELETE FROM Wishlist WHERE user_id = ?',
        'DELETE FROM Thread_Upvote WHERE user_id = ?',
        'DELETE FROM Comment_Upvote WHERE user_id = ?',
        'DELETE FROM Thread_Comment WHERE user_id = ?',
        'DELETE FROM Thread WHERE user_id = ?',
        'DELETE FROM Game_Review WHERE user_id = ?',
        'DELETE FROM Event_Registration WHERE user_id = ?',
        'DELETE FROM Subscription WHERE user_id = ?',
        'DELETE FROM Balance_Request WHERE user_id = ?',
        'DELETE FROM Help_Question WHERE user_id = ?',
        'DELETE FROM User WHERE user_id = ?'
    ]

    for (const sql of deletes) {
        await query(sql, [userId])
    }
}

module.exports = {
    fetchAdminUsers,
    setUserRestriction,
    deleteUser
}