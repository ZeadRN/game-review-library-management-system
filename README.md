# 🎮 Game Review & Library Management System

> A collaborative full-stack university project for discovering, reviewing, buying, and managing games.

**Built with:** React · Node.js · Express.js · MySQL · Socket.IO

## Overview

Gamers' Gambit brings marketplace, library, social, and administration features into one platform. Users can browse listings, make purchases, write reviews, manage personal content, and participate in the community. Administrators manage platform resources through a dedicated dashboard.

## Screenshots

### Home page

![Gamers' Gambit home page](https://github.com/user-attachments/assets/066dc23d-47b4-456a-b042-26fe087f62fa)

### User login

![Gamers' Gambit login page](https://github.com/user-attachments/assets/02bb6c34-1b2e-4777-a7f6-0d37f8e2c094)

### Smart recommendations

![Gamers' Gambit smart recommendations page](https://github.com/user-attachments/assets/1573fc26-f8eb-4c03-83a8-90fe6172b023)

## Key features

| Area | Includes |
| --- | --- |
| Marketplace | Game listings, categories, purchases, and reviews |
| User space | Dashboard, profile, balance, wishlist, and library tools |
| Community | Forums, discussions, events, and real-time notifications |
| Game tools | Game comparison and smart recommendations |
| Platform services | Subscriptions, referrals, achievement badges, localization, and live streaming |
| Administration | Dashboard controls for users, listings, and platform resources |

## Architecture

```text
React + Vite client
        ↓  REST API / Socket.IO
Node.js + Express server
        ↓
MySQL database
```

The backend is organized into routes, controllers, models, middleware, and database tables. Socket.IO supports real-time notifications.

## Project structure

```text
client/     # React and Vite frontend
server/     # routes, controllers, models, middleware, and configuration
docs/       # supporting project documentation
database.sql
server.js
```

## Getting started

### Prerequisites

- Node.js 18+
- npm
- MySQL or MariaDB
- Git

### Install and run

```bash
git clone https://github.com/ZeadRN/game-review-library-management-system.git
cd game-review-library-management-system
npm install
cd client && npm install && cd ..
```

Create a local `.env` file with your database credentials:

```env
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

Import `database.sql` into MySQL, then run the backend and frontend in separate terminals:

```bash
# Terminal 1
npm start

# Terminal 2
cd client
npm run dev
```

## Team contributions

| Team member | Primary contributions |
| --- | --- |
| **Zead Raihan** | Marketplace Core, Admin Dashboard, Game Comparison, Referral System, Achievement Badges |
| **Abdullah Al Omi** | Authentication, Static Pages, Subscriptions, Help Center, Localization, Live Streaming |
| **Tahmida Ahmed Tufa** | User Dashboard & Profile, Balance, Wishlist, Leaderboard, Smart Recommendations |
| **Md. Samimul Islam Sakil** | Notifications, Community Forum, Events, Advertisements, Trade Escrow, AI Game Coach |

## Documentation and security

See the `docs/` folder for project documentation. Keep database credentials in `.env`; do not commit secrets to the repository.

---

Developed as a collaborative academic software engineering project.
