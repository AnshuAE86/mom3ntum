import React, { useState } from 'react';
import { User, Achievement } from '../types';
import { Calendar, Award, Zap, Target, Users, Flame, Clock, Trophy, Copy, Check } from 'lucide-react';

interface ProfileProps {
  user: User;
  achievements: Achievement[];
}

export const Profile: React.FC<ProfileProps> = ({ user, achievements }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-6 gap-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500">@{user.handle}</p>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
              <Calendar size={14} />
              Joined {user.joinedDate.toLocaleDateString()}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <div className="flex items-center gap-2 text-slate-500 mb-1 text-xs font-bold uppercase tracking-wider">
                 <Zap size={14} className="text-blue-500" /> Level {user.level}
               </div>
               <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                 <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(user.xp / user.maxXp) * 100}%` }}></div>
               </div>
               <div className="text-right text-xs text-slate-400 mt-1">{user.xp} / {user.maxXp} XP</div>
             </div>
             
             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-bold uppercase tracking-wider">
                  <Flame size={14} className="text-orange-500" /> Streak
                </div>
                <div className="text-2xl font-bold text-slate-800">{user.currentStreak} Days</div>
             </div>

             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-bold uppercase tracking-wider">
                  <Target size={14} className="text-green-500" /> Quests
                </div>
                <div className="text-2xl font-bold text-slate-800">{user.questsCompleted}</div>
             </div>

             <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2 text-xs font-bold uppercase tracking-wider">
                  <Users size={14} className="text-purple-500" /> Referrals
                </div>
                <div className="text-2xl font-bold text-slate-800">{user.referralCount}</div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stats Column */}
        <div className="space-y-6">

          {/* Referral Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users size={18} className="text-purple-500" /> Referral Center
            </h3>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100 text-center">
                <p className="text-sm text-purple-900 mb-2 font-medium">Your Unique Referral Code</p>
                <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-mono font-bold text-purple-700 tracking-wider">{user.referralCode}</span>
                    <button onClick={copyToClipboard} className="p-2 hover:bg-purple-200 rounded-lg transition-colors text-purple-600">
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>
                <p className="text-xs text-purple-600 mt-2">Share this code to earn 500 XP per friend!</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Trophy size={18} className="text-yellow-500" /> Lifetime Stats
             </h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                 <span className="text-slate-500 text-sm">Total XP Earned</span>
                 <span className="font-mono font-bold text-slate-700">{user.totalXpEarned.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                 <span className="text-slate-500 text-sm">Total Points</span>
                 <span className="font-mono font-bold text-slate-700">{user.totalPointsEarned.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-slate-50">
                 <span className="text-slate-500 text-sm">Badges Unlocked</span>
                 <span className="font-mono font-bold text-slate-700">{user.achievements.length} / {achievements.length}</span>
               </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Award size={18} className="text-indigo-500" /> Achievements
             </h3>
             <div className="grid grid-cols-3 gap-2">
                {achievements.map(ach => {
                  const unlocked = user.achievements.includes(ach.id);
                  return (
                    <div key={ach.id} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 text-center border ${unlocked ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                       <div className={`${unlocked ? 'text-indigo-600' : 'text-slate-400'}`}>
                         <ach.icon size={20} />
                       </div>
                       <span className="text-[10px] mt-1 font-medium truncate w-full">{ach.title}</span>
                    </div>
                  )
                })}
             </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="md:col-span-2">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full">
             <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <Clock size={18} className="text-slate-400" /> Recent Activity
             </h3>
             <div className="space-y-6">
                {user.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      activity.type === 'quest' ? 'bg-green-100 text-green-600' :
                      activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                      activity.type === 'game' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'quest' && <Target size={18} />}
                      {activity.type === 'achievement' && <Award size={18} />}
                      {activity.type === 'game' && <Zap size={18} />}
                      {activity.type === 'social' && <Users size={18} />}
                    </div>
                    <div className="flex-1 pb-6 border-b border-slate-50 last:border-0 last:pb-0">
                      <p className="text-slate-800 font-medium">{activity.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-slate-400">{activity.timestamp.toLocaleDateString()}</span>
                        {activity.reward && (
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {activity.reward}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {user.recentActivity.length === 0 && (
                  <p className="text-slate-500 text-center py-8">No recent activity found.</p>
                )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};