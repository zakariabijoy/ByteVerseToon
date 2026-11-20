const fs=require('node:fs');const path=require('node:path');
const {bundle}=require('@remotion/bundler');const {openBrowser,selectComposition,renderStill,renderMedia}=require('@remotion/renderer');
require('./loopback-only.cjs');
(async()=>{
 const mode=process.argv[2]||'stills';const target=path.resolve(process.argv[3]||'out/qa-v1');fs.mkdirSync(target,{recursive:true});
 const serveUrl=await bundle({entryPoint:path.resolve('src/index.tsx'),outDir:path.resolve('out/'+mode+'-bundle-v1'),enableCaching:false});
 const browser=await openBrowser('chrome');
 try{
  const composition=await selectComposition({serveUrl,id:'Episode06',puppeteerInstance:browser});
  if(mode==='stills'){
   for(const frame of (process.argv[4]?process.argv[4].split(',').map(Number):[20,225,330,580,745,1190,1295,1530,1850,2050,2250,2520,2730,2890,3030,3130])){
    const output=path.join(target,`frame-${frame}.png`);if(fs.existsSync(output))continue;
    await renderStill({serveUrl,composition,puppeteerInstance:browser,frame,scale:.5,output,imageFormat:'png',overwrite:false});console.log('Frame',frame);
   }
  }else{
   const outputLocation=path.join(target,'video-unmastered.mp4');if(fs.existsSync(outputLocation))throw Error('Existing preview retained; choose fresh directory');
   let last=-1;await renderMedia({serveUrl,composition,puppeteerInstance:browser,outputLocation,scale:.5,codec:'h264',audioCodec:'aac',audioBitrate:'192k',sampleRate:48000,pixelFormat:'yuv420p',crf:20,x264Preset:'veryfast',concurrency:3,imageFormat:'jpeg',jpegQuality:90,overwrite:false,onProgress:p=>{const v=Math.floor(p.progress*20);if(v!==last){last=v;console.log('Review',v*5+'%',p.renderedFrames);}}});
   fs.writeFileSync(path.join(target,'render-metadata.json'),JSON.stringify({composition:'Episode06',sourceCanvas:[1080,1920],reviewScale:.5,frames:3166,fps:30,reviewOnly:true},null,2));
  }
 }finally{await browser.close({silent:true}).catch(()=>{});}
})().catch(e=>{console.error(e);process.exitCode=1;});
