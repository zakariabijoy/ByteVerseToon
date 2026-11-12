import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue } from "./Stage";
export const Maya = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell
      panel={2}
      label="অফিসের বিরতি"
      shot={
        f < 147
          ? { scale: 1.04, x: 0, y: -58 }
          : { scale: 1.075, x: -12, y: -60, origin: "72% 62%" }
      }
    >
      <Actor
        who="rafi"
        pose={3}
        x={485}
        y={1685}
        w={760}
        flip
        absolute={1845 + f}
      />
      <Actor
        who="maya"
        pose={f < 76 ? 2 : 0}
        x={-85}
        y={1665}
        w={740}
        talk={f >= 76 && f < 230}
        absolute={1845 + f}
        enter
        gesture={0.65}
      />
      <Dialogue
        speaker="মায়া"
        text="সাজিদ যা করেছে, সেটা ভুল।"
        from={77}
        until={145}
      />
      <Dialogue
        speaker="মায়া"
        text={"কিন্তু তুমি ম্যানেজারের সঙ্গে\nসরাসরি কথা বলোনি কেন?"}
        from={147}
        until={229}
      />
      <Dialogue text="রাফি চুপ করে রইল।" from={247} />
    </SceneShell>
  );
};
