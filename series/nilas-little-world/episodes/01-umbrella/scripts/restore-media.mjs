import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'production','media-manifest.json'),'utf8'));
const source=process.argv[2];
if(!source)throw Error('Usage: node scripts/restore-media.mjs PATH_TO_UNZIPPED_MEDIA');
const pending=[];
for(const asset of manifest.assets){
  const from=path.join(path.resolve(source),asset.bundleName),target=path.resolve(root,asset.projectPath);
  if(!target.startsWith(root+path.sep))throw Error('Media destination escapes the episode.');
  const bytes=fs.readFileSync(from),hash=crypto.createHash('sha256').update(bytes).digest('hex');
  if(hash!==asset.sha256)throw Error(`Hash mismatch: ${asset.bundleName}. No files copied.`);
  if(fs.existsSync(target)&&crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex')!==hash)throw Error(`A different asset exists at ${asset.projectPath}. Preserve it and resolve manually. No files copied.`);
  pending.push({target,bytes});
}
for(const {target,bytes} of pending){fs.mkdirSync(path.dirname(target),{recursive:true});if(!fs.existsSync(target))fs.writeFileSync(target,bytes);}
console.log(`Restored/verified ${pending.length} assets. Run npm run prepare-media next.`);
