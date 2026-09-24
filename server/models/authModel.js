// ==========================================
// FEATURE: Auth Model
// ==========================================

const { query } = require('../config/db')

async function findUserByCredentials(username, password) {
    return query('SELECT * FROM User WHERE username = ? AND password = ?', [username, password])
}

async function createUser(username, email, password, referredBy, initialBalance) {
    return query(
        'INSERT INTO User (username, email, password, referred_by, balance) VALUES (?, ?, ?, ?, ?)',
        [username, email, password, referredBy, initialBalance]
    )
}

    async function findUserByUsernameOrEmail(username, email) {
        return query(
            'SELECT username, email FROM User WHERE username = ? OR email = ?',
            [username, email]
        )
    }

async function increaseUserBalance(userId, amount) {
    return query('UPDATE User SET balance = balance + ? WHERE user_id = ?', [amount, userId])
}

async function findAdminByCredentials(username, password) {
    return query('SELECT * FROM Admin WHERE username = ? AND password = ?', [username, password])
}

async function createAdmin(username, email, password) {
    return query('INSERT INTO Admin (username, email, password) VALUES (?, ?, ?)', [username, email, password])
}

module.exports = {
    findUserByCredentials,
    createUser,
        findUserByUsernameOrEmail,
    increaseUserBalance,
    findAdminByCredentials,
    createAdmin
}