import React from 'react';
import { Icons } from './Icons';

interface Props {
  onEnter: () => void;
}

export const LandingPage: React.FC<Props> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto px-6 relative z-10 animate-ink">
      
      {/* Brand & Slogan */}
      <div className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-ink-900/5 dark:bg-celadon-100/5 rounded-full mb-4">
             <Icons.Torii className="w-12 h-12 text-ink-900 dark:text-celadon-100 opacity-80" />
        </div>
        <h1 className="font-serif-sc text-6xl md:text-8xl font-light text-ink-900 dark:text-celadon-100 tracking-widest leading-tight">
          名 · 相
        </h1>
        <p className="text-ink-700/60 dark:text-celadon-500 text-sm md:text-base tracking-[0.4em] uppercase">
          Neo-Oriental Life Deconstruction
        </p>
      </div>

      {/* Main Action */}
      <button 
        onClick={onEnter}
        className="group relative px-12 py-5 bg-ink-900 dark:bg-celadon-100 text-paper-100 dark:text-ink-900 font-serif-sc text-lg tracking-widest rounded-2xl shadow-xl hover:scale-105 transition-all duration-500 ease-out overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3">
          起 卦 <Icons.ArrowRight className="w-4 h-4" />
        </span>
        <div className="absolute inset-0 bg-cinnabar-600 dark:bg-celadon-200 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
      </button>

      {/* Social Proof / Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full text-center border-t border-ink-900/10 dark:border-celadon-500/20 pt-10">
        <StatBlock 
          number="12,403" 
          label="Souls Connected" 
          sub="结缘人数"
        />
        <StatBlock 
          number="34,921" 
          label="Deconstructions" 
          sub="推演次数"
        />
        <StatBlock 
          number="98%" 
          label="Inner Resonances" 
          sub="深度共鸣"
          className="hidden md:block"
        />
      </div>

      {/* Philosophy Snippet */}
      <div className="mt-20 max-w-lg text-center">
        <p className="font-serif-sc text-ink-700/80 dark:text-celadon-200/60 text-sm leading-loose italic">
          "我们无法选择出厂设置，但可以选择如何以此为刃，划破命运的迷雾。"
        </p>
      </div>

    </div>
  );
};

const StatBlock: React.FC<{ number: string; label: string; sub: string; className?: string }> = ({ number, label, sub, className = '' }) => (
  <div className={`space-y-1 ${className}`}>
    <div className="font-serif-sc text-3xl md:text-4xl text-ink-900 dark:text-celadon-100">{number}</div>
    <div className="text-[10px] text-ink-600/60 dark:text-celadon-500 uppercase tracking-widest">{label}</div>
    <div className="text-[10px] text-ink-600/40 dark:text-celadon-500/50">{sub}</div>
  </div>
);