import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, ease } from "./Stage";
export const Hook = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell
      panel={0}
      zoom={1.04}
      shot={
        f < 167
          ? { scale: 1, x: 0, y: 0 }
          : { scale: 1.11, x: -25, y: -10, origin: "49% 58%" }
      }
    >
      <Actor
        who="rafi"
        pose={f < 167 ? 0 : 2}
        previousPose={f >= 167 ? 0 : undefined}
        changeAt={f >= 167 ? 167 : undefined}
        x={-10}
        y={1810}
        w={1010}
        absolute={f}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 105,
          top: 230,
          fontSize: 63,
          lineHeight: 1.32,
          fontWeight: 800,
          textShadow: "0 3px 18px #172b45",
          opacity: 1 - ease(f, 164, 179),
        }}
      >
        যে কথাটা বলা
        <br />
        <span style={{ color: "#ffd070" }}>উচিত ছিল না</span>
      </div>
      <Dialogue text="রাফি জানত না…" from={168} until={205} />
      <Dialogue text="বন্ধু ভেবে বলা একটা কথাই…" from={211} until={267} />
      <Dialogue
        text={"তিন বছরের পরিশ্রমকে\nবিপদে ফেলে দেবে!"}
        from={270}
        until={342}
        gold
      />
    </SceneShell>
  );
};
