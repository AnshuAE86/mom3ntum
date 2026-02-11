import React, { useState } from 'react';
import { User, Achievement } from '../types';
import { Calendar, Award, Zap, Target, Users, Flame, Clock, Trophy, Copy, Check, Ticket, Edit, X, Coins, CreditCard } from 'lucide-react';

interface ProfileProps {
  user: User;
  achievements: Achievement[];
  onUpdateProfile: (name: string, bio: string, avatar: string) => void;
  onConvertFvt: () => void;
  onPurchaseFvt: (amount: number) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, achievements, onUpdateProfile, onConvertFvt, onPurchaseFvt }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showFvtConfirm, setShowFvtConfirm] = useState(false);
  
  // Edit State
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [editAvatar, setEditAvatar] = useState(user.avatar);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = () => {
    onUpdateProfile(editName, editBio, editAvatar);
    setIsEditing(false);
  };

  const handleConvertClick = () => {
    setShowFvtConfirm(true);
  };

  const confirmConvert = () => {
    onConvertFvt();
    setShowFvtConfirm(false);
  };

  const fvtCap = 5;
  const isCapReached = user.fvt >= fvtCap;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in relative">

      {/* FVT Conversion Confirmation Modal */}
      {showFvtConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
             <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl relative">
                <button onClick={() => setShowFvtConfirm(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                   <X size={20} />
                </button>
                <h3 className="text-xl font-bold mb-1 text-slate-900">Confirm Conversion</h3>
                <p className="text-slate-500 mb-6 text-sm">Convert 10,000 Mom3ntum Points into 1 Face Value Ticket?</p>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-2 px-1">
                    <span>Current Balance:</span>
                    <span className="font-bold text-slate-800">{user.points.toLocaleString()} MP</span>
                </div>
                
                 <div className="flex items-center justify-between text-sm text-slate-500 mb-6 px-1 border-t border-slate-100 pt-2">
                    <span>Cost:</span>
                    <span className="font-bold text-red-600">-10,000 MP</span>
                </div>

                <div className="flex gap-3">
                   <button onClick={() => setShowFvtConfirm(false)} className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
                   <button 
                     onClick={confirmConvert}
                     className="flex-1 py-3 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200"
                   >
                     Confirm
                   </button>
                </div>
             </div>
        </div>
      )}
      
      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-slate-900">Edit Profile</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Display Name</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 bg-white text-slate-900 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Avatar URL</label>
                <input 
                  type="text" 
                  value={editAvatar} 
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full px-4 py-2 bg-white text-slate-900 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Bio</label>
                <textarea 
                  value={editBio} 
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-4 py-2 bg-white text-slate-900 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none placeholder-slate-400"
                />
              </div>
              <button 
                onClick={handleSaveProfile}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 mb-6 gap-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-md bg-white object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                 <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                 <button onClick={() => setIsEditing(true)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Edit size={16} />
                 </button>
              </div>
              <p className="text-slate-500">@{user.handle}</p>
              <p className="text-sm text-slate-600 mt-2 max-w-lg">{user.bio}</p>
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
                  <Ticket size={14} className="text-pink-500" /> FVT
                </div>
                <div className="text-2xl font-bold text-slate-800">{user.fvt} <span className="text-xs text-slate-400 font-normal">/ 5</span></div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">

           {/* FVT Wallet Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Ticket size={120} className="text-pink-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 relative z-10">
                <Ticket size={18} className="text-pink-500" /> Face Value Tickets
            </h3>
            
            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100 mb-4 relative z-10 text-center">
                 <p className="text-xs text-pink-700 font-bold uppercase tracking-wider mb-1">Wallet Balance</p>
                 <div className="text-4xl font-black text-pink-600 mb-1">{user.fvt} <span className="text-lg text-pink-400">/ 5</span></div>
                 <p className="text-[10px] text-pink-600">Hard Cap: 5 Tickets</p>
            </div>

            <div className="space-y-3 relative z-10">
                <button 
                    onClick={handleConvertClick}
                    disabled={isCapReached || user.points < 10000}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-lg text-yellow-600 group-hover:bg-yellow-200 transition-colors">
                            <Coins size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-sm font-bold text-slate-800">Convert Points</div>
                            <div className="text-[10px] text-slate-500">10,000 MP → 1 FVT</div>
                        </div>
                    </div>
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={() => onPurchaseFvt(1)}
                        disabled={isCapReached}
                        className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="text-sm font-bold text-slate-800">$45</span>
                        <span className="text-[10px] text-slate-500">Buy 1 FVT</span>
                    </button>
                    <button 
                        onClick={() => onPurchaseFvt(5)}
                        disabled={user.fvt > 0} // Can only buy bundle if empty to not exceed cap logic easily (or simple check)
                        className="flex flex-col items-center justify-center p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                         <span className="text-sm font-bold text-slate-800">$150</span>
                         <span className="text-[10px] text-slate-500">Buy 5 FVT</span>
                    </button>
                </div>
            </div>
          </div>

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
        </div>

        {/* Activity Feed & Badges */}
        <div className="md:col-span-2 space-y-6">
           
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
               <Award size={18} className="text-indigo-500" /> Achievements
             </h3>
             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {achievements.map(ach => {
                  const unlocked = user.achievements.includes(ach.id);
                  return (
                    <div key={ach.id} className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 text-center border ${unlocked ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100 opacity-50'}`}>
                       <div className={`${unlocked ? 'text-indigo-600' : 'text-slate-400'}`}>
                         <ach.icon size={24} />
                       </div>
                       <span className="text-[10px] mt-2 font-medium truncate w-full">{ach.title}</span>
                    </div>
                  )
                })}
             </div>
          </div>

           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[400px]">
             <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <Clock size={18} className="text-slate-400" /> Recent Activity
             </h3>
             <div className="space-y-6">
                {user.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      activity.type === 'quest' ? 'bg-green-100 text-green-600' :
                      activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                      activity.type === 'game' ? 'bg-purple-100 text-purple-600' :
                      activity.type === 'fvt' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'quest' && <Target size={18} />}
                      {activity.type === 'achievement' && <Award size={18} />}
                      {activity.type === 'game' && <Zap size={18} />}
                      {activity.type === 'social' && <Users size={18} />}
                      {activity.type === 'fvt' && <Ticket size={18} />}
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