// ==========================================
// FEATURE: Balance Controller
// ==========================================

const balanceModel = require('../models/balanceModel');
const NotificationController = require('./notificationController');

async function requestBalance(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    const { amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ success: false, message: 'Amount must be greater than 0' });
    }

    try {
        await balanceModel.createBalanceRequest(req.session.user.id, amount);
        NotificationController.notifyAdmins(req, 'BALANCE', 'New Balance Request', `User requested $${amount}`);
        res.json({ success: true, message: 'Balance request submitted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error creating request' });
    }
}

async function getBalanceRequests(req, res) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'User login required' });
    }

    try {
        const requests = await balanceModel.getUserBalanceRequests(req.session.user.id);
        res.json({ success: true, requests });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching requests' });
    }
}

module.exports = {
    requestBalance,
    getBalanceRequests
};