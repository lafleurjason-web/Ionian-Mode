import React from 'react';
import { CHROMATIC_ORDER, KeyRoot } from '../constants';

interface KeySelectorProps {
  selectedKey: KeyRoot;
  onSelectKey: (key: KeyRoot) => void;
}

export const KeySelector: React.FC<KeySelectorProps> = ({ selectedKey, onSelectKey }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center p-4 bg-slate-800 rounded-lg shadow-lg">
      {CHROMATIC_ORDER.map((key) => (
        <button
          key={key}
          onClick={() => onSelectKey(key)}
          className={`
            w-12 h-12 rounded-full font-bold text-lg transition-all duration-200
            border-2
            ${selectedKey === key 
              ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110' 
              : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
            }
          `}
        >
          {key}
        </button>
      ))}
    </div>
  );
};