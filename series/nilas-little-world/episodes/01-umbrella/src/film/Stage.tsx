import type {ReactNode} from 'react';
import {useLayoutEffect} from 'react';
import {useThree} from '@react-three/fiber';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill,Easing,interpolate,useCurrentFrame,useVideoConfig,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {Street} from './World';
import type {V3} from './primitives';
import {ChannelMark} from './Brand';

export const ease=Easing.bezier(.42,0,.2,1);
export const move=(seconds:number,start:number,end:number,a:number,b:number)=>interpolate(seconds,[start,end],[a,b],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
export const blinkAt=(t:number,at:number)=>interpolate(t,[at,at+.065,at+.16,at+.23],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

const Camera = ({at,target,push}: {at:V3;target:V3;push:number}) => {
  const {camera,invalidate}=useThree();
  const f=useCurrentFrame(),{fps}=useVideoConfig();
  const x=at[0],y=at[1],z=at[2],tx=target[0],ty=target[1],tz=target[2];
  useLayoutEffect(()=>{
    camera.position.set(x,y,z-move(f/fps,0,10,0,push));
    camera.lookAt(tx,ty,tz);camera.updateMatrixWorld();invalidate();
  },[camera,invalidate,f,fps,x,y,z,tx,ty,tz,push]);
  return null;
};

export const Stage = ({children,warm=false,detail=false,at=[0,2.25,8.2],target=[0,1.7,0],push=.12}: {children:ReactNode;warm?:boolean;detail?:boolean;at?:V3;target?:V3;push?:number}) => {
  const {width,height}=useVideoConfig();
  return <AbsoluteFill style={{background:'#A8B8CF',fontFamily:'"Nirmala UI", sans-serif'}}>
    <ThreeCanvas width={width} height={height} shadows dpr={1} camera={{fov:38,near:.1,far:70,position:at}} gl={{antialias:true,alpha:false}}>
      <Camera at={at} target={target} push={push}/><Street warm={warm} detail={detail}/>{children}
    </ThreeCanvas>
    <AbsoluteFill style={{pointerEvents:'none',background:'linear-gradient(180deg,rgba(35,55,73,.08),transparent 30%,transparent 78%,rgba(35,55,73,.12))'}}/>
  </AbsoluteFill>;
};

export const Narration = ({clip,delay=.4}: {clip:string;delay?:number}) => {
  const {fps}=useVideoConfig();
  return <Audio name={`Ananya · ${clip}`} src={staticFile(`audio/${clip}`)} from={Math.round(delay*fps)} premountFor={fps} volume={.9}/>;
};
export const EpisodeMark = ChannelMark;
export const StoryTitle = ({line,subline}: {line:string;subline?:string}) => {
  const f=useCurrentFrame(),{fps}=useVideoConfig();
  return <div style={{position:'absolute',left:88,right:88,top:300,color:'#263F4C',fontFamily:'"Nirmala UI",sans-serif',opacity:interpolate(f,[0,.6*fps,4.5*fps,5.5*fps],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
    <div style={{fontSize:86,fontWeight:700,lineHeight:1.5}}>{line}</div>{subline&&<div style={{marginTop:18,fontSize:35,lineHeight:1.6,opacity:.75}}>{subline}</div>}
  </div>;
};
