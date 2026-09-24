🎮 Game Review & Library Management System

A full-stack Game Review, Marketplace & Community Management System designed as a centralized platform for gamers to discover, review, compare, purchase, trade, and interact with gaming content and other users.

The system combines e-commerce, game reviews, user management, community features, real-time communication, subscriptions, recommendations, gamification, events, advertisements, and administrative tools into a single web application.

📌 Project Overview

The Game Review & Library Management System was developed as a team-based full-stack web application.

The platform provides different functionality for:

👤 Regular users
🛒 Game buyers and sellers
👨‍💼 Administrators
💬 Community members
🏆 Tournament participants
🎮 Gaming content consumers

Users can browse games, purchase and manage games, write reviews, maintain wishlists, compare games, participate in community discussions, join events, earn achievements, receive recommendations, and use various marketplace and social features.

Administrators can manage users, games, advertisements, categories, and other platform operations through a dedicated dashboard.

🚀 Core Features

The system contains 20 major features distributed across marketplace, user management, community, administration, and intelligent application functionality.

1. 🔐 User Authentication
User registration and login
Administrator authentication
Protected routes
Authentication middleware
User account management
2. 🏠 Home & Static Pages
Responsive homepage
About page
Contact page
Informational/static content
Navigation across major platform sections
3. 🛒 Marketplace Core

The marketplace provides the primary game purchasing functionality.

Game listings
Game categories
Game details
Purchasing functionality
Game reviews
Marketplace management
Seller/listing management
4. 👨‍💼 Admin Dashboard

A dedicated administrative interface for managing platform activities.

User management
Listing management
Administrative statistics
Platform management tools
Administrative authentication
5. 👤 User Dashboard & Profile

Users have a centralized dashboard containing:

Profile information
Listings
Purchase history
Account-related information
User activity
6. 💰 Balance System

A user balance management system supporting:

Balance requests
Balance management
Administrative approval
Account balance tracking
7. 🔔 Real-Time Notification System

Implemented using Socket.IO.

The system supports real-time notifications for relevant user activities without requiring manual page refreshes.

8. 💬 Community Forum

A community discussion platform supporting:

Discussion threads
Comments
Upvotes
Community interaction
9. ❤️ Wishlist System

Users can maintain a personal wishlist and receive availability-related notifications for desired games.

10. 💳 Subscription System

The platform provides subscription functionality with:

Subscription plans
Subscription benefits
Discount benefits
User subscription management
11. ⚖️ Game Comparison Tool

Allows users to compare games side-by-side based on available game information.

12. 🏆 Events & Tournaments

Users can discover and participate in gaming events and tournaments.

Event management
Tournament information
Tournament registration
13. 🥇 Leaderboard

A leaderboard system for ranking sellers/users based on platform activity.

14. 🆘 Help Center

Provides users with support functionality including:

Frequently asked questions
Help resources
Live chat support
15. 🤝 Referral System

A referral mechanism allowing users to:

Refer other users
Track referrals
Receive referral rewards/bonuses
16. 📢 Advertisement System

Administrative advertisement management including:

Advertisement banners
Advertisement management
Platform promotional content
17. 🤖 Smart Recommendations

AI-powered recommendation functionality designed to recommend games based on available user/game information.

18. 🌐 Localization & Live Streaming Hub

Additional platform functionality including:

Multi-language support
Localization
Live streaming hub
19. 🏅 Achievement Badges

A gamification system where users can earn achievement badges based on platform activities.

20. 🔒 Trade Escrow & AI Game Coach

Advanced functionality including:

Trade Escrow

Secure trade-related workflow
Trade management

AI Game Coach

AI-assisted gaming guidance
Game-related recommendations/support
🏗️ System Architecture

The project follows a full-stack client-server architecture.

                    ┌──────────────────────┐
                    │       User           │
                    │   Web Browser        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │       + Vite         │
                    └──────────┬───────────┘
                               │
                         REST API / Socket.IO
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js Server     │
                    │    Express.js        │
                    └──────────┬───────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │ Controllers     │          │ Socket.IO       │
       │ & Routes        │          │ Real-time       │
       │                 │          │ Communication   │
       └────────┬────────┘          └─────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ MySQL Database  │
       └─────────────────┘
🛠️ Technologies Used
Frontend
React
Vite
HTML5
CSS3
JavaScript
Backend
Node.js
Express.js
Socket.IO
REST APIs
Database
MySQL
Development Tools
Git
GitHub
npm
Visual Studio Code
📁 Project Structure
Game Review & Library Management System/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── public/
│   ├── react-build/
│   ├── style.css
│   └── *.html
│
├── docs/
│   ├── FEATURE_COMPARISON.md
│   ├── INDEX.md
│   ├── MASTER_GUIDE.md
│   └── PROJECT_STRUCTURE.md
│
├── database.sql
├── database_seed.sql
├── server.js
├── package.json
├── package-lock.json
└── README.md
🗄️ Database

The application uses MySQL as its primary database.

The repository includes:

database.sql

Contains the database structure and required tables.

database_seed.sql

Contains sample/demo data that can be used for local development and testing.

Demo credentials contained in the seed database are intended only for local development/testing. Do not use them as production credentials.

⚙️ Installation & Setup
Prerequisites

Make sure the following are installed:

