import React, { useId, useMemo } from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { faces, skin, type Cast } from "./rig-data";
import { blinkAmount, clamp, smooth, vocal } from "./Performance";
import { continuousField } from "./ContinuousMotion";
import { poseBounds } from "./pose-bounds";

type Props = {
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
  gaze?: number;
  previousPose?: number;
  changeAt?: number;
  gesture?: number;
};
export const Puppet: React.FC<Props> = ({
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
  previousPose,
  changeAt,
  gesture = 1,
}) => {
  const f = useCurrentFrame();
  const id = useId().replace(/:/g, "");
  const index = talk ? 1 : pose;
  const face = faces[who][index];
  const src = staticFile(`${who}.png`);
  const speech = vocal(who, absolute);
  const blink = blinkAmount(who, absolute);
  const h = (w * 724) / 543;
  const entering = enter ? 1 - smooth(f / 18) : 0;
  const transition = changeAt === undefined ? 1 : smooth((f - changeAt) / 10);
  const field = useMemo(
    () => continuousField(who, index, absolute, gesture, lean),
    [who, index, absolute, gesture, lean],
  );
  const image = (
    <g clipPath={`url(#${id}-pose)`}>
      <image href={src} x={-543 * index} width={2172} height={724} />
    </g>
  );
  const [mx, my, mrx, mry] = face.mouth;
  const openness = speech.open;
  const mouthWidth =
    mrx *
    (speech.shape === "round" ? 0.48 : speech.shape === "wide" ? 0.85 : 0.76);
  const mouthHeight = Math.max(
    1.2,
    (who === "manager" || who === "karim" ? 10 : 15) * openness,
  );
  const mouthShape = `M${mx - mouthWidth},${my - mouthHeight * 0.14} Q${mx},${my - mouthHeight * 0.42} ${mx + mouthWidth},${my - mouthHeight * 0.2} C${mx + mouthWidth * 0.83},${my + mouthHeight * 0.65} ${mx + mouthWidth * 0.2},${my + mouthHeight} ${mx - mouthWidth * 0.1},${my + mouthHeight * 0.88} Q${mx - mouthWidth * 0.88},${my + mouthHeight * 0.6} ${mx - mouthWidth},${my - mouthHeight * 0.14}Z`;
  return (
    <div
      style={{
        position: "absolute",
        left: x + entering * 66,
        top: y - h + Math.sin(absolute * 0.037) * 1.5,
        width: w,
        height: h,
        opacity: 1 - entering,
        transform: `scaleX(${flip ? -1 : 1})`,
        filter: "drop-shadow(0 12px 13px rgba(15,22,30,.2))",
      }}
    >
      <Img
        src={src}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
      />
      {previousPose !== undefined && transition < 1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            opacity: 1 - transition,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 543 724"
            overflow="visible"
          >
            <defs>
              <clipPath id={`${id}-previous`}>
                <rect {...poseBounds(who, previousPose)} y="0" height="724" />
              </clipPath>
            </defs>
            <g clipPath={`url(#${id}-previous)`}>
              <image
                href={src}
                x={-543 * previousPose}
                width="2172"
                height="724"
              />
            </g>
          </svg>
        </div>
      )}
      <svg
        viewBox="0 0 543 724"
        width="100%"
        height="100%"
        style={{ overflow: "visible", opacity: transition }}
      >
        <defs>
          <clipPath id={`${id}-pose`}>
            <rect {...poseBounds(who, index)} y="0" height="724" />
          </clipPath>
          <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor={skin[who][0]} />
            <stop offset="1" stopColor={skin[who][1]} />
          </linearGradient>
          <filter
            id={`${id}-feather`}
            x="-20%"
            y="-30%"
            width="140%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
          <filter
            id={`${id}-continuous`}
            x="-80"
            y="0"
            width="703"
            height="724"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={field}
              x="-80"
              y="0"
              width="703"
              height="724"
              preserveAspectRatio="none"
              result="field"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="field"
              scale="40"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          {face.eyes.map((e, i) => (
            <clipPath key={i} id={`${id}-eye-${i}`}>
              <ellipse
                cx={e.x}
                cy={e.y}
                rx={e.rx + 2}
                ry={Math.max(0.1, (e.ry + 1) * (1 - blink))}
                transform={`rotate(${e.angle} ${e.x} ${e.y})`}
              />
            </clipPath>
          ))}
          <clipPath id={`${id}-mouth`}>
            <path d={mouthShape} />
          </clipPath>
          {(who === "manager" || who === "karim") && (
            <clipPath id={`${id}-moustache`}>
              <rect x={mx - 43} y={my - 34} width="86" height="32" />
            </clipPath>
          )}
        </defs>
        <g filter={`url(#${id}-continuous)`}>
          <svg
            width="543"
            height="724"
            viewBox="0 0 543 724"
            overflow="visible"
          >
            {image}
            {face.eyes.map((e, i) => (
              <g key={i}>
                {blink > 0.01 ? (
                  <>
                    <ellipse
                      cx={e.x}
                      cy={e.y}
                      rx={e.rx + 5}
                      ry={e.ry + 5}
                      transform={`rotate(${e.angle} ${e.x} ${e.y})`}
                      fill={`url(#${id}-skin)`}
                      filter={`url(#${id}-feather)`}
                    />
                    <g clipPath={`url(#${id}-eye-${i})`}>{image}</g>
                    <path
                      d={`M${e.x - e.rx},${e.y} Q${e.x},${e.y + 4 * blink} ${e.x + e.rx},${e.y}`}
                      fill="none"
                      stroke="#553425"
                      strokeWidth={2.2}
                      opacity={clamp((blink - 0.65) / 0.35)}
                      transform={`rotate(${e.angle} ${e.x} ${e.y})`}
                    />
                  </>
                ) : null}
              </g>
            ))}
            {index === 1 && (
              <>
                <ellipse
                  cx={mx}
                  cy={my + 1}
                  rx={mrx + 7}
                  ry={mry + 6}
                  fill={`url(#${id}-skin)`}
                  filter={`url(#${id}-feather)`}
                />
                {(who === "manager" || who === "karim") && (
                  <g clipPath={`url(#${id}-moustache)`}>{image}</g>
                )}
                <g transform={`rotate(0 ${mx} ${my})`}>
                  {openness > 0.055 ? (
                    <>
                      <path
                        d={mouthShape}
                        fill="#381d1c"
                        stroke={who === "maya" ? "#a34b37" : "#693f29"}
                        strokeWidth={who === "maya" ? 2.5 : 1.7}
                      />
                      <g clipPath={`url(#${id}-mouth)`}>
                        {speech.shape !== "round" && (
                          <path
                            d={`M${mx - mouthWidth * 0.93},${my - mouthHeight * 0.3} Q${mx},${my - mouthHeight * 0.35} ${mx + mouthWidth * 0.91},${my - mouthHeight * 0.3} L${mx + mouthWidth * 0.78},${my + 1.9} Q${mx},${my + 2.6} ${mx - mouthWidth * 0.78},${my + 1.7}Z`}
                            fill="#f4e5cd"
                          />
                        )}
                        {mouthHeight > 7 && (
                          <ellipse
                            cx={mx + 2}
                            cy={my + mouthHeight + 1}
                            rx={mouthWidth * 0.68}
                            ry={mouthHeight * 0.45}
                            fill="#c96b62"
                          />
                        )}
                      </g>
                      <path
                        d={`M${mx - mouthWidth * 0.4},${my + mouthHeight + 3} Q${mx},${my + mouthHeight + 5} ${mx + mouthWidth * 0.44},${my + mouthHeight + 2}`}
                        stroke="#bc794b"
                        strokeWidth="1.3"
                        fill="none"
                      />
                    </>
                  ) : (
                    <path
                      d={`M${mx - mrx * 0.68},${my - 2} Q${mx},${my + ((who === "rafi" && absolute > 899) || who === "manager" || who === "karim" ? 0 : 3)} ${mx + mrx * 0.64},${my - 3}`}
                      fill="none"
                      stroke={who === "maya" ? "#b15b46" : "#69412c"}
                      strokeWidth={2.2}
                      strokeLinecap="round"
                    />
                  )}
                </g>
              </>
            )}
          </svg>
        </g>
      </svg>
    </div>
  );
};
