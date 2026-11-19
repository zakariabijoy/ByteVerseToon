import React from "react";
import { AbsoluteFill, Audio, staticFile, useCurrentFrame } from "remotion";
import { Backdrop, Branding } from "./Stage";
import { Puppet } from "./Puppet";
import type { Cast } from "./rig-data";
import timing from "./dialogue-timing.json";
import { FileTurn } from "./FileTurn";
import { Captions } from "./Captions";
import {
  Desk,
  SweetBox,
  PhoneEvidence,
  LaptopWork,
  Documents,
  move,
} from "./OfficeProps";

type Kind =
  | "maya"
  | "rafi"
  | "two"
  | "box"
  | "manager"
  | "work"
  | "phone"
  | "papers"
  | "corridor"
  | "door"
  | "review"
  | "task";
const shots: { s: number; e: number; kind: Kind; panel: number }[] = [
  { s: 0, e: 1.32, kind: "maya", panel: 0 },
  { s: 1.32, e: 2.66, kind: "rafi", panel: 0 },
  { s: 2.66, e: 3.84, kind: "maya", panel: 0 },
  { s: 3.84, e: 7.6, kind: "box", panel: 0 },
  { s: 7.6, e: 10.12, kind: "manager", panel: 1 },
  { s: 10.12, e: 11.96, kind: "rafi", panel: 0 },
  { s: 11.96, e: 15.88, kind: "manager", panel: 1 },
  { s: 15.88, e: 17.48, kind: "rafi", panel: 0 },
  { s: 17.48, e: 21.34, kind: "work", panel: 0 },
  { s: 21.34, e: 23.98, kind: "rafi", panel: 0 },
  { s: 23.98, e: 25.92, kind: "two", panel: 0 },
  { s: 25.92, e: 28.12, kind: "rafi", panel: 0 },
  { s: 28.12, e: 29.78, kind: "maya", panel: 0 },
  { s: 29.78, e: 32.64, kind: "maya", panel: 0 },
  { s: 32.64, e: 36.98, kind: "phone", panel: 0 },
  { s: 36.98, e: 40.08, kind: "phone", panel: 0 },
  { s: 40.08, e: 42.42, kind: "rafi", panel: 0 },
  { s: 42.42, e: 44.52, kind: "phone", panel: 0 },
  { s: 44.52, e: 46.88, kind: "maya", panel: 0 },
  { s: 46.88, e: 48.4, kind: "maya", panel: 0 },
  { s: 48.4, e: 52.26, kind: "corridor", panel: 2 },
  { s: 52.26, e: 54.9, kind: "two", panel: 1 },
  { s: 54.9, e: 56.0, kind: "papers", panel: 1 },
  { s: 56, e: 58.74, kind: "maya", panel: 1 },
  { s: 58.74, e: 60.96, kind: "manager", panel: 1 },
  { s: 60.96, e: 62.72, kind: "door", panel: 2 },
  { s: 62.72, e: 65.1, kind: "rafi", panel: 1 },
  { s: 65.1, e: 67.08, kind: "manager", panel: 1 },
  { s: 67.08, e: 69.28, kind: "maya", panel: 1 },
  { s: 69.28, e: 71.32, kind: "review", panel: 1 },
  { s: 71.32, e: 74.04, kind: "maya", panel: 1 },
  { s: 74.04, e: 76.9, kind: "two", panel: 0 },
  { s: 76.9, e: 77.98, kind: "rafi", panel: 0 },
  { s: 77.98, e: 80.58, kind: "task", panel: 0 },
  { s: 80.58, e: 81.2, kind: "maya", panel: 0 },
  { s: 81.2, e: 84.17, kind: "task", panel: 0 },
];
const talking = (who: Cast, f: number) =>
  (timing.cues as { who: string; start: number; end: number }[]).some(
    (x) => x.who === who && f / 30 >= x.start && f / 30 < x.end,
  );
