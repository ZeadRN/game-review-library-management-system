// ==========================================
// FEATURE: Localization Model
// ==========================================

class LocalizationModel {
    getLanguages() {
        return [
            { code: 'en', name: 'English', flag: '🇺🇸' },
            { code: 'es', name: 'Español', flag: '🇪🇸' },
            { code: 'fr', name: 'Français', flag: '🇫🇷' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
            { code: 'ja', name: '日本語', flag: '🇯🇵' },
            { code: 'ko', name: '한국어', flag: '🇰🇷' },
            { code: 'zh', name: '中文', flag: '🇨🇳' },
            { code: 'pt', name: 'Português', flag: '🇧🇷' },
            { code: 'ru', name: 'Русский', flag: '🇷🇺' },
            { code: 'ar', name: 'العربية', flag: '🇸🇦' }
        ];
    }
}

module.exports = new LocalizationModel();