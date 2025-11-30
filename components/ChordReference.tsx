import React from 'react';
import { KeyRoot, TRIADS, SCALES } from '../constants';

interface ChordReferenceProps {
  rootKey: KeyRoot;
}

export const ChordReference: React.FC<ChordReferenceProps> = ({ rootKey }) => {
  // We need to calculate the actual notes for the parallel chords of the root.
  // E.g. Root G. 
  // Maj: G B D
  // Min: G Bb D
  // Aug: G B D#
  // Dim: G Bb Db
  // This requires chromatic awareness which our simple SCALES map doesn't fully expose purely by index.
  // However, we can approximate or hardcode the intervals for display purposes or just show the formula.
  // The user prompt asked to update "all of the scaled in the mode".
  // The image shows "MAJ G", "MIN G".
  
  // Let's keep it simple: Show the chord name and the generic formula, 
  // and maybe try to compute the specific notes if possible using a chromatic lookup.

  const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  // Handle flat keys by normalizing?
  // Normalization map for display
  const noteToChromaticIndex = (note: string) => {
    const n = note.replace('b', '#'); // Simple conversion for index finding
    // specific overrides
    if (note === 'Db') return 1;
    if (note === 'Eb') return 3;
    if (note === 'Gb') return 6;
    if (note === 'Ab') return 8;
    if (note === 'Bb') return 10;
    if (note === 'F') return 5; 
    if (note === 'E#') return 5;
    if (note === 'Cb') return 11;

    const idx = chromaticScale.indexOf(n);
    if (idx === -1) {
        // Fallback for simple sharps
        if (n.includes('#')) {
             const base = n[0];
             const baseIdx = chromaticScale.indexOf(base);
             return (baseIdx + 1) % 12;
        }
    }
    return idx;
  };

  const getNoteByInterval = (root: string, semitones: number) => {
      const rootIdx = noteToChromaticIndex(root);
      const targetIdx = (rootIdx + semitones) % 12;
      // We want to return a note name that looks reasonable for the key.
      // If the root is flat, prefer flats. If sharp, prefer sharps.
      const isFlatKey = root.includes('b') || root === 'F';
      
      const sharpNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const flatNotes =  ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
      
      return isFlatKey ? flatNotes[targetIdx] : sharpNotes[targetIdx];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {TRIADS.map((triad) => {
        const root = rootKey;
        // Calculate notes
        let notes: string[] = [];
        if (triad.name === 'MAJ') {
            notes = [
                getNoteByInterval(root, 0),
                getNoteByInterval(root, 4),
                getNoteByInterval(root, 7)
            ];
        } else if (triad.name === 'MIN') {
            notes = [
                getNoteByInterval(root, 0),
                getNoteByInterval(root, 3),
                getNoteByInterval(root, 7)
            ];
        } else if (triad.name === 'AUG') {
             notes = [
                getNoteByInterval(root, 0),
                getNoteByInterval(root, 4),
                getNoteByInterval(root, 8)
            ];
        } else if (triad.name === 'DIM') {
             notes = [
                getNoteByInterval(root, 0),
                getNoteByInterval(root, 3),
                getNoteByInterval(root, 6)
            ];
        }

        return (
          <div key={triad.name} className="bg-slate-800 border border-slate-700 p-4 rounded-lg flex flex-col items-center">
            <div className="text-xl font-bold text-slate-100 mb-1">{triad.name} <span className="text-blue-400">{rootKey}</span></div>
            <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">{triad.desc}</div>
            
            <div className="flex gap-2 mb-2">
                {notes.map((n, i) => (
                    <div key={i} className="bg-slate-900 w-10 h-10 flex items-center justify-center rounded border border-slate-600 font-mono font-bold text-slate-200">
                        {n}
                    </div>
                ))}
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono bg-slate-900/50 px-2 py-1 rounded">
                Formula: {triad.intervals.join(' - ')}
            </div>
          </div>
        );
      })}
    </div>
  );
};