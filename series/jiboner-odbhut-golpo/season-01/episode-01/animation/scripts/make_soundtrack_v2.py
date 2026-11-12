"""Original stereo score, room tone and synchronized foley. No external samples."""
import argparse
import json
import pathlib
import sys
import wave
parser=argparse.ArgumentParser()
parser.add_argument('--tools-root',required=True)
parser.add_argument('--assets',required=True)
args=parser.parse_args()
sys.path.insert(0,str(pathlib.Path(args.tools_root)/'python'))
import numpy as np

rate,duration=44100,92.96
count=round(rate*duration)
t=np.arange(count,dtype=np.float32)/rate
score=np.zeros((count,2),dtype=np.float32)
foley=np.zeros_like(score)
rng=np.random.default_rng(142)

def add_stereo(target,sound,start,pan=0):
    a=round(start*rate)
    if a>=count:return
    sound=sound[:count-a]
    target[a:a+len(sound),0]+=sound*np.sqrt((1-pan)/2)
    target[a:a+len(sound),1]+=sound*np.sqrt((1+pan)/2)

chords=[(220,261.626,329.628),(174.614,220,293.665),
        (146.832,174.614,220),(164.814,195.998,246.942),
        (174.614,220,261.626),(130.813,164.814,195.998)]
for start in np.arange(0,duration,6):
    index=int(start/6)
    chord=chords[index%len(chords)]
    if start>61:chord=chords[4+index%2]
    local=np.arange(round(min(8,duration-start)*rate),dtype=np.float32)/rate
    for k,hz in enumerate(chord):
        tone=(np.sin(2*np.pi*hz*local)+.18*np.sin(4*np.pi*hz*local))
        tone*=np.minimum(1,local/1.1)*np.minimum(1,(local[-1]-local)/1.6)
        tone*=.0038
        add_stereo(score,tone,float(start),pan=(-.3,0,.3)[k])
    # Sparse damped piano-like upper note, with a gentle felt transient.
    hz=chord[(index+1)%3]*2
    note=(np.sin(2*np.pi*hz*local)+.24*np.sin(4*np.pi*hz*local))*np.exp(-local*1.9)
    note*=np.minimum(1,local/.018)*.014
    add_stereo(score,note,float(start)+.18,pan=.25 if index%2 else -.25)

envelope=json.loads(pathlib.Path('src/voice-envelope.json').read_text())
voice=np.interp(t,np.arange(len(envelope))/30,np.array(envelope))
duck=.86-.30*np.minimum(1,voice*2)
fade=np.minimum(1,t/1.5)*np.minimum(1,(duration-t)/2.4)
score*= (duck*fade)[:,None]

# The two hand loops meet the keyboard at these exact downstroke frames.
for phase,step,pan in [(5.324,10.649,-.22),(1.872,10.300,.22)]:
    for frame in np.arange(phase,85,step):
        local=np.arange(round(.075*rate),dtype=np.float32)/rate
        tap=rng.normal(0,1,len(local)).astype(np.float32)
        tap=(tap+.35*np.sin(2*np.pi*1450*local))*np.exp(-local*70)
        tap*=.012
        add_stereo(foley,tap,356/30+float(frame)/30,pan)

# Low, nonverbal office air; fades away as the rooftop ending begins.
noise=rng.normal(0,1,count).astype(np.float32)
air=np.convolve(noise,np.ones(160,dtype=np.float32)/160,mode='same')*.006
air*=np.minimum(1,t/2)*np.maximum(0,np.minimum(1,(81-t)/3))
foley[:,0]+=air
foley[:,1]+=np.roll(air,37)*.9

for start in [30.6,55.86,80.87]:
    local=np.arange(round(.32*rate),dtype=np.float32)/rate
    whoosh=rng.normal(0,1,len(local)).astype(np.float32)
    whoosh=np.convolve(whoosh,np.ones(18,dtype=np.float32)/18,mode='same')
    whoosh*=np.sin(np.pi*local/.32)**2*.018
    add_stereo(foley,whoosh,start,pan=-.12)

for start in [56.5,57.1]:
    local=np.arange(round(.25*rate),dtype=np.float32)/rate
    paper=rng.normal(0,1,len(local)).astype(np.float32)
    paper=np.concatenate(([0],np.diff(paper)))
    paper*=np.sin(np.pi*local/.25)**2*.004
    add_stereo(foley,paper,start,.18)

local=np.arange(round(.55*rate),dtype=np.float32)/rate
low=np.sin(2*np.pi*(80*local-28*local*local))*np.exp(-local*11)*.022
add_stereo(foley,low,34.9)

assets=pathlib.Path(args.assets)
for filename,data in [('score-v2.wav',score),('foley-v2.wav',foley)]:
    data=np.clip(data,-.95,.95)
    with wave.open(str(assets/filename),'wb') as out:
        out.setnchannels(2);out.setsampwidth(2);out.setframerate(rate)
        out.writeframes((data*32767).astype('<i2').tobytes())
    print(filename,'peak',round(float(np.max(np.abs(data))),5),flush=True)
