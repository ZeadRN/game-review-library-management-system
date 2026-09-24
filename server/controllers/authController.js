// ==========================================
// FEATURE: Auth Controller
// ==========================================

const authModel = require('../models/authModel')
const referralModel = require('../models/referralModel')

async function registerUser(req, res) {
    const username = String(req.body.username || '').trim()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    const referralCode = req.body.referralCode ? String(req.body.referralCode).trim().toUpperCase() : null

    if (username.length < 3) {
        return res.status(400).json({ success: false, message: 'Username must be at least 3 characters' })
    }
    if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Enter a valid email address' })
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' })
    }

    try {
        const existingUsers = await authModel.findUserByUsernameOrEmail(username, email)
        if (existingUsers.some(user => user.username === username)) {
            return res.status(409).json({ success: false, message: 'Username is already taken' })
        }
        if (existingUsers.some(user => user.email === email)) {
            return res.status(409).json({ success: false, message: 'Email is already registered' })
        }

        let referredBy = null

        if (referralCode) {
            const referrer = await referralModel.findUserByReferralCode(referralCode)
            if (referrer.length > 0) {
                referredBy = referrer[0].user_id
            } else {
                return res.status(400).json({ success: false, message: 'Invalid referral code' })
            }
        }

        const initialBalance = referredBy ? 200 : 0
        const result = await authModel.createUser(username, email, password, referredBy, initialBalance)

        if (referredBy) {
            await authModel.increaseUserBalance(referredBy, 100)
            await referralModel.createReferral(referredBy, result.insertId)

            const io = req.app.get('io')
            if (io) {
                io.to(`user_${result.insertId}`).emit('notification', {
                    type: 'REFERRAL',
                    title: 'Welcome Bonus!',
                    message: 'You received $200 bonus for using a referral code! Start shopping now!',
                    link: '/user-dashboard',
                    timestamp: new Date()
                })

                io.to(`user_${referredBy}`).emit('notification', {
                    type: 'REFERRAL',
                    title: 'Referral Bonus!',
                    message: `${username} signed up using your referral code! You earned $100 bonus!`,
                    link: '/user-dashboard',
                    timestamp: new Date()
                })
            }
        }

        res.json({
            success: true,
            message: referredBy ? 'Registration successful! You received $200 welcome bonus!' : 'Registration successful'
        })
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'Username or email is already registered' })
        }
        console.error('User registration error:', error)
        res.status(500).json({ success: false, message: 'Unable to create account right now' })
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body

    try {
        const results = await authModel.findUserByCredentials(username, password)

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }

        if (results[0].is_restricted) {
            return res.status(403).json({ success: false, message: 'Your account has been restricted' })
        }

        req.session.user = {
            id: results[0].user_id,
            username: results[0].username,
            type: 'user'
        }

        res.json({ success: true, message: 'Login successful', user: req.session.user })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' })
    }
}

async function registerAdmin(req, res) {
    const { username, email, password } = req.body

    try {
        await authModel.createAdmin(username, email, password)
        res.json({ success: true, message: 'Admin registration successful' })
    } catch (error) {
        res.status(400).json({ success: false, message: 'Username or email already exists' })
    }
}

async function loginAdmin(req, res) {
    const { username, password } = req.body

    try {
        const results = await authModel.findAdminByCredentials(username, password)

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' })
        }

        req.session.user = {
            id: results[0].admin_id,
            username: results[0].username,
            type: 'admin'
        }

        res.json({ success: true, message: 'Admin login successful', user: req.session.user })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' })
    }
}

function logout(req, res) {
    req.session.destroy()
    res.json({ success: true, message: 'Logged out' })
}

function checkSession(req, res) {
    if (req.session.user) {
        res.json({ success: true, user: req.session.user })
    } else {
        res.json({ success: false })
    }
}

module.exports = {
    registerUser,
    loginUser,
    registerAdmin,
    loginAdmin,
    logout,
    checkSession
}