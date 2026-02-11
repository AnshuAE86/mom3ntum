
import React from 'react';
import { BattlePassTier, User, Reward } from '../types';
import { Lock, Map, Coins, Star, Award, Image, User as UserIcon, Check, Sticker, Ticket } from 'lucide-react';

interface BattlePassProps {
  tiers: BattlePassTier[];
  user: User;
  onClaim: (tier: number, isPremium: boolean) => void;
}

const RewardIcon: React.FC<{ type: Reward['type'], size?: number }> = ({ type, size = 24 }) => {
  switch (type) {
    case 'mp': return <Coins size={size} className="text-yellow-500" />;
    case 'xp': return <ZapIcon size={size} />;
    case 'badge': return <Award size={size} className="text-orange-500" />;
    case 'avatar': return <UserIcon size={size} className="text-blue-500" />;
    case 'banner': return <Image size={size} className="text-purple-500" />;
    case 'sticker': return <Sticker size={size} className="text-pink-500" />;
    case 'fvt': return <Ticket size={size} className="text-pink-500" />;
    default: return <Star size={size} className="text-slate-400" />;
  }
};

// Helper for XP icon since Zap is used elsewhere
const ZapIcon = ({ size }: { size: number }) => (
    <div className="text-blue-500">
        <Star size={size} fill="currentColor" className="text-blue-500" />
    </div>
);

export const BattlePass: React.FC<BattlePassProps> = ({ tiers, user, onClaim }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Map className="text-indigo-600" /> Seasonal Journey
          </h2>
          <p className="text-slate-500">Season 4: "Electric Summer" ends in 12 days</p>
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 border-2 border-yellow-400">
          Unlock VIP 👑
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 overflow-x-auto">
        <div className="min-w-[1000px] pb-4">
          
          {/* Track Labels */}
          <div className="flex gap-4 mb-4 pl-40">
             <div className="w-[300px] flex items-center gap-2 font-bold text-slate-400 uppercase text-xs tracking-wider">
                Free Track
             </div>
          </div>

          <div className="flex gap-6">
            {tiers.map((tier) => {
              const isUnlocked = user.level >= tier.tier;
              const isCurrent = user.level === tier.tier;

              return (
                <div key={tier.tier} className="flex flex-col items-center gap-4 w-40 relative group">
                  
                  {/* Header Level */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm z-10 border-4 border-white ${isUnlocked ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {tier.tier}
                  </div>
                  
                  {/* Free Track Card */}
                  <div className={`w-full h-40 rounded-2xl border-2 flex flex-col items-center justify-between p-3 text-center transition-all shadow-sm ${isUnlocked ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
                    <div className="mt-2 bg-white p-2 rounded-full shadow-sm">
                       <RewardIcon type={tier.freeReward.type} size={28} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 line-clamp-2 px-1">{tier.freeReward.label}</span>
                    
                    {tier.claimedFree ? (
                         <div className="w-full bg-green-100 text-green-700 text-xs py-1.5 rounded-lg font-bold flex items-center justify-center gap-1">
                             <Check size={12} /> Claimed
                         </div>
                    ) : (
                        <button 
                            onClick={() => onClaim(tier.tier, false)}
                            disabled={!isUnlocked}
                            className={`w-full text-xs py-1.5 rounded-lg font-bold transition-colors ${
                                isUnlocked 
                                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            {isUnlocked ? 'Claim' : 'Locked'}
                        </button>
                    )}
                  </div>

                  {/* Connector Line */}
                  <div className="h-6 w-0.5 bg-slate-200"></div>

                  {/* Premium Track Card */}
                  <div className={`w-full h-40 rounded-2xl border-2 flex flex-col items-center justify-between p-3 text-center relative overflow-hidden shadow-sm ${isUnlocked && user.premium ? 'border-yellow-200 bg-yellow-50/50' : 'border-slate-200 bg-slate-100'}`}>
                    {!user.premium && (
                      <div className="absolute inset-0 bg-slate-900/5 flex items-center justify-center backdrop-blur-[1px] z-10 rounded-xl">
                        <Lock size={20} className="text-slate-400" />
                      </div>
                    )}
                    
                    {/* Visual representation of reward */}
                     {tier.premiumReward.type === 'avatar' || tier.premiumReward.type === 'banner' ? (
                        <div className="mt-2 w-12 h-12 rounded-lg bg-cover bg-center shadow-sm border border-white" style={{backgroundImage: `url(${tier.premiumReward.value})`}}></div>
                     ) : (
                        <div className="mt-2 bg-white p-2 rounded-full shadow-sm">
                             <RewardIcon type={tier.premiumReward.type} size={28} />
                        </div>
                     )}

                    <span className="text-xs font-bold text-slate-700 line-clamp-2 px-1">{tier.premiumReward.label}</span>
                    
                    <div className="w-full relative z-20">
                         {tier.claimedPremium ? (
                             <div className="w-full bg-green-100 text-green-700 text-xs py-1.5 rounded-lg font-bold flex items-center justify-center gap-1">
                                 <Check size={12} /> Claimed
                             </div>
                        ) : (
                            <button 
                                onClick={() => onClaim(tier.tier, true)}
                                disabled={!isUnlocked || !user.premium}
                                className={`w-full text-xs py-1.5 rounded-lg font-bold transition-colors ${
                                    isUnlocked && user.premium
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md shadow-yellow-200' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                {isUnlocked && user.premium ? 'Claim VIP' : 'VIP Only'}
                            </button>
                        )}
                    </div>
                    
                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[9px] font-black px-1.5 py-0.5 rounded-bl-lg">
                        VIP
                    </div>
                  </div>

                  {/* Progress Connector (Horizontal) */}
                  <div className="absolute top-5 -right-3 w-6 h-1 bg-slate-200 -z-10"></div>
                  {isUnlocked && (
                       <div className="absolute top-5 -right-3 w-6 h-1 bg-green-500 -z-10"></div>
                  )}

                  {isCurrent && (
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[110%] h-[105%] border-2 border-green-500 rounded-3xl -z-10 opacity-30 animate-pulse pointer-events-none"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
