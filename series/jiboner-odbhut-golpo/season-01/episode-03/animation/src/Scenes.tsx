import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { Actor, SceneShell, Dialogue, Badge, ease } from "./Stage";
import timing from "./dialogue-timing.json";
import phrases from "./dialogue-phrases.json";
import type { Cast } from "./rig-data";

type Cue = { who: string; start: number; end: number; text: string };
const names: Record<string, string> = {
  rafi: "রাফি",
  sajid: "সাজিদ",
  karim: "করিম চাচা",
};
const acting = (who: Cast, a: number, f: number, pose = 0) => {
  const t = a / 30,
    cues = timing.cues as Cue[];
  const cue = cues.find((c) => c.who === who && t >= c.start && t < c.end);
  const last = cues.filter((c) => c.who === who && c.end <= t).slice(-1)[0];
  return cue
    ? {
        talk: true,
        pose,
        previousPose: pose,
        changeAt: f - (a - cue.start * 30),
      }
    : last && t - last.end < 0.34
      ? {
          talk: false,
          pose,
          previousPose: 1,
          changeAt: f - (a - last.end * 30),
        }
      : { talk: false, pose };
};
const Quotes = ({ absolute }: { absolute: number }) => {
  const cue = (
    phrases as { who: string; start: number; end: number; text: string }[]
  ).find((p) => absolute / 30 >= p.start && absolute / 30 < p.end);
  return cue ? (
    <Dialogue
      text={cue.text}
      speaker={names[cue.who]}
      gold={cue.who === "karim"}
    />
  ) : null;
};
const Note = ({
  text,
  detail,
  y = 320,
  from = 0,
}: {
  text: string;
  detail?: string;
  y?: number;
  from?: number;
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 110,
        top: y,
        padding: "22px 30px",
        background: "#fff1d8",
        borderRadius: 16,
        color: "#172b45",
        boxShadow: "0 12px 32px #172b4544",
        opacity: ease(f, from, from + 12),
        transform: `translateY(${(1 - ease(f, from, from + 12)) * 18}px)`,
      }}
    >
      <div style={{ fontSize: 43, fontWeight: 700 }}>{text}</div>
      {detail && <div style={{ fontSize: 31, marginTop: 8 }}>{detail}</div>}
    </div>
  );
};
export const TeaCounter = () => (
  <div
    style={{
      position: "absolute",
      top: 1690,
      left: -100,
      width: 1300,
      height: 300,
      background: "linear-gradient(#b2814f 0 14px,#6e452e 17px,#4a3025)",
      boxShadow: "0 -5px 20px #172b4533",
    }}
  >
    {[0, 1, 2].map((i) => (
      <svg
        key={i}
        width="76"
        height="108"
        viewBox="0 0 76 108"
        style={{ position: "absolute", top: -99, left: 650 + i * 115 }}
      >
        <path
          d="M10 14H60L55 96H16Z"
          fill="#d2a75f66"
          stroke="#ffedd5"
          strokeWidth="3"
        />
        <path d="M14 40H57L53 92H18Z" fill="#b96f22" />
        <path
          d="M60 30Q84 28 73 64L58 69"
          fill="none"
          stroke="#ffedd5"
          strokeWidth="4"
        />
        <ellipse cx="35" cy="15" rx="25" ry="5" fill="#fff2ce55" />
      </svg>
    ))}
  </div>
);

// A drawn close-up cutaway, not a scan/reproduction of real currency or a
// detached piece of the character atlas. Sleeves and hands remain continuous.
const CashPass = ({
  mode = "borrow",
  from = 0,
}: {
  mode?: "borrow" | "return";
  from?: number;
}) => {
  const f = useCurrentFrame() - from,
    visible = ease(f, 0, 10),
    p = ease(f, 15, 70),
    back = ease(f, 83, 118);
  const returning = mode === "return";
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 300,
        width: 880,
        height: 350,
        background: "#fff2da",
        border: "3px solid #c9ab76",
        borderRadius: 20,
        overflow: "hidden",
        opacity: visible,
        boxShadow: "0 14px 32px #172b4544",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 24px",
          fontSize: 29,
          color: "#172b45",
          fontWeight: 700,
        }}
      >
        <span>{returning ? "সাজিদ" : "রাফি"}</span>
        <span>{returning ? "রাফি" : "সাজিদ"}</span>
      </div>
      <svg
        viewBox="0 0 880 250"
        width="880"
        height="250"
        aria-label={returning ? "সাজিদ টাকা ফেরত দেয়" : "রাফি একশ টাকা ধার দেয়"}
      >
        <g transform={`translate(${p * 65 - back * 90},0)`}>
          <path
            d="M-10 120L140 109L194 82Q228 68 258 91L330 128Q349 142 338 158L273 176L209 168L149 195L-10 202Z"
            fill="#ffbf78"
            stroke="#46362a"
            strokeWidth="5"
          />
          <path
            d="M-10 116L140 109L150 195L-10 202Z"
            fill={returning ? "#26334e" : "#5182b2"}
            stroke="#263448"
            strokeWidth="5"
          />
        </g>
        <g transform={`translate(${-p * 60 + back * 85},0)`}>
          <path
            d="M890 124L744 112L684 146L602 140Q578 140 577 157Q578 175 607 180L679 192L739 211L890 213Z"
            fill="#ffc57e"
            stroke="#46362a"
            strokeWidth="5"
          />
          <path
            d="M890 124L744 112L739 211L890 213Z"
            fill={returning ? "#5182b2" : "#26334e"}
            stroke="#263448"
            strokeWidth="5"
          />
        </g>
        <g
          transform={`translate(${238 + p * 68 + (f > 83 ? back * 85 : 0)},84) rotate(-5 150 50)`}
        >
          <rect
            width="300"
            height="103"
            rx="7"
            fill="#c6cf9c"
            stroke="#647653"
            strokeWidth="4"
          />
          <rect
            x="10"
            y="9"
            width="280"
            height="85"
            rx="5"
            fill="none"
            stroke="#7d8c62"
            strokeWidth="2"
          />
          <text
            x="150"
            y="70"
            textAnchor="middle"
            fill="#425a48"
            fontFamily="Nirmala UI"
            fontSize="60"
            fontWeight="700"
          >
            ১০০
          </text>
        </g>
        <g transform={`translate(${p * 65 - back * 90},0)`}>
          <path
            d="M246 100L316 119Q334 126 328 140Q323 150 300 143L252 130"
            fill="#ffbf78"
            stroke="#46362a"
            strokeWidth="5"
          />
        </g>
        <g transform={`translate(${-p * 60 + back * 85},0)`}>
          <path
            d="M670 148L605 134Q583 131 579 145Q578 159 600 164L650 178"
            fill="#ffc57e"
            stroke="#46362a"
            strokeWidth="5"
          />
        </g>
      </svg>
    </div>
  );
};

