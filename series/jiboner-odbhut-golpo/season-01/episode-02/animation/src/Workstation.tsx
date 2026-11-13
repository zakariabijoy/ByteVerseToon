import React, { useId, useMemo } from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { typingField } from "./ContinuousMotion";

// Keep fingers, wrists and keyboard on one continuous painted surface.
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
  const field = useMemo(() => typingField(f), [f]);
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
          <filter
            id={`${id}-typing`}
            x="0"
            y="0"
            width="1536"
            height="1024"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={field}
              x="0"
              y="0"
              width="1536"
              height="1024"
              preserveAspectRatio="none"
              result="field"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="field"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <image
          href={src}
          width="1536"
          height="1024"
          filter={`url(#${id}-typing)`}
        />
      </svg>
    </div>
  );
};
