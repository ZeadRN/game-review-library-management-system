import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Help from './pages/Help'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Events from './pages/Events'
import Leaderboard from './pages/Leaderboard'
import GameDetails from './pages/GameDetails'
import Subscription from './pages/Subscription'
import GameComparison from './pages/GameComparison'
import SmartRecommendations from './pages/SmartRecommendations'
import AchievementBadges from './pages/AchievementBadges'
import LiveStreamingHub from './pages/LiveStreamingHub'
import TradeEscrow from './pages/TradeEscrow'
import AIGameCoach from './pages/AIGameCoach'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/compare" element={<GameComparison />} />
        <Route path="/recommendations" element={<SmartRecommendations />} />
        <Route path="/badges" element={<AchievementBadges />} />
        <Route path="/streaming" element={<LiveStreamingHub />} />
        <Route path="/escrow" element={<TradeEscrow />} />
        <Route path="/coach" element={<AIGameCoach />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
