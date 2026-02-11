import React, { useState } from 'react';
import { LayoutDashboard, Target, Award, MessageSquare, PieChart, Menu, X, Gift, Trophy, Gamepad2, Star, Zap, Music, Bell, Map, User as UserIcon, Calendar } from 'lucide-react';
import { User, Quest, BattlePassTier, ViewState, Achievement, Notification } from './types';
import { Dashboard } from './components/Dashboard';
import { QuestBoard } from './components/QuestBoard';
import { BattlePass } from './components/BattlePass';
import { Social } from './components/Social';
import { Analytics } from './components/Analytics';
import { Leaderboard } from './components/Leaderboard';
import { Arcade, WheelModal } from './components/Arcade';
import { Profile } from './components/Profile';
import { Landing } from './components/Landing';
import { Events } from './components/Events';

// Initial Mock Data
const initialUser: User = {
  id: 'u1',
  name: 'AlexFan_22',
  handle: 'alex_fandom',
  avatar: 'https://picsum.photos/200',
  level: 12,
  xp: 2750, 
  maxXp: 3000,
  points: 1450,
  premium: false,
  achievements: ['ach1', 'ach2'],
  joinedDate: new Date('2025-01-15'),
  questsCompleted: 42,
  totalXpEarned: 15400,
  totalPointsEarned: 6200,
  currentStreak: 5,
  referralCount: 2,
  referralCode: 'ALEX2025',
  recentActivity: [
    { id: 'act1', type: 'quest', description: 'Completed "Daily Pulse"', timestamp: new Date(), reward: '50 XP' },
    { id: 'act2', type: 'social', description: 'Joined #music channel', timestamp: new Date(Date.now() - 86400000) },
    { id: 'act3', type: 'game', description: 'Won 100 Pts in Daily Spin', timestamp: new Date(Date.now() - 172800000), reward: '100 Pts' },
  ]
};

const initialAchievements: Achievement[] = [
  { id: 'ach1', title: 'Early Bird', description: 'Joined during launch week', icon: Star },
  { id: 'ach2', title: 'Quest Hunter', description: 'Completed 10 daily quests', icon: Target },
  { id: 'ach3', title: 'Social Butterfly', description: 'Sent 100 messages in chat', icon: MessageSquare },
  { id: 'ach4', title: 'High Roller', description: 'Earned 5000 points', icon: Zap },
  { id: 'ach5', title: 'Music Maestro', description: 'Streamed 100 hours of music', icon: Music },
];

const initialQuests: Quest[] = [
  { id: 'q1', title: 'Daily Pulse', description: 'Log in to Mom3ntum today.', rewardXp: 50, rewardPoints: 10, type: 'daily', completed: true, progress: 1, total: 1, link: '#' },
  { id: 'q2', title: 'Refer 3 Friends', description: 'Invite friends to join Mom3ntum.', rewardXp: 500, rewardPoints: 200, type: 'weekly', completed: false, progress: 2, total: 3, link: `internal:${ViewState.PROFILE}` },
  { id: 'q3', title: 'Game Master', description: 'Play 5 mini-games in the Arcade.', rewardXp: 300, rewardPoints: 100, type: 'weekly', completed: false, progress: 1, total: 5, link: `internal:${ViewState.ARCADE}` },
  { id: 'q4', title: 'Social Butterfly', description: 'Post 10 messages in community chat.', rewardXp: 200, rewardPoints: 50, type: 'weekly', completed: false, progress: 3, total: 10, link: `internal:${ViewState.SOCIAL}` },
  { id: 'q5', title: 'Read Article', description: 'Read "The Future of Fandom" in the news section.', rewardXp: 50, rewardPoints: 20, type: 'daily', completed: false, progress: 0, total: 1, link: 'https://medium.com' },
  { id: 'q6', title: 'Take Quiz', description: 'Test your knowledge on the latest article.', rewardXp: 100, rewardPoints: 50, type: 'daily', completed: false, progress: 0, total: 1, link: `internal:${ViewState.ARCADE}` },
  { id: 'q7', title: 'Create Content', description: 'Post a reaction video to the new single.', rewardXp: 500, rewardPoints: 250, type: 'weekly', completed: false, progress: 0, total: 1, link: '#' },
  { id: 'q8', title: 'Join Discord', description: 'Connect with the community on Discord.', rewardXp: 200, rewardPoints: 100, type: 'one-time', completed: false, progress: 0, total: 1, link: 'https://discord.com' },
];

const battlePassTiers: BattlePassTier[] = Array.from({ length: 10 }, (_, i) => ({
  tier: i + 1,
  freeReward: `${(i + 1) * 10} Points`,
  premiumReward: `Exclusive Sticker #${i + 1}`,
  requiredXp: (i + 1) * 1000,
  claimed: false
}));

const mockNotifications: Notification[] = [
  { id: 'n1', text: 'New Quest: "Game Master" is available!', read: false, timestamp: new Date() },
  { id: 'n2', text: 'Community Goal: 1M Points reached! Bonus unlocked.', read: false, timestamp: new Date(Date.now() - 3600000) },
];

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [user, setUser] = useState<User>(initialUser);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleCompleteQuest = (id: string) => {
    setQuests(prev => prev.map(q => {
      if (q.id === id) {
        // Leveling Logic
        let newXp = user.xp + q.rewardXp;
        const newPoints = user.points + q.rewardPoints;
        let newLevel = user.level;
        let newMaxXp = user.maxXp;

        // Loop to handle multiple level ups if XP gain is huge
        while (newXp >= newMaxXp) {
          newXp = newXp - newMaxXp;
          newLevel += 1;
          // Increase XP requirement by 20% each level
          newMaxXp = Math.floor(newMaxXp * 1.2);
        }

        setUser(u => ({ 
          ...u, 
          xp: newXp, 
          level: newLevel,
          maxXp: newMaxXp,
          points: newPoints,
          questsCompleted: u.questsCompleted + 1,
          totalXpEarned: u.totalXpEarned + q.rewardXp,
          totalPointsEarned: u.totalPointsEarned + q.rewardPoints,
          recentActivity: [
            { id: `act-${Date.now()}`, type: 'quest', description: `Completed "${q.title}"`, timestamp: new Date(), reward: `${q.rewardPoints} Pts` },
            ...u.recentActivity
          ]
        }));
        return { ...q, completed: true, progress: q.total };
      }
      return q;
    }));
  };

  const handleAddQuests = (newQuests: Quest[]) => {
    setQuests([...quests, ...newQuests]);
  };

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleSpendPoints = (amount: number, description: string) => {
    setUser(prev => ({
      ...prev,
      points: prev.points - amount,
      recentActivity: [
        { id: `spend-${Date.now()}`, type: 'game', description: `Purchased: ${description}`, timestamp: new Date(), reward: `-${amount} Pts` },
        ...prev.recentActivity
      ]
    }));
  };

  const navItems = [
    { view: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { view: ViewState.QUESTS, label: 'Quests', icon: Target },
    { view: ViewState.EVENTS, label: 'Events', icon: Calendar },
    { view: ViewState.ARCADE, label: 'Arcade', icon: Gamepad2 },
    { view: ViewState.LEADERBOARD, label: 'Leaderboard', icon: Trophy },
    { view: ViewState.SEASONAL_JOURNEY, label: 'Seasonal Journey', icon: Map },
    { view: ViewState.SOCIAL, label: 'Social', icon: MessageSquare },
    { view: ViewState.ANALYTICS, label: 'Analytics', icon: PieChart },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {showLanding && <Landing onJoin={() => setShowLanding(false)} />}
      
      <div className={`flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden ${showLanding ? 'filter blur-sm' : ''}`}>
        
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
          <div className="p-6 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Mom3ntum</span>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${
                  currentView === item.view 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100 relative">
            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute bottom-full left-4 w-64 bg-white rounded-xl shadow-xl border border-slate-200 mb-2 p-2 z-50 animate-fade-in">
                 <h4 className="font-bold text-sm text-slate-700 px-2 py-2 border-b border-slate-100">Notifications</h4>
                 <div className="max-h-60 overflow-y-auto">
                   {notifications.map(n => (
                     <div key={n.id} className="p-2 hover:bg-slate-50 rounded-lg text-xs border-b border-slate-50 last:border-0">
                        <p className={`${n.read ? 'text-slate-500' : 'text-slate-800 font-semibold'}`}>{n.text}</p>
                        <span className="text-[10px] text-slate-400">{n.timestamp.toLocaleTimeString()}</span>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            <div className="bg-slate-900 text-white p-4 rounded-xl">
               <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => setCurrentView(ViewState.PROFILE)}>
                  <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-blue-500" alt="Profile" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-slate-400">Level {user.level}</p>
                  </div>
                  {/* Notification Bell */}
                  <div className="relative cursor-pointer hover:bg-slate-800 p-1 rounded-md" onClick={(e) => { e.stopPropagation(); setShowNotifications(!showNotifications); setNotifications(prev => prev.map(n => ({...n, read: true}))); }}>
                     <Bell size={16} />
                     {unreadCount > 0 && (
                       <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                     )}
                  </div>
               </div>
               <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
                 <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(user.xp / user.maxXp) * 100}%` }}></div>
               </div>
               <div className="flex justify-between items-center text-xs">
                  <span className="text-yellow-400 flex items-center gap-1 font-bold">
                    {user.points.toLocaleString()} Pts
                  </span>
                  <button onClick={() => setShowSpin(true)} className="text-blue-300 hover:text-white transition-colors">Spin</button>
               </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Mobile Header */}
          <header className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center z-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Zap className="text-white" size={18} />
              </div>
              <span className="font-bold text-lg">Mom3ntum</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </header>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute inset-0 bg-white z-10 pt-20 px-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => { setCurrentView(item.view); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl text-lg font-medium ${
                    currentView === item.view ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
                  }`}
                >
                  <item.icon size={24} />
                  {item.label}
                </button>
              ))}
               <button
                  onClick={() => { setCurrentView(ViewState.PROFILE); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-4 w-full p-4 rounded-xl text-lg font-medium ${
                    currentView === ViewState.PROFILE ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
                  }`}
                >
                  <UserIcon size={24} />
                  Profile
                </button>
            </div>
          )}

          {/* Scrollable View Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
             {currentView === ViewState.DASHBOARD && (
               <Dashboard 
                 user={user} 
                 activeQuests={quests.filter(q => !q.completed)} 
                 achievements={initialAchievements} 
                 onNavigate={handleNavigate}
               />
             )}
             {currentView === ViewState.QUESTS && (
               <QuestBoard 
                 quests={quests} 
                 onComplete={handleCompleteQuest} 
                 onAddQuests={handleAddQuests} 
                 onNavigate={handleNavigate}
               />
             )}
             {currentView === ViewState.EVENTS && <Events />}
             {currentView === ViewState.ARCADE && <Arcade user={user} onOpenSpin={() => setShowSpin(true)} onSpendPoints={handleSpendPoints} />}
             {currentView === ViewState.LEADERBOARD && <Leaderboard />}
             {currentView === ViewState.SEASONAL_JOURNEY && <BattlePass tiers={battlePassTiers} user={user} />}
             {currentView === ViewState.SOCIAL && <Social user={user} />}
             {currentView === ViewState.ANALYTICS && <Analytics />}
             {currentView === ViewState.PROFILE && <Profile user={user} achievements={initialAchievements} />}
          </div>
        </main>

        {/* Daily Spin Modal */}
        {showSpin && (
          <WheelModal 
            onClose={() => setShowSpin(false)} 
            onWin={(amount) => {
              if(amount > 0) {
                setUser(u => ({ 
                  ...u, 
                  points: u.points + amount,
                  totalPointsEarned: u.totalPointsEarned + amount,
                  recentActivity: [{ id: `spin-${Date.now()}`, type: 'game', description: 'Won Daily Spin', timestamp: new Date(), reward: `${amount} Pts` }, ...u.recentActivity]
                }));
              }
            }}
          />
        )}

      </div>
    </>
  );
};

export default App;