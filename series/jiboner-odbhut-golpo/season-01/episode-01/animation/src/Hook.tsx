import React from "react";
import { useCurrentFrame } from "remotion";
import { Actor, SceneShell, Dialogue, ease } from "./Stage";
export const Hook = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell panel={0} zoom={1.08}>
      <Actor
        who="rafi"
        pose={2}
        x={-90 - ease(f, 0, 217) * 38}
        y={1790}
        w={1210}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 105,
          top: 230,
          fontSize: 67,
          lineHeight: 1.28,
          fontWeight: 800,
          textShadow: "0 3px 20px #172b45",
        }}
      >
        যে কথাটা বলা
        <br />
        <span style={{ color: "#ffd070" }}>উচিত ছিল না</span>
      </div>
      <Dialogue text="বন্ধু ভেবে বলা একটা কথা…" from={64} until={153} />
      <Dialogue text={"তিন বছরের পরিশ্রম\nবিপদে ফেলে দেবে!"} from={168} gold />
    </SceneShell>
  );
};
