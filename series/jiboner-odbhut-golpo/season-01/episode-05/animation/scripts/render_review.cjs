const fs = require("node:fs");
const path = require("node:path");
const { bundle } = require("@remotion/bundler");
const {
  openBrowser,
  selectComposition,
  renderMedia,
  renderStill,
} = require("@remotion/renderer");
require("./loopback-only.cjs");
(async () => {
  const dest = process.argv[2];
  if (!dest) throw Error("Supply a fresh review output folder.");
  const visualOnly = process.argv[5] === "visual-only";
  const output = path.resolve(dest),
    scale = Number(process.argv[4] || 1);
  if (fs.existsSync(path.join(output, "video-unmastered.mp4")))
    throw Error("Existing review preserved.");
  fs.mkdirSync(output, { recursive: true });
  const serveUrl = await bundle({
    entryPoint: path.resolve("src/index.tsx"),
    outDir: path.resolve("out", process.argv[3] || "review-v1", "bundle"),
    enableCaching: false,
  });
  const browser = await openBrowser("chrome");
  try {
    const composition = await selectComposition({
      serveUrl,
      id: "Episode05",
      puppeteerInstance: browser,
    });
    const cover = await selectComposition({
      serveUrl,
      id: "Episode05Cover",
      puppeteerInstance: browser,
    });
    await renderStill({
      serveUrl,
      composition: cover,
      puppeteerInstance: browser,
      output: path.join(output, "cover.png"),
      overwrite: false,
      imageFormat: "png",
    });
    let last = -1;
    await renderMedia({
      serveUrl,
      composition,
      puppeteerInstance: browser,
      outputLocation: path.join(output, "video-unmastered.mp4"),
      scale,
      muted: visualOnly,
      codec: "h264",
      audioCodec: "aac",
      audioBitrate: "192k",
      sampleRate: 48000,
      pixelFormat: "yuv420p",
      crf: 19,
      x264Preset: "veryfast",
      concurrency: 4,
      imageFormat: "jpeg",
      jpegQuality: 92,
      overwrite: false,
      onProgress: (p) => {
        let k = Math.floor(p.progress * 20);
        if (k !== last) {
          last = k;
          console.log("Review", k * 5 + "%", p.renderedFrames, "frames");
        }
      },
    });
    fs.writeFileSync(
      path.join(output, "render-metadata.json"),
      JSON.stringify(
        {
          composition: "Episode05",
          sourceCanvas: [1080, 1920],
          reviewScale: scale,
          width: Math.round(1080 * scale),
          height: Math.round(1920 * scale),
          fps: 30,
          durationFrames: composition.durationInFrames,
          reviewOnly: true,
        },
        null,
        2,
      ),
    );
    console.log("Animated review ready:", output);
  } finally {
    await browser.close({ silent: true }).catch(() => {});
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
