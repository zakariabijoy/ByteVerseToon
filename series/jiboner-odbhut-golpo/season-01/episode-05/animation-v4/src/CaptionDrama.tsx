import React from "react";
import { interpolate } from "remotion";
import data from "./dialogue-timing.json";
import punches from "./punches.json";
type W = { text: string; start: number; end: number; who: string };
const groups: { words: W[]; start: number; end: number; who: string }[] = [];
for (const s of data.segments) {
  let g: W[] = [];
  const emit = () => {
    if (g.length)
      groups.push({
        words: g,
        start: g[0].start,
        end: g[g.length - 1].end,
        who: s.who,
      });
    g = [];
  };
  for (const w of s.words) {
    if (
      g.length &&
      (g.length >= 4 || [...g.map((x) => x.text), w.text].join(" ").length > 31)
    )
      emit();
    g.push(w);
    if (/[।!?]$/.test(w.text)) emit();
  }
  emit();
}
const names: Record<string, string> = {
  rafi: "রাফি",
  sajid: "সাজিদ",
  maya: "মায়া",
  manager: "ম্যানেজার",
};
export const CaptionDrama = ({ f }: { f: number }) => {
  const t = f / 30,
    p = punches.find((x) => t >= x.start && t < x.end);
  const c = groups.find(
    (x, i) =>
      t >= x.start && t < Math.min(x.end + 0.1, groups[i + 1]?.start ?? 999),
  );
  if (!p && !c) return null;
  const age = (t - (p?.start ?? c!.start)) * 30;
  const scale = interpolate(age, [0, 3, 8], [0.94, 1.025, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ws = p
    ? p.text.split(" ").map((text) => ({ text, start: 0, end: 0 }))
    : c!.words;
  return (
    <div
      style={{
        position: "absolute",
        left: 62,
        right: 116,
        bottom: 280,
        fontWeight: 900,
        transform: `scale(${scale})`,
        transformOrigin: "50% 100%",
        fontFamily: "Nirmala UI",
      }}
    >
      {!p && names[c!.who] ? (
        <div
          style={{
            fontSize: 27,
            color: "#fff0cb",
            textShadow: "0 3px 7px #071323",
            marginBottom: 12,
          }}
        >
          {names[c!.who]}
        </div>
      ) : null}
      <div
        style={{
          fontSize: p ? (p.text.length < 23 ? 89 : 77) : 75,
          lineHeight: 1.43,
          color: "#fff8e9",
          textShadow:
            "-4px -4px #172b45,4px -4px #172b45,-4px 4px #172b45,4px 4px #172b45,0 7px 12px #071323",
        }}
      >
        {ws.map((w, i) => {
          const marked = p ? w.text.includes(p.key) : t >= w.start && t < w.end;
          return (
            <React.Fragment key={i}>
              <span
                style={{
                  display: "inline-block",
                  background: marked ? p?.color || "#ffcf48" : "transparent",
                  color: marked ? "#172b45" : "#fff8e9",
                  padding: "0 7px",
                  borderRadius: 8,
                  textShadow: marked ? "none" : undefined,
                  boxShadow: marked ? "0 7px 0 #172b45" : undefined,
                  marginBottom: 5,
                }}
              >
                {w.text}
              </span>{" "}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
