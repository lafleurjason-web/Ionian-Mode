import React from 'react';
import { KeyRoot, SCALES, PROGRESSIONS } from '../constants';

interface ProgressionListProps {
  rootKey: KeyRoot;
}

export const ProgressionList: React.FC<ProgressionListProps> = ({ rootKey }) => {
  const scale = SCALES[rootKey];

  const getChordName = (degree: number) => {
    const note = scale[degree - 1];
    if ([2, 3, 6].includes(degree)) return `${note}m`;
    if (degree === 7) return `${note}dim`;
    return note;
  };

  const getRomanNumeral = (degree: number) => {
      const romans = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
      const base = romans[degree - 1];
      if ([2, 3, 6].includes(degree)) return base.toLowerCase();
      if (degree === 7) return base.toLowerCase() + '°';
      return base;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {PROGRESSIONS.map((prog, idx) => (
        <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-slate-600 transition-colors shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-slate-200 text-lg">{prog.name}</h3>
                    <p className="text-slate-500 text-xs font-mono mt-1 font-bold tracking-wider">
                        {prog.degrees.map(d => getRomanNumeral(d)).join(' - ')}
                    </p>
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
                {prog.degrees.map((degree, i) => (
                    <React.Fragment key={i}>
                        <div className="bg-slate-900 border border-slate-600 text-slate-100 font-bold px-3 py-2 rounded-md min-w-[3.5rem] text-center shadow-inner text-sm md:text-base">
                            {getChordName(degree)}
                        </div>
                        {i < prog.degrees.length - 1 && (
                             <div className="text-slate-600">→</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
      ))}
    </div>
  );
};