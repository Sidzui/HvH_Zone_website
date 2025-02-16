import React, { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX } from 'lucide-react';

type Reward = {
  type: string;
  amount?: number;
  name?: string;
  duration?: string;
  probability: number;
};

type RewardsProps = {
  balance: Reward[];
  models: Reward[];
  vip: Reward[];
};

type CaseOpeningProps = {
  rewards: RewardsProps;
  onComplete: () => void;
  casePrice: number;
};

const ITEM_WIDTH = 200;
const ITEMS_TO_SHOW = 50;
const ANIMATION_DURATION = 6000; // Increased to 6 seconds
const INITIAL_OFFSET = 2000;

function CaseOpening({ rewards, onComplete, casePrice }: CaseOpeningProps) {
  const [spinning, setSpinning] = useState(true);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const stopAudioRef = useRef<HTMLAudioElement>(null);
  const [items, setItems] = useState<Reward[]>([]);

  useEffect(() => {
    const audio = new Audio('/spinning.mp3');
    const stopAudio = new Audio('/stop.mp3');
    audio.loop = true;
    audioRef.current = audio;
    stopAudioRef.current = stopAudio;
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
    if (stopAudioRef.current) {
      stopAudioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  useEffect(() => {
    const allRewards = [...rewards.balance, ...rewards.models, ...rewards.vip];
    const totalProbability = allRewards.reduce((sum, r) => sum + r.probability, 0);
    let random = Math.random() * totalProbability;
    
    let winner: Reward | null = null;
    for (const r of allRewards) {
      random -= r.probability;
      if (random <= 0) {
        winner = r;
        break;
      }
    }

    const reelItems: Reward[] = [];
    for (let i = 0; i < ITEMS_TO_SHOW; i++) {
      reelItems.push(allRewards[Math.floor(Math.random() * allRewards.length)]);
    }
    
    const winnerPosition = Math.floor(ITEMS_TO_SHOW * 0.7);
    reelItems[winnerPosition] = winner!;
    setItems(reelItems);
    setSelectedReward(winner);

    if (audioRef.current && !muted) {
      audioRef.current.play();
    }

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${INITIAL_OFFSET}px)`;
      containerRef.current.getBoundingClientRect();

      // Enhanced easing function for smoother deceleration
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = `transform ${ANIMATION_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`;
          containerRef.current.style.transform = `translateX(-${(winnerPosition * ITEM_WIDTH) - ITEM_WIDTH}px)`;
        }
      }, 50);

      // Add subtle bounce effect
      const bounceTimer = setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
          containerRef.current.style.transform = `translateX(-${(winnerPosition * ITEM_WIDTH) - ITEM_WIDTH - 2}px)`;
          
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.transform = `translateX(-${(winnerPosition * ITEM_WIDTH) - ITEM_WIDTH}px)`;
            }
          }, 150);
        }
      }, ANIMATION_DURATION);

      return () => clearTimeout(bounceTimer);
    }

    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (stopAudioRef.current && !muted) {
        stopAudioRef.current.play();
      }

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1E90FF', '#FFA500', '#ffffff'],
        ticks: 300
      });

      setSpinning(false);
      setTimeout(onComplete, 3000);
    }, ANIMATION_DURATION + 1000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const renderRewardCard = (reward: Reward) => (
    <div className="flex-shrink-0 w-[200px] p-4">
      <div 
        className={`
          bg-[#1E1E1E] rounded-lg overflow-hidden border-2 
          transition-all duration-300 transform
          ${!spinning && reward === selectedReward 
            ? 'border-[#FFA500] shadow-lg shadow-[#FFA500]/20 scale-105 animate-pulse'
            : 'border-[#1E90FF]/20 hover:border-[#1E90FF]/40'
          }
          ${spinning ? 'hover:scale-105' : ''}
        `}
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?auto=format&fit=crop&q=80&w=200&h=150"
            alt={`${reward.amount}₽`}
            className="w-full h-[150px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="p-4 text-center relative">
          <div className="text-[#1E90FF] text-sm mb-1 font-medium">
            {reward.type === 'balance' ? 'ДЕНЬГИ НА БАЛАНС' : reward.type === 'vip' ? 'VIP СТАТУС' : 'МОДЕЛЬ'}
          </div>
          <div className="text-white text-lg font-bold">
            {reward.type === 'balance' && `${reward.amount}₽`}
            {reward.type === 'model' && `${reward.name}`}
            {reward.type === 'vip' && `VIP ${reward.duration}`}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <button
          onClick={() => setMuted(!muted)}
          className="text-[#1E90FF]/60 hover:text-[#1E90FF] transition-colors"
        >
          {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 accent-[#1E90FF]"
        />
      </div>

      <div className="relative w-full max-w-3xl overflow-hidden mb-8">
        {/* Center Marker */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-[#FFA500] z-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-[#FFA500]"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-[#FFA500]"></div>
        </div>
        
        {/* Highlight overlay */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[200px] -translate-x-1/2 bg-gradient-to-r from-[#1E90FF]/0 via-[#1E90FF]/10 to-[#1E90FF]/0 z-10 pointer-events-none" />
        
        {/* Items container */}
        <div 
          ref={containerRef}
          className="flex items-center"
          style={{
            willChange: 'transform'
          }}
        >
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {renderRewardCard(item)}
            </React.Fragment>
          ))}
        </div>
      </div>

      {!spinning && selectedReward && (
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-[#FFA500]">Поздравляем!</h2>
          <div className="text-xl text-white">
            {selectedReward.type === 'balance' && `Вы выиграли ${selectedReward.amount}₽`}
            {selectedReward.type === 'model' && `Вы выиграли ${selectedReward.name} (${selectedReward.duration})`}
            {selectedReward.type === 'vip' && `Вы выиграли VIP статус (${selectedReward.duration})`}
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseOpening;