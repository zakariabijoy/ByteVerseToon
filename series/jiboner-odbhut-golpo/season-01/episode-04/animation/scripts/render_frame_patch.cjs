// Re-render a bounded visual correction without changing full-timeline audio.
const path=require('node:path');
const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderMedia}=require('@remotion/renderer');
require('./loopback-only.cjs');
(async()=>{
 const [destination,start,end,tag]=process.argv.slice(2);
 if(!destination||!tag||!Number.isInteger(+start)||!Number.isInteger(+end)||+start<0||+end<+start)throw Error('Supply fresh output.mp4, start, end and bundle tag.');
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx'),outDir:path.resolve('out',tag,'bundle'),enableCaching:false});
 const browser=await openBrowser('chrome');
 try{
  const composition=await selectComposition({serveUrl,id:'Episode04',puppeteerInstance:browser});
  if(+end>=composition.durationInFrames)throw Error('Patch exceeds timeline.');
  await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation:path.resolve(destination),frameRange:[+start,+end],muted:true,codec:'h264',pixelFormat:'yuv420p',crf:16,x264Preset:'veryfast',concurrency:3,imageFormat:'jpeg',jpegQuality:95,overwrite:false});
  console.log('Visual patch ready:',start,end,destination);
 }finally{await browser.close({silent:true}).catch(()=>{});}
})().catch(e=>{console.error(e);process.exitCode=1;});
