
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppSettings, Industry } from '../types';

interface SettingsProps {
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const navigate = useNavigate();

  const toggleSpanish = () => {
    setSettings({ ...settings, spanishEnabled: !settings.spanishEnabled });
  };

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({ ...settings, industry: e.target.value as Industry });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-32 bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-2 border-b border-transparent dark:border-border-dark/30">
        <button onClick={() => navigate('/')} className="flex size-10 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Automation Settings</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-6 p-4">
        {/* Language Toggle Section */}
        <section>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-5 shadow-sm">
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">translate</span>
                <h2 className="text-base font-bold leading-tight">Enable Spanish Responses</h2>
              </div>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-normal leading-relaxed">
                AI will automatically detect and switch to Spanish for Latino customers.
              </p>
            </div>
            <label className={`relative flex h-[32px] w-[52px] shrink-0 cursor-pointer items-center rounded-full border-none p-1 transition-all duration-300
              ${settings.spanishEnabled ? 'bg-primary justify-end' : 'bg-gray-300 dark:bg-[#283639] justify-start'}`}>
              <div className="h-6 w-6 rounded-full bg-white shadow-md"></div>
              <input 
                aria-label="Toggle Spanish Responses" 
                checked={settings.spanishEnabled}
                onChange={toggleSpanish}
                className="invisible absolute" 
                type="checkbox"
              />
            </label>
          </div>
        </section>

        {/* Industry Selector */}
        <section>
          <div className="flex flex-col gap-2">
            <label className="ml-1 text-sm font-bold text-gray-900 dark:text-white" htmlFor="industry-select">Industry Profile</label>
            <div className="relative group">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="material-symbols-outlined text-primary">business_center</span>
              </div>
              <select 
                value={settings.industry}
                onChange={handleIndustryChange}
                className="w-full appearance-none rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark py-4 pl-12 pr-10 text-base font-medium text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all" 
                id="industry-select"
              >
                {Object.values(Industry).map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-text-secondary-dark group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold leading-tight">Industry-Specific FAQs</h3>
            <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Edit All</button>
          </div>
          {settings.faqs.map((faq, idx) => (
            <article key={idx} className="group relative flex cursor-pointer items-start gap-4 rounded-2xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 transition-all hover:border-primary/50 hover:shadow-md">
              <div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-bold leading-tight text-gray-900 dark:text-white">{faq.question}</p>
                <p className="line-clamp-2 text-sm leading-normal text-text-secondary-light dark:text-text-secondary-dark">{faq.answer}</p>
              </div>
              <div className="mt-1 flex shrink-0 text-gray-400 dark:text-[#55696d] group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined">edit</span>
              </div>
            </article>
          ))}
          <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 dark:border-[#3b5054] bg-transparent py-4 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
            <span className="font-medium">Add Custom Question</span>
          </button>
        </section>
      </main>

      {/* Sticky Footer Action */}
      <div className="fixed bottom-16 left-0 z-50 w-full bg-background-light/90 dark:bg-background-dark/95 backdrop-blur-xl border-t border-border-light dark:border-border-dark p-4">
        <button className="relative w-full h-14 bg-primary hover:bg-primary/90 text-[#101f22] font-bold text-lg rounded-full shadow-[0_0_20px_rgba(13,204,242,0.25)] flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]">
          <span className="material-symbols-outlined">support_agent</span>
          <span>Chat with a CANTI Expert</span>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-white"></span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Settings;
