// ==========================================
// FEATURE: Admin Dashboard Routes
// ==========================================

const express = require('express');
const adminDashboardController = require('../controllers/adminDashboardController');

const router = express.Router();

router.get('/admin/stats', adminDashboardController.getStats);
router.get('/admin/listings', adminDashboardController.getAllListings);
router.post('/admin/approve-listing', adminDashboardController.approveListing);
router.get('/admin/balance-requests', adminDashboardController.getBalanceRequests);
router.post('/admin/process-balance-request', adminDashboardController.processBalanceRequest);
router.post('/admin/create-listing', adminDashboardController.createListing);

module.exports = router;