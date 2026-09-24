// ==========================================
// FEATURE: Marketplace Routes
// ==========================================

const express = require('express')
const marketplaceController = require('../controllers/marketplaceController')
const { requireUser } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/listing/create', marketplaceController.createListing)
router.get('/listings', marketplaceController.getListings)
router.get('/listing/:id', marketplaceController.getListing)
router.post('/listing/buy', requireUser, marketplaceController.buyListing)
router.post('/listing/:id/review', requireUser, marketplaceController.submitReview)
router.get('/listing/:id/reviews', marketplaceController.getReviews)

module.exports = router