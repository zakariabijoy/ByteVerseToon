"""Loopback-only review server with HTTP byte ranges for MP4 seeking."""
import argparse,re,pathlib
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
p=argparse.ArgumentParser();p.add_argument('--directory',required=True);p.add_argument('--port',type=int,default=3117);a=p.parse_args()
root=pathlib.Path(a.directory).resolve()
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(root),**kwargs)
 def send_head(self):
  path=pathlib.Path(self.translate_path(self.path))
  if not path.is_file():self.remaining=None;return super().send_head()
  size=path.stat().st_size;start=0;end=size-1;r=self.headers.get('Range');partial=False
  if r:
   m=re.fullmatch(r'bytes=(\d*)-(\d*)',r.strip())
   if m:
    lo,hi=m.groups()
    if lo:start=int(lo);end=min(int(hi),size-1) if hi else size-1
    elif hi:start=max(0,size-int(hi))
    partial=True
  if start>=size or end<start:self.send_error(416,'Range not satisfiable');return None
  try:f=path.open('rb')
  except OSError:self.send_error(404);return None
  self.send_response(206 if partial else 200);self.send_header('Content-Type',self.guess_type(str(path)));self.send_header('Accept-Ranges','bytes');self.send_header('Content-Length',str(end-start+1))
  if partial:self.send_header('Content-Range',f'bytes {start}-{end}/{size}')
  self.send_header('Last-Modified',self.date_time_string(path.stat().st_mtime));self.end_headers();f.seek(start);self.remaining=end-start+1;return f
 def copyfile(self,source,outputfile):
  if self.remaining is None:return super().copyfile(source,outputfile)
  left=self.remaining
  try:
   while left:
    data=source.read(min(65536,left))
    if not data:break
    outputfile.write(data);left-=len(data)
  except (BrokenPipeError,ConnectionResetError):pass
print(f'Review server: http://127.0.0.1:{a.port}/review.html',flush=True)
ThreadingHTTPServer(('127.0.0.1',a.port),Handler).serve_forever()
