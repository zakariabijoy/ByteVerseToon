const fs = require('node:fs');
const path = require('node:path');
const {bundle} = require('@remotion/bundler');
const {openBrowser,selectComposition,renderMedia} = require('@remotion/renderer');
require('./loopback-only.cjs');
(async()=>{
 const folder=path.resolve(process.argv[2]);
 const output=path.join(folder,'calls-picture.mp4');
 if(fs.existsSync(output))throw Error('Existing call review preserved.');
 fs.mkdirSync(folder,{recursive:true});
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx'),outDir:path.resolve('out','review-v5-calls','bundle'),enableCaching:false});
 const browser=await openBrowser('chrome');
 try{
 const composition=await selectComposition({serveUrl,id:'Episode05',puppeteerInstance:browser});
 let last=-1;
 await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation:output,frameRange:[1624,2407],scale:.5,muted:true,codec:'h264',pixelFormat:'yuv420p',crf:19,x264Preset:'veryfast',concurrency:4,imageFormat:'jpeg',jpegQuality:92,overwrite:false,onProgress:p=>{const k=Math.floor(p.progress*10);if(k!==last){last=k;console.log('Call revision',k*10+'%',p.renderedFrames);}}});
 fs.writeFileSync(path.join(folder,'render-range.json'),JSON.stringify({version:5,startFrame:1624,endFrameInclusive:2407,frames:784,sourceFps:30,dimensions:[540,960],audio:'reuse_approved_v4_mix_unchanged'},null,2));
 }finally{await browser.close({silent:true}).catch(()=>{});}
})().catch(e=>{console.error(e);process.exitCode=1;});
