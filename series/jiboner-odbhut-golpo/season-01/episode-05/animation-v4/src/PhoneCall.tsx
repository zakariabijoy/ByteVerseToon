import React from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop } from "./Stage";
import { Actor } from "./StoryStage";
import { Table, tween } from "./StoryProps";
import timing from "./dialogue-timing.json";
import envelope from "./voice-envelope.json";
const start = 54.14,
  answer = 55.64;
const isTalking = (who: string, t: number) =>
  timing.cues.some((c) => c.who === who && t >= c.start && t < c.end);
export const CallBadge = ({
  f,
  compact = false,
}: {
  f: number;
  compact?: boolean;
}) => {
  const t = f / 30,
    elapsed = Math.max(0, Math.floor(t - answer));
  return (
    <div
      style={{
        position: "absolute",
        left: compact ? 190 : 65,
        right: compact ? 190 : 110,
        top: compact ? 185 : 190,
        background: "#173a3e",
        border: "3px solid #8fc3a0",
        borderRadius: 40,
        padding: compact ? "12px 28px" : "17px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#e8f5df",
        fontSize: compact ? 28 : 35,
        fontWeight: 800,
        boxShadow: "0 7px 17px #07132366",
      }}
    >
      <span>☎ {compact ? "ম্যানেজার · কল চলছে" : "ফোনকল · স্পিকার অন"}</span>
      <span style={{ fontFamily: "Consolas", fontSize: compact ? 27 : 34 }}>
        00:{String(elapsed).padStart(2, "0")}
      </span>
    </div>
  );
};
export const IncomingCall = ({ f }: { f: number }) => {
  const t = f / 30,
    q = (t - start) * 30,
    connected = t >= answer;
  const ripple = tween((t - answer) * 30, -4, 12);
  return (
    <AbsoluteFill>
      <Backdrop panel={0} />
      <Table top={1305} />
      <div
        style={{
          position: "absolute",
          left: 335,
          top: 1280,
          width: 340,
          height: 35,
          background: "#0d1e2e55",
          borderRadius: "50%",
          filter: "blur(12px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 450,
          top: 1250,
          width: 140,
          height: 61,
          background: "linear-gradient(90deg,#526676,#a6b1b3,#526676)",
          border: "4px solid #344857",
          borderRadius: 12,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 270 + (!connected ? Math.sin(q * 1.8) * 1.7 : 0),
          top: 370,
          width: 490,
          height: 925,
          border: "14px solid #344e61",
          borderRadius: 65,
          background: "linear-gradient(160deg,#2d5269,#13283d)",
          boxShadow: "12px 15px 24px #07132377",
          boxSizing: "border-box",
          color: "#fff5df",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 150,
            height: 18,
            borderRadius: 20,
            background: "#0b1b2b",
            margin: "20px auto",
          }}
        />
        <div
          style={{
            marginTop: 40,
            fontSize: 32,
            color: connected ? "#b4deb8" : "#e4d8bf",
          }}
        >
          {connected ? "কল সংযুক্ত" : "ইনকামিং কল"}
        </div>
        <div style={{ fontSize: 57, fontWeight: 900, marginTop: 25 }}>
          ম্যানেজার
        </div>
        <div style={{ fontSize: 27, marginTop: 12, color: "#bbd0d7" }}>
          অফিস
        </div>
        <div
          style={{
            width: 155,
            height: 155,
            borderRadius: "50%",
            background: "#527b85",
            border: "4px solid #9fb5b8",
            fontSize: 88,
            lineHeight: "150px",
            margin: "45px auto 0",
          }}
        >
          ☎
        </div>
        <div style={{ marginTop: 45, fontSize: 30 }}>
          {connected ? "স্পিকার চালু" : "কল আসছে…"}
        </div>
        <div
          style={{
            position: "absolute",
            left: 135,
            top: 685,
            width: 195,
            height: 100,
            borderRadius: 70,
            background: connected ? "#345d59" : "#70a46e",
            border: "3px solid #c2e3b6",
            fontSize: 40,
            fontWeight: 900,
            lineHeight: "92px",
            boxShadow: connected ? "0 0 0 10px #a5d1a133" : "none",
          }}
        >
          {connected ? "সংযুক্ত" : "ধরুন"}
          {t > answer - 0.14 && t < answer + 0.5 ? (
            <div
              style={{
                position: "absolute",
                inset: -10 - 25 * ripple,
                border: "4px solid #c7edb6",
                borderRadius: 90,
                opacity: 1 - ripple,
              }}
            />
          ) : null}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 55,
            left: 0,
            right: 0,
            fontSize: 27,
            color: "#b8cbd0",
          }}
        >
          {connected ? "00:00 · স্পিকার অন" : ""}
        </div>
      </div>
    </AbsoluteFill>
  );
};
const SpeakerPhone = ({ f, who }: { f: number; who: "rafi" | "manager" }) => {
  const active = isTalking(who, f / 30),
    level = envelope[Math.min(envelope.length - 1, f)] || 0;
  return (
    <>
      <Table top={825} />
      <div
        style={{
          position: "absolute",
          left: 99,
          top: 821,
          width: 290,
          height: 154,
          border: "9px solid #354e61",
          borderRadius: 27,
          background: "#162c40",
          boxShadow: "8px 8px 8px #07132366",
          transform: "perspective(900px) rotateX(12deg)",
          boxSizing: "border-box",
          padding: "15px 12px",
        }}
      >
        <div style={{ fontSize: 23, textAlign: "center", color: "#c0dfb7" }}>
          ☎ কল চলছে
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            height: 49,
          }}
        >
          {[0.6, 0.95, 0.75, 1, 0.65, 0.9, 0.55].map((h, i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: active ? 8 + level * h * 33 : 5,
                borderRadius: 5,
                background: active ? "#ffcf48" : "#80ac9c",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 20, textAlign: "center", color: "#a9c3cd" }}>
          স্পিকার অন
        </div>
      </div>
    </>
  );
};
export const CallConversation = ({ f }: { f: number }) => {
  const t = f / 30;
  return (
    <AbsoluteFill style={{ background: "#14273b" }}>
      <Backdrop panel={0} />
      <CallBadge f={f} />
      {(["rafi", "manager"] as const).map((who, i) => {
        const active = isTalking(who, t);
        return (
          <div
            key={who}
            style={{
              position: "absolute",
              left: i === 0 ? 44 : 550,
              top: 315,
              width: 474,
              height: 1000,
              overflow: "hidden",
              border: `${active ? 6 : 3}px solid ${active ? "#ffcf48" : "#718b9c"}`,
              borderRadius: 25,
              boxShadow: "0 12px 20px #07132377",
              background: "#172b45",
            }}
          >
            <Backdrop panel={i} />
            <Actor
              who={who}
              f={f}
              pose={who === "manager" ? 2 : 3}
              talkPose={who === "manager" ? 2 : 3}
              x={who === "manager" ? -170 : -230}
              w={950}
              y={who === "manager" ? 1220 : 1160}
            />
            <div
              style={{
                position: "absolute",
                top: 25,
                left: 25,
                right: 25,
                display: "flex",
                justifyContent: "space-between",
                fontSize: 31,
                fontWeight: 900,
                color: "#fff5df",
                textShadow: "0 3px 7px #071323",
              }}
            >
              <span>{who === "rafi" ? "রাফি" : "ম্যানেজার"}</span>
              <span
                style={{ fontSize: 23, color: active ? "#ffcf48" : "#cfdbdd" }}
              >
                {active ? "বলছেন" : "শুনছেন"}
              </span>
            </div>
            <SpeakerPhone f={f} who={who} />
          </div>
        );
      })}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: "linear-gradient(transparent 66%,#071323b0 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
