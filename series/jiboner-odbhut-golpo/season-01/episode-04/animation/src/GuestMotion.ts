// Continuous displacement over the complete guest illustration and face overlays.
export const guestField = (pose: number, frame: number, energy: number) => {
  const spans = [
      [0, 519],
      [580, 991],
      [1015, 1479],
      [1551, 1847],
    ],
    [left, right] = spans[pose];
  const pivot = [
    [265, 305],
    [720, 200],
    [1310, 230],
    [1690, 200],
  ][pose];
  const c = document.createElement("canvas");
  c.width = 80;
  c.height = 112;
  const ctx = c.getContext("2d")!,
    d = ctx.createImageData(80, 112);
  const angle =
    ((Math.sin(frame * 0.032) * 1.35 + Math.sin(frame * 0.11) * energy * 1.2) *
      Math.PI) /
    180;
  for (let row = 0; row < 112; row++)
    for (let col = 0; col < 80; col++) {
      const x = left + (col * (right - left)) / 79,
        y = (row * 818) / 111;
      const q = Math.max(0, Math.min(1, (y - pivot[1] + 15) / 140)),
        head = 1 - q * q * (3 - 2 * q);
      let dx = -(y - pivot[1]) * angle * head,
        dy = (x - pivot[0]) * angle * head;
      if (pose === 1) {
        const w = Math.exp(
          -(((x - 900) / 130) ** 2 + ((y - 270) / 170) ** 2) * 2,
        );
        dy += Math.sin(frame * 0.075) * 8 * (0.35 + energy) * w;
        dx += Math.sin(frame * 0.075) * 4 * w;
      }
      if (pose === 3) {
        const w = Math.exp(
          -(((x - 1760) / 95) ** 2 + ((y - 350) / 130) ** 2) * 2,
        );
        dy += Math.sin(frame * 0.07) * 5 * w;
      }
      const p = (row * 80 + col) * 4;
      d.data[p] = Math.round(127.5 + (dx * 255) / 56);
      d.data[p + 1] = Math.round(127.5 + (dy * 255) / 56);
      d.data[p + 2] = 128;
      d.data[p + 3] = 255;
    }
  ctx.putImageData(d, 0, 0);
  return c.toDataURL();
};
