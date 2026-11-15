import React from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop, Actor, Branding } from "./Stage";
import { Teacher } from "./Scenes";
export const Cover = () => (
  <AbsoluteFill
    style={{
      fontFamily: "Nirmala UI",
      background: "#172b45",
      color: "#fff7e5",
    }}
  >
    <Backdrop panel={0} file="tea-stall.png" />
    <AbsoluteFill
      style={{ background: "linear-gradient(#172b4555,transparent,#172b45)" }}
    />
    <Actor who="sajid" x={510} y={1820} w={720} pose={3} absolute={1320} />
    <Teacher a={1750} pose={3} x={60} y={1980} w={480} />
    <div
      style={{
        position: "absolute",
        left: 65,
        right: 105,
        top: 250,
        fontSize: 97,
        fontWeight: 800,
        lineHeight: 1.35,
        textShadow: "0 5px 20px #172b45",
      }}
    >
      বিল দিতে
      <br />
      <span style={{ color: "#ffd070" }}>পারবে না?</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 570,
        fontSize: 40,
        fontWeight: 700,
      }}
    >
      যাকে সবাই গরিব ভাবত
    </div>
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 1730,
        height: 190,
        background: "linear-gradient(#bd8f5b 0 12px,#765035 14px,#352b28 90px)",
      }}
    />
    <Branding />
  </AbsoluteFill>
);
