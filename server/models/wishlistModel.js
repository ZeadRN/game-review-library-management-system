// ==========================================
// FEATURE: Wishlist Model
// ==========================================

const { query } = require('../config/db')

async function createWishlistEntry(userId, gameName, listingId) {
    return query(
        'INSERT INTO Wishlist (user_id, game_name, listing_id) VALUES (?, ?, ?)',
        [userId, gameName, listingId || null]
    )
}

async function fetchWishlist(userId) {
    return query(
        `SELECT w.*, l.price, l.status, l.admin_approved
         FROM Wishlist w 
         LEFT JOIN Game_Listing l ON w.listing_id = l.listing_id
         WHERE w.user_id = ? 
         ORDER BY w.created_at DESC`,
        [userId]
    )
}

async function deleteWishlistEntry(wishlistId, userId) {
    return query('DELETE FROM Wishlist WHERE wishlist_id = ? AND user_id = ?', [wishlistId, userId])
}

async function fetchAdminWishlists() {
    return query(`
        SELECT w.*, u.username, u.email 
        FROM Wishlist w 
        JOIN User u ON w.user_id = u.user_id 
        WHERE w.listing_id IS NULL
        ORDER BY w.created_at DESC
    `)
}

module.exports = {
    createWishlistEntry,
    fetchWishlist,
    deleteWishlistEntry,
    fetchAdminWishlists
}