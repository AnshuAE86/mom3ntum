import React, { useState } from 'react';
import { User } from '../types';
import { Gift, Dices, Gamepad2, Ticket, Sparkles, X, Trophy, CheckCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ArcadeProps {
  user: User;
  onOpenSpin: () => void;
  onSpendPoints: (amount: number, description: string) => void;
}

interface ArcadeItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'raffle' | 'access' | 'drop';
  cost: number;
  tagLabel: string;
  tagColor: string; // Tailwind class string for text/bg
  actionLabel: string;
  successLabel: string;
}

const MARKET_ITEMS: ArcadeItem[] = [
  {
    id: '1',
    title: 'Signed Tour Hoodie',
    description: 'Win a signed hoodie from the Summer Tour collection.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    type: 'raffle',
    cost: 500,
    tagLabel: 'Raffle • Ends in 2d',
    tagColor: 'text-red-500 bg-red-50',
    actionLabel: 'Enter',
    successLabel: 'Entered'
  },
  {
    id: '2',
    title: 'Presale Access: Wembley',
    description: 'Secure your right to buy 2 tickets at face value for the finals.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop',
    type: 'access',
    cost: 2000,
    tagLabel: 'Right-to-Buy',
    tagColor: 'text-indigo-500 bg-indigo-50',
    actionLabel: 'Reserve',
    successLabel: 'Reserved'
  },
  {
    id: '3',
    title: 'Digital Tour Sticker',
    description: 'Limited edition digital sticker for your profile.',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
    type: 'drop',
    cost: 250,
    tagLabel: 'Drop',
    tagColor: 'text-green-500 bg-green-50',
    actionLabel: 'Buy Now',
    successLabel: 'Owned'
  },
  {
    id: '4',
    title: 'VIP Upgrade Access',
    description: 'Unlock the ability to purchase a VIP upgrade for your existing ticket.',
    image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2070&auto=format&fit=crop',
    type: 'access',
    cost: 1500,
    tagLabel: 'Right-to-Buy',
    tagColor: 'text-purple-500 bg-purple-50',
    actionLabel: 'Reserve',
    successLabel: 'Reserved'
  },
  {
    id: '5',
    title: 'Meet & Greet Pass',
    description: 'Chance to meet the artist backstage.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop',
    type: 'raffle',
    cost: 100,
    tagLabel: 'Raffle • Ends in 5h',
    tagColor: 'text-orange-500 bg-orange-50',
    actionLabel: 'Enter',
    successLabel: 'Entered'
  }
];

