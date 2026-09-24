// ==========================================
// FEATURE: Advertisement Controller
// ==========================================

const advertisementModel = require('../models/advertisementModel');

class AdvertisementController {
    // GET /api/advertisements
    async getAdvertisements(req, res) {
        const { position } = req.query;

        try {
            const ads = await advertisementModel.getActiveAdvertisements(position);
            res.json({ success: true, ads, advertisements: ads });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error fetching ads' });
        }
    }

    // GET /api/advertisements/active
    async getActiveAdvertisements(req, res) {
        const { position } = req.query;

        try {
            const ads = await advertisementModel.getActiveAdvertisements(position);
            res.json({ success: true, ads, advertisements: ads });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error fetching ads' });
        }
    }

    // POST /api/advertisement/:id/click
    async recordClick(req, res) {
        try {
            await advertisementModel.recordClick(req.params.id);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ success: false });
        }
    }

    // POST /api/admin/advertisement/create
    async createAdvertisement(req, res) {
        if (!req.session.user || req.session.user.type !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }

        const { title, description, imageUrl, linkUrl, listingId, position, startDate, endDate } = req.body;

        try {
            await advertisementModel.createAdvertisement(title, imageUrl, linkUrl, listingId, position, startDate, endDate);
            res.json({ success: true, message: 'Advertisement created' });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error creating advertisement' });
        }
    }

    // GET /api/admin/advertisements
    async getAllAdvertisements(req, res) {
        if (!req.session.user || req.session.user.type !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }

        try {
            const ads = await advertisementModel.getAllAdvertisements();
            res.json({ success: true, ads, advertisements: ads });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error fetching ads' });
        }
    }

    // PUT /api/admin/advertisement/:id/toggle
    async toggleAdvertisement(req, res) {
        if (!req.session.user || req.session.user.type !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }

        try {
            await advertisementModel.toggleAdvertisement(req.params.id);
            res.json({ success: true, message: 'Advertisement toggled' });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error toggling ad' });
        }
    }

    // DELETE /api/admin/advertisement/:id
    async deleteAdvertisement(req, res) {
        if (!req.session.user || req.session.user.type !== 'admin') {
            return res.status(403).json({ success: false, message: 'Admin access required' });
        }

        try {
            await advertisementModel.deleteAdvertisement(req.params.id);
            res.json({ success: true, message: 'Advertisement deleted' });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Error deleting advertisement' });
        }
    }
}

module.exports = AdvertisementController;