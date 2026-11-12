import React, { useId } from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

// Fingers move around contact points; laptop and wrists share the same artwork.
export const Workstation = ({
  x = -220,
  y = 1640,
  w = 1510,
}: {
  x?: number;
  y?: number;
  w?: number;
}) => {
  const f = useCurrentFrame(),
    id = useId().replace(/:/g, "");
  const src = staticFile("rafi-typing-v2.png");
  const image = <image href={src} width="1536" height="1024" />;
  const left =
    "M697 825 L818 825 L899 855 L953 902 L947 950 L816 960 L710 923Z";
  const right = "M901 804 L993 797 L1077 834 L1085 902 L1030 935 L919 922Z";
  const l = Math.max(0, Math.sin(f * 0.59)) * 1.8,
    r = Math.max(0, Math.sin(f * 0.61 + 2)) * 1.7;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - (w * 2) / 3,
        width: w,
        height: (w * 2) / 3,
        filter: "drop-shadow(0 12px 17px #172b4540)",
      }}
    >
      <Img
        src={src}
        style={{ width: 1, height: 1, position: "absolute", opacity: 0 }}
      />
      <svg width="100%" height="100%" viewBox="0 0 1536 1024">
        <defs>
          <mask id={`${id}-body`}>
            <rect width="1536" height="1024" fill="white" />
            <path d={left} fill="black" />
            <path d={right} fill="black" />
          </mask>
          <clipPath id={`${id}-l`}>
            <path d={left} />
          </clipPath>
          <clipPath id={`${id}-r`}>
            <path d={right} />
          </clipPath>
        </defs>
        <g mask={`url(#${id}-body)`}>{image}</g>
        <g clipPath={`url(#${id}-l)`} transform={`rotate(${-l} 715 916)`}>
          {image}
        </g>
        <g clipPath={`url(#${id}-r)`} transform={`rotate(${r} 940 872)`}>
          {image}
        </g>
      </svg>
    </div>
  );
};