const WheelModal: React.FC<{ onClose: () => void; onWin: (amount: number) => void }> = ({ onClose, onWin }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winResult, setWinResult] = useState<{ label: string; value: number } | null>(null);

  // Rewards configuration - High contrast colors
  const rewards = [
    { label: '50 Pts', value: 50, color: '#2563eb' }, // Blue-600
    { label: '100 XP', value: 0, color: '#7c3aed' }, // Violet-600
    { label: '200 Pts', value: 200, color: '#059669' }, // Emerald-600
    { label: 'Try Again', value: 0, color: '#475569' }, // Slate-600
    { label: '500 Pts', value: 500, color: '#d97706' }, // Amber-600
    { label: '10 XP', value: 0, color: '#db2777' }, // Pink-600
  ];
  
  const sliceAngle = 360 / rewards.length;

  const spin = () => {
    if (spinning || winResult) return;
    setSpinning(true);

    const randomOffset = Math.floor(Math.random() * 360);
    const spins = 5 * 360; // 5 full rotations
    const finalRotation = rotation + spins + randomOffset;
    
    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      // Logic for demo win
      const wonReward = { label: '100 Pts', value: 100 }; 
      setWinResult(wonReward);
      
      // Confetti Effect
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 60 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      onWin(wonReward.value);

    }, 4000);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full relative overflow-hidden flex flex-col items-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 z-10">
          <X size={24} />
        </button>
        
        <div className="p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-1">Daily Spin</h3>
          <p className="text-slate-500 text-sm">Spin to win exclusive rewards!</p>
        </div>

        {winResult ? (
          <div className="h-64 flex flex-col items-center justify-center animate-fade-in p-4 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
               <Trophy size={40} />
            </div>
            <h4 className="text-3xl font-extrabold text-slate-800 mb-2">You Won!</h4>
            <p className="text-xl text-blue-600 font-bold mb-4">{winResult.label}</p>
            <p className="text-sm text-slate-500">Come back tomorrow for another spin.</p>
          </div>
        ) : (
          <div className="relative w-64 h-64 mb-8">
             {/* Pointer */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 text-slate-800">
               <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-slate-800 drop-shadow-lg"></div>
             </div>

             {/* Wheel */}
             <div 
               className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden relative transition-transform duration-[4000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
               style={{ transform: `rotate(${rotation}deg)` }}
             >
                {rewards.map((reward, i) => (
                  <div 
                    key={i}
                    className="absolute w-[50%] h-[50%] top-0 right-0 origin-bottom-left"
                    style={{
                      backgroundColor: reward.color,
                      transform: `rotate(${i * sliceAngle}deg) skewY(-${90 - sliceAngle}deg)`,
                    }}
                  >
                    <div 
                      className="absolute left-0 bottom-0 origin-bottom-left flex items-center"
                      style={{ 
                        transform: `skewY(${90 - sliceAngle}deg) rotate(${sliceAngle/2}deg) translate(55px, 0)`,
                        height: '20px', 
                        width: '100px'
                      }}
                    >
                      <span style={{ 
                          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                          fontSize: '14px',
                          fontWeight: '800',
                        }}>
                        {reward.label}
                      </span>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Center Cap */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 border-2 border-slate-100">
                <Sparkles size={20} className="text-yellow-500" />
             </div>
          </div>
        )}

        {!winResult && (
          <button 
            onClick={spin}
            disabled={spinning}
            className="w-full bg-blue-600 text-white py-4 font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {spinning ? 'Spinning...' : 'SPIN NOW'}
          </button>
        )}
        {winResult && (
          <button 
            onClick={onClose}
            className="w-full bg-slate-900 text-white py-4 font-bold hover:bg-slate-800 transition-colors"
          >
            Collect Reward
          </button>
        )}
      </div>
    </div>
  );
};

export const Arcade: React.FC<ArcadeProps> = ({ user, onOpenSpin, onSpendPoints }) => {
  const [selectedItem, setSelectedItem] = useState<ArcadeItem | null>(null);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());

  const handlePurchase = () => {
    if (!selectedItem) return;
    
    if (user.points >= selectedItem.cost) {
        onSpendPoints(selectedItem.cost, selectedItem.title);
        setPurchasedItems(prev => new Set(prev).add(selectedItem.id));
        setSelectedItem(null);
        
        // Success Confetti
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            zIndex: 9999
        });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Confirmation Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                   <X size={20} />
                </button>
                <h3 className="text-xl font-bold mb-1 text-slate-900">Confirm Action</h3>
                <p className="text-slate-500 mb-6 text-sm">Use your points to access this reward.</p>
                
                {/* Item Preview */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100">
                   <div className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0" style={{backgroundImage: `url(${selectedItem.image})`}}></div>
                   <div>
                      <p className="font-bold text-slate-800 line-clamp-1">{selectedItem.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded border border-yellow-100">{selectedItem.cost} Pts</span>
                      </div>
                   </div>
                </div>

                {user.points < selectedItem.cost ? (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-sm font-medium">
                        <AlertCircle size={18} /> Not enough points!
                    </div>
                ) : (
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6 px-1">
                        <span>Current Balance:</span>
                        <span className="font-bold text-slate-800">{user.points.toLocaleString()} Pts</span>
                    </div>
                )}

                <div className="flex gap-3">
                   <button onClick={() => setSelectedItem(null)} className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
                   <button 
                     onClick={handlePurchase}
                     disabled={user.points < selectedItem.cost}
                     className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-200"
                   >
                     Confirm
                   </button>
                </div>
             </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">Arcade & Market</h2>
           <p className="text-slate-500">Play games or use your points to access exclusive opportunities.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 font-bold text-blue-600">
           Balance: {user.points.toLocaleString()} Pts
        </div>
      </div>

      {/* Mini Games Section */}
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
         <Gamepad2 className="text-purple-500" /> Mini Games
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Daily Spin */}
         <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-1 text-white shadow-lg transform hover:-translate-y-1 transition-transform cursor-pointer" onClick={onOpenSpin}>
            <div className="bg-white/10 backdrop-blur-md rounded-[22px] h-full p-6 flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
               <Gift size={48} className="mb-4 text-yellow-300" />
               <h4 className="text-2xl font-bold mb-2">Daily Spin</h4>
               <p className="opacity-90 mb-6">Spin the wheel every 24h for free points and XP.</p>
               <button 
                 className="mt-auto bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-colors pointer-events-none"
               >
                 Play Now
               </button>
            </div>
         </div>

         {/* Trivia */}
         <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center text-center hover:border-blue-200 transition-colors">
            <div className="p-4 bg-blue-50 rounded-full text-blue-600 mb-4">
               <Dices size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Music Trivia</h4>
            <p className="text-slate-500 mb-6">Test your knowledge about the latest hits and band history.</p>
            <button className="mt-auto w-full border-2 border-slate-100 text-slate-600 py-2 rounded-xl font-bold hover:bg-slate-50">
              Coming Soon
            </button>
         </div>
      </div>

      {/* Raffles Section */}
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 pt-4">
         <Ticket className="text-pink-500" /> Exclusive Access & Raffles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {MARKET_ITEMS.map((item) => {
             const isPurchased = purchasedItems.has(item.id);
             return (
                 <div key={item.id} className={`bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col ${isPurchased ? 'opacity-90' : ''}`}>
                    <div className="h-32 bg-slate-200 bg-cover bg-center" style={{backgroundImage: `url(${item.image})`}}></div>
                    <div className="p-5 flex-1 flex flex-col">
                       <div>
                           <span className={`text-xs font-bold px-2 py-1 rounded ${item.tagColor}`}>{item.tagLabel}</span>
                           <h4 className="text-lg font-bold text-slate-900 mt-2 mb-1">{item.title}</h4>
                           <p className="text-sm text-slate-500 mb-4">{item.description}</p>
                       </div>
                       <div className="mt-auto flex justify-between items-center">
                          <span className="text-sm font-bold text-slate-700">{item.cost} Pts {item.type === 'raffle' ? '/ Entry' : ''}</span>
                          {isPurchased ? (
                              <button disabled className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1 cursor-default">
                                  <CheckCircle size={16} /> {item.successLabel}
                              </button>
                          ) : (
                              <button 
                                onClick={() => setSelectedItem(item)}
                                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
                              >
                                {item.actionLabel}
                              </button>
                          )}
                       </div>
                    </div>
                 </div>
             );
         })}
      </div>
    </div>
  );
};

export { WheelModal };