import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, Desk, Laptop, ease } from "./Stage";
export const Removal = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell panel={0} label="পরদিন • অফিস">
      <Actor
        who="rafi"
        pose={f < 70 ? 0 : f < 180 ? 2 : 3}
        x={f < 180 ? -95 : -190}
        y={1700}
        w={f < 180 ? 900 : 1080}
        absolute={899 + f}
      />
      <Desk />
      <Laptop x={f < 180 ? 425 : 560} y={1480} />
      <div
        style={{
          position: "absolute",
          left: 510,
          top: 410,
          width: 380,
          background: "#f3e8d4",
          borderRadius: 12,
          padding: 28,
          color: "#172b45",
          opacity: ease(f, 12, 25),
          transform: `translateY(${(1 - ease(f, 12, 25)) * 25}px)`,
          boxShadow: "0 12px 40px #172b4544",
        }}
      >
        <div
          style={{
            fontSize: 23,
            letterSpacing: 2,
            fontFamily: "Arial",
            fontWeight: 700,
          }}
        >
          PROJECT TEAM
        </div>
        <div style={{ height: 2, background: "#d5c9ae", margin: "20px 0" }} />
        <div
          style={{
            fontSize: 37,
            textDecoration: "line-through",
            opacity: 0.45,
          }}
        >
          রাফি আহমেদ
        </div>
        <div style={{ fontSize: 31, color: "#a75436", marginTop: 15 }}>
          দায়িত্ব পরিবর্তন
        </div>
      </div>
      <Dialogue
        text={"গুরুত্বপূর্ণ প্রজেক্ট থেকে\nসরিয়ে দেওয়া হয়েছে!"}
        from={20}
        until={145}
      />
      <Dialogue text="যার জন্য এত দিনের পরিশ্রম…" from={165} />
    </SceneShell>
  );
};
