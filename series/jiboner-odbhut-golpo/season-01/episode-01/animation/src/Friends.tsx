import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Desk, Laptop, Dialogue, Badge } from "./Stage";
export const Friends = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell panel={0} label="সফটওয়্যার কোম্পানি • বিকেল">
      <Actor who="sajid" x={490} y={1620} w={640} absolute={217 + f} />
      <Actor who="rafi" x={-45} y={1690} w={770} absolute={217 + f} />
      <Desk />
      <Laptop x={360} y={1480} />
      <Badge text="রাফি ও সাজিদ" />
      <Dialogue text="অফিসের সবচেয়ে কাছের মানুষ।" from={135} until={224} />
    </SceneShell>
  );
};
