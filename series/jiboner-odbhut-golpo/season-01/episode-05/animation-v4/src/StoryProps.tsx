import React from "react";
import { interpolate } from "remotion";
const navy = "#172b45",
  paper = "#fff5df",
  gold = "#ffcf48",
  red = "#b93e41";
const lim = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const tween = (q: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(q, [a, b], [x, y], lim);
export const Table = ({ top = 1280 }: { top?: number }) => (
  <div
    style={{
      position: "absolute",
      left: -70,
      right: -70,
      top,
      height: 720,
      background: "linear-gradient(170deg,#c49462,#85613e)",
      borderTop: "16px solid #eed1a0",
      boxShadow: "0 -10px 35px #172b4533",
      transform: "rotate(-1deg)",
    }}
  >
    <div
      style={{
        marginTop: 65,
        height: 8,
        background: "#79553333",
        boxShadow: "0 130px #79553322,0 290px #79553333",
      }}
    />
  </div>
);
export const ReleasePaper = ({
  q,
  mode = "approval",
}: {
  q: number;
  mode?: "approval" | "turn" | "name" | "refused" | "write" | "sign";
}) => {
  const written = mode === "write" || mode === "sign";
  const flip = mode === "turn" ? tween(q, 0, 22, 0, 145) : 145;
  return (
    <>
      <Table top={1270} />
      <div
        style={{
          position: "absolute",
          left: 145,
          top: 390,
          width: 730,
          height: 890,
          background: paper,
          border: "4px solid #b6a790",
          boxShadow: "16px 22px 0 #27395044,0 30px 50px #07132377",
          padding: 58,
          boxSizing: "border-box",
          transform: `rotate(${mode === "turn" ? tween(q, 0, 26, 5, -3) : -3}deg) translateY(${tween(q, 0, 12, 24, 0)}px)`,
          perspective: 1400,
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: "#6c7b82",
            letterSpacing: 2,
            borderBottom: "3px solid #acb6b0",
            paddingBottom: 18,
          }}
        >
          RELEASE / AUTHORIZATION
        </div>
        <h2 style={{ fontSize: 51, color: navy, margin: "35px 0 45px" }}>
          লাইভ রিলিজের অনুমোদন
        </h2>
        <div style={{ fontSize: 36, color: "#5c686e" }}>টেস্ট রিপোর্ট</div>
        <div
          style={{
            marginTop: 14,
            padding: "20px 22px",
            fontSize: 48,
            fontWeight: 900,
            background: written ? "#fad6cb" : "#d9e6bb",
            color: written ? red : "#416539",
          }}
        >
          {written ? "পেমেন্ট টেস্ট ব্যর্থ" : "সব টেস্ট পাস ✓"}
        </div>
        <div style={{ fontSize: 35, color: "#596a74", marginTop: 45 }}>
          অনুমোদন দেবেন
        </div>
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: navy,
            marginTop: 15,
            position: "relative",
          }}
        >
          {mode === "refused" ? "মায়া রহমান" : "রাফি আহমেদ"}
          <div
            style={{
              height: 13,
              background: gold,
              position: "absolute",
              left: 0,
              bottom: -8,
              width: `${tween(q, 8, 27) * 96}%`,
              transform: "rotate(-1deg)",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 55,
            borderBottom: "3px solid #8c9999",
            height: 67,
            fontSize: mode === "sign" ? 44 : 30,
            color: mode === "sign" ? navy : "#82908b",
            fontWeight: 800,
          }}
        >
          {mode === "sign"
            ? "রাফি আহমেদ"
            : mode === "refused"
              ? "অনুমোদন দেওয়া হয়নি"
              : "স্বাক্ষর __________________"}
        </div>
        {written && (
          <div
            style={{
              position: "absolute",
              left: 35,
              right: 35,
              top: 205,
              padding: "32px 20px",
              background: paper,
              border: `7px solid ${red}`,
              color: red,
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.65,
              transform: "rotate(2deg)",
              opacity: tween(q, 0, 12),
            }}
          >
            পেমেন্ট টেস্ট ব্যর্থ
            <br />
            <span style={{ background: gold, color: navy }}>
              লাইভ রিলিজ স্থগিত
            </span>
            <div style={{ fontSize: 33, marginTop: 27 }}>
              সুপারিশ: সমস্যাটি আগে ঠিক করা
            </div>
          </div>
        )}
        {mode === "turn" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(100deg,#f9e9cb,#fff7e5)",
              border: "3px solid #b6a790",
              transformOrigin: "0% 50%",
              transform: `rotateY(-${flip}deg)`,
              backfaceVisibility: "hidden",
              padding: 55,
              boxSizing: "border-box",
              boxShadow: "10px 4px 25px #172b4544",
            }}
          >
            <div style={{ fontSize: 37, color: "#6a7679" }}>অফিস আদেশ</div>
            <h2 style={{ fontSize: 76, color: navy }}>প্রমোশন</h2>
            <div style={{ fontSize: 48, color: navy }}>রাফি আহমেদ</div>
            <div
              style={{
                marginTop: 40,
                padding: 20,
                background: gold,
                fontSize: 44,
                fontWeight: 900,
              }}
            >
              TEAM LEAD
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 55,
                right: 55,
                color: "#858785",
                fontSize: 30,
              }}
            >
              শেষ পাতা →
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 846,
          top: 1030,
          width: 19,
          height: 320,
          background: "linear-gradient(90deg,#1e384f,#678294,#1e384f)",
          borderRadius: 12,
          transform: "rotate(16deg)",
          boxShadow: "8px 6px 8px #07132355",
        }}
      />
    </>
  );
};
export const LaptopEvidence = ({
  q,
  mode = "payment",
}: {
  q: number;
  mode?: "payment" | "ready" | "green" | "red" | "demo" | "work";
}) => {
  const reveal = tween(q, 20, 29);
  const bad = mode === "payment" || mode === "red";
  return (
    <>
      <Table top={1310} />
      <div
        style={{
          position: "absolute",
          left: 73,
          top: 430,
          width: 870,
          height: 800,
          transform: `perspective(1700px) rotateY(${mode === "ready" ? tween(q, 0, 19, -21, 0) : 0}deg) translateY(${tween(q, 0, 14, 28, 0)}px)`,
        }}
      >
        <div
          style={{
            background: "#243b4e",
            border: "17px solid #263c4c",
            borderRadius: 30,
            boxShadow: "0 24px 36px #07132388",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 44,
              background: "#42596a",
              display: "flex",
              gap: 10,
              padding: "8px 18px",
              boxSizing: "border-box",
            }}
          >
            {["#ed8b72", "#f4c65c", "#81c2a6"].map((c) => (
              <div
                key={c}
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              height: 585,
              background: "#f6f1e5",
              padding: 36,
              boxSizing: "border-box",
              color: navy,
            }}
          >
            <div
              style={{
                fontSize: 29,
                fontWeight: 800,
                borderBottom: "3px solid #c3cbca",
                paddingBottom: 20,
              }}
            >
              {mode === "work"
                ? "payment-service / tests"
                : mode === "demo"
                  ? "CLIENT DEMO · TEST DATA"
                  : "PAYMENT / TEST REPORT"}
            </div>
            {mode === "work" ? (
              <>
                <div
                  style={{
                    fontSize: 31,
                    lineHeight: 2.15,
                    fontFamily: "Consolas",
                    marginTop: 28,
                  }}
                >
                  retry_payment_test()
                  <br />
                  <span style={{ color: "#ad4144" }}>✕ duplicate debit</span>
                  <br />
                  expected: 1 transaction
                  <br />
                  received: 2 transactions
                </div>
                <div style={{ fontSize: 30, marginTop: 24, color: "#67736d" }}>
                  মায়া রহমান · Test results
                </div>
              </>
            ) : mode === "demo" ? (
              <>
                <div style={{ fontSize: 70, fontWeight: 900, marginTop: 65 }}>
                  ডেমো চলছে
                </div>
                <div style={{ marginTop: 35, fontSize: 39, color: "#4f785d" }}>
                  TEST MODE ✓
                </div>
                <div style={{ marginTop: 25, fontSize: 32 }}>
                  আসল পেমেন্ট বন্ধ রাখা হয়েছে
                </div>
              </>
            ) : mode === "payment" || mode === "ready" ? (
              <>
                <div style={{ fontSize: 35, marginTop: 28 }}>
                  একটি পেমেন্ট অনুরোধ
                </div>
                <div style={{ fontSize: 54, fontWeight: 900, marginTop: 18 }}>
                  ৳ ১,০০০
                </div>
                <div
                  style={{
                    marginTop: 28,
                    padding: "15px 22px",
                    background: "#d9e6c8",
                    fontSize: 34,
                  }}
                >
                  ডেবিট #১ <span style={{ float: "right" }}>− ৳ ১,০০০</span>
                </div>
                <div
                  style={{
                    marginTop: 15,
                    padding: "15px 22px",
                    background: "#f5cfc6",
                    fontSize: 34,
                    opacity: mode === "ready" ? 0 : reveal,
                    transform: `translateY(${(1 - reveal) * 22}px)`,
                  }}
                >
                  ডেবিট #২ <span style={{ float: "right" }}>− ৳ ১,০০০</span>
                </div>
                <div
                  style={{
                    marginTop: 25,
                    fontSize: 39,
                    fontWeight: 900,
                    color: red,
                    opacity: mode === "ready" ? 0 : reveal,
                  }}
                >
                  এক অনুরোধে দুইবার চার্জ!
                </div>
              </>
            ) : (
              <>
                <div style={{ marginTop: 48, fontSize: 40 }}>
                  Payment retry test
                </div>
                <div
                  style={{
                    background: bad ? "#f3cfc4" : "#d9e5bf",
                    color: bad ? red : "#3f6943",
                    fontSize: 62,
                    fontWeight: 900,
                    padding: "32px 25px",
                    marginTop: 30,
                    border: `5px solid ${bad ? red : "#709664"}`,
                  }}
                >
                  {bad ? "FAILED ✕" : "PASSED ✓"}
                </div>
                <div style={{ fontSize: 31, marginTop: 30 }}>
                  {bad
                    ? "মায়ার জমা দেওয়া রিপোর্ট"
                    : "অনুমোদনের সঙ্গে দেওয়া রিপোর্ট"}
                </div>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            height: 42,
            marginLeft: -30,
            marginRight: -30,
            background: "linear-gradient(#c1c8cb,#73828c)",
            borderRadius: "0 0 40px 40px",
            border: "4px solid #4a5d6b",
          }}
        />
      </div>
    </>
  );
};
export const PhoneMessage = ({
  q,
  call = false,
}: {
  q: number;
  call?: boolean;
}) => (
  <>
    <Table top={1320} />
    <div
      style={{
        position: "absolute",
        left: 270,
        top: 390,
        width: 480,
        height: 880,
        background: navy,
        border: "13px solid #314c60",
        borderRadius: 64,
        padding: 22,
        boxSizing: "border-box",
        boxShadow: "15px 25px 30px #07132388",
        transform: `rotate(${call ? Math.sin(q * 1.5) * Math.exp(-q / 35) * 2 : -5}deg)`,
      }}
    >
      <div
        style={{
          width: 150,
          height: 19,
          background: "#061320",
          borderRadius: 20,
          margin: "0 auto 28px",
        }}
      />
      <div
        style={{
          background: call ? "linear-gradient(#284c65,#172b45)" : paper,
          height: 760,
          borderRadius: 35,
          padding: 25,
          boxSizing: "border-box",
          color: call ? paper : navy,
        }}
      >
        <div style={{ fontSize: 28, textAlign: "center", paddingTop: 20 }}>
          {call ? "ইনকামিং কল" : "টিম মেসেজ"}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 900,
            textAlign: "center",
            marginTop: 30,
          }}
        >
          ম্যানেজার
        </div>
        {call ? (
          <>
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: "#537b85",
                margin: "65px auto",
                fontSize: 85,
                textAlign: "center",
                lineHeight: "150px",
              }}
            >
              ☎
            </div>
            <div
              style={{
                margin: "100px auto 0",
                width: 115,
                height: 115,
                borderRadius: "50%",
                background: "#7aa274",
                textAlign: "center",
                fontSize: 69,
              }}
            >
              ☎
            </div>
          </>
        ) : (
          <div
            style={{
              background: "#e5e9d7",
              border: "3px solid #9da99a",
              borderRadius: "25px 25px 25px 4px",
              padding: 24,
              fontSize: 39,
              lineHeight: 1.8,
              marginTop: 42,
              opacity: tween(q, 0, 8),
            }}
          >
            ক্লায়েন্ট আজই লাইভ চায়।
            <br />
            ছোট বাগটা পরে ঠিক করো।
            <br />
            <span style={{ background: gold, fontWeight: 900 }}>
              আগে সই করো।
            </span>
          </div>
        )}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        top: 1275,
        left: 360,
        width: 320,
        height: 30,
        background: "#13273e66",
        borderRadius: "50%",
        filter: "blur(10px)",
      }}
    />
  </>
);
export const PromotionMail = ({ q }: { q: number }) => (
  <>
    <Table top={1350} />
    <div
      style={{
        position: "absolute",
        left: 95,
        right: 120,
        top: 440,
        background: paper,
        border: "12px solid #314c60",
        borderRadius: 26,
        padding: 48,
        boxShadow: "18px 24px 28px #07132366",
        transform: `rotate(-3deg) translateY(${tween(q, 0, 12, 45, 0)}px)`,
        color: navy,
      }}
    >
      <div
        style={{
          fontSize: 31,
          borderBottom: "3px solid #c0c8c1",
          paddingBottom: 25,
        }}
      >
        INBOX · নতুন মেইল
      </div>
      <div style={{ fontSize: 36, marginTop: 28 }}>প্রাপক: রাফি আহমেদ</div>
      <h2 style={{ fontSize: 60, lineHeight: 1.6 }}>
        প্রমোশন সংক্রান্ত সিদ্ধান্ত
      </h2>
      <div
        style={{
          fontSize: 62,
          fontWeight: 900,
          border: `7px solid ${red}`,
          padding: 25,
          color: red,
          transform: `rotate(${tween(q, 12, 19, -7, -4)}deg) scale(${tween(q, 12, 19, 1.2, 1)})`,
          opacity: tween(q, 12, 15),
        }}
      >
        প্রমোশন স্থগিত
      </div>
      <div style={{ marginTop: 30, fontSize: 32, color: "#68777d" }}>
        TEAM LEAD / ON HOLD
      </div>
    </div>
  </>
);
export const Coffee = ({ q }: { q: number }) => (
  <>
    <Table top={1190} />
    <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0 }}>
      <g transform={`translate(0 ${tween(q, 0, 16, -55, 0)})`}>
        <ellipse cx="530" cy="1260" rx="280" ry="56" fill="#13273e44" />
        <ellipse
          cx="510"
          cy="1218"
          rx="240"
          ry="53"
          fill="#e8d8b8"
          stroke="#8b795e"
          strokeWidth="6"
        />
        <path
          d="M690 1010 C850 970 854 1190 686 1164"
          fill="none"
          stroke="#f9e8c4"
          strokeWidth="39"
        />
        <path
          d="M323 981 L350 1161 Q365 1220 510 1220 Q657 1220 673 1161 L699 981Z"
          fill="#f7e6c5"
          stroke="#8b795e"
          strokeWidth="6"
        />
        <ellipse
          cx="511"
          cy="981"
          rx="188"
          ry="50"
          fill="#e5cc9f"
          stroke="#8b795e"
          strokeWidth="6"
        />
        <ellipse cx="511" cy="985" rx="165" ry="36" fill="#5c3426" />
        <path
          d={`M450 875 Q${410 + Math.sin(q / 15) * 18} 834 457 790 M540 872 Q${575 + Math.sin(q / 18) * 18} 821 530 766 M600 889 Q650 839 607 798`}
          fill="none"
          stroke="#fff5df99"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <rect x="395" y="1064" width="224" height="65" rx="12" fill="#d7b678" />
        <text
          x="507"
          y="1111"
          textAnchor="middle"
          fontSize="36"
          fill="#593c27"
          fontWeight="bold"
        >
          চিনি ছাড়া
        </text>
      </g>
    </svg>
  </>
);
