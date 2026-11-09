import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Block,Rod,palette} from '../film/primitives';
import {Stage,Narration,StoryTitle,EpisodeMark,move,blinkAt} from '../film/Stage';
export const Dream = () => {
  const {fps}=useVideoConfig(),t=useCurrentFrame()/fps;
  return <><Stage warm at={[0,2.1,7.3]} target={[0,1.75,0]}>
    <Person at={[0,0,.1]} rightHand={[.21,1.45,.48]} leftHand={[-.18,1.43,.49]} nod={move(t,2.5,3.8,.18,-.04)} look={move(t,2.6,4,0,.18)} smile={.7} blink={blinkAt(t,2.1)}/>
    <group position={[0,1.42,.64]} rotation={[-.18,0,.05]}><Block size={[.62,.45,.07]} color={palette.cream}/><Rod a={[-.25,-.16,.045]} b={[-.25,.18,.045]} r={.018} color={palette.coral}/><Rod a={[-.18,-.1,.05]} b={[.1,.09,.05]} r={.007} color={palette.teal}/></group>
  </Stage><EpisodeMark/><StoryTitle line="একটা ছাতার গল্প" subline="একটি ছোট্ট সিদ্ধান্ত। একটি বদলে যাওয়া দিন।"/><Narration clip="E01-01.wav" delay={.6}/></>;
};
