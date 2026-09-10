import { useEffect, useRef, useState } from 'react';
import type { ReceptionistVoice } from '@/lib/api';

type Props = { voices: ReceptionistVoice[]; value: string; onChange: (id: string) => void };
export default function VoicePicker({ voices, value, onChange }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [error, setError] = useState('');
  const stop = () => {
    const audio = audioRef.current;
    audioRef.current = null;
    if (audio) { audio.onended = null; audio.onerror = null; audio.pause(); }
  };
  useEffect(() => { stop(); setPlaying(null); setError(''); return stop; }, [value]);
  const play = async (voice: ReceptionistVoice) => {
    stop(); setPlaying(null); setError('');
    if (!voice.previewUrl) return;
    const audio = new Audio(voice.previewUrl);
    audioRef.current = audio;
    setPlaying(voice.id);
    const failed = () => {
      if (audioRef.current !== audio) return;
      stop(); setPlaying(null); setError(`Could not play ${voice.label}'s sample. Please try again.`);
    };
    audio.onended = () => { if (audioRef.current === audio) { stop(); setPlaying(null); } };
    audio.onerror = failed;
    try { await audio.play(); } catch { failed(); }
  };
  return <div>
    {error && <p role="alert" className="mb-3 text-sm text-destructive">{error}</p>}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
      {voices.map(voice => <div key={voice.id} className={`rounded-xl border p-3 ${value === voice.id ? 'border-primary bg-primary/15' : 'border-border'}`}>
        <button type="button" aria-pressed={value === voice.id} onClick={() => onChange(voice.id)} className="w-full text-left">
          <span className="block font-semibold text-foreground">{voice.label}</span>
          <span className="block text-xs text-muted-foreground">{[voice.gender, voice.accent, voice.provider].filter(Boolean).join(' · ')}</span>
        </button>
        <button type="button" disabled={!voice.previewUrl} onClick={() => { if (playing === voice.id) { stop(); setPlaying(null); } else { void play(voice); } }} aria-label={`${playing === voice.id ? 'Stop' : 'Play'} sample for ${voice.label}`} className="mt-2 text-sm text-primary disabled:text-muted-foreground disabled:cursor-not-allowed">
          {!voice.previewUrl ? 'Sample unavailable' : playing === voice.id ? 'Stop' : 'Play'}
        </button>
      </div>)}
    </div>
  </div>;
}
