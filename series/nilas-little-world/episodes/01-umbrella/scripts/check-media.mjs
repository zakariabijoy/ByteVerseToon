import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'production','media-manifest.json'),'utf8'));
for(const asset of manifest.assets){
  const file=path.join(root,asset.projectPath);
  if(!fs.existsSync(file))throw Error(`Missing ${asset.projectPath}. Restore the separate media bundle; see CONTINUE-ON-ANOTHER-PC.md.`);
  const hash=crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if(hash!==asset.sha256)throw Error(`Different ${asset.projectPath}. Review the replacement rather than silently reusing episode cuts.`);
  console.log(`Verified ${asset.projectPath}`);
}
for(let i=1;i<=8;i++)if(!fs.existsSync(path.join(root,'public','audio',`E01-${String(i).padStart(2,'0')}.wav`)))throw Error('Derived clips missing. Run npm run prepare-media.');
if(!fs.existsSync(path.join(root,'public','audio','rain-bed.wav')))throw Error('Rain bed missing. Run npm run prepare-media.');
