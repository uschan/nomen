import React, { useState } from 'react';
import { Icons } from './Icons';

interface Props {
  onClose: () => void;
}

export const SanctuaryModal: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'offerings' | 'subscription'>('offerings');

  const handlePurchase = (item: string) => {
    alert(`【模拟支付网关】\n\n正在与「${item}」建立能量链接...\n\n(支付功能将于 v2.1 版本上线)`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-ink-900/95 backdrop-blur-xl animate-ink overscroll-none">
      {/* Container: Fullscreen on mobile (100dvh for browser bars), Rounded Box on Desktop */}
      <div className="w-full md:max-w-5xl bg-paper-50 dark:bg-ink-900 border-none md:border border-paper-200 dark:border-ink-700 md:shadow-2xl md:rounded-3xl flex flex-col md:flex-row h-[100dvh] md:h-[650px] overflow-hidden relative">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-30 text-ink-400 dark:text-celadon-500/50 hover:text-cinnabar-500 transition-colors bg-paper-100/80 dark:bg-black/20 p-2 rounded-full backdrop-blur-sm shadow-sm"
        >
            <Icons.Close className="w-6 h-6" />
        </button>

        {/* Left Side (Desktop) / Top Side (Mobile): Visual & Menu */}
        <div className="w-full md:w-1/3 bg-ink-900 dark:bg-ink-800/50 border-b md:border-b-0 md:border-r border-ink-800 dark:border-ink-700 p-6 md:p-10 flex flex-col justify-between relative overflow-hidden text-white flex-shrink-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-900/60 to-ink-900"></div>
            
            {/* Header Info */}
            <div className="relative z-10 flex md:block items-center gap-4 md:mt-10 pt-2 md:pt-0">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center md:mb-6 border border-white/10 flex-shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                    <Icons.Torii className="w-6 h-6 md:w-8 md:h-8 text-celadon-200" />
                </div>
                <div>
                    <h2 className="font-serif-sc text-2xl md:text-3xl text-paper-100 mb-1 md:mb-2 text-shadow">内环 · 结界</h2>
                    <p className="text-celadon-500 text-[9px] md:text-[10px] uppercase tracking-[0.3em]">The Sanctuary</p>
                </div>
            </div>

            {/* Menu & Quote */}
            <div className="relative z-10 space-y-4 md:space-y-8 mt-6 md:mt-0">
                <p className="font-serif-sc text-xs md:text-sm text-gray-400 leading-loose text-justify hidden md:block">
                    “世人皆求果，唯吾独求因。内环并非特权，而是一处修行的道场。”
                </p>
                
                {/* Mobile: Horizontal Grid / Desktop: Vertical Stack */}
                <div className="grid grid-cols-2 md:flex md:flex-col gap-3">
                    <button 
                        onClick={() => setActiveTab('offerings')}
                        className={`w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center md:justify-start gap-2 md:gap-3 ${activeTab === 'offerings' ? 'bg-paper-100 text-ink-900 shadow-lg font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        <Icons.Image className="w-4 h-4" /> <span className="truncate">法器 Offerings</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('subscription')}
                        className={`w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center md:justify-start gap-2 md:gap-3 ${activeTab === 'subscription' ? 'bg-cinnabar-600 text-white shadow-lg font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                         <Icons.Candle className="w-4 h-4" /> <span className="truncate">供养 Sub</span>
                    </button>
                </div>
            </div>
        </div>

        {/* Right Side (Desktop) / Bottom Side (Mobile): Products */}
        <div className="w-full md:w-2/3 p-6 md:p-10 bg-paper-50 dark:bg-ink-900 relative overflow-y-auto custom-scrollbar flex-grow">
            
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[300px] md:h-[400px] border border-ink-900/5 dark:border-ink-700/30 rounded-full animate-spin-slow pointer-events-none"></div>

            {activeTab === 'offerings' && (
                <div className="space-y-6 animate-ink relative z-10 pb-32 md:pb-10">
                    <div className="mb-4 md:mb-8">
                        <h3 className="text-celadon-700 dark:text-celadon-500 text-xs font-bold uppercase tracking-widest mb-2">单次结缘 · One-Time</h3>
                        <p className="text-ink-500 dark:text-gray-500 text-xs">获取专属的数字能量载体，永久留存。</p>
                    </div>

                    <ProductCard 
                        title="本命图腾 · 原画"
                        subtitle="8K Digital Totem Wallpaper"
                        price="¥ 6.00"
                        desc="获取 AI 为你生成的超清「精神锚点」图腾，含手机/电脑双端壁纸。无水印，附赠设计师视角的构图解析。"
                        Icon={Icons.Image}
                        onBuy={() => handlePurchase('本命图腾')}
                    />

                    <ProductCard 
                        title="天机档案 · 完整版"
                        subtitle="Full Report & Timeline"
                        price="¥ 18.00"
                        desc="解锁未来 3 年的流年抉择点（Timeline），并生成一份精排版的 PDF 深度心理侧写报告，可打印收藏。"
                        Icon={Icons.ScrollText}
                        isRecommended
                        onBuy={() => handlePurchase('天机档案')}
                    />
                </div>
            )}

            {activeTab === 'subscription' && (
                <div className="space-y-6 animate-ink relative z-10 pb-32 md:pb-10">
                    <div className="mb-4 md:mb-8">
                        <h3 className="text-cinnabar-600 dark:text-cinnabar-500 text-xs font-bold uppercase tracking-widest mb-2">长期供养 · Membership</h3>
                        <p className="text-ink-500 dark:text-gray-500 text-xs">加入内环，开启持续的生命推演。</p>
                    </div>

                    <ProductCard 
                        title="觉醒者 · 月供"
                        subtitle="The Awakened (Monthly)"
                        price="¥ 12.00 / 月"
                        desc="每日「五行调频」建议 + 无限次「场景模拟器」（今日宜忌/谈判模拟/约会推演）。"
                        Icon={Icons.Sparkles}
                        onBuy={() => handlePurchase('觉醒者月卡')}
                    />

                     <ProductCard 
                        title="共修者 · 年供"
                        subtitle="The Inner Circle (Yearly)"
                        price="¥ 98.00 / 年"
                        desc="包含月供所有权益。额外解锁：「因缘镜」（合盘分析）+ 3 次亲友赠礼权限（Gift Karma）。"
                        Icon={Icons.Torii}
                        highlightColor="border-cinnabar-100 bg-cinnabar-50/50 dark:border-cinnabar-900/50 dark:bg-cinnabar-900/10"
                        btnColor="bg-cinnabar-700 hover:bg-cinnabar-800 text-white"
                        onBuy={() => handlePurchase('共修者年卡')}
                    />
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

interface ProductProps {
    title: string;
    subtitle: string;
    price: string;
    desc: string;
    Icon: React.ElementType;
    highlightColor?: string;
    btnColor?: string;
    isRecommended?: boolean;
    onBuy: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ 
    title, subtitle, price, desc, Icon, 
    highlightColor = "border-paper-200 bg-white dark:border-ink-700 dark:bg-ink-800/30", 
    btnColor = "bg-ink-900 hover:bg-black dark:bg-ink-800 dark:hover:bg-ink-700 text-paper-100 dark:text-celadon-200",
    isRecommended = false,
    onBuy 
}) => (
    <div className={`relative p-5 md:p-6 rounded-2xl border ${isRecommended ? 'border-cinnabar-500/30 dark:border-cinnabar-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : highlightColor} flex flex-col sm:flex-row gap-5 items-start sm:items-center group transition-all duration-300 hover:scale-[1.01] overflow-hidden`}>
        
        {/* RECOMMENDED BADGE */}
        {isRecommended && (
            <div className="absolute -top-1 -right-1 z-10 pointer-events-none">
                <span className="relative flex h-8 w-auto items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cinnabar-500 opacity-20"></span>
                  <span className="relative inline-flex rounded-bl-xl rounded-tr-lg px-4 py-1.5 bg-gradient-to-r from-cinnabar-600 via-red-600 to-orange-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg items-center gap-1 border-b border-l border-white/20">
                    <Icons.Sparkles className="w-3 h-3 text-yellow-200" /> 店主亲选
                  </span>
                </span>
            </div>
        )}
        
        <div className="w-12 h-12 flex items-center justify-center bg-paper-100 dark:bg-ink-900 border border-paper-200 dark:border-ink-700 rounded-2xl group-hover:rotate-6 transition-transform duration-500 flex-shrink-0">
            <Icon className="w-6 h-6 text-ink-700 dark:text-celadon-200" />
        </div>
        
        <div className="flex-1 w-full">
            <div className="flex justify-between items-baseline mb-1 pr-6">
                <h4 className="font-serif-sc text-lg text-ink-900 dark:text-gray-200">{title}</h4>
                <span className="font-serif-sc text-lg text-cinnabar-600 dark:text-celadon-400 whitespace-nowrap">{price}</span>
            </div>
            <p className="text-[10px] text-ink-400 dark:text-gray-500 uppercase tracking-wider mb-2">{subtitle}</p>
            <p className="text-ink-600 dark:text-gray-400 text-xs font-light leading-relaxed text-justify border-t border-paper-200 dark:border-ink-700/50 pt-3">
                {desc}
            </p>
        </div>

        <button 
            onClick={onBuy}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs tracking-widest uppercase transition-all whitespace-nowrap border border-transparent shadow-sm ${btnColor}`}
        >
            结缘
        </button>
    </div>
);