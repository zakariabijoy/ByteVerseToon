import React from "react";
import { move } from "./OfficeProps";
export const FileTurn = ({ phase }: { phase: number }) => {
  const paper: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: "#fff7e5",
    border: "4px solid #baa989",
    padding: 50,
    boxSizing: "border-box",
    fontFamily: "Nirmala UI",
    color: "#173349",
    boxShadow: "8px 15px 18px #17334933",
  };
  return (
    <div
      style={{
        position: "absolute",
        left: 135,
        top: 480,
        width: 810,
        height: 930,
        perspective: 1500,
        overflow: "hidden",
        transform: "rotate(-3deg)",
        background: "#9d704b",
        padding: 15,
        borderRadius: 10,
        boxShadow: "15px 25px 25px #17334955",
      }}
    >
      <div style={{ ...paper, inset: 18 }}>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            borderBottom: "4px solid #173349",
            paddingBottom: 28,
          }}
        >
          সম্পন্ন কাজ
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            marginTop: 55,
            background: phase > 22 ? "#ffdf7d" : "transparent",
            padding: 16,
          }}
        >
          মায়া রহমান
        </div>
        <div style={{ fontSize: 38, lineHeight: 2, marginTop: 45 }}>
          ✓ কোড ও পরীক্ষা
          <br />✓ আটকে থাকা সমস্যার সমাধান
          <br />✓ জমার তারিখ সংযুক্ত
        </div>
      </div>
      <div
        style={{
          ...paper,
          inset: 18,
          transformOrigin: "left center",
          transform: `rotateY(${move(phase, 6, 30, 0, -168)}deg)`,
          opacity: 1 - move(phase, 23, 30, 0, 1),
          backfaceVisibility: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 49,
            fontWeight: 900,
            borderBottom: "4px solid #173349",
            paddingBottom: 28,
          }}
        >
          প্রজেক্টের ফাইল
        </div>
        <div style={{ fontSize: 38, color: "#537b85", marginTop: 50 }}>
          কাজ ও জমার রেকর্ড
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: 16,
              marginTop: 60,
              width: `${88 - (i % 2) * 16}%`,
              background: "#a7b3b3",
              borderRadius: 5,
            }}
          />
        ))}
      </div>
    </div>
  );
};
