import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import VoicePicker from './VoicePicker';
const voices = [{id:'a',label:'Actor A',gender:'female',accent:'',provider:'',previewUrl:'https://audio.example/a.mp3'},{id:'b',label:'Actor B',gender:'male',accent:'',provider:'',previewUrl:'https://audio.example/b.mp3'}];
const audio: Array<{src:string;play:ReturnType<typeof vi.fn>;pause:ReturnType<typeof vi.fn>;onended:(()=>void)|null;onerror:(()=>void)|null}> = [];
beforeEach(()=>{audio.length=0;vi.stubGlobal('Audio',class {src:string;play=vi.fn().mockResolvedValue(undefined);pause=vi.fn();onended=null;onerror=null;constructor(src:string){this.src=src;audio.push(this);}})});
afterEach(()=>{cleanup();vi.unstubAllGlobals()});
it('plays the selected actor audio and stops previous playback',async()=>{
 const change=vi.fn();const {rerender,unmount}=render(<VoicePicker voices={voices} value="a" onChange={change}/>);
 fireEvent.click(screen.getByRole('button',{name:'Play sample for Actor A'}));
 await waitFor(()=>expect(audio[0].play).toHaveBeenCalled());expect(audio[0].src).toBe(voices[0].previewUrl);
 fireEvent.click(screen.getByRole('button',{name:'Play sample for Actor B'}));
 await waitFor(()=>expect(audio[1].play).toHaveBeenCalled());expect(audio[0].pause).toHaveBeenCalled();expect(audio[1].src).toBe(voices[1].previewUrl);
 rerender(<VoicePicker voices={voices} value="b" onChange={change}/>);expect(audio[1].pause).toHaveBeenCalled();
 fireEvent.click(screen.getByRole('button',{name:'Play sample for Actor B'}));unmount();expect(audio[2].pause).toHaveBeenCalled();
});
it('reports failed audio instead of silently falling back',async()=>{
 render(<VoicePicker voices={voices} value="a" onChange={()=>{}}/>);
 fireEvent.click(screen.getByRole('button',{name:'Play sample for Actor A'}));
 act(()=>audio[0].onerror?.());await waitFor(()=>expect(screen.getByRole('alert')).toHaveTextContent('Could not play'));
});
