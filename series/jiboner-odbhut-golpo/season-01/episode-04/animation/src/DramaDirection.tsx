import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Editorial contrast follows disrespect -> evidence -> recognition -> dignity.
// Keep the faces clear: emphasis lives in the caption and the held notebook.
export const DramaDirection = () => {
  const f = useCurrentFrame();
  const tension = f < 102 || (f >= 570 && f < 1027) || (f >= 1296 && f < 1350);
  const reveal = f >= 1027 && f < 1080;
  const impact = [32, 63, 588, 1027, 1299].reduce(
    (v, s) =>
      Math.max(v, f >= s && f < s + 7 ? Math.exp(-(f - s) / 2) * 0.14 : 0),
    0,
  );
  const notebook = f >= 805 && f < 878;
  const ink = interpolate(f, [805, 816, 865, 878], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 ${tension ? 230 : 130}px ${tension ? 85 : 35}px #071323${tension ? "85" : "30"}`,
        }}
      />
      {reveal ? (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at 50% 38%,#ffd12d12,transparent 70%)",
          }}
        />
      ) : null}
      {impact > 0 ? (
        <AbsoluteFill style={{ background: `rgba(255,221,159,${impact})` }} />
      ) : null}
      {notebook ? (
        <svg
          width="1080"
          height="1920"
          style={{ position: "absolute", inset: 0, opacity: ink }}
        >
          <ellipse
            cx="540"
            cy="1035"
            rx="319"
            ry="240"
            fill="none"
            stroke="#ffd12d"
            strokeWidth="9"
            strokeDasharray="1800"
            strokeDashoffset={1800 * (1 - Math.min(1, (f - 805) / 16))}
            transform="rotate(-7 540 1035)"
          />
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};
