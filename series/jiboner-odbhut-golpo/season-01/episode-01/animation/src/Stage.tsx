import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import envelope from "./voice-envelope.json";
export type Cast = "rafi" | "sajid" | "maya" | "manager";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const ease = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], clamp);
export const amplitude = (absolute: number) =>
  envelope[Math.min(envelope.length - 1, Math.max(0, absolute))] || 0;
export const Backdrop: React.FC<{ panel: number; zoom?: number }> = ({
  panel,
  zoom = 1,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#172B45" }}>
      <div
        style={{
          position: "absolute",
          width: 1440,
          height: 1920,
          left: -180,
          transform: `scale(${zoom + f * 0.000025}) translateX(${Math.sin(f / 170) * 7}px)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("backgrounds.png")}
            style={{
              position: "absolute",
              height: "100%",
              width: "400%",
              maxWidth: "none",
              left: `-${panel * 100}%`,
            }}
          />
        </div>
      </div>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,rgba(10,24,38,.18),transparent 33%,transparent 65%,rgba(10,24,38,.72))",
        }}
      />
    </AbsoluteFill>
  );
};
// Limited cutout acting; pose changes are not phoneme-aligned lip sync.
export const Actor: React.FC<{
  who: Cast;
  pose?: number;
  x: number;
  y?: number;
  w?: number;
  talk?: boolean;
  absolute?: number;
  flip?: boolean;
  lean?: number;
  enter?: boolean;
}> = ({
  who,
  pose = 0,
  x,
  y = 1640,
  w = 700,
  talk = false,
  absolute = 0,
  flip = false,
  lean = 0,
  enter = false,
}) => {
  const f = useCurrentFrame();
  const index = talk ? 1 : pose;
  const h = (w * 4) / 3;
  const nod =
    (talk
      ? Math.sin(f * 0.14) * (0.5 + amplitude(absolute) * 1.5)
      : Math.sin(f * 0.031) * 0.35) + lean;
  const image = (
    <Img
      src={staticFile(`${who}.png`)}
      style={{
        position: "absolute",
        left: `-${index * 100}%`,
        top: 0,
        width: "400%",
        height: "100%",
        maxWidth: "none",
      }}
    />
  );
  return (
    <div
      style={{
        position: "absolute",
        left: x + (enter ? (1 - ease(f, 0, 18)) * 75 : 0),
        top: y - h + Math.sin(f * 0.044 + (who === "rafi" ? 0 : 2)) * 2,
        width: w,
        height: h,
        opacity: enter ? ease(f, 0, 9) : 1,
        transform: `scaleX(${flip ? -1 : 1}) rotate(${lean * 0.2}deg)`,
        transformOrigin: "50% 95%",
        filter: "drop-shadow(0 12px 14px rgba(15,22,30,.22))",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          clipPath: "inset(34% 0 0 0)",
        }}
      >
        {image}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          clipPath: "inset(0 0 64% 0)",
          transform: `rotate(${nod}deg)`,
          transformOrigin: "49% 34%",
        }}
      >
        {image}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          clipPath: "inset(34% 0 64% 0)",
        }}
      >
        {image}
      </div>
    </div>
  );
};
export const SceneShell: React.FC<{
  panel: number;
  children: React.ReactNode;
  label?: string;
  zoom?: number;
}> = ({ panel, children, label, zoom }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        fontFamily: '"Nirmala UI", "Hind Siliguri", sans-serif',
        color: "#fff8e9",
        overflow: "hidden",
      }}
    >
      <Backdrop panel={panel} zoom={zoom} />
      {children}
      {label && (
        <div
          style={{
            position: "absolute",
            left: 66,
            top: 205,
            fontSize: 30,
            fontWeight: 600,
            color: "#fff5df",
            textShadow: "0 2px 8px #172B45",
            opacity: 1 - ease(f, 75, 100),
          }}
        >
          {label}
        </div>
      )}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          background: "#172B45",
          opacity: 1 - ease(f, 0, 7),
        }}
      />
    </AbsoluteFill>
  );
};
export const Dialogue: React.FC<{
  text: string;
  speaker?: string;
  from?: number;
  until?: number;
  gold?: boolean;
}> = ({ text, speaker, from = 0, until = 1e5, gold = false }) => {
  const f = useCurrentFrame();
  if (f < from || f >= until) return null;
  const a = ease(f, from, from + 7);
  return (
    <div
      style={{
        position: "absolute",
        left: 68,
        right: 108,
        bottom: 280,
        transform: `translateY(${(1 - a) * 18}px)`,
        opacity: a,
        textShadow: "0 3px 8px rgba(0,0,0,.75)",
      }}
    >
      {speaker && (
        <div
          style={{
            fontSize: 29,
            fontWeight: 700,
            color: "#ffcc69",
            marginBottom: 14,
          }}
        >
          {speaker}
        </div>
      )}
      <div
        style={{
          fontSize: 54,
          lineHeight: 1.45,
          fontWeight: 700,
          color: gold ? "#ffd581" : "#fffaf0",
          whiteSpace: "pre-line",
          textShadow:
            "-2px -2px 0 rgba(11,24,38,.75),2px 2px 0 rgba(11,24,38,.75),0 4px 18px #0b1826",
        }}
      >
        {text}
      </div>
    </div>
  );
};
export const Laptop: React.FC<{ x?: number; y?: number }> = ({
  x = 290,
  y = 1430,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: 490,
      height: 290,
      transform: "perspective(900px) rotateX(-4deg) rotateY(-10deg)",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: "0 0 20px",
        background: "linear-gradient(125deg,#a6b4bd,#607586)",
        border: "8px solid #394e60",
        borderRadius: 19,
        boxShadow: "0 18px 30px #172B4555",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 44,
          height: 44,
          left: 215,
          top: 100,
          borderRadius: 12,
          background: "#d7e2e7",
        }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        height: 20,
        width: 530,
        left: -20,
        bottom: 0,
        borderRadius: "0 0 22px 22px",
        background: "#a6b5bf",
        borderBottom: "7px solid #41596b",
      }}
    />
  </div>
);
export const Desk = () => (
  <div
    style={{
      position: "absolute",
      left: -50,
      right: -50,
      top: 1690,
      height: 230,
      background:
        "linear-gradient(#c5925a 0%,#a5683e 13%,#6e432c 15%,#805234 100%)",
      boxShadow: "0 -8px 20px #18263833",
    }}
  />
);
export const Badge: React.FC<{ text: string; from?: number }> = ({
  text,
  from = 0,
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 76,
        top: 290,
        padding: "15px 25px",
        borderRadius: 8,
        background: "#f3e8d4",
        color: "#172b45",
        fontSize: 35,
        fontWeight: 700,
        opacity: ease(f, from, from + 10),
        transform: `translateY(${(1 - ease(f, from, from + 10)) * 15}px)`,
        boxShadow: "0 8px 28px #172b4533",
      }}
    >
      {text}
    </div>
  );
};
export const Branding = () => (
  <>
    <div
      style={{
        position: "absolute",
        top: 76,
        left: 68,
        right: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textShadow: "0 2px 12px #172b45",
        fontFamily: "Nirmala UI",
        color: "#fff8e9",
      }}
    >
      <div style={{ fontSize: 38, fontWeight: 700 }}>
        জীবনের <span style={{ color: "#ffd070" }}>অদ্ভুত</span> গল্প
      </div>
      <div
        style={{
          fontSize: 25,
          fontWeight: 700,
          border: "1px solid #fff5df88",
          borderRadius: 30,
          padding: "9px 20px",
        }}
      >
        পর্ব ০১
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 68,
        bottom: 133,
        display: "flex",
        alignItems: "center",
        gap: 15,
        opacity: 0.9,
        color: "#fff8e9",
      }}
    >
      <Img
        src={staticFile("byteversetoon-profile.jpg")}
        style={{
          width: 43,
          height: 43,
          borderRadius: "50%",
          border: "2px solid #27dcef",
        }}
      />
      <span
        style={{
          fontFamily: "Arial",
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: 1.1,
        }}
      >
        ByteVerseToon
      </span>
    </div>
  </>
);
