import React from 'react';
import { KeyRoot, SCALES, MODES, SCALE_DEGREES } from '../constants';

interface ModeGridProps {
  rootKey: KeyRoot;
}

export const ModeGrid: React.FC<ModeGridProps> = ({ rootKey }) => {
  const scaleNotes = SCALES[rootKey];

  // Helper to get note at infinite index (wrapping around scale)
  const getNoteAt = (index: number) => scaleNotes[index % 7];

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      {/* Container with min width to ensure table doesn't crush on mobile */}
      <div className="min-w-[800px] border border-slate-700 rounded-lg bg-slate-800/50 shadow-xl overflow-hidden">
        <table className="w-full border-collapse table-fixed text-sm">
          <thead>
            <tr>
              {/* Corner Header */}
              <th className="w-32 bg-slate-900 p-3 font-bold text-slate-400 border-r border-b border-slate-700 sticky top-0 left-0 z-20 text-center shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
                MODE
              </th>
              
              {/* Scale Degrees Header */}
              {SCALE_DEGREES.map((degree, i) => (
                <th 
                  key={i} 
                  className={`p-2 border-r border-b border-slate-700/50 font-bold text-slate-200 sticky top-0 z-10
                    ${i < 8 ? 'bg-yellow-200/5' : 'bg-orange-200/5'}
                    backdrop-blur-sm
                  `}
                >
                  <div className="flex flex-col items-center justify-center">
                    <span>{degree.label}</span>
                    {degree.sub && <span className="text-[10px] text-slate-500 uppercase font-normal">{degree.sub}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODES.map((mode) => (
              <tr key={mode.name} className="hover:bg-slate-800/80 transition-colors group">
                {/* Row Header (Mode Name) */}
                <th className="p-2 border-r border-b border-slate-700/50 text-right pr-4 text-xs md:text-sm font-bold text-slate-300 bg-slate-900/50 group-hover:bg-slate-900/80 sticky left-0 z-10">
                  {mode.name}
                </th>

                {/* Grid Cells */}
                {Array.from({ length: 15 }).map((_, colIndex) => {
                   // Calculate if this cell should contain a note based on the mode's offset
                   // The grid is 15 columns wide.
                   // Ionian (offset 0) starts at col 0.
                   // Dorian (offset 1) starts at col 1.
                   
                   const isActive = colIndex >= mode.offset;
                   const note = isActive ? getNoteAt(colIndex) : null;
                   const isRootOfMode = colIndex === mode.offset;

                   return (
                    <td 
                        key={colIndex} 
                        className={`p-1 border-r border-b border-slate-700/30 text-center h-12
                             ${isActive ? 'bg-slate-800/20' : ''}
                        `}
                    >
                        {note && (
                            <div className={`
                                w-full h-full flex items-center justify-center rounded text-sm
                                ${isRootOfMode 
                                    ? `${mode.color} ${mode.textColor} font-bold shadow-md ring-1 ring-inset ring-black/10` 
                                    : 'text-slate-300 font-medium'}
                            `}>
                                {note}
                            </div>
                        )}
                    </td>
                   );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};