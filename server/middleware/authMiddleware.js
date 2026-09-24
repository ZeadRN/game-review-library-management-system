// ==========================================
// FEATURE: Auth Middleware
// ==========================================

function requireUser(req, res, next) {
    if (!req.session.user || req.session.user.type !== 'user') {
        return res.status(401).json({ success: false, message: 'Not authenticated' })
    }

    next()
}

function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.type !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required' })
    }

    next()
}

module.exports = { requireUser, requireAdmin }