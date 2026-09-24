# 🎮 Game Review & Library Management System

A full-stack gaming platform that brings together a **game marketplace, reviews, user libraries, community interaction, real-time notifications, subscriptions, recommendations, events, and administrative management** in one system.

**Built with:** React • Node.js • Express.js • MySQL • Socket.IO

---

## 📌 Overview

The **Game Review & Library Management System** is a collaborative full-stack web application developed as a software engineering project.

The platform provides users with a complete gaming ecosystem where they can:

* Discover and review games
* Browse and manage marketplace listings
* Purchase and manage games
* Maintain a personal wishlist
* Compare games
* Participate in community discussions
* Join events and tournaments
* Receive real-time notifications
* Subscribe to premium plans
* Receive personalized game recommendations
* Earn achievement badges
* Refer other users
* Access gaming-related services and content

Administrators can manage platform operations through a dedicated **Admin Dashboard**, including users, marketplace content, advertisements, and other system resources.

---

## ✨ Core Features

| Category                 | Features                                                      |
| ------------------------ | ------------------------------------------------------------- |
| 🔐 Authentication        | User registration, login, authentication and protected access |
| 🛒 Marketplace           | Game listings, categories, purchases and reviews              |
| 👤 User Management       | User dashboard, profiles, balance and account management      |
| ❤️ Wishlist              | Save games and manage wishlist items                          |
| ⚖️ Game Tools            | Game comparison and detailed game information                 |
| 💳 Subscriptions         | Subscription plans and related benefits                       |
| 💬 Community             | Forums, discussions, threads, comments and interaction        |
| 🔔 Real-Time System      | Real-time notifications using Socket.IO                       |
| 🏆 Gamification          | Leaderboard, achievement badges and referrals                 |
| 🎮 Events                | Events and tournament management                              |
| 🤖 AI Features           | Smart game recommendations and AI Game Coach                  |
| 🌐 Platform Services     | Localization and live streaming hub                           |
| 📢 Advertising           | Advertisement management and platform promotions              |
| 🔒 Advanced Transactions | Trade escrow system                                           |
| 🛠️ Administration       | Dedicated admin dashboard and management tools                |

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │     Vite + JS        │
                    └──────────┬───────────┘
                               │
                    REST API + Socket.IO
                               │
                               ▼
                    ┌──────────────────────┐
                    │    Node.js Server    │
                    │      Express.js      │
                    ├──────────────────────┤
                    │ Routes               │
                    │ Controllers          │
                    │ Models               │
                    │ Middleware           │
                    │ Authentication       │
                    │ Socket.IO            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    MySQL Database    │
                    └──────────────────────┘
```

## 📊 Class Diagram

The class diagram shows the main classes of the system and the relationships between them.

![Class Diagram](docs/class-diagram.png)

---

## 🛠️ Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST APIs
* Socket.IO

### Database

* MySQL
* SQL

### Development Tools

* Git
* GitHub
* npm
* Visual Studio Code

---

## 📂 Project Structure

```text
game-review-library-management-system/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── ...
│
├── public/
├── docs/
├── database.sql
├── database_seed.sql
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

