import {useMemo} from 'react';
import {BufferGeometry,Float32BufferAttribute,DoubleSide,CatmullRomCurve3,Vector3} from 'three';
import {Ball, Block, Rod, V3, palette} from './primitives';

// Draped fabric is modeled separately from the body so silhouettes stay readable.
const Fabric = ({points,width,color}: {points:V3[];width:number;color:string}) => {
  const geometry=useMemo(()=>{
    const curve=new CatmullRomCurve3(points.map(p=>new Vector3(...p)));
    const vertices:number[]=[],indices:number[]=[];
    for(let i=0;i<=24;i++){
      const p=curve.getPoint(i/24);
      vertices.push(p.x-width/2,p.y,p.z,p.x+width/2,p.y,p.z);
      if(i<24){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2);}
    }
    const mesh=new BufferGeometry();mesh.setAttribute('position',new Float32BufferAttribute(vertices,3));mesh.setIndex(indices);mesh.computeVertexNormals();return mesh;
  },[points,width]);
  return <mesh geometry={geometry} castShadow><meshStandardMaterial color={color} side={DoubleSide} roughness={1}/></mesh>;
};

const Braid = ({x,y,z,length=.7}: {x:number;y:number;z:number;length?:number}) => <group>
  {Array.from({length:8},(_,i)=><Ball key={i} at={[x+(i%2?.023:-.023),y-i*length/8,z]} size={[.065-i*.003,.075,.06]} color="#232B30"/>)}
  <Ball at={[x,y-length+.04,z]} size={[.052,.025,.055]} color={palette.coral}/>
</group>;

type PersonProps = {
  at?:V3; kind?:'nila'|'seller'|'daughter'|'customer';
  rightHand?:V3; leftHand?:V3; look?:number; nod?:number;
  smile?:number; blink?:number; lean?:number; walk?:number; scale?:number;
};

