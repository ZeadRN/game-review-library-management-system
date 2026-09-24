// ==========================================
// FEATURE: User Routes
// ==========================================

const express = require('express')
const userController = require('../controllers/userController')
const { requireUser } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/profile', requireUser, userController.getProfile)
router.put('/profile', requireUser, userController.updateProfile)
router.delete('/account', requireUser, userController.deleteAccount)
router.get('/purchases', requireUser, userController.getPurchases)
router.get('/my-listings', requireUser, userController.getListings)
router.get('/notifications', requireUser, userController.getNotifications)
router.put('/notification/:id/read', requireUser, userController.markNotificationRead)
router.put('/notifications/read-all', requireUser, userController.markAllNotificationsRead)

module.exports = router