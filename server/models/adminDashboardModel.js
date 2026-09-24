// ==========================================
// FEATURE: Admin Dashboard Model
// ==========================================

const { query } = require('../config/db');

class AdminDashboardModel {
    async getTotalUsers() {
        const [result] = await query('SELECT COUNT(*) as count FROM User');
        return result.count;
    }

    async getTotalListings() {
        const [result] = await query('SELECT COUNT(*) as count FROM Game_Listing');
        return result.count;
    }

    async getPendingApprovals() {
        const [result] = await query('SELECT COUNT(*) as count FROM Game_Listing WHERE admin_approved = false');
        return result.count;
    }

    async getTotalPurchases() {
        const [result] = await query('SELECT COUNT(*) as count, SUM(purchase_price) as revenue FROM Purchase');
        return { count: result.count, revenue: result.revenue || 0 };
    }

    async getActiveSubscriptions() {
        const [result] = await query("SELECT COUNT(*) as count FROM Subscription WHERE status = 'ACTIVE'");
        return result.count;
    }

    async getPendingBalanceRequests() {
        const [result] = await query("SELECT COUNT(*) as count FROM Balance_Request WHERE status = 'PENDING'");
        return result.count;
    }

    async getUnansweredQuestions() {
        const [result] = await query('SELECT COUNT(*) as count FROM Help_Question WHERE answer IS NULL');
        return result.count;
    }

    async getAllListings() {
        return query(`
            SELECT l.*, u.username as seller_name, c.name as category_name
            FROM Game_Listing l 
            LEFT JOIN User u ON l.seller_id = u.user_id 
            LEFT JOIN Game_Category c ON l.category_id = c.category_id
            ORDER BY l.admin_approved ASC, l.created_at DESC
        `);
    }

    async getListingById(listingId) {
        return query('SELECT * FROM Game_Listing WHERE listing_id = ?', [listingId]);
    }

    async updateListingApproval(listingId, approve) {
        return query('UPDATE Game_Listing SET admin_approved = ? WHERE listing_id = ?', [approve, listingId]);
    }

    async getWishlistsByGameName(gameName) {
        return query(
            'SELECT w.*, u.username FROM Wishlist w JOIN User u ON w.user_id = u.user_id WHERE LOWER(w.game_name) LIKE LOWER(?) AND w.notified = false',
            [`%${gameName}%`]
        );
    }

    async updateWishlistNotification(wishlistId, listingId) {
        return query('UPDATE Wishlist SET listing_id = ?, notified = true WHERE wishlist_id = ?', [listingId, wishlistId]);
    }

    async getAllBalanceRequests() {
        return query(`
            SELECT br.*, u.username, u.email 
            FROM Balance_Request br 
            JOIN User u ON br.user_id = u.user_id 
            ORDER BY CASE WHEN br.status = 'PENDING' THEN 1 ELSE 2 END, br.created_at DESC
        `);
    }

    async getBalanceRequestById(requestId) {
        return query('SELECT * FROM Balance_Request WHERE request_id = ?', [requestId]);
    }

    async updateBalanceRequestStatus(requestId, status, processedBy) {
        return query(
            'UPDATE Balance_Request SET status = ?, processed_at = NOW(), processed_by = ? WHERE request_id = ?',
            [status, processedBy, requestId]
        );
    }

    async addUserBalance(userId, amount) {
        return query('UPDATE User SET balance = balance + ? WHERE user_id = ?', [amount, userId]);
    }

    async createAdminListing(gameName, description, price, gameKey, stockQuantity, categoryId, trailerUrl, screenshots) {
        return query(
            `INSERT INTO Game_Listing (seller_id, game_name, description, price, game_key, stock_quantity, category_id, trailer_url, screenshots, admin_approved, featured) 
             VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, true, true)`,
            [gameName, description, price, gameKey, stockQuantity || 10, categoryId || null, trailerUrl || null, JSON.stringify(screenshots || [])]
        );
    }
}

module.exports = new AdminDashboardModel();