import React from 'react';
import { BattlePassTier, User } from '../types';
import { Lock, Unlock, Map } from 'lucide-react';

interface BattlePassProps {
  tiers: BattlePassTier[];
  user: User;
}

export const BattlePass: React.FC<BattlePassProps> = ({ tiers, user }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Map className="text-indigo-600" /> Seasonal Journey
          </h2>
          <p className="text-slate-500">Season 4: "Electric Summer" ends in 12 days</p>
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
          Unlock VIP 👑
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="flex gap-4">
            {tiers.map((tier) => {
              const isUnlocked = user.level >= tier.tier;
              const isCurrent = user.level === tier.tier;

              return (
                <div key={tier.tier} className="flex flex-col items-center gap-4 w-32 relative">
                  {/* Header Level */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${isUnlocked ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {tier.tier}
                  </div>
                  
                  {/* Free Track */}
                  <div className={`w-28 h-32 rounded-xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all ${isUnlocked ? 'border-blue-200 bg-blue-50' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
                    <span className="text-2xl mb-2">🎁</span>
                    <span className="text-xs font-medium text-slate-700">{tier.freeReward}</span>
                    <div className="mt-2 text-xs text-blue-600 font-bold">FREE</div>
                  </div>

                  {/* Connector Line */}
                  <div className="h-8 w-1 border-l-2 border-dashed border-slate-300"></div>

                  {/* Premium Track */}
                  <div className={`w-28 h-32 rounded-xl border-2 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden ${isUnlocked && user.premium ? 'border-yellow-200 bg-yellow-50' : 'border-slate-200 bg-slate-100'}`}>
                    {!user.premium && (
                      <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                        <Lock size={16} className="text-slate-400" />
                      </div>
                    )}
                    <span className="text-2xl mb-2">💎</span>
                    <span className="text-xs font-medium text-slate-700">{tier.premiumReward}</span>
                    <div className="mt-2 text-xs text-yellow-600 font-bold">VIP</div>
                  </div>

                  {isCurrent && (
                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-green-500 -z-10 opacity-50 blur-xl"></div>
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
