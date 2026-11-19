import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Branding } from "./Stage";
import { CaptionDrama } from "./CaptionDrama";
import { OpeningScene } from "./OpeningScene";
import { EvidenceScene } from "./EvidenceScene";
import { ChoiceScene } from "./ChoiceScene";
import { ResolutionScene } from "./ResolutionScene";
import story from "./story-timeline.json";
export const Episode = () => {
  const f = useCurrentFrame(),
    { fps, durationInFrames } = useVideoConfig();
  const t = f / fps,
    shot =
      story.find((s) => t >= s.start && t < s.end) || story[story.length - 1];
  const q = f - shot.start * fps;
  const evidence = story.find((s) => s.kind === "laptopTurn")!.start;
  const choice = story.find((s) => s.kind === "ring")!.start;
  const resolution = story.find((s) => s.kind === "rollback")!.start;
  return (
    <AbsoluteFill
      style={{
        background: "#172b45",
        fontFamily: "Nirmala UI",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("voiceover-edited.wav")} />
      <Audio src={staticFile("story-score-v4.wav")} />
      <Audio src={staticFile("story-effects-v4.wav")} />
      <Sequence
        name="সাজিদের সতর্কতা ও অনুমোদনের শেষ পাতা"
        from={0}
        durationInFrames={Math.round(evidence * fps)}
        premountFor={fps}
      >
        <OpeningScene f={f} q={q} kind={shot.kind} />
      </Sequence>
      <Sequence
        name="পেমেন্টের প্রমাণ ও প্রমোশনের ফাঁদ"
        from={Math.round(evidence * fps)}
        durationInFrames={Math.round(choice * fps) - Math.round(evidence * fps)}
        premountFor={fps}
      >
        <EvidenceScene f={f} q={q} kind={shot.kind} />
      </Sequence>
      <Sequence
        name="চাপের মুখে রাফির সিদ্ধান্ত"
        from={Math.round(choice * fps)}
        durationInFrames={
          Math.round(resolution * fps) - Math.round(choice * fps)
        }
        premountFor={fps}
      >
        <ChoiceScene f={f} q={q} kind={shot.kind} />
      </Sequence>
      <Sequence
        name="সিদ্ধান্তের মূল্য, কমেডি ও কফি"
        from={Math.round(resolution * fps)}
        durationInFrames={durationInFrames - Math.round(resolution * fps)}
        premountFor={fps}
      >
        <ResolutionScene f={f} q={q} kind={shot.kind} />
      </Sequence>
      <CaptionDrama f={f} />
      <Branding />
    </AbsoluteFill>
  );
};
