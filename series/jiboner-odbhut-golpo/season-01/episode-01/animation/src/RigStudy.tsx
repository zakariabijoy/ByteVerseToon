import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";

// Production calibration view; rendered locally to place facial/joint controls.
export const RigStudy = ({
  body = false,
  heads = false,
}: {
  body?: boolean;
  heads?: boolean;
}) => {
  const pose = body ? 1 : Math.floor(useCurrentFrame() / 30);
  return (
    <AbsoluteFill
      style={{
        background: "#b6c6ca",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }}
    >
      {["rafi", "sajid", "maya", "manager"].map((who, i) => (
        <div
          key={who}
          style={{
            position: "relative",
            overflow: "hidden",
            border: "2px solid #172b45",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 15,
              left: 15,
              font: "24px Arial",
              color: "#172b45",
              zIndex: 3,
            }}
          >
            {who} • pose {pose}
          </div>
          <svg
            viewBox={`0 0 543 ${body ? 724 : 360}`}
            style={{
              width: 600,
              height: body ? 800 : 400,
              position: "absolute",
              top: 35,
              left: 0,
            }}
          >
            <image
              href={staticFile(heads ? "talking-heads-v2.png" : `${who}.png`)}
              width={2172}
              height={724}
              x={-543 * (heads ? i : pose)}
            />
            {Array.from({ length: 10 }, (_, n) => (
              <g key={n} opacity={0.45}>
                <line
                  x1={n * 60}
                  y1={0}
                  x2={n * 60}
                  y2={360}
                  stroke="#a93434"
                />
                <text x={n * 60 + 2} y={345} fontSize={14}>
                  {n * 60}
                </text>
              </g>
            ))}
            {Array.from({ length: body ? 13 : 6 }, (_, n) => (
              <g key={n} opacity={0.45}>
                <line
                  x1={0}
                  y1={n * 60}
                  x2={543}
                  y2={n * 60}
                  stroke="#a93434"
                />
                <text x={5} y={n * 60 + 15} fontSize={14}>
                  {n * 60}
                </text>
              </g>
            ))}
          </svg>
        </div>
      ))}
    </AbsoluteFill>
  );
};
export const RigBodyStudy = () => <RigStudy body />;
export const RigHeadStudy = () => <RigStudy body heads />;
