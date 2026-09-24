const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const socketController = require('./server/controllers/socketController');

const authRoutes = require('./server/routes/authRoutes');
const userRoutes = require('./server/routes/userRoutes');
const adminUserRoutes = require('./server/routes/adminUserRoutes');
const marketplaceRoutes = require('./server/routes/marketplaceRoutes');
const wishlistRoutes = require('./server/routes/wishlistRoutes');
const referralRoutes = require('./server/routes/referralRoutes');
const eventRoutes = require('./server/routes/eventRoutes');
const communityRoutes = require('./server/routes/communityRoutes');
const leaderboardRoutes = require('./server/routes/leaderboardRoutes');
const subscriptionRoutes = require('./server/routes/subscriptionRoutes');
const balanceRoutes = require('./server/routes/balanceRoutes');
const advertisementRoutes = require('./server/routes/advertisementRoutes');
const comparisonRoutes = require('./server/routes/comparisonRoutes');
const helpRoutes = require('./server/routes/helpRoutes');
const adminDashboardRoutes = require('./server/routes/adminDashboardRoutes');
const categoryRoutes = require('./server/routes/categoryRoutes');
const localizationRoutes = require('./server/routes/localizationRoutes');

// Try to load dotenv, but don't fail if not present
try {
    require('dotenv').config();
} catch (e) {
    console.log('dotenv not loaded, using defaults');
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

app.set('io', io);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/react-build')));
app.use(express.static('public'));

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'game-marketplace-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }
});
app.use(sessionMiddleware);

// Share session with Socket.IO
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});

// Initialize Socket logic
socketController.init(io);

// ============= ROUTE MOUNTS =============
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminUserRoutes);
app.use('/api', marketplaceRoutes);
app.use('/api', wishlistRoutes);
app.use('/api', referralRoutes);
app.use('/api', eventRoutes);
app.use('/api', communityRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', subscriptionRoutes);
app.use('/api', balanceRoutes);
app.use('/api', advertisementRoutes);
app.use('/api', comparisonRoutes);
app.use('/api', helpRoutes);
app.use('/api', adminDashboardRoutes);
app.use('/api', categoryRoutes);
app.use('/api', localizationRoutes);

// ============= CATCH-ALL =============
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'react-build', 'index.html'));
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Socket.IO enabled for real-time features');
});