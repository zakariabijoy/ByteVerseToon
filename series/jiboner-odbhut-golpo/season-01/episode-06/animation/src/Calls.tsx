import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SceneBackground, Desk, Emphasis, Location, progress } from "./Visuals";
import { Puppet } from "./Puppet";
export const Phone = ({
  mode = "connected",
  timer = 0,
  x = 365,
  y = 1000,
  w = 330,
  speaker = "মা",
}: {
  mode?: "missed" | "dialing" | "connected" | "silent";
  timer?: number;
  x?: number;
  y?: number;
  w?: number;
  speaker?: string;
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: w * 1.55,
        background: "linear-gradient(130deg,#253b4e,#060e17)",
        border: "9px solid #57707c",
        borderRadius: 38,
        boxShadow: "10px 16px 24px #10223788",
        color: "#fff6e3",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 9,
          left: "35%",
          width: "30%",
          height: 9,
          borderRadius: 20,
          background: "#01050b",
        }}
      />
      <div
        style={{
          fontFamily: "Arial",
          fontSize: w * 0.06,
          padding: "34px 20px 0",
          textAlign: "left",
          opacity: 0.6,
        }}
      >
        12:24
      </div>
      <div style={{ marginTop: w * 0.08, fontSize: w * 0.18, fontWeight: 800 }}>
        {mode === "silent" ? "সাইলেন্ট" : speaker}
      </div>
      {mode === "missed" ? (
        <>
          <div style={{ fontSize: w * 0.09, color: "#ffcb77", marginTop: 12 }}>
            ৩টি মিসড কল
          </div>
          <div
            style={{
              padding: "22px 25px",
              fontSize: w * 0.073,
              textAlign: "left",
            }}
          >
            {["১২:০৮", "১২:১২", "১২:১৮"].map((v, i) => (
              <div
                key={v}
                style={{
                  borderBottom: "1px solid #ffffff22",
                  padding: "12px 0",
                  opacity: progress(f, 10 + i * 8, 18 + i * 8),
                }}
              >
                <span style={{ color: "#ffbd68" }}>↙</span> মা{" "}
                <span style={{ float: "right", opacity: 0.55 }}>{v}</span>
              </div>
            ))}
          </div>
        </>
      ) : mode === "silent" ? (
        <div style={{ marginTop: 35, fontSize: w * 0.12, color: "#a6e1c0" }}>
          শব্দ বন্ধ
        </div>
      ) : (
        <>
          <div
            style={{
              fontSize: w * 0.075,
              color: mode === "dialing" ? "#ffd16c" : "#a8edcf",
              marginTop: 12,
            }}
          >
            {mode === "dialing"
              ? "কল করা হচ্ছে…"
              : `কথা চলছে · 00:${String(Math.max(0, Math.floor(timer))).padStart(2, "0")}`}
          </div>
          <div
            style={{
              marginTop: w * 0.11,
              display: "flex",
              gap: 5,
              justifyContent: "center",
              height: 45,
              alignItems: "center",
            }}
          >
            {Array.from({ length: 15 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: 5,
                  height:
                    mode === "connected"
                      ? 9 + Math.abs(Math.sin(f * 0.22 + i * 0.8)) * 26
                      : 9,
                  background: "#bde9d6",
                  borderRadius: 5,
                }}
              />
            ))}
          </div>
          <div
            style={{
              margin: "28px auto 0",
              width: w * 0.21,
              height: w * 0.21,
              borderRadius: "50%",
              background: "#b9574c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Arial",
              fontSize: w * 0.12,
            }}
          >
            ⌒
          </div>
        </>
      )}
    </div>
  );
};
const ConnectedBadge = ({ timer }: { timer: number }) => (
  <div
    style={{
      position: "absolute",
      top: 285,
      left: 265,
      right: 265,
      background: "#172b45ef",
      border: "2px solid #b5dbc3",
      borderRadius: 40,
      padding: "12px 10px",
      textAlign: "center",
      fontSize: 28,
      color: "#b7e5c8",
    }}
  >
    ● মা • কথা চলছে · 00:
    {String(Math.max(0, Math.floor(timer))).padStart(2, "0")}
  </div>
);
export const CallScene = ({ second = false }: { second?: boolean }) => {
  const f = useCurrentFrame(),
    start = second ? 57.22 : 8.35,
    t = start + f / 30,
    a = Math.round(t * 30);
  const connected = second ? t >= 58.0 : t >= 17.9;
  const timer = t - (second ? 58 : 17.9);
  const closeMother = second
    ? (t >= 60.9 && t < 63.2) || t >= 65.18
    : (t >= 17.9 && t < 19.78) || t >= 26.6;
  if (!second && t < 15.78)
    return (
      <AbsoluteFill>
        <SceneBackground place="office" />
        <Location text="এক ঘণ্টা আগে" />
        <Puppet
          who="rafi"
          pose={3}
          x={260}
          y={1210}
          w={760}
          absolute={a}
          gesture={0.2}
        />
        <Desk top={1280} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${1 + progress(f, 0, 200) * 0.025})`,
            transformOrigin: "50% 65%",
          }}
        >
          <Phone mode="missed" x={165} y={740} w={455} />
        </div>
        {t > 11.1 && t < 13.34 && <Emphasis from={83}>৩টি মিসড কল</Emphasis>}
        {t >= 13.34 && (
          <Emphasis from={150} tone="cyan">
            প্রথম বড় মিটিং
          </Emphasis>
        )}
      </AbsoluteFill>
    );
  const who = closeMother ? "mother" : "rafi";
  return (
    <AbsoluteFill>
      <SceneBackground
        place={who === "mother" ? (second ? "bus" : "home") : "office"}
        zoom={1.03}
      />
      <Location
        text={second ? "এখন • রাফির ফিরতি কল" : "এক ঘণ্টা আগে • ফিরতি কল"}
      />
      {who === "mother" ? (
        <Puppet
          who="mother"
          pose={second ? 2 : 0}
          talkPose={second ? 2 : 1}
          x={110}
          y={1470}
          w={870}
          absolute={a}
          talk={connected}
          gesture={0.25}
        />
      ) : (
        <Puppet
          who="rafi"
          pose={second ? 3 : 3}
          talkPose={3}
          x={110}
          y={1450}
          w={870}
          absolute={a}
          talk={connected}
          gesture={0.2}
        />
      )}
      <Desk top={1400} />
      <Phone
        mode={connected ? "connected" : "dialing"}
        timer={timer}
        speaker={who === "mother" ? "রাফি" : "মা"}
        x={735}
        y={1170}
        w={190}
      />
      {connected && <ConnectedBadge timer={timer} />}
      <div
        style={{
          position: "absolute",
          top: 390,
          left: 75,
          fontSize: 31,
          fontWeight: 800,
          color: "#fff4df",
          textShadow: "0 3px 10px #172b45",
        }}
      >
        {who === "mother" ? "মা" : "রাফি"}
      </div>
      {!second && t >= 22.24 && t < 24.3 && (
        <Emphasis from={417}>মেসেজ করো।</Emphasis>
      )}
      {!second && t >= 26.6 && t < 28.12 && (
        <Emphasis from={548} tone="cream">
          ওপাশে নীরবতা…
        </Emphasis>
      )}
      {second && t >= 66.54 && t < 68.9 && (
        <Emphasis from={280} tone="cream">
          কিছু চাইতে আসিনি…
        </Emphasis>
      )}
      {second && t >= 68.9 && (
        <Emphasis from={350} tone="gold">
          আজ একসঙ্গে খাই।
        </Emphasis>
      )}
    </AbsoluteFill>
  );
};
