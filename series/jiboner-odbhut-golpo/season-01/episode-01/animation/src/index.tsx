import React from "react";
import {
  registerRoot,
  Composition,
  Folder,
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  Still,
} from "remotion";
import { Branding } from "./Stage";
import { Hook } from "./Hook";
import { Friends } from "./Friends";
import { Secret } from "./Secret";
import { Removal } from "./Removal";
import { Manager } from "./Manager";
import { Reveal } from "./Reveal";
import { Maya } from "./Maya";
import { Clarify } from "./Clarify";
import { Lesson } from "./Lesson";
import { RigStudy, RigBodyStudy, RigHeadStudy } from "./RigStudy";
import { Cover } from "./Cover";
export const Episode = () => (
  <AbsoluteFill style={{ background: "#172b45" }}>
    <Audio src={staticFile("voiceover-original.wav")} volume={1} />
    <Audio src={staticFile("score-v2.wav")} volume={0.9} />
    <Audio src={staticFile("foley-v2.wav")} volume={0.8} />
    <Sequence name="01 Hook" from={0} durationInFrames={356}>
      <Hook />
    </Sequence>
    <Sequence name="02 Friends" from={356} durationInFrames={169}>
      <Friends />
    </Sequence>
    <Sequence name="03 Secret" from={525} durationInFrames={374}>
      <Secret />
    </Sequence>
    <Sequence name="04 Removal" from={899} durationInFrames={298}>
      <Removal />
    </Sequence>
    <Sequence name="05 Manager" from={1197} durationInFrames={476}>
      <Manager />
    </Sequence>
    <Sequence name="06 Reveal" from={1673} durationInFrames={172}>
      <Reveal />
    </Sequence>
    <Sequence name="07 Maya" from={1845} durationInFrames={294}>
      <Maya />
    </Sequence>
    <Sequence name="08 Clarify" from={2139} durationInFrames={287}>
      <Clarify />
    </Sequence>
    <Sequence name="09 Lesson" from={2426} durationInFrames={363}>
      <Lesson />
    </Sequence>
    <Branding />
  </AbsoluteFill>
);
registerRoot(() => (
  <>
    <Composition
      id="Episode01"
      component={Episode}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={2789}
    />
    <Folder name="Scenes">
      <Still id="Episode01Cover" component={Cover} width={1080} height={1920} />
      <Composition
        id="RigStudy"
        component={RigStudy}
        width={1200}
        height={900}
        fps={30}
        durationInFrames={120}
      />
      <Composition
        id="RigBodyStudy"
        component={RigBodyStudy}
        width={1200}
        height={1700}
        fps={30}
        durationInFrames={1}
      />
      <Composition
        id="RigHeadStudy"
        component={RigHeadStudy}
        width={1200}
        height={1700}
        fps={30}
        durationInFrames={1}
      />
      <Composition
        id="Hook"
        component={Hook}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={356}
      />
      <Composition
        id="Friends"
        component={Friends}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={169}
      />
      <Composition
        id="Secret"
        component={Secret}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={374}
      />
      <Composition
        id="Removal"
        component={Removal}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={298}
      />
      <Composition
        id="Manager"
        component={Manager}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={476}
      />
      <Composition
        id="Reveal"
        component={Reveal}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={172}
      />
      <Composition
        id="Maya"
        component={Maya}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={294}
      />
      <Composition
        id="Clarify"
        component={Clarify}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={287}
      />
      <Composition
        id="Lesson"
        component={Lesson}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={363}
      />
    </Folder>
  </>
));
