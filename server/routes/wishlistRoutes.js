// ==========================================
// FEATURE: Wishlist Routes
// ==========================================

const express = require('express')
const wishlistController = require('../controllers/wishlistController')
const { requireUser, requireAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/wishlist/add', requireUser, wishlistController.addWishlist)
router.get('/user/wishlist', requireUser, wishlistController.getWishlist)
router.delete('/wishlist/:id', requireUser, wishlistController.removeWishlist)
router.get('/admin/wishlists', requireAdmin, wishlistController.getAdminWishlists)

module.exports = router