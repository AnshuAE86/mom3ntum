import React, { useState } from 'react';
import { ChatMessage, User } from '../types';
import { Send, Shield, Hash, Volume2, Trophy, Mic2, ChevronUp } from 'lucide-react';

interface SocialProps {
  user: User;
}

const channels = [
  { id: 'general', name: 'General', icon: Hash },
  { id: 'music', name: 'Music Lounge', icon: Volume2 },
  { id: 'sports', name: '#sports', icon: Trophy },
  { id: 'events', name: 'Live Events', icon: Mic2 }
];

export const Social: React.FC<SocialProps> = ({ user }) => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'StanFan_22', text: 'Did anyone see the setlist for tonight?', timestamp: new Date(Date.now() - 3600000), channel: 'music' },
    { id: '2', user: 'GoalKeeper99', text: 'That pass was incredible!', timestamp: new Date(Date.now() - 1800000), channel: 'sports' },
    { id: '3', user: 'System', text: 'Welcome to Mom3ntum Chat!', timestamp: new Date(), isSystem: true, channel: 'general' },
    { id: '4', user: 'AlexTrader', text: 'Hey everyone, just joined!', timestamp: new Date(), channel: 'general' },
    { id: '5', user: 'BeatMakerX', text: 'The new album drops in 2 hours!', timestamp: new Date(Date.now() - 120000), channel: 'music' },
    { id: '6', user: 'SoccerMom', text: 'Anyone selling a spare ticket for the finals?', timestamp: new Date(Date.now() - 300000), channel: 'sports' },
    { id: '7', user: 'TechWiz', text: 'Is the Arcade leaderboard updating for you guys?', timestamp: new Date(Date.now() - 900000), channel: 'general' },
    { id: '8', user: 'IndieRocker', text: 'I heard there is a secret track on the vinyl edition.', timestamp: new Date(Date.now() - 60000), channel: 'music' },
    { id: '9', user: 'Striker09', text: 'We need to strengthen our defense next season.', timestamp: new Date(Date.now() - 400000), channel: 'sports' },
    { id: '10', user: 'EventJunkie', text: 'Just RSVPed for the AMA!', timestamp: new Date(Date.now() - 500000), channel: 'events' },
    { id: '11', user: 'Mod_Sarah', text: 'Please keep the chat civil everyone.', timestamp: new Date(Date.now() - 1000000), channel: 'general' },
    { id: '12', user: 'BassHead', text: 'Who is going to the festival next month?', timestamp: new Date(Date.now() - 200000), channel: 'events' },
    { id: '13', user: 'SportsFan88', text: 'The referee missed that call completely!', timestamp: new Date(Date.now() - 60000), channel: 'sports' },
    { id: '14', user: 'GymRat', text: 'Anyone want to discuss the training regimen?', timestamp: new Date(Date.now() - 120000), channel: 'sports' },
    { id: '15', user: 'TicketMaster', text: 'New face-value-access options are up in the Arcade!', timestamp: new Date(Date.now() - 10000), channel: 'general' },
    // Historical message to demonstrate date header
    { id: '0', user: 'OldTimer', text: 'Welcome to the beta channel!', timestamp: new Date(Date.now() - 86400000 * 2), channel: 'general' } 
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      user: user.name,
      text: inputText,
      timestamp: new Date(),
      channel: activeChannel
    };
    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const formatDateHeader = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    }
  };

  const currentMessages = messages
    .filter(m => m.channel === activeChannel)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] min-h-[500px]">
      
      {/* Sidebar: Channels & Teams */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-3 px-2">Channels</h3>
          <div className="space-y-1">
            {channels.map(channel => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeChannel === channel.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <channel.icon size={18} />
                {channel.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-purple-600"/> My Squad
          </h3>
          
          <div className="flex -space-x-3 mb-4">
            {[1,2,3].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://picsum.photos/100/100?random=${i}`} alt="Avatar" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-bold">+2</div>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Hash size={18} className="text-slate-400" />
            <h3 className="font-bold text-slate-800 capitalize">{channels.find(c => c.id === activeChannel)?.name}</h3>
          </div>
          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            1,240 Online
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          {/* Scroll Up Hint */}
          <div className="flex flex-col items-center py-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer mb-2">
             <ChevronUp size={20} className="text-slate-400 animate-bounce mb-1" />
             <span className="text-[10px] text-slate-400 font-medium">Load previous messages</span>
          </div>

          {currentMessages.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              <p>No messages yet in #{activeChannel}. Be the first!</p>
            </div>
          )}

          {currentMessages.map((msg, index) => {
            const showDateHeader = index === 0 || 
              currentMessages[index - 1].timestamp.toDateString() !== msg.timestamp.toDateString();

            return (
              <React.Fragment key={msg.id}>
                {showDateHeader && (
                  <div className="flex justify-center my-6">
                    <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                      {formatDateHeader(msg.timestamp)}
                    </span>
                  </div>
                )}
                <div className={`flex flex-col ${msg.user === user.name ? 'items-end' : 'items-start'}`}>
                  {!msg.isSystem && (
                    <div className="flex items-center gap-2 mb-1 px-1">
                      <span className="text-xs text-slate-500 font-semibold">{msg.user}</span>
                      <span className="text-[10px] text-slate-400">{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                  )}
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.isSystem 
                      ? 'bg-yellow-50 text-yellow-800 border border-yellow-100 w-full text-center'
                      : msg.user === user.name
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Message #${activeChannel}...`}
              className="flex-1 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};