Node.js 18+
npm
MySQL or MariaDB
Git
1. Clone the Repository
git clone https://github.com/ZeadRN/game-review-library-management-system.git

cd game-review-library-management-system
2. Install Backend Dependencies

From the project root:

npm install
3. Install Frontend Dependencies
cd client
npm install
cd ..
4. Configure the Database

Create a MySQL database and import:

database.sql

For sample/demo data, optionally import:

database_seed.sql
5. Configure Environment Variables

Create a .env file containing the environment variables required by the server/database configuration.

Example structure:

DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

Never commit real passwords, API keys, tokens, or other secrets to GitHub.

6. Run the Backend

From the project root:

npm start
7. Run the Frontend

Open another terminal:

cd client
npm run dev

The frontend will then be available through the local Vite development server.

🔑 Major Technical Concepts Demonstrated

This project demonstrates practical experience with:

Full-stack web development
React component-based development
REST API development
Node.js backend development
Express.js routing
MVC-style backend organization
MySQL database integration
Authentication and authorization
Middleware
CRUD operations
Real-time communication
Socket.IO
E-commerce workflows
User account management
Administrative dashboards
Community systems
Recommendation systems
Gamification
Event management
Multi-language functionality
AI-assisted application features
Team-based software development
👨‍💻 Team Contributions

This project was developed collaboratively by four team members.

Zead Raihan
Main Contributions
Marketplace Core
Game listings
Purchases
Categories
Reviews
Admin Dashboard
User management
Listing management
Administrative statistics
Game Comparison Tool
Side-by-side game comparison
Referral System
Referral tracking
Referral rewards
Achievement Badges
Gamification
Achievement system
Abdullah Al Omi
Main Contributions
User Authentication
Registration
Login
Home & Static Pages
Subscription System
Subscription plans
Discount benefits
Help Center
Q&A
Live chat support
Localization & Live Streaming Hub
Multi-language functionality
Live streaming functionality
Tahmida Ahmed Tufa
Main Contributions
User Dashboard & Profile
Listings
Purchase history
Balance System
Balance requests
Approval workflow
Wishlist
Wishlist management
Availability notifications
Leaderboard
Seller rankings
Smart Recommendations
AI-powered game recommendations
Md. Samimul Islam Sakil
Main Contributions
Real-Time Notification System
Socket.IO implementation
Community Forum
Threads
Comments
Upvotes
Events & Tournaments
Tournament registration
Advertisement System
Advertisement banner management
Trade Escrow & AI Game Coach
📊 Feature Distribution
Feature	Area	Contributor
User Authentication	Authentication	Abdullah Al Omi
Home & Static Pages	UI	Abdullah Al Omi
Marketplace Core	Marketplace	Zead Raihan
Admin Dashboard	Administration	Zead Raihan
User Dashboard & Profile	User Management	Tahmida Ahmed Tufa
Balance System	Finance	Tahmida Ahmed Tufa
Real-Time Notifications	Real-Time	Md. Samimul Islam Sakil
Community Forum	Community	Md. Samimul Islam Sakil
Wishlist	User Features	Tahmida Ahmed Tufa
Subscription System	Subscription	Abdullah Al Omi
Game Comparison	Game Tools	Zead Raihan
Events & Tournaments	Events	Md. Samimul Islam Sakil
Leaderboard	Gamification	Tahmida Ahmed Tufa
Help Center	Support	Abdullah Al Omi
Referral System	Rewards	Zead Raihan
Advertisement System	Administration	Md. Samimul Islam Sakil
Smart Recommendations	AI	Tahmida Ahmed Tufa
Localization & Live Streaming	Platform Features	Abdullah Al Omi
Achievement Badges	Gamification	Zead Raihan
Trade Escrow & AI Game Coach	Advanced Features	Md. Samimul Islam Sakil
🎯 Project Highlights
Full-Stack Development

The project integrates a React frontend with a Node.js/Express backend and MySQL database.

Real-Time Functionality

Socket.IO enables real-time notification functionality.

Marketplace

The application implements a complete game marketplace workflow involving listings, categories, purchases, and reviews.

Community Platform

Users can interact through forums, comments, upvotes, events, tournaments, and other social features.

Administrative Management

The dedicated administration system provides management functionality for users, listings, advertisements, and other platform operations.

Intelligent Features

The system includes AI-oriented functionality such as:

Smart game recommendations
AI Game Coach
Gamification

The platform incorporates:

Achievement badges
Leaderboards
Rewards
Referrals
Events and tournaments
📚 Documentation

Additional project documentation is available in the docs/ directory.

Important documentation includes:

MASTER_GUIDE.md
PROJECT_STRUCTURE.md
FEATURE_COMPARISON.md
INDEX.md
🔒 Security Notes

For security reasons:

.env files are excluded from version control.
Authentication credentials should not be committed.
API keys and secret tokens should never be stored in source code.
The included seed data is intended for development/testing purposes.
👥 Team
Member	Primary Areas
Zead Raihan	Marketplace, Admin Dashboard, Comparison, Referrals, Achievement Badges
Abdullah Al Omi	Authentication, Static Pages, Subscriptions, Help Center, Localization
Tahmida Ahmed Tufa	User Dashboard, Balance, Wishlist, Leaderboard, Recommendations
Md. Samimul Islam Sakil	Notifications, Forum, Events, Advertisements, Trade Escrow & AI Coach
📄 License

License information has not been specified for this repository.
