import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

// A deterministic starter prop. Author a topic-specific causal mechanism next.
export const GlassProp: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const seconds = frame / fps;
  return <AbsoluteFill style={{backgroundColor: '#050b20'}}>
    <ThreeCanvas width={width} height={height} camera={{position: [0, 0, 6], fov: 40}}>
      <ambientLight intensity={0.8}/>
      <directionalLight position={[3, 4, 5]} intensity={3}/>
      <pointLight position={[-3, 1, 2]} color="#27dcef" intensity={20}/>
      <mesh rotation={[0.2, seconds * 0.35, 0]}>
        <boxGeometry args={[1.5, 2.6, 0.3]}/>
        <meshPhysicalMaterial color="#1269e8" metalness={0.1} roughness={0.16}
          transmission={0.7} thickness={0.5} ior={1.45}/>
      </mesh>
    </ThreeCanvas>
    <div style={{position: 'absolute', top: 220, width: '100%', textAlign: 'center',
      color: '#f4fbff', fontFamily: 'Arial', fontSize: 64}}>ByteVerseToon</div>
  </AbsoluteFill>;
};
export const Root: React.FC = () => <Composition id="GlassProp" component={GlassProp}
  width={1080} height={1920} fps={30} durationInFrames={150}/>;
