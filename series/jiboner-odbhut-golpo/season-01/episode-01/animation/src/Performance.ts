import envelope from "./voice-envelope.json";
import timing from "./dialogue-timing.json";
import type { Cast } from "./rig-data";
type Word = { text: string; start: number; end: number; who?: string };
export const clamp = (n: number, a = 0, b = 1) => Math.max(a, Math.min(b, n));
export const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};
export const level = (frame: number) => {
  let sum = 0;
  for (let d = -2; d <= 2; d++)
    sum +=
      envelope[
        Math.max(0, Math.min(envelope.length - 1, Math.round(frame + d)))
      ] || 0;
  return sum / 5;
};
const graphemes = (text: string) =>
  text.match(/[\u0980-\u09FF][\u09BE-\u09CD\u09D7]*|[A-Za-z]/g) || ["অ"];
export const vocal = (who: Cast, frame: number) => {
  const t = frame / 30;
  const cue = timing.cues.find(
    (c) => c.who === who && t >= c.start - 0.025 && t < c.end + 0.025,
  );
  if (!cue) return { active: false, open: 0, shape: "closed", text: "" };
  const found = (timing.words as Word[]).find(
    (w) => (!w.who || w.who === who) && t >= w.start - 0.01 && t < w.end + 0.01,
  );
  const word = found || { text: cue.text, start: cue.start, end: cue.end };
  const syllables = graphemes(word.text);
  const progress = clamp(
    (t - word.start) / Math.max(0.03, word.end - word.start),
  );
  const syllable =
    syllables[
      Math.min(syllables.length - 1, Math.floor(progress * syllables.length))
    ];
  let shape = /[উঊুূওো]/.test(syllable)
    ? "round"
    : /[ইঈিীএেৈ]/.test(syllable)
      ? "wide"
      : "open";
  const pulse = (progress * syllables.length) % 1;
  if (/[পফবভম]/.test(syllable) && pulse < 0.3) shape = "closed";
  const energy = clamp((level(frame) - 0.018) * 4.2);
  const open =
    shape === "closed" ? 0 : energy * (0.55 + 0.45 * Math.sin(pulse * Math.PI));
  return { active: energy > 0.025, open, shape, text: word.text };
};
export const blinkAmount = (who: Cast, frame: number) => {
  const offset = { rafi: 0, sajid: 31, maya: 59, manager: 83 }[who];
  const cycle = (frame + offset) % 139;
  if (cycle < 130) return 0;
  const local = cycle - 130;
  return local < 2
    ? smooth(local / 2)
    : local < 3
      ? 1
      : 1 - smooth((local - 3) / 5);
};
export const anticipation = (frame: number, start: number, duration = 25) => {
  const x = (frame - start) / duration;
  if (x < 0 || x > 1) return 0;
  return Math.sin(x * Math.PI) * Math.exp(-x * 1.3);
};
