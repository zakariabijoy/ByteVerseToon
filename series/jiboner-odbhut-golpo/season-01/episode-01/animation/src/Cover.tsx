import React from "react";
import { AbsoluteFill } from "remotion";
import { Actor, Backdrop, Branding } from "./Stage";
export const Cover = () => (
  <AbsoluteFill
    style={{
      background: "#172b45",
      fontFamily: "Nirmala UI",
      color: "#fff8e9",
      overflow: "hidden",
    }}
  >
    <Backdrop panel={0} zoom={1.07} />
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg,rgba(8,24,40,.7),rgba(8,24,40,.12) 65%,rgba(8,24,40,.76))",
      }}
    />
    <div style={{ opacity: 0.8 }}>
      <Actor who="sajid" pose={0} x={590} y={1790} w={650} absolute={0} />
    </div>
    <Actor who="rafi" pose={2} x={-95} y={1855} w={1030} absolute={0} />
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 200,
        fontSize: 39,
        fontWeight: 700,
        textShadow: "0 3px 14px #172b45",
      }}
    >
      যে কথাটা বলা উচিত ছিল না
    </div>
    <div
      style={{
        position: "absolute",
        left: 65,
        top: 285,
        fontSize: 120,
        lineHeight: 1.2,
        fontWeight: 800,
        textShadow: "0 4px 20px #172b45",
      }}
    >
      বিশ্বাসের
      <br />
      <span style={{ color: "#ffd070" }}>মূল্য</span>
    </div>
    <Branding />
  </AbsoluteFill>
);
