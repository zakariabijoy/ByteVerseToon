import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Puppet } from "./Puppet";
import { SceneBackground, Emphasis, Location, progress } from "./Visuals";
import { Bottle, LunchSet, Spoon } from "./Props";
import { Phone } from "./Calls";
export const Reunion = () => {
  const f = useCurrentFrame(),
    t = 85.68 + f / 30,
    a = Math.round(t * 30);
  const laugh = t >= 91.5;
  const rafiClose = t >= 92.98 && t < 96;
  const momClose = t >= 98.44 && t < 100.36;
  return (
    <AbsoluteFill>
      <SceneBackground place="bus" zoom={1.02} />
      <Location text="বাসস্ট্যান্ড • দুপুর" />
      {rafiClose ? (
        <Puppet
          who="rafi"
          pose={0}
          talkPose={1}
          talk
          x={90}
          y={1460}
          w={900}
          absolute={a}
          gesture={0.4}
        />
      ) : momClose ? (
        <Puppet
          who="mother"
          pose={3}
          talkPose={1}
          talk
          x={110}
          y={1450}
          w={860}
          absolute={a}
          gesture={0.3}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateY(${(1 - progress(f, 0, 23)) * 36}px)`,
          }}
        >
          <Puppet
            who="rafi"
            pose={laugh ? 0 : 2}
            talkPose={0}
            x={-55}
            y={1400}
            w={650}
            absolute={a}
            gesture={0.2}
          />
          <Puppet
            who="mother"
            pose={laugh ? 3 : 0}
            talkPose={1}
            x={480}
            y={1400}
            w={640}
            absolute={a}
            talk={t >= 90.32 && t < 91.5}
            flip
            gesture={0.25}
          />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: -30,
          right: -30,
          top: 1370,
          height: 235,
          background:
            "repeating-linear-gradient(0deg,#8c552e 0px,#8c552e 40px,#674023 42px,#bd8750 47px)",
          borderTop: "8px solid #c7955b",
          boxShadow: "0 -5px 12px #172b4533",
        }}
      />
      {t >= 87.92 && t < 100.36 && (
        <LunchSet x={215} y={1280} scale={0.83} openAt={67} />
      )}{" "}
      {t >= 96 && t < 100.36 && (
        <Bottle x={615 - progress(f, 310, 345) * 70} y={1195} />
      )}{" "}
      {t >= 100.36 && t < 102.54 ? (
        <>
          <Phone mode="silent" x={255} y={800} w={420} />
          <Emphasis from={441} tone="cyan">
            এবার সাইলেন্ট।
          </Emphasis>
        </>
      ) : t >= 102.54 ? (
        <>
          <LunchSet x={210} y={1260} scale={0.85} spoons={false} />
          <Spoon x={330 - progress(f, 506, 550) * 110} y={1370} scale={0.8} />
          <Spoon
            x={570 + progress(f, 506, 550) * 120}
            y={1370}
            rotate={15}
            scale={0.8}
          />
          <Emphasis from={506} tone="cream">
            দুজনের দুপুর।
          </Emphasis>
        </>
      ) : t >= 90.32 && t < 91.5 ? (
        <Emphasis from={139}>হাত ধুয়েছিস?</Emphasis>
      ) : momClose ? (
        <Emphasis from={383} tone="cyan">
          হাত ধুতে হয় না?
        </Emphasis>
      ) : null}
    </AbsoluteFill>
  );
};
