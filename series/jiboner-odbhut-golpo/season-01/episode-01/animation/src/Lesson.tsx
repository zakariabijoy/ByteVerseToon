import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, ease } from "./Stage";
export const Lesson = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell panel={3}>
      <Actor
        who="rafi"
        pose={f < 120 ? 3 : 0}
        previousPose={f >= 120 ? 3 : undefined}
        changeAt={f >= 120 ? 120 : undefined}
        x={f < 120 ? -110 : 40}
        y={1800}
        w={f < 120 ? 1100 : 1000}
        absolute={2426 + f}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg,rgba(10,24,38,.6),transparent 60%)",
        }}
      />
      <Dialogue text="সবাইকে সব কথা বলা যায় না।" from={62} until={120} gold />
      <Dialogue
        text={"নিজের ভবিষ্যৎ নিয়ে অন্য কেউ\nসিদ্ধান্ত নেওয়ার আগে…"}
        from={123}
        until={210}
      />
      <Dialogue
        text={"নিজের কথাটা\nনিজেকেই বলতে হয়।"}
        from={224}
        until={286}
        gold
      />
      <Dialogue text={"কারণ, জীবন কখনোই\nএতটা সহজ নয়।"} from={287} />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 255,
          fontSize: 38,
          fontWeight: 700,
          lineHeight: 1.5,
          opacity: ease(f, 270, 290),
          textShadow: "0 3px 12px #172b45",
        }}
      >
        ছোট সিদ্ধান্ত,
        <br />
        <span style={{ color: "#ffd070" }}>বড় পরিণতি।</span>
      </div>
    </SceneShell>
  );
};
