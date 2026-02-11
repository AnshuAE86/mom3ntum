
export interface Activity {
  id: string;
  type: 'quest' | 'achievement' | 'social' | 'game' | 'fvt' | 'reward';
  description: string;
  timestamp: Date;
  reward?: string;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  level: number;
  xp: number;
  maxXp: number;
  points: number;
  fvt: number; // Face Value Tickets count (Max 5)
  premium: boolean;
  achievements: string[];
  joinedDate: Date;
  questsCompleted: number;
  totalXpEarned: number;
  totalPointsEarned: number;
  currentStreak: number;
  referralCount: number;
  referralCode: string;
  recentActivity: Activity[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  rewardPoints: number;
  type: 'daily' | 'weekly' | 'seasonal' | 'one-time' | 'ai-generated';
  completed: boolean;
  progress: number;
  total: number;
  link?: string;
}

export interface Reward {
  type: 'mp' | 'xp' | 'badge' | 'avatar' | 'banner' | 'sticker' | 'fvt';
  value: number | string;
  label: string;
}

export interface BattlePassTier {
  tier: number;
  requiredXp: number;
  freeReward: Reward;
  premiumReward: Reward;
  claimedFree: boolean;
  claimedPremium: boolean;
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isSystem?: boolean;
  channel?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any; // Icon component or string
}

export interface Notification {
  id: string;
  text: string;
  read: boolean;
  timestamp: Date;
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  QUESTS = 'QUESTS',
  ARCADE = 'ARCADE',
  LEADERBOARD = 'LEADERBOARD',
  SEASONAL_JOURNEY = 'SEASONAL_JOURNEY',
  EVENTS = 'EVENTS',
  SOCIAL = 'SOCIAL',
  ANALYTICS = 'ANALYTICS',
  PROFILE = 'PROFILE'
}
