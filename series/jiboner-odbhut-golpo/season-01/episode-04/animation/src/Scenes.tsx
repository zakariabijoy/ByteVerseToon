import React from "react";
import { AbsoluteFill, staticFile, useCurrentFrame } from "remotion";
import { Actor, Backdrop, Dialogue, ease } from "./Stage";
import timing from "./dialogue-timing.json";
import envelope from "./voice-envelope.json";
const names: Record<string, string> = {
  rafi: "রাফি",
  sajid: "সাজিদ",
  karim: "করিম চাচা",
  teacher: "শিক্ষক",
};
const active = (who: string, a: number) =>
  timing.cues.some((c) => c.who === who && a / 30 >= c.start && a / 30 < c.end);
const Quote = ({ a }: { a: number }) => {
  const c = timing.cues.find((c) => a / 30 >= c.start && a / 30 < c.end);
  return c ? (
    <Dialogue
      text={c.text}
      speaker={names[c.who]}
      gold={c.who === "teacher" || c.who === "karim"}
    />
  ) : null;
};
export const Teacher = ({
  a,
  pose = 1,
  x = 430,
  y = 1670,
  w = 540,
}: {
  a: number;
  pose?: number;
  x?: number;
  y?: number;
  w?: number;
}) => {
  const spans = [
      [0, 519],
      [580, 991],
      [1015, 1479],
      [1551, 1847],
    ],
    [left, right] = spans[pose],
    cw = right - left;
  const mouths = [
      [269, 276, 8, 1.6],
      [750, 111, 8, 1.6],
      [1323, 181, 7, 1.4],
      [1719, 104, 8, 1.6],
    ],
    [mx, my, rx, ry] = mouths[pose];
  const h = (w * 818) / cw,
    talking = active("teacher", a),
    energy = envelope[Math.min(a, envelope.length - 1)] || 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y - h,
        width: w,
        height: h,
        transform: `translateY(${Math.sin(a / 37) * 1.6}px) rotate(${Math.sin(a / 75) * 0.22}deg)`,
        transformOrigin: "50% 95%",
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`${left} 0 ${cw} 818`}
        style={{ overflow: "hidden" }}
      >
        <image
          href={staticFile("teacher-atlas.png")}
          width={1923}
          height={818}
        />
        {talking && energy > 0.04 ? (
          <ellipse
            cx={mx}
            cy={my}
            rx={rx * (0.7 + energy * 0.3)}
            ry={ry + Math.min(3, energy * 4)}
            fill="#583b2d"
            stroke="#795a40"
            strokeWidth={0.6}
          />
        ) : null}
      </svg>
    </div>
  );
};
const Person = ({
  who,
  a,
  x,
  w = 640,
  pose = 0,
  y = 1660,
}: {
  who: "rafi" | "sajid" | "karim";
  a: number;
  x: number;
  w?: number;
  pose?: number;
  y?: number;
}) => (
  <Actor
    who={who}
    x={x}
    y={y}
    w={w}
    pose={pose}
    talk={active(who, a)}
    absolute={a}
    gesture={0.6}
  />
);
const Counter = () => (
  <div
    style={{
      position: "absolute",
      left: -30,
      right: -30,
      top: 1600,
      height: 400,
      background:
        "linear-gradient(#c0905c 0 12px,#8f633e 14px,#51392c 55px,#352b28)",
      boxShadow: "0 -6px 20px #172b4544",
    }}
  />
);
const Shell = ({
  children,
  counter = false,
}: {
  children: React.ReactNode;
  counter?: boolean;
}) => {
  const nodes = React.Children.toArray(children),
    quotes = nodes.filter((n) => React.isValidElement(n) && n.type === Quote),
    rest = nodes.filter((n) => !(React.isValidElement(n) && n.type === Quote));
  return (
    <AbsoluteFill
      style={{ fontFamily: "Nirmala UI", color: "#fff8e9", overflow: "hidden" }}
    >
      <Backdrop panel={0} file="tea-stall.png" />
      {rest}
      {counter ? <Counter /> : null}
      {quotes}
    </AbsoluteFill>
  );
};
const TopText = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: "absolute",
      left: 68,
      right: 110,
      top: 235,
      fontSize: 66,
      fontWeight: 800,
      lineHeight: 1.35,
      textShadow: "0 4px 16px #172b45",
    }}
  >
    {children}
  </div>
);
export const Chair = ({
  x = 330,
  y = 1420,
  pull = 0,
}: {
  x?: number;
  y?: number;
  pull?: number;
}) => (
  <svg
    width={380}
    height={510}
    viewBox="0 0 380 510"
    style={{ position: "absolute", left: x + pull, top: y }}
  >
    <path
      d="M65 30L305 30L302 280H71Z"
      fill="#a97543"
      stroke="#493323"
      strokeWidth={10}
    />
    <path
      d="M87 58H282V235H87Z"
      fill="#cc9a5a"
      stroke="#66472c"
      strokeWidth={8}
    />
    <path
      d="M40 280H330L348 325H30Z"
      fill="#c99a5e"
      stroke="#493323"
      strokeWidth={10}
    />
    <path
      d="M55 325L35 500M318 325L340 500"
      stroke="#593b27"
      strokeWidth={25}
    />
  </svg>
);
const TeaCloseup = () => {
  const f = useCurrentFrame(),
    p = ease(f, 98, 119);
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 820,
        width: 900,
        height: 430,
        background: "#eedabc",
        borderRadius: 24,
        boxShadow: "0 15px 35px #172b4544",
        overflow: "hidden",
      }}
    >
      <svg viewBox="0 0 900 430" width={900} height={430}>
        <rect x={0} y={310} width={900} height={120} fill="#88603d" />
        <g transform={`translate(0,${-65 * (1 - p)})`}>
          <path
            d="M400 120H542L526 310H416Z"
            fill="#c9b78d88"
            stroke="#ffeed2"
            strokeWidth={8}
          />
          <path d="M410 180H533L522 302H422Z" fill="#a85b1e" />
          <ellipse cx={471} cy={120} rx={72} ry={12} fill="#fce8b355" />
        </g>
        <path
          d="M900 105L710 106L630 150L536 163Q513 166 518 188Q522 202 547 199L626 187L706 155L900 167Z"
          fill="#c69164"
          stroke="#553c2a"
          strokeWidth={7}
        />
        <path
          d="M900 100H756L755 165H900Z"
          fill="#aaa77b"
          stroke="#655e44"
          strokeWidth={7}
        />
      </svg>
    </div>
  );
};
export const Hook = () => {
  const f = useCurrentFrame();
  return (
    <Shell>
      {f < 51 ? (
        <>
          <Person who="sajid" a={f} x={90} y={2000} w={1080} pose={0} />
          <TopText>
            আগে <span style={{ color: "#ffd070" }}>টাকা নেন!</span>
          </TopText>
        </>
      ) : (
        <>
          <Teacher a={f} pose={0} x={-25} y={1970} w={1190} />
          <TopText>
            এই লোক কিন্তু
            <br />
            <span style={{ color: "#ffd070" }}>বিল দেবে না!</span>
          </TopText>
        </>
      )}
      <Quote a={f} />
    </Shell>
  );
};
export const Hurt = () => {
  const f = useCurrentFrame(),
    a = 102 + f;
  return (
    <Shell counter>
      <Person who="sajid" a={a} x={-230} w={700} pose={0} />
      <Teacher a={a} pose={0} x={340} w={760} />
      {a >= 200 && a < 270 ? <TeaCloseup /> : null}
      <Quote a={a} />
    </Shell>
  );
};
export const Corner = () => {
  const f = useCurrentFrame(),
    a = 336 + f;
  return (
    <Shell counter>
      <Teacher a={a} pose={0} x={325} w={690} />
      <Person who="rafi" a={a} x={-160} w={650} />
      {a > 490 ? <Person who="sajid" a={a} x={-50} w={730} pose={0} /> : null}
      <div
        style={{
          position: "absolute",
          left: 68,
          top: 245,
          fontSize: 39,
          textShadow: "0 3px 10px #172b45",
        }}
      >
        করিম চাচার চায়ের দোকান
      </div>
    </Shell>
  );
};
const Books = ({ fall = false }: { fall?: boolean }) => {
  const f = useCurrentFrame(),
    p = ease(f, 0, 18);
  return (
    <div
      style={{
        position: "absolute",
        left: 240,
        top: fall ? 750 + p * 480 : 450,
        transform: `rotate(${fall ? p * 16 : -5}deg)`,
        filter: "drop-shadow(0 15px 20px #172b4555)",
      }}
    >
      <svg width={600} height={450} viewBox="0 0 600 450">
        <path
          d="M40 120L540 90L560 400L60 425Z"
          fill="#b66b54"
          stroke="#513b2a"
          strokeWidth={7}
        />
        <path
          d="M15 80L515 50L535 355L35 380Z"
          fill="#537b85"
          stroke="#314b57"
          strokeWidth={7}
        />
        <path
          d="M65 65L495 45L508 325L83 345Z"
          fill="#fff4d9"
          stroke="#b9a98b"
          strokeWidth={4}
        />
        {[120, 175, 230, 285].map((y) => (
          <path
            key={y}
            d={`M100 ${y}L470 ${y - 18}`}
            stroke="#b8c6c6"
            strokeWidth={3}
          />
        ))}
        <text
          x={130}
          y={160}
          fontFamily="Nirmala UI"
          fontSize={43}
          fill="#263e51"
        >
          ৭ + ৫ = ১২
        </text>
        <path
          d="M395 125L412 145L452 102"
          fill="none"
          stroke="#ba4b3c"
          strokeWidth={10}
        />
        <text
          x={112}
          y={235}
          fontFamily="Nirmala UI"
          fontSize={38}
          fill="#ad4336"
        >
          আবার চেষ্টা করো।
        </text>
        <text
          x={112}
          y={293}
          fontFamily="Nirmala UI"
          fontSize={45}
          fill="#ad4336"
        >
          পারবে।
        </text>
      </svg>
    </div>
  );
};
export const Fallen = () => {
  const f = useCurrentFrame(),
    a = 570 + f;
  return (
    <Shell>
      <Teacher a={a} pose={2} x={280} w={740} />
      <Person who="rafi" a={a} x={-230} w={690} pose={2} />
      <Books fall />
    </Shell>
  );
};
export const Notebook = () => {
  const f = useCurrentFrame(),
    a = 660 + f;
  return (
    <Shell>
      {a < 878 ? (
        <>
          <Books />
          {a > 770 ? (
            <TopText>
              “আবার চেষ্টা করো।
              <br />
              <span style={{ color: "#ffd070" }}>পারবে।”</span>
            </TopText>
          ) : null}
        </>
      ) : (
        <Person who="rafi" a={a} x={30} y={2040} w={1000} pose={2} />
      )}
      <Quote a={a} />
    </Shell>
  );
};
export const Recognition = () => {
  const f = useCurrentFrame(),
    a = 948 + f;
  return (
    <Shell counter>
      <Teacher a={a} x={460} w={520} />
      <Person
        who="karim"
        a={a}
        x={-120 + ease(f, 0, 35) * 90}
        w={720}
        pose={2}
      />
      {a < 1090 ? (
        <TopText>
          স্যার! <span style={{ color: "#ffd070" }}>আপনি?</span>
        </TopText>
      ) : (
        <Chair x={270} y={1430} pull={-ease(f, 140, 185) * 90} />
      )}
      <Quote a={a} />
    </Shell>
  );
};
export const Gratitude = () => {
  const f = useCurrentFrame(),
    a = 1164 + f;
  return (
    <Shell counter>
      <Teacher a={a} x={530} w={460} />
      <Person who="karim" a={a} x={-110} y={1790} w={850} pose={1} />
      <Quote a={a} />
    </Shell>
  );
};
export const Change = () => {
  const f = useCurrentFrame(),
    a = 1296 + f;
  return (
    <Shell>
      <Person who="sajid" a={a} x={-40} y={1950} w={1000} pose={3} />
      <TopText>
        হাসিটা <span style={{ color: "#ffd070" }}>থেমে গেল।</span>
      </TopText>
    </Shell>
  );
};
export const TeacherStory = () => {
  const f = useCurrentFrame(),
    a = 1350 + f;
  return (
    <Shell>
      <Teacher a={a} x={200} y={1860} w={680} />
      <Quote a={a} />
    </Shell>
  );
};
export const Apology = () => {
  const f = useCurrentFrame(),
    a = 1524 + f;
  return (
    <Shell counter>
      <Teacher a={a} x={520} w={480} />
      <Person who="sajid" a={a} x={-80} y={1770} w={800} pose={3} />
      <Quote a={a} />
    </Shell>
  );
};
export const Dignity = () => {
  const f = useCurrentFrame(),
    a = 1680 + f;
  return (
    <Shell>
      <Teacher a={a} pose={3} x={280} y={1820} w={485} />
      <Quote a={a} />
    </Shell>
  );
};
// The sleeve, hand and chair move as one drawn contact cutaway; no atlas limb is detached.
export const Respect = () => {
  const f = useCurrentFrame(),
    a = 1908 + f,
    p = ease(f, 3, 35);
  return (
    <Shell>
      {f < 50 ? (
        <svg
          viewBox="0 0 1080 1920"
          width={1080}
          height={1920}
          style={{ position: "absolute", inset: 0 }}
        >
          <g transform={`translate(${-p * 120},0)`}>
            <path
              d="M340 800H740V1260H350Z"
              fill="#ad7b48"
              stroke="#553a25"
              strokeWidth={12}
            />
            <path
              d="M380 850H698V1210H390Z"
              fill="#c69a60"
              stroke="#69482d"
              strokeWidth={9}
            />
            <path
              d="M300 1260H780L810 1350H280Z"
              fill="#c3975a"
              stroke="#553a25"
              strokeWidth={10}
            />
            <path
              d="M320 1350L300 1800M760 1350L790 1800"
              stroke="#64432b"
              strokeWidth={35}
            />
            <path
              d="M1200 750L970 750L874 795L720 796Q680 803 688 837Q693 860 730 850L865 847L970 810L1200 830Z"
              fill="#ffc080"
              stroke="#49392c"
              strokeWidth={7}
            />
            <path
              d="M1200 738L992 740L990 824L1200 840Z"
              fill="#26354f"
              stroke="#172b45"
              strokeWidth={9}
            />
          </g>
        </svg>
      ) : (
        <Teacher a={a} pose={0} x={90} y={1890} w={960} />
      )}
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 110,
          top: 235,
          fontSize: 60,
          fontWeight: 700,
          lineHeight: 1.4,
          textShadow: "0 4px 14px #172b45",
        }}
      >
        পরিচয় জানার জন্য নয়—
        <br />
        <span style={{ color: "#ffd070" }}>তাঁকে বসতে দেওয়ার জন্য।</span>
      </div>
    </Shell>
  );
};
