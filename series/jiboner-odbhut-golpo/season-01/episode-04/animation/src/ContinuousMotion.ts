import { faces, speakingArms, type Cast } from "./rig-data";
import { level, smooth } from "./Performance";

// Deform one intact illustration. Every point has one continuous displacement;
// no neck, shoulder or elbow is cut into independently rotating layers.
export const continuousField = (
  who: Cast,
  pose: number,
  frame: number,
  gesture: number,
  lean: number,
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 136;
  canvas.height = 181;
  const ctx = canvas.getContext("2d")!;
  const data = ctx.createImageData(canvas.width, canvas.height);
  const face = faces[who][pose];
  const angle =
    ((Math.sin(frame * 0.039) * 0.65 +
      Math.sin(frame * 0.113) * level(frame) * 0.35 +
      lean * 0.25) *
      Math.PI) /
    180;
  const arms = pose === 1 ? speakingArms[who] : [];
  for (let row = 0; row < canvas.height; row++) {
    const y = (row * 724) / (canvas.height - 1);
    for (let col = 0; col < canvas.width; col++) {
      const x = -80 + (col * 703) / (canvas.width - 1);
      const headWeight = 1 - smooth((y - face.cut + 30) / 125);
      let dx = -(y - face.neck[1]) * angle * headWeight;
      let dy = (x - face.neck[0]) * angle * headWeight;
      for (const arm of arms) {
        const [ax, ay] = arm.elbow;
        const weight =
          Math.exp(-(((x - ax) / 155) ** 2 + ((y - ay) / 175) ** 2) * 1.8) *
          smooth((y - 290) / 110);
        const bend = Math.sin(frame * 0.045 + ax) * 0.013 * gesture;
        dx += -(y - ay) * bend * weight;
        dy += (x - ax) * bend * weight;
      }
      const p = (row * canvas.width + col) * 4;
      data.data[p] = Math.round(127.5 + (dx * 255) / 40);
      data.data[p + 1] = Math.round(127.5 + (dy * 255) / 40);
      data.data[p + 2] = 128;
      data.data[p + 3] = 255;
    }
  }
  ctx.putImageData(data, 0, 0);
  return canvas.toDataURL();
};

export const typingField = (frame: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = 192;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const image = ctx.createImageData(192, 128);
  for (let row = 0; row < 128; row++)
    for (let col = 0; col < 192; col++) {
      const x = (col * 1536) / 191,
        y = (row * 1024) / 127;
      const left = Math.exp(
        -(((x - 820) / 150) ** 2 + ((y - 880) / 105) ** 2) * 2,
      );
      const right = Math.exp(
        -(((x - 998) / 120) ** 2 + ((y - 858) / 105) ** 2) * 2,
      );
      const dy =
        left * Math.sin(frame * 0.59) * 1.6 +
        right * Math.sin(frame * 0.61 + 2) * 1.5;
      const p = (row * 192 + col) * 4;
      image.data[p] = 128;
      image.data[p + 1] = Math.round(127.5 + (dy * 255) / 12);
      image.data[p + 2] = 128;
      image.data[p + 3] = 255;
    }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL();
};
