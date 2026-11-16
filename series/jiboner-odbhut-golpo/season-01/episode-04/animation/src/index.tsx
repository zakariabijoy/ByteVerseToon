import React from "react";
import {
  registerRoot,
  Composition,
  Still,
  Sequence,
  AbsoluteFill,
  Audio,
  staticFile,
  useVideoConfig,
} from "remotion";
import { Branding } from "./Stage";
import {
  MotionPaint,
  Hook,
  Hurt,
  Corner,
  Fallen,
  Notebook,
  Recognition,
  Gratitude,
  Change,
  TeacherStory,
  Apology,
  Dignity,
  Respect,
} from "./MotionScenes";
import { DramaDirection } from "./DramaDirection";
import { Cover } from "./Cover";
export const Episode = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#172b45" }}>
      <Audio src={staticFile("voiceover-original.wav")} />
      <Audio src={staticFile("drama-score-v4.wav")} volume={3.2} />
      <Audio src={staticFile("drama-effects-v4.wav")} volume={1} />
      <MotionPaint />
      <Sequence
        name="01 Direct conflict"
        from={0}
        durationInFrames={102}
        premountFor={fps}
      >
        <Hook />
      </Sequence>
      <Sequence
        name="02 Dignified answer"
        from={102}
        durationInFrames={234}
        premountFor={fps}
      >
        <Hurt />
      </Sequence>
      <Sequence
        name="03 Quiet corner"
        from={336}
        durationInFrames={234}
        premountFor={fps}
      >
        <Corner />
      </Sequence>
      <Sequence
        name="04 Falling notebooks"
        from={570}
        durationInFrames={90}
        premountFor={fps}
      >
        <Fallen />
      </Sequence>
      <Sequence
        name="05 Red ink and question"
        from={660}
        durationInFrames={288}
        premountFor={fps}
      >
        <Notebook />
      </Sequence>
      <Sequence
        name="06 Recognition and chair"
        from={948}
        durationInFrames={216}
        premountFor={fps}
      >
        <Recognition />
      </Sequence>
      <Sequence
        name="07 Karims gratitude"
        from={1164}
        durationInFrames={132}
        premountFor={fps}
      >
        <Gratitude />
      </Sequence>
      <Sequence
        name="08 Sajid realizes"
        from={1296}
        durationInFrames={54}
        premountFor={fps}
      >
        <Change />
      </Sequence>
      <Sequence
        name="09 Teachers answer"
        from={1350}
        durationInFrames={174}
        premountFor={fps}
      >
        <TeacherStory />
      </Sequence>
      <Sequence
        name="10 Apology"
        from={1524}
        durationInFrames={156}
        premountFor={fps}
      >
        <Apology />
      </Sequence>
      <Sequence
        name="11 Bill and invitation"
        from={1680}
        durationInFrames={228}
        premountFor={fps}
      >
        <Dignity />
      </Sequence>
      <Sequence
        name="12 Respect in action"
        from={1908}
        durationInFrames={164}
        premountFor={fps}
      >
        <Respect />
      </Sequence>
      <DramaDirection />
      <Branding />
    </AbsoluteFill>
  );
};
registerRoot(() => (
  <>
    <Composition
      id="Episode04"
      component={Episode}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={2072}
    />
    <Still id="Episode04Cover" component={Cover} width={1080} height={1920} />
  </>
));
