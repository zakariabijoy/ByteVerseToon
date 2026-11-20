import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Puppet } from "./Puppet";
import { SceneBackground, Desk, Location, Emphasis, progress } from "./Visuals";
import { LunchSet, Spoon } from "./Props";
export const Discovery = () => {
  const f = useCurrentFrame(),
    t = 30.26 + f / 30;
  const reveal = t >= 38.4;
  return (
    <AbsoluteFill>
      <SceneBackground
        place={t >= 35 && t < 38.4 ? "tea" : "office"}
        zoom={reveal ? 1.08 : 1}
      />
      <Location
        text={reveal ? "ব্যাগের ভেতর…" : "এখন • মায়ের রেখে যাওয়া ব্যাগ"}
      />
      {!reveal ? (
        <>
          <Puppet
            who="rafi"
            pose={3}
            x={80}
            y={1400}
            w={870}
            absolute={Math.round(t * 30)}
            gesture={0.15}
          />
          <Desk top={1390} />
          <div
            style={{
              position: "absolute",
              left: 220,
              top: 1190,
              width: 590,
              height: 230,
              background:
                "repeating-linear-gradient(85deg,#b79a75 0px,#cfb38c 9px,#b99d78 15px)",
              borderRadius: "45% 35% 18% 20%",
              boxShadow: "0 15px 25px #172b4555",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 390,
              top: 1070,
              width: 225,
              height: 180,
              border: "24px solid #b99b74",
              borderRadius: "50%",
            }}
          />
          {t > 35 && <Emphasis from={142}>বাসের সময় হয়ে গেছে!</Emphasis>}
        </>
      ) : (
        <>
          <Desk top={1010} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${1.08 + progress(f, 244, 420) * 0.12}) translateY(${-progress(f, 244, 420) * 12}px)`,
              transformOrigin: "48% 55%",
            }}
          >
            <LunchSet x={180} y={1015} scale={1.18} openAt={244} />
          </div>
          {t < 41.2 ? (
            <Emphasis from={244}>দুটো টিফিন…</Emphasis>
          ) : t < 42.3 ? (
            <Emphasis from={320} tone="cyan">
              দুটো চামচ।
            </Emphasis>
          ) : (
            <Emphasis from={361} tone="cream">
              আলুভর্তা!
            </Emphasis>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
export const Memory = () => {
  const f = useCurrentFrame(),
    t = 44.38 + f / 30;
  const rafi = t >= 48.64 && t < 54.74;
  return (
    <AbsoluteFill>
      <SceneBackground place="home" />
      <AbsoluteFill style={{ background: "#f7c98518" }} />
      <Location text="সেই সকাল • বাড়ি" />
      {rafi ? (
        <Puppet
          who="rafi"
          pose={0}
          talkPose={1}
          x={90}
          y={1430}
          w={880}
          absolute={Math.round(t * 30)}
          gesture={0.25}
          talk={t >= 50.96}
        />
      ) : (
        <Puppet
          who="mother"
          pose={0}
          talkPose={1}
          x={110}
          y={1450}
          w={860}
          absolute={Math.round(t * 30)}
          gesture={0.2}
          talk={t >= 47.76 && t < 48.64}
        />
      )}
      <Desk top={1410} />
      {t >= 50.96 && t < 54.74 ? (
        <Emphasis from={197} tone="cream">
          তোমার হাতের আলুভর্তা।
        </Emphasis>
      ) : t >= 54.74 ? (
        <Emphasis from={311} tone="gold">
          মা ভোলেননি।
        </Emphasis>
      ) : null}
    </AbsoluteFill>
  );
};
