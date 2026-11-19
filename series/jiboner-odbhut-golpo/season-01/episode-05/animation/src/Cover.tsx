import React from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop, Branding } from "./Stage";
import { Puppet } from "./Puppet";
import { Desk } from "./OfficeProps";
export const Cover = () => (
  <AbsoluteFill style={{ background: "#172b45", fontFamily: "Nirmala UI" }}>
    <Backdrop panel={0} />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(#ffd26c33,transparent 55%,#071323dd)",
      }}
    />
    <Puppet who="maya" x={-155} y={1860} w={1120} pose={2} absolute={0} />
    <Puppet who="rafi" x={505} y={1800} w={830} pose={3} absolute={0} />
    <Desk top={1550} />
    <div
      style={{
        position: "absolute",
        left: 65,
        right: 65,
        top: 310,
        fontSize: 120,
        fontWeight: 900,
        lineHeight: 1.45,
        textShadow:
          "-5px -5px #172b45,5px -5px #172b45,-5px 5px #172b45,5px 5px #172b45,0 10px 20px #071323",
        color: "#fff",
      }}
    >
      প্রমোশন পেল
      <br />
      <span
        style={{
          background: "#ffd12d",
          color: "#172b45",
          textShadow: "none",
          padding: "0 20px",
          boxShadow: "0 9px 0 #172b45",
        }}
      >
        অন্যজন
      </span>
    </div>
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 1635,
        right: 90,
        fontSize: 69,
        fontWeight: 900,
        color: "#fff",
        textShadow: "0 4px 8px #071323",
      }}
    >
      কাজটা কার ছিল?
    </div>
    <Branding />
  </AbsoluteFill>
);
