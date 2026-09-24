// ==========================================
// FEATURE: Advertisement Model
// ==========================================

const { query } = require('../config/db');

function normalizeImageUrl(url) {
    if (!url || typeof url !== 'string') return null;
    const trimmed = url.trim();

    // Convert common shared links into direct image links.
    const driveMatch = trimmed.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
    if (driveMatch) {
        return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
    }

    if (/dropbox\.com/i.test(trimmed)) {
        return trimmed.replace('?dl=0', '?raw=1').replace('?dl=1', '?raw=1');
    }

    return trimmed;
}

class AdvertisementModel {
    async getActiveAdvertisements(position = null) {
        let sql = `
            SELECT a.*, l.game_name 
            FROM Advertisement a 
            LEFT JOIN Game_Listing l ON a.listing_id = l.listing_id
            WHERE a.is_active = true 
            AND (a.start_date IS NULL OR a.start_date <= NOW()) 
            AND (a.end_date IS NULL OR a.end_date >= NOW())
        `;
        const params = [];

        if (position) {
            sql += ' AND a.position = ?';
            params.push(position);
        }

        sql += ' ORDER BY RAND()';
        return query(sql, params);
    }

    async recordClick(adId) {
        return query('UPDATE Advertisement SET click_count = click_count + 1 WHERE ad_id = ?', [adId]);
    }

    async createAdvertisement(title, imageUrl, linkUrl, listingId, position, startDate, endDate) {
        const finalImageUrl = normalizeImageUrl(imageUrl) || `https://via.placeholder.com/1200x300/4f46e5/ffffff?text=${encodeURIComponent(title || 'Advertisement')}`;

        return query(
            `INSERT INTO Advertisement (title, image_url, link_url, listing_id, position, start_date, end_date) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title, finalImageUrl, linkUrl || '/', listingId || null, position || 'TOP', startDate || null, endDate || null]
        );
    }

    async getAllAdvertisements() {
        return query('SELECT * FROM Advertisement ORDER BY created_at DESC');
    }

    async toggleAdvertisement(adId) {
        return query('UPDATE Advertisement SET is_active = NOT is_active WHERE ad_id = ?', [adId]);
    }

    async deleteAdvertisement(adId) {
        return query('DELETE FROM Advertisement WHERE ad_id = ?', [adId]);
    }
}

module.exports = new AdvertisementModel();