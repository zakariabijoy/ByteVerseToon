import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { Backdrop, ease } from "./Stage";
import { Puppet } from "./Puppet";
import { Teacher } from "./Scenes";
import timing from "./dialogue-timing.json";
const smooth = (t: number) => {
  const q = Math.max(0, Math.min(1, t));
  return q * q * (3 - 2 * q);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * smooth(t);
const names: Record<string, string> = {
  rafi: "রাফি",
  sajid: "সাজিদ",
  karim: "করিম চাচা",
  teacher: "শিক্ষক",
};
const live = (who: string, a: number) =>
  timing.cues.some((c) => c.who === who && a / 30 >= c.start && a / 30 < c.end);
const chunks: {
  words: typeof timing.words;
  start: number;
  end: number;
  who: string;
}[] = [];
for (const segment of timing.segments) {
  let group: typeof timing.words = [];
  const emit = () => {
    if (group.length) {
      chunks.push({
        words: group,
        start: group[0].start,
        end: group[group.length - 1].end,
        who: segment.who,
      });
      group = [];
    }
  };
  for (const w of segment.words) {
    if (
      group.length &&
      (group.length >= 4 ||
        [...group.map((x) => x.text), w.text].join(" ").length > 32)
    )
      emit();
    group.push(w);
    if (/[।!?]$/.test(w.text)) emit();
  }
  emit();
}
const Captions = ({ a }: { a: number }) => {
  const t = a / 30,
    c = chunks.find(
      (x, i) =>
        t >= x.start && t < Math.min(x.end + 0.17, chunks[i + 1]?.start ?? 99),
    );
  if (!c) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 68,
        right: 112,
        bottom: 292,
        fontFamily: "Nirmala UI",
        textShadow: "-2px -2px 0 #172b45,2px 2px 0 #172b45,0 4px 18px #071523",
        fontWeight: 800,
      }}
    >
      {names[c.who] ? (
        <div style={{ fontSize: 27, marginBottom: 13, color: "#ffd071" }}>
          {names[c.who]}
        </div>
      ) : null}
      <div style={{ fontSize: a < 102 ? 78 : 64, lineHeight: 1.33 }}>
        {c.words.map((w, i) => (
          <span
            key={i}
            style={{
              color: t >= w.start && t <= w.end ? "#ffd16f" : "#fff9e8",
            }}
          >
            {w.text}{" "}
          </span>
        ))}
      </div>
    </div>
  );
};
const World = ({
  f,
  children,
  zoom = 1.04,
  pan = 0,
  tilt = 0,
  counter = false,
}: {
  f: number;
  children: React.ReactNode;
  zoom?: number;
  pan?: number;
  tilt?: number;
  counter?: boolean;
}) => {
  const push = ease(f, 0, 75),
    slide = 1 - ease(f, 0, 12);
  return (
    <AbsoluteFill
      style={{
        background: "#172b45",
        overflow: "hidden",
        fontFamily: "Nirmala UI",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -35,
          transform: `scale(${1.06 + push * 0.035}) translateX(${-pan * 0.12}px)`,
        }}
      >
        <Backdrop panel={0} file="tea-stall.png" />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translate(${pan + slide * 24}px,${tilt}px) scale(${zoom + push * 0.055})`,
          transformOrigin: "50% 49%",
        }}
      >
        {children}
      </div>
      {counter ? (
        <div
          style={{
            position: "absolute",
            left: -30,
            right: -30,
            top: 1510,
            height: 410,
            background:
              "linear-gradient(#d0a16a 0 12px,#9d7048 15px,#755036 40px,#443029 160px)",
            boxShadow: "0 -8px 28px #172b4544",
          }}
        />
      ) : null}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(transparent 53%,#0b182611 65%,#071522b0 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
const Person = ({
  who,
  a,
  x,
  y = 1750,
  w = 850,
  pose = 0,
  talkPose = 1,
  step = 0,
  nod = 0,
}: {
  who: "rafi" | "sajid" | "karim";
  a: number;
  x: number;
  y?: number;
  w?: number;
  pose?: number;
  talkPose?: number;
  step?: number;
  nod?: number;
}) => (
  <Puppet
    who={who}
    absolute={a}
    talk={live(who, a)}
    pose={pose}
    talkPose={talkPose}
    x={x + step}
    y={y >= 1850 ? y + 140 : y}
    w={w}
    gesture={live(who, a) ? 1.35 : 0.35}
    lean={nod}
  />
);
const Steam = ({ x, y, a }: { x: number; y: number; a: number }) => (
  <g transform={`translate(${x},${y})`}>
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M${i * 32} 0Q${i * 32 + 28} -35 ${i * 32 + 4} -66T${i * 32 + 10} -132`}
        fill="none"
        stroke="#fff3ce"
        strokeWidth={5}
        opacity={0.14 + 0.08 * Math.sin(a * 0.05 + i)}
        transform={`translate(${Math.sin(a * 0.035 + i) * 7},${-((a + i * 17) % 70) * 0.3})`}
      />
    ))}
  </g>
);
const Glass = () => (
  <g>
    <path
      d="M0 0H190L174 302H20Z"
      fill="#dccaa855"
      stroke="#f9e3b6"
      strokeWidth={7}
    />
    <path d="M13 105H180L168 288H27Z" fill="#b86a21" />
    <ellipse cx={95} cy={105} rx={83} ry={12} fill="#d08a35" />
    <path
      d="M28 25L38 270M157 20L148 276"
      stroke="#fff4d1"
      strokeWidth={5}
      opacity={0.65}
    />
    <ellipse
      cx={95}
      cy={0}
      rx={95}
      ry={15}
      fill="#fff1cc33"
      stroke="#f9e3b6"
      strokeWidth={5}
    />
  </g>
);
const CupAction = ({ f, a }: { f: number; a: number }) => {
  const down = ease(f, 0, 25),
    release = ease(f, 31, 54),
    dy =
      -180 * (1 - down) +
      Math.sin((f - 25) * 0.8) *
        Math.exp(-Math.max(0, f - 25) / 5) *
        3 *
        (f > 25 ? 1 : 0);
  return (
    <svg
      width={1080}
      height={1920}
      viewBox="0 0 1080 1920"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <linearGradient id="tablewood" x2="0" y2="1">
          <stop stopColor="#c39661" />
          <stop offset="1" stopColor="#69442e" />
        </linearGradient>
      </defs>
      <path d="M-80 1250L1150 1175V1940H-80Z" fill="url(#tablewood)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M-20 ${1350 + i * 110}L1110 ${1270 + i * 110}`}
          stroke="#d2aa7770"
          strokeWidth={3}
        />
      ))}
      <ellipse
        cx={539}
        cy={1245}
        rx={150}
        ry={22}
        fill="#54351b66"
        opacity={down}
      />
      <g transform={`translate(435,${940 + dy})`}>
        <Glass />
        <Steam x={58} y={-20} a={a} />
      </g>
      <g transform={`translate(${release * 530},${dy - release * 80})`}>
        <path
          d="M1130 840L900 851L760 933L636 971L581 994Q558 1011 577 1027Q590 1036 610 1026L681 1004L639 1068Q630 1087 650 1095Q664 1100 678 1080L727 1029L810 1009L934 949L1130 949Z"
          fill="url(#ep4-teacher-skin)"
          stroke="#62462f"
          strokeWidth={6}
        />
        <path
          d="M1130 832L955 833L918 956L1130 966Z"
          fill="#a5a57e"
          stroke="#5d654e"
          strokeWidth={7}
        />
        <path
          d="M621 1027L658 1015M644 1047L681 1025M663 1064L695 1037"
          stroke="#ae7853"
          fill="none"
          strokeWidth={4}
        />
      </g>
    </svg>
  );
};
const Book = ({
  open = false,
  reveal = 1,
}: {
  open?: boolean;
  reveal?: number;
}) => (
  <g>
    <path
      d="M0 20L615 0L638 400L20 430Z"
      fill="#ad6a52"
      stroke="#503b31"
      strokeWidth={6}
    />
    <path
      d="M-10 0L600 -20L625 375L5 405Z"
      fill="#507985"
      stroke="#304b58"
      strokeWidth={7}
    />
    <path
      d="M28 12L580 -8L600 346L48 370Z"
      fill="#fff4d9"
      stroke="#c7b496"
      strokeWidth={3}
    />
    {[65, 120, 175, 230, 285, 340].map((y) => (
      <path
        key={y}
        d={`M68 ${y}L567 ${y - 18}`}
        stroke="#aebec1"
        strokeWidth={2}
      />
    ))}
    <path d="M100 8L120 360" stroke="#d3a294" strokeWidth={2} />
    <text x={145} y={122} fill="#263f53" fontFamily="Nirmala UI" fontSize={53}>
      ৭ + ৫ = ১২
    </text>
    <path
      d="M463 64L484 88L540 30"
      stroke="#bd4d3b"
      strokeWidth={12}
      strokeLinecap="round"
      fill="none"
      strokeDasharray={140}
      strokeDashoffset={140 * (1 - reveal)}
    />
    {open ? (
      <>
        <text
          x={140}
          y={229}
          fill="#b04735"
          fontFamily="Nirmala UI"
          fontSize={48}
          opacity={Math.min(1, reveal * 2)}
        >
          আবার চেষ্টা করো।
        </text>
        <text
          x={142}
          y={305}
          fill="#b04735"
          fontFamily="Nirmala UI"
          fontSize={62}
          opacity={Math.max(0, reveal * 2 - 1)}
        >
          পারবে।
        </text>
      </>
    ) : null}
  </g>
);
const Falling = ({ f, a }: { f: number; a: number }) => {
  const p = ease(f, 5, 38),
    bounce =
      f > 38 ? Math.sin((f - 38) * 0.6) * Math.exp(-(f - 38) / 8) * 14 : 0;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <g
        transform={`translate(${210 + p * 100},${650 + p * p * 650 - bounce}) rotate(${-9 + p * 17} 300 200) scale(.88)`}
      >
        <Book />
      </g>
      <g
        transform={`translate(${80 + p * 90},${720 + p * p * 650}) rotate(${7 - p * 21} 300 200) scale(.8)`}
      >
        <path
          d="M0 0H600V380H0Z"
          fill="#ad6a52"
          stroke="#533e30"
          strokeWidth={7}
        />
        <rect x={130} y={110} width={330} height={130} fill="#f4e7c7" />
        <path d="M170 170H420" stroke="#bbaf97" strokeWidth={4} />
      </g>
    </svg>
  );
};
const Pickup = ({ f }: { f: number }) => {
  const reach = ease(f, 0, 22),
    lift = ease(f, 27, 63),
    dx = 180 * (1 - reach),
    dy = -480 * lift;
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <path d="M0 1550L1080 1430V1920H0Z" fill="#986d4c88" />
      <g
        transform={`translate(175,${1280 + dy}) rotate(${-8 + lift * 9} 300 180) scale(1.08)`}
      >
        <Book />
      </g>
      <g transform={`translate(${dx},${dy})`} opacity={ease(f, 0, 6)}>
        <path
          d="M1140 1010L916 1050L828 1162L752 1244L677 1261Q647 1263 649 1285Q652 1303 676 1297L726 1283L712 1311Q710 1335 734 1338L780 1315L854 1230L951 1150L1140 1120Z"
          fill="url(#ep4-young-skin)"
          stroke="#63432d"
          strokeWidth={6}
        />
        <path
          d="M1140 998L972 1024L948 1156L1140 1129Z"
          fill="#5287b7"
          stroke="#294b6b"
          strokeWidth={8}
        />
        <path
          d="M741 1261L779 1240M738 1292L775 1267M750 1311L791 1277"
          fill="none"
          stroke="#bd8458"
          strokeWidth={4}
        />
      </g>
    </svg>
  );
};
const ReadPage = ({ f, a }: { f: number; a: number }) => {
  const reveal = ease(f, 0, 22),
    second = a >= 805,
    p = ease(f, 0, 80);
  return (
    <svg
      width={1080}
      height={1920}
      style={{
        position: "absolute",
        inset: 0,
        transform: `translateY(${-p * 22}px) rotate(${-2 + p * 1.2}deg)`,
      }}
    >
      <g transform="translate(100,570) scale(1.4 2.0)">
        <Book open={second} reveal={second ? ease(a, 805, 860) : reveal} />
      </g>
      <path
        d="M1120 1210L1000 1160L945 1190L913 1272Q908 1290 925 1295Q939 1298 946 1281L968 1245L969 1414Q968 1434 988 1434L1037 1378L1120 1348Z"
        fill="url(#ep4-young-skin)"
        stroke="#6a472f"
        strokeWidth={6}
      />
      <path
        d="M1120 1340L1040 1354L1001 1445L1120 1454Z"
        fill="#5185b4"
        stroke="#294c6b"
        strokeWidth={7}
      />
    </svg>
  );
};
const ChairAction = ({
  f,
  sleeve = "#26354f",
}: {
  f: number;
  sleeve?: string;
}) => {
  const reach = ease(f, 0, 16),
    push = ease(f, 18, 57),
    withdraw = ease(f, 66, 90);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <ellipse
        cx={500 - push * 150}
        cy={1730}
        rx={260}
        ry={35}
        fill="#1d232a55"
      />
      <g
        transform={`translate(${-push * 150},${-Math.sin(push * Math.PI) * 8})`}
      >
        <path
          d="M280 760L760 740L770 1280L300 1300Z"
          fill="#a77644"
          stroke="#503521"
          strokeWidth={12}
        />
        <path
          d="M325 810L716 794L723 1230L340 1247Z"
          fill="url(#ep4-wood)"
          stroke="#76532e"
          strokeWidth={8}
        />
        {[400, 470, 540, 610].map((x) => (
          <path
            key={x}
            d={`M${x} 826L${x + 14} 1224`}
            stroke="#b1844e"
            strokeWidth={3}
          />
        ))}
        <path
          d="M250 1290L790 1268L825 1370L235 1393Z"
          fill="url(#ep4-wood)"
          stroke="#503521"
          strokeWidth={9}
        />
        <path
          d="M285 1390L253 1770M778 1370L812 1743"
          stroke="#604127"
          strokeWidth={32}
        />
        <g
          transform={`translate(${(1 - reach) * 420 + withdraw * 500},${withdraw * -160})`}
        >
          <path
            d="M1190 690L983 697L877 741L746 749Q714 749 711 771Q712 793 743 791L799 790L771 819Q764 836 782 845Q796 851 809 838L862 791L985 768L1190 785Z"
            fill="url(#ep4-young-skin)"
            stroke="#63432d"
            strokeWidth={6}
          />
          <path
            d="M1190 678L1000 684L987 779L1190 800Z"
            fill={sleeve}
            stroke="#283b4e"
            strokeWidth={8}
          />
          <path
            d="M762 776L804 770M790 810L827 779"
            fill="none"
            stroke="#b67b50"
            strokeWidth={4}
          />
        </g>
      </g>
    </svg>
  );
};
const CoinsAction = ({ f }: { f: number }) => {
  const p = ease(f, 0, 35);
  return (
    <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
      <path
        d="M-20 700Q410 570 960 750L1110 1930H-20Z"
        fill="#a9a67d"
        stroke="#60634b"
        strokeWidth={9}
      />
      <path
        d="M250 1000L720 970L700 1440Q480 1510 270 1420Z"
        fill="#98986e"
        stroke="#60634b"
        strokeWidth={9}
      />
      <path d="M290 1050L680 1022" stroke="#d5cf9a" strokeWidth={5} />
      <g transform={`translate(0,${160 - p * 250})`}>
        <path
          d="M1160 1120L930 1090L790 1130L626 1115L495 1128Q464 1137 480 1161L580 1200L706 1226L836 1210L964 1200L1160 1220Z"
          fill="url(#ep4-teacher-skin)"
          stroke="#69492f"
          strokeWidth={8}
        />
        <path
          d="M1160 1107L986 1082L950 1212L1160 1240Z"
          fill="#a5a47a"
          stroke="#60634b"
          strokeWidth={8}
        />
        {[0, 1, 2].map((i) => (
          <g
            key={i}
            transform={`translate(${625 + i * 52},${1140 - i * 7})`}
            opacity={ease(f, 10 + i * 4, 22 + i * 4)}
          >
            <ellipse
              rx={35}
              ry={18}
              fill="url(#ep4-coin)"
              stroke="#6a716f"
              strokeWidth={5}
            />
            <ellipse
              rx={23}
              ry={10}
              fill="none"
              stroke="#e7e1ca"
              strokeWidth={3}
            />
          </g>
        ))}
      </g>
    </svg>
  );
};
const Scene = ({
  start,
  children,
}: {
  start: number;
  children: (f: number, a: number) => React.ReactNode;
}) => {
  const f = useCurrentFrame(),
    a = start + f;
  return (
    <>
      <>{children(f, a)}</>
      <Captions a={a} />
    </>
  );
};
export const Hook = () => (
  <Scene start={0}>
    {(f, a) =>
      f < 48 ? (
        <World f={f} zoom={1.015} pan={-10}>
          <Person
            who="sajid"
            a={a}
            x={-145}
            y={1880}
            w={1260}
            pose={0}
            nod={-1}
          />
        </World>
      ) : (
        <World f={f - 48} zoom={1.03} pan={-35}>
          <Teacher a={a} pose={0} x={-80} y={2210} w={1360} />
        </World>
      )
    }
  </Scene>
);
export const Hurt = () => (
  <Scene start={102}>
    {(f, a) =>
      a < 195 ? (
        <World f={f} counter pan={-45}>
          <Teacher a={a} pose={0} x={270} y={1810} w={840} />
          <div style={{ filter: "blur(3px)", opacity: 0.75 }}>
            <Person who="sajid" a={a} x={-760} y={2180} w={1250} pose={0} />
          </div>
        </World>
      ) : a < 265 ? (
        <World f={a - 195}>
          <CupAction f={a - 195} a={a} />
        </World>
      ) : (
        <World f={a - 265} zoom={1.02} pan={-55}>
          <Teacher a={a} pose={0} x={-150} y={2240} w={1390} />
        </World>
      )
    }
  </Scene>
);
export const Corner = () => (
  <Scene start={336}>
    {(f, a) =>
      a < 429 ? (
        <World f={f} counter zoom={1.04} pan={-60}>
          <Teacher a={a} pose={0} x={120} y={1780} w={970} />
        </World>
      ) : a < 492 ? (
        <World f={a - 429} zoom={1.09} pan={-120} tilt={-170}>
          <Teacher a={a} pose={0} x={-230} y={2120} w={1350} />
        </World>
      ) : a < 535 ? (
        <World f={a - 492} zoom={1.04}>
          <Person
            who="sajid"
            a={a}
            x={-140}
            y={1910}
            w={1220}
            pose={0}
            nod={1.7}
          />
        </World>
      ) : (
        <World f={a - 535} zoom={1.03}>
          <Person
            who="rafi"
            a={a}
            x={-100}
            y={1910}
            w={1170}
            pose={3}
            nod={-1}
          />
        </World>
      )
    }
  </Scene>
);
export const Fallen = () => (
  <Scene start={570}>
    {(f, a) => (
      <World
        f={f}
        zoom={1.025}
        pan={lerp(10, -55, f / 50)}
        tilt={lerp(-50, 30, f / 50)}
      >
        <Teacher a={a} pose={2} x={-35} y={1890} w={1000} />
        <Falling f={f} a={a} />
      </World>
    )}
  </Scene>
);
export const Notebook = () => (
  <Scene start={660}>
    {(f, a) =>
      a < 730 ? (
        <World f={f} zoom={1.015}>
          <Pickup f={f} />
        </World>
      ) : a < 878 ? (
        <World f={a - 730} zoom={1.01}>
          <ReadPage f={a - 730} a={a} />
        </World>
      ) : (
        <World f={a - 878} zoom={1.03}>
          <Person
            who="rafi"
            a={a}
            x={-60}
            y={1890}
            w={1160}
            pose={2}
            talkPose={2}
            nod={1}
          />
        </World>
      )
    }
  </Scene>
);
export const Recognition = () => (
  <Scene start={948}>
    {(f, a) =>
      a < 1027 ? (
        <World f={f} counter zoom={1.035}>
          <Teacher a={a} x={505} y={2070} w={640} />
          <Person
            who="karim"
            a={a}
            x={-520}
            y={1760}
            w={860}
            pose={0}
            step={lerp(0, 380, f / 34)}
            nod={1.6}
          />
        </World>
      ) : a < 1080 ? (
        <World f={a - 1027} zoom={1.02}>
          <Person
            who="karim"
            a={a}
            x={-120}
            y={1950}
            w={1300}
            pose={2}
            talkPose={2}
            nod={1.6}
          />
        </World>
      ) : (
        <World f={a - 1080} zoom={1.03}>
          <ChairAction f={a - 1080} sleeve="#ddd0a9" />
        </World>
      )
    }
  </Scene>
);
export const Gratitude = () => (
  <Scene start={1164}>
    {(f, a) =>
      f < 79 ? (
        <World f={f} zoom={1.04}>
          <Person
            who="karim"
            a={a}
            x={-160}
            y={1930}
            w={1230}
            pose={0}
            talkPose={0}
            nod={1.6}
          />
        </World>
      ) : (
        <World f={f - 79} zoom={1.04}>
          <Teacher a={a} x={90} y={2220} w={860} />
        </World>
      )
    }
  </Scene>
);
export const Change = () => (
  <Scene start={1296}>
    {(f, a) => (
      <World f={f} zoom={1.035} pan={-15}>
        <Person
          who="sajid"
          a={a}
          x={-120}
          y={1930}
          w={1240}
          pose={f < 13 ? 0 : 3}
          nod={-ease(f, 13, 35) * 2.5}
        />
      </World>
    )}
  </Scene>
);
export const TeacherStory = () => (
  <Scene start={1350}>
    {(f, a) =>
      f < 105 ? (
        <World f={f} zoom={1.025} pan={-50}>
          <Teacher a={a} x={10} y={2260} w={930} />
        </World>
      ) : (
        <World f={f - 105} zoom={1.04}>
          <Person
            who="rafi"
            a={a}
            x={-90}
            y={1900}
            w={1180}
            pose={0}
            nod={1.8}
          />
        </World>
      )
    }
  </Scene>
);
export const Apology = () => (
  <Scene start={1524}>
    {(f, a) =>
      a < 1581 ? (
        <World f={f} counter zoom={1.04}>
          <Teacher a={a} x={-110} y={2030} w={730} />
          <Person
            who="sajid"
            a={a}
            x={360}
            y={1750}
            w={920}
            pose={3}
            nod={-1}
          />
        </World>
      ) : (
        <World f={a - 1581} zoom={1.035}>
          <Person
            who="sajid"
            a={a}
            x={-100}
            y={1930}
            w={1250}
            pose={3}
            talkPose={3}
            nod={-1.4}
          />
        </World>
      )
    }
  </Scene>
);
export const Dignity = () => (
  <Scene start={1680}>
    {(f, a) =>
      a < 1744 ? (
        <World f={f} zoom={1.025}>
          <CoinsAction f={f} />
        </World>
      ) : a < 1837 ? (
        <World f={a - 1744} zoom={1.025} pan={-45}>
          <Teacher a={a} pose={3} x={90} y={2270} w={675} />
        </World>
      ) : (
        <World f={a - 1837} zoom={1.04} pan={-70}>
          <Teacher a={a} pose={1} x={20} y={2270} w={925} />
        </World>
      )
    }
  </Scene>
);
export const Respect = () => (
  <Scene start={1908}>
    {(f, a) =>
      f < 82 ? (
        <World f={f} zoom={1.025}>
          <ChairAction f={f} />
        </World>
      ) : (
        <World f={f - 82} zoom={1.045} pan={-25}>
          <Teacher a={a} pose={0} x={-60} y={2190} w={1280} />
        </World>
      )
    }
  </Scene>
);

export const MotionPaint = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      <linearGradient id="ep4-young-skin" x1="0" y1="0" x2=".3" y2="1">
        <stop stopColor="#ffcf91" />
        <stop offset=".55" stopColor="#f5b777" />
        <stop offset="1" stopColor="#ce8e57" />
      </linearGradient>
      <linearGradient id="ep4-teacher-skin" x1="0" y1="0" x2=".5" y2="1">
        <stop stopColor="#e4b586" />
        <stop offset=".6" stopColor="#d2a170" />
        <stop offset="1" stopColor="#aa7249" />
      </linearGradient>
      <linearGradient id="ep4-wood" x2=".8" y2="1">
        <stop stopColor="#d4ae77" />
        <stop offset=".5" stopColor="#b78a54" />
        <stop offset="1" stopColor="#8b6037" />
      </linearGradient>
      <linearGradient id="ep4-coin" x2=".7" y2="1">
        <stop stopColor="#ece4ca" />
        <stop offset=".45" stopColor="#aaa99f" />
        <stop offset=".7" stopColor="#e2d9bd" />
        <stop offset="1" stopColor="#8d938e" />
      </linearGradient>
    </defs>
  </svg>
);
