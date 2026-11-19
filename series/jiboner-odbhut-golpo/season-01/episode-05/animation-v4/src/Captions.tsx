import React from "react";
import { interpolate } from "remotion";
import data from "./dialogue-timing.json";
type W = { text: string; start: number; end: number; who: string };
type S = { start: number; end: number; who: string; words: W[] };
const groups: { words: W[]; start: number; end: number; who: string }[] = [];
for (const s of data.segments as S[]) {
  let g: W[] = [];
  const emit = () => {
    if (g.length) {
      groups.push({
        words: g,
        start: g[0].start,
        end: g[g.length - 1].end,
        who: s.who,
      });
      g = [];
    }
  };
  for (const w of s.words) {
    if (
      g.length &&
      (g.length >= 4 || [...g.map((v) => v.text), w.text].join(" ").length > 31)
    )
      emit();
    g.push(w);
    if (/[।!?]$/.test(w.text)) emit();
  }
  emit();
}
const punches = [
  {
    start: 41.22,
    end: 42.43,
    text: "এটা স্যারকে পাঠাবি?",
    key: "পাঠাবি?",
    color: "#ffd12d",
  },
  { start: 44.52, end: 45.1, text: "না।", key: "না।", color: "#27dcef" },
  {
    start: 1.32,
    end: 3.55,
    text: "আমার কাজগুলোও কি তোর হয়ে গেল?",
    key: "আমার",
    color: "#ffd12d",
  },
  {
    start: 14.62,
    end: 15.9,
    text: "রাফি একাই সামলেছে।",
    key: "একাই",
    color: "#ffbb49",
  },
  {
    start: 31.5,
    end: 32.66,
    text: "তুই চুপ ছিলি কেন?",
    key: "চুপ",
    color: "#ffd12d",
  },
  {
    start: 46.88,
    end: 48.42,
    text: "আমার কাজের মূল্যায়ন চাই।",
    key: "মূল্যায়ন",
    color: "#27dcef",
  },
  {
    start: 55.0,
    end: 56.0,
    text: "এই অংশগুলো করেছি আমি।",
    key: "আমি।",
    color: "#ffd12d",
  },
  {
    start: 62.72,
    end: 64.48,
    text: "মায়া ঠিক বলছে।",
    key: "ঠিক",
    color: "#a6f51c",
  },
  {
    start: 81.2,
    end: 84.17,
    text: "আগে এখানে লিখ—কোন কাজটা কার।",
    key: "কার।",
    color: "#a6f51c",
  },
];
const names: Record<string, string> = {
  maya: "মায়া",
  rafi: "রাফি",
  manager: "ম্যানেজার",
};
export const Captions = ({ f }: { f: number }) => {
  const t = f / 30,
    p = punches.find((x) => t >= x.start && t < x.end);
  const c = groups.find(
    (x, i) =>
      t >= x.start && t < Math.min(x.end + 0.14, groups[i + 1]?.start ?? 99),
  );
  if (!p && !c) return null;
  const age = (t - (p?.start ?? c!.start)) * 30;
  const pop = interpolate(age, [0, 3, 7], [0.94, 1.035, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const words = p
    ? p.text.split(" ").map((text) => ({ text, start: 0, end: 0 }))
    : c!.words;
  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 112,
        bottom: 290,
        fontFamily: "Nirmala UI",
        fontWeight: 900,
        transform: `scale(${pop})`,
        transformOrigin: "50% 100%",
      }}
    >
      {!p && names[c!.who] ? (
        <div
          style={{
            fontSize: 27,
            color: "#fff2cd",
            marginBottom: 13,
            textShadow: "0 3px 8px #071323",
          }}
        >
          {names[c!.who]}
        </div>
      ) : null}
      <div
        style={{
          fontSize: p ? (p.text.length < 24 ? 91 : 78) : 75,
          lineHeight: 1.43,
          textShadow:
            "-3px -3px 0 #071323,3px -3px 0 #071323,-3px 3px 0 #071323,3px 3px 0 #071323,0 6px 14px #000",
          color: "#fff",
        }}
      >
        {words.map((w, i) => {
          const active = p ? w.text === p.key : t >= w.start && t <= w.end;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                padding: active ? "0 12px" : "0 1px",
                marginRight: 10,
                borderRadius: 7,
                background: active ? (p?.color ?? "#ffd12d") : "transparent",
                color: active ? "#071323" : "#fff",
                textShadow: active ? "none" : undefined,
                transform: active ? "rotate(-2deg)" : "none",
                boxShadow: active ? "0 6px 0 #071323" : "none",
              }}
            >
              {w.text}
            </span>
          );
        })}
      </div>
      {p ? (
        <div
          style={{
            height: 7,
            marginTop: 14,
            width: `${Math.min(100, (age / 9) * 100)}%`,
            background: p.color,
            boxShadow: "0 3px 0 #071323",
          }}
        />
      ) : null}
    </div>
  );
};
