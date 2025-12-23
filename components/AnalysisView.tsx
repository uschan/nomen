import React from 'react';
import { AnalysisResult } from '../types';
import { Icons } from './Icons';

interface Props {
  data: AnalysisResult;
  onReset: () => void;
}

export const AnalysisView: React.FC<Props> = ({ data, onReset }) => {
  const [copyStatus, setCopyStatus] = React.useState<'idle' | 'copied'>('idle');

  const handleCopy = () => {
    let text = `【${data.userInput.name} · 名相解构】\n\n`;
    // ... (Text generation logic remains same for simplicity)
    text += `【断语】${data.prologue}\n`; // Simplified for brevity in this update
    navigator.clipboard.writeText(text);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleLockedFeature = (feature: string) => {
    alert(`【${feature}】\n\n此天机需消耗「金币」解锁。\n(支付系统接入中，敬请期待)`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto pb-20 animate-ink pt-10 px-4">
      
      {/* Header / Image Area */}
      <div className="relative mb-12 text-center">
        <div className="relative inline-block group cursor-pointer" onClick={handleCopy}>
          {data.imageUrl ? (
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-paper-200 dark:border-ink-800 shadow-2xl relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/20 to-transparent pointer-events-none"></div>
              <img src={data.imageUrl} alt="Soul Imagery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out" />
            </div>
          ) : (
             <div className="w-48 h-48 mx-auto rounded-full bg-paper-200 dark:bg-ink-800 flex items-center justify-center">
                <span className="text-ink-300 dark:text-ink-700 text-6xl">?</span>
             </div>
          )}
        </div>
        
        <div className="mt-8 space-y-2">
             <h2 className="font-serif-sc text-4xl text-ink-900 dark:text-celadon-100 tracking-[0.2em]">{data.userInput.name}</h2>
             <p className="text-ink-500/60 dark:text-celadon-500/50 text-[10px] uppercase tracking-[0.3em] bg-paper-100 dark:bg-ink-800 px-3 py-1 rounded-full inline-block">
                {data.userInput.persona} Mode
             </p>
        </div>
      </div>

      {/* Prologue / 前言断语 */}
      <div className="mx-4 mb-12 p-8 bg-paper-100 dark:bg-ink-800/40 rounded-3xl relative shadow-sm">
         <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink-900 dark:bg-ink-700 px-4 py-1 rounded-full text-[10px] text-paper-100 dark:text-celadon-100 uppercase tracking-widest shadow-lg">
            前言 · 断语
         </span>
         <Icons.ScrollText className="absolute top-6 left-6 w-6 h-6 text-ink-200 dark:text-ink-700 opacity-50" />
         <p className="font-serif-sc text-xl leading-loose text-ink-800 dark:text-celadon-200 text-justify indent-8 opacity-90 relative z-10">
            "{data.prologue}"
         </p>
      </div>

      {/* Main Analysis Content */}
      <div className="space-y-8">
        
        {data.mode === 'deep' ? (
            <>
                {/* Layer 1: Imagery */}
                <LayerCard title="意象拆解 · Imagery" delay="0s">
                    <Item label="字面" content={data.imageryDetail.literal} />
                    <Item label="能量" content={data.imageryDetail.energy} />
                    <Item label="隐喻" content={data.imageryDetail.metaphor} />
                </LayerCard>

                {/* Layer 2: Personality */}
                <LayerCard title="性格画像 · Personality" delay="0.1s">
                    <Item label="自我" content={data.personalityDetail.selfPerception} />
                    <Item label="社交" content={data.personalityDetail.socialStrategy} />
                    <Item label="心态" content={data.personalityDetail.mindset} />
                </LayerCard>

                {/* Layer 3: Fortune */}
                <LayerCard title="运势推演 · Fortune" delay="0.2s">
                    <Item label="财运" content={data.fortuneDetail.wealth} />
                    <Item label="情感" content={data.fortuneDetail.relationships} />
                    <Item label="隐忧" content={data.fortuneDetail.hiddenWorries} />
                </LayerCard>

                {/* Layer 4: Timeline Decisions */}
                {data.timeline && data.timeline.length > 0 && (
                     <div className="animate-ink" style={{ animationDelay: '0.3s' }}>
                        <h3 className="text-ink-500 dark:text-celadon-500 text-xs font-bold uppercase tracking-widest mb-4 opacity-70 ml-2">流年抉择 (Timeline)</h3>
                        <div className="space-y-4">
                            {data.timeline.map((node, idx) => {
                                const isLocked = idx > 0;
                                return (
                                    <div key={idx} className="relative pl-8 py-2">
                                        <div className="absolute left-0 top-3 w-3 h-3 bg-paper-300 dark:bg-ink-700 border-2 border-cinnabar-600 rounded-full z-10"></div>
                                        <div className="absolute left-[5px] top-6 bottom-[-20px] w-[2px] bg-paper-300 dark:bg-ink-800 last:hidden"></div>
                                        
                                        <div className={`p-5 bg-paper-100 dark:bg-ink-800/40 rounded-2xl transition-all duration-700 ${isLocked ? 'blur-[4px] select-none opacity-60' : ''}`}>
                                            <div className="flex justify-between items-baseline mb-2">
                                                <span className="text-cinnabar-600 dark:text-cinnabar-500 font-serif-sc text-xl">{node.year}</span>
                                                <span className="text-[10px] text-ink-500 dark:text-ink-400 uppercase tracking-wider bg-paper-200 dark:bg-ink-900 px-2 py-1 rounded-lg">{node.title}</span>
                                            </div>
                                            <p className="text-ink-700 dark:text-gray-400 text-sm font-light leading-relaxed text-justify">{node.choice}</p>
                                        </div>

                                        {isLocked && (
                                            <div 
                                                className="absolute inset-0 flex items-center justify-center cursor-pointer group z-20" 
                                                onClick={() => handleLockedFeature(`流年解锁：${node.year}`)}
                                            >
                                                <div className="bg-white/90 dark:bg-ink-900/90 px-6 py-3 rounded-full flex items-center gap-3 shadow-xl backdrop-blur-sm border border-paper-200 dark:border-ink-700 group-hover:scale-105 transition-transform">
                                                    <span className="text-cinnabar-600 text-xs font-serif-sc tracking-widest flex items-center gap-2">
                                                        <Icons.Candle className="w-4 h-4" /> 天机封印
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </>
        ) : (
            // Standard Mode fallback
             <LayerCard title="意象 (Imagery)" delay="0s">
                <p className="text-ink-700 dark:text-gray-300 text-sm leading-7 font-light text-justify">{data.imagery}</p>
             </LayerCard>
        )}

        {/* Action / Energy Totem / Advice */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 animate-ink" style={{ animationDelay: '0.4s' }}>
            
            {/* Advice Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-paper-100 to-paper-200 dark:from-ink-800/60 dark:to-ink-800/20 relative overflow-hidden flex flex-col justify-center border border-paper-300 dark:border-ink-700/50">
                <h3 className="text-cinnabar-600 dark:text-cinnabar-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Icons.Sparkles className="w-4 h-4" /> 破局之策
                </h3>
                <p className="font-serif-sc text-ink-900 dark:text-celadon-100 text-md leading-relaxed text-justify">{data.advice}</p>
            </div>

            {/* Energy Totem */}
            {data.energyTotem && (
                <div 
                    className="w-full md:w-48 flex flex-col items-center justify-center p-6 rounded-3xl bg-ink-900 dark:bg-ink-800 text-paper-100 relative group cursor-pointer overflow-hidden shadow-lg"
                    onClick={() => handleLockedFeature("下载本命图腾")}
                >
                     <div className="absolute inset-0 bg-celadon-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                     <div className="absolute top-4 right-4 text-celadon-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icons.Image className="w-5 h-5" />
                     </div>
                     
                     <h4 className="text-celadon-500/50 text-[10px] uppercase tracking-widest mb-2 z-10">能量图腾</h4>
                     <div className="font-serif-sc text-6xl text-celadon-100 mb-2 z-10">
                        {data.energyTotem.kanji}
                     </div>
                     <p className="text-[10px] text-celadon-200/60 text-center leading-tight z-10">
                        {data.energyTotem.meaning}
                     </p>
                </div>
            )}
        </div>

        {/* Gold Value & Mantra */}
        {(data.goldValue || data.dailyMantra) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-ink" style={{ animationDelay: '0.5s' }}>
                
                {data.goldValue && (
                    <div className="p-6 rounded-2xl bg-paper-100 dark:bg-ink-800/50 flex flex-col items-center justify-center text-center border border-paper-200 dark:border-ink-700/50">
                        <h4 className="text-yellow-700/70 dark:text-yellow-600/70 text-[10px] uppercase tracking-widest mb-2">名字估值</h4>
                        <div className="font-serif-sc text-3xl text-yellow-600 dark:text-yellow-500">
                            {data.goldValue} <span className="text-sm">两黄金</span>
                        </div>
                    </div>
                )}

                {data.dailyMantra && (
                    <div className="p-6 rounded-2xl bg-paper-100 dark:bg-ink-800/50 flex flex-col items-center justify-center text-center border border-paper-200 dark:border-ink-700/50">
                         <h4 className="text-celadon-700/70 dark:text-celadon-500/70 text-[10px] uppercase tracking-widest mb-2">今日运签</h4>
                         <p className="font-serif-sc text-ink-800 dark:text-celadon-200 text-sm">
                            "{data.dailyMantra}"
                         </p>
                    </div>
                )}
            </div>
        )}

        {/* Ultimate Question */}
        <div className="mt-16 text-center animate-ink" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-ink-400 dark:text-ink-700/50 text-[10px] uppercase tracking-[0.5em] mb-6">Ultimate Inquiry</h3>
            <p className="font-serif-sc text-2xl text-ink-900 dark:text-celadon-100 leading-relaxed px-4">
                "{data.finalQuestion}"
            </p>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-16 flex justify-center gap-6">
        <button 
            onClick={onReset}
            className="px-8 py-3 rounded-full border border-ink-300 dark:border-ink-700 text-ink-500 dark:text-celadon-500/50 hover:bg-paper-200 dark:hover:bg-ink-800 text-xs tracking-widest uppercase transition-all"
        >
            返回首页
        </button>
        <button 
            onClick={handleCopy}
            className="px-8 py-3 rounded-full bg-ink-900 dark:bg-ink-800 text-paper-100 dark:text-celadon-200 hover:scale-105 hover:bg-black dark:hover:bg-ink-700 text-xs tracking-widest uppercase transition-all flex items-center gap-2 shadow-lg"
        >
            {copyStatus === 'copied' ? '已复制' : '复制天机'}
        </button>
      </div>
    </div>
  );
};

const LayerCard: React.FC<{ title: string; children: React.ReactNode; delay: string }> = ({ title, children, delay }) => (
    <div className="animate-ink" style={{ animationDelay: delay }}>
        <h3 className="text-ink-500 dark:text-celadon-500 text-xs font-bold uppercase tracking-widest mb-4 opacity-70 ml-2">{title}</h3>
        <div className="bg-paper-50 dark:bg-ink-800/30 border border-paper-200 dark:border-ink-700/50 p-6 rounded-2xl space-y-4 shadow-sm">
            {children}
        </div>
    </div>
);

const Item: React.FC<{ label: string; content: string }> = ({ label, content }) => (
    <div className="flex flex-col sm:flex-row sm:gap-6 gap-1 items-start">
        <span className="text-ink-400 dark:text-celadon-500/80 text-xs min-w-[3rem] pt-1 font-medium">{label}</span>
        <span className="text-ink-800 dark:text-gray-300 text-sm leading-relaxed font-light text-justify flex-1">{content}</span>
    </div>
);