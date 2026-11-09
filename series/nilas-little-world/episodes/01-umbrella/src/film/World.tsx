import {useCurrentFrame,useVideoConfig} from 'remotion';
import {Ball,Block,Rod,Flower,palette} from './primitives';

export const Street = ({warm=false,detail=false}: {warm?:boolean;detail?:boolean}) => <>
  <color attach="background" args={[warm?'#EDC3A5':'#A8B8CF']}/>
  <fog attach="fog" args={[warm?'#EDC3A5':'#A8B8CF',12,27]}/>
  <ambientLight intensity={1.15}/>
  <hemisphereLight args={['#E5E9FF','#817065',1.4]}/>
  <directionalLight position={[-3,7,5]} intensity={warm?3.2:2.2} color="#FFE0AC" castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} shadow-normalBias={.035}/>
  <directionalLight position={[4,4,-3]} intensity={1.9} color="#BBD5EA"/>
  <mesh rotation={[-Math.PI/2,0,0]} receiveShadow><planeGeometry args={[60,60]}/><meshStandardMaterial color={warm?'#E1C1A1':'#758C99'} roughness={warm?.95:.32} metalness={warm?0:.12}/></mesh>
  <Block at={[0,-.04,-1.9]} size={[20,.1,1.4]} color={warm?'#DAC5B0':'#98A8B0'}/>
  {[-5,-2.5,0,2.5,5].map((x,i)=><group key={x} position={[x,0,-4-(i%2)*.6]}>
    <Block at={[0,2,0]} size={[2.35,4,.9]} color={['#B9A7C2','#C7AC9E','#91ADB5','#D0B68E','#A8B6C5'][i]}/>
    <Block at={[0,.8,.48]} size={[.8,1.6,.04]} color="#4E6979"/>
    <Block at={[0,2.8,.48]} size={[.9,1,.04]} color="#6B8393"/>
    <Block at={[0,2.8,.52]} size={[.05,1,.04]} color="#E4D7BC"/>
    <Block at={[0,2.8,.52]} size={[.9,.05,.04]} color="#E4D7BC"/>
    <Block at={[0,1.85,.65]} size={[2.42,.15,.55]} color={['#CB837E','#D6B168','#A5B7A0','#B28C9D','#9AA5BB'][i]}/>
    {detail&&<><Rod a={[-.6,0,.8]} b={[-.6,1.7,.8]} color="#728673" r={.04}/><Ball at={[-.6,1.6,.8]} size={[.5,.6,.35]} color="#89A08A"/></>}
  </group>)}
  {!warm&&[-1.4,.4,1.5,-.5].map((x,i)=><mesh key={i} rotation={[-Math.PI/2,0,.3]} position={[x,.008,.6-i*.6]} scale={[1,.35,1]}><circleGeometry args={[.4+i*.05,40]}/><meshStandardMaterial color="#ABC0CC" roughness={.12} transparent opacity={.3}/></mesh>)}
</>;

export const Cart = ({at=[.8,0,-.65],sign=false}: {at?:[number,number,number];sign?:boolean}) => <group position={at}>
  <Block at={[0,.73,0]} size={[1.5,.42,.7]} color="#7F9A91"/>
  <Block at={[0,.97,0]} size={[1.65,.1,.8]} color="#E1BE8F"/>
  <Block at={[0,.73,.36]} size={[1.34,.24,.015]} color="#8DA89C"/>
  {[-.55,.55].map(x=><group key={x}><Rod a={[x,.25,0]} b={[x,.6,0]} color="#6C6260" r={.06}/><mesh position={[x,.27,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.21,.045,10,24]}/><meshStandardMaterial color="#5C6261"/></mesh></group>)}
  {[-.49,0,.49].map((x,i)=><group key={x} position={[x,1.03,0]}>
    <mesh castShadow><cylinderGeometry args={[.18,.13,.32,24]}/><meshStandardMaterial color={['#B66B6E','#B4A17D','#6C8B99'][i]} roughness={.7}/></mesh>
    {Array.from({length:7},(_,j)=><Flower key={j} at={[Math.cos(j*2.4)*.105,.03+(j%3)*.04,Math.sin(j*2.4)*.1]} color={['#EC8A8E','#FFD16C','#E9E1DE'][i]} scale={.82}/>) }
  </group>)}
  {sign&&<group position={[-.15,1.21,.47]} rotation={[-.14,0,-.08]}>
    <Block size={[.66,.45,.025]} color={palette.cream}/>
    <group position={[-.02,-.17,.025]}><Flower scale={.65}/></group>
    <Rod a={[-.23,-.14,.03]} b={[.23,-.14,.03]} color={palette.teal} r={.009}/>
  </group>}
</group>;

export const Rain = ({light=false}: {light?:boolean}) => {
  const frame=useCurrentFrame(),{fps}=useVideoConfig();
  return <group>{Array.from({length:light?75:145},(_,i)=>{
    const x=((i*73.137)%1)*7-3.5,z=((i*27.397)%1)*5-2;
    const y=5-((frame/fps*3+i*.147)%5);
    // Leave the sheltered region beneath the canopy dry.
    if(y<3.55&&Math.abs(x-.15)<1.1&&Math.abs(z)<1.0)return null;
    return <Rod key={i} a={[x,y,z]} b={[x-.025,y-.115,z]} r={.004} color="#D5E3ED"/>;
  })}</group>;
};
