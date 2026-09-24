// ==========================================
// FEATURE: Marketplace Model
// ==========================================

const { query } = require('../config/db')

async function createListing(userId, payload) {
    const { gameName, description, price, gameKey, categoryId, trailerUrl, screenshots, stockQuantity } = payload

    return query(
        `INSERT INTO Game_Listing (seller_id, game_name, description, price, game_key, stock_quantity, category_id, trailer_url, screenshots) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, gameName, description, price, gameKey, stockQuantity || 1, categoryId || null, trailerUrl || null, JSON.stringify(screenshots || [])]
    )
}

async function fetchListings(filters) {
    const { category, minPrice, maxPrice, sort, search, featured } = filters

    let sql = `
        SELECT l.*, COALESCE(u.username, 'Admin Store') as seller_name, c.name as category_name, c.icon as category_icon
        FROM Game_Listing l 
        LEFT JOIN User u ON l.seller_id = u.user_id 
        LEFT JOIN Game_Category c ON l.category_id = c.category_id
        WHERE l.admin_approved = true AND (l.status = 'AVAILABLE' OR l.status = 'OUT_OF_STOCK')
    `
    const params = []

    if (category) {
        sql += ' AND l.category_id = ?'
        params.push(category)
    }
    if (minPrice) {
        sql += ' AND l.price >= ?'
        params.push(minPrice)
    }
    if (maxPrice) {
        sql += ' AND l.price <= ?'
        params.push(maxPrice)
    }
    if (search) {
        sql += ' AND (l.game_name LIKE ? OR l.description LIKE ?)'
        params.push(`%${search}%`, `%${search}%`)
    }
    if (featured === 'true') {
        sql += ' AND l.featured = true'
    }

    switch (sort) {
        case 'price_low':
            sql += ' ORDER BY l.price ASC'
            break
        case 'price_high':
            sql += ' ORDER BY l.price DESC'
            break
        case 'rating':
            sql += ' ORDER BY l.rating_avg DESC'
            break
        case 'popular':
            sql += ' ORDER BY l.view_count DESC'
            break
        default:
            sql += ' ORDER BY l.featured DESC, l.created_at DESC'
    }

    return query(sql, params)
}

async function incrementViewCount(listingId) {
    return query('UPDATE Game_Listing SET view_count = view_count + 1 WHERE listing_id = ?', [listingId])
}

async function fetchListingById(listingId) {
    return query(
        `SELECT l.*, COALESCE(u.username, 'Admin Store') as seller_name, c.name as category_name
         FROM Game_Listing l 
         LEFT JOIN User u ON l.seller_id = u.user_id 
         LEFT JOIN Game_Category c ON l.category_id = c.category_id
         WHERE l.listing_id = ?`,
        [listingId]
    )
}

async function fetchReviews(listingId) {
    return query(
        `SELECT r.*, u.username 
         FROM Game_Review r 
         JOIN User u ON r.user_id = u.user_id 
         WHERE r.listing_id = ? 
         ORDER BY r.created_at DESC`,
        [listingId]
    )
}

async function fetchPurchases(userId, listingId) {
    return query('SELECT * FROM Purchase WHERE buyer_id = ? AND listing_id = ?', [userId, listingId])
}

async function fetchActiveSubscription(userId) {
    return query("SELECT * FROM Subscription WHERE user_id = ? AND status = 'ACTIVE'", [userId])
}

async function fetchUserBalance(userId) {
    return query('SELECT balance FROM User WHERE user_id = ?', [userId])
}

async function updateListingInventory(listingId, newStock, newStatus) {
    return query('UPDATE Game_Listing SET stock_quantity = ?, status = ? WHERE listing_id = ?', [newStock, newStatus, listingId])
}

async function updateUserBalance(userId, amount) {
    return query('UPDATE User SET balance = balance - ? WHERE user_id = ?', [amount, userId])
}

async function creditSellerBalance(userId, amount) {
    return query('UPDATE User SET balance = balance + ? WHERE user_id = ?', [amount, userId])
}

async function createPurchase(userId, listingId, finalPrice, originalPrice, discount) {
    return query(
        'INSERT INTO Purchase (buyer_id, listing_id, purchase_price, original_price, discount_applied) VALUES (?, ?, ?, ?, ?)',
        [userId, listingId, finalPrice, originalPrice, discount]
    )
}

async function upsertReview(listingId, userId, rating, reviewText) {
    return query(
        'INSERT INTO Game_Review (listing_id, user_id, rating, review_text) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?, review_text = ?',
        [listingId, userId, rating, reviewText, rating, reviewText]
    )
}

module.exports = {
    createListing,
    fetchListings,
    incrementViewCount,
    fetchListingById,
    fetchReviews,
    fetchPurchases,
    fetchActiveSubscription,
    fetchUserBalance,
    updateListingInventory,
    updateUserBalance,
    creditSellerBalance,
    createPurchase,
    upsertReview
}