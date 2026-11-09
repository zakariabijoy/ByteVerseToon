import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Cart,Rain} from '../film/World';
import {Block,Umbrella,palette} from '../film/primitives';
import {Stage,Narration,move,blinkAt} from '../film/Stage';
export const Choice = () => {
  const {fps}=useVideoConfig(),t=useCurrentFrame()/fps;
  return <><Stage at={[-.4,2.2,7.6]} target={[-.35,1.85,0]} push={.18}>
    <Cart at={[1.4,0,-1.8]}/><Person at={[-.45,0,.35]} look={move(t,.8,2.1,-.15,.33)} nod={move(t,3.4,5,.1,-.025)} smile={move(t,4.7,6,-.3,.55)} blink={blinkAt(t,2.2)} rightHand={[.3,1.61,.1]} leftHand={[-.14,1.2,.4]} lean={move(t,0,.7,-.04,0)}/>
    <Block at={[-.59,1.2,.8]} size={[.44,.33,.055]} color={palette.cream}/><Umbrella x={-.15} z={.45}/><Rain light/>
  </Stage><Narration clip="E01-03.wav" delay={.4}/></>;
};
