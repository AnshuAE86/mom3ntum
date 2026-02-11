import React, { useState } from 'react';
import { User } from '../types';
import { Trophy, Medal, Crown, Zap, Coins } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const [metric, setMetric] = useState<'xp' | 'points'>('xp');

  const users = [
    { rank: 1, name: 'SuperFan_01', xp: 12500, points: 5200, avatar: 'https://picsum.photos/200?random=10' },
    { rank: 2, name: 'MusicLover', xp: 11200, points: 4800, avatar: 'https://picsum.photos/200?random=11' },
    { rank: 3, name: 'CryptoKing', xp: 9800, points: 5500, avatar: 'https://picsum.photos/200?random=12' },
    { rank: 4, name: 'AliceWonder', xp: 8500, points: 3100, avatar: 'https://picsum.photos/200?random=13' },
    { rank: 5, name: 'BobBuilder', xp: 7200, points: 6900, avatar: 'https://picsum.photos/200?random=14' },
    { rank: 6, name: 'CharlieDay', xp: 6800, points: 2500, avatar: 'https://picsum.photos/200?random=15' },
    { rank: 7, name: 'DavidWave', xp: 5400, points: 2100, avatar: 'https://picsum.photos/200?random=16' },
  ];

  // Sort based on selected metric
  const sortedUsers = [...users].sort((a, b) => b[metric] - a[metric]).map((u, i) => ({...u, rank: i + 1}));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col items-center py-8">
        <h2 className="text-3xl font-bold text-slate-800">Global Leaderboard</h2>
        <p className="text-slate-500 mt-2 mb-6">Top fans this season</p>
        
        <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex">
           <button 
             onClick={() => setMetric('xp')}
             className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${metric === 'xp' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             <Zap size={16} /> By XP
           </button>
           <button 
             onClick={() => setMetric('points')}
             className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${metric === 'points' ? 'bg-yellow-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             <Coins size={16} /> By Points
           </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
          <div className="col-span-2 text-center">Rank</div>
          <div className="col-span-6">Fan</div>
          <div className="col-span-4 text-right">{metric === 'xp' ? 'Experience' : 'Total Points'}</div>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedUsers.map((user) => (
            <div key={user.name} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors animate-fade-in">
              <div className="col-span-2 flex justify-center">
                {user.rank === 1 && <Crown className="text-yellow-500 fill-yellow-500" size={24} />}
                {user.rank === 2 && <Medal className="text-slate-400 fill-slate-400" size={24} />}
                {user.rank === 3 && <Medal className="text-amber-700 fill-amber-700" size={24} />}
                {user.rank > 3 && <span className="text-slate-500 font-bold text-lg">#{user.rank}</span>}
              </div>
              <div className="col-span-6 flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                <span className={`font-semibold ${user.rank <= 3 ? 'text-slate-900' : 'text-slate-600'}`}>{user.name}</span>
              </div>
              <div className="col-span-4 text-right font-mono text-lg font-bold">
                {metric === 'xp' ? (
                  <span className="text-blue-600">{user.xp.toLocaleString()} XP</span>
                ) : (
                  <span className="text-yellow-600">{user.points.toLocaleString()} MP</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};