import React, { useId } from "react";
import { staticFile } from "remotion";
import parts from "./puppet-parts.json";
import { faces, type Cast } from "./rig-data";
import { anticipation, level } from "./Performance";

type Limb = {
  side: "left" | "right";
  shoulder: [number, number];
  upper: number;
  fore: number;
  upperAngle: number;
  foreAngle: number;
  mirror: boolean;
};
const deg = Math.PI / 180;
const Part = ({
  box,
  x,
  y,
  w,
  h,
  mirror = false,
}: {
  box: number[];
  x: number;
  y: number;
  w: number;
  h: number;
  mirror?: boolean;
}) => (
  <g transform={mirror ? `translate(${2 * x + w} 0) scale(-1 1)` : undefined}>
    <svg
      x={x}
      y={y}
      width={w}
      height={h}
      viewBox={box.join(" ")}
      preserveAspectRatio="none"
      overflow="hidden"
    >
      <image
        href={staticFile("puppet-parts-v2.png")}
        width={parts.width}
        height={parts.height}
      />
    </svg>
  </g>
);

export const SkeletonBody = ({
  who,
  frame,
  local,
  gesture = 1,
}: {
  who: Cast;
  frame: number;
  local: number;
  gesture?: number;
}) => {
  const id = useId().replace(/:/g, "");
  const model = parts.characters[who];
  const face = faces[who][1];
  const cx = face.neck[0],
    top = face.cut - 29;
  const hole =
    who === "maya"
      ? `M${cx - 77} ${top + 3} Q${cx} ${top + 19} ${cx + 70} ${top + 3} L${cx + 62} ${top + 39} Q${cx} ${top + 61} ${cx - 67} ${top + 38}Z`
      : who === "manager"
        ? `M${cx - 38} ${top + 11} Q${cx} ${top + 4} ${cx + 39} ${top + 12} L${cx + 25} ${top + 49} L${cx - 1} ${top + 63} L${cx - 35} ${top + 39}Z`
        : `M${cx - 39} ${top + 12} Q${cx + 4} ${top + 1} ${cx + 48} ${top + 24} L${cx + 39} ${top + 54} L${cx + 16} ${top + 69} L${cx - 9} ${top + 53}Z`;
  const active =
    (Math.sin(frame * 0.058) * 1.4 +
      anticipation(local, 7, 42) * 3 +
      level(frame) * 1.2) *
    gesture;
  const shoulderY = face.cut + 43;
  let limbs: Limb[];
  if (who === "rafi")
    limbs = [
      {
        side: "left",
        shoulder: [cx - 177, shoulderY],
        upper: 194,
        fore: 294,
        upperAngle: -8,
        foreAngle: -114,
        mirror: false,
      },
      {
        side: "right",
        shoulder: [cx + 177, shoulderY],
        upper: 192,
        fore: 185,
        upperAngle: -5,
        foreAngle: 2,
        mirror: true,
      },
    ];
  else if (who === "sajid")
    limbs = [
      {
        side: "left",
        shoulder: [cx - 177, shoulderY],
        upper: 187,
        fore: 218,
        upperAngle: 10,
        foreAngle: 145,
        mirror: false,
      },
      {
        side: "right",
        shoulder: [cx + 177, shoulderY],
        upper: 187,
        fore: 177,
        upperAngle: -4,
        foreAngle: -3,
        mirror: true,
      },
    ];
  else if (who === "maya")
    limbs = [
      {
        side: "left",
        shoulder: [cx - 177, shoulderY],
        upper: 196,
        fore: 245,
        upperAngle: -6,
        foreAngle: -91,
        mirror: false,
      },
      {
        side: "right",
        shoulder: [cx + 177, shoulderY],
        upper: 190,
        fore: 195,
        upperAngle: 4,
        foreAngle: -151,
        mirror: true,
      },
    ];
  else
    limbs = [
      {
        side: "left",
        shoulder: [cx - 177, shoulderY],
        upper: 182,
        fore: 187,
        upperAngle: -5,
        foreAngle: 151,
        mirror: false,
      },
      {
        side: "right",
        shoulder: [cx + 177, shoulderY],
        upper: 181,
        fore: 175,
        upperAngle: -3,
        foreAngle: 2,
        mirror: true,
      },
    ];
  const resolved = limbs.map((limb, i) => {
    const raised = who === "maya" || i === 0;
    const ua =
      limb.upperAngle +
      (raised ? active * 0.45 : Math.sin(frame * 0.027) * 0.65);
    const fa =
      limb.foreAngle + (raised ? active : Math.sin(frame * 0.027) * 0.8);
    const ex = limb.shoulder[0] - Math.sin(ua * deg) * limb.upper;
    const ey = limb.shoulder[1] + Math.cos(ua * deg) * limb.upper;
    return { ...limb, ua, fa, ex, ey };
  });
  return (
    <>
      <defs>
        <linearGradient id={`${id}-neck`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#f6b570" />
          <stop offset=".45" stopColor="#f5b779" />
          <stop offset="1" stopColor="#e69b5f" />
        </linearGradient>
        <mask id={`${id}-neck-hole`}>
          <rect x="-100" y="0" width="800" height="800" fill="white" />
          <path d={hole} fill="black" />
        </mask>
      </defs>
      {who === "rafi" && (
        <g>
          <path
            d={`M${cx - 183} ${top + 97} Q${cx - 228} ${top + 112} ${cx - 226} ${top + 165} L${cx - 217} ${top + 365} Q${cx - 206} ${top + 403} ${cx - 170} ${top + 405} L${cx - 143} ${top + 390} L${cx - 147} ${top + 110}Z`}
            fill="#715035"
            stroke="#3b2d24"
            strokeWidth="4"
          />
          <path
            d={`M${cx - 206} ${top + 160} L${cx - 196} ${top + 355}`}
            stroke="#b18b5b"
            strokeWidth="3"
          />
        </g>
      )}
      {resolved.map((limb, i) => (
        <g
          key={`upper-${i}`}
          transform={`translate(${limb.shoulder[0]} ${limb.shoulder[1]}) rotate(${limb.ua})`}
        >
          <Part
            box={model.upper}
            x={-43}
            y={-17}
            w={86}
            h={limb.upper + 31}
            mirror={limb.mirror}
          />
        </g>
      ))}
      <g mask={`url(#${id}-neck-hole)`}>
        <Part box={model.torso} x={cx - 181} y={top} w={362} h={724 - top} />
      </g>
      {who === "rafi" && (
        <g>
          <path
            d={`M${cx - 119} ${top + 37} Q${cx - 80} ${top + 98} ${cx - 67} 674`}
            stroke="#463021"
            strokeWidth="21"
            fill="none"
          />
          <path
            d={`M${cx - 119} ${top + 37} Q${cx - 80} ${top + 98} ${cx - 67} 674`}
            stroke="#93623f"
            strokeWidth="15"
            fill="none"
          />
          <path
            d={`M${cx + 103} ${top + 35} Q${cx + 116} ${top + 91} ${cx + 118} 668`}
            stroke="#463021"
            strokeWidth="19"
            fill="none"
          />
          <path
            d={`M${cx + 103} ${top + 35} Q${cx + 116} ${top + 91} ${cx + 118} 668`}
            stroke="#93623f"
            strokeWidth="13"
            fill="none"
          />
          <rect
            x={cx - 79}
            y="449"
            width="26"
            height="36"
            rx="4"
            fill="none"
            stroke="#c39a68"
            strokeWidth="4"
            transform={`rotate(-8 ${cx - 66} 467)`}
          />
        </g>
      )}
      {resolved.map((limb, i) => (
        <React.Fragment key={`fore-${i}`}>
          <g transform={`translate(${limb.ex} ${limb.ey}) rotate(${limb.fa})`}>
            <Part
              box={model.fore}
              x={-43}
              y={-11}
              w={86}
              h={limb.fore + 19}
              mirror={limb.mirror}
            />
            {who === "rafi" && limb.side === "right" && (
              <g transform={`translate(0 ${limb.fore * 0.58})`}>
                <rect
                  x="-26"
                  y="-10"
                  width="52"
                  height="19"
                  rx="5"
                  fill="#60452e"
                  stroke="#2e291f"
                  strokeWidth="2"
                />
                <ellipse
                  rx="16"
                  ry="13"
                  fill="#d1c7a9"
                  stroke="#392e24"
                  strokeWidth="3"
                />
                <ellipse rx="12" ry="10" fill="#e9eadf" />
                <path
                  d="M0 -7V0L6 3"
                  fill="none"
                  stroke="#465259"
                  strokeWidth="1.5"
                />
              </g>
            )}
          </g>
        </React.Fragment>
      ))}
    </>
  );
};
