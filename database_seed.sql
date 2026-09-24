-- Demo data for game_marketplace.
-- Run database.sql first, then run this file.
-- Demo logins: admin@gamersgambit.test / Admin@123
--                alex@example.com / password123
--                maya@example.com / password123
--                sam@example.com / password123

USE game_marketplace;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM Chat_Message;
DELETE FROM Help_Question;
DELETE FROM Balance_Request;
DELETE FROM Referral;
DELETE FROM Advertisement;
DELETE FROM Notification;
DELETE FROM Event_Registration;
DELETE FROM Event;
DELETE FROM Comment_Upvote;
DELETE FROM Thread_Comment;
DELETE FROM Thread_Upvote;
DELETE FROM Thread;
DELETE FROM Wishlist;
DELETE FROM Purchase;
DELETE FROM Game_Review;
DELETE FROM Game_Listing;
DELETE FROM Subscription;
DELETE FROM Game_Category;
DELETE FROM User;
DELETE FROM Admin;

ALTER TABLE Admin AUTO_INCREMENT = 1;
ALTER TABLE User AUTO_INCREMENT = 1;
ALTER TABLE Subscription AUTO_INCREMENT = 1;
ALTER TABLE Game_Category AUTO_INCREMENT = 1;
ALTER TABLE Game_Listing AUTO_INCREMENT = 1;
ALTER TABLE Game_Review AUTO_INCREMENT = 1;
ALTER TABLE Purchase AUTO_INCREMENT = 1;
ALTER TABLE Wishlist AUTO_INCREMENT = 1;
ALTER TABLE Thread AUTO_INCREMENT = 1;
ALTER TABLE Thread_Upvote AUTO_INCREMENT = 1;
ALTER TABLE Thread_Comment AUTO_INCREMENT = 1;
ALTER TABLE Comment_Upvote AUTO_INCREMENT = 1;
ALTER TABLE Event AUTO_INCREMENT = 1;
ALTER TABLE Event_Registration AUTO_INCREMENT = 1;
ALTER TABLE Notification AUTO_INCREMENT = 1;
ALTER TABLE Advertisement AUTO_INCREMENT = 1;
ALTER TABLE Referral AUTO_INCREMENT = 1;
ALTER TABLE Balance_Request AUTO_INCREMENT = 1;
ALTER TABLE Help_Question AUTO_INCREMENT = 1;
ALTER TABLE Chat_Message AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO Admin (admin_id, username, email, password) VALUES
(1, 'admin_demo', 'admin@gamersgambit.test', 'Admin@123'),
(2, 'support_admin', 'support@gamersgambit.test', 'Admin@123');

INSERT INTO User (user_id, username, email, password, balance, is_restricted, referred_by, language_preference, profile_picture, bio, total_sales) VALUES
(1, 'alex_gamer', 'alex@example.com', 'password123', 185.50, FALSE, NULL, 'en', 'https://i.pravatar.cc/150?img=12', 'Indie enthusiast and weekend seller.', 29.99),
(2, 'maya_streams', 'maya@example.com', 'password123', 420.00, FALSE, NULL, 'en', 'https://i.pravatar.cc/150?img=32', 'Competitive player looking for the next great RPG.', 59.98),
(3, 'sam_tactics', 'sam@example.com', 'password123', 75.25, FALSE, 1, 'en', 'https://i.pravatar.cc/150?img=15', 'Strategy games, speedruns, and helpful reviews.', 0.00),
(4, 'lina_arcade', 'lina@example.com', 'password123', 250.00, FALSE, 2, 'es', 'https://i.pravatar.cc/150?img=44', 'Arcade collector and multiplayer fan.', 19.99),
(5, 'restricted_demo', 'restricted@example.com', 'password123', 10.00, TRUE, NULL, 'en', NULL, 'Demo account for restricted-user testing.', 0.00);

