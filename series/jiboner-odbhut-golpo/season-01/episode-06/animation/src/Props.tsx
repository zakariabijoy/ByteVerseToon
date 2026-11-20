import React from "react";
import { useCurrentFrame } from "remotion";
import { progress } from "./Visuals";
export const Spoon = ({
  x,
  y,
  rotate = -12,
  scale = 1,
}: {
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
}) => (
  <svg
    width={58 * scale}
    height={226 * scale}
    viewBox="0 0 58 226"
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `rotate(${rotate}deg)`,
      filter: "drop-shadow(4px 8px 4px #172b4544)",
    }}
  >
    <defs>
      <linearGradient id="spoon-metal">
        <stop stopColor="#506675" />
        <stop offset=".35" stopColor="#e8f0ef" />
        <stop offset=".6" stopColor="#9cabb2" />
        <stop offset="1" stopColor="#d8e0e1" />
      </linearGradient>
    </defs>
    <path
      d="M26 76 C-4 70 -4 13 17 5 Q29 -5 42 6 C64 29 60 65 33 77 L37 213 Q30 231 22 213Z"
      fill="url(#spoon-metal)"
      stroke="#405766"
      strokeWidth="3"
    />
    <ellipse cx="29" cy="35" rx="17" ry="26" fill="#cdd8db" opacity=".6" />
  </svg>
);
export const Tiffin = ({
  x,
  y,
  w = 290,
  open = 0,
  food = "rice",
}: {
  x: number;
  y: number;
  w?: number;
  open?: number;
  food?: "rice" | "bhorta";
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: w * 0.62,
    }}
  >
    <svg
      viewBox="0 0 340 210"
      width="100%"
      height="100%"
      style={{
        overflow: "visible",
        filter: "drop-shadow(0 16px 8px #172b4544)",
      }}
    >
      <defs>
        <linearGradient id="steel">
          <stop stopColor="#627986" />
          <stop offset=".3" stopColor="#e3eaea" />
          <stop offset=".6" stopColor="#a2b2bc" />
          <stop offset="1" stopColor="#4d6473" />
        </linearGradient>
      </defs>
      <path
        d="M26 66 L39 167 Q170 220 301 167 L315 66Z"
        fill="url(#steel)"
        stroke="#455c6c"
        strokeWidth="5"
      />
      <ellipse
        cx="170"
        cy="66"
        rx="145"
        ry="55"
        fill="#d4dfe1"
        stroke="#445e6e"
        strokeWidth="6"
      />
      {open > 0 && (
        <g>
          <ellipse
            cx="170"
            cy="66"
            rx="128"
            ry="43"
            fill={food === "rice" ? "#fff3d1" : "#d6a643"}
          />
          {Array.from({ length: 29 }, (_, i) =>
            food === "rice" ? (
              <ellipse
                key={i}
                cx={70 + ((i * 37) % 198)}
                cy={39 + ((i * 13) % 53)}
                rx="9"
                ry="3.5"
                fill={i % 2 ? "#fff9e8" : "#e9dfbf"}
                transform={`rotate(${i * 11} ${70 + ((i * 37) % 198)} ${39 + ((i * 13) % 53)})`}
              />
            ) : (
              <g key={i}>
                <circle
                  cx={85 + ((i * 47) % 170)}
                  cy={42 + ((i * 13) % 50)}
                  r={5 + (i % 3)}
                  fill={i % 3 === 0 ? "#63814a" : "#e4ba63"}
                />
              </g>
            ),
          )}
        </g>
      )}
      <g
        style={{
          transform: `translateY(${-open * 115}px) rotate(${-open * 22}deg)`,
          transformOrigin: "170px 55px",
          opacity: 1 - open,
        }}
      >
        <ellipse
          cx="170"
          cy="57"
          rx="147"
          ry="55"
          fill="url(#steel)"
          stroke="#445e6e"
          strokeWidth="5"
        />
        <ellipse
          cx="170"
          cy="48"
          rx="113"
          ry="33"
          fill="#becbd0"
          stroke="#e0e8e9"
          strokeWidth="3"
        />
        <rect
          x="145"
          y="26"
          width="50"
          height="23"
          rx="8"
          fill="#5b6f77"
          stroke="#d6e1e4"
          strokeWidth="4"
        />
      </g>
    </svg>
  </div>
);
export const LunchSet = ({
  x = 210,
  y = 1120,
  scale = 1,
  opened = true,
  spoons = true,
  openAt = 0,
}: {
  x?: number;
  y?: number;
  scale?: number;
  opened?: boolean;
  spoons?: boolean;
  openAt?: number;
}) => {
  const f = useCurrentFrame();
  const a = opened ? progress(f, openAt, openAt + 22) : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 680,
        height: 410,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -38,
          top: 60,
          width: 665,
          height: 310,
          borderRadius: "35% 25% 15% 12%",
          background:
            "repeating-linear-gradient(90deg,#b89970 0px,#c7aa82 7px,#b59a75 11px)",
          boxShadow: "0 15px 25px #172b4544",
          transform: `rotate(-4deg)`,
        }}
      />
      <Tiffin x={0} y={30} w={270} open={a} />
      <Tiffin x={290} y={50} w={270} open={a} />
      <Tiffin x={160} y={160} w={210} open={a} food="bhorta" />
      {spoons && (
        <>
          <Spoon x={45} y={155} rotate={-18} scale={0.8} />
          <Spoon x={490} y={175} rotate={17} scale={0.8} />
        </>
      )}
    </div>
  );
};
export const Bottle = ({ x = 530, y = 1250 }: { x?: number; y?: number }) => (
  <svg
    style={{
      position: "absolute",
      left: x,
      top: y,
      filter: "drop-shadow(4px 12px 6px #172b4544)",
    }}
    width="104"
    height="265"
    viewBox="0 0 104 265"
  >
    <rect
      x="32"
      y="0"
      width="40"
      height="25"
      rx="7"
      fill="#3a7c89"
      stroke="#244a5d"
      strokeWidth="4"
    />
    <path
      d="M34 25 L34 48 Q13 59 14 85 L14 235 Q14 256 34 257 L73 257 Q92 254 90 234 L90 84 Q91 61 71 48 L71 25Z"
      fill="#aed4d8dd"
      stroke="#4c8090"
      strokeWidth="4"
    />
    <path
      d="M18 112 Q50 99 86 116 L86 232 Q83 251 68 251 L35 251 Q20 249 19 232Z"
      fill="#71b9c58a"
    />
    <path
      d="M29 73 L29 226"
      stroke="#edffffbb"
      strokeWidth="9"
      strokeLinecap="round"
    />
  </svg>
);
