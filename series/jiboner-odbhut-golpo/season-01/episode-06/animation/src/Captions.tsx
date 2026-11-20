import React from "react";
import data from "./caption-pages.json";
import { progress } from "./Visuals";
const names: Record<string, string> = {
  rafi: "রাফি",
  mother: "মা",
  guard: "গার্ড",
  sajid: "সাজিদ",
};
export const Captions = ({ frame }: { frame: number }) => {
  const t = frame / 30;
  const page = data.find((p) => t >= p.start && t < p.end);
  if (!page) return null;
  const a = progress(frame, page.start * 30, page.start * 30 + 4);
  return (
    <div
      style={{
        position: "absolute",
        left: 62,
        right: 112,
        bottom: 258,
        fontWeight: 900,
        transform: `translateY(${(1 - a) * 12}px)`,
        opacity: a,
        color: "#fff8e9",
        textShadow:
          "-4px -4px #172b45,4px -4px #172b45,-4px 4px #172b45,4px 4px #172b45,0 7px 12px #071323",
      }}
    >
      {names[page.who] && (
        <div style={{ fontSize: 27, marginBottom: 10, color: "#ffdc90" }}>
          {names[page.who]}
        </div>
      )}
      <div style={{ fontSize: 74, lineHeight: 1.38 }}>
        {page.words.map((w, i) => (
          <React.Fragment key={i}>
            <span
              style={{
                display: "inline-block",
                padding: "0 5px",
                borderRadius: 7,
                background:
                  t >= w.start && t < w.end ? "#ffcf64" : "transparent",
                color: t >= w.start && t < w.end ? "#172b45" : undefined,
                textShadow: t >= w.start && t < w.end ? "none" : undefined,
              }}
            >
              {w.text}
            </span>{" "}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
