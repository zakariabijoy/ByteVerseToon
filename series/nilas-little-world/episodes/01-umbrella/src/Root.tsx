import {Audio} from '@remotion/media';
import {AbsoluteFill,Composition,Folder,Series,staticFile,useVideoConfig} from 'remotion';
import {Dream} from './scenes/Dream';
import {RainyStreet} from './scenes/RainyStreet';
import {Choice} from './scenes/Choice';
import {UmbrellaHandoff} from './scenes/UmbrellaHandoff';
import {Drawing} from './scenes/Drawing';
import {Customers} from './scenes/Customers';
import {Home} from './scenes/Home';
import {Ending} from './scenes/Ending';

export const Episode01 = () => {
  const {fps}=useVideoConfig();
  return <AbsoluteFill><Series>
    <Series.Sequence name="01 · The dream" durationInFrames={6*fps} premountFor={fps}><Dream/></Series.Sequence>
    <Series.Sequence name="02 · Flowers in the rain" durationInFrames={8*fps} premountFor={fps}><RainyStreet/></Series.Sequence>
    <Series.Sequence name="03 · The choice" durationInFrames={8*fps} premountFor={fps}><Choice/></Series.Sequence>
    <Series.Sequence name="04 · An umbrella / detailed scene" durationInFrames={10*fps} premountFor={fps}><UmbrellaHandoff/></Series.Sequence>
    <Series.Sequence name="05 · A drawing that helps" durationInFrames={8*fps} premountFor={fps}><Drawing/></Series.Sequence>
    <Series.Sequence name="06 · One customer, then another" durationInFrames={8*fps} premountFor={fps}><Customers/></Series.Sequence>
    <Series.Sequence name="07 · A book for his daughter" durationInFrames={7*fps} premountFor={fps}><Home/></Series.Sequence>
    <Series.Sequence name="08 · A dream begins" durationInFrames={5*fps} premountFor={fps}><Ending/></Series.Sequence>
  </Series><Audio name="Rain ambience · temporary sound design" src={staticFile('audio/rain-bed.wav')} from={6*fps} durationInFrames={42*fps} volume={.26} premountFor={fps}/></AbsoluteFill>;
};

export const RemotionRoot = () => <>
  <Composition id="Episode01-Animatic" component={Episode01} durationInFrames={1800} fps={30} width={1080} height={1920}/>
  <Composition id="Umbrella-Lookdev-10s" component={UmbrellaHandoff} durationInFrames={300} fps={30} width={1080} height={1920}/>
  <Folder name="Storyboard-Shots">
    <Composition id="01-Dream" component={Dream} durationInFrames={180} fps={30} width={1080} height={1920}/>
    <Composition id="02-RainyStreet" component={RainyStreet} durationInFrames={240} fps={30} width={1080} height={1920}/>
    <Composition id="03-Choice" component={Choice} durationInFrames={240} fps={30} width={1080} height={1920}/>
    <Composition id="04-Umbrella" component={UmbrellaHandoff} durationInFrames={300} fps={30} width={1080} height={1920}/>
    <Composition id="05-Drawing" component={Drawing} durationInFrames={240} fps={30} width={1080} height={1920}/>
    <Composition id="06-Customers" component={Customers} durationInFrames={240} fps={30} width={1080} height={1920}/>
    <Composition id="07-Home" component={Home} durationInFrames={210} fps={30} width={1080} height={1920}/>
    <Composition id="08-Ending" component={Ending} durationInFrames={150} fps={30} width={1080} height={1920}/>
  </Folder>
</>;