export const Hook = () => {
  const f = useCurrentFrame(),
    a = f;
  return (
    <SceneShell
      panel={0}
      file="tea-stall.png"
      shot={{ scale: 1.055, y: -30, origin: "65% 62%" }}
    >
      <Actor
        who="rafi"
        x={-110}
        y={1680}
        w={810}
        absolute={a}
        {...acting("rafi", a, f, 3)}
      />
      <Actor
        who="sajid"
        x={470}
        y={1680}
        w={760}
        absolute={a}
        {...acting("sajid", a, f, 0)}
      />
      <div
        style={{
          position: "absolute",
          left: 75,
          top: 285,
          color: "#ffd070",
          fontSize: 85,
          fontWeight: 800,
          textShadow: "0 4px 16px #172b45",
        }}
      >
        ১০০ টাকার বন্ধুত্ব
      </div>
      <Quotes absolute={a} />
      <Dialogue text="কথাটা রাফির গায়ে লাগল।" from={174} />
    </SceneShell>
  );
};
export const Borrow = () => {
  const f = useCurrentFrame(),
    a = 238 + f;
  return (
    <SceneShell
      panel={2}
      label="তিন দিন আগে • অফিসের বাইরে"
      shot={{ scale: 1.025, y: -25 }}
    >
      <Actor
        who="rafi"
        x={-90}
        y={1720}
        w={800}
        absolute={a}
        {...acting("rafi", a, f)}
      />
      <Actor
        who="sajid"
        x={470}
        y={1720}
        w={760}
        absolute={a}
        {...acting("sajid", a, f, 3)}
      />
      {f < 230 ? (
        <Note
          text="মানিব্যাগ আনেনি সাজিদ"
          detail="বাড়ি ফেরার জন্য ধার চাইলো"
          from={20}
        />
      ) : (
        <CashPass from={230} />
      )}
      <Quotes absolute={a} />
    </SceneShell>
  );
};
export const Delay = () => {
  const f = useCurrentFrame(),
    a = 555 + f;
  return (
    <SceneShell
      panel={0}
      label="পরদিন • অফিস"
      shot={{ scale: 1.05, y: -30, origin: "35% 63%" }}
    >
      <Actor
        who="rafi"
        x={-60}
        y={1700}
        w={820}
        absolute={a}
        {...acting("rafi", a, f, 3)}
      />
      <Actor
        who="sajid"
        x={490}
        y={1700}
        w={730}
        absolute={a}
        {...acting("sajid", a, f)}
      />
      <Note text="ফেরত দেওয়ার কথা ছিল গতকাল" detail="মনে করিয়ে দিল রাফি" />
      <Quotes absolute={a} />
      <Dialogue text="কিন্তু টাকাটা আর দেওয়া হলো না।" from={168} />
    </SceneShell>
  );
};
export const TeaArrival = () => {
  const f = useCurrentFrame(),
    a = 765 + f;
  return (
    <SceneShell
      panel={0}
      file="tea-stall.png"
      label="সেদিন বিকেল • করিম চাচার দোকান"
      shot={{ scale: 1.025, y: -20 }}
    >
      <Actor
        who="rafi"
        x={-100}
        y={1720}
        w={800}
        absolute={a}
        {...acting("rafi", a, f)}
      />
      <Actor
        who="sajid"
        x={470}
        y={1720}
        w={760}
        absolute={a}
        {...acting("sajid", a, f)}
      />
      <TeaCounter />
      <Badge text="আজ সবার চা সাজিদের!" from={105} />
      <Quotes absolute={a} />
    </SceneShell>
  );
};
export const Dispute = () => {
  const f = useCurrentFrame(),
    a = 1052 + f;
  return (
    <SceneShell
      panel={0}
      file="tea-stall.png"
      shot={{ scale: 1.07, y: -38, origin: "60% 60%" }}
    >
      <Actor
        who="rafi"
        x={-120}
        y={1690}
        w={820}
        absolute={a}
        {...acting("rafi", a, f, 3)}
      />
      <Actor
        who="sajid"
        x={470}
        y={1690}
        w={770}
        absolute={a}
        {...acting("sajid", a, f, 3)}
      />
      <Note text="১০০ টাকা…" detail="নাকি দেওয়া কথার দাম?" from={42} />
      <Quotes absolute={a} />
    </SceneShell>
  );
};
export const Question = () => {
  const f = useCurrentFrame(),
    a = 1332 + f;
  return (
    <SceneShell
      panel={0}
      file="tea-stall.png"
      label="করিম চাচা কথাটা শুনলেন"
      shot={{ scale: 1.045, y: -26, origin: "30% 62%" }}
    >
      <Actor
        who="karim"
        x={-110}
        y={1700}
        w={820}
        absolute={a}
        {...acting("karim", a, f, 2)}
      />
      <Actor
        who="sajid"
        x={480}
        y={1700}
        w={750}
        absolute={a}
        {...acting("sajid", a, f, 3)}
      />
      <Quotes absolute={a} />
    </SceneShell>
  );
};
export const Realize = () => {
  const f = useCurrentFrame(),
    a = 1521 + f;
  return (
    <SceneShell
      panel={0}
      file="tea-stall.png"
      label="একটু নীরবতা"
      shot={{ scale: 1.055, y: -33, origin: "70% 62%" }}
    >
      <Actor
        who="rafi"
        x={-110}
        y={1700}
        w={810}
        absolute={a}
        {...acting("rafi", a, f, 0)}
      />
      <Actor
        who="sajid"
        x={470}
        y={1700}
        w={770}
        absolute={a}
        {...acting("sajid", a, f, 3)}
      />
      <Quotes absolute={a} />
    </SceneShell>
  );
};
export const Return = () => {
  const f = useCurrentFrame(),
    a = 1802 + f;
  return (
    <SceneShell panel={0} file="tea-stall.png" shot={{ scale: 1.025, y: -22 }}>
      <Actor
        who="rafi"
        x={-100}
        y={1720}
        w={800}
        absolute={a}
        {...acting("rafi", a, f)}
      />
      <Actor
        who="sajid"
        x={470}
        y={1720}
        w={760}
        absolute={a}
        {...acting("sajid", a, f, 3)}
      />
      {f < 90 ? (
        <CashPass mode="return" />
      ) : (
        <Badge text="ভুল স্বীকার করল সাজিদ" from={90} />
      )}
      <Quotes absolute={a} />
    </SceneShell>
  );
};
export const Warmth = () => {
  const f = useCurrentFrame(),
    a = 2009 + f;
  return (
    <SceneShell panel={0} file="tea-stall.png" shot={{ scale: 1.015, y: -10 }}>
      <Actor
        who="rafi"
        x={-80}
        y={1710}
        w={650}
        absolute={a}
        {...acting("rafi", a, f)}
      />
      <Actor
        who="karim"
        x={305}
        y={1710}
        w={600}
        absolute={a}
        {...acting("karim", a, f, 3)}
      />
      <Actor
        who="sajid"
        x={650}
        y={1710}
        w={630}
        absolute={a}
        flip
        {...acting("sajid", a, f)}
      />
      <TeaCounter />
      <Quotes absolute={a} />
      <Dialogue text="এবার দুজনেই হেসে ফেলল।" from={142} />
    </SceneShell>
  );
};
export const Lesson = () => {
  const f = useCurrentFrame(),
    a = 2193 + f;
  return (
    <SceneShell panel={0} file="tea-stall.png" shot={{ scale: 1.035, y: -25 }}>
      <Actor who="rafi" x={-60} y={1710} w={800} absolute={a} />
      <Actor who="sajid" x={500} y={1710} w={730} absolute={a} flip />
      <div
        style={{
          position: "absolute",
          left: 75,
          top: 270,
          right: 110,
          fontSize: 58,
          fontWeight: 700,
          lineHeight: 1.4,
          color: "#fff5df",
          textShadow: "0 3px 14px #172b45",
          opacity: ease(f, 8, 23),
        }}
      >
        টাকা কম বলে
        <br />
        <span style={{ color: "#ffd070" }}>কথার দাম কমে না।</span>
      </div>
      <Dialogue
        text={"বন্ধুত্বে হিসাব রাখা\nলজ্জার নয়।"}
        from={132}
        until={205}
      />
      <Dialogue
        text={"কথা না রেখে, হিসাব চাওয়াটাকেই\nদোষ বানানোটা ভুল।"}
        from={205}
      />
    </SceneShell>
  );
};
