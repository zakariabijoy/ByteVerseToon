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
    <Backdrop panel={0} />
    <AbsoluteFill
      style={{
        background: "linear-gradient(#172b4566,transparent 70%,#172b45)",
      }}
    />
    <Actor who="sajid" x={580} y={1740} w={650} flip absolute={400} />
    <Actor who="rafi" x={-90} y={1840} w={1000} pose={3} absolute={300} />
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 80,
        top: 215,
        fontSize: 42,
        fontWeight: 700,
      }}
    >
      ভালো মানুষ হওয়াটাই কি ভুল?
    </div>
    <div
      style={{
        position: "absolute",
        left: 65,
        top: 320,
        fontSize: 118,
        lineHeight: 1.25,
        fontWeight: 800,
        textShadow: "0 5px 20px #172b45",
      }}
    >
      সবাইকে
      <br />
      <span style={{ color: "#ffd070" }}>হ্যাঁ বলবেন?</span>
    </div>
    <Branding />
  </AbsoluteFill>
);
