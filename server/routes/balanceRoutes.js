// ==========================================
// FEATURE: Balance Routes
// ==========================================

const express = require('express');
const balanceController = require('../controllers/balanceController');

const router = express.Router();

router.post('/user/request-balance', balanceController.requestBalance);
router.get('/user/balance-requests', balanceController.getBalanceRequests);

module.exports = router;