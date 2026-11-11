import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, Desk, Laptop } from "./Stage";
export const Secret = () => {
  const f = useCurrentFrame();
  const sajid = f >= 237;
  return (
    <SceneShell panel={0} zoom={1.06}>
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
        absolute={525 + f}
      />
      <Desk />
      <Laptop x={sajid ? -160 : 330} y={1530} />
      <Dialogue
        speaker="রাফি"
        text={"একটা কোম্পানি থেকে\nভালো অফার পেয়েছি।"}
        until={97}
      />
      <Dialogue
        speaker="রাফি"
        text={"তবে এখনো সিদ্ধান্ত নিইনি।\nকাউকে বলিস না।"}
        from={104}
        until={224}
      />
      <Dialogue
        speaker="সাজিদ"
        text={"আরে পাগল!\nআমাকে বিশ্বাস করতে পারিস।"}
        from={238}
        gold
      />
    </SceneShell>
  );
};
