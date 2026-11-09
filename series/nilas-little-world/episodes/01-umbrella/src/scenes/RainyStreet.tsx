import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Cart,Rain} from '../film/World';
import {Flower} from '../film/primitives';
import {Stage,Narration,move,blinkAt} from '../film/Stage';
export const RainyStreet = () => {
  const {fps}=useVideoConfig(),t=useCurrentFrame()/fps;
  return <><Stage at={[.1,2.8,10.5]} target={[.1,1.6,-.2]}>
    <Cart at={[.55,0,-.7]}/><Person kind="seller" at={[.65,0,.15]} nod={.12} smile={-.3} lean={move(t,1.8,3,-.07,-.14)} rightHand={[.5,move(t,2,3.3,1.05,.65),.25]} blink={blinkAt(t,3.3)}/>
    <Flower at={[1.12,.07,.3]} scale={.8}/><Person at={[-1.75+move(t,0,3,-.2,.4),0,.5]} walk={Math.sin(t*5)*.3} look={.2}/><Rain/>
  </Stage><Narration clip="E01-02.wav" delay={.3}/></>;
};
