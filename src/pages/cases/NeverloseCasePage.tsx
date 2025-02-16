import React, { useState } from 'react';
import CaseOpening from '../../components/CaseOpening';

const rewards = {
  balance: [
    { type: 'balance', amount: 10, probability: 45 },
    { type: 'balance', amount: 25, probability: 35 },
    { type: 'balance', amount: 300, probability: 20 }
  ],
  models: [
    { type: 'model', name: 'Neverlose Model 1', duration: 'monthly', probability: 25 },
    { type: 'model', name: 'Neverlose Model 2', duration: 'monthly', probability: 25 },
    { type: 'model', name: 'Neverlose Model 3', duration: 'monthly', probability: 25 },
    { type: 'model', name: 'Neverlose Elite', duration: 'permanent', probability: 15 }
  ],
  vip: [
    { type: 'vip', duration: 'month', probability: 10 }
  ]
};

function NeverloseCasePage() {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
  };

  return (
    <div className="pt-24 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
        Neverlose Case
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
                  <li>10₽ (45%)</li>
                  <li>25₽ (35%)</li>
                  <li>300₽ (20%)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Модели:</h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>Neverlose Model 1 (Месяц) - 25%</li>
                  <li>Neverlose Model 2 (Месяц) - 25%</li>
                  <li>Neverlose Model 3 (Месяц) - 25%</li>
                  <li>Neverlose Elite (Навсегда) - 15%</li>
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
              src="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=400&h=300"
              alt="Neverlose Case"
              className="w-64 h-64 object-cover rounded-lg mb-6"
            />
            <button
              onClick={handleOpen}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity text-lg font-medium"
            >
              Открыть кейс (499₽)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NeverloseCasePage;