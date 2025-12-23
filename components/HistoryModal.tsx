import React from 'react';
import { AnalysisResult } from '../types';
import { Icons } from './Icons';

interface Props {
  history: AnalysisResult[];
  onSelect: (item: AnalysisResult) => void;
  onClose: () => void;
}

const personaLabels: Record<string, { label: string; color: string }> = {
  colloquial: { label: '通俗深度', color: 'text-celadon-700 border-celadon-500/50 bg-celadon-100/50 dark:text-celadon-500 dark:bg-transparent' },
  sage: { label: '隐世高人', color: 'text-stone-600 border-stone-400/50 bg-stone-100/50 dark:text-stone-400 dark:bg-transparent' },
  psychologist: { label: '心理咨询', color: 'text-rose-600 border-rose-300/50 bg-rose-50/50 dark:text-rose-300 dark:bg-transparent' },
  mentor: { label: '毒舌导师', color: 'text-blue-600 border-blue-300/50 bg-blue-50/50 dark:text-blue-300 dark:bg-transparent' },
};

export const HistoryModal: React.FC<Props> = ({ history, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 dark:bg-ink-900/80 backdrop-blur-md animate-ink">
      <div className="w-full max-w-lg bg-paper-50 dark:bg-ink-900 border border-paper-200 dark:border-ink-700 shadow-2xl rounded-3xl flex flex-col max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-paper-200 dark:border-ink-700 flex justify-between items-center bg-paper-100 dark:bg-ink-800">
          <h2 className="font-serif-sc text-xl text-ink-900 dark:text-celadon-100 tracking-widest flex items-center gap-2">
            <Icons.History className="w-5 h-5" /> 档案库
          </h2>
          <button onClick={onClose} className="text-ink-400 dark:text-celadon-500 hover:text-cinnabar-600 transition-colors">
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1 p-4 space-y-3 custom-scrollbar bg-paper-50 dark:bg-ink-900">
          {history.length === 0 ? (
            <div className="text-center py-20 text-ink-400 dark:text-ink-700 text-sm uppercase tracking-widest">
              暂无记录 (Empty)
            </div>
          ) : (
            history.map((item) => {
               const personaInfo = personaLabels[item.userInput.persona] || personaLabels['colloquial'];
               
               return (
                <div 
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="group p-4 rounded-2xl border border-paper-200 dark:border-ink-700 bg-white dark:bg-ink-800/50 hover:border-cinnabar-200 dark:hover:border-ink-600 cursor-pointer transition-all flex gap-4 items-center shadow-sm hover:shadow-md"
                >
                  <div className="w-14 h-14 flex-shrink-0 bg-paper-200 dark:bg-ink-900 rounded-full overflow-hidden border border-paper-300 dark:border-ink-700">
                      {item.imageUrl ? (
                          <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-ink-400 dark:text-ink-700 text-xs">?</div>
                      )}
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-ink-900 dark:text-celadon-200 font-serif-sc text-lg truncate">{item.userInput.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 border rounded-lg ${personaInfo.color}`}>
                            {personaInfo.label}
                          </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-ink-500 dark:text-celadon-500/60 text-xs truncate flex-1 pr-2">{item.summary}</p>
                        <span className="text-ink-300 dark:text-ink-700 text-[10px] flex-shrink-0">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};