import React from "react";
import { Actor, Pair, SceneFrame, type SceneProps } from "./StoryStage";
import { PromotionMail, Coffee } from "./StoryProps";
export const ResolutionScene = ({ f, q, kind }: SceneProps) => {
  let content: React.ReactNode;
  if (kind === "rollback")
    content =
      q < 58 ? <PromotionMail q={q} /> : <Actor who="rafi" f={f} pose={3} />;
  else if (kind === "sajid") content = <Actor who="sajid" f={f} pose={1} />;
  else if (kind === "twoSajid") content = <Pair f={f} other="sajid" />;
  else if (kind === "joke") content = <Actor who="rafi" f={f} pose={0} />;
  else if (kind === "coffee")
    content = q < 25 ? <Pair f={f} warm /> : <Coffee q={q - 25} />;
  else if (kind === "warmMaya")
    content =
      q < 60 ? <Actor who="maya" f={f} pose={0} /> : <Pair f={f} warm />;
  else content = <Actor who="rafi" f={f} pose={0} />;
  return (
    <SceneFrame f={f} q={q} tense={kind === "rollback"}>
      {content}
    </SceneFrame>
  );
};
