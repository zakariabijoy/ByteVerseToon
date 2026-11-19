import React from "react";
import { Actor, Pair, SceneFrame, type SceneProps } from "./StoryStage";
import { ReleasePaper, Table, LaptopEvidence } from "./StoryProps";
export const OpeningScene = ({ f, q, kind }: SceneProps) => {
  let content: React.ReactNode;
  if (kind === "warning")
    content =
      q < 49 ? (
        <>
          <Actor who="sajid" f={f} pose={3} />
          <Table top={1430} />
        </>
      ) : (
        <ReleasePaper q={q - 49} mode="turn" />
      );
  else if (kind === "sajid") content = <Actor who="sajid" f={f} pose={3} />;
  else if (kind === "reaction" || kind === "rafi")
    content = <Actor who="rafi" f={f} pose={3} />;
  else if (kind === "promotion")
    content = (
      <>
        <Actor who="rafi" f={f} pose={0} />
        <div
          style={{
            position: "absolute",
            left: 105,
            top: 1180,
            background: "#ffcf48",
            padding: "16px 36px",
            color: "#172b45",
            fontSize: 45,
            fontWeight: 900,
            transform: "rotate(-3deg)",
            boxShadow: "6px 9px #172b4566",
          }}
        >
          TEAM LEAD · রাফি আহমেদ
        </div>
      </>
    );
  else if (kind === "mayaWork")
    content =
      q < 35 ? (
        <Actor who="maya" f={f} pose={2} />
      ) : (
        <LaptopEvidence q={q - 35} mode="work" />
      );
  else if (kind === "turn" || kind === "approval")
    content = (
      <ReleasePaper q={q} mode={kind === "turn" ? "turn" : "approval"} />
    );
  else content = <Pair f={f} />;
  return (
    <SceneFrame f={f} q={q}>
      {content}
    </SceneFrame>
  );
};
