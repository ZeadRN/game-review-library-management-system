// ==========================================
// FEATURE: Comparison Routes
// ==========================================

const express = require('express');
const ComparisonController = require('../controllers/comparisonController');

const router = express.Router();
const comparisonController = new ComparisonController();

router.post('/games/compare', (req, res) => comparisonController.compareGamesPost(req, res));
router.get('/compare', (req, res) => comparisonController.compareGamesGet(req, res));

module.exports = router;