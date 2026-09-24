// ==========================================
// FEATURE: Advertisement Routes
// ==========================================

const express = require('express');
const AdvertisementController = require('../controllers/advertisementController');

const router = express.Router();
const advertisementController = new AdvertisementController();

// Public routes
router.get('/advertisements', (req, res) => advertisementController.getAdvertisements(req, res));
router.get('/advertisements/active', (req, res) => advertisementController.getActiveAdvertisements(req, res));
router.post('/advertisement/:id/click', (req, res) => advertisementController.recordClick(req, res));

// Admin routes
router.post('/admin/advertisement/create', (req, res) => advertisementController.createAdvertisement(req, res));
router.get('/admin/advertisements', (req, res) => advertisementController.getAllAdvertisements(req, res));
router.put('/admin/advertisement/:id/toggle', (req, res) => advertisementController.toggleAdvertisement(req, res));
router.delete('/admin/advertisement/:id', (req, res) => advertisementController.deleteAdvertisement(req, res));

module.exports = router;
