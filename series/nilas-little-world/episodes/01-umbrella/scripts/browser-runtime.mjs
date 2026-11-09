import fs from 'node:fs';
import path from 'node:path';

export function browserExecutable(){
  if(process.env.BVT_BROWSER)return process.env.BVT_BROWSER;
  let directory=process.cwd();
  while(true){
    const config=path.join(directory,'config','local.json');
    if(fs.existsSync(config)){
      const value=JSON.parse(fs.readFileSync(config,'utf8')).browserExecutable;
      if(value)return value;
    }
    const parent=path.dirname(directory);if(parent===directory)break;directory=parent;
  }
  if(process.platform==='win32'){
    for(const base of [process.env['ProgramFiles(x86)'],process.env.ProgramFiles]){
      if(!base)continue;
      const candidate=path.join(base,'Google','Chrome','Application','chrome.exe');
      if(fs.existsSync(candidate))return candidate;
    }
    for(const base of [process.env['ProgramFiles(x86)'],process.env.ProgramFiles]){
      if(!base)continue;
      const candidate=path.join(base,'Microsoft','Edge','Application','msedge.exe');
      if(fs.existsSync(candidate))return candidate;
    }
  }
  // Remotion resolves its supported installed headless browser when unspecified.
  return undefined;
}
