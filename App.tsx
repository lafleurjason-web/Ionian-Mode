import React, { useState } from 'react';
import { KeyRoot } from './constants';
import { KeySelector } from './components/KeySelector';
import { ModeGrid } from './components/ModeGrid';
import { ChordReference } from './components/ChordReference';
import { ProgressionList } from './components/ProgressionList';

const App: React.FC = () => {
  const [selectedRoot, setSelectedRoot] = useState<KeyRoot>('G');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-4 md:p-8">
      
      <header className="mb-8 text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
          Ionian Mode Explorer
        </h1>
        <p className="text-slate-400 text-lg">
          Select a tonic (root) note below to generate the Ionian mode (Major Scale) and its relative modes.
        </p>
      </header>

      <div className="w-full max-w-6xl space-y-12 mb-16">
        
        <section className="flex flex-col items-center gap-4">
          <label className="text-slate-500 uppercase text-xs font-bold tracking-widest">Select Key</label>
          <KeySelector 
            selectedKey={selectedRoot} 
            onSelectKey={setSelectedRoot} 
          />
        </section>

        <section className="w-full">
           <div className="flex justify-between items-end mb-4 px-2">
               <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
                 <span className="w-2 h-8 bg-blue-500 rounded-sm block"></span>
                 Mode Chart
               </h2>
               <div className="text-right text-slate-500 text-sm">
                   Key of <span className="text-blue-400 font-bold">{selectedRoot} Major</span>
               </div>
           </div>
           
           <ModeGrid rootKey={selectedRoot} />
        </section>

        <section className="w-full pt-8 border-t border-slate-800">
            <h2 className="text-xl font-bold text-slate-300 mb-2 flex items-center gap-2">
                <span className="w-2 h-6 bg-purple-500 rounded-sm block"></span>
                Common Progressions
            </h2>
            <p className="text-slate-500 text-sm mb-4 pl-4">Popular sequences of chords naturally found in the key of {selectedRoot} Major.</p>
            <ProgressionList rootKey={selectedRoot} />
        </section>

        <section className="w-full pt-8 border-t border-slate-800">
            <h2 className="text-xl font-bold text-slate-300 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-emerald-500 rounded-sm block"></span>
                Parallel Triads ({selectedRoot})
            </h2>
            <ChordReference rootKey={selectedRoot} />
        </section>

      </div>

      <footer className="text-slate-600 text-sm text-center pb-8">
        <p>Based on the relative modes of the Major Scale.</p>
        <p className="mt-2">Ionian Mode Explorer &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default App;