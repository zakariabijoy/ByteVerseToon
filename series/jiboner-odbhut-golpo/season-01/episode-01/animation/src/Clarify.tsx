import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, Desk } from "./Stage";
export const Clarify = () => {
  const f = useCurrentFrame();
  const reply = f >= 141;
  return (
    <SceneShell panel={1} label="পরদিন • সরাসরি আলোচনা">
      <Actor
        who="manager"
        pose={reply ? 0 : 3}
        x={390}
        y={1640}
        w={760}
        talk={reply}
        absolute={2139 + f}
      />
      <Actor
        who="rafi"
        x={-130}
        y={1690}
        w={800}
        talk={!reply}
        absolute={2139 + f}
      />
      <Desk />
      <Dialogue
        speaker="রাফি"
        text={"চাকরি ছাড়ার কোনো\nসিদ্ধান্ত আমি নিইনি।"}
        until={128}
      />
      <Dialogue
        speaker="ম্যানেজার"
        text={"আগে আমার সঙ্গে কথা বললে\nভুল বোঝাবুঝিটা হতো না।"}
        from={142}
      />
    </SceneShell>
  );
};
