import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ShoppingCart, Sword, Briefcase, List, Wallet, Users } from "lucide-react";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import WeaponsPage from "./pages/WeaponsPage";
import CasesPage from "./pages/CasesPage";
import LeadersPage from "./pages/LeadersPage";
import WalletPage from "./pages/WalletPage";
import AdminsPage from "./pages/AdminsPage";
import SpringCasePage from "./pages/cases/SpringCasePage";
import WinterCasePage from "./pages/cases/WinterCasePage";
import NeverloseCasePage from "./pages/cases/NeverloseCasePage";
import SkeetCasePage from "./pages/cases/SkeetCasePage";

const API_URL = "https://hvh-zone-website.onrender.com"; // ✅ Используем правильный URL

function App() {
  const [stats, setStats] = useState({ players: 0, recent_players: 0, admins: 0, bans: 0 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Загрузка статистики
    fetch(`${API_URL}/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data));

    // ✅ Проверка авторизации пользователя
    fetch(`${API_URL}/user`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navigation */}
        <nav className="bg-gray-900/80 backdrop-blur-sm border-b border-pink-500/20 fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                  HvH Zone
                </h1>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-2">
                <NavLink to="/shop" icon={<ShoppingCart size={18} />} text="МАГАЗИН" />
                <NavLink to="/weapons" icon={<Sword size={18} />} text="МОДЕЛИ ОРУЖИЯ" />
                <NavLink to="/cases" icon={<Briefcase size={18} />} text="КЕЙСЫ" />
                <NavLink to="/leaders" icon={<List size={18} />} text="ЛИДЕРЫ" />
                <NavLink to="/admins" icon={<Users size={18} />} text="АДМИНЫ" />
                <NavLink to="/wallet" icon={<Wallet size={18} />} text="КОШЕЛЕК" />
              </div>

              {/* Steam Login */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-pink-500" />
                  <span className="text-sm font-medium">{user.name}</span>
                  <a
                    href={`${API_URL}/logout`} // ✅ Исправили ссылку
                    className="bg-red-500 px-4 py-2 rounded-lg text-white hover:opacity-90 transition"
                  >
                    ВЫЙТИ
                  </a>
                </div>
              ) : (
                <a
                  href={`${API_URL}/auth/steam`} // ✅ Исправили ссылку
                  className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-blue-500/20"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C5.6 0 0.4 4.8 0 11.2L6.4 13.6C6.8 13.2 7.6 13.2 8 13.2L11.2 9.2C11.2 6.4 13.6 4 16.4 4C19.2 4 21.6 6.4 21.6 9.2C21.6 12 19.2 14.4 16.4 14.4L12.4 17.6C12.4 18 12.4 18.4 12 18.8L14.4 24C20.8 23.6 26 18.4 26 12C26 5.6 19.6 0 12 0Z" fill="currentColor"/>
                  </svg>
                  <span className="font-medium">ВОЙТИ</span>
                </a>
              )}
            </div>
          </div>
        </nav>

        {/* Статистика */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-bold">{stats.players.toLocaleString()} ИГРОКОВ</h2>
          <h3 className="text-xl mt-2">{stats.recent_players} ИГРОКОВ ЗА 24 ЧАСА</h3>
          <h3 className="text-xl mt-2">{stats.admins} АДМИНОВ</h3>
          <h3 className="text-xl mt-2">{stats.bans.toLocaleString()} БАНОВ</h3>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/weapons" element={<WeaponsPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/cases/spring" element={<SpringCasePage />} />
          <Route path="/cases/winter" element={<WinterCasePage />} />
          <Route path="/cases/neverlose" element={<NeverloseCasePage />} />
          <Route path="/cases/skeet" element={<SkeetCasePage />} />
          <Route path="/leaders" element={<LeadersPage />} />
          <Route path="/admins" element={<AdminsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link 
      to={to}
      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-pink-500/10 transition-colors text-gray-300 hover:text-white"
    >
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </Link>
  );
}

export default App;
