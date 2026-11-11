import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, Badge, ease } from "./Stage";
export const Reveal = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell panel={0} zoom={1.08}>
      <Actor
        who="sajid"
        pose={2}
        x={100 - ease(f, 0, 172) * 45}
        y={1740}
        w={960}
        absolute={1673 + f}
      />
      <Badge text="নতুন দায়িত্বে: সাজিদ" from={18} />
      <Dialogue text={"দায়িত্ব পেয়েছে\nসাজিদ নিজেই!"} from={22} gold />
    </SceneShell>
  );
};
