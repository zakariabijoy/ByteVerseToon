const fs = require("node:fs");
const path = require("node:path");
const { bundle } = require("@remotion/bundler");
const {
  openBrowser,
  selectComposition,
  renderStill,
} = require("@remotion/renderer");
require("./loopback-only.cjs");
(async () => {
  const tag = process.argv[2] || "qa-v1";
  const output = path.resolve("out", tag);
  fs.mkdirSync(output, { recursive: true });
  const serveUrl = await bundle({
    entryPoint: path.resolve("src/index.tsx"),
    outDir: path.join(output, "bundle"),
    enableCaching: false,
  });
  const browser = await openBrowser("chrome");
  try {
    const composition = await selectComposition({
      serveUrl,
      id: "Episode01",
      puppeteerInstance: browser,
    });
    for (const frame of [80, 650, 1080, 1400, 1730, 1980, 2320, 2770]) {
      const dest = path.join(output, `frame-${frame}.png`);
      await renderStill({
        serveUrl,
        composition,
        frame,
        puppeteerInstance: browser,
        output: dest,
        scale: 0.5,
        overwrite: false,
      });
      console.log(dest);
    }
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
