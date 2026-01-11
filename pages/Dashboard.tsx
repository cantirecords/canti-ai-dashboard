
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lead } from '../types';
import { METRICS } from '../constants';

interface DashboardProps {
  leads: Lead[];
}

const Dashboard: React.FC<DashboardProps> = ({ leads }) => {
  const navigate = useNavigate();

  return (
    <div className="pb-24">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-primary/30" 
                style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBN2vm2lyZcJRXxE00wNm4X-ZEUFx4kbv4BOzhl3KrmYcjYb9QkLRt9DHWZcUNyCMbTQ1Z2ZYMPQRxjLWyxTiQ7MxI4SWBmYa81CkqGbgn-5dL2pNX1b8o8eT32sLAwbfLs3RmoavjvdPz_vzCpxbCzt91-3mrZPtL9_cDAEt0VHFtUxVr-91tcfA5__Ms1fvK_XLEvAoncFWfT5V8dwGdqy3CqFnlFgrf1B03Iam0o-uHZ0Ua3XF6_cQK2tGT4sTxDAjYVM1ZrLL2x")'}}
              ></div>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-background-dark"></div>
            </div>
            <div>
              <h1 className="text-sm font-medium text-slate-500 dark:text-slate-400">Welcome back,</h1>
              <h2 className="text-base font-bold leading-none">Mateo</h2>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-dark/10 dark:bg-surface-highlight rounded-full p-1 border border-slate-200 dark:border-slate-700">
              <button className="px-2 py-1 text-xs font-bold rounded-full bg-white dark:bg-primary text-slate-900 dark:text-background-dark shadow-sm">EN</button>
              <button className="px-2 py-1 text-xs font-bold text-slate-500 dark:text-slate-400">ES</button>
            </div>
            <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-surface-highlight transition-colors">
              <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-6 pt-6">
        {/* Performance Snapshot */}
        <section className="flex flex-col gap-3">
          <div className="px-4 flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">Performance Snapshot</h3>
            <span className="text-xs font-medium text-primary">This Week</span>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-2 snap-x">
            {METRICS.map((metric, idx) => (
              <div key={idx} className="snap-center shrink-0 w-40 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-3 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className={`material-symbols-outlined text-4xl ${metric.color}`}>{metric.icon}</span>
                </div>
                <div className={`size-10 rounded-full bg-primary/10 flex items-center justify-center ${metric.color}`}>
                  <span className="material-symbols-outlined">{metric.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight">{metric.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">{metric.label}</p>
                </div>
                <div className="flex items-center gap-1 text-green-500 text-xs font-bold">
                  <span className="material-symbols-outlined text-sm">arrow_upward</span>
                  <span>{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Unified Lead Inbox */}
        <section className="flex flex-col bg-white dark:bg-surface-dark rounded-t-3xl min-h-[500px] border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 pb-2 flex items-center justify-between">
            <h3 className="text-lg font-bold tracking-tight">Unified Lead Inbox</h3>
            <button onClick={() => navigate('/inbox')} className="text-primary text-sm font-semibold">View All</button>
          </div>
          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800/50">
            {leads.map((lead) => (
              <div 
                key={lead.id} 
                onClick={() => navigate('/inbox')} 
                className="group flex gap-4 p-4 hover:bg-slate-50 dark:hover:bg-surface-highlight transition-colors cursor-pointer relative"
              >
                <div className="relative shrink-0">
                  {lead.avatar ? (
                    <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm" style={{backgroundImage: `url("${lead.avatar}")`}}></div>
                  ) : (
                    <div className="bg-primary/20 rounded-full size-12 flex items-center justify-center text-primary font-bold text-lg">?</div>
                  )}
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-dark rounded-full p-0.5">
                    <div className="bg-[#25D366] rounded-full p-[2px]">
                      <svg fill="white" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-slate-900 dark:text-white text-base font-semibold leading-none truncate">{lead.name}</h4>
                    <span className="text-xs text-slate-500 font-medium whitespace-nowrap">{lead.time}</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal truncate leading-snug">{lead.lastMessage}</p>
                  <div className="mt-2 flex">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide
                      ${lead.status === 'Hot Lead' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        lead.status === 'Quote Requested' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        'bg-primary/10 text-primary border-primary/20'}`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
                {lead.unread && (
                  <div className="flex flex-col justify-center items-end gap-2">
                    <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
