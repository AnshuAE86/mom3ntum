import React, { useState } from 'react';
import { Calendar, MapPin, Ticket, Check } from 'lucide-react';

const mockEvents = [
  { id: 1, title: 'Man City vs Arsenal', date: 'Sat, 15 Oct - 15:00', type: 'Sports', location: 'Etihad Stadium' },
  { id: 2, title: 'Taylor Swift - The Eras Tour', date: 'Fri, 21 Oct - 19:30', type: 'Music', location: 'Wembley Stadium' },
  { id: 3, title: 'Community AMA with Devs', date: 'Tue, 18 Oct - 18:00', type: 'Online', location: 'Discord Stage' },
  { id: 4, title: 'Weekly Trivia Tournament', date: 'Sun, 16 Oct - 20:00', type: 'Game', location: 'Arcade Tab' },
];

export const Events: React.FC = () => {
  const [rsvps, setRsvps] = useState<Set<number>>(new Set());

  const handleRsvp = (id: number) => {
    const newRsvps = new Set(rsvps);
    newRsvps.add(id);
    setRsvps(newRsvps);
    // In a real app, this would trigger an API call
    alert("You have successfully RSVP'd! You will be notified when the event starts.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             <Calendar className="text-pink-600" /> Upcoming Events
           </h2>
           <p className="text-slate-500">Reserve your spot for exclusive community moments</p>
        </div>
      </div>

      <div className="grid gap-4">
         {mockEvents.map(evt => {
           const isRsvpd = rsvps.has(evt.id);
           return (
             <div key={evt.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-all flex flex-col md:flex-row gap-6 items-center shadow-sm">
                <div className="bg-slate-100 rounded-2xl w-full md:w-24 h-24 flex flex-col items-center justify-center text-slate-500 font-bold shrink-0">
                   <span className="text-xs uppercase tracking-wider mb-1">{evt.type}</span>
                   <Calendar size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                   <h4 className="font-bold text-xl text-slate-800">{evt.title}</h4>
                   <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm text-slate-500 mt-2">
                      <span className="flex items-center gap-1 justify-center md:justify-start"><Calendar size={16}/> {evt.date}</span>
                      <span className="flex items-center gap-1 justify-center md:justify-start"><MapPin size={16}/> {evt.location}</span>
                   </div>
                </div>
                {isRsvpd ? (
                   <button disabled className="bg-green-100 text-green-700 px-8 py-3 rounded-xl font-bold flex items-center gap-2 cursor-default">
                     <Check size={18} />
                     RSVP'd
                   </button>
                ) : (
                   <button 
                    onClick={() => handleRsvp(evt.id)}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2 transition-colors"
                   >
                     <Ticket size={18} />
                     RSVP
                   </button>
                )}
             </div>
           );
         })}
      </div>
    </div>
  );
};