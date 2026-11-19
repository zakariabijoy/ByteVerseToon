"""Original local underscore/effects for the approved 84.16-second recording."""
import argparse,json,pathlib,sys,wave
p=argparse.ArgumentParser();p.add_argument('--tools-root',required=True);p.add_argument('--assets',required=True);a=p.parse_args()
sys.path.insert(0,str(pathlib.Path(a.tools_root)/'python'))
import numpy as np
rate=44100;seconds=84.16;n=round(seconds*rate);clock=np.arange(n)/rate
rng=np.random.default_rng(2026111705);score=np.zeros((n,2));fx=np.zeros((n,2))
def add(track,t,s,pan=0):
 i=round(t*rate);s=s[:max(0,n-i)]
 if len(s):track[i:i+len(s)]+=s[:,None]*[np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)]
def impact(t,amp=.12,hz=95):
 x=np.arange(round(.48*rate))/rate;v=np.sin(2*np.pi*(hz*x+12*.05*(1-np.exp(-x/.05))))*np.exp(-x*11)
 add(fx,t,(v+.12*rng.normal(0,1,len(x))*np.exp(-x*65))*amp*(1-np.exp(-x*400)))
def noise(t,length=.22,amp=.035):
 x=np.arange(round(length*rate))/rate;v=np.convolve(rng.normal(0,1,len(x)),np.ones(7)/7,mode='same')
 add(fx,t,v*np.sin(np.pi*x/length)**2*amp)
def rise(t,length=1):
 x=np.arange(round(length*rate))/rate;v=np.convolve(rng.normal(0,1,len(x)),np.ones(7)/7,mode='same')
 add(fx,t,(v*.5+np.sin(2*np.pi*(130*x+160*x*x/length))*.15)*(x/length)**2*.075)
def bell(t,amp=.055):
 x=np.arange(round(1.5*rate))/rate;v=sum(np.sin(2*np.pi*h*x)*np.exp(-x*(3+i)) for i,h in enumerate([880,1320,1760]))
 add(fx,t,v*amp*(1-np.exp(-x*250)))
# Warm restrained plucks; this is an original synthesis, not a downloaded track.
for k,t in enumerate(np.arange(.35,83,2.8)):
 x=np.arange(round(3.5*rate))/rate
 chord=([146.83,174.61,220] if t<48.4 else [146.83,196,246.94])
 hz=chord[k%3]
 note=(np.sin(2*np.pi*hz*x)+.3*np.sin(2*np.pi*hz*2*x)+.12*np.sin(2*np.pi*hz*3*x))*np.exp(-x*1.6)*.012*(1-np.exp(-x*35))
 add(score,float(t),note,(-1 if k%2 else 1)*.25)
for t in [24.6,26.4,28.2,30,32.7,34.5,36.3,38.1,40.3]:
 x=np.arange(round(.55*rate))/rate;add(score,t,np.sin(2*np.pi*74*x)*np.exp(-x*13)*.018*(1-np.exp(-x*120)))
gain=np.interp(clock,[0,3.6,3.84,6.5,6.7,7.3,7.6,15.8,16,17.5,18,28,28.1,29.7,29.8,32.5,33,40,40.4,42.4,44.4,44.6,46.8,47,48.4,58.6,58.8,60.8,61,62.6,62.8,67,67.2,74,74.2,79.9,80.2,81.2,81.4,84.16],
 [.35,.35,.6,.6,.03,.03,.7,.7,.04,.04,.65,.65,.08,.08,.3,.3,.5,.5,.03,.03,.08,.08,.08,.4,.7,.7,.05,.05,.2,.2,.6,.6,.7,.7,.6,.6,.1,.1,.5,.55])
score*=gain[:,None]
impact(.06,.11,100);impact(1.32,.12,90);impact(14.98,.11,78)
rise(28.8,.9);impact(31.9,.085,105)
for t in [18.0,18.36,18.62,19.0,19.28,19.64,20,20.3,20.6]:impact(t,.018,1300)
noise(4.1,.25,.03);noise(6.55,.17,.025)
impact(34.98,.027,1100);bell(35.6,.04);noise(43.5,.3,.045)
rise(40.35,.8);impact(46.88,.08,110);bell(48.4,.045)
for t in [49.6,50.3,51.0]:impact(t,.025,140)
for t in [52.26,59.1,60.0,74.5]:noise(t,.4,.065)
impact(61.15,.04,120);impact(62.72,.08,115);bell(64.8,.035)
impact(69.48,.11,150);noise(69.48,.13,.04)
impact(79.32,.055,1300);noise(79.34,.15,.025);bell(82.62,.045)
env=np.asarray(json.loads(pathlib.Path('src/voice-envelope.json').read_text()),float)
duck=np.interp(clock,np.arange(len(env))/30,1-.38*np.minimum(env,1))
for name,data in [('drama-score.wav',score),('drama-effects.wav',fx)]:
 data=np.tanh(data*duck[:,None]);dest=pathlib.Path(a.assets)/name
 if dest.exists():raise SystemExit('Preserving existing stem: '+str(dest))
 with wave.open(str(dest),'wb') as w:
  w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((data*32767).astype('<i2').tobytes())
 print(name,'peak',round(float(np.abs(data).max()),4),'rms',round(float(np.sqrt(np.mean(data**2))),5))
