import React, { useState } from 'react';
import { User, Quest, Achievement, ViewState } from '../types';
import { TrendingUp, Award, Zap, Users, Star, Trophy, Target, X } from 'lucide-react';

interface DashboardProps {
  user: User;
  activeQuests: Quest[];
  achievements: Achievement[];
  onNavigate: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, activeQuests, achievements, onNavigate }) => {
  const [showAllBadges, setShowAllBadges] = useState(false);
  const completionRate = Math.round((activeQuests.filter(q => q.completed).length / activeQuests.length) * 100) || 0;

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* All Badges Modal */}
      {showAllBadges && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl relative max-h-[80vh] overflow-y-auto">
             <button onClick={() => setShowAllBadges(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
               <X size={24} />
             </button>
             <h3 className="text-2xl font-bold text-slate-800 mb-2">All Achievements</h3>
             <p className="text-slate-500 mb-6">Unlock badges by completing quests and engaging with the community.</p>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {achievements.map((ach) => {
                  const unlocked = user.achievements.includes(ach.id);
                  return (
                    <div key={ach.id} className={`flex flex-col items-center text-center p-4 rounded-xl border ${unlocked ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-60 grayscale'}`}>
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${unlocked ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                        <ach.icon size={28} />
                      </div>
                      <span className="font-bold text-slate-800 text-sm mb-1">{ach.title}</span>
                      <span className="text-xs text-slate-500">{ach.description}</span>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total XP</p>
            <h3 className="text-2xl font-bold text-slate-800">{user.xp.toLocaleString()}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-green-50 rounded-xl text-green-600">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Level</p>
            <h3 className="text-2xl font-bold text-slate-800">{user.level}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Quest Rate</p>
            <h3 className="text-2xl font-bold text-slate-800">{completionRate}%</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Global Rank</p>
            <h3 className="text-2xl font-bold text-slate-800">#42</h3>
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-bold mb-2">Summer Tour 2025</h2>
          <p className="mb-6 opacity-90">Join the virtual tour experience! Earn exclusive backstage content, merch discounts, and meet & greet passes.</p>
          <button 
            onClick={() => onNavigate(ViewState.QUESTS)}
            className="bg-white text-blue-600 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-50 transition-colors"
          >
            Start Tour Quests
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1459749411177-0473ef71607b?q=80&w=2070&auto=format&fit=crop')] bg-cover opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Quests */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Active Quests</h3>
          <div className="space-y-4">
            {activeQuests.slice(0, 3).map(quest => (
              <div key={quest.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    quest.type === 'daily' ? 'bg-blue-100 text-blue-700' : 
                    quest.type === 'ai-generated' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {quest.type.toUpperCase()}
                  </span>
                  <span className="text-sm font-bold text-yellow-600 flex items-center gap-1">
                    +{quest.rewardPoints} MP
                  </span>
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">{quest.title}</h4>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{quest.description}</p>
                
                <div className="mt-auto">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Progress</span>
                    <span>{quest.progress} / {quest.total}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Achievements</h3>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
             <div className="grid grid-cols-3 gap-4 mb-4">
                {achievements.slice(0, 6).map((ach) => {
                  const unlocked = user.achievements.includes(ach.id);
                  return (
                    <div key={ach.id} className="flex flex-col items-center text-center">
                      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-all ${unlocked ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-100 text-slate-300 grayscale'}`}>
                        <ach.icon size={24} />
                      </div>
                      <span className={`text-xs font-medium ${unlocked ? 'text-slate-700' : 'text-slate-400'}`}>{ach.title}</span>
                    </div>
                  );
                })}
             </div>
             <div className="mt-auto pt-6 border-t border-slate-100 text-center">
                <button onClick={() => setShowAllBadges(true)} className="text-sm text-blue-600 font-semibold hover:text-blue-700">View All Badges</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
