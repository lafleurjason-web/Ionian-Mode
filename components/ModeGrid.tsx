import React from 'react';
import { KeyRoot, SCALES, MODES, SCALE_DEGREES } from '../constants';

interface ModeGridProps {
  rootKey: KeyRoot;
}

export const ModeGrid: React.FC<ModeGridProps> = ({ rootKey }) => {
  const scaleNotes = SCALES[rootKey];

  // Helper to get note at infinite index (wrapping around scale)
  const getNoteAt = (index: number) => scaleNotes[index % 7];

  // Construct the Grid Layout based on Intervals
  // We insert a 'spacer' column for Whole Steps.
  // We do NOT insert a spacer for Half Steps.
  const gridStructure: Array<{ type: 'note' | 'spacer'; index?: number }> = [];

  for (let i = 0; i < 15; i++) {
    // Add the Note Column
    gridStructure.push({ type: 'note', index: i });

    // Determine if we need a Spacer after this note
    // Major Scale Intervals: W W H W W W H
    // Indices (0-based): 
    // 0->1 (W)
    // 1->2 (W)
    // 2->3 (H)  <-- Index 2 (3rd degree)
    // 3->4 (W)
    // 4->5 (W)
    // 5->6 (W)
    // 6->7 (H)  <-- Index 6 (7th degree)
    
    const scaleIndex = i % 7;
    const isHalfStepNext = scaleIndex === 2 || scaleIndex === 6;

    // Add spacer if it's a Whole Step and not the very last element of our range
    if (!isHalfStepNext && i < 14) {
      gridStructure.push({ type: 'spacer' });
    }
  }

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="min-w-[1200px] border border-slate-700 rounded-lg bg-slate-800/50 shadow-xl overflow-hidden">
        <table className="w-full border-collapse text-sm relative">
          <thead>
            <tr>
              {/* Corner Header */}
              <th className="w-32 bg-slate-900 p-3 font-bold text-slate-400 border-r border-b border-slate-700 sticky left-0 z-30 text-center shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                MODE
              </th>
              
              {/* Dynamic Columns */}
              {gridStructure.map((col, idx) => {
                if (col.type === 'spacer') {
                  return (
                    <th key={`head-${idx}`} className="w-12 bg-slate-900/30 border-b border-slate-700/30">
                        {/* Spacer Header - Intentionally Empty */}
                    </th>
                  );
                }

                const degree = SCALE_DEGREES[col.index!];
                return (
                  <th 
                    key={`head-${idx}`} 
                    className={`
                      w-20 p-2 border-r border-b border-slate-700/50 font-bold text-slate-200
                      ${col.index! < 8 ? 'bg-yellow-200/5' : 'bg-orange-200/5'}
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <span className="text-base">{degree.label}</span>
                      {degree.sub && <span className="text-[10px] text-slate-500 uppercase font-normal">{degree.sub}</span>}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {MODES.map((mode) => (
              <tr key={mode.name} className="hover:bg-slate-800/80 transition-colors group">
                {/* Row Header */}
                <th className="p-2 border-r border-b border-slate-700/50 text-right pr-4 text-xs md:text-sm font-bold text-slate-300 bg-slate-900/80 sticky left-0 z-20 shadow-[2px_0_5px_rgba(0,0,0,0.5)]">
                  {mode.name}
                </th>

                {/* Grid Cells */}
                {gridStructure.map((col, idx) => {
                  if (col.type === 'spacer') {
                    return (
                        <td key={`cell-${mode.name}-${idx}`} className="bg-slate-950/30 border-b border-slate-700/10">
                            {/* Spacer Cell - Empty */}
                        </td>
                    );
                  }

                  // Note Logic
                  const colIndex = col.index!;
                  const isActive = colIndex >= mode.offset;
                  const note = isActive ? getNoteAt(colIndex) : null;
                  const isRootOfMode = colIndex === mode.offset;

                  return (
                    <td 
                      key={`cell-${mode.name}-${idx}`} 
                      className={`
                        p-1 border-r border-b border-slate-700/30 text-center h-14
                        ${isActive ? 'bg-slate-800/20' : ''}
                      `}
                    >
                      {note && (
                        <div className={`
                          w-full h-full flex items-center justify-center rounded text-sm font-medium
                          ${isRootOfMode 
                             ? `${mode.color} ${mode.textColor} font-bold shadow-md ring-1 ring-inset ring-black/10 scale-90` 
                             : 'text-slate-300'}
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