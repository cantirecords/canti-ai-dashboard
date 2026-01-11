
import React, { useState, useRef, useEffect } from 'react';
import { generateExpertResponse } from '../geminiService';

interface ExpertPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
}

const ExpertPanel: React.FC<ExpertPanelProps> = ({ isOpen, onClose, context }) => {
  const [query, setQuery] = useState('');
  const [conversation, setConversation] = useState<{role: 'user' | 'expert', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setConversation(prev => [...prev, { role: 'user', text: userText }]);
    
    setIsLoading(true);
    const reply = await generateExpertResponse(userText, context);
    setIsLoading(false);

    setConversation(prev => [...prev, { role: 'expert', text: reply || 'I am ready to help.' }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end justify-center p-4">
      <div className="bg-background-light dark:bg-background-dark w-full max-w-md h-[80vh] rounded-t-3xl flex flex-col shadow-2xl relative animate-in slide-in-from-bottom duration-300">
        
        {/* Drag Handle & Close */}
        <div className="flex flex-col items-center pt-3 pb-4">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
          <div className="flex items-center justify-between w-full px-6">
            <div className="flex items-center gap-3">
              <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <h2 className="text-lg font-bold">Ask CANTI Expert</h2>
            </div>
            <button onClick={onClose} className="p-2 bg-gray-200 dark:bg-surface-dark rounded-full">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>

        {/* Chat History */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
          {conversation.length === 0 && (
            <div className="text-center py-10 opacity-50 space-y-2">
              <span className="material-symbols-outlined text-4xl text-primary">chat_bubble</span>
              <p className="text-sm font-medium">How can I help you grow your business today?</p>
            </div>
          )}
          {conversation.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' ? 'bg-primary text-background-dark rounded-br-none' : 'bg-white dark:bg-surface-dark rounded-bl-none text-slate-800 dark:text-slate-100 border border-gray-100 dark:border-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl rounded-bl-none animate-pulse text-xs opacity-50">CANTI is thinking...</div>
            </div>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-6 bg-gray-50 dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800">
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your dashboard..."
              className="w-full bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-2xl py-4 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-primary text-background-dark rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">arrow_upward</span>
            </button>
          </div>
          <p className="text-[10px] text-center mt-3 text-slate-400">Powered by Gemini AI • Real-time expert assistance</p>
        </form>
      </div>
    </div>
  );
};

export default ExpertPanel;
