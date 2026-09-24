// ==========================================
// FEATURE: Localization Routes
// ==========================================

const express = require('express');
const LocalizationController = require('../controllers/localizationController');

const router = express.Router();
const localizationController = new LocalizationController();

router.get('/languages', (req, res) => localizationController.getLanguages(req, res));

module.exports = router;