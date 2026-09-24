// ==========================================
// FEATURE: Comparison Controller
// ==========================================

const comparisonModel = require('../models/comparisonModel');

class ComparisonController {
    getListingIds(value) {
        if (!Array.isArray(value)) return [];
        return [...new Set(value.map(Number).filter(Number.isInteger))];
    }

    // POST /api/games/compare
    async compareGamesPost(req, res) {
        const listingIds = this.getListingIds(req.body.listingIds);

        if (!listingIds || listingIds.length < 2 || listingIds.length > 4) {
            return res.status(400).json({ success: false, message: 'Select 2-4 games to compare' });
        }

        try {
            const games = await comparisonModel.getComparedGames(listingIds);
            res.json({ success: true, games });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error comparing games' });
        }
    }

    // GET /api/compare
    async compareGamesGet(req, res) {
        const { ids } = req.query;
        const listingIds = this.getListingIds(ids ? ids.split(',') : []);

        if (listingIds.length < 2 || listingIds.length > 4) {
            return res.status(400).json({ success: false, message: 'Select 2-4 games to compare' });
        }

        try {
            const games = await comparisonModel.getComparedGames(listingIds);
            res.json({ success: true, games });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error comparing games' });
        }
    }
}

module.exports = ComparisonController;
