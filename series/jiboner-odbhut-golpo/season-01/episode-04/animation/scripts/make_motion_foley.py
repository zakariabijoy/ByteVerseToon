"""Original local Foley for Episode 04 movement revision. Source narration untouched."""
import argparse,json,pathlib,sys,wave
p=argparse.ArgumentParser();p.add_argument('--tools-root',required=True);p.add_argument('--assets',required=True);a=p.parse_args()
sys.path.insert(0,str(pathlib.Path(a.tools_root)/'python'))
import numpy as np
rate=44100;seconds=69.04;n=round(rate*seconds);mix=np.zeros((n,2),np.float32);rng=np.random.default_rng(20261116)
def add(sound,t,pan=0):
 i=round(t*rate);sound=sound[:max(0,n-i)]
 if len(sound):mix[i:i+len(sound),0]+=sound*np.sqrt((1-pan)/2);mix[i:i+len(sound),1]+=sound*np.sqrt((1+pan)/2)
def hit(t,hz=150,amp=.035,length=.22):
 x=np.arange(round(length*rate))/rate;add((np.sin(2*np.pi*hz*x)+.25*np.sin(2*np.pi*hz*1.57*x))*np.exp(-x*28)*amp*(1-np.exp(-x*120)),t)
def rustle(t,length=.35,amp=.025):
 x=np.arange(round(length*rate))/rate;noise=rng.normal(0,1,len(x));add(np.convolve(noise,np.ones(8)/8,mode='same')*np.sin(np.pi*x/length)**2*amp,t,-.12)
def swish(t):
 x=np.arange(round(.22*rate))/rate;noise=np.convolve(rng.normal(0,1,len(x)),np.ones(35)/35,mode='same');add(noise*np.sin(np.pi*x/.22)**2*.017,t)
hit(.12,110,.017,.5)
for t in [1.60,6.5,8.84,14.3,16.4,17.83,24.33,29.27,34.23,38.8,43.2,45,50.8,58.13,61.23,66.33]:swish(t)
x=np.arange(round(.36*rate))/rate;add((np.sin(2*np.pi*2410*x)+.35*np.sin(2*np.pi*3607*x))*np.exp(-x*22)*.034,7.34,.15)
for t in [19.6,20.05,20.32]:rustle(t);hit(t+.09,120,.035)
for t in [22.75,23.40,25.70,27.08]:rustle(t,.45,.019)
for t in [36.65,64.30]:
 x=np.arange(round(.8*rate))/rate;noise=np.convolve(rng.normal(0,1,len(x)),np.ones(30)/30,mode='same');add((noise*.035+np.sin(2*np.pi*(118*x+16*x*x))*.006)*np.sin(np.pi*x/.8)**2,t,.15);hit(t+.76,145,.023)
for i,t in enumerate([57.00,57.14,57.28]):hit(t,1900+i*340,.018,.16)
assets=pathlib.Path(a.assets);env=np.asarray(json.loads(pathlib.Path('src/voice-envelope.json').read_text()),np.float32);duck=np.interp(np.arange(n)/rate,np.arange(len(env))/30,1-.4*np.minimum(env,1));mix*=duck[:,None]
out=assets/'foley-motion-v3.wav'
if out.exists():raise SystemExit('Existing Foley preserved: '+str(out))
with wave.open(str(out),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
print('Original action Foley saved',seconds,'seconds; peak',float(np.abs(mix).max()))
