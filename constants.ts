export type KeyRoot = 'C' | 'G' | 'D' | 'A' | 'E' | 'B' | 'F#' | 'Db' | 'Ab' | 'Eb' | 'Bb' | 'F';

export interface ScaleDefinition {
  root: KeyRoot;
  notes: string[];
}

// Ordered by Circle of Fifths roughly for logic, but we can display chromatically
export const SCALES: Record<KeyRoot, string[]> = {
  'C':  ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  'G':  ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
  'D':  ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
  'A':  ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
  'E':  ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
  'B':  ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
  'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'], // E# is enharmonically F
  'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'],
  'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'],
  'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'],
  'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'],
  'F':  ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
};

export const ORDERED_KEYS: KeyRoot[] = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F'
];

export const CHROMATIC_ORDER: KeyRoot[] = [
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'
];

export const MODES = [
  { name: 'IONIAN',     offset: 0, color: 'bg-green-500',  textColor: 'text-green-950' },
  { name: 'DORIAN',     offset: 1, color: 'bg-blue-200',   textColor: 'text-blue-900' },
  { name: 'PHRYGIAN',   offset: 2, color: 'bg-indigo-200', textColor: 'text-indigo-900' },
  { name: 'LYDIAN',     offset: 3, color: 'bg-purple-200', textColor: 'text-purple-900' },
  { name: 'MIXOLYDIAN', offset: 4, color: 'bg-pink-200',   textColor: 'text-pink-900' },
  { name: 'AEOLIAN',    offset: 5, color: 'bg-orange-200', textColor: 'text-orange-900' },
  { name: 'LOCRIAN',    offset: 6, color: 'bg-red-200',    textColor: 'text-red-900' },
];

export const SCALE_DEGREES = [
  { label: '1', sub: '' },
  { label: '2', sub: '' },
  { label: '3', sub: '' },
  { label: '4', sub: '' },
  { label: '5', sub: '' },
  { label: '6', sub: '' },
  { label: '7', sub: '' },
  { label: '8', sub: '' },
  { label: '9', sub: 'or 2' },
  { label: '10', sub: '' },
  { label: '11', sub: 'or 4' },
  { label: '12', sub: 'or 5' },
  { label: '13', sub: 'or 6' },
  { label: '14', sub: 'or 7' },
  { label: '15', sub: '1' },
];

export const TRIADS = [
    { name: 'MAJ', intervals: ['1', '3', '5'], desc: 'Major Triad' },
    { name: 'MIN', intervals: ['1', 'b3', '5'], desc: 'Minor Triad' },
    { name: 'AUG', intervals: ['1', '3', '#5'], desc: 'Augmented Triad' },
    { name: 'DIM', intervals: ['1', 'b3', 'b5'], desc: 'Diminished Triad' },
];

export const PROGRESSIONS = [
  { name: 'Pop Anthem', degrees: [1, 5, 6, 4] },
  { name: 'Doo-Wop / 50s', degrees: [1, 6, 4, 5] },
  { name: 'Jazz ii-V-I', degrees: [2, 5, 1] },
  { name: 'Sentimental / Canon', degrees: [1, 5, 6, 3] },
  { name: 'Classic Rock', degrees: [1, 4, 5, 4] },
  { name: 'Blues Turnaround', degrees: [1, 4, 1, 5] },
];