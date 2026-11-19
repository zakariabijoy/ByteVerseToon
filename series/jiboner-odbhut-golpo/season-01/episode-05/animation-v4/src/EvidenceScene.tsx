import React from "react";
import { Actor, Pair, SceneFrame, type SceneProps } from "./StoryStage";
import { LaptopEvidence, ReleasePaper, PhoneMessage } from "./StoryProps";
export const EvidenceScene = ({ f, q, kind }: SceneProps) => {
  let content: React.ReactNode;
  if (kind === "laptopTurn" || kind === "payment")
    content = (
      <LaptopEvidence
        q={kind === "payment" ? q - 15 : q}
        mode={kind === "laptopTurn" ? "ready" : "payment"}
      />
    );
  else if (kind === "reportGreen" || kind === "reportRed")
    content = (
      <LaptopEvidence q={q} mode={kind === "reportRed" ? "red" : "green"} />
    );
  else if (kind === "notification" || kind === "message")
    content = <PhoneMessage q={q} />;
  else if (kind === "name" || kind === "trap")
    content = <ReleasePaper q={q} mode="name" />;
  else if (kind === "refusal")
    content =
      q < 38 ? (
        <Actor who="maya" f={f} pose={2} />
      ) : (
        <ReleasePaper q={q - 38} mode="refused" />
      );
  else if (kind === "maya") content = <Actor who="maya" f={f} pose={2} />;
  else if (kind === "rafi" || kind === "reaction")
    content = <Actor who="rafi" f={f} pose={3} />;
  else content = <Pair f={f} />;
  return (
    <SceneFrame f={f} q={q}>
      {content}
    </SceneFrame>
  );
};
