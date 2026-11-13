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
  const output = path.resolve(process.argv[2]);
  if (!process.argv[2]) throw Error("Supply a new output directory.");
  if (fs.existsSync(path.join(output, "video-unmastered.mp4")))
    throw Error("Existing render preserved; choose a new version directory.");
  fs.mkdirSync(output, { recursive: true });
  const tag = process.argv[3] || "alive-v2";
  const serveUrl = await bundle({
    entryPoint: path.resolve("src/index.tsx"),
    outDir: path.resolve("out", tag, "bundle"),
    enableCaching: false,
  });
  const browser = await openBrowser("chrome");
  try {
    const composition = await selectComposition({
      serveUrl,
      id: "Episode02",
      puppeteerInstance: browser,
    });
    const cover = await selectComposition({
      serveUrl,
      id: "Episode02Cover",
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
        const bucket = Math.floor(p.progress * 20);
        if (bucket !== last) {
          last = bucket;
          console.log("Render", bucket * 5 + "%", p.renderedFrames + " frames");
        }
      },
    });
    fs.writeFileSync(
      path.join(output, "render-metadata.json"),
      JSON.stringify(
        {
          id: composition.id,
          width: composition.width,
          height: composition.height,
          fps: composition.fps,
          durationInFrames: composition.durationInFrames,
          sourceVoiceSeconds: 106.56,
          rendered: true,
        },
        null,
        2,
      ),
    );
    console.log("Review render ready:", output);
  } finally {
    await browser.close({ silent: true }).catch(() => {});
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
