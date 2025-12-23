import React, { useState, useEffect } from 'react';
import { InputForm } from './components/InputForm';
import { AnalysisView } from './components/AnalysisView';
import { VisualEffects } from './components/VisualEffects';
import { HistoryModal } from './components/HistoryModal';
import { SanctuaryModal } from './components/SanctuaryModal';
import { LandingPage } from './components/LandingPage';
import { analyzeName } from './services/geminiService';
import { UserInput, AnalysisResult, AppState } from './types';
import { Icons } from './components/Icons';

const HISTORY_KEY = 'nomen_history_v2';
const THEME_KEY = 'nomen_theme';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showSanctuary, setShowSanctuary] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // Loading Text Rotation
  const [loadingText, setLoadingText] = useState("正在解析命理构成...");

  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY) as 'dark' | 'light';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
        document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (result: AnalysisResult) => {
    const newHistory = [result, ...history];
    setHistory(newHistory);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const handleAnalysisStart = async (data: UserInput) => {
    setAppState(AppState.ANALYZING);
    
    // Start Loading Ritual Text Loop
    const texts = [
        "正在解析命理构成... (Analyzing Semiotics)",
        "链接集体潜意识... (Connecting to Unconscious)",
        "推演流年抉择点... (Simulating Timeline)",
        "绘制精神图腾... (Generating Totem)"
    ];
    let index = 0;
    const interval = setInterval(() => {
        index = (index + 1) % texts.length;
        setLoadingText(texts[index]);
    }, 1500);

    try {
      const result = await analyzeName(data);
      clearInterval(interval);
      setAnalysisResult(result);
      saveToHistory(result);
      setAppState(AppState.RESULT);
    } catch (error) {
      clearInterval(interval);
      console.error(error);
      setAppState(AppState.ERROR);
      setTimeout(() => setAppState(AppState.HOME), 3000);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setAppState(AppState.HOME);
  };

  const handleSelectFromHistory = (item: AnalysisResult) => {
    setAnalysisResult(item);
    setShowHistory(false);
    setAppState(AppState.RESULT);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-cinnabar-600/30 selection:text-cinnabar-900 dark:selection:text-white">
      <VisualEffects />

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-40">
        <button 
            onClick={toggleTheme}
            className="p-3 rounded-full bg-paper-100 dark:bg-ink-800 text-ink-700 dark:text-celadon-100 shadow-lg hover:scale-110 transition-transform"
        >
            {theme === 'dark' ? <Icons.Sun className="w-5 h-5"/> : <Icons.Moon className="w-5 h-5"/>}
        </button>
      </div>

      <main className="w-full relative z-10 flex-grow flex flex-col items-center justify-center min-h-[600px]">
        
        {appState === AppState.LANDING && (
            <LandingPage onEnter={() => setAppState(AppState.HOME)} />
        )}

        {appState === AppState.HOME && (
          <InputForm 
            onSubmit={handleAnalysisStart} 
            onShowHistory={() => setShowHistory(true)}
            onOpenSanctuary={() => setShowSanctuary(true)}
            isLoading={false} 
          />
        )}

        {appState === AppState.ANALYZING && (
          <div className="text-center animate-ink flex flex-col items-center justify-center">
            {/* Mystical Loader */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                <div className="absolute inset-0 border border-cinnabar-600/20 dark:border-celadon-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-4 border border-cinnabar-600/40 dark:border-celadon-500/40 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                     <Icons.Sparkles className="w-8 h-8 text-cinnabar-600 dark:text-celadon-200 animate-pulse" />
                </div>
                {/* Rotating Rings */}
                <div className="absolute inset-0 border-t-2 border-r-2 border-cinnabar-600 dark:border-celadon-500 rounded-full animate-spin opacity-80"></div>
            </div>
            
            <p className="font-serif-sc text-xl tracking-widest text-ink-900 dark:text-celadon-200 animate-pulse transition-all duration-500">
                {loadingText.split("...")[0]}...
            </p>
            <p className="text-[10px] text-ink-500 dark:text-ink-500 mt-2 uppercase tracking-[0.2em] font-light">
                {loadingText.split("(")[1]?.replace(")", "") || "Processing"}
            </p>
          </div>
        )}

        {appState === AppState.RESULT && analysisResult && (
          <AnalysisView data={analysisResult} onReset={handleReset} />
        )}

        {appState === AppState.ERROR && (
           <div className="text-center animate-pulse text-cinnabar-600 dark:text-cinnabar-500">
              <Icons.Close className="w-12 h-12 mx-auto mb-4 opacity-50"/>
              <p className="font-serif-sc text-xl">链接断开</p>
              <p className="text-xs mt-2">天机不可泄露太快，请稍后重试。</p>
           </div>
        )}
      </main>

      {showHistory && (
        <HistoryModal 
          history={history} 
          onSelect={handleSelectFromHistory} 
          onClose={() => setShowHistory(false)} 
        />
      )}

      {showSanctuary && (
        <SanctuaryModal onClose={() => setShowSanctuary(false)} />
      )}

      <footer className="relative z-10 py-6 text-center opacity-30 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.2em] text-ink-900 dark:text-celadon-100">Nomen System v2.2</p>
      </footer>
    </div>
  );
};

export default App;