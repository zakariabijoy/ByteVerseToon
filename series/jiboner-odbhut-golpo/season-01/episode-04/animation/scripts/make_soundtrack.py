"""Original deterministic Episode 04 music/Foley; no external samples."""
import argparse,json,pathlib,sys,wave
p=argparse.ArgumentParser();p.add_argument('--tools-root',required=True);p.add_argument('--assets',required=True);a=p.parse_args()
sys.path.insert(0,str(pathlib.Path(a.tools_root)/'python'))
import numpy as np
assets=pathlib.Path(a.assets);rate=44100;duration=69.04;n=round(rate*duration)
score=np.zeros((n,2),np.float32);foley=np.zeros_like(score);rng=np.random.default_rng(20261115)
def add(target,sound,start,pan=0):
 i=round(start*rate);sound=sound[:max(0,n-i)]
 if len(sound):
  target[i:i+len(sound),0]+=sound*np.sqrt((1-pan)/2)
  target[i:i+len(sound),1]+=sound*np.sqrt((1+pan)/2)
for k,start in enumerate(np.arange(0,duration,5.8)):
 length=min(7,duration-start);x=np.arange(round(length*rate),dtype=np.float32)/rate
 chord=([146.832,174.614,220] if 0<start<35 else [174.614,220,261.626] if k%2 else [130.813,164.814,195.998])
 for j,hz in enumerate(chord):
  tone=(np.sin(2*np.pi*hz*x)+.1*np.sin(4*np.pi*hz*x))*.0038
  tone*=np.minimum(1,x/1.3)*np.minimum(1,(x[-1]-x)/1.8)
  add(score,tone,float(start),[-.35,0,.35][j])
for start,hz in [(3.5,440),(11.7,523.251),(19.1,329.628),(27.3,659.255),(34.3,523.251),(38.9,659.255),(46.1,523.251),(58.3,659.255),(63.7,783.991)]:
 x=np.arange(round(2*rate))/rate
 add(score,(np.sin(2*np.pi*hz*x)+.24*np.sin(2*np.pi*hz*2.003*x))*.004*np.exp(-3*x)*(1-np.exp(-90*x)),start,.18)
def cup(start):
 x=np.arange(round(.32*rate))/rate
 add(foley,(np.sin(2*np.pi*2600*x)+.4*np.sin(2*np.pi*3617*x))*.022*np.exp(-24*x),start,.2)
for start in [8.20]:cup(start)
for start in [20.6,23.9,57.1]:
 x=np.arange(round(.42*rate))/rate;noise=rng.normal(0,1,len(x)).astype(np.float32)
 noise=np.convolve(noise,np.ones(6)/6,mode='same')
 add(foley,noise*.013*np.sin(np.pi*x/.42)**2,start,-.2)
for start in [11.2,31.6,45.0,63.6]:
 x=np.arange(round(.35*rate))/rate;noise=rng.normal(0,1,len(x)).astype(np.float32)
 add(foley,np.convolve(noise,np.ones(35)/35,mode='same')*.009*np.sin(np.pi*x/.35)**2,start)
env=np.asarray(json.loads(pathlib.Path('src/voice-envelope.json').read_text()),np.float32)
duck=np.interp(np.arange(n)/rate,np.arange(len(env))/30,1-.55*np.minimum(env,1))
score*=duck[:,None]
fade=np.minimum(1,np.arange(n)/rate/.5)*np.minimum(1,(n-1-np.arange(n))/rate/1.1)
score*=fade[:,None];foley*=fade[:,None]
for name,data in [('score.wav',score),('foley.wav',foley)]:
 out=assets/name
 if out.exists():raise SystemExit('Existing audio preserved: '+str(out))
 with wave.open(str(out),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((np.clip(data,-1,1)*32767).astype('<i2').tobytes())
 print(name,'seconds',duration,'peak',float(np.max(np.abs(data))))
