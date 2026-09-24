// ==========================================
// FEATURE: Referral Model
// ==========================================

const { query } = require('../config/db')

async function findUserByReferralCode(referralCode) {
    return query('SELECT user_id FROM User WHERE UPPER(referral_code) = UPPER(?)', [referralCode])
}

async function createReferral(referrerId, referredId) {
    return query(
        'INSERT INTO Referral (referrer_id, referred_id) VALUES (?, ?)',
        [referrerId, referredId]
    )
}

async function fetchPendingReferral(userId) {
    return query("SELECT * FROM Referral WHERE referred_id = ? AND status = 'PENDING'", [userId])
}

async function completeReferral(referralId) {
    return query("UPDATE Referral SET status = 'COMPLETED', completed_at = NOW() WHERE referral_id = ?", [referralId])
}

module.exports = {
    findUserByReferralCode,
    createReferral,
    fetchPendingReferral,
    completeReferral
}