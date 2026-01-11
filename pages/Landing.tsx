
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-screen bg-background-dark text-white overflow-x-hidden font-sans selection:bg-primary selection:text-surface-dark">

            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-background-dark/80 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                            <span className="material-symbols-outlined text-surface-dark font-bold">smart_toy</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">CANTI AI</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        <a href="#features" className="hover:text-primary transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
                        <a href="#testimonials" className="hover:text-primary transition-colors">Success Stories</a>
                    </div>
                    <Link
                        to="/login"
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2 rounded-full font-medium transition-all hover:scale-105"
                    >
                        Log In
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>

                <div className={`max-w-5xl mx-auto text-center relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-cyan-300">AI-Powered Lead Generation</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                        Turn Conversations into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-primary bg-300% animate-gradient">Revenue</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Automate your customer interactions, qualify leads 24/7, and close more deals with the world's most intelligent conversational AI assistant.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-cyan-400 text-surface-dark font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span>Start Free Trial</span>
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl backdrop-blur-sm transition-all flex items-center justify-center gap-2 group">
                            <span className="material-symbols-outlined group-hover:text-primary transition-colors">play_circle</span>
                            <span>Watch Demo</span>
                        </button>
                    </div>

                    {/* Hero Dashboard Preview */}
                    <div className="mt-20 relative mx-auto max-w-4xl perspective-1000">
                        <div className={`relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10 bg-surface-dark transform transition-all duration-1000 delay-300 ${isVisible ? 'rotate-x-0 opacity-100' : 'rotate-x-12 opacity-0'}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
                            {/* Abstract representation of the dashboard */}
                            <div className="p-4 grid grid-cols-12 gap-4 h-[400px] opacity-80">
                                <div className="col-span-3 bg-white/5 rounded-lg h-full animate-pulse-slow"></div>
                                <div className="col-span-9 flex flex-col gap-4">
                                    <div className="h-16 bg-white/5 rounded-lg w-full"></div>
                                    <div className="flex-1 bg-white/5 rounded-lg w-full relative overflow-hidden">
                                        <div className="absolute top-4 left-4 right-4 h-20 bg-white/5 rounded-lg"></div>
                                        <div className="absolute top-28 left-4 right-4 h-20 bg-white/5 rounded-lg"></div>
                                        <div className="absolute top-52 left-4 right-4 h-20 bg-white/5 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section id="features" className="py-24 px-6 relative bg-surface-dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Canti?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Powerful features designed to supercharge your sales pipeline without increasing your headcount.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: 'forum', title: 'Smart Conversations', desc: 'Natural language processing that understands context and intent.' },
                            { icon: 'bolt', title: 'Instant Response', desc: 'Never keep a lead waiting. 24/7 instant replies to every query.' },
                            { icon: 'analytics', title: 'Deep Analytics', desc: 'Gain actionable insights from every customer interaction.' },
                            { icon: 'translate', title: 'Multi-language', desc: 'Seamlessly communicate in English, Spanish, and 50+ languages.' },
                            { icon: 'hub', title: 'CRM Integration', desc: 'Syncs perfectly with Hubspot, Salesforce, and your custom tools.' },
                            { icon: 'security', title: 'Enterprise Secure', desc: 'Bank-grade encryption keeping your customer data safe.' }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2">
                                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 border-y border-white/5 bg-background-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full"></div>
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { value: '24/7', label: 'Availability' },
                        { value: '3x', label: 'More Leads' },
                        { value: '1.5s', label: 'Response Time' },
                        { value: '10k+', label: 'Active Users' }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="text-4xl md:text-6xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-primary font-medium tracking-wide uppercase text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 relative">
                <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary to-cyan-600 text-surface-dark p-12 md:p-24 text-center">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 relative z-10 text-white">Ready to automate your growth?</h2>
                    <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto relative z-10">Join thousands of businesses using Canti AI to transform their customer experience.</p>

                    <Link
                        to="/login"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary font-bold text-lg rounded-2xl shadow-2xl hover:bg-slate-50 transition-all transform hover:scale-105 active:scale-95 relative z-10"
                    >
                        <span>Get Started Now</span>
                        <span className="material-symbols-outlined">rocket_launch</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 border-t border-white/5 bg-surface-dark text-slate-400 text-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">smart_toy</span>
                        <span className="font-bold text-white">CANTI AI</span>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <div>
                        &copy; 2026 Canti AI Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
