import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  interpolate,
  useCurrentFrame,
} from "remotion";
export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const progress = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], clamp);
export const SceneBackground = ({
  place = "office",
  zoom = 1,
}: {
  place?: "office" | "home" | "bus" | "tea";
  zoom?: number;
}) => {
  const f = useCurrentFrame();
  const family = place === "home" || place === "bus";
  const file = family
    ? "family-backgrounds.png"
    : place === "tea"
      ? "tea-stall.png"
      : "backgrounds.png";
  const panels = family ? 2 : place === "tea" ? 1 : 4;
  const panel = place === "home" ? 1 : 0;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#172b45" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${staticFile(file)})`,
          backgroundSize: `${panels * 100}% 100%`,
          backgroundPosition: `${panels === 1 ? 0 : (panel / (panels - 1)) * 100}% 0%`,
          transform: `scale(${zoom + Math.min(f, 300) * 0.000035})`,
          transformOrigin: "50% 55%",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg,#10223750,transparent 35%,transparent 60%,#102237ba)",
        }}
      />
    </AbsoluteFill>
  );
};
export const Branding = () => (
  <>
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 106,
        top: 68,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff8ec",
        textShadow: "0 3px 10px #102237",
        fontFamily: "Nirmala UI",
      }}
    >
      <div style={{ fontSize: 36, fontWeight: 800 }}>
        জীবনের <span style={{ color: "#ffcf64" }}>অদ্ভুত</span> গল্প
      </div>
      <div
        style={{
          fontSize: 25,
          border: "1px solid #fff5",
          borderRadius: 30,
          padding: "8px 16px",
        }}
      >
        পর্ব ০৬
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 130,
        left: 60,
        display: "flex",
        gap: 12,
        alignItems: "center",
        color: "#fff",
        opacity: 0.85,
      }}
    >
      <svg
        width="38"
        height="38"
        style={{ borderRadius: "50%", overflow: "hidden" }}
      >
        <image
          href={staticFile("byteversetoon-profile.jpg")}
          width="38"
          height="38"
        />
      </svg>
      <span style={{ fontFamily: "Arial", fontSize: 23, fontWeight: 700 }}>
        ByteVerseToon
      </span>
    </div>
  </>
);
export const Location = ({ text }: { text: string }) => (
  <div
    style={{
      position: "absolute",
      top: 180,
      left: 62,
      padding: "10px 20px",
      borderRadius: 7,
      background: "#172b45e8",
      border: "1px solid #f3e8d455",
      color: "#f3e8d4",
      fontSize: 28,
      fontWeight: 700,
    }}
  >
    {text}
  </div>
);
export const Emphasis = ({
  children,
  from = 0,
  tone = "gold",
  top = 335,
}: {
  children: React.ReactNode;
  from?: number;
  tone?: "gold" | "cyan" | "cream";
  top?: number;
}) => {
  const f = useCurrentFrame();
  const a = progress(f, from, from + 7);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 70,
        right: 110,
        display: "flex",
        justifyContent: "center",
        opacity: a,
        transform: `translateY(${(1 - a) * 20}px) scale(${0.94 + 0.06 * a})`,
      }}
    >
      <div
        style={{
          background:
            tone === "cyan"
              ? "#7ce6f0"
              : tone === "cream"
                ? "#f3e8d4"
                : "#ffd16c",
          color: "#172b45",
          fontSize: 65,
          lineHeight: 1.3,
          fontWeight: 900,
          padding: "15px 26px",
          borderRadius: 9,
          boxShadow: "0 8px 0 #172b45,0 16px 30px #10223766",
          whiteSpace: "pre-line",
          textAlign: "center",
          maxWidth: 875,
        }}
      >
        {children}
      </div>
    </div>
  );
};
export const Desk = ({ top = 1390 }: { top?: number }) => (
  <div
    style={{
      position: "absolute",
      top,
      left: -50,
      right: -50,
      height: 530,
      background: "linear-gradient(#d3a576,#a9784d 6%,#795134 7%,#8f603b)",
      borderTop: "8px solid #e3bf92",
      boxShadow: "0 -7px 22px #172b4530",
    }}
  />
);
export const Laptop = ({
  x = 280,
  y = 1190,
  w = 540,
  meeting = false,
}: {
  x?: number;
  y?: number;
  w?: number;
  meeting?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: w * 0.45,
      borderRadius: "13px 13px 5px 5px",
      background: "linear-gradient(140deg,#bac8cf,#6d8496)",
      border: "7px solid #354b60",
      boxShadow: "0 15px 20px #172b4555",
    }}
  >
    {meeting ? (
      <div
        style={{ padding: 25, color: "#172b45", fontSize: 35, fontWeight: 800 }}
      >
        CLIENT MEETING
        <div style={{ fontSize: 26, marginTop: 12 }}>শুরু হচ্ছে…</div>
        <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
          {[0, 1, 2].map((k) => (
            <div
              key={k}
              style={{
                width: 65,
                height: 50,
                borderRadius: 8,
                background: "#537b85",
              }}
            />
          ))}
        </div>
      </div>
    ) : (
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "44%",
          width: 48,
          height: 48,
          borderRadius: 15,
          background: "#dce9ed",
        }}
      />
    )}
    <div
      style={{
        position: "absolute",
        bottom: -16,
        left: -26,
        right: -26,
        height: 19,
        background: "#bccad1",
        borderRadius: "0 0 18px 18px",
        borderBottom: "5px solid #4e6577",
      }}
    />
  </div>
);
