"""Original local suspense cues; preserve approved narration and previous mixes."""
import argparse, json, pathlib, sys, wave
p=argparse.ArgumentParser()
p.add_argument('--tools-root',required=True);p.add_argument('--assets',required=True)
a=p.parse_args();sys.path.insert(0,str(pathlib.Path(a.tools_root)/'python'))
import numpy as np
assets=pathlib.Path(a.assets);rate=44100;n=round(69.04*rate)
rng=np.random.default_rng(420416);fx=np.zeros((n,2));bed=np.zeros((n,2))
def read(name):
 with wave.open(str(assets/name),'rb') as w:
  channels=w.getnchannels();sr=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),'<i2').reshape(-1,channels)/32768.
 if channels==1:x=np.repeat(x,2,axis=1)
 return np.stack([np.interp(np.arange(n)/rate,np.arange(len(x))/sr,x[:,i]) for i in range(2)],axis=1)
def add(track,t,sound,pan=0):
 i=round(t*rate);sound=sound[:max(0,n-i)]
 if len(sound):track[i:i+len(sound)]+=sound[:,None]*np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)])
def hit(t,amp=.14,hz=85,length=.55):
 x=np.arange(round(length*rate))/rate
 phase=2*np.pi*(hz*x+15*.055*(1-np.exp(-x/.055)))
 add(fx,t,(np.sin(phase)*np.exp(-x*9)+rng.normal(0,1,len(x))*.13*np.exp(-x*60))*amp*(1-np.exp(-x*400)))
def riser(start,length,amp=.06):
 x=np.arange(round(length*rate))/rate;noise=np.convolve(rng.normal(0,1,len(x)),np.ones(5)/5,mode='same')
 add(fx,start,(noise*.55+np.sin(2*np.pi*(160*x+180*x*x/length))*.2)*(x/length)**2*amp)
def chime(t,amp=.065):
 x=np.arange(round(1.1*rate))/rate
 add(fx,t,sum(np.sin(2*np.pi*h*x)*np.exp(-x*(3+i*2)) for i,h in enumerate([880,1320,1760]))*amp*(1-np.exp(-x*250)))
clock=np.arange(n)/rate
bed=read('score.wav')*.48
# Make the music drop audible around the cup reply, question, and identity reveal.
gain=np.interp(clock,[0,3.3,3.7,8.55,8.8,11.1,11.5,18.6,19,23.5,23.75,26.9,27.2,29.0,29.2,31.3,31.55,33.8,34.1,35.7,36.0,42.9,43.1,45,45.3,54.4,55.7,58.0,59.7,61.3,63.3,63.6,69.04],
 [ .3,.3,.7,.7,.04,.04,.6,.6,.24,.24,.12,.12,.4,.4,.04,.04,.3,.3,.02,.02,.72,.72,.03,.03,.5,.5,.18,.18,.6,.6,.12,.7,.7])
bed*=gain[:,None]
# Quiet irregular low pulses support the evidence sequence without obscuring speech.
for t in [12.0,14.2,16.4,19.15,20.8,22.5,24.2,25.9]:
 x=np.arange(round(.5*rate))/rate
 add(bed,t,np.sin(2*np.pi*76*x)*np.exp(-x*12)*.018*(1-np.exp(-x*150)))
fx+=read('foley-motion-v3.wav')*3.0
hit(.04,.10,95);hit(1.06,.12,115);hit(2.10,.14,75)
riser(18.45,.58,.09);hit(19.60,.14,105);hit(20.05,.08,145)
riser(22.5,1.23,.045);chime(27.22,.045)
riser(32.5,1.56,.07);hit(34.25,.15,95);chime(34.34,.065)
hit(43.30,.12,72);hit(52.74,.065,120);chime(58.23,.045);chime(67.21,.06)
# Speech-aware ducking, then a soft bounded bus; narration is mixed separately at unity.
env=np.asarray(json.loads(pathlib.Path('src/voice-envelope.json').read_text()),float)
duck=np.interp(clock,np.arange(len(env))/30,1-.40*np.minimum(env,1))
fx*=duck[:,None];bed*=duck[:,None]
for name,data in [('drama-score-v4.wav',bed),('drama-effects-v4.wav',fx)]:
 dest=assets/name
 if dest.exists():raise SystemExit('Preserving existing asset: '+str(dest))
 data=np.tanh(data)
 with wave.open(str(dest),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((data*32767).astype('<i2').tobytes())
 print(name,'peak',round(float(np.abs(data).max()),4),'rms',round(float(np.sqrt(np.mean(data**2))),5))
