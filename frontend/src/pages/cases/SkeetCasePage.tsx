import React, { useState } from 'react';
import CaseOpening from '../../components/CaseOpening';

const rewards = {
  balance: [
    { type: 'balance', amount: 15, probability: 45 },
    { type: 'balance', amount: 50, probability: 35 },
    { type: 'balance', amount: 500, probability: 20 }
  ],
  models: [
    { type: 'model', name: 'Skeet Model 1', duration: 'monthly', probability: 25 },
    { type: 'model', name: 'Skeet Model 2', duration: 'monthly', probability: 25 },
    { type: 'model', name: 'Skeet Model 3', duration: 'monthly', probability: 25 },
    { type: 'model', name: 'Skeet Premium', duration: 'permanent', probability: 15 }
  ],
  vip: [
    { type: 'vip', duration: 'month', probability: 10 }
  ]
};

function SkeetCasePage() {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
  };

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Skeet.cc Case
      </h1>

      {isOpening ? (
        <CaseOpening rewards={rewards} onComplete={() => setIsOpening(false)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-pink-500/20">
            <h2 className="text-2xl font-semibold mb-4">Возможные награды</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Баланс:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>15₽ (45%)</li>
                  <li>50₽ (35%)</li>
                  <li>500₽ (20%)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Модели:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Skeet Model 1 (Месяц) - 25%</li>
                  <li>Skeet Model 2 (Месяц) - 25%</li>
                  <li>Skeet Model 3 (Месяц) - 25%</li>
                  <li>Skeet Premium (Навсегда) - 15%</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">VIP:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>VIP статус (1 месяц) - 10%</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-pink-500/20 flex flex-col justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1614680376408-12c9ea5ebd4f?auto=format&fit=crop&q=80&w=400&h=300"
              alt="Skeet Case"
              className="w-64 h-64 object-cover rounded-lg mb-6"
            />
            <button
              onClick={handleOpen}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
            >
              Открыть кейс (599₽)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkeetCasePage;