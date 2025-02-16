import React, { useState, useEffect } from "react";

const AUTH_URL = "https://hvhzone.ru";
const API_URL = "https://hvhzone.ru/api";

function HomePage() {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ players: 0, recent_players: 0, admins: 0, bans: 0 });
  const serverIP = "185.248.101.137:30029";

  useEffect(() => {
    // Загружаем статистику с бэкенда
    fetch(`${API_URL}/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Ошибка загрузки статистики:", err));
  }, []);

  const handleCopyIP = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = () => {
    window.location.href = `steam://connect/${serverIP}`;
  };

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div className="h-[500px] w-full bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl">
              <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                СКИНЫ
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                ПОСТАВЬ ЛЮБОЙ СКИН И НАСЛАЖДАЙСЯ ИГРОЙ НА СЕРВЕРЕ!
              </p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity">
                ПЕРЕЙТИ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Server Info Section */}
      <div className="bg-gray-800/50 border-y border-pink-500/20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              НАШ СЕРВЕР
            </h2>
            <p className="text-gray-300 text-lg">
              Присоединяйтесь к нашему серверу и наслаждайтесь игрой!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center bg-gray-900/50 rounded-lg border border-pink-500/20 p-2">
              <span className="text-gray-300 px-3">{serverIP}</span>
              <button
                onClick={handleCopyIP}
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors ml-2"
              >
                {copied ? "Скопировано!" : "Копировать IP"}
              </button>
            </div>
            <button
              onClick={handleConnect}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Подключиться
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard value={stats.players.toLocaleString()} label="ИГРОКОВ" />
          <StatCard value={stats.recent_players.toLocaleString()} label="ИГРОКОВ ЗА 24 ЧАСА" />
          <StatCard value={stats.admins.toLocaleString()} label="АДМИНОВ" />
          <StatCard value={stats.bans.toLocaleString()} label="БАНОВ" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-gray-800/50 border border-pink-500/20 rounded-lg p-6 text-center hover:border-pink-500/40 transition-colors">
      <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        {value}
      </div>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  );
}

export default HomePage;