const Person = ({
  who,
  f,
  x = -140,
  w = 1320,
  y = 2100,
  pose = 0,
  flip = false,
}: {
  who: Cast;
  f: number;
  x?: number;
  w?: number;
  y?: number;
  pose?: number;
  flip?: boolean;
}) => (
  <Puppet
    who={who}
    x={x}
    y={y}
    w={w}
    pose={pose}
    talk={talking(who, f)}
    talkPose={
      who === "maya"
        ? f >= 1567 && f < 1647
          ? 0
          : f >= 1335
            ? 1
            : 2
        : who === "rafi"
          ? 3
          : 1
    }
    absolute={f}
    flip={flip}
    gesture={talking(who, f) ? 1.1 : 0.3}
    lean={who === "rafi" && f > 700 ? -1.1 : 0}
  />
);
export const Episode = () => {
  const f = useCurrentFrame(),
    t = f / 30;
  const shot =
    shots.find((x) => t >= x.s && t < x.e) ?? shots[shots.length - 1];
  const q = f - Math.round(shot.s * 30);
  const tense = t < 7.6 || (t >= 25.92 && t < 48.4) || (t >= 54.9 && t < 62.72);
  const snap = [1.42, 15, 31.92, 41.22, 47.68, 55.78, 63.84, 83.26].reduce(
    (v, at) => {
      const d = f - Math.round(at * 30);
      return Math.max(v, d >= 0 && d < 20 ? 0.045 * (1 - d / 20) : 0);
    },
    0,
  );
  const push = move(q, 0, 100, 1, 1.035) + snap;
  let body: React.ReactNode;
  switch (shot.kind) {
    case "maya":
      body = (
        <>
          <Person who="maya" f={f} pose={t > 67 ? 0 : 2} />
          <Desk />
        </>
      );
      break;
    case "rafi":
      body = (
        <>
          <Person who="rafi" f={f} pose={t < 15 ? 0 : 3} />
          <Desk />
          {t >= 21.34 && t < 23.98 ? (
            <div
              style={{
                position: "absolute",
                left: 66,
                top: 1130,
                width: 520,
                height: 275,
                border: "12px solid #8799a3",
                borderRadius: 16,
                background: "#173349",
                color: "#fff",
                fontSize: 48,
                fontWeight: 800,
                padding: 32,
                boxSizing: "border-box",
              }}
            >
              প্রজেক্ট
              <br />
              <span style={{ color: "#a6f51c" }}>সম্পন্ন ✓</span>
            </div>
          ) : null}
        </>
      );
      break;
    case "two":
      body = (
        <>
          <Person
            who="maya"
            f={f}
            x={-190}
            w={940}
            y={1750}
            pose={t > 70 ? 3 : 2}
          />
          <Person
            who={shot.panel === 1 ? "manager" : "rafi"}
            f={f}
            x={460}
            w={900}
            y={1760}
            pose={shot.panel === 1 ? 0 : 3}
          />
          <Desk top={1440} />
          {t > 74 ? (
            <div
              style={{
                position: "absolute",
                left: 205,
                top: 1398,
                width: 610,
                height: 130,
                background: "#fff6df",
                border: "4px solid #a29985",
                transform: `translateX(${move(q, 0, 20, 220, 0)}px) rotate(-6deg)`,
                boxShadow: "10px 14px 10px #172b4544",
              }}
            />
          ) : null}
        </>
      );
      break;
    case "box":
      body =
        q < 44 ? (
          <>
            <Person who="rafi" f={f} pose={3} y={2190} w={1390} x={-180} />
            <Desk />
          </>
        ) : (
          <>
            <Desk top={1280} />
            <SweetBox phase={q - 44} />
          </>
        );
      break;
    case "manager":
      body =
        t > 58 && t < 60.96 && q < 33 ? (
          <>
            <Desk top={1280} />
            <FileTurn phase={q} />
          </>
        ) : (
          <>
            <Person
              who="manager"
              f={f}
              pose={t > 58 ? 3 : 0}
              x={-80}
              w={1290}
            />
            <Desk top={1450} />
            {t < 16 ? (
              <div
                style={{
                  position: "absolute",
                  left: 78,
                  top: 1190,
                  padding: "20px 32px",
                  borderLeft: "10px solid #ffd12d",
                  background: "#173349ee",
                  fontSize: 44,
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                নতুন টিম লিড · রাফি
              </div>
            ) : null}
            {t > 58 ? (
              <div
                style={{
                  position: "absolute",
                  left: 230,
                  top: 1360,
                  width: 500,
                  height: 185,
                  transform: `rotate(${move(q, 0, 40, -9, 3)}deg)`,
                  background: "#fff7e5",
                  border: "4px solid #9b907d",
                  boxShadow: "10px 18px 12px #07132344",
                }}
              />
            ) : null}
          </>
        );
      break;
    case "work":
      body =
        q < 24 ? (
          <>
            <Person who="maya" f={f} pose={0} y={2210} w={1410} x={-180} />
            <Desk />
          </>
        ) : (
          <>
            <Desk top={1370} />
            <LaptopWork phase={q - 24} />
            <div
              style={{
                position: "absolute",
                top: 290,
                left: 90,
                background: "#173349e8",
                padding: "17px 28px",
                color: "#fff",
                fontSize: 42,
                fontWeight: 800,
                borderLeft: "8px solid #ffd12d",
              }}
            >
              তিন রাতের পরিশ্রম
            </div>
          </>
        );
      break;
    case "phone":
      body =
        t >= 42.42 ? (
          <>
            <Person who="maya" f={f} pose={0} />
            <Desk />
          </>
        ) : (
          <>
            <Desk top={1480} />
            <PhoneEvidence
              phase={t >= 36.98 ? 140 : f - Math.round(32.64 * 30)}
            />
          </>
        );
      break;
    case "papers":
      body = (
        <>
          <Desk top={1280} />
          <Documents phase={q + 28} />
        </>
      );
      break;
    case "corridor":
      body = (
        <>
          <div
            style={{
              position: "absolute",
              left: 785,
              top: 250,
              width: 220,
              height: 1600,
              background: "#315164",
              borderLeft: "28px solid #866346",
              boxShadow: "-14px 0 25px #07132355",
            }}
          />
          <Person
            who="maya"
            f={f}
            x={move(q, 0, 90, -260, 55)}
            w={1150}
            y={2020 + Math.sin(q * 0.18) * 2.4}
            pose={3}
          />
          <div
            style={{
              position: "absolute",
              left: 790,
              top: 400,
              fontSize: 39,
              padding: 24,
              color: "#fff",
              background: "#173349",
            }}
          >
            ম্যানেজার
          </div>
        </>
      );
      break;
    case "door":
      body = (
        <>
          <div
            style={{
              position: "absolute",
              left: -30,
              top: 220,
              width: 190,
              height: 1700,
              background: "#876849",
              borderRight: "18px solid #c3a06c",
              boxShadow: "15px 0 30px #07132366",
            }}
          />
          <Person
            who="rafi"
            f={f}
            x={move(q, 0, 35, 100, 0)}
            w={1150}
            y={2040}
            pose={3}
          />
        </>
      );
      break;
    case "review":
      body = (
        <>
          <Desk top={1270} />
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 520,
              width: 730,
              height: 760,
              padding: 65,
              background: "#fff7e5",
              border: "5px solid #b7ab95",
              boxShadow: "15px 25px 25px #07132366",
              transform: "rotate(-3deg)",
              fontSize: 46,
              color: "#173349",
              fontWeight: 800,
            }}
          >
            <div
              style={{ borderBottom: "5px solid #173349", paddingBottom: 25 }}
            >
              কাজের মূল্যায়ন
            </div>
            <p style={{ fontSize: 44, lineHeight: 1.7 }}>
              মায়া রহমান
              <br />
              <span style={{ color: "#537b85" }}>কাজের ফাইল সংযুক্ত</span>
            </p>
            <div
              style={{
                border: "7px solid #be633a",
                padding: 20,
                display: "inline-block",
                color: "#be633a",
                transform: `rotate(-8deg) scale(${move(q, 0, 7, 1.5, 1)})`,
                opacity: move(q, 0, 6, 0, 1),
              }}
            >
              আপত্তি নথিভুক্ত
            </div>
          </div>
        </>
      );
      break;
    case "task":
      body =
        t < 80.58 ? (
          <>
            <Person who="maya" f={f} pose={0} y={2210} w={1410} x={-180} />
            <Desk />
          </>
        ) : (
          <>
            <Desk top={1280} />
            <Documents final phase={100 + q} />
          </>
        );
      break;
  }
  const hit = [0, 40, 438, 929, 1110, 1650, 1882].reduce(
    (v, s) =>
      Math.max(v, f >= s && f < s + 6 ? 0.1 * Math.exp(-(f - s) / 2) : 0),
    0,
  );
  return (
    <AbsoluteFill
      style={{
        background: "#172b45",
        fontFamily: "Nirmala UI",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("voiceover-original.wav")} />
      <Audio src={staticFile("dramatic-score-v3.wav")} volume={1} />
      <Audio src={staticFile("dramatic-effects-v3.wav")} volume={1} />
      <Backdrop panel={shot.panel} />
      <AbsoluteFill
        style={{ transform: `scale(${push})`, transformOrigin: "50% 50%" }}
      >
        {body}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(transparent 60%,#07132355 76%,#071323bd 100%)",
          boxShadow: tense
            ? "inset 0 0 200px 75px #07132365"
            : "inset 0 0 90px 20px #07132325",
        }}
      />
      {hit ? (
        <AbsoluteFill style={{ background: `rgba(255,222,161,${hit})` }} />
      ) : null}
      <Captions f={f} />
      <Branding />
    </AbsoluteFill>
  );
};
