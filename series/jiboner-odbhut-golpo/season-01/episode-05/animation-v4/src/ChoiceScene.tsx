import React from "react";
import { Actor, SceneFrame, type SceneProps } from "./StoryStage";
import { IncomingCall, CallConversation, CallBadge } from "./PhoneCall";
import {
  ReleasePaper,
  PhoneMessage,
  LaptopEvidence,
  Table,
} from "./StoryProps";
export const ChoiceScene = ({ f, q, kind }: SceneProps) => {
  const t = f / 30;
  if (t >= 54.14 && t < 55.94) return <IncomingCall f={f} />;
  if ((t >= 55.94 && t < 60.6) || (t >= 71.3 && t < 80.26))
    return <CallConversation f={f} />;
  let content: React.ReactNode;
  if (kind === "ring") content = <PhoneMessage q={q} call />;
  else if (kind === "manager")
    content =
      q > 65 ? (
        <Actor who="rafi" f={f} pose={3} />
      ) : (
        <>
          <Actor who="manager" f={f} pose={2} w={1280} x={-120} y={2150} />
          <Table top={1430} />
        </>
      );
  else if (kind === "form") content = <ReleasePaper q={q} mode="approval" />;
  else if (kind === "write" || kind === "sign")
    content = <ReleasePaper q={q} mode={kind} />;
  else if (kind === "maya") content = <Actor who="maya" f={f} pose={2} />;
  else if (kind === "solution")
    content =
      q < 76 ? (
        <Actor who="rafi" f={f} pose={2} />
      ) : (
        <LaptopEvidence q={q - 76} mode="demo" />
      );
  else if (kind === "demo") content = <LaptopEvidence q={q} mode="demo" />;
  else content = <Actor who="rafi" f={f} pose={3} />;
  return (
    <SceneFrame f={f} q={q} panel={kind === "manager" ? 1 : 0}>
      {content}
      {t >= 60.6 && t < 71.3 ? <CallBadge f={f} compact /> : null}
    </SceneFrame>
  );
};
