import {useMemo} from 'react';
import {Quaternion, Vector3, DoubleSide, CatmullRomCurve3} from 'three';

export type V3 = [number, number, number];
export const palette = {teal:'#287D86', coral:'#EF735D', gold:'#FFC857', skin:'#AD7255', ink:'#233749', cream:'#FFF1D3', plum:'#78617D'};

export const Ball = ({at=[0,0,0], size=[1,1,1], color, roughness=.72}: {at?:V3; size?:V3; color:string; roughness?:number}) => (
  <mesh position={at} scale={size} castShadow receiveShadow>
    <sphereGeometry args={[1,24,20]}/><meshStandardMaterial color={color} roughness={roughness}/>
  </mesh>
);
export const Block = ({at=[0,0,0], size, color, rotate=0}: {at?:V3; size:V3; color:string; rotate?:number}) => (
  <mesh position={at} rotation={[0,rotate,0]} castShadow receiveShadow>
    <boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.85}/>
  </mesh>
);
export const Rod = ({a,b,r=.035,color}: {a:V3;b:V3;r?:number;color:string}) => {
  const start = new Vector3(...a), end=new Vector3(...b);
  const q = new Quaternion().setFromUnitVectors(new Vector3(0,1,0),end.clone().sub(start).normalize());
  return <mesh position={start.clone().add(end).multiplyScalar(.5)} quaternion={q} castShadow>
    <cylinderGeometry args={[r,r,start.distanceTo(end),12]}/><meshStandardMaterial color={color} roughness={.65}/>
  </mesh>;
};

export const Flower = ({at=[0,0,0], color=palette.coral, scale=1}: {at?:V3;color?:string;scale?:number}) => (
  <group position={at} scale={scale}>
    <Rod a={[0,0,0]} b={[.02,.43,0]} color="#557F63" r={.012}/>
    <Ball at={[-.05,.15,0]} size={[.07,.035,.025]} color="#73976C"/>
    {[0,1,2,3,4].map(i=><Ball key={i} at={[.02+Math.cos(i*Math.PI*2/5)*.07,.43+Math.sin(i*Math.PI*2/5)*.07,0]} size={[.065,.065,.035]} color={color}/>)}
    <Ball at={[.02,.43,.035]} size={[.035,.035,.025]} color={palette.gold}/>
  </group>
);

export const Umbrella = ({x=0,y=0,z=0,tilt=0}: {x?:number;y?:number;z?:number;tilt?:number}) => {
  const ribs=useMemo(()=>Array.from({length:10},(_,i)=>new CatmullRomCurve3(Array.from({length:10},(_,j)=>{
    const a=i*Math.PI/5, theta=j/9*Math.PI/2;
    return new Vector3(Math.sin(theta)*Math.cos(a)*1.22,3.15+Math.cos(theta)*.44,Math.sin(theta)*Math.sin(a)*1.22);
  }))),[]);
  return <group position={[x,y,z]} rotation={[0,0,tilt]}>
    {Array.from({length:10},(_,i)=><mesh key={i} position={[0,3.15,0]} scale={[1,.36,1]} castShadow>
      <sphereGeometry args={[1.22,8,14,i*Math.PI/5,Math.PI/5,0,Math.PI/2]}/>
      <meshStandardMaterial color={i%2?'#FFCE65':'#F3B541'} side={DoubleSide} roughness={.66}/>
    </mesh>)}
    {ribs.map((curve,i)=><mesh key={i}><tubeGeometry args={[curve,18,.008,6,false]}/><meshStandardMaterial color="#BC8B35"/></mesh>)}
    <Rod a={[0,1.45,0]} b={[0,3.65,0]} r={.018} color="#806543"/>
    <Ball at={[0,3.65,0]} size={[.035,.055,.035]} color="#806543"/>
    <mesh position={[.065,1.46,0]} rotation={[0,0,Math.PI]}><torusGeometry args={[.065,.025,10,18,Math.PI]}/><meshStandardMaterial color="#8D6148"/></mesh>
  </group>;
};
