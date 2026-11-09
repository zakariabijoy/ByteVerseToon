// Standard-library-only replacement for the legacy Python/numpy helper.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const directory=path.join(root,'public','audio');
const input=fs.readFileSync(path.join(directory,'E01-Ananya-original.wav'));
if(input.toString('ascii',0,4)!=='RIFF'||input.toString('ascii',8,12)!=='WAVE')throw Error('Expected a RIFF WAV recording.');
let format,data;
for(let offset=12;offset+8<=input.length;){
  const id=input.toString('ascii',offset,offset+4),size=input.readUInt32LE(offset+4);
  if(offset+8+size>input.length)throw Error('Truncated WAV chunk.');
  if(id==='fmt ')format=input.subarray(offset+8,offset+8+size);
  if(id==='data')data=input.subarray(offset+8,offset+8+size);
  offset+=8+size+(size%2);
}
if(!format||!data||format.readUInt16LE(0)!==1||format.readUInt16LE(14)!==16)throw Error('Expected PCM 16-bit WAV.');
const rate=format.readUInt32LE(4),block=format.readUInt16LE(12),duration=data.length/(rate*block);
if(Math.abs(duration-46.4)>.1)throw Error('Different narration: measure it and revise the episode cuts first.');
function wav(pcm,fmt){
  const header=Buffer.alloc(12),a=Buffer.alloc(8),b=Buffer.alloc(8);
  header.write('RIFF');header.writeUInt32LE(4+8+fmt.length+8+pcm.length,4);header.write('WAVE',8);
  a.write('fmt ');a.writeUInt32LE(fmt.length,4);b.write('data');b.writeUInt32LE(pcm.length,4);
  return Buffer.concat([header,a,fmt,b,pcm]);
}
const boundaries=[0,4.9,11.56,17.66,26.06,31.6,37.81,41.99,duration],slots=[6,8,8,10,8,8,7,5];
let timeline=0;const clips=[];
for(let i=0;i<8;i++){
  const a=Math.round(boundaries[i]*rate)*block,b=Math.round(boundaries[i+1]*rate)*block,file=`E01-${String(i+1).padStart(2,'0')}.wav`;
  fs.writeFileSync(path.join(directory,file),wav(data.subarray(a,b),format));
  clips.push({file,source_start:boundaries[i],source_end:boundaries[i+1],timeline_start:timeline,slot_seconds:slots[i],audio_seconds:(b-a)/(rate*block),playback_rate:1,alignment:'draft-pause-based'});
  timeline+=slots[i];
}
const rainRate=22050,pcm=Buffer.alloc(42*rainRate*2);let seed=17,previous=0;
for(let i=0;i<pcm.length/2;i++){
  seed=(Math.imul(seed,1664525)+1013904223)>>>0;
  const sample=(seed/4294967296*2-1)*.028;
  const value=(sample+previous*.6)*Math.min(i/rainRate,1,(pcm.length/2-i)/rainRate);
  pcm.writeInt16LE(Math.round(Math.max(-1,Math.min(1,value))*32767),i*2);previous=sample;
}
const rainFmt=Buffer.alloc(16);rainFmt.writeUInt16LE(1,0);rainFmt.writeUInt16LE(1,2);rainFmt.writeUInt32LE(rainRate,4);rainFmt.writeUInt32LE(rainRate*2,8);rainFmt.writeUInt16LE(2,12);rainFmt.writeUInt16LE(16,14);
fs.writeFileSync(path.join(directory,'rain-bed.wav'),wav(pcm,rainFmt));
fs.writeFileSync(path.join(root,'production','audio-edit.json'),JSON.stringify({original_seconds:duration,timeline_seconds:timeline,speech_speed_changed:false,clips,review_note:'Draft cuts in detected silences. Listening alignment review pending.'},null,2)+'\n');
console.log(`Prepared 8 narration clips: ${duration.toFixed(2)}s source, ${timeline}s edit, unchanged speech speed.`);
