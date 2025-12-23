import React, { useState, useEffect } from 'react';
import { UserInput } from '../types';
import { Icons } from './Icons';

interface Props {
  onSubmit: (data: UserInput) => void;
  onShowHistory: () => void;
  onOpenSanctuary: () => void;
  isLoading: boolean;
}

const STORAGE_KEY = 'nomen_user_input';

export const InputForm: React.FC<Props> = ({ onSubmit, onShowHistory, onOpenSanctuary, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    name: '',
    occupation: '',
    background: '',
    location: '',
    persona: 'colloquial'
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved input", e);
      }
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }, 500);
    return () => clearTimeout(timeout);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    onSubmit(formData);
  };

  const personas = [
    { id: 'colloquial', label: '通俗深度', Icon: Icons.Book, desc: '全维拆解' },
    { id: 'sage', label: '隐世高人', Icon: Icons.Mountain, desc: '易经卦辞' },
    { id: 'psychologist', label: '心理咨询', Icon: Icons.Brain, desc: '治愈分析' },
    { id: 'mentor', label: '毒舌导师', Icon: Icons.Briefcase, desc: '职场现实' }
  ];

  return (
    <div className="w-full max-w-lg mx-auto p-8 relative z-10 animate-ink flex flex-col min-h-[70vh] justify-center">
      
      {/* Top Left: Member Entrance */}
      <div className="absolute top-0 left-0 p-4">
        <button 
          onClick={onOpenSanctuary}
          className="text-ink-700 dark:text-celadon-500 hover:text-cinnabar-600 dark:hover:text-cinnabar-500 text-xs tracking-widest uppercase transition-colors flex items-center gap-2 group"
        >
          <Icons.Torii className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
          <span>内环</span>
        </button>
      </div>

      {/* Top Right: History */}
      <div className="absolute top-0 right-0 p-4">
        <button 
          onClick={onShowHistory}
          className="text-ink-700 dark:text-celadon-500 hover:text-ink-900 dark:hover:text-celadon-100 text-xs tracking-widest uppercase transition-colors flex items-center gap-2"
        >
          <Icons.History className="w-4 h-4 opacity-60" />
          <span>档案</span>
        </button>
      </div>

      <div className="mb-12 text-center">
        <h2 className="font-serif-sc text-4xl md:text-5xl font-light text-ink-900 dark:text-celadon-100 tracking-widest mb-2">名 · 相</h2>
        <div className="w-12 h-[1px] bg-ink-900/20 dark:bg-celadon-500/20 mx-auto"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="space-y-2">
          <label className="block text-ink-600 dark:text-celadon-500 text-[10px] uppercase tracking-wider pl-1">名 (Name)</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="网名 / 真名"
            className="w-full bg-paper-100 dark:bg-ink-800 border-none rounded-2xl text-ink-900 dark:text-celadon-100 text-xl py-4 px-6 focus:ring-1 focus:ring-cinnabar-600/50 transition-all font-serif-sc placeholder-ink-400 dark:placeholder-ink-700 shadow-sm"
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
            <label className="block text-ink-600 dark:text-celadon-500 text-[10px] uppercase tracking-wider pl-1">业 (Job)</label>
            <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full bg-paper-100 dark:bg-ink-800 border-none rounded-2xl text-ink-900 dark:text-celadon-200 py-3 px-5 focus:ring-1 focus:ring-celadon-500/50 transition-all shadow-sm"
            />
            </div>
            <div className="space-y-2">
            <label className="block text-ink-600 dark:text-celadon-500 text-[10px] uppercase tracking-wider pl-1">地 (Loc)</label>
            <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-paper-100 dark:bg-ink-800 border-none rounded-2xl text-ink-900 dark:text-celadon-200 py-3 px-5 focus:ring-1 focus:ring-celadon-500/50 transition-all shadow-sm"
            />
            </div>
        </div>

        <div className="space-y-2">
          <label className="block text-ink-600 dark:text-celadon-500 text-[10px] uppercase tracking-wider pl-1">源 (Origin)</label>
          <input
            type="text"
            name="background"
            value={formData.background}
            onChange={handleChange}
            placeholder="城乡背景 (可选)"
            className="w-full bg-paper-100 dark:bg-ink-800 border-none rounded-2xl text-ink-900 dark:text-celadon-200 py-3 px-5 focus:ring-1 focus:ring-celadon-500/50 transition-all shadow-sm"
          />
        </div>

        <div className="space-y-4 pt-2">
          <label className="block text-ink-600 dark:text-celadon-500 text-[10px] uppercase tracking-wider text-center">择 师 (Persona)</label>
          <div className="grid grid-cols-2 gap-4">
            {personas.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setFormData({ ...formData, persona: p.id as any })}
                className={`py-4 px-5 rounded-2xl transition-all duration-300 text-left flex items-center gap-3 shadow-sm ${
                  formData.persona === p.id 
                    ? 'bg-ink-900 dark:bg-ink-700 text-paper-100 dark:text-celadon-100 ring-2 ring-cinnabar-600/20' 
                    : 'bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-ink-600 hover:bg-paper-200 dark:hover:bg-ink-700'
                }`}
              >
                <div className="text-xl opacity-80"><p.Icon className="w-6 h-6" /></div>
                <div>
                    <div className="text-sm font-serif-sc font-bold">{p.label}</div>
                    <div className="text-[9px] opacity-60 uppercase tracking-wider">{p.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden font-serif-sc text-paper-100 dark:text-white bg-ink-900 dark:bg-ink-800 rounded-3xl transition duration-500 ease-out shadow-lg hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            {isLoading ? (
              <span className="animate-pulse flex items-center gap-2"><Icons.Sparkles className="w-4 h-4"/> 推演天机...</span>
            ) : (
              <span className="relative flex items-center gap-2">开始解构 <Icons.ArrowRight className="w-4 h-4" /></span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>
      </form>
    </div>
  );
};