export const Person = ({at=[0,0,0],kind='nila',rightHand,leftHand,look=0,nod=0,smile=.3,blink=0,lean=0,walk=0,scale=1}:PersonProps) => {
  const old=kind==='seller', nila=kind==='nila', child=kind==='daughter';
  const skin=old?'#B47D5C':child?'#BC805F':palette.skin;
  const cloth=nila?palette.teal:old?'#EFE1C1':child?palette.gold:'#CF806F';
  const rh=rightHand??[.41,1.05,.08];
  const lh=leftHand??[-.41,1.05,.08];
  return <group position={at} scale={scale}>
    <group rotation={[0,0,lean]}>
      <Ball at={[-.17,.085,.09+walk*.15]} size={[.135,.065,.23]} color={old?'#654D3E':'#B48C5B'}/>
      <Ball at={[.17,.085,.09-walk*.15]} size={[.135,.065,.23]} color={old?'#654D3E':'#B48C5B'}/>
      {[-1,1].map(side=><Rod key={side} a={[side*.17-.09,.138,.12-side*walk*.15]} b={[side*.17+.09,.138,.12-side*walk*.15]} r={.022} color={old?'#4D4034':'#8D653E'}/>)}
      <Rod a={[-.16,.18,walk*.15]} b={[-.16,.85,0]} r={nila||child?.125:.105} color={nila?'#F2DDB4':child?'#B05563':palette.ink}/>
      <Rod a={[.16,.18,-walk*.15]} b={[.16,.85,0]} r={nila||child?.125:.105} color={nila?'#F2DDB4':child?'#B05563':palette.ink}/>
      {old&&<group>
        <mesh position={[0,.61,0]} castShadow><cylinderGeometry args={[.3,.36,.88,32]}/><meshStandardMaterial color="#567E82" roughness={1}/></mesh>
        {[.22,.34,.46,.58,.7,.82,.94].map(y=><mesh key={y} position={[0,y,0]}><cylinderGeometry args={[.302+(1-y)*.065,.302+(1-y)*.065,.013,32]}/><meshStandardMaterial color="#B6C4A3"/></mesh>)}
        {[-.21,-.07,.07,.21].map(x=><Rod key={x} a={[x,.2,Math.sqrt(.36*.36-x*x)]} b={[x,1.02,Math.sqrt(.303*.303-x*x)]} color="#9CAC95" r={.007}/>)}
      </group>}
      <Ball at={[0,1.28,0]} size={[.34,.57,.22]} color={cloth}/>
      {!old&&<mesh position={[0,.94,0]} castShadow><cylinderGeometry args={[.29,.37,.76,32]}/><meshStandardMaterial color={cloth} roughness={.95}/></mesh>}
      {(nila||child)&&<>
        <mesh position={[0,.58,0]}><cylinderGeometry args={[.369,.372,.035,32]}/><meshStandardMaterial color={child?'#B05563':'#E9BC67'}/></mesh>
        <Block at={[0,1.53,.222]} size={[.045,.29,.014]} color={child?'#B05563':'#E9BC67'}/>
        {[-.16,-.08,0,.08,.16].map(x=><group key={x}><Rod a={[x-.014,.655,.345]} b={[x,.68,.35]} r={.008} color={child?'#B05563':'#E9BC67'}/><Rod a={[x,.68,.35]} b={[x+.014,.655,.345]} r={.008} color={child?'#B05563':'#E9BC67'}/></group>)}
      </>}
      {old&&<>
        <Block at={[0,1.48,.218]} size={[.055,.48,.025]} color="#C9B68F"/>
        {[1.36,1.48,1.6].map(y=><Ball key={y} at={[0,y,.24]} size={[.014,.014,.01]} color="#7C7463"/>)}
        <Fabric points={[[.23,1.76,.02],[.28,1.63,.19],[.27,1.31,.25],[.29,.99,.25]]} width={.17} color="#A9544B"/>
        {[1.08,1.13,1.18,1.23,1.49,1.54].map(y=><Block key={y} at={[.28,y,.265]} size={[.17,.014,.012]} color="#ECD0A4"/>)}
      </>}
      {nila&&<>
        <Fabric points={[[-.27,1.76,.04],[-.23,1.65,.22],[-.2,1.29,.28],[-.27,.82,.33]]} width={.14} color="#F0CE8C"/>
        <Fabric points={[[-.26,1.72,.18],[-.05,1.56,.24],[.17,1.6,.23],[.28,1.74,.1]]} width={.105} color="#F0CE8C"/>
        <Fabric points={[[.28,1.75,.02],[.3,1.55,-.17],[.28,1.1,-.25]]} width={.16} color="#E8BE74"/>
        <Rod a={[-.32,.82,.34]} b={[-.2,1.3,.29]} color="#B86A50" r={.007}/>
      </>}
      <Rod a={[0,1.74,0]} b={[0,1.95,0]} r={.12} color={skin}/>
      <Rod a={[.27,1.64,0]} b={[(rh[0]+.28)/2+.05,1.29+Math.max(0,rh[1]-1.15)*.5,.12]} r={.115} color={old?palette.cream:cloth}/>
      <Rod a={[(rh[0]+.28)/2+.05,1.29+Math.max(0,rh[1]-1.15)*.5,.12]} b={rh} r={.085} color={skin}/>
      <Rod a={[-.27,1.64,0]} b={[(lh[0]-.28)/2-.05,1.29+Math.max(0,lh[1]-1.15)*.5,.12]} r={.115} color={old?palette.cream:cloth}/>
      <Rod a={[(lh[0]-.28)/2-.05,1.29+Math.max(0,lh[1]-1.15)*.5,.12]} b={lh} r={.085} color={skin}/>
      <Ball at={rh} size={[.09,.11,.08]} color={skin}/><Ball at={lh} size={[.09,.11,.08]} color={skin}/>
      <group position={[0,2.14,0]} rotation={[nod,look,0]}>
        <Ball size={[.37,.43,.32]} color={skin}/>
        <Ball at={[-.36,-.01,0]} size={[.065,.1,.065]} color={skin}/><Ball at={[.36,-.01,0]} size={[.065,.1,.065]} color={skin}/>
        <Ball at={[0,.23,-.06]} size={[.38,old?.22:.25,.3]} color={old?'#BFC1B8':'#232B30'}/>
        {!old&&<><Ball at={[-.23,.16,.14]} size={[.16,.2,.19]} color="#232B30"/><Ball at={[.18,.23,.14]} size={[.2,.12,.17]} color="#232B30"/></>}
        {nila&&<>
          <Braid x={-.32} y={-.12} z={-.13} length={.83}/>
          {[-.365,.365].map(x=><mesh key={x} position={[x,-.14,.04]}><torusGeometry args={[.036,.009,8,18]}/><meshStandardMaterial color="#D7AD54" metalness={.5} roughness={.4}/></mesh>)}
        </>}
        {child&&<><Braid x={-.34} y={-.1} z={-.03} length={.59}/><Braid x={.34} y={-.1} z={-.03} length={.59}/></>}
        <Ball at={[-.14,.015,.295]} size={[.087,Math.max(.008,.09*(1-blink)),.031]} color="#FFF8EE"/>
        <Ball at={[.14,.015,.295]} size={[.087,Math.max(.008,.09*(1-blink)),.031]} color="#FFF8EE"/>
        <Ball at={[-.14+look*.05,.012,.324]} size={[.042,Math.max(.004,.054*(1-blink)),.019]} color="#2E2928"/>
        <Ball at={[.14+look*.05,.012,.324]} size={[.042,Math.max(.004,.054*(1-blink)),.019]} color="#2E2928"/>
        <Ball at={[-.151+look*.05,.034,.341]} size={[.012,Math.max(.002,.014*(1-blink)),.005]} color="#FFFFFF"/>
        <Ball at={[.129+look*.05,.034,.341]} size={[.012,Math.max(.002,.014*(1-blink)),.005]} color="#FFFFFF"/>
        <Rod a={[-.225,.155,.285]} b={[-.065,.15+smile*.025,.31]} r={.019} color={old?'#C8C1B9':'#26323D'}/>
        <Rod a={[.065,.15+smile*.025,.31]} b={[.225,.155,.285]} r={.019} color={old?'#C8C1B9':'#26323D'}/>
        <Ball at={[0,-.085,.322]} size={[.062,.075,.062]} color={skin}/>
        {old&&<><Ball at={[-.064,-.15,.322]} size={[.085,.035,.037]} color="#DED7CB"/><Ball at={[.064,-.15,.322]} size={[.085,.035,.037]} color="#DED7CB"/></>}
        <Rod a={[-.105,-.205+smile*.025,.28]} b={[0,-.225,.305]} r={.013} color="#713F37"/>
        <Rod a={[0,-.225,.305]} b={[.105,-.205+smile*.025,.28]} r={.013} color="#713F37"/>
        <Ball at={[-.24,-.11,.255]} size={[.07,.035,.025]} color={old?'#B87B61':'#D18B73'}/>
        <Ball at={[.24,-.11,.255]} size={[.07,.035,.025]} color={old?'#B87B61':'#D18B73'}/>
      </group>
      {nila&&<>
        <Rod a={[-.22,1.72,.18]} b={[.28,1.02,.24]} r={.027} color="#CD6354"/>
        <Ball at={[.37,.91,.09]} size={[.19,.23,.12]} color={palette.coral}/>
        <Block at={[.375,.94,.21]} size={[.21,.12,.025]} color="#DF6958"/>
        <Ball at={[.375,.94,.23]} size={[.025,.025,.01]} color={palette.gold}/>
      </>}
    </group>
  </group>;
};
