// ==========================================
// FEATURE: Referral Controller
// ==========================================

const referralModel = require('../models/referralModel')
const userModel = require('../models/userModel')

async function validateReferralCode(req, res) {
    const { referralCode } = req.body

    if (!referralCode) {
        return res.status(400).json({ success: false, message: 'Referral code is required' })
    }

    try {
        const referrer = await referralModel.findUserByReferralCode(referralCode)

        if (referrer.length === 0) {
            return res.status(404).json({ success: false, message: 'Invalid referral code' })
        }

        res.json({ success: true, valid: true })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error validating referral code' })
    }
}

async function getMyReferralStatus(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' })
    }

    try {
        const profile = await userModel.findUserProfile(req.session.user.id)
        const pendingReferral = await referralModel.fetchPendingReferral(req.session.user.id)

        if (profile.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        res.json({
            success: true,
            referralCode: profile[0].referral_code,
            pendingReferral: pendingReferral[0] || null
        })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error loading referral status' })
    }
}

module.exports = {
    validateReferralCode,
    getMyReferralStatus
}