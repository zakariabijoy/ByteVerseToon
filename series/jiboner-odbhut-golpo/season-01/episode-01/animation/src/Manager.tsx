import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, Desk } from "./Stage";
export const Manager = () => {
  const f = useCurrentFrame();
  const answer = f >= 140 && f < 330;
  const shock = f >= 330;
  return (
    <SceneShell
      panel={1}
      label="ম্যানেজারের কক্ষ"
      shot={
        shock
          ? { scale: 1.08, x: 20, y: -35, origin: "28% 60%" }
          : answer
            ? { scale: 1.07, x: 0, y: -55, origin: "70% 62%" }
            : { scale: 1.055, x: 0, y: -55, origin: "30% 62%" }
      }
    >
      <Actor
        who="manager"
        pose={answer ? 0 : 2}
        x={answer ? 350 : 550}
        y={1640}
        w={answer ? 850 : 620}
        talk={answer}
        absolute={1197 + f}
      />
      <Actor
        who="rafi"
        pose={shock ? 2 : 3}
        x={shock ? -100 : -180}
        y={1710}
        w={shock ? 1050 : 750}
        talk={f < 125}
        lean={shock ? -1.5 : 0}
        absolute={1197 + f}
      />
      <Desk top={1580} />
      <Dialogue
        speaker="রাফি"
        text="স্যার, হঠাৎ এমন সিদ্ধান্ত কেন?"
        from={55}
        until={130}
      />
      <Dialogue
        speaker="ম্যানেজার"
        text={"শুনলাম তুমি নাকি\nঅন্য কোম্পানিতে চলে যাচ্ছ?"}
        from={179}
        until={252}
      />
      <Dialogue
        speaker="ম্যানেজার"
        text={"তাই দায়িত্বটা\nঅন্য কাউকে দিয়েছি।"}
        from={264}
        until={325}
      />
      <Dialogue text="কথাটা শুধু সাজিদকেই বলেছিল!" from={380} gold />
    </SceneShell>
  );
};
