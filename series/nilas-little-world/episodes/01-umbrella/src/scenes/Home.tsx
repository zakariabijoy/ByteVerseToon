import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Block,Ball,Rod,palette} from '../film/primitives';
import {Stage,Narration,move,blinkAt} from '../film/Stage';
export const Home = () => {
  const {fps}=useVideoConfig(),t=useCurrentFrame()/fps,handover=move(t,1.8,3.6,0,1);
  return <><Stage warm at={[0,2.1,7.5]} target={[0,1.4,0]} push={.15}>
    <Block at={[0,1.9,-1.5]} size={[4.5,3.8,.2]} color="#D4A481"/><Block at={[0,1.4,-1.35]} size={[2.7,2.8,.1]} color="#A66D57"/>
    <pointLight position={[0,2.8,.2]} color="#FFD08D" intensity={8}/><Ball at={[0,2.9,-1.1]} size={[.17,.1,.12]} color={palette.gold}/>
    <Person kind="seller" at={[-.6,0,0]} smile={1} look={.2} rightHand={[.4+handover*.23,1.13+handover*.03,.2]} leftHand={[-.4,.87,.15]} blink={blinkAt(t,4.5)}/>
    <Person kind="daughter" at={[.6,0,.12]} scale={.76} smile={1} look={-.2} leftHand={[-.4-handover*.2,1.4+handover*.12,.3]}/>
    <Block at={[.06+handover*.09,1.16,.4]} size={[.38,.43,.065]} color={palette.teal}/><Block at={[.06+handover*.09,1.16,.437]} size={[.3,.34,.006]} color={palette.cream}/>
    <group position={[-1,.1,.3]}><Block at={[0,.2,0]} size={[.35,.4,.26]} color="#BE9366"/><Rod a={[-.1,.4,0]} b={[-.1,.53,0]} r={.018} color="#BE9366"/><Rod a={[.1,.4,0]} b={[.1,.53,0]} r={.018} color="#BE9366"/><Ball at={[.02,.43,0]} size={[.13,.09,.1]} color="#7D9B66"/></group>
  </Stage><Narration clip="E01-07.wav" delay={.7}/></>;
};
