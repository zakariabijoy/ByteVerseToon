import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import {
  Actor,
  SceneShell,
  Desk,
  Laptop,
  Badge,
  Dialogue,
  ease,
} from "./Stage";
import { Workstation } from "./Workstation";
import phrases from "./dialogue-phrases.json";
const names: Record<string, string> = {
  rafi: "রাফি",
  sajid: "সাজিদ",
  manager: "ম্যানেজার",
  karim: "করিম চাচা",
};
const QuoteTrack = ({ absolute }: { absolute: number }) => {
  const cue = phrases.find(
    (p) => absolute / 30 >= p.start && absolute / 30 < p.end,
  );
  return cue ? (
    <Dialogue
      text={cue.text}
      speaker={names[cue.who]}
      gold={cue.who === "karim" || cue.who === "sajid"}
    />
  ) : null;
};

const Note = ({
  title,
  detail,
  x = 580,
  y = 420,
  done = false,
  from = 0,
}: {
  title: string;
  detail: string;
  x?: number;
  y?: number;
  done?: boolean;
  from?: number;
}) => {
  const f = useCurrentFrame();
  const a = ease(f, from, from + 12);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 350,
        padding: "24px 26px",
        borderRadius: 16,
        background: "#fff4dc",
        border: "2px solid #c8bda6",
        boxShadow: "0 14px 30px #172b4540",
        color: "#172b45",
        opacity: a,
        transform: `translateY(${(1 - a) * 22}px) rotate(${done ? -2 : 2}deg)`,
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: done ? "#39745e" : "#926031",
        }}
      >
        {done ? "✓ " : ""}
        {title}
      </div>
      <div style={{ fontSize: 28, lineHeight: 1.45, marginTop: 12 }}>
        {detail}
      </div>
    </div>
  );
};
const Clock = ({ hour, label }: { hour: number; label: string }) => (
  <div
    style={{
      position: "absolute",
      right: 110,
      top: 315,
      width: 185,
      height: 230,
      textAlign: "center",
      color: "#172b45",
    }}
  >
    <svg viewBox="0 0 200 200" width="160" height="160">
      <circle
        cx="100"
        cy="100"
        r="92"
        fill="#fff4df"
        stroke="#172b45"
        strokeWidth="8"
      />
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d="M100 20V32"
          stroke="#a78350"
          strokeWidth="4"
          transform={`rotate(${i * 30} 100 100)`}
        />
      ))}
      <path
        d="M100 100V57"
        stroke="#172b45"
        strokeWidth="7"
        strokeLinecap="round"
        transform={`rotate(${hour * 30} 100 100)`}
      />
      <path
        d="M100 100V31"
        stroke="#b86d50"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="100" cy="100" r="7" fill="#172b45" />
    </svg>
    <div
      style={{
        fontSize: 29,
        fontWeight: 700,
        color: "#fff5df",
        textShadow: "0 2px 7px #172b45",
      }}
    >
      {label}
    </div>
  </div>
);

