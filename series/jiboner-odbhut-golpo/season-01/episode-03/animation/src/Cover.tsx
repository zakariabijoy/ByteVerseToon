import React from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop, Actor, Branding } from "./Stage";
export const Cover = () => (
  <AbsoluteFill
    style={{
      background: "#172b45",
      fontFamily: "Nirmala UI",
      color: "#fff5df",
    }}
  >
    <Backdrop panel={0} file="tea-stall.png" />
    <AbsoluteFill
      style={{
        background: "linear-gradient(#172b4555,transparent 60%,#172b45)",
      }}
    />
    <Actor who="sajid" x={580} y={1740} w={650} pose={3} absolute={900} />
    <Actor who="rafi" x={-80} y={1820} w={1000} pose={3} absolute={700} />
    <div
      style={{
        position: "absolute",
        top: 240,
        left: 70,
        fontSize: 42,
        fontWeight: 700,
      }}
    >
      ১০০ টাকার বন্ধুত্ব
    </div>
    <div
      style={{
        position: "absolute",
        top: 330,
        left: 65,
        fontSize: 112,
        fontWeight: 800,
        lineHeight: 1.3,
        textShadow: "0 5px 20px #172b45",
      }}
    >
      মাত্র ১০০ টাকা!
      <br />
      <span style={{ color: "#ffd070" }}>এত হিসাব?</span>
    </div>
    <Branding />
  </AbsoluteFill>
);
