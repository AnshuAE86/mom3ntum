import React, { useState } from 'react';
import { Ticket, Users, Lock, ChevronDown, ChevronUp } from 'lucide-react';

export const Landing: React.FC<{ onJoin: () => void }> = ({ onJoin }) => {
  const [showHow, setShowHow] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 md:p-12 text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Tickets. At face value. Finally.
        </h1>
        <p className="text-xl text-slate-600 mb-10">
          Earn face-value-access to buy tickets at their original price.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-left md:text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
              <Users size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Engage</h3>
            <p className="text-sm text-slate-500">Participate in polls, quests, and predictions</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <Lock size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Unlock Access</h3>
            <p className="text-sm text-slate-500">Earn credits to reserve your spot</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <Ticket size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Buy at Face Value</h3>
            <p className="text-sm text-slate-500">Purchase tickets at original price</p>
          </div>
        </div>

        <button 
          onClick={onJoin}
          className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mb-8"
        >
          Join the community
        </button>

        <div className="border-t border-slate-100 pt-6">
          <button 
            onClick={() => setShowHow(!showHow)}
            className="flex items-center justify-center gap-2 text-slate-500 font-semibold hover:text-blue-600 mx-auto transition-colors"
          >
            How it works
            {showHow ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showHow && (
            <div className="mt-6 text-left space-y-6 bg-slate-50 p-6 rounded-xl animate-fade-in">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-slate-900">Engage with content</h4>
                  <p className="text-sm text-slate-500">Complete polls, quests, and predictions to earn access credits</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-slate-900">Unlock event access</h4>
                  <p className="text-sm text-slate-500">Use credits to reserve your opportunity for specific events</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-slate-900">Buy at face value</h4>
                  <p className="text-sm text-slate-500">Purchase tickets at their original price, no markup</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};