export const Hook = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell panel={0} shot={{ scale: 1.04, y: -30, origin: "40% 63%" }}>
      <Actor
        who="rafi"
        x={80}
        y={1740}
        w={920}
        pose={f < 160 ? 0 : 3}
        previousPose={0}
        changeAt={160}
        absolute={f}
      />
      {f < 154 ? (
        <div
          style={{
            position: "absolute",
            top: 240,
            left: 70,
            right: 90,
            fontSize: 65,
            lineHeight: 1.35,
            fontWeight: 700,
            color: "#fff5df",
            textShadow: "0 4px 14px #172b45",
            opacity: ease(f, 0, 10) * (1 - ease(f, 138, 154)),
          }}
        >
          ভালো মানুষ হওয়াটাই
          <br />
          <span style={{ color: "#ffd070" }}>কি ভুল?</span>
        </div>
      ) : (
        <>
          <Badge text="সবার কাজ শেষ…" from={163} />
          <Note
            title="নিজের কাজ?"
            detail="এখনো বাকি"
            x={650}
            y={550}
            from={220}
          />
        </>
      )}
      <Dialogue
        text={
          f < 314
            ? "সারাদিন সাহায্য করল।\nতবু বকা খেল রাফি!"
            : "ভালো মানুষ হওয়াটাই কি ভুল?"
        }
        from={164}
      />
    </SceneShell>
  );
};
export const Helpful = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell panel={0} label="অফিস • সকাল">
      <Desk top={1620} />
      <Workstation />
      <Badge text="আটকে গেলে, রাফিকে বলো" />
      <Note
        title="ছোট্ট সাহায্য"
        detail="একটু দেখবে?"
        x={650}
        y={470}
        from={55}
      />
      <Note
        title="আরেকটা অনুরোধ"
        detail="একবার মিলিয়ে দেবে?"
        x={630}
        y={680}
        from={125}
      />
    </SceneShell>
  );
};
export const FirstRequest = () => {
  const f = useCurrentFrame(),
    a = 615 + f,
    rafi = f >= 174;
  return (
    <SceneShell
      panel={0}
      shot={{ scale: 1.06, y: -35, origin: rafi ? "30% 62%" : "75% 62%" }}
    >
      <Actor
        who="rafi"
        x={-95}
        y={1670}
        w={790}
        talk={rafi}
        pose={0}
        absolute={a}
      />
      <Actor
        who="sajid"
        x={470}
        y={1670}
        w={760}
        talk={!rafi}
        flip={rafi}
        absolute={a}
      />
      <Desk top={1640} />
      <Laptop x={310} y={1350} />

      <QuoteTrack absolute={a} />
    </SceneShell>
  );
};
export const Requests = () => {
  const f = useCurrentFrame(),
    a = 831 + f;
  return (
    <SceneShell
      panel={0}
      label="একটার পর একটা অনুরোধ"
      shot={{ scale: 1.03, y: -38 }}
    >
      {f < 180 ? (
        <Workstation x={-180} w={1450} />
      ) : (
        <Actor who="rafi" x={30} y={1670} w={850} talk absolute={a} />
      )}
      <Desk top={1640} />
      <Note title="কম্পিউটারে সমস্যা" detail="একটু দেখবে?" x={620} y={430} />
      <Note
        title="রিপোর্টের হিসাব"
        detail="একবার মিলিয়ে দাও"
        x={580}
        y={670}
        from={87}
      />
      <QuoteTrack absolute={a} />
    </SceneShell>
  );
};
export const Deadline = () => {
  const f = useCurrentFrame(),
    a = 1091 + f;
  return (
    <SceneShell
      panel={0}
      label="দুপুর গড়িয়ে বিকেল"
      shot={{ scale: 1.055, y: -30 }}
    >
      <Actor
        who="rafi"
        x={-80}
        y={1670}
        w={880}
        pose={f < 90 ? 0 : 3}
        previousPose={0}
        changeAt={90}
        absolute={a}
      />
      <Desk top={1640} />
      <Laptop x={390} y={1350} />
      <Clock
        hour={interpolate(f, [0, 250], [12, 17], { extrapolateRight: "clamp" })}
        label="সময় পেরিয়ে গেল"
      />
      <Note
        title="প্রেজেন্টেশন"
        detail="সাজিদের কাজ শেষ"
        x={640}
        y={600}
        done
      />
      <Note
        title="নিজের কাজ"
        detail="এখনো জমা হয়নি"
        x={600}
        y={820}
        from={155}
      />
      <Dialogue
        text={"সবাইয়ের সমস্যার সমাধান হলো।\nরাফির কাজটাই পড়ে রইল।"}
        from={80}
      />
    </SceneShell>
  );
};
export const ManagerTalk = () => {
  const f = useCurrentFrame(),
    a = 1368 + f,
    rafi = f >= 165 && f < 225;
  return (
    <SceneShell
      panel={0}
      label="ম্যানেজার রাফির ডেস্কে"
      shot={{ scale: 1.05, y: -30, origin: rafi ? "25% 62%" : "75% 62%" }}
    >
      <Actor
        who="rafi"
        x={-145}
        y={1680}
        w={800}
        talk={rafi}
        pose={3}
        absolute={a}
      />
      <Actor
        who="manager"
        x={450}
        y={1680}
        w={780}
        talk={!rafi}
        pose={0}
        absolute={a}
      />
      <Desk top={1620} />
      <Laptop x={260} y={1330} />

      <QuoteTrack absolute={a} />
    </SceneShell>
  );
};
export const TeaTalk = () => {
  const f = useCurrentFrame(),
    a = 1803 + f,
    rafi = f >= 91 && f < 231,
    offer = f >= 231,
    karim = f >= 294 && f < 435;
  return (
    <SceneShell
      panel={0}
      file="tea-stall.png"
      label="সন্ধ্যা • করিম চাচার চায়ের দোকান"
      shot={{ scale: 1.025, y: -20, origin: "50% 64%" }}
    >
      <Actor
        who="rafi"
        x={-110}
        y={1690}
        w={800}
        talk={rafi}
        pose={f >= 435 ? 0 : 3}
        previousPose={3}
        changeAt={435}
        absolute={a}
      />
      <Actor
        who="karim"
        x={480 - (offer ? 12 * ease(f, 231, 260) : 0)}
        y={1690}
        w={700}
        talk={karim}
        pose={offer ? 1 : 0}
        flip
        absolute={a}
        gesture={0.6}
      />

      <QuoteTrack absolute={a} />
    </SceneShell>
  );
};
export const Boundaries = () => {
  const f = useCurrentFrame(),
    a = 2289 + f,
    reply = f >= 318;
  return (
    <SceneShell
      panel={0}
      label="পরদিন • একই অফিস"
      shot={{
        scale: reply ? 1.06 : 1.035,
        y: -35,
        origin: reply ? "72% 62%" : "30% 62%",
      }}
    >
      <Actor
        who="rafi"
        x={-80}
        y={1670}
        w={800}
        talk={!reply && f >= 111}
        absolute={a}
      />
      <Actor
        who="sajid"
        x={470}
        y={1670}
        w={760}
        talk={reply}
        flip={!reply}
        pose={0}
        absolute={a}
      />
      <Desk top={1640} />
      <Laptop x={350} y={1350} />
      <Badge text="আগে নিজের দায়িত্ব" from={100} />

      <QuoteTrack absolute={a} />
    </SceneShell>
  );
};
export const Relief = () => {
  const f = useCurrentFrame(),
    a = 2733 + f;
  return (
    <SceneShell panel={0} shot={{ scale: 1.03, y: -35 }}>
      <Actor who="rafi" x={-70} y={1670} w={800} absolute={a} />
      <Actor who="sajid" x={470} y={1670} w={760} flip absolute={a} />
      <Desk top={1640} />
      <Laptop x={350} y={1350} />
      <Badge text="বন্ধুত্বও শেষ হয়নি" from={20} />
      <Dialogue text="পৃথিবী থেমে যায়নি।" from={12} until={62} />
      <Dialogue text="বন্ধুত্বও শেষ হয়ে যায়নি।" from={62} />
    </SceneShell>
  );
};
export const Lesson = () => {
  const f = useCurrentFrame(),
    a = 2859 + f;
  return (
    <SceneShell panel={3} shot={{ scale: 1.03, y: -20, origin: "45% 65%" }}>
      <Actor who="rafi" x={110} y={1760} w={900} absolute={a} />
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 90,
          top: 260,
          color: "#fff5df",
          fontSize: 42,
          lineHeight: 1.5,
          fontWeight: 700,
          textShadow: "0 3px 12px #172b45",
          opacity: ease(f, 15, 35),
        }}
      >
        ভালো মানুষ হও।
        <br />
        <span style={{ color: "#ffd070" }}>নিজের সীমাটাও জানাও।</span>
      </div>
      <Dialogue
        text={"সাহায্য করতে চাওয়া আর সব দায়িত্ব\nনিজের কাঁধে নেওয়া এক কথা নয়।"}
        from={35}
        until={180}
      />
      <Dialogue
        text={
          "কখন পারবে, কতটা পারবে—\nসেটা স্পষ্ট করে বলাও\nভালো ব্যবহারের অংশ।"
        }
        from={180}
      />
    </SceneShell>
  );
};
