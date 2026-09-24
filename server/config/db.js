const mysql = require('mysql2')

try {
    require('dotenv').config()
} catch (error) {
    console.log('dotenv not loaded, using defaults')
}

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'game_marketplace'
})

db.connect((error) => {
    if (error) {
        console.error('Database connection failed:', error)
        return
    }

    console.log('Connected to MySQL database')
})

const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (error, results) => {
            if (error) reject(error)
            else resolve(results)
        })
    })
}

module.exports = { db, query }