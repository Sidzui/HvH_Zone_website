import React from 'react';

function WalletPage() {
  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Кошелек
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Balance Card */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-pink-500/20">
          <h2 className="text-2xl font-semibold mb-4">Ваш баланс</h2>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            0 ₽
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-pink-500/20">
          <h2 className="text-2xl font-semibold mb-4">Пополнить баланс</h2>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Введите сумму"
              className="w-full bg-gray-700 border border-pink-500/20 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-500"
              min="1"
            />
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity">
              Пополнить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;