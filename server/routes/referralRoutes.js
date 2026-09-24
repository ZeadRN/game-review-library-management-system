// ==========================================
// FEATURE: Referral Routes
// ==========================================

const express = require('express')
const referralController = require('../controllers/referralController')
const { requireUser } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/referral/validate', referralController.validateReferralCode)
router.get('/referral/me', requireUser, referralController.getMyReferralStatus)

module.exports = router