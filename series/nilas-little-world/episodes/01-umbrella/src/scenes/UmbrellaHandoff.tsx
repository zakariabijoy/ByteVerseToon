import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Cart,Rain} from '../film/World';
import {Block,Umbrella,palette} from '../film/primitives';
import {Stage,Narration,move,blinkAt,EpisodeMark} from '../film/Stage';
/** Same component is used in the full animatic and the standalone 10s scene. */
export const UmbrellaHandoff = () => {
  const {fps}=useVideoConfig(),t=useCurrentFrame()/fps;
  const canopyX=move(t,1.8,4.2,-.46,.12),release=move(t,7.9,9.2,0,1),accept=move(t,5.5,7.4,0,1);
  const nilaHandX=canopyX+.85-release*.55;
  const nilaHandY=1.62+move(t,1.1,1.8,0,-.07)+move(t,1.8,2.3,0,.07)-release*.42;
  return <><Stage detail at={[0,2.45,8.4]} target={[.02,1.94,0]} push={.23}>
    <Cart/>
    <Person at={[-.85,0,.12]} rightHand={[nilaHandX,nilaHandY,-.12]} leftHand={[-.16,1.14,.33]} look={move(t,.35,1.2,.05,.29)} nod={move(t,6.5,7.4,0,.035)-move(t,7.4,8.2,0,.035)} smile={move(t,4.6,6.5,.25,.9)} blink={blinkAt(t,1.22)+blinkAt(t,8.6)} lean={move(t,1.8,4.1,0,-.035)+move(t,4.4,5.2,0,.035)}/>
    <Block at={[-1.01,1.12,.48]} size={[.4,.31,.045]} color={palette.cream}/>
    <Person kind="seller" at={[.85,0,.12]} leftHand={[-.4-accept*.33,1.08+accept*.7,-.12]} look={move(t,3.55,4.7,0,-.27)} nod={move(t,3.8,5.2,.14,-.025)} smile={move(t,5.7,7.5,-.2,.9)} blink={blinkAt(t,3.3)+blinkAt(t,7.8)} lean={move(t,5.8,7.8,-.055,0)}/>
    <Umbrella x={canopyX} tilt={move(t,1.1,1.8,0,-.014)+move(t,1.8,4.4,0,.014)}/><Rain/>
  </Stage><EpisodeMark/><Narration clip="E01-04.wav" delay={.6}/></>;
};
