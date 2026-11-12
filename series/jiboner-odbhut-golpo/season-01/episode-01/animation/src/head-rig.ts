import {
  faces,
  type Cast,
  type FaceControl,
  type EyeControl,
} from "./rig-data";
import neckMasks from "./head-neck-masks.json";
type Head = {
  column: number;
  scale: number;
  neck: [number, number];
  chin: number;
  mirror: boolean;
  eyes: [EyeControl, EyeControl];
  mouth: [number, number, number, number];
  angle: number;
};
const eye = (
  x: number,
  y: number,
  rx: number,
  ry: number,
  angle = 0,
): EyeControl => ({ x, y, rx, ry, angle });
export const talkingHeads: Record<Cast, Head> = {
  rafi: {
    column: 0,
    scale: 0.63,
    neck: [280, 548],
    chin: 425,
    mirror: false,
    eyes: [eye(284, 242, 25, 17, -4), eye(382, 233, 22, 18, -4)],
    mouth: [346, 340, 43, 10],
    angle: -6,
  },
  sajid: {
    column: 1,
    scale: 0.63,
    neck: [207, 550],
    chin: 440,
    mirror: true,
    eyes: [eye(285, 256, 23, 12, 12), eye(375, 273, 20, 11, 12)],
    mouth: [314, 357, 43, 10],
    angle: -10,
  },
  maya: {
    column: 2,
    scale: 0.63,
    neck: [303, 540],
    chin: 397,
    mirror: false,
    eyes: [eye(311, 229, 26, 19, -9), eye(400, 219, 21, 19, -8)],
    mouth: [371, 312, 35, 11],
    angle: -8,
  },
  manager: {
    column: 3,
    scale: 0.63,
    neck: [296, 550],
    chin: 437,
    mirror: false,
    eyes: [eye(161, 247, 24, 15), eye(266, 245, 26, 15)],
    mouth: [216, 353, 41, 10],
    angle: 0,
  },
};
export const talkingHeadMapping = (who: Cast) => {
  const raw = talkingHeads[who],
    base = faces[who][1],
    s = raw.scale;
  const nx = raw.mirror ? 543 - raw.neck[0] : raw.neck[0];
  const dx = base.neck[0] - nx * s,
    dy = base.cut - 29 + 84 - raw.neck[1] * s;
  const x = (value: number) => dx + (raw.mirror ? 543 - value : value) * s;
  const y = (value: number) => dy + value * s;
  const face: FaceControl = {
    ...base,
    eyes: raw.eyes.map((e) => ({
      ...e,
      x: x(e.x),
      y: y(e.y),
      rx: e.rx * s,
      ry: e.ry * s,
      angle: raw.mirror ? -e.angle : e.angle,
    })) as [EyeControl, EyeControl],
    mouth: [
      x(raw.mouth[0]),
      y(raw.mouth[1]),
      raw.mouth[2] * s,
      raw.mouth[3] * s,
    ],
  };
  const pts = neckMasks[who];
  const neckPath =
    pts.map((p, i) => `${i ? "L" : "M"}${x(p[0])} ${y(p[1])}`).join(" ") + "Z";
  return { raw, dx, dy, face, neckPath };
};
