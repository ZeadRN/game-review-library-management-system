// ==========================================
// FEATURE: Subscription Routes
// ==========================================

const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');

const router = express.Router();

router.get('/subscription/plans', subscriptionController.getPlans);
router.post('/subscription/create', subscriptionController.createSubscription);
router.post('/subscription/cancel', subscriptionController.cancelSubscription);
router.get('/subscription', subscriptionController.getSubscription);
router.post('/subscription/subscribe', subscriptionController.subscribe);

module.exports = router;
