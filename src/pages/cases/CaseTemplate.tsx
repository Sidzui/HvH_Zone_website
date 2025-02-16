import React, { useState } from 'react';
import CaseOpening from '../../components/CaseOpening';
import { Volume2 } from 'lucide-react';

type CaseTemplateProps = {
  title: string;
  price: number;
  rewards: {
    balance: Array<{
      type: string;
      amount: number;
      probability: number;
    }>;
    models: Array<{
      type: string;
      name: string;
      duration: string;
      probability: number;
    }>;
    vip: Array<{
      type: string;
      duration: string;
      probability: number;
    }>;
  };
  backgroundSymbol?: string;
};

function CaseTemplate({ title, price, rewards, backgroundSymbol = '❄' }: CaseTemplateProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#1E90FF]/10 text-2xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          >
            {backgroundSymbol}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-[#FFA500] mb-2">
            🎁 {title}
          </h1>
          <div className="absolute top-4 right-4">
            <Volume2 className="w-6 h-6 text-[#1E90FF]/60 hover:text-[#1E90FF] transition-colors cursor-pointer" />
          </div>
        </div>

        {isOpening ? (
          <CaseOpening rewards={rewards} onComplete={() => setIsOpening(false)} casePrice={price} />
        ) : (
          <div className="space-y-12">
            {/* Case Display */}
            <div className="flex justify-center items-center space-x-4">
              <div className="relative group">
                <img
                  src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&q=80&w=300&h=200"
                  alt="Case Preview"
                  className="w-[300px] h-[200px] object-cover rounded-lg border-2 border-[#1E90FF]/20 group-hover:border-[#1E90FF]/40 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <div className="text-[#1E90FF] text-sm mb-1">КЕЙС</div>
                    <div className="text-white text-lg">{title}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Buttons */}
            <div className="text-center space-y-4">
              <div className="text-[#FFA500] text-lg">
                СТОИМОСТЬ ОТКРЫТИЯ:
                <span className="ml-2 font-bold">{price} ₽</span>
              </div>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleOpen}
                  className="px-8 py-2 bg-[#1E1E1E] text-white rounded hover:bg-[#2A2A2A] transition-colors"
                >
                  ОТКРЫТЬ
                </button>
                <button
                  onClick={handleOpen}
                  className="px-8 py-2 bg-[#1E1E1E] text-white rounded hover:bg-[#2A2A2A] transition-colors"
                >
                  БЫСТРО
                </button>
              </div>

              <div className="text-[#1E90FF]/60 text-sm">
                РЕКОМЕНДУЕТСЯ ОТКРЫВАТЬ "БЫСТРО"!
              </div>
            </div>

            {/* Case Contents */}
            <div className="space-y-4">
              <h2 className="text-center text-xl text-[#FFA500]">
                СОДЕРЖИМОЕ КЕЙСА
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[...rewards.balance, ...rewards.models, ...rewards.vip]
                  .sort((a, b) => {
                    if ('amount' in a && 'amount' in b) {
                      return a.amount - b.amount;
                    }
                    return 0;
                  })
                  .map((item, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&q=80&w=200&h=150"
                        alt="Reward"
                        className="w-full h-[150px] object-cover rounded-lg border-2 border-[#1E90FF]/20 group-hover:border-[#1E90FF]/40 transition-all"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 rounded-lg">
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                          <div className="text-[#1E90FF] text-xs mb-1">
                            {item.type === 'balance' ? 'ДЕНЬГИ НА БАЛАНС' : 
                             item.type === 'model' ? 'МОДЕЛЬ' : 'VIP СТАТУС'}
                          </div>
                          <div className="text-white text-sm">
                            {item.type === 'balance' && `${item.amount}₽`}
                            {item.type === 'model' && item.name}
                            {item.type === 'vip' && `VIP ${item.duration}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseTemplate;