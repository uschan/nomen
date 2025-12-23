import React from 'react';

export const VisualEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Spiral Core - The Golden Ratio representation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] opacity-[0.03] animate-spin-slow origin-center"
             style={{
                background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 100deg, #8ba694 180deg, transparent 360deg)`,
                maskImage: 'radial-gradient(circle, transparent 10%, black 100%)',
                WebkitMaskImage: 'radial-gradient(circle, transparent 10%, black 100%)'
             }}>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-celadon-500/10 dark:bg-celadon-500/5 rounded-full blur-[120px] animate-breathe"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cinnabar-600/10 dark:bg-cinnabar-600/5 rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '2s' }}></div>
        
        {/* SOUL PARTICLES (Dark Mode Only Mysterious Effect) */}
        <div className="hidden dark:block absolute inset-0 opacity-40">
            <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-celadon-100 rounded-full shadow-[0_0_10px_white] animate-float-particle"></div>
            <div className="absolute top-[60%] left-[80%] w-1 h-1 bg-celadon-100 rounded-full shadow-[0_0_15px_white] animate-float-particle" style={{ animationDelay: '1s', animationDuration: '8s' }}></div>
            <div className="absolute top-[80%] left-[30%] w-[2px] h-[2px] bg-celadon-200 rounded-full shadow-[0_0_8px_white] animate-float-particle" style={{ animationDelay: '3s', animationDuration: '12s' }}></div>
            <div className="absolute top-[40%] left-[50%] w-[3px] h-[3px] bg-cinnabar-200 rounded-full shadow-[0_0_12px_red] animate-float-particle" style={{ animationDelay: '5s', animationDuration: '15s' }}></div>
            <div className="absolute top-[10%] left-[90%] w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white] animate-float-particle" style={{ animationDelay: '2s', animationDuration: '20s' }}></div>
            
            {/* Subtle Fog Layers */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light animate-pulse-slow"></div>
        </div>

        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}></div>
        
        <style>{`
          @keyframes float-particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.8; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
          }
          .animate-float-particle {
            animation: float-particle 10s ease-in-out infinite;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.2; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }
        `}</style>
    </div>
  );
};