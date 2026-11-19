"""Original locally synthesized story score and foley, authored to this voice.

No third-party soundtrack or generated speech. Each cue has a story function.
"""
import json,sys,wave
from pathlib import Path
sys.path.insert(0,str(Path(sys.argv[1])/'python'))
import numpy as np
assets=Path(sys.argv[2]);rate=48000
config=json.loads(Path('src/episode-config.json').read_text())
duration=config['frames']/30;n=round(duration*rate);clock=np.arange(n)/rate
timeline=json.loads(Path('src/story-timeline.json').read_text())
segments=json.loads(Path('src/dialogue-timing.json').read_text(encoding='utf-8'))['segments']
def line(k):return next(s for s in segments if s['id']==str(k))
def when(k):return line(k)['start']
def word(k,text):return next(w['start'] for w in line(k)['words'] if w['text']==text)
rng=np.random.default_rng(5111826);bed=np.zeros((n,2));fx=np.zeros((n,2));ledger=[]
def add(track,start,sound,pan=0):
 i=round(start*rate)
 if i<0:sound=sound[-i:];i=0
 sound=sound[:max(0,n-i)]
 if len(sound):track[i:i+len(sound)]+=sound[:,None]*np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)])
def env(t,attack=.025,decay=2):return (1-np.exp(-t/attack))*np.exp(-t*decay)
def note(t,hz,amp=.04,length=2.5,warm=False):
 x=np.arange(round(length*rate))/rate
 v=sum(np.sin(2*np.pi*hz*k*x+(.003*k*np.sin(2*np.pi*4.5*x)))*(.52/k**1.65) for k in range(1,7))
 add(bed,t,v*env(x,.018 if warm else .12,1.5 if warm else .65)*amp,(-.28 if int(t*2)%2 else .28))
def impact(t,amp=.22):
 x=np.arange(round(.9*rate))/rate;v=np.sin(2*np.pi*(53*x+3*(1-np.exp(-x*20))))*np.exp(-x*7)
 air=np.convolve(rng.normal(size=len(x)),np.ones(7)/7,mode='same')*np.exp(-x*35)
 add(fx,t,(v+.7*air)*amp*(1-np.exp(-x*600)));ledger.append({'at':t,'type':'low_impact','purpose':'evidence or consequence'})
def paper(t):
 x=np.arange(round(.43*rate))/rate
 z=rng.normal(size=len(x));v=z-np.convolve(z,np.ones(17)/17,mode='same')
 add(fx,t,v*(np.sin(np.pi*x/.43)**2)*(.25+.75*np.sin(2*np.pi*21*x)**2)*.065,-.16);ledger.append({'at':t,'type':'paper_turn'})
def click(t,amp=.06):
 x=np.arange(round(.08*rate))/rate
 v=(rng.normal(size=len(x))*.7+np.sin(2*np.pi*1150*x)*.4)*np.exp(-x*95)
 add(fx,t,v*amp)
def bell(t):
 x=np.arange(round(.8*rate))/rate
 v=sum(np.sin(2*np.pi*hz*x)*np.exp(-x*(4+k*1.6)) for k,hz in enumerate([880,1320,1760]))*.06
 add(fx,t,v*(1-np.exp(-x*500)),.18);ledger.append({'at':t,'type':'notification'})
def rise(t,length=1.0):
 x=np.arange(round(length*rate))/rate
 air=np.convolve(rng.normal(size=len(x)),np.ones(11)/11,mode='same')
 v=(air*.6+.2*np.sin(2*np.pi*(110*x+130*x*x/length)))*(x/length)**2*.15
 add(fx,t,v);ledger.append({'at':t,'length':length,'type':'anticipation_riser'})
def tick(t):
 x=np.arange(round(.15*rate))/rate
 add(bed,t,(rng.normal(size=len(x))*.2+np.sin(2*np.pi*730*x))*.022*np.exp(-x*55))
# A moving low string texture under the investigation, resolving only after cost.
for k,t in enumerate(np.arange(0,when(35),3.8)):
 for hz in [73.416,110,155.563 if t<when(29) else 146.832]:note(float(t),hz,.055,4.7)
 if t>when(10):note(float(t)+.8,[293.66,311.12,220,207.65][k%4],.055,1.7)
for t in np.arange(when(11),when(29),1.45):tick(float(t))
for t in np.arange(when(29),when(35),1.0):
 x=np.arange(round(.6*rate))/rate;add(bed,float(t),np.sin(2*np.pi*68*x)*env(x,.005,12)*.06)
# Major third and softer plucks make the closing warmth distinct from suspense.
for k,t in enumerate(np.arange(when(36),duration,1.8)):
 note(float(t),[196,246.94,293.66,392][k%4],.075,2.3,True)
 if k%2==0:note(float(t),146.83,.045,3.5,True)
# Audible drops make the revelations land without constantly adding loudness.
gain=np.ones(n)*.85
for a,b in [(0,1.8),(word(3,'আমার'),line(3)['end']+.15),(word(11,'দুবার')-.12,line(11)['end']+.2),(word(20,'আমি')-.18,line(20)['end']+.24),(when(29)-.2,when(29)+1.9),(when(35)-.2,when(35)+1.25)]:
 gain[(clock>=a)&(clock<b)]=.09
gain*=np.minimum(1,np.maximum(0,(duration-clock)/1.3));bed*=gain[:,None]
impact(.04,.15);paper(when(0)+1.62);paper(when(6)+.05)
paper(when(7));impact(word(7,'রাফি'),.16)
click(when(10)+.2);click(when(11)+.35);impact(word(11,'দুবার'),.24)
rise(word(11,'দুবার')-.65,.65)
click(when(13)+.15);click(when(14)+.10)
bell(when(15)+.25);impact(word(16,'আগে'),.12)
rise(when(20)+.45,1.2);impact(word(20,'আমি'),.20)
paper(when(23)+.12)
for j in range(3):
 t=when(24)+j*.55;x=np.arange(round(.28*rate))/rate
 add(fx,t,(np.sin(2*np.pi*440*x)+np.sin(2*np.pi*480*x))*.045*np.sin(np.pi*x/.28)**2)
rise(when(29)-1,1);impact(when(29),.22)
for t in np.arange(when(29)+.2,line(29)['end'],.24):click(float(t),.025)
click(when(30)+.25,.07);bell(when(35)+.06);impact(when(35)+.45,.24)
paper(when(38)+.12)
click(word(39,'বিস্কুট'),.04)
x=np.arange(round(.45*rate))/rate
cup=sum(np.sin(2*np.pi*hz*x)*np.exp(-x*(10+k*4)) for k,hz in enumerate([1850,3120,4310]))*.045
add(fx,when(40)+.83,cup*(1-np.exp(-x*1000)));ledger.append({'at':when(40)+.83,'type':'ceramic_cup_contact'})
# Speech-aware ducking retains the narrator's original timing and expression.
voice=np.asarray(json.loads(Path('src/voice-envelope.json').read_text()),float)
duck=np.interp(clock,np.arange(len(voice))/30,1-.38*np.minimum(voice,1))
for name,data in [('story-score-v4.wav',bed),('story-effects-v4.wav',fx)]:
 p=assets/name
 if p.exists():raise SystemExit('Preserving previous stem: '+str(p))
 data=np.tanh(data*duck[:,None])
 with wave.open(str(p),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((data*32767).astype('<i2').tobytes())
 print(name,'peak',round(float(abs(data).max()),3),'RMS',round(float(np.sqrt(np.mean(data*data))),4))
Path('sound-cues-v4.json').write_text(json.dumps({'origin':'original_local_synthesis','narration':'user_recording_only','cues':ledger},indent=2),encoding='utf-8')
