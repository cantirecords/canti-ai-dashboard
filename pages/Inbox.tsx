
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lead, AppSettings, Message } from '../types';
import { generateCustomerReply } from '../geminiService';

interface InboxProps {
  leads: Lead[];
  settings: AppSettings;
}

const Inbox: React.FC<InboxProps> = ({ leads, settings }) => {
  const navigate = useNavigate();
  const [activeLead, setActiveLead] = useState<Lead>(leads[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'customer', text: 'Hola, I need a quote for a roof repair on my garage.', timestamp: new Date(), },
    { id: '2', sender: 'ai', text: 'Hola Juan! I can help with that. Could you send a photo of the damage so we can estimate it?', timestamp: new Date(), },
    { id: '3', sender: 'customer', text: "Here it is. It's mostly the tiles.", timestamp: new Date(), imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0jrnLy1yVV9q4b2Bfat_ni1FwTvZDfCV6wV3E7_dVtfdJrasRw0lYZamewgrHmpd0n5PyuflfefXSalmuC2BHq0k9h71Y376t55wQxuwAKE7XPfvV5YT_dC0D1mZ5uIZmmZnbi4EU9mmwWEC6DggphVlwtW5Ur91DQUwnfIp3RM7ze2mcyCn5fbr5_ULSzSCNRgGk8_H8rMKbA2UVUB7f2SEgWsSbXbJlqlVR_rZa2MOzAS2mEP7bG_Ok3a4KmqzqKyKd51_q1Oxe' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    if (!isManualMode) {
      setIsTyping(true);
      const aiReply = await generateCustomerReply(inputValue, `Industry: ${settings.industry}, FAQs: ${JSON.stringify(settings.faqs)}`);
      setIsTyping(false);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="shrink-0 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800 z-20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-gray-900 dark:text-white flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">Bandeja de Entrada</h2>
            <p className="text-gray-500 text-xs font-medium">Inbox • {leads.length} Leads</p>
          </div>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      {/* Filter Chips & Active Conversations Rail */}
      <div className="shrink-0 flex flex-col gap-3 bg-background-light dark:bg-background-dark pt-2 pb-4 border-b border-gray-200 dark:border-gray-800 z-10">
        <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar pb-1">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary text-background-dark px-4 cursor-pointer">
            <p className="text-xs font-bold">All</p>
          </div>
          {['High Intent', 'Needs Review', 'Quote Ready'].map(chip => (
            <div key={chip} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-200 dark:bg-surface-dark border border-gray-300 dark:border-gray-700 px-4 cursor-pointer">
              <p className="text-gray-700 dark:text-white text-xs font-medium">{chip}</p>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar items-center">
          {leads.map(lead => (
            <div 
              key={lead.id} 
              onClick={() => setActiveLead(lead)}
              className={`flex flex-col items-center gap-1 shrink-0 cursor-pointer transition-opacity ${activeLead.id === lead.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
            >
              <div className={`relative p-0.5 rounded-full border-2 ${activeLead.id === lead.id ? 'border-primary' : 'border-transparent'}`}>
                {lead.avatar ? (
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12" style={{backgroundImage: `url("${lead.avatar}")`}}></div>
                ) : (
                  <div className="h-12 w-12 rounded-full bg-slate-300 dark:bg-surface-dark flex items-center justify-center text-xs font-bold">?</div>
                )}
                <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-background-dark rounded-full"></div>
              </div>
              <span className={`text-[10px] font-bold ${activeLead.id === lead.id ? 'text-primary' : 'text-gray-400'}`}>{lead.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 flex flex-col overflow-y-auto bg-gray-50 dark:bg-[#131d20] relative">
        <div className="sticky top-0 z-10 w-full flex justify-center py-4 bg-gradient-to-b from-gray-50 via-gray-50 to-transparent dark:from-[#131d20] dark:via-[#131d20] dark:to-transparent pointer-events-none">
          <div className="bg-white dark:bg-surface-dark shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 flex items-center gap-2 pointer-events-auto">
            <span className="material-symbols-outlined text-[#25D366] text-sm">chat</span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{activeLead.platform.toUpperCase()} • Today 10:23 AM</span>
          </div>
        </div>
        
        <div className="flex flex-col px-4 pb-32 gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-3 max-w-[85%] group ${msg.sender === 'customer' ? 'self-start' : 'self-end flex-row-reverse'}`}>
              <div className={`shrink-0 mb-1 rounded-full h-8 w-8 flex items-center justify-center shadow-sm overflow-hidden ${msg.sender === 'ai' ? 'bg-primary' : 'bg-slate-200 dark:bg-surface-highlight'}`}>
                {msg.sender === 'ai' ? (
                  <span className="material-symbols-outlined text-background-dark text-lg">smart_toy</span>
                ) : msg.sender === 'user' ? (
                   <span className="material-symbols-outlined text-slate-500 text-lg">person</span>
                ) : (
                  <div className="bg-center bg-no-repeat bg-cover h-full w-full" style={{backgroundImage: `url("${activeLead.avatar}")`}}></div>
                )}
              </div>
              <div className={`flex flex-col gap-1 ${msg.sender === 'customer' ? 'items-start' : 'items-end'}`}>
                <span className={`text-xs ${msg.sender === 'ai' ? 'text-primary font-medium flex items-center gap-1' : 'text-gray-500'}`}>
                  {msg.sender === 'ai' ? <>CANTI AI <span className="material-symbols-outlined text-[10px]">bolt</span></> : msg.sender === 'customer' ? activeLead.name : 'You'}
                </span>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed border ${
                  msg.sender === 'customer' 
                    ? 'bg-white dark:bg-[#283639] rounded-bl-none text-gray-800 dark:text-gray-100 border-gray-200 dark:border-transparent' 
                    : 'bg-primary/10 dark:bg-primary/20 rounded-br-none text-gray-800 dark:text-primary-50 border-primary/20'
                }`}>
                  {msg.imageUrl && (
                    <div className="h-40 w-full bg-cover bg-center rounded-xl mb-1" style={{backgroundImage: `url("${msg.imageUrl}")`}}></div>
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="self-end flex flex-row-reverse gap-3 items-end max-w-[85%]">
               <div className="shrink-0 mb-1 rounded-full h-8 w-8 bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-background-dark text-lg animate-spin">sync</span>
               </div>
               <div className="bg-primary/5 p-3 rounded-2xl rounded-br-none italic text-xs text-primary">CANTI is thinking...</div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-16 w-full bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 p-4 z-30">
        <div className="flex flex-col gap-3">
          {isManualMode ? (
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a manual reply..."
                className="flex-1 bg-gray-200 dark:bg-surface-dark rounded-xl px-4 py-2 text-sm border-none focus:ring-1 focus:ring-primary dark:text-white"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-primary p-2 rounded-xl text-background-dark"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          ) : (
             <div className="relative w-full opacity-60">
              <div className="w-full h-10 bg-gray-200 dark:bg-surface-dark rounded-lg flex items-center px-4 text-sm text-gray-500 border border-transparent">
                AI is managing this chat...
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setIsManualMode(!isManualMode)}
            className={`w-full h-14 transition-all rounded-xl flex items-center justify-between px-6 shadow-lg group
              ${isManualMode ? 'bg-slate-500 text-white' : 'bg-primary text-background-dark shadow-primary/25'}`}
          >
            <div className="flex flex-col items-start">
              <span className="text-base font-bold leading-none">{isManualMode ? 'Return to AI Mode' : 'Take Over Chat'}</span>
              <span className="text-xs font-medium opacity-70">{isManualMode ? 'Regresar a modo AI' : 'Tomar Control Manual'}</span>
            </div>
            <div className="bg-black/10 p-2 rounded-lg">
              <span className="material-symbols-outlined group-hover:rotate-45 transition-transform">{isManualMode ? 'smart_toy' : 'back_hand'}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
