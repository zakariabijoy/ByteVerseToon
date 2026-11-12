import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Desk, Laptop, Badge } from "./Stage";
import { Workstation } from "./Workstation";
export const Friends = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell
      panel={0}
      label="সফটওয়্যার কোম্পানি • বিকেল"
      shot={
        f < 85 ? { scale: 1.025, x: 0, y: -75 } : { scale: 1.05, x: 0, y: -70 }
      }
    >
      <Desk top={f < 85 ? 1620 : 1660} />
      {f < 85 ? (
        <Workstation />
      ) : (
        <>
          <Actor
            who="sajid"
            x={450}
            y={1660}
            w={760}
            flip
            absolute={356 + f}
            enter
          />
          <Actor who="rafi" x={-120} y={1660} w={850} absolute={356 + f} />
          <Laptop x={365} y={1370} />
        </>
      )}
      <Badge text={f < 85 ? "রাফি আহমেদ" : "অফিসের কাছের মানুষ: সাজিদ"} />
    </SceneShell>
  );
};
