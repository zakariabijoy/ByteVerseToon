import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, Desk, Laptop } from "./Stage";
export const Secret = () => {
  const f = useCurrentFrame();
  const sajid = f >= 237;
  return (
    <SceneShell
      panel={0}
      zoom={1.06}
      shot={
        sajid
          ? { scale: 1.075, x: -12, y: -55, origin: "72% 60%" }
          : { scale: 1.045, x: 0, y: -50, origin: "35% 62%" }
      }
    >
      <Actor
        who="rafi"
        x={sajid ? -210 : -40}
        y={1695}
        w={sajid ? 770 : 800}
        talk={!sajid}
        absolute={525 + f}
      />
      <Actor
        who="sajid"
        x={sajid ? 265 : 465}
        y={1695}
        w={sajid ? 850 : 680}
        talk={sajid}
        flip={!sajid}
        gaze={sajid ? -2 : 2}
        absolute={525 + f}
      />
      <Desk top={1640} />
      <Laptop x={sajid ? -160 : 330} y={1340} />
      <Dialogue
        speaker="রাফি"
        text={"দোস্ত, একটা কোম্পানি থেকে\nভালো অফার পেয়েছি।"}
        from={51}
        until={140}
      />
      <Dialogue
        speaker="রাফি"
        text={"তবে এখনো সিদ্ধান্ত নিইনি।\nকাউকে বলিস না।"}
        from={149}
        until={224}
      />
      <Dialogue
        speaker="সাজিদ"
        text={"আরে পাগল!\nআমাকে বিশ্বাস করতে পারিস।"}
        from={274}
        gold
      />
    </SceneShell>
  );
};
