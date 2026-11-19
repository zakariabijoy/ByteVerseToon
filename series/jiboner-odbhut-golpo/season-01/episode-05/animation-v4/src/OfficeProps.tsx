import React from "react";
import { interpolate } from "remotion";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const move = (f: number, a: number, b: number, x: number, y: number) =>
  interpolate(f, [a, b], [x, y], clamp);
export const Desk = ({ top = 1460 }: { top?: number }) => (
  <div
    style={{
      position: "absolute",
      left: -100,
      right: -100,
      top,
      height: 700,
      background: "linear-gradient(#d8b58c 0 18px,#956a48 20px,#593e30 350px)",
      borderTop: "5px solid #e9cea3",
      boxShadow: "0 -10px 35px #172b4555",
    }}
  />
);
const Svg = ({ children }: { children: React.ReactNode }) => (
  <svg
    width="1080"
    height="1920"
    viewBox="0 0 1080 1920"
    style={{ position: "absolute", inset: 0 }}
  >
    <defs>
      <linearGradient id="box5" x2="0" y2="1">
        <stop stopColor="#e5b36a" />
        <stop offset="1" stopColor="#a05b36" />
      </linearGradient>
      <linearGradient id="wood5" x2="0" y2="1">
        <stop stopColor="#d1ad87" />
        <stop offset="1" stopColor="#8d674a" />
      </linearGradient>
    </defs>
    {children}
  </svg>
);
// Tight object inserts and intact cast reactions replace the rejected hand drawings.
export const SweetBox = ({ phase = 0 }: { phase?: number }) => (
  <Svg>
    <path d="M-60 1230L1130 1230 1150 1715-70 1715Z" fill="url(#wood5)" />
    <path
      d="M0 1295L1080 1295M0 1405L1080 1405M0 1555L1080 1555"
      stroke="#a37b57"
      strokeWidth="3"
      opacity=".4"
    />
    <g
      transform={`translate(0,${phase < 38 ? Math.sin(phase * 0.12) * 2 : 0})`}
    >
      <ellipse cx="541" cy="1390" rx="365" ry="28" fill="#4b34274f" />
      <path
        d="M130 1080L860 1080 965 1202 235 1202Z"
        fill="#fff0c6"
        stroke="#795439"
        strokeWidth="6"
      />
      <path
        d="M130 1080L235 1202 235 1380 130 1260Z"
        fill="#b37441"
        stroke="#795439"
        strokeWidth="6"
      />
      <path
        d="M235 1202L965 1202 965 1380 235 1380Z"
        fill="url(#box5)"
        stroke="#795439"
        strokeWidth="6"
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <ellipse
            cx={265 + i * 115}
            cy="1150"
            rx="46"
            ry="35"
            fill="#eeb64d"
            stroke="#b27c2b"
            strokeWidth="3"
          />
          <path
            d={`M${240 + i * 115} 1141q21-20 42-4`}
            stroke="#ffe09a"
            strokeWidth="6"
            fill="none"
          />
        </g>
      ))}
      <path
        d="M250 1230L950 1230M250 1354L950 1354"
        stroke="#f7d494"
        strokeWidth="3"
      />
      <text
        x="600"
        y="1310"
        textAnchor="middle"
        fontFamily="Nirmala UI"
        fontSize="47"
        fill="#fff4d3"
        fontWeight="700"
      >
        মিষ্টিমুখ
      </text>
    </g>
  </Svg>
);
export const LaptopWork = ({ phase = 0 }: { phase?: number }) => (
  <Svg>
    <path d="M-50 1380L1130 1380 1150 1740-50 1740Z" fill="url(#wood5)" />
    <rect
      x="55"
      y="463"
      width="970"
      height="895"
      rx="35"
      fill="#304354"
      stroke="#97a9b3"
      strokeWidth="8"
    />
    <rect x="82" y="497" width="916" height="812" rx="13" fill="#0b2337" />
    <circle cx="540" cy="480" r="5" fill="#172b45" />
    <rect x="82" y="497" width="916" height="85" fill="#24465b" />
    <text
      x="125"
      y="554"
      fontFamily="Nirmala UI"
      fontSize="41"
      fontWeight="700"
      fill="#f4fbff"
    >
      প্রজেক্ট • সমস্যার সমাধান
    </text>
    <rect
      x="103"
      y={620 + (Math.floor(phase / 16) % 7) * 70}
      width="870"
      height="42"
      rx="7"
      fill="#79c5d318"
    />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={i}>
        <text x="122" y={650 + i * 70} fontSize="27" fill="#7a95a8">
          {i + 1}
        </text>
        <rect
          x={185 + (i % 2) * 45}
          y={628 + i * 70}
          width={move(phase - i * 7, 0, 25, 20, 400 + (i % 3) * 80)}
          height="16"
          rx="5"
          fill={i % 2 ? "#f3c575" : "#76c7cf"}
        />
      </g>
    ))}
    <rect
      x="625"
      y="1180"
      width="330"
      height="80"
      rx="15"
      fill={phase > 70 ? "#a6f51c" : "#3e687d"}
    />
    <text
      x="790"
      y="1234"
      textAnchor="middle"
      fontFamily="Nirmala UI"
      fontSize="36"
      fill={phase > 70 ? "#172b45" : "#fff"}
      fontWeight="700"
    >
      {phase > 70 ? "সমাধান হয়েছে ✓" : "পরীক্ষা চলছে…"}
    </text>
    <path
      d="M55 1358L-15 1440 1095 1440 1025 1358Z"
      fill="#a6b4ba"
      stroke="#5b6f80"
      strokeWidth="6"
    />
    <path d="M-15 1440L1095 1440 1065 1460 15 1460Z" fill="#647c8b" />
  </Svg>
);
export const PhoneEvidence = ({
  phase = 0,
}: {
  phase?: number;
  lower?: number;
}) => {
  const reveal = move(phase, 60, 75, 0, 1);
  return (
    <Svg>
      <rect
        x="95"
        y="360"
        width="890"
        height="1140"
        rx="20"
        fill="url(#wood5)"
        stroke="#b38b62"
        strokeWidth="4"
      />
      <path
        d="M120 410L960 410M120 1455L960 1455"
        stroke="#ebd1ad"
        strokeWidth="3"
        opacity=".45"
      />
      <ellipse cx="540" cy="1433" rx="330" ry="33" fill="#402c2855" />
      <path
        d="M435 1240L660 1240 725 1410 350 1410Z"
        fill="#546a76"
        stroke="#2d424e"
        strokeWidth="7"
      />
      <rect
        x="338"
        y="1400"
        width="400"
        height="38"
        rx="15"
        fill="#8b9da5"
        stroke="#405966"
        strokeWidth="5"
      />
      <g transform="rotate(-3 540 890)">
        <rect
          x="252"
          y="414"
          width="590"
          height="945"
          rx="63"
          fill="#142230"
          stroke="#8193a0"
          strokeWidth="8"
        />
        <rect x="277" y="449" width="540" height="865" rx="35" fill="#edf0ec" />
        <rect x="277" y="449" width="540" height="137" rx="35" fill="#173349" />
        <rect x="277" y="520" width="540" height="66" fill="#173349" />
        <circle cx="546" cy="435" r="6" fill="#7b8d9b" />
        <text
          x="326"
          y="536"
          fontFamily="Nirmala UI"
          fontSize="54"
          fontWeight="700"
          fill="#fff"
        >
          মায়া
        </text>
        <text
          x="547"
          y="648"
          textAnchor="middle"
          fontFamily="Nirmala UI"
          fontSize="32"
          fill="#657d88"
        >
          আগের কথোপকথন
        </text>
        <g opacity={reveal} transform={`translate(0,${(1 - reveal) * 35})`}>
          <rect
            x="335"
            y="710"
            width="445"
            height="425"
            rx="28"
            fill="#c0e4d8"
            stroke="#8cbba9"
            strokeWidth="3"
          />
          {["তুই না থাকলে", "এবার প্রজেক্টটাই", "জমা দিতে", "পারতাম না।"].map(
            (s, i) => (
              <text
                key={i}
                x="366"
                y={792 + i * 80}
                fontFamily="Nirmala UI"
                fontSize="47"
                fontWeight="700"
                fill="#173349"
              >
                {s}
              </text>
            ),
          )}
          <path
            d="M365 815L738 815"
            stroke="#d7a129"
            strokeWidth="8"
            strokeDasharray="380"
            strokeDashoffset={380 * (1 - move(phase, 94, 115, 0, 1))}
          />
          <path
            d="M719 1090l12 11 20-24m-8 0 12 11 20-24"
            stroke="#4387a2"
            strokeWidth="4"
            fill="none"
          />
        </g>
      </g>
    </Svg>
  );
};
export const Documents = ({
  phase = 0,
  final = false,
  slide = false,
}: {
  phase?: number;
  final?: boolean;
  slide?: boolean;
}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: 115 + (slide ? move(phase, 0, 23, 500, 0) : 0),
        top: 465,
        width: 820,
        height: 900,
        background: "#fff7e5",
        border: "5px solid #b9ab8e",
        borderRadius: 9,
        boxShadow: "15px 24px 24px #14243755",
        transform: `rotate(${final ? -3 : 2}deg)`,
        fontFamily: "Nirmala UI",
        padding: 55,
        boxSizing: "border-box",
        color: "#173349",
      }}
    >
      <div
        style={{
          fontSize: 49,
          fontWeight: 900,
          borderBottom: "5px solid #173349",
          paddingBottom: 24,
        }}
      >
        {final ? "নতুন প্রজেক্ট" : "প্রজেক্টের কাজ"}
      </div>
      <div
        style={{
          fontSize: 35,
          marginTop: 26,
          marginBottom: 26,
          color: "#536f7b",
        }}
      >
        {final ? "দায়িত্বের তালিকা" : "সম্পন্ন কাজ ও জমার রেকর্ড"}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 1fr",
          fontSize: 38,
          fontWeight: 800,
          background: "#173349",
          color: "#fff",
          padding: 20,
        }}
      >
        <span>কাজ</span>
        <span>{final ? "দায়িত্ব" : "সম্পন্ন করেছেন"}</span>
      </div>
      {["কোড ও পরীক্ষা", "ক্লায়েন্ট", "সমস্যা সমাধান"].map((v, i) => (
        <div
          key={v}
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 1fr",
            fontSize: 34,
            padding: "34px 19px",
            borderBottom: "2px solid #a6b3b8",
            gap: 12,
          }}
        >
          <span>{v}</span>
          <span
            style={{
              fontWeight: 800,
              color: i === 1 ? "#173349" : "#785220",
              border: final && i === 0 ? "4px solid #d6a43b" : "none",
              minHeight: 53,
              background:
                !final && i !== 1 && phase > 20
                  ? "#ffdf7d"
                  : final && i === 0
                    ? "#ffdf7d44"
                    : "transparent",
            }}
          >
            {final ? (i === 1 ? "রাফি" : "") : i === 1 ? "রাফি" : "মায়া"}
          </span>
        </div>
      ))}
      {!final ? (
        <div style={{ fontSize: 33, marginTop: 28, color: "#537b85" }}>
          ✓ কাজের ফাইল ও জমার তারিখ
        </div>
      ) : null}
    </div>
    {final ? (
      <Svg>
        <g transform="rotate(27 904 1060)">
          <ellipse cx="912" cy="1112" rx="18" ry="178" fill="#172b4525" />
          <rect
            x="889"
            y="912"
            width="24"
            height="290"
            rx="9"
            fill="#173349"
            stroke="#91a7af"
            strokeWidth="3"
          />
          <path d="M889 1202L901 1238 913 1202Z" fill="#bf9752" />
          <path d="M898 1228L901 1238 904 1228" fill="#172b45" />
          <path
            d="M912 928L921 930 921 1000"
            stroke="#d9c186"
            strokeWidth="4"
            fill="none"
          />
        </g>
      </Svg>
    ) : null}
  </>
);
