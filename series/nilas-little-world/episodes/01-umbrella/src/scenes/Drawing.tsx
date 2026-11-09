import {useMemo} from 'react';
import {CanvasTexture,SRGBColorSpace} from 'three';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Person} from '../film/Characters';
import {Cart,Rain} from '../film/World';
import {Block,Rod,Umbrella,palette} from '../film/primitives';
import {Stage,Narration,move} from '../film/Stage';
export const Drawing = () => {
  const {fps}=useVideoConfig(),t=useCurrentFrame()/fps;
  const texture=useMemo(()=>{
    const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=640;const ctx=canvas.getContext('2d')!;
    ctx.fillStyle='#FFF1D3';ctx.fillRect(0,0,1024,640);ctx.strokeStyle='#287D86';ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(512,300);ctx.lineTo(506,90);ctx.stroke();
    for(let i=0;i<5;i++){ctx.beginPath();ctx.fillStyle='#EF735D';ctx.ellipse(512+Math.cos(i*Math.PI*2/5)*48,100+Math.sin(i*Math.PI*2/5)*48,40,33,i,0,Math.PI*2);ctx.fill();}
    ctx.beginPath();ctx.fillStyle='#FFC857';ctx.arc(512,100,23,0,Math.PI*2);ctx.fill();ctx.fillStyle='#287D86';ctx.font='bold 64px "Nirmala UI", sans-serif';ctx.textAlign='center';ctx.fillText('কারও দিনটা',512,420);ctx.fillText('সুন্দর করে দিন।',512,520);
    const map=new CanvasTexture(canvas);map.colorSpace=SRGBColorSpace;return map;
  },[]);
  return <><Stage at={[0,2.1,6.9]} target={[0,1.5,.3]} push={.1}>
    <Cart at={[.85,0,-.7]}/><Umbrella x={.4}/><Person at={[-.72,0,-.1]} rightHand={[.5,1.41+Math.sin(t*4)*.018,.45]} leftHand={[.1,1.24,.4]} nod={.16} smile={.65}/>
    <group position={[0,1.42,.65]} rotation={[-.05,0,move(t,5.5,6.8,-.04,.025)]}><Block size={[1.15,.72,.055]} color={palette.cream}/><mesh position={[0,0,.032]}><planeGeometry args={[1.12,.7]}/><meshStandardMaterial map={texture} roughness={1}/></mesh></group>
    <Rod a={[-.22,1.38,.7]} b={[-.1+Math.sin(t*3)*.02,1.6,.72]} color="#B9784D" r={.012}/><Rain light/>
  </Stage><Narration clip="E01-05.wav" delay={.7}/></>;
};
