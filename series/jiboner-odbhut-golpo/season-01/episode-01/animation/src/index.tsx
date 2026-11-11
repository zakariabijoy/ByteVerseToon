import React from "react";
import {
  registerRoot,
  Composition,
  Folder,
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
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
export const Episode = () => (
  <AbsoluteFill style={{ background: "#172b45" }}>
    <Audio src={staticFile("voiceover-original.wav")} volume={1} />
    <Audio src={staticFile("original-underscore.wav")} volume={0.7} />
    <Audio src={staticFile("scene-cues.wav")} volume={0.6} />
    <Sequence name="01 Hook" from={0} durationInFrames={217}>
      <Hook />
    </Sequence>
    <Sequence name="02 Friends" from={217} durationInFrames={308}>
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
      <Composition
        id="Hook"
        component={Hook}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={217}
      />
      <Composition
        id="Friends"
        component={Friends}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={308}
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
