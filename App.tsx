
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';
import Dashboard from './pages/Dashboard';
import Inbox from './pages/Inbox';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Landing from './pages/Landing';
import ExpertPanel from './components/ExpertPanel';
import { AppSettings, Lead } from './types';
import { INITIAL_SETTINGS, INITIAL_LEADS } from './constants';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [isExpertPanelOpen, setIsExpertPanelOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">progress_activity</span>
      </div>
    );
  }

  return (
    <Router>
      {!session ? (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <div className="flex flex-col min-h-screen max-w-md mx-auto relative bg-background-light dark:bg-background-dark shadow-2xl overflow-hidden">

          <Routes>
            <Route path="/" element={<Dashboard leads={leads} />} />
            <Route path="/inbox" element={<Inbox leads={leads} settings={settings} />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/settings" element={<Settings settings={settings} setSettings={setSettings} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <BottomNav />

          {/* FAB: Expert Panel Toggle */}
          <div className="fixed bottom-24 right-4 z-[60] sm:right-[calc(50%-12rem)]">
            <button
              onClick={() => setIsExpertPanelOpen(true)}
              className="flex items-center gap-2 bg-primary hover:bg-cyan-400 text-surface-dark font-bold py-3 px-5 rounded-full shadow-lg shadow-primary/30 transition-all transform hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">support_agent</span>
              <span>Ask CANTI</span>
            </button>
          </div>

          <ExpertPanel
            isOpen={isExpertPanelOpen}
            onClose={() => setIsExpertPanelOpen(false)}
            context={JSON.stringify(settings)}
          />
        </div>
      )}
    </Router>
  );
};

const BottomNav: React.FC = () => {
  const location = useLocation();
  const activeClass = "text-primary";
  const inactiveClass = "text-slate-400";

  if (['/onboarding'].includes(location.pathname)) return null;

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 z-50">
      <div className="flex justify-around items-center h-16">
        <Link to="/" className="flex flex-col items-center gap-1 group w-16">
          <span className={`material-symbols-outlined ${location.pathname === '/' ? activeClass : inactiveClass} group-hover:scale-110 transition-transform`}>dashboard</span>
          <span className={`text-[10px] font-medium ${location.pathname === '/' ? activeClass : inactiveClass}`}>Home</span>
        </Link>
        <Link to="/inbox" className="flex flex-col items-center gap-1 group w-16">
          <div className="relative">
            <span className={`material-symbols-outlined ${location.pathname === '/inbox' ? activeClass : inactiveClass} group-hover:text-primary transition-colors`}>inbox</span>
            <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full border border-background-dark"></span>
          </div>
          <span className={`text-[10px] font-medium ${location.pathname === '/inbox' ? activeClass : inactiveClass}`}>Inbox</span>
        </Link>
        <Link to="/onboarding" className="flex flex-col items-center gap-1 group w-16">
          <span className={`material-symbols-outlined ${location.pathname === '/onboarding' ? activeClass : inactiveClass} group-hover:text-primary transition-colors`}>smart_toy</span>
          <span className={`text-[10px] font-medium ${location.pathname === '/onboarding' ? activeClass : inactiveClass}`}>Auto</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center gap-1 group w-16">
          <span className={`material-symbols-outlined ${location.pathname === '/settings' ? activeClass : inactiveClass} group-hover:text-primary transition-colors`}>settings</span>
          <span className={`text-[10px] font-medium ${location.pathname === '/settings' ? activeClass : inactiveClass}`}>Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default App;
