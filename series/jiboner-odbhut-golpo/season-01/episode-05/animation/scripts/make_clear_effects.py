"""Original bright action cues for mobile review; no speech replacement."""
import argparse,pathlib,sys,wave
p=argparse.ArgumentParser();p.add_argument('--tools-root',required=True);p.add_argument('--assets',required=True);a=p.parse_args()
sys.path.insert(0,str(pathlib.Path(a.tools_root)/'python'))
import numpy as np
rate=48000;n=round(84.16*rate);mix=np.zeros((n,2));rng=np.random.default_rng(202611170502)
def add(t,s,pan=0):
 i=round(t*rate);s=s[:max(0,n-i)]
 if len(s):mix[i:i+len(s)]+=s[:,None]*[np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)]
def knock(t,amp=.20,hz=620):
 x=np.arange(round(.18*rate))/rate;v=rng.normal(0,1,len(x))
 v=v-np.convolve(v,np.ones(19)/19,mode='same')
 s=(.38*v*np.exp(-x*95)+np.sin(2*np.pi*hz*x)*np.exp(-x*30)+.30*np.sin(2*np.pi*hz*1.63*x)*np.exp(-x*45))*amp
 add(t,s*(1-np.exp(-x*1400)))
def hit(t,amp=.20):
 x=np.arange(round(.5*rate))/rate
 s=(np.sin(2*np.pi*(95*x+2*(1-np.exp(-x*16))))*np.exp(-x*12)+.65*np.sin(2*np.pi*410*x)*np.exp(-x*22)+rng.normal(0,1,len(x))*.10*np.exp(-x*55))*amp
 add(t,s*(1-np.exp(-x*900)))
def whoosh(t,length=.33,amp=.18):
 x=np.arange(round(length*rate))/rate;v=rng.normal(0,1,len(x));v=np.convolve(v,np.ones(3)/3,mode='same')
 add(t,v*np.sin(np.pi*x/length)**2*amp,.10)
def paper(t,amp=.22):
 x=np.arange(round(.40*rate))/rate;v=rng.normal(0,1,len(x));v=np.convolve(v,np.ones(4)/4,mode='same')
 add(t,v*(np.sin(np.pi*x/.4)**2)*(.65+.35*np.sin(2*np.pi*31*x))*amp,-.12)
def ding(t,amp=.15):
 x=np.arange(round(.85*rate))/rate
 add(t,(np.sin(2*np.pi*1175*x)+.42*np.sin(2*np.pi*1762*x)+.20*np.sin(2*np.pi*2350*x))*np.exp(-x*7)*amp*(1-np.exp(-x*700)))
hit(.04,.23);knock(1.42,.16,760)
whoosh(3.84,.32,.13);knock(6.60,.15,490)
hit(15.0,.19)
for t in [18.2,18.48,18.80,19.12,19.41,19.70,20.02,20.32,20.66]:knock(t,.055,1400)
whoosh(29.4,.36,.11);hit(31.92,.16)
knock(34.64,.18,1700);ding(35.12,.17);ding(35.27,.095)
whoosh(40.85,.25,.10);paper(43.50,.20)
hit(47.68,.16)
for t in [49.7,50.4,51.1]:knock(t,.075,350)
paper(52.26,.24);paper(59.08,.28);paper(60.02,.22)
knock(61.15,.09,420);hit(63.84,.15)
knock(69.48,.25,430);paper(69.49,.13)
paper(74.5,.25);knock(79.33,.23,2200);whoosh(81.98,.20,.08);ding(83.26,.10)
mix*=.94/max(.94,float(np.abs(mix).max()))
dest=pathlib.Path(a.assets)/'clear-effects-v2.wav'
if dest.exists():raise SystemExit('Existing effects preserved.')
with wave.open(str(dest),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((mix*32767).astype('<i2').tobytes())
print('Clear effects peak',round(float(np.abs(mix).max()),4),'rms',round(float(np.sqrt(np.mean(mix**2))),5))