INSERT INTO Game_Category (category_id, name, description, icon) VALUES
(1, 'Action', 'Fast-paced games with combat and adventure', 'fa-bolt'),
(2, 'Adventure', 'Story-driven exploration games', 'fa-compass'),
(3, 'RPG', 'Role-playing games with character progression', 'fa-hat-wizard'),
(4, 'Strategy', 'Tactical and planning-based games', 'fa-chess'),
(5, 'Sports', 'Sports simulation and arcade games', 'fa-futbol'),
(6, 'Racing', 'Racing and driving games', 'fa-car'),
(7, 'Puzzle', 'Brain teasers and puzzle games', 'fa-puzzle-piece'),
(8, 'Shooter', 'First and third-person shooter games', 'fa-crosshairs'),
(9, 'Simulation', 'Life and business simulation games', 'fa-city'),
(10, 'Horror', 'Scary and survival horror games', 'fa-ghost'),
(11, 'Indie', 'Independent and unique games', 'fa-star'),
(12, 'Multiplayer', 'Online multiplayer games', 'fa-users');

INSERT INTO Subscription (subscription_id, user_id, plan_type, stripe_subscription_id, status, discount_percentage, start_date, end_date) VALUES
(1, 1, 'MONTHLY', 'demo_sub_monthly_001', 'ACTIVE', 20.00, '2026-08-01 10:00:00', '2026-09-01 10:00:00'),
(2, 2, 'YEARLY', 'demo_sub_yearly_002', 'ACTIVE', 20.00, '2026-01-15 10:00:00', '2027-01-15 10:00:00'),
(3, 4, 'MONTHLY', NULL, 'CANCELLED', 20.00, '2026-07-01 10:00:00', '2026-08-01 10:00:00');