* Node.js 18+
* npm
* MySQL or MariaDB
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/ZeadRN/game-review-library-management-system.git
cd game-review-library-management-system
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd client
npm install
cd ..
```

### 4. Configure the Database

Create a MySQL database and import:

```text
database.sql
```

Optional sample data can be loaded from:

```text
database_seed.sql
```

### 5. Configure Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

### 6. Start the Backend

```bash
npm start
```

### 7. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

---

## 👨‍💻 Team Contributions

### Zead Raihan

**Marketplace • Administration • Game Tools • Gamification**

* Marketplace Core
* Admin Dashboard
* Game Comparison Tool
* Referral System
* Achievement Badges

### Abdullah Al Omi

**Authentication • Platform • Subscriptions • Support**

* User Authentication
* Home and Static Pages
* Subscription System
* Help Center
* Localization and Live Streaming Hub

### Tahmida Ahmed Tufa

**User Management • Finance • Recommendations • Gamification**

* User Dashboard and Profile
* Balance System
* Wishlist
* Leaderboard
* Smart Recommendations

### Md. Samimul Islam Sakil

**Real-Time Systems • Community • Events • Advanced Features**

* Real-Time Notification System using Socket.IO
* Community Forum
* Events and Tournaments
* Advertisement System
* Trade Escrow and AI Game Coach

---

## 📊 Feature Distribution

| Feature Area                      | Responsible Member      |
| --------------------------------- | ----------------------- |
| Marketplace Core                  | Zead Raihan             |
| Admin Dashboard                   | Zead Raihan             |
| Game Comparison                   | Zead Raihan             |
| Referral System                   | Zead Raihan             |
| Achievement Badges                | Zead Raihan             |
| User Authentication               | Abdullah Al Omi         |
| Home & Static Pages               | Abdullah Al Omi         |
| Subscription System               | Abdullah Al Omi         |
| Help Center                       | Abdullah Al Omi         |
| Localization & Live Streaming Hub | Abdullah Al Omi         |
| User Dashboard & Profile          | Tahmida Ahmed Tufa      |
| Balance System                    | Tahmida Ahmed Tufa      |
| Wishlist                          | Tahmida Ahmed Tufa      |
| Leaderboard                       | Tahmida Ahmed Tufa      |
| Smart Recommendations             | Tahmida Ahmed Tufa      |
| Real-Time Notifications           | Md. Samimul Islam Sakil |
| Community Forum                   | Md. Samimul Islam Sakil |
| Events & Tournaments              | Md. Samimul Islam Sakil |
| Advertisement System              | Md. Samimul Islam Sakil |
| Trade Escrow & AI Game Coach      | Md. Samimul Islam Sakil |

---

## 🔑 Key Technical Concepts

* Full-stack web application architecture
* RESTful API development
* React component-based frontend development
* Node.js and Express.js backend development
* Relational database design with MySQL
* Authentication and authorization
* Role-based access control
* Real-time communication using Socket.IO
* Marketplace and transaction workflows
* User account and balance management
* Community and discussion systems
* Event and tournament management
* Recommendation systems
* AI-assisted application features
* Gamification and achievement systems
* Administrative dashboards

---

## 📚 Documentation

Additional project documentation is available in the `docs/` directory.

The documentation contains supporting information about the application's structure, features, development process, and implementation details.

---

## 🎯 Project Highlights

### E-Commerce

Game marketplace, listings, purchases and transaction-related workflows.

### Social Platform

Community forums, discussions, user interaction and live platform features.

### Real-Time Application

Socket.IO-powered real-time notifications and communication.

### Gamification

Leaderboards, achievement badges and referral-based features.

### AI-Enabled Features

Smart game recommendations and an AI Game Coach.

### Administration

Dedicated administrative functionality for managing platform resources and operations.

---

## 👥 Development Team

| Member                      | Primary Contributions                                                        |
| --------------------------- | ---------------------------------------------------------------------------- |
| **Zead Raihan**             | Marketplace, Admin Dashboard, Game Comparison, Referrals, Achievement Badges |
| **Abdullah Al Omi**         | Authentication, Static Pages, Subscriptions, Help Center, Localization       |
| **Tahmida Ahmed Tufa**      | Dashboard, Balance, Wishlist, Leaderboard, Recommendations                   |
| **Md. Samimul Islam Sakil** | Notifications, Forum, Events, Advertisements, Trade Escrow & AI Coach        |

---

## 🔒 Security Notes

* Environment variables should be stored in `.env` and should never be committed.
* Database credentials should be replaced with local credentials when running the project.
* Demo/seed credentials are intended only for local development.
* Sensitive production credentials should never be stored in the repository.

---

## 📄 License

No open-source license has been specified for this repository.

This project was developed as a collaborative academic software engineering project.
