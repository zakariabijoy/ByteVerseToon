import React from "react";
import {
  registerRoot,
  Composition,
  Still,
  Sequence,
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import { Branding } from "./Stage";
import {
  Hook,
  Borrow,
  Delay,
  TeaArrival,
  Dispute,
  Question,
  Realize,
  Return,
  Warmth,
  Lesson,
} from "./Scenes";
import { Cover } from "./Cover";
export const Episode = () => (
  <AbsoluteFill style={{ background: "#172b45" }}>
    <Audio src={staticFile("voiceover-original.wav")} />
    <Audio src={staticFile("score.wav")} volume={0.9} />
    <Audio src={staticFile("foley.wav")} volume={0.8} />
    <Sequence name="01 Hook" from={0} durationInFrames={238}>
      <Hook />
    </Sequence>
    <Sequence name="02 Borrow" from={238} durationInFrames={317}>
      <Borrow />
    </Sequence>
    <Sequence name="03 Forgotten promise" from={555} durationInFrames={210}>
      <Delay />
    </Sequence>
    <Sequence name="04 Tea stall" from={765} durationInFrames={287}>
      <TeaArrival />
    </Sequence>
    <Sequence name="05 Dispute" from={1052} durationInFrames={280}>
      <Dispute />
    </Sequence>
    <Sequence name="06 Karim question" from={1332} durationInFrames={189}>
      <Question />
    </Sequence>
    <Sequence name="07 Realization" from={1521} durationInFrames={281}>
      <Realize />
    </Sequence>
    <Sequence name="08 Return and apology" from={1802} durationInFrames={207}>
      <Return />
    </Sequence>
    <Sequence name="09 Warmth" from={2009} durationInFrames={184}>
      <Warmth />
    </Sequence>
    <Sequence name="10 Lesson" from={2193} durationInFrames={323}>
      <Lesson />
    </Sequence>
    <Branding />
  </AbsoluteFill>
);
registerRoot(() => (
  <>
    <Composition
      id="Episode03"
      component={Episode}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={2516}
    />
    <Still id="Episode03Cover" component={Cover} width={1080} height={1920} />
  </>
));
