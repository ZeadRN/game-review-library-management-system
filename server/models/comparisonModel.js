// ==========================================
// FEATURE: Comparison Model
// ==========================================

const { query } = require('../config/db');

class ComparisonModel {
    async getComparedGames(listingIds) {
        const placeholders = listingIds.map(() => '?').join(',');
        return query(`
            SELECT l.listing_id, l.seller_id, l.category_id, l.game_name, l.description,
                   l.price, l.stock_quantity, l.trailer_url, l.screenshots,
                   l.rating_avg, l.rating_count, l.view_count, l.status,
                   l.admin_approved, l.featured, l.created_at,
                   c.name as category_name, COALESCE(u.username, 'Admin Store') as seller_name
            FROM Game_Listing l 
            LEFT JOIN Game_Category c ON l.category_id = c.category_id
            LEFT JOIN User u ON l.seller_id = u.user_id
            WHERE l.listing_id IN (${placeholders})
              AND l.admin_approved = true
              AND l.status IN ('AVAILABLE', 'OUT_OF_STOCK')
            ORDER BY FIELD(l.listing_id, ${placeholders})
        `, [...listingIds, ...listingIds]);
    }
}

module.exports = new ComparisonModel();
