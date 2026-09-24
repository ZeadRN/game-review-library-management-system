// ==========================================
// FEATURE: Localization Controller
// ==========================================

const localizationModel = require('../models/localizationModel');

class LocalizationController {
    // GET /api/languages
    getLanguages(req, res) {
        const languages = localizationModel.getLanguages();
        res.json({ success: true, languages });
    }
}

module.exports = LocalizationController;