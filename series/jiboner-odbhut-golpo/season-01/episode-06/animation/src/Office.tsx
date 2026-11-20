import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Puppet } from "./Puppet";
import {
  SceneBackground,
  Desk,
  Laptop,
  Location,
  Emphasis,
  progress,
} from "./Visuals";
import { LunchSet } from "./Props";
export const Opening = () => {
  const f = useCurrentFrame(),
    t = f / 30;
  return (
    <AbsoluteFill>
      <SceneBackground place="office" zoom={1.04} />
      <Location text="অফিস • এখন" />
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateY(${progress(f, 125, 185) * -12}px) scale(${1 + progress(f, 125, 185) * 0.035})`,
          transformOrigin: "48% 50%",
        }}
      >
        <Puppet
          who="rafi"
          pose={t < 4.46 ? 3 : 2}
          talkPose={2}
          x={100}
          y={1430}
          w={900}
          absolute={f}
          gesture={0.35}
        />
        <Desk top={1400} />
        <Laptop x={285} y={1245} w={560} />
      </div>
      {t < 4.46 ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 70,
              top: 310,
              fontSize: 27,
              fontWeight: 700,
              color: "#f3e8d4",
              background: "#172b45c9",
              padding: "10px 18px",
              borderRadius: 8,
            }}
          >
            গার্ড • দরজার বাইরে
          </div>
          {t > 2.3 && <Emphasis from={69}>যেন না ডাকি!</Emphasis>}
        </>
      ) : t > 6.7 ? (
        <Emphasis from={201} tone="cyan">
          মা? কখন?
        </Emphasis>
      ) : null}
    </AbsoluteFill>
  );
};
export const Handoff = () => {
  const f = useCurrentFrame(),
    t = f / 30 + 71.4,
    a = Math.round(t * 30);
  const close = t > 79.96;
  return (
    <AbsoluteFill>
      <SceneBackground place="office" />
      <Location text="অফিস • সিদ্ধান্ত" />
      {close ? (
        <>
          <Puppet
            who="sajid"
            pose={3}
            talkPose={1}
            x={110}
            y={1440}
            w={890}
            absolute={a}
            talk={t > 83.44}
            gesture={0.25}
          />
          <Desk top={1430} />
          <div
            style={{
              position: "absolute",
              top: 1230,
              left: 90,
              transform: "scale(.72)",
              transformOrigin: "top left",
            }}
          >
            <LunchSet x={0} y={0} opened={false} />
          </div>
          {t > 83.44 && (
            <Emphasis from={Math.round((83.44 - 71.4) * 30)} tone="cyan">
              এবার ফোনটা ধরিস।
            </Emphasis>
          )}
        </>
      ) : (
        <>
          <Puppet
            who="rafi"
            pose={2}
            talkPose={2}
            x={-60}
            y={1400}
            w={690}
            absolute={a}
            gesture={0.3}
          />
          <Puppet
            who="sajid"
            pose={3}
            talkPose={3}
            x={520}
            y={1410}
            w={650}
            absolute={a}
            flip
            gesture={0.2}
          />
          <Desk top={1390} />
          <Laptop x={340} y={1210} w={410} meeting />
          {t < 74.5 && <Emphasis from={0}>মিটিং শুরু!</Emphasis>}
          {t > 77.04 && (
            <Emphasis from={169} tone="cream">
              দশ মিনিট লাগবে।
            </Emphasis>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
