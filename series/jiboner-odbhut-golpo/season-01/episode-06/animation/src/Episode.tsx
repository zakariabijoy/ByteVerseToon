import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Opening, Handoff } from "./Office";
import { CallScene } from "./Calls";
import { Discovery, Memory } from "./Food";
import { Reunion } from "./Reunion";
import { Branding } from "./Visuals";
import { Captions } from "./Captions";
export const Episode = () => {
  const { fps } = useVideoConfig();
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "#172b45",
        fontFamily: "Nirmala UI",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("voiceover-original.wav")} />
      <Audio src={staticFile("score.wav")} />
      <Audio src={staticFile("effects.wav")} />
      <Sequence
        name="গার্ডের কথা ও রাফির ধাক্কা"
        from={0}
        durationInFrames={251}
        premountFor={fps}
      >
        <Opening />
      </Sequence>
      <Sequence
        name="তিনটি মিসড কল ও রূঢ় উত্তর"
        from={251}
        durationInFrames={657}
        premountFor={fps}
      >
        <CallScene />
      </Sequence>
      <Sequence
        name="কাপড়ের ব্যাগ ও দুটো চামচ"
        from={908}
        durationInFrames={423}
        premountFor={fps}
      >
        <Discovery />
      </Sequence>
      <Sequence
        name="সকালের কথাটি মা ভোলেননি"
        from={1331}
        durationInFrames={386}
        premountFor={fps}
      >
        <Memory />
      </Sequence>
      <Sequence
        name="ফিরতি কল ও মায়ের অভিমান"
        from={1717}
        durationInFrames={425}
        premountFor={fps}
      >
        <CallScene second />
      </Sequence>
      <Sequence
        name="মিটিংয়ের দায়িত্ব ও সাজিদের উত্তর"
        from={2142}
        durationInFrames={428}
        premountFor={fps}
      >
        <Handoff />
      </Sequence>
      <Sequence
        name="বাসস্ট্যান্ডে দুজনের দুপুর"
        from={2570}
        durationInFrames={596}
        premountFor={fps}
      >
        <Reunion />
      </Sequence>
      <Captions frame={f} />
      <Branding />
    </AbsoluteFill>
  );
};
