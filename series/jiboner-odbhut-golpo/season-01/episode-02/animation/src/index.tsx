import React from "react";
import {
  registerRoot,
  Composition,
  Still,
  Folder,
  Sequence,
  AbsoluteFill,
  Audio,
  staticFile,
} from "remotion";
import { Branding } from "./Stage";
import {
  Hook,
  Helpful,
  FirstRequest,
  Requests,
  Deadline,
  ManagerTalk,
  TeaTalk,
  Boundaries,
  Relief,
  Lesson,
} from "./Scenes";
import { Cover } from "./Cover";
export const Episode = () => (
  <AbsoluteFill style={{ background: "#172b45" }}>
    <Audio src={staticFile("voiceover-original.wav")} />
    <Audio src={staticFile("score.wav")} volume={0.9} />
    <Audio src={staticFile("foley.wav")} volume={0.8} />
    <Sequence name="01 Hook" from={0} durationInFrames={399}>
      <Hook />
    </Sequence>
    <Sequence name="02 Helpful colleague" from={399} durationInFrames={216}>
      <Helpful />
    </Sequence>
    <Sequence name="03 First request" from={615} durationInFrames={216}>
      <FirstRequest />
    </Sequence>
    <Sequence name="04 More requests" from={831} durationInFrames={260}>
      <Requests />
    </Sequence>
    <Sequence name="05 Deadline" from={1091} durationInFrames={277}>
      <Deadline />
    </Sequence>
    <Sequence name="06 Manager" from={1368} durationInFrames={435}>
      <ManagerTalk />
    </Sequence>
    <Sequence name="07 Tea stall" from={1803} durationInFrames={486}>
      <TeaTalk />
    </Sequence>
    <Sequence name="08 Boundaries" from={2289} durationInFrames={444}>
      <Boundaries />
    </Sequence>
    <Sequence name="09 Relief" from={2733} durationInFrames={126}>
      <Relief />
    </Sequence>
    <Sequence name="10 Lesson" from={2859} durationInFrames={338}>
      <Lesson />
    </Sequence>
    <Branding />
  </AbsoluteFill>
);
registerRoot(() => (
  <>
    <Composition
      id="Episode02"
      component={Episode}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={3197}
    />
    <Still id="Episode02Cover" component={Cover} width={1080} height={1920} />
    <Folder name="Scenes">
      <Composition
        id="TeaTalk"
        component={TeaTalk}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={486}
      />
      <Composition
        id="Boundaries"
        component={Boundaries}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={444}
      />
    </Folder>
  </>
));
