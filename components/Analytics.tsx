import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Users, DollarSign, Target, Activity, Play } from 'lucide-react';

const data = [
  { name: 'Mon', active: 4000, points: 2400 },
  { name: 'Tue', active: 3000, points: 1398 },
  { name: 'Wed', active: 2000, points: 9800 },
  { name: 'Thu', active: 2780, points: 3908 },
  { name: 'Fri', active: 1890, points: 4800 },
  { name: 'Sat', active: 2390, points: 3800 },
  { name: 'Sun', active: 3490, points: 4300 },
];

const retentionData = [
  { name: 'Week 1', rate: 100 },
  { name: 'Week 2', rate: 85 },
  { name: 'Week 3', rate: 70 },
  { name: 'Week 4', rate: 65 },
  { name: 'Week 5', rate: 62 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: any;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} />
      </div>
      <span className="text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded-lg">
        +{change}%
      </span>
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Community Pulse</h2>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
          title="Total Users" 
          value="124,592" 
          change="12.5" 
          icon={Users} 
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Revenue" 
          value="$42,300" 
          change="8.2" 
          icon={DollarSign} 
          color="bg-green-50 text-green-600"
        />
        <StatCard 
          title="Quests Done" 
          value="854k" 
          change="24.3" 
          icon={Target} 
          color="bg-purple-50 text-purple-600"
        />
        <StatCard 
          title="Engagement" 
          value="68%" 
          change="5.1" 
          icon={Activity} 
          color="bg-orange-50 text-orange-600"
        />
        <StatCard 
          title="Play Rate" 
          value="42%" 
          change="15.8" 
          icon={Play} 
          color="bg-pink-50 text-pink-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Daily Active Fans</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#94a3b8" />
                <YAxis tick={{fontSize: 12}} stroke="#94a3b8"/>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-4 text-slate-700">Momentum Points Earned</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#94a3b8" />
                <YAxis tick={{fontSize: 12}} stroke="#94a3b8"/>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="points" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 lg:col-span-2">
           <h3 className="text-lg font-semibold mb-4 text-slate-700">Fan Retention Cohort</h3>
           <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <XAxis dataKey="name" tick={{fontSize: 12}} stroke="#94a3b8" />
                <YAxis tick={{fontSize: 12}} stroke="#94a3b8"/>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
