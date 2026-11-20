"""Original family-story score and contact foley. No generated/replaced narration."""
import json,sys,wave,os
from pathlib import Path
BASE=Path(__file__).resolve().parents[1]
WORKSPACE=Path(os.environ.get('BVT_WORKSPACE',str(BASE.parents[5])))
sys.path.insert(0,str(WORKSPACE/'production/tools/story-audio/python'))
import numpy as np
BASE=Path(__file__).resolve().parents[1]; assets=BASE/'public';rate=48000;duration=3166/30;n=round(duration*rate)
clock=np.arange(n)/rate;bed=np.zeros((n,2));fx=np.zeros((n,2));rng=np.random.default_rng(6112026);ledger=[]
def add(track,at,v,pan=0):
 i=round(at*rate)
 if i<0:v=v[-i:];i=0
 v=v[:max(0,n-i)]
 if len(v):track[i:i+len(v)]+=v[:,None]*np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)])
def note(at,hz,amp=.05,length=2.5,soft=False):
 x=np.arange(round(length*rate))/rate
 tone=sum(np.sin(2*np.pi*hz*k*x)*(.7/k**2.5) for k in range(1,6))
 envelope=(1-np.exp(-x/(.08 if soft else .008)))*np.exp(-x*(1.8 if not soft else .7))
 add(bed,at,tone*envelope*amp,(-.23 if int(at)%2 else .23))
def impact(at,amp=.13):
 x=np.arange(round(.65*rate))/rate
 v=np.sin(2*np.pi*(52*x+2*(1-np.exp(-x*18))))*np.exp(-x*9)*(1-np.exp(-x*600))
 add(fx,at,v*amp);ledger.append(dict(at=at,type='restrained_low_impact'))
def contact(at,kind='steel',amp=.10):
 length=.65 if kind=='steel' else .18;x=np.arange(round(length*rate))/rate
 if kind=='steel':v=sum(np.sin(2*np.pi*hz*x)*np.exp(-x*(6+k*5)) for k,hz in enumerate([1620,2437,3762]))/2
 else:v=(rng.normal(size=len(x))*.6+np.sin(2*np.pi*900*x)*.4)*np.exp(-x*65)
 add(fx,at,v*(1-np.exp(-x*900))*amp,.12);ledger.append(dict(at=at,type=kind+'_contact'))
def cloth(at):
 x=np.arange(round(.7*rate))/rate;z=rng.normal(size=len(x));z=np.convolve(z,np.ones(11)/11,mode='same')
 add(fx,at,z*np.sin(np.pi*x/.7)**2*.12,-.15);ledger.append(dict(at=at,type='cloth_bag_unfold'))
def notification(at,quiet=False):
 x=np.arange(round(.6*rate))/rate
 for d,hz in [(0,660),(.13,880)]:
  v=np.sin(2*np.pi*hz*x)*np.exp(-x*10)*(1-np.exp(-x*700))*(.035 if quiet else .075);add(fx,at+d,v)
 ledger.append(dict(at=at,type='meeting_notification' if not quiet else 'call_connection'))
def rise(at,length=.85):
 x=np.arange(round(length*rate))/rate;v=np.convolve(rng.normal(size=len(x)),np.ones(17)/17,mode='same')
 add(fx,at,v*(x/length)**2*.10);ledger.append(dict(at=at,type='short_anticipation',duration=length))
# Sparse unresolved plucks; no constant horror pulse under the family story.
for k,at in enumerate(np.arange(5,38.4,2.4)):
 note(float(at),[220,261.63,246.94,196][k%4],.055,2.7)
 if k%3==0:note(float(at),110,.045,4.5,True)
for at in np.arange(38.4,57.2,2.6):
 note(float(at),146.83,.045,4,True);note(float(at)+.35,293.66,.065,2.8)
for k,at in enumerate(np.arange(58,65.8,2.5)):note(float(at),[196,220,174.61][k%3],.045,3.4,True)
# The mother's reveal is almost unscored; an open warm chord arrives afterward.
for k,at in enumerate(np.arange(71.4,duration,1.8)):
 note(float(at),[196,246.94,293.66,392][k%4],.065,2.8)
 if k%2==0:note(float(at),130.81,.045,4,True)
gain=np.ones(n)
for a,b in [(0,4.5),(26.6,30.26),(38.4,42.8),(56.1,57.2),(65.8,71.4),(90.3,91.5),(98.4,100.36)]:gain[(clock>=a)&(clock<b)]=.12
gain*=np.minimum(1,np.maximum(0,(duration-clock)/1.1));bed*=gain[:,None]
impact(.12,.12);contact(8.5,'screen',.045);contact(15.8,'screen',.06);notification(17.9,True)
cloth(31);rise(37.6,.8);cloth(38.45);contact(39.35,'steel',.12);contact(41.2,'steel',.085)
impact(42.55,.08);contact(57.25,'screen',.065);notification(58.65,True)
notification(71.5);contact(75.4,'keyboard',.035);contact(78.3,'keyboard',.025)
cloth(88.1);contact(89.2,'steel',.10);contact(97.8,'bottle',.055);contact(100.9,'screen',.055);contact(103.6,'steel',.075)
# Light street texture only at the bus-stop ending; speech remains foreground.
street=rng.normal(size=n);street=np.convolve(street,np.ones(23)/23,mode='same')*.008
street[(clock<85.68)]=0;fx+=street[:,None]
env=np.asarray(json.loads((BASE/'src/voice-envelope.json').read_text()),float)
duck=np.interp(clock,np.arange(len(env))/30,1-.43*np.minimum(env,1))
for name,arr in [('score.wav',bed),('effects.wav',fx)]:
 arr=np.tanh(arr*duck[:,None])
 with wave.open(str(assets/name),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((arr*32767).astype('<i2').tobytes())
 print(name,'peak',round(float(abs(arr).max()),3))
(BASE.parent/'sound-cues.json').write_text(json.dumps(dict(origin='original_local_synthesis',cues=ledger,fullListeningReview='pending',voiceEdits='none'),indent=2),encoding='utf-8')
