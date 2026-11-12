import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, Badge, ease } from "./Stage";
export const Reveal = () => {
  const f = useCurrentFrame();
  const reaction = f < 56 || f >= 149;
  return (
    <SceneShell
      panel={0}
      zoom={1.06}
      shot={
        reaction ? { scale: 1.05, x: 0, y: -30 } : { scale: 1.04, x: 0, y: -45 }
      }
    >
      {reaction ? (
        <Actor
          who="rafi"
          pose={f < 56 ? 2 : 3}
          x={-60}
          y={1790}
          w={1080}
          absolute={1673 + f}
          lean={-1}
        />
      ) : (
        <Actor
          who="sajid"
          pose={2}
          x={90 - ease(f, 56, 149) * 28}
          y={1750}
          w={960}
          absolute={1673 + f}
        />
      )}
      {f >= 56 && f < 149 && <Badge text="নতুন দায়িত্বে: সাজিদ" from={61} />}
      <Dialogue
        text={"দায়িত্ব পেয়েছে\nসাজিদ নিজেই!"}
        from={85}
        until={149}
        gold
      />
    </SceneShell>
  );
};
