
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md h-full min-h-screen bg-background-light dark:bg-background-dark flex flex-col relative overflow-hidden shadow-2xl">
        {/* Top App Bar */}
        <div className="flex items-center px-5 py-4 justify-between z-10">
          <div className="w-12 h-12 flex items-center justify-start">
            <button onClick={() => navigate('/')} className="w-8 h-8 rounded-full bg-surface-dark flex items-center justify-center text-gray-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
          </div>
          <button onClick={() => navigate('/')} className="flex items-center justify-end px-3 py-1.5 rounded-full hover:bg-surface-highlight transition-colors">
            <span className="text-gray-400 dark:text-[#9cb5ba] text-sm font-semibold tracking-wide">Save & Exit</span>
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex flex-col gap-2 px-6 mt-2 mb-4">
          <div className="flex justify-between items-end">
            <p className="text-primary dark:text-primary text-sm font-bold uppercase tracking-wider">Step 3 of 5</p>
            <span className="text-gray-500 text-xs">60%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 dark:bg-surface-highlight rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{width: '60%'}}></div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24 scrollbar-hide">
          <div className="flex justify-center items-center py-6 relative">
            <div className="absolute w-32 h-32 bg-primary/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center border-4 border-background-light dark:border-background-dark z-10">
                  <span className="text-white font-bold text-xl">f</span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FFD600] via-[#FF0100] to-[#D800B9] flex items-center justify-center border-4 border-background-light dark:border-background-dark z-20">
                  <span className="material-symbols-outlined text-white text-[20px]">photo_camera</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-gray-500 text-2xl animate-pulse">sync_alt</span>
              <div className="w-14 h-14 rounded-2xl bg-surface-dark border border-gray-700 flex items-center justify-center shadow-lg z-10">
                <span className="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-1 mt-2">
            <h1 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">Connect Facebook & Instagram</h1>
            <h2 className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-tight">Conectar Facebook e Instagram</h2>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">To automate your leads, we need temporary access to your business pages. Don't worry, we won't post anything on your behalf.</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2 italic">Para automatizar tus clientes potenciales, necesitamos acceso temporal a tus páginas comerciales.</p>
          </div>

          <div className="mt-8 bg-surface-dark border border-primary/20 rounded-2xl p-5 relative overflow-hidden shadow-glow">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img className="w-12 h-12 rounded-full object-cover border-2 border-primary/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDiJ_pOeLmdRQF0MJIBiO6RfBIyLr-oYDovJmGhcDu15fmAyiD0RlZZ3SlOScDdZ1S2zboVuScdDPgI3Mf5v33gxmogjBBtrtVnp72m11-cNP3J5idaTrCj1MY95glGfftbIxnyo0zbT40ya3C_qvNJzfaB4tnekxKsCUh8cfb_9pqYPv1JsJ82dVMJpkSCkUjnmFfBLRFIejC2zLSbOKU-tKapcxaJmW-YhMlPQ91enJb6IjEHdIfzVU_MZzG4RQ9JT7NjiIlGNpO" alt="Expert" />
                <div className="absolute -bottom-1 -right-1 bg-primary text-background-dark rounded-full p-0.5 border-2 border-surface-dark">
                  <span className="material-symbols-outlined text-[10px] font-bold block">check</span>
                </div>
              </div>
              <div>
                <p className="text-white text-sm font-semibold mb-1">CANTI Specialist</p>
                <p className="text-gray-300 text-sm leading-snug">"A CANTI specialist will now complete this step for you. We will notify you when it is done."</p>
                <p className="text-primary/70 text-xs mt-2 font-medium">White-Glove Service Active</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="absolute bottom-0 left-0 w-full bg-background-light dark:bg-background-dark pt-4 pb-8 px-6 border-t border-gray-200 dark:border-white/5">
          <div className="flex justify-center items-center gap-1.5 mb-4 text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span className="text-xs font-medium">Secure Connection • Conexión Segura</span>
          </div>
          <button className="w-full bg-primary hover:bg-[#0bbad9] text-background-dark font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex flex-col items-center justify-center leading-none gap-1">
            <span>Authorize Access</span>
            <span className="text-xs font-normal opacity-80">Autorizar Acceso</span>
          </button>
          <button onClick={() => navigate('/')} className="w-full mt-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-gray-800 dark:hover:text-white transition-colors">
            I'll do this later / Haré esto más tarde
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
