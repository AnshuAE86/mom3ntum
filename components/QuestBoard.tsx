import React, { useState } from 'react';
import { Quest, ViewState } from '../types';
import { CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface QuestBoardProps {
  quests: Quest[];
  onComplete: (id: string) => void;
  onAddQuests: (newQuests: Quest[]) => void;
  onNavigate: (view: ViewState) => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({ quests, onComplete, onAddQuests, onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly'>('all');

  const filteredQuests = quests.filter(q => filter === 'all' || q.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Quest Board</h2>
          <p className="text-slate-500">Complete tasks to earn Mom3ntum Points & XP</p>
        </div>
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-slate-200">
          {['all', 'daily', 'weekly'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                filter === f 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredQuests.map((quest) => (
          <div key={quest.id} className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4 transition-all ${quest.completed ? 'opacity-60 grayscale' : ''}`}>
            <div className={`p-3 rounded-full ${quest.completed ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
              <CheckCircle size={24} />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-semibold text-slate-800">{quest.title}</h4>
              <p className="text-sm text-slate-500">{quest.description}</p>
              <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">+{quest.rewardXp} XP</span>
                <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">+{quest.rewardPoints} Pts</span>
              </div>
            </div>

            <div className="w-full md:w-48">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>{quest.progress} / {quest.total}</span>
                <span>{Math.round((quest.progress / quest.total) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                <div 
                  className={`h-2.5 rounded-full ${quest.completed ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                ></div>
              </div>
              {!quest.completed && (
                <a 
                  href={quest.link || '#'}
                  target={quest.link?.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    if (quest.link?.startsWith('internal:')) {
                        const view = quest.link.split(':')[1] as ViewState;
                        onNavigate(view);
                    } else if (quest.link?.startsWith('http')) {
                        window.open(quest.link, '_blank');
                    } else {
                        onComplete(quest.id);
                    }
                  }}
                  className="block w-full text-center py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-2"
                >
                  {quest.link?.startsWith('internal:') ? 'Go Now' : 'Start Quest'} 
                  {quest.link?.startsWith('http') ? <ExternalLink size={12} /> : <ArrowRight size={12} />}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
