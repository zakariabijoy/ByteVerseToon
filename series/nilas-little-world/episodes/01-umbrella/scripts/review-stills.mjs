import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {browserExecutable} from './browser-runtime.mjs';

const root=process.cwd();
await mkdir(path.join(root,'out','storyboard'),{recursive:true});
const serveUrl=await bundle({entryPoint:path.join(root,'src','index.ts')});
const browser=await openBrowser('chrome',{browserExecutable:browserExecutable()});
try {
  const compositions=await getCompositions(serveUrl,{puppeteerInstance:browser});
  const shots=[['01-Dream',70],['02-RainyStreet',120],['03-Choice',150],['04-Umbrella',225],['05-Drawing',120],['06-Customers',195],['07-Home',130],['08-Ending',149]];
  for(const [id,frame] of shots){
    await renderStill({serveUrl,composition:compositions.find(c=>c.id===id),frame,
      output:path.join(root,'out','storyboard',`${id}.png`),scale:.5,
      puppeteerInstance:browser,imageFormat:'png'});
    console.log(`Verified still: ${id} / frame ${frame}`);
  }
} finally {await browser.close({silent:true});}