INSERT INTO Game_Listing (listing_id, seller_id, category_id, game_name, description, price, game_key, stock_quantity, trailer_url, screenshots, view_count, status, admin_approved, featured) VALUES
(1, 1, 3, 'Eternal Realms', 'A large fantasy RPG with guild battles and a deep crafting system.', 29.99, 'ER-DEMO-AAAA-BBBB-1111', 4, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', JSON_ARRAY('https://images.unsplash.com/photo-1511512578047-dfb367046420'), 248, 'AVAILABLE', TRUE, TRUE),
(2, 2, 4, 'Kingdoms at Dawn', 'Build alliances, manage resources, and conquer a changing world map.', 19.99, 'KAD-DEMO-CCCC-DDDD-2222', 2, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', JSON_ARRAY('https://images.unsplash.com/photo-1542751371-adc38448a05e'), 191, 'AVAILABLE', TRUE, TRUE),
(3, 1, 8, 'Neon Strike', 'Fast competitive shooter with ranked arenas and character loadouts.', 24.99, 'NS-DEMO-EEEE-FFFF-3333', 0, NULL, JSON_ARRAY(), 310, 'OUT_OF_STOCK', TRUE, FALSE),
(4, 3, 11, 'Moonlit Harbor', 'A calm narrative adventure about rebuilding a mysterious island town.', 14.99, 'MH-DEMO-GGGG-HHHH-4444', 1, NULL, JSON_ARRAY(), 87, 'AVAILABLE', TRUE, FALSE),
(5, 4, 6, 'Velocity Circuit', 'Arcade racing with drifting challenges and local multiplayer.', 9.99, 'VC-DEMO-IIII-JJJJ-5555', 3, NULL, JSON_ARRAY(), 142, 'AVAILABLE', TRUE, FALSE),
(6, 3, 10, 'The Hollow Signal', 'Atmospheric survival horror with branching investigation paths.', 17.50, 'HS-DEMO-KKKK-LLLL-6666', 1, NULL, JSON_ARRAY(), 55, 'AVAILABLE', FALSE, FALSE),
(7, 2, 12, 'Skyline Rivals', 'Team-based online battles across rooftop arenas.', 12.99, 'SR-DEMO-MMMM-NNNN-7777', 5, NULL, JSON_ARRAY(), 101, 'AVAILABLE', TRUE, FALSE);

INSERT INTO Game_Review (review_id, listing_id, user_id, rating, review_text, created_at) VALUES
(1, 1, 2, 5, 'Excellent world design and enough quests to keep me busy for weeks.', '2026-08-05 12:00:00'),
(2, 1, 4, 4, 'Great value and a very satisfying crafting system.', '2026-08-06 15:30:00'),
(3, 2, 1, 4, 'Thoughtful strategy mechanics and a welcoming learning curve.', '2026-08-07 09:15:00'),
(4, 2, 4, 5, 'The diplomacy system makes every playthrough feel different.', '2026-08-08 18:20:00'),
(5, 3, 2, 3, 'Fun matches, but I am waiting for the next stock refresh.', '2026-08-09 20:00:00'),
(6, 4, 1, 5, 'A lovely small adventure with memorable characters.', '2026-08-10 11:45:00');

INSERT INTO Purchase (purchase_id, buyer_id, listing_id, purchase_price, original_price, discount_applied, payment_method, purchase_date) VALUES
(1, 2, 1, 23.99, 29.99, 20.00, 'BALANCE', '2026-08-05 13:00:00'),
(2, 4, 2, 19.99, 19.99, 0.00, 'BALANCE', '2026-08-08 19:00:00'),
(3, 1, 5, 7.99, 9.99, 20.00, 'BALANCE', '2026-08-10 12:30:00');

INSERT INTO Wishlist (wishlist_id, user_id, game_name, listing_id, notified) VALUES
(1, 1, 'The Hollow Signal', 6, FALSE),
(2, 2, 'Neon Strike', 3, TRUE),
(3, 3, 'Starfall Odyssey', NULL, FALSE),
(4, 4, 'Skyline Rivals', 7, FALSE);

INSERT INTO Thread (thread_id, title, content, user_id, upvote_count, is_pinned, created_at) VALUES
(1, 'What game are you playing this week?', 'Share your current favorite and tell us what makes it worth playing.', 1, 3, TRUE, '2026-08-03 10:00:00'),
(2, 'Best beginner strategy games', 'I want something deep but approachable. What should I try first?', 3, 2, FALSE, '2026-08-06 14:00:00'),
(3, 'Show us your setup', 'Post your favorite gaming setup or desk accessory.', 4, 1, FALSE, '2026-08-09 16:30:00');

INSERT INTO Thread_Comment (comment_id, thread_id, comment_text, user_id, upvote_count, created_at) VALUES
(1, 1, 'I just started Eternal Realms and the world is enormous.', 2, 2, '2026-08-03 12:15:00'),
(2, 1, 'Moonlit Harbor has been a perfect evening game for me.', 4, 1, '2026-08-04 09:20:00'),
(3, 2, 'Kingdoms at Dawn teaches the basics without feeling shallow.', 1, 3, '2026-08-06 16:00:00'),
(4, 3, 'A good chair made a bigger difference than I expected.', 2, 0, '2026-08-10 08:45:00');

INSERT INTO Thread_Upvote (upvote_id, thread_id, user_id) VALUES
(1, 1, 2), (2, 1, 3), (3, 1, 4), (4, 2, 1), (5, 2, 4), (6, 3, 1);

INSERT INTO Comment_Upvote (upvote_id, comment_id, user_id) VALUES
(1, 1, 1), (2, 1, 4), (3, 2, 2), (4, 3, 2), (5, 3, 4);

INSERT INTO Event (event_id, title, description, event_type, start_date, end_date, max_participants, prizes, banner_image, status, created_by) VALUES
(1, 'Summer Arena Championship', 'Compete in a weekend bracket and climb the leaderboard.', 'TOURNAMENT', '2026-08-29 14:00:00', '2026-08-30 20:00:00', 64, '1st: $250 wallet credit; 2nd: $100 wallet credit', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'UPCOMING', 1),
(2, 'Indie Discovery Weekend', 'Explore selected independent games with special marketplace prices.', 'SALE', '2026-08-20 00:00:00', '2026-08-27 23:59:59', NULL, 'Featured indie games up to 30% off', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'ONGOING', 1),
(3, 'July Community Cup', 'Last month\'s completed community tournament.', 'TOURNAMENT', '2026-07-12 12:00:00', '2026-07-12 18:00:00', 32, 'Community badges and wallet credit', NULL, 'COMPLETED', 2);

INSERT INTO Event_Registration (registration_id, event_id, user_id, placement) VALUES
(1, 1, 1, NULL), (2, 1, 2, NULL), (3, 1, 3, NULL),
(4, 2, 4, NULL), (5, 3, 1, 1), (6, 3, 2, 2);

INSERT INTO Notification (notification_id, user_id, type, title, message, link, is_read) VALUES
(1, 1, 'PURCHASE', 'Purchase complete', 'Your purchase of Velocity Circuit is ready in your purchase history.', '/user-dashboard', TRUE),
(2, 1, 'EVENT', 'Tournament registration confirmed', 'You are registered for Summer Arena Championship.', '/events/1', FALSE),
(3, 2, 'SYSTEM', 'Subscription active', 'Your yearly subscription is active with 20% purchase discounts.', '/subscription', FALSE),
(4, 3, 'COMMENT', 'New comment on your thread', 'Someone replied to your strategy game question.', '/community/thread/2', FALSE),
(5, 4, 'WISHLIST', 'Wishlist item available', 'Skyline Rivals is available now.', '/game/7', TRUE);

INSERT INTO Advertisement (ad_id, title, image_url, link_url, listing_id, position, is_active, click_count, start_date, end_date) VALUES
(1, 'Featured: Eternal Realms', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', '/game/1', 1, 'TOP', TRUE, 42, '2026-08-01 00:00:00', '2026-09-30 23:59:59'),
(2, 'Indie Discovery Weekend', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', '/events/2', 4, 'SIDEBAR', TRUE, 18, '2026-08-20 00:00:00', '2026-08-27 23:59:59'),
(3, 'Velocity Circuit', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7', '/game/5', 5, 'BOTTOM', FALSE, 7, '2026-07-01 00:00:00', '2026-08-15 23:59:59');

INSERT INTO Referral (referral_id, referrer_id, referred_id, bonus_amount, status, completed_at) VALUES
(1, 1, 3, 100.00, 'COMPLETED', '2026-08-02 11:00:00'),
(2, 2, 4, 100.00, 'COMPLETED', '2026-08-04 11:30:00');

INSERT INTO Balance_Request (request_id, user_id, amount, status, processed_at, processed_by) VALUES
(1, 3, 50.00, 'PENDING', NULL, NULL),
(2, 1, 100.00, 'APPROVED', '2026-08-04 10:00:00', 1),
(3, 4, 25.00, 'REJECTED', '2026-08-05 16:00:00', 2);

INSERT INTO Help_Question (question_id, user_id, question, answer, answered_by, answered_at) VALUES
(1, 1, 'How do I add a game to my wishlist?', 'Open a game page and select the heart button. You can manage saved games from your dashboard.', 1, '2026-08-04 09:00:00'),
(2, 3, 'When will my listing be reviewed?', NULL, NULL, NULL),
(3, 4, 'Can I use my balance for subscriptions?', 'Yes. Subscription plans use your marketplace wallet balance.', 2, '2026-08-07 13:45:00');

INSERT INTO Chat_Message (message_id, user_id, admin_id, message, sender_type, is_read) VALUES
(1, 1, NULL, 'Hi, I need help finding my purchased game key.', 'USER', TRUE),
(2, 1, 1, 'You can find it under the My Purchases tab in your dashboard.', 'ADMIN', TRUE),
(3, 3, NULL, 'Could you check the approval status of my listing?', 'USER', FALSE),
(4, 4, 2, 'Your listing was approved and is now visible in the marketplace.', 'ADMIN', FALSE);

SELECT 'Demo data loaded for all application tables.' AS message;
SELECT 'alex@example.com / password123' AS demo_user_login;
SELECT 'admin@gamersgambit.test / Admin@123' AS demo_admin_login;
