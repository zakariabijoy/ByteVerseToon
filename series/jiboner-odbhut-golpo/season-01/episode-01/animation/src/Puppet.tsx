import React, { useId } from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { faces, skin, speakingArms, type Cast } from "./rig-data";
import {
  anticipation,
  blinkAmount,
  clamp,
  level,
  smooth,
  vocal,
} from "./Performance";
import { SkeletonBody } from "./SkeletonBody";
import { talkingHeadMapping } from "./head-rig";

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
  gaze,
  previousPose,
  changeAt,
  gesture = 1,
}) => {
  const f = useCurrentFrame(),
    id = useId().replace(/:/g, "");
  const index = talk ? 1 : pose;
  const head = index === 1 ? talkingHeadMapping(who) : null;
  const face = head?.face || faces[who][index];
  const headCut =
    index === 1
      ? { rafi: 258, sajid: 268, maya: 265, manager: 282 }[who]
      : face.cut;
  const speech = vocal(who, absolute);
  const blink = blinkAmount(who, absolute);
  const src = staticFile(`${who}.png`);
  const h = (w * 724) / 543;
  const breathe = Math.sin(absolute * 0.037 + (who === "rafi" ? 0 : 2));
  const entering = enter ? 1 - smooth(f / 18) : 0;
  const recoil =
    who === "rafi"
      ? anticipation(absolute, 922, 22) * -3 +
        anticipation(absolute, 1646, 27) * -2
      : 0;
  const nod =
    (speech.active
      ? Math.sin(absolute * 0.17) * (1 + level(absolute) * 2)
      : Math.sin(absolute * 0.028) * 0.55) +
    lean +
    recoil;
  const listening =
    !speech.active && talk ? Math.sin(absolute * 0.014) * 0.8 : 0;
  const headTransform = `translate(${listening * 0.6} ${speech.active ? -0.8 : 0}) rotate(${nod} ${face.neck[0]} ${face.neck[1]})`;
  let look = gaze ?? { rafi: 1.7, sajid: -1.8, maya: 1.6, manager: -1.5 }[who];
  if (who === "sajid" && absolute > 842 && absolute < 855) look = 2.4;
  const arms: typeof speakingArms.rafi = [];
  const image = <image href={src} x={-543 * index} width={2172} height={724} />;
  const headImage = head ? (
    <svg
      x={head.dx}
      y={head.dy}
      width={543 * head.raw.scale}
      height={724 * head.raw.scale}
      viewBox="0 0 543 724"
      overflow="hidden"
    >
      <g
        transform={head.raw.mirror ? "translate(543 0) scale(-1 1)" : undefined}
      >
        <image
          href={staticFile("talking-heads-v2.png")}
          x={-543 * head.raw.column}
          width={2172}
          height={724}
        />
      </g>
    </svg>
  ) : (
    image
  );
  const mouth = face.mouth;
  const [mx, my, mrx, mry] = mouth;
  const openness = speech.open;
  const mouthWidth =
    mrx *
    (speech.shape === "round" ? 0.48 : speech.shape === "wide" ? 0.85 : 0.76);
  const mouthHeight = Math.max(1.2, (who === "manager" ? 10 : 15) * openness);
  const mouthAngle = head?.raw.angle || 0;
  const mouthShape = `M${mx - mouthWidth},${my - mouthHeight * 0.14} Q${mx},${my - mouthHeight * 0.42} ${mx + mouthWidth},${my - mouthHeight * 0.2} C${mx + mouthWidth * 0.83},${my + mouthHeight * 0.65} ${mx + mouthWidth * 0.2},${my + mouthHeight} ${mx - mouthWidth * 0.1},${my + mouthHeight * 0.88} Q${mx - mouthWidth * 0.88},${my + mouthHeight * 0.6} ${mx - mouthWidth},${my - mouthHeight * 0.14}Z`;
  const transition = changeAt === undefined ? 1 : smooth((f - changeAt) / 7);
  const settled = 1 - entering;
  return (
    <div
      style={{
        position: "absolute",
        left: x + entering * 66,
        top: y - h + breathe * 2 + (who === "rafi" && pose === 3 ? 5 : 0),
        width: w,
        height: h,
        opacity: settled,
        transform: `scaleX(${flip ? -1 : 1}) rotate(${lean * 0.18 + breathe * 0.1}deg)`,
        transformOrigin: "50% 95%",
        filter: "drop-shadow(0 12px 13px rgba(15,22,30,.2))",
      }}
    >
      <Img
        src={src}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
      />
      {index === 1 && (
        <Img
          src={staticFile("puppet-parts-v2.png")}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      )}
      {index === 1 && (
        <Img
          src={staticFile("talking-heads-v2.png")}
          style={{ position: "absolute", width: 1, height: 1, opacity: 0 }}
        />
      )}
      {previousPose !== undefined && transition < 1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            opacity: 1 - transition,
          }}
        >
          <Img
            src={src}
            style={{
              width: "400%",
              height: "100%",
              maxWidth: "none",
              position: "absolute",
              left: `-${previousPose * 100}%`,
            }}
          />
        </div>
      )}
      <svg
        viewBox="0 0 543 724"
        width="100%"
        height="100%"
        style={{ overflow: "visible", opacity: transition }}
      >
        <defs>
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
          <clipPath id={`${id}-body`}>
            <rect x="0" y={face.cut - 9} width="543" height={733 - face.cut} />
          </clipPath>
          <clipPath id={`${id}-head`}>
            <rect x="0" y="0" width="543" height={headCut + 3} />
          </clipPath>
          <clipPath id={`${id}-lower-head`}>
            <rect x="-200" y={face.cut - 17} width="1000" height="1000" />
          </clipPath>
          <filter id={`${id}-hair-matte`}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -4 -1 0 0 3.6"
              result="hair"
            />
            <feComposite in="hair" in2="SourceAlpha" operator="in" />
          </filter>
          <mask id={`${id}-front-head`}>
            <rect x="-200" y="-300" width="1000" height="1400" fill="white" />
            {head && <path d={head.neckPath} fill="black" />}
          </mask>
          <clipPath id={`${id}-hair`}>
            <path d="M0 250H218L213 310L178 365L155 435L130 510L105 570H0Z M300 250H450V480L345 470L335 380L313 310Z" />
          </clipPath>
          <filter id={`${id}-hair-key`}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -5 -1 0 0 3.8"
              result="keyed"
            />
            <feComposite in="keyed" in2="SourceAlpha" operator="in" />
          </filter>
          <mask id={`${id}-body-mask`}>
            <rect width="543" height="724" fill="white" />
            {arms.map((a, i) => (
              <path
                key={i}
                d={a.path}
                fill="black"
                stroke="black"
                strokeWidth="7"
                strokeLinejoin="round"
              />
            ))}
          </mask>
          {arms.map((a, i) => (
            <React.Fragment key={i}>
              <clipPath id={`${id}-arm-${i}`}>
                <path d={a.path} />
              </clipPath>
              <mask id={`${id}-forearm-${i}`}>
                <rect width="543" height="724" fill="white" />
                {a.hand && <path d={a.hand} fill="black" />}
              </mask>
              {a.hand && (
                <clipPath id={`${id}-hand-${i}`}>
                  <path d={a.hand} />
                </clipPath>
              )}
            </React.Fragment>
          ))}
          {face.eyes.map((e, i) => (
            <React.Fragment key={i}>
              <clipPath id={`${id}-eye-${i}`}>
                <ellipse
                  cx={e.x}
                  cy={e.y}
                  rx={e.rx + 2}
                  ry={Math.max(0.1, (e.ry + 1) * (1 - blink))}
                  transform={`rotate(${e.angle} ${e.x} ${e.y})`}
                />
              </clipPath>
              <clipPath id={`${id}-gaze-${i}`}>
                <ellipse
                  cx={e.x}
                  cy={e.y}
                  rx={e.rx * 0.78}
                  ry={e.ry * 0.8}
                  transform={`rotate(${e.angle} ${e.x} ${e.y})`}
                />
              </clipPath>
            </React.Fragment>
          ))}
          <clipPath id={`${id}-mouth`}>
            <path d={mouthShape} />
          </clipPath>
          {who === "manager" && (
            <clipPath id={`${id}-moustache`}>
              <rect x={mx - 43} y={my - 34} width="86" height="32" />
            </clipPath>
          )}
        </defs>
        {index === 1 && <g transform={headTransform}>{headImage}</g>}
        {index === 1 ? (
          <SkeletonBody
            who={who}
            frame={absolute}
            local={f}
            gesture={gesture}
          />
        ) : (
          <g clipPath={`url(#${id}-body)`}>{image}</g>
        )}
        {arms.map((a, i) => {
          const swing =
            (Math.sin((absolute + i * 17) * 0.065) * 0.9 +
              anticipation(f, 4, 38) * 1.6 +
              (speech.active ? level(absolute) : 0)) *
            a.sign *
            gesture;
          return (
            <g
              key={i}
              transform={`rotate(${swing} ${a.elbow[0]} ${a.elbow[1]})`}
            >
              <g clipPath={`url(#${id}-arm-${i})`}>{image}</g>
            </g>
          );
        })}
        <g transform={headTransform}>
          {head ? (
            <g mask={`url(#${id}-front-head)`}>{headImage}</g>
          ) : (
            <g clipPath={`url(#${id}-head)`}>{image}</g>
          )}
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
                  <g clipPath={`url(#${id}-eye-${i})`}>{headImage}</g>
                  <path
                    d={`M${e.x - e.rx},${e.y} Q${e.x},${e.y + 4 * blink} ${e.x + e.rx},${e.y}`}
                    fill="none"
                    stroke="#553425"
                    strokeWidth={2.2}
                    opacity={clamp((blink - 0.65) / 0.35)}
                    transform={`rotate(${e.angle} ${e.x} ${e.y})`}
                  />
                </>
              ) : (
                <g
                  clipPath={`url(#${id}-gaze-${i})`}
                  transform={`translate(${look + Math.sin(absolute * 0.012) * 0.4} ${Math.sin(absolute * 0.017) * 0.35})`}
                >
                  {headImage}
                </g>
              )}
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
              {who === "manager" && (
                <g clipPath={`url(#${id}-moustache)`}>{headImage}</g>
              )}
              <g transform={`rotate(${mouthAngle} ${mx} ${my})`}>
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
                    d={`M${mx - mrx * 0.68},${my - 2} Q${mx},${my + ((who === "rafi" && absolute > 899) || who === "manager" ? 0 : 3)} ${mx + mrx * 0.64},${my - 3}`}
                    fill="none"
                    stroke={who === "maya" ? "#b15b46" : "#69412c"}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                  />
                )}
              </g>
            </>
          )}
        </g>
      </svg>
    </div>
  );
};
