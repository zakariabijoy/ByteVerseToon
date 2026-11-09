import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Block,palette} from '../film/primitives';
import {Stage,Narration,EpisodeMark,move} from '../film/Stage';
import {SubscribeEnding} from '../film/Brand';
export const Ending = () => {
  const {fps}=useVideoConfig(),f=useCurrentFrame(),t=f/fps;
  return <><Stage warm at={[0,2,7.8]} target={[0,1.7,0]}>
    <Person at={[move(t,0,3,-.3,.15),0,0]} smile={.85} look={-.12} leftHand={[-.16,1.12,.35]} walk={t<3?Math.sin(t*5)*.25:0}/>
    <Block at={[-.46+move(t,0,3,0,.45),1.12,.48]} size={[.42,.32,.045]} color={palette.cream}/>
  </Stage><EpisodeMark/>
    <div style={{position:'absolute',left:88,right:88,top:300,color:'#263F4C',fontFamily:'"Nirmala UI",sans-serif',fontSize:78,fontWeight:700,lineHeight:1.6,opacity:move(t,1.4,2.2,0,1)}}>ছোট্ট ভালোবাসা।<br/>বড় পরিবর্তন।</div>
    <Narration clip="E01-08.wav" delay={.1}/><SubscribeEnding/>
  </>;
};
