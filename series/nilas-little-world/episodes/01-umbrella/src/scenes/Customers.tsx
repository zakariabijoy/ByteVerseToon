import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Cart,Rain} from '../film/World';
import {Flower,Umbrella} from '../film/primitives';
import {Stage,Narration,move} from '../film/Stage';
export const Customers = () => {
  const {fps}=useVideoConfig(),t=useCurrentFrame()/fps;
  return <><Stage at={[0,2.7,11]} target={[0,1.5,0]}>
    <Cart at={[.7,0,-.8]} sign/><Umbrella x={.55}/><Person kind="seller" at={[.75,0,-.08]} smile={.95} look={-.22} leftHand={[-.54,1.35,.3]}/>
    <Person kind="customer" at={[move(t,.2,2.3,-2.4,-.65),0,.55]} look={.23} rightHand={[move(t,2.6,3.8,.35,.65),1.36,.1]} smile={.6} walk={t<2.3?Math.sin(t*6)*.35:0}/>
    <Flower at={[-.03,1.15,.68]} color="#FFCC66"/>
    <Person kind="customer" at={[move(t,3.6,5.8,-2.7,-1.5),0,-.4]} scale={.92} look={.25} walk={t>3.6&&t<5.8?Math.sin(t*6)*.35:0}/><Rain light/>
  </Stage><Narration clip="E01-06.wav" delay={.5}/></>;
};
