import React from "react";
import { AbsoluteFill } from "remotion";
import { Puppet } from "./Puppet";
import { Backdrop } from "./Stage";
import type { Cast } from "./rig-data";
import timing from "./dialogue-timing.json";
import { Table, tween } from "./StoryProps";
export const Actor = ({
  who,
  f,
  pose = 0,
  x = -160,
  w = 1320,
  y = 2130,
  flip = false,
  talkPose = pose,
}: {
  who: Cast;
  f: number;
  pose?: number;
  x?: number;
  w?: number;
  y?: number;
  flip?: boolean;
  talkPose?: number;
}) => {
  const talk = timing.cues.some(
    (c) => c.who === who && f / 30 >= c.start && f / 30 < c.end,
  );
  return (
    <Puppet
      who={who}
      pose={pose}
      talkPose={talkPose}
      x={x}
      w={w}
      y={y}
      flip={flip}
      absolute={f}
      talk={talk}
      gesture={talk ? 1.05 : 0.48}
    />
  );
};
export const Pair = ({
  f,
  other = "maya",
  warm = false,
}: {
  f: number;
  other?: "maya" | "sajid";
  warm?: boolean;
}) => (
  <>
    <Actor who="rafi" f={f} x={-215} w={930} y={1880} pose={warm ? 0 : 3} />
    <Actor
      who={other}
      f={f}
      x={415}
      w={850}
      y={1820}
      pose={other === "sajid" ? 1 : warm ? 0 : 2}
      flip
    />
    <Table top={1430} />
  </>
);
export const SceneFrame = ({
  q,
  children,
  tense = true,
  panel = 0,
}: {
  f: number;
  q: number;
  children: React.ReactNode;
  tense?: boolean;
  panel?: number;
}) => {
  const pulse = tense ? Math.exp(-q / 10) * 0.018 : 0;
  return (
    <AbsoluteFill>
      <Backdrop panel={panel} />
      <AbsoluteFill
        style={{
          transform: `scale(${1 + tween(q, 0, 130, 0, 0.035) + pulse})`,
          transformOrigin: "50% 53%",
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: tense
            ? "linear-gradient(#07132311,transparent 45%,#071323cc)"
            : "linear-gradient(#ffd07818,transparent 45%,#071323b0)",
          boxShadow: tense ? "inset 0 0 170px 40px #07132355" : "none",
        }}
      />
    </AbsoluteFill>
  );
};
export type SceneProps = { f: number; q: number; kind: string };
