"""Reproducible original Episode 02 score and Foley; no external samples."""
import argparse,json,pathlib,sys,wave
p=argparse.ArgumentParser();p.add_argument('--tools-root',required=True);p.add_argument('--assets',required=True);a=p.parse_args()
sys.path.insert(0,str(pathlib.Path(a.tools_root)/'python'))
import numpy as np
rate=44100;duration=106.56;n=round(rate*duration);t=np.arange(n,dtype=np.float32)/rate
score=np.zeros((n,2),np.float32);foley=np.zeros_like(score);rng=np.random.default_rng(20261113)
def add(target,sound,start,pan=0):
 i=round(start*rate);sound=sound[:max(0,n-i)]
 if not len(sound):return
 target[i:i+len(sound),0]+=sound*np.sqrt((1-pan)/2);target[i:i+len(sound),1]+=sound*np.sqrt((1+pan)/2)
for k,start in enumerate(np.arange(0,duration,6)):
 length=min(8,duration-start);x=np.arange(round(length*rate),dtype=np.float32)/rate
 chord=([220,261.626,329.628],[174.614,220,293.665],[146.832,174.614,220])[k%3] if start<60 else ([174.614,220,261.626],[130.813,164.814,195.998])[k%2]
 for j,hz in enumerate(chord):
  tone=(np.sin(2*np.pi*hz*x)+.13*np.sin(4*np.pi*hz*x))*.0038
  tone*=np.minimum(1,x/1.2)*np.minimum(1,(x[-1]-x)/1.7)
  add(score,tone,float(start),[-.3,0,.3][j])
for start in [6,15,22,29,36,44,59,64,70,77,86,94,100,104]:
 x=np.arange(round(min(2.5,duration-start)*rate))/rate;hz=659.255 if start>60 else 440
 add(score,(np.sin(2*np.pi*hz*x)+.25*np.sin(2*np.pi*hz*2*x))*np.exp(-x*3)*.0045,start,.15)
# Soft typing during actual workstation shots, original computer notifications,
# a glass/cup contact at Karim's handoff, and restrained scene transitions.
for start in list(np.arange(13.6,20.2,.23))+list(np.arange(28.0,34.7,.29)):
 x=np.arange(900)/rate;add(foley,rng.normal(0,1,len(x))*np.exp(-x*180)*.010,float(start),float(rng.uniform(-.25,.25)))
for start in [27.8,31.0]:
 x=np.arange(7000)/rate;add(foley,np.sin(2*np.pi*740*x)*np.exp(-x*24)*.011,start,-.15)
for start in [67.95,69.4]:
 x=np.arange(11000)/rate;add(foley,(np.sin(2*np.pi*1580*x)+.3*np.sin(2*np.pi*2670*x))*np.exp(-x*25)*.010,start,.2)
for start in [37.6,60.1,76.3]:
 x=np.arange(7000)/rate;add(foley,rng.normal(0,1,len(x))*np.sin(np.pi*np.arange(len(x))/len(x))*.0017,start)
envelope=np.array(json.loads(pathlib.Path('src/voice-envelope.json').read_text()),np.float32)
energy=np.interp(t,np.arange(len(envelope))/30,envelope);duck=.28+.72*(1-np.clip(energy,0,1))
score*=duck[:,None]
room=rng.normal(0,.00011,n).astype(np.float32);foley[:,0]+=room;foley[:,1]+=room*.9
assets=pathlib.Path(a.assets)
for name,track in [('score.wav',score),('foley.wav',foley)]:
 out=assets/name
 if out.exists():raise SystemExit('Existing soundtrack preserved: '+str(out))
 with wave.open(str(out),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((np.clip(track,-1,1)*32767).astype('<i2').tobytes())
 print(name,'peak',round(float(abs(track).max()),5))
