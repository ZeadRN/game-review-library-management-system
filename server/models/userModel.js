// ==========================================
// FEATURE: User Model
// ==========================================

const { query } = require('../config/db')

async function findUserProfile(userId) {
    return query(
        `SELECT u.user_id, u.username, u.email, u.balance, u.is_restricted, 
                u.referral_code, u.language_preference, u.profile_picture, u.bio, u.total_sales, u.created_at,
                s.plan_type, s.status as subscription_status, s.discount_percentage, s.end_date as subscription_end
         FROM User u 
         LEFT JOIN Subscription s ON u.user_id = s.user_id AND s.status = 'ACTIVE'
         WHERE u.user_id = ?`,
        [userId]
    )
}

async function updateUserProfile(userId, bio, profilePicture, languagePreference) {
    return query(
        'UPDATE User SET bio = ?, profile_picture = ?, language_preference = ? WHERE user_id = ?',
        [bio, profilePicture, languagePreference, userId]
    )
}

async function deleteUserData(userId) {
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

async function findUserNotifications(userId) {
    return query(
        'SELECT * FROM Notification WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
        [userId]
    )
}

async function markNotificationRead(notificationId, userId) {
    return query('UPDATE Notification SET is_read = true WHERE notification_id = ? AND user_id = ?', [notificationId, userId])
}

async function markAllNotificationsRead(userId) {
    return query('UPDATE Notification SET is_read = true WHERE user_id = ?', [userId])
}

async function fetchUserPurchases(userId) {
    return query(`
        SELECT p.*, l.game_name, l.description, l.game_key, l.trailer_url, c.name as category_name
        FROM Purchase p 
        JOIN Game_Listing l ON p.listing_id = l.listing_id 
        LEFT JOIN Game_Category c ON l.category_id = c.category_id
        WHERE p.buyer_id = ? 
        ORDER BY p.purchase_date DESC
    `, [userId])
}

async function fetchUserListings(userId) {
    return query(`
        SELECT l.*, c.name as category_name
        FROM Game_Listing l
        LEFT JOIN Game_Category c ON l.category_id = c.category_id
        WHERE l.seller_id = ?
        ORDER BY l.created_at DESC
    `, [userId])
}

module.exports = {
    findUserProfile,
    updateUserProfile,
    deleteUserData,
    findUserNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    fetchUserPurchases,
    fetchUserListings
}