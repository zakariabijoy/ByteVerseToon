/* ByteVerseToon · revision 03. Original deterministic motion illustration. */
const c=document.getElementById('film'),g=c.getContext('2d');
const C={bg:'#060a1d',cyan:'#27dcef',blue:'#1269e8',lime:'#a6f51c',pink:'#f846b0',purple:'#a57bff',red:'#ff6a76',white:'#f4fbff',muted:'#a6b7cf'};
const words=window.FILM_WORDS;
const S=x=>Math.max(0,Math.min(1,x)),E=x=>1-(1-S(x))**3;
const W=(line,key)=>words.find(w=>w.line===line&&(!key||w.text.includes(key)))?.start??words.find(w=>w.line===line)?.start??0;
const avatar=new Image();avatar.src='assets/byteversetoon-profile.jpg';
function rr(x,y,w,h,r,fill,stroke,lw=1){g.beginPath();g.roundRect(x,y,w,h,r);if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke()}}
function circle(x,y,r,fill,stroke,lw=1){g.beginPath();g.arc(x,y,r,0,Math.PI*2);if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw;g.stroke()}}
function text(s,x,y,size=40,color=C.white,weight=700,align='center'){g.font=`${weight} ${size}px Bangla`;g.textAlign=align;g.textBaseline='middle';g.fillStyle=(color===C.pink||color===C.red)?C.cyan:color;g.fillText(s,x,y)}
function grad(x,y,w,h,a='#21364e',b='#0b142a'){let z=g.createLinearGradient(x,y,x+w,y+h);z.addColorStop(0,a);z.addColorStop(1,b);return z}
function neon(path,col,width=3,blur=14){g.save();g.strokeStyle=col;g.lineWidth=width;g.shadowColor=col;g.shadowBlur=blur;g.beginPath();path();g.stroke();g.restore()}
function pathline(points,col=C.cyan,lw=3){neon(()=>{g.moveTo(...points[0]);for(let i=1;i<points.length;i++)g.lineTo(...points[i])},col,lw,12)}
function beam(x1,y1,x2,y2,t,col=C.cyan,count=4){g.save();g.globalAlpha=.4;neon(()=>{g.moveTo(x1,y1);g.bezierCurveTo((x1+x2)/2,y1,(x1+x2)/2,y2,x2,y2)},col,2,10);g.restore();for(let i=0;i<count;i++){let f=(t*.28+i/count)%1;let x=x1+(x2-x1)*f,y=y1+(y2-y1)*(3*f*f-2*f*f*f);g.save();g.shadowColor=col;g.shadowBlur=17;circle(x,y,5,col);g.restore()}}
function label(s,x,y,color=C.white,size=32){text(s,x,y,size,color,650)}
function glass(x,y,w,h,r=24,col=C.cyan){g.save();g.shadowColor='#000b';g.shadowBlur=30;g.shadowOffsetY=12;rr(x,y,w,h,r,grad(x,y,w,h,'#20374dca','#0b142be8'),col+'66',1.6);g.shadowBlur=0;g.shadowOffsetY=0;neon(()=>{g.moveTo(x+r,y+1);g.lineTo(x+w-r,y+1)},col+'88',1.3,5);g.restore()}
function place(x,y,scale,fn,angle=0,alpha=1){g.save();g.translate(x,y);g.rotate(angle);g.scale(scale,scale);g.globalAlpha*=alpha;fn();g.restore()}
function enter(t,at,x,y,fn,scale=1){let p=E((t-at)/.55);place(x,y+(1-p)*80,scale*(.72+.28*p),fn,0,p)}
function glowWord(s,x,y,size=95,col=C.lime){g.save();col=(col===C.pink||col===C.red)?C.cyan:col;g.shadowColor=col;g.shadowBlur=4;text(s,x,y,size,col,800);g.restore()}
function badge(s,x,y,col=C.cyan,size=30){g.font=`700 ${size}px Bangla`;let w=g.measureText(s).width+48;glass(x-w/2,y-30,w,60,15,col);text(s,x,y,size,col)}

function background(t){g.fillStyle=C.bg;g.fillRect(0,0,1920,1080);let a=g.createRadialGradient(950,280,20,960,410,1000);a.addColorStop(0,'#143149b8');a.addColorStop(.65,'#09152955');a.addColorStop(1,'#050717');g.fillStyle=a;g.fillRect(0,0,1920,1080);
 g.save();g.beginPath();g.rect(0,580,1920,500);g.clip();g.lineWidth=1;g.strokeStyle='#336b8e37';for(let x=-1700;x<=3600;x+=145){g.beginPath();g.moveTo(960+(x-960)*.04,580);g.lineTo(x,1080);g.stroke()}for(let i=0;i<17;i++){let f=(i/17+t*.012)%1,y=580+500*f*f;g.beginPath();g.moveTo(0,y);g.lineTo(1920,y);g.stroke()}g.restore();
 for(let i=0;i<58;i++){let x=((i*337.23+t*(i%2?6:-4))%2020+2020)%2020-50,y=100+((i*193.7)%780),r=1+(i%4)*.6;g.globalAlpha=.16+(Math.sin(t*.7+i)+1)*.12;circle(x,y,r,[C.cyan,C.purple,C.pink,C.lime][i%4])}g.globalAlpha=1;
 for(let i=0;i<5;i++){let x=170+i*385,y=140+(i%2)*500;g.save();g.translate(x,y);g.rotate(t*.03+i);g.globalAlpha=.2;neon(()=>g.rect(-13,-13,26,26),i%2?C.pink:C.cyan,2,16);g.restore()}
 let v=g.createRadialGradient(960,500,350,960,500,1150);v.addColorStop(0,'#0000');v.addColorStop(1,'#0008');g.fillStyle=v;g.fillRect(0,0,1920,1080);
}

function battery(p=80,col=C.lime,w=290,h=135){g.save();g.shadowColor=col;g.shadowBlur=16;rr(-w/2,-h/2,w,h,20,grad(-w/2,-h/2,w,h,'#263d51','#0a1224'),col,3);rr(w/2+3,-h*.18,15,h*.36,5,col);g.shadowBlur=0;for(let i=0;i<5;i++){let f=S((p/100-i/5)*5);rr(-w/2+14+i*(w-28)/5,-h/2+14,(w-40)/5*f,h-28,9,col+Math.round(190+65*f).toString(16));}g.restore()}
function phone(p=80,t=0,screen='home',brightness=.7){const w=244,h=464;g.save();g.shadowColor='#000';g.shadowBlur=38;g.shadowOffsetY=18;rr(-w/2+6,-h/2+8,w,h,35,'#071020','#4e718f',2);g.shadowBlur=0;g.shadowOffsetY=0;rr(-w/2,-h/2,w,h,35,grad(-120,-232,w,h,'#3b5268','#080d1b'),'#82b8ca',2);rr(-109,-218,218,436,27,grad(-109,-218,218,436,'#163047','#081322'));rr(-37,-211,74,10,5,'#050817');text('9:41',-79,-194,12,C.white,650);rr(70,-199,23,10,3,null,C.white,1);rr(72,-197,18*p/100,6,1,p<70?C.red:C.lime);
 if(screen==='home'){text(`${Math.round(p)}%`,0,-90,58,p<70?C.red:C.white,800);place(0,-17,.47,()=>battery(p,p<70?C.red:C.cyan));for(let i=0;i<6;i++){const x=(i%3-1)*63,y=72+Math.floor(i/3)*63;glass(x-23,y-23,46,46,11,[C.cyan,C.purple,C.pink][i%3]);place(x,y,.28,()=>icon(['message','mail','pin','cloud','chip','play'][i],0,t));}}
 if(screen==='video'){rr(-94,-149,188,218,14,grad(-94,-149,188,218,'#1269e8','#4a246f'));g.fillStyle='#e8faff';g.beginPath();g.moveTo(-17,-74);g.lineTo(-17,-3);g.lineTo(35,-39);g.closePath();g.fill();rr(-82,102,164,16,8,'#34465d');rr(-82,102,164*brightness,16,8,C.lime);text('ব্রাইটনেস',0,148,18,C.white);g.fillStyle=`rgba(245,255,255,${brightness*.18})`;g.fillRect(-94,-149,188,218);}
 if(screen==='usage'){text('Battery Usage',0,-154,22,C.white);text('উদাহরণ',0,-121,15,C.muted);for(let i=0;i<10;i++)rr(-85+i*18,-20-(i%4)*14,11,40+(i%4)*14,3,i<6?C.cyan:C.purple);['ভিডিও','স্ক্রিন','ব্যাকগ্রাউন্ড'].forEach((s,i)=>{text(s,-84,68+i*41,16,C.white,600,'left');rr(-84,84+i*41,164,6,3,'#344257');rr(-84,84+i*41,[132,102,60][i],6,3,i===2?C.pink:C.cyan);});}
 if(screen==='off'){g.fillStyle='#030818ef';g.fillRect(-103,-180,206,374);text('স্ক্রিন বন্ধ',0,0,24,C.muted);}
 rr(-42,202,84,4,2,'#bacfdf');g.restore();
}
function icon(name,state=0,t=0){g.save();g.lineWidth=6;g.strokeStyle=C.white;g.fillStyle=C.white;g.lineJoin='round';g.lineCap='round';
 if(name==='message'){rr(-42,-30,84,56,16,grad(-42,-30,84,56,'#49d7a8','#087a84'));g.beginPath();g.moveTo(-22,24);g.lineTo(-28,43);g.lineTo(0,24);g.fill();for(let x of [-20,0,20])circle(x,-3,4,'#fff')}
 else if(name==='mail'){rr(-43,-29,86,58,10,grad(-43,-29,86,58,'#68bbff','#3156ba'));pathline([[-38,-23],[0,7],[38,-23]],'#d8f5ff',4)}
 else if(name==='pin'){g.fillStyle=C.pink;g.beginPath();g.moveTo(0,48);g.bezierCurveTo(-66,-17,-29,-55,0,-55);g.bezierCurveTo(29,-55,66,-17,0,48);g.fill();circle(0,-21,14,C.white);}
 else if(name==='cloud'){g.fillStyle='#b3b8ff';circle(-24,7,23,g.fillStyle);circle(0,-10,31,g.fillStyle);circle(29,9,24,g.fillStyle);rr(-44,8,91,24,9,g.fillStyle);pathline([[0,35],[0,-2],[-12,10]],C.cyan,5);pathline([[0,-2],[13,10]],C.cyan,5)}
 else if(name==='play'){rr(-35,-40,70,80,16,grad(-35,-40,70,80,'#5dceff','#3155b3'));g.fillStyle=C.white;g.beginPath();g.moveTo(-10,-20);g.lineTo(21,0);g.lineTo(-10,20);g.closePath();g.fill()}
 else if(name==='chip'){rr(-34,-34,68,68,8,grad(-34,-34,68,68,'#6195f0','#192c6b'),C.cyan,2);for(let i=-2;i<=2;i++)for(let s of [-1,1]){pathline([[i*11,s*34],[i*11,s*45]],C.muted,3);pathline([[s*34,i*11],[s*45,i*11]],C.muted,3);}rr(-17,-17,34,34,4,C.cyan)}
 else if(name==='wifi'){for(let r of [18,36,54])neon(()=>g.arc(0,32,r,Math.PI*1.21,Math.PI*1.79),C.cyan,7,13);circle(0,28,6,C.lime)}
 else if(name==='sun'){circle(0,0,28,'#ffd65e');for(let i=0;i<8;i++){let a=i*Math.PI/4+t*.05;pathline([[Math.cos(a)*41,Math.sin(a)*41],[Math.cos(a)*55,Math.sin(a)*55]],'#ffd65e',5)}}
 else if(name==='moon'){circle(0,0,38,'#a6c5f5');circle(21,-13,34,'#0d1730');}
 else if(name==='gear'){for(let i=0;i<8;i++)place(0,0,1,()=>rr(-8,-49,16,27,4,C.cyan),i*Math.PI/4);circle(0,0,37,C.cyan);circle(0,0,17,'#1b3250');}
 else if(name==='heat'){rr(-12,-48,24,75,12,'#f7faff');circle(0,28,24,'#f7faff');rr(-5,-31,10,64,5,C.red);circle(0,28,14,C.red);for(let x of [-34,34])neon(()=>{g.moveTo(x,-35);g.bezierCurveTo(x+16,-10,x-15,5,x,25)},C.red,3,10)}
 else if(name==='check'){neon(()=>{g.moveTo(-28,0);g.lineTo(-7,24);g.lineTo(36,-29)},C.lime,10,20)}
 else if(name==='question'){glowWord('?',0,0,116,C.pink)}
 else if(name==='hospital'){rr(-43,-34,86,68,10,grad(-43,-34,86,68,'#c6e7f4','#3a6687'));rr(-9,-24,18,49,3,C.red);rr(-25,-8,50,18,3,C.red)}
 else if(name==='shield'){g.fillStyle=C.blue;g.beginPath();g.moveTo(0,-43);g.lineTo(39,-25);g.lineTo(30,22);g.lineTo(0,48);g.lineTo(-30,22);g.lineTo(-39,-25);g.closePath();g.fill();place(0,0,.55,()=>icon('check'));}
 else if(name==='bars'){for(let i=0;i<4;i++)rr(-43+i*26,35-i*19,17,15+i*19,4,i<state?C.lime:'#2c3c58');}
 g.restore();}
function card(x,y,w,h,title,name,col=C.cyan,scale=1){place(x,y,scale,()=>{glass(-w/2,-h/2,w,h,25,col);place(0,-h*.1,1.1,()=>icon(name));label(title,0,h*.32,col,30)});}
function tower(x,y,scale,t,col=C.cyan){place(x,y,scale,()=>{pathline([[-55,145],[0,-140],[55,145]],'#8ba8bc',5);for(let i=0;i<4;i++){let yy=-80+i*62;pathline([[-(yy+140)*.19,yy],[(yy+202)*.19,yy+62]],'#64809b',3)}rr(-14,-160,28,70,7,col);circle(0,-166,7,C.pink);for(let i=0;i<3;i++){let r=35+((t*.25+i/3)%1)*125;g.save();g.globalAlpha=1-r/180;neon(()=>g.arc(0,-130,r,-.7,.7),col,3,18);neon(()=>g.arc(0,-130,r,Math.PI-.7,Math.PI+.7),col,3,18);g.restore()}})}
function router(x,y,scale,t){place(x,y,scale,()=>{glass(-82,-18,164,65,15,C.cyan);pathline([[-55,-16],[-69,-83]],C.white,6);pathline([[55,-16],[69,-83]],C.white,6);for(let i=0;i<4;i++)circle(-40+i*24,20,4,C.lime);place(0,-65,.8,()=>icon('wifi',0,t));})}
let pendingTitle=null;
function sceneTitle(s,t,at,col=C.cyan){
 if(t<at)return;let p=E((t-at)/.35);
 pendingTitle={matrix:{a:1,b:0,c:0,d:1,e:0,f:0},alpha:1,draw:()=>place(960,105+(1-p)*14,1,()=>{
  g.font='750 58px Bangla';let size=Math.min(58,58*1490/Math.max(1,g.measureText(s).width));
  text(s,0,0,size,col===C.lime?C.lime:C.white,750);
  rr(-36,47,72,3,2,C.cyan);
 },0,p)};
}

function opening(t){
 if(t<7.02){let p=E(t/.75);place(960,470,1.13+.07*Math.sin(t*.5),()=>phone(80-15*S(t/7.02),t));for(let i=0;i<7;i++){let a=i*.8+t*.2,r=290+45*Math.sin(i+t*.7);g.save();g.globalAlpha=.75;beam(960,440,960+Math.cos(a)*r,440+Math.sin(a)*r*.65,t+i,C.pink,1);g.restore();}if(t>W(0,'চুরি'))sceneTitle('ব্যাটারি চুরি হচ্ছে!',t,W(0,'চুরি'),C.pink);if(t>W(1,'পকেটেই')){badge('অদৃশ্য শক্তিখোর',1400,465,C.pink,35);beam(1085,445,1280,465,t,C.pink,3);}if(t>W(2))sceneTitle('বিশ্বাস হচ্ছে না?',t,W(2),C.lime);return;}
 if(t<21.56){const a=E((t-7.02)/.9),morning=t>=11.36,pct=t<W(4,'৬৫')?80:65;enter(t,7.02,540,475,()=>phone(80,t),.95);enter(t,11.36,1380,475,()=>phone(pct,t),.95);place(540,180,.62,()=>icon('moon'));if(morning)enter(t,11.36,1380,180,()=>icon('sun',0,t),.65);label('রাত',540,820,C.muted,31);if(morning)label('সকাল',1380,820,C.muted,31);
 if(t>=W(3,'৮০')){glowWord('৮০%',540,125,75,C.lime);if(t>=W(4,'৬৫'))glowWord('৬৫%',1380,125,75,C.pink);beam(710,465,1210,465,t,C.pink,5);if(t>=W(6,'১৫')){place(960,460,E((t-W(6,'১৫'))/.4),()=>{glowWord('১৫%',0,-20,114,C.pink);label('গেল কোথায়?',0,80,C.white,42)});}else {place(960,460,1,()=>{icon('question');});}}return;}
 const p=E((t-21.56)/.8);place(960,430,.95,()=>battery(65,C.pink,340,150));if(t<28.56){sceneTitle('শুধু ব্যাটারিই দায়ী নয়',t,21.56,C.pink);neon(()=>{g.moveTo(750,332);g.lineTo(1165,518)},C.pink,7,18);return;}
 const entries=[['ব্যাকগ্রাউন্ড','message',460],['নেটওয়ার্ক','bars',960],['ডিসপ্লে ও চিপ','chip',1460]];entries.forEach(([s,n,x],i)=>{enter(t,28.56+i*.55,x,650,()=>{glass(-175,-108,350,216,24,[C.cyan,C.pink,C.purple][i]);place(0,-15,.9,()=>icon(n,n==='bars'?2:0,t));label(s,0,67,C.white,33)},.98);beam(960,455,x,540,t+i,[C.cyan,C.pink,C.purple][i],3);});sceneTitle('তিনটি অদৃশ্য শক্তিখোর',t,W(8,'তিনটি'),C.lime);if(t>W(10,'এক'))badge('এক মিনিটে সমস্যার খোঁজ',960,220,C.cyan,42);
}

function isoBuilding(x,y,h,col=C.blue){g.save();const w=82,d=45;g.fillStyle=grad(x-w,y-h,w*2,h,'#273b56','#111b31');g.beginPath();g.moveTo(x-w,y-h);g.lineTo(x,y-h-d);g.lineTo(x+w,y-h);g.lineTo(x,y-h+d);g.closePath();g.fill();g.strokeStyle=col;g.lineWidth=1.6;g.stroke();g.fillStyle='#102137';g.beginPath();g.moveTo(x-w,y-h);g.lineTo(x,y-h+d);g.lineTo(x,y+d);g.lineTo(x-w,y);g.closePath();g.fill();g.stroke();g.fillStyle='#19364c';g.beginPath();g.moveTo(x,y-h+d);g.lineTo(x+w,y-h);g.lineTo(x+w,y);g.lineTo(x,y+d);g.closePath();g.fill();g.stroke();for(let row=0;row<h/34-1;row++)for(let side of [-1,1])for(let coln=0;coln<2;coln++){let xx=x+side*(22+coln*31),yy=y-h+38+row*32+(side>0?-coln*10:coln*10);rr(xx-6,yy,10,15,2,col+'b0');}g.restore()}
// City activity is a causal loop: scheduled app job -> lit building -> energy pulse.
function cityRoad(points,t,col,count=3,speed=.085){
 g.save();g.lineJoin='round';g.lineWidth=24;g.strokeStyle='#11283c';g.beginPath();g.moveTo(...points[0]);for(let i=1;i<points.length;i++)g.lineTo(...points[i]);g.stroke();
 g.lineWidth=1;g.strokeStyle='#4383a650';g.stroke();
 const lens=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1])),total=lens.reduce((a,b)=>a+b,0);
 for(let k=0;k<count;k++){let d=((t*speed+k/count)%1)*total,seg=0;while(seg<lens.length-1&&d>lens[seg])d-=lens[seg++];let f=d/lens[seg],a=points[seg],b=points[seg+1];
  place(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,1,()=>{rr(-10,-5,20,10,3,col);rr(2,-4,5,8,2,'#f4fbff');},Math.atan2(b[1]-a[1],b[0]-a[0]));
 }g.restore();
}
function cityScene(t){
 const u=t-42.76,asleep=t>=58.22,runaway=t>=95.04;
 const apps=[['মেসেজ','message',470,236,67.28,0],['ইমেইল','mail',1450,236,69.08,3],['লোকেশন','pin',470,775,70.64,5],['ক্লাউড ব্যাকআপ','cloud',1450,775,72.88,4]];
 const nodes=[[490,490,155,C.blue],[750,365,140,C.purple],[1180,365,165,C.blue],[1450,490,160,C.blue],[1270,690,150,C.cyan],[680,690,150,C.cyan]];
 let active=-1;
 if(t>=67.28){const eligible=apps.filter(a=>t>=a[4]);const last=eligible[eligible.length-1];active=t<76.4?last?.[5]??-1:eligible[Math.floor((t-76.4)/2.8)%eligible.length]?.[5]??-1;}
 if(runaway)active=1;
 g.save();const zoom=.88+.04*E(u/4);g.translate(960,470);g.scale(zoom,zoom);g.translate(-960,-470);
 // A quiet sleeping city still carries discrete service jobs, rather than every app running continuously.
 g.save();g.globalAlpha=.7;g.fillStyle='#12263b90';g.beginPath();g.moveTo(960,300);g.lineTo(1590,570);g.lineTo(960,875);g.lineTo(330,570);g.closePath();g.fill();g.restore();
 const roads=[[[420,540],[740,385],[1510,560]],[[1510,560],[1210,735],[420,540]],[[740,385],[960,500],[1210,735]]];
 roads.forEach((r,i)=>cityRoad(r,t+i*3,asleep?C.cyan:C.white,asleep?2:4,runaway?.18:asleep?.055:.085));
 nodes.forEach(([x,y,h,col],i)=>{
  const awake=!asleep||i===active||i===2;g.save();g.globalAlpha=awake?1:.42;isoBuilding(x,y,h,i===active?C.lime:col);g.restore();
  if(i===active){let pulse=(t*(runaway?1.6:.65))%1;g.save();g.globalAlpha=(1-pulse)*.65;g.strokeStyle=C.lime;g.lineWidth=2;g.beginPath();g.ellipse(x,y+21,88+pulse*42,28+pulse*17,0,0,Math.PI*2);g.stroke();g.restore();
   beam(960,510,x,y-30,t,runaway?C.purple:C.lime,runaway?9:4);
   // Work completes at the active building; notification check follows the same cycle.
   let f=(t*.65)%1;place(x,y-h-30,.28,()=>icon(f>.72?'check':apps.find(a=>a[5]===i)?.[1]||'chip',0,t));
  }else if(!asleep)beam(960,510,x,y-30,t+i,C.cyan,1);
 });
 place(960,510,1,()=>{glass(-140,-100,280,215,28,runaway?C.purple:C.cyan);place(0,-12,.7,()=>battery(runaway?65-10*S((t-95.04)/9):65,C.lime));label('শক্তিকেন্দ্র',0,72,C.white,31);});
 if(t>=64.76)apps.forEach(([name,ic,x,y,at,node],i)=>{if(t<at)return;const p=E((t-at)/.45),on=node===active;
  place(x,y,.86*p,()=>{glass(-150,-85,300,170,22,on?C.lime:C.cyan);place(0,-34,.40,()=>icon(ic,0,t));text(name,0,25,36,C.white,700);circle(110,-47,7,on?C.lime:'#45627a');
   rr(-110,66,220,4,2,'#34536a');rr(-110,66,220*((t*.36+i*.31)%1),4,2,on?C.lime:C.cyan);
  });
  if(on){const [bx,by]=nodes[node];beam(x,y+(y<500?65:-65),bx,by-70,t,C.lime,2);}
 });
 if(t>=79.24){place(730,440,.48,()=>icon('hospital'));place(1200,445,.48,()=>icon('shield'));}
 g.restore();
 if(t<58.22)sceneTitle(t<52.8?'ফোনের ভেতরে একটি শহর':'ব্যাটারি = পাওয়ার স্টেশন',t,t<52.8?W(12,'শহর'):W(14,'পাওয়ার'),C.cyan);
 else if(t<64.76)sceneTitle(t<63.34?'স্ক্রিন বন্ধ...':'কিন্তু শহর থামেনি!',t,t<63.34?W(16,'বন্ধ'):W(18,'না'),C.lime);
 else if(t<88.92)sceneTitle('প্রয়োজনমতো জেগে ওঠে অ্যাপ',t,67.28,C.cyan);
 else if(t<95.04)sceneTitle('সব অ্যাপ সবসময় কাজ করে না',t,88.92,C.white);
 else if(t<104.08)sceneTitle('অস্বাভাবিক কাজ → বেশি চার্জ খরচ',t,W(29,'অস্বাভাবিকভাবে'),C.cyan);
 else sceneTitle('ব্যাকগ্রাউন্ড অ্যাক্টিভিটি',t,104.08,C.lime);
 if(asleep&&t<64.76)badge('স্ক্রিন ঘুমায় • জরুরি সেবা সচল',960,835,C.cyan,30);
 if(runaway)badge('বেশি কাজ → বাড়তি শক্তির চাহিদা',960,835,C.cyan,30);
}


function signalScene(t){const u=t-105.62,weak=t>=123.04&&t<145.04||t>=163.9;const col=weak?C.pink:C.cyan;
 if(t>=145.04&&t<163.9){const far=t>=152.58;let dist=far?1080:540,x1=960-dist/2,x2=960+dist/2;[x1,x2].forEach((x,i)=>{glass(x-145,280,290,370,28,i?C.pink:C.cyan);circle(x,382,54,i?'#d1a6d8':'#9ec9e9');rr(x-76,450,152,132,40,grad(x-76,450,152,132,i?'#725287':'#1d5a8b','#172d45'));label(i?'বন্ধু':'তুমি',x,618,C.white,35)});for(let i=0;i<5;i++){let f=(t*.5+i/5)%1;let x=x1+130+f*(dist-260);g.save();g.globalAlpha=1-f;neon(()=>g.arc(x,440,25+f*(far?100:35),-.9,.9),far?C.pink:C.cyan,4,20);g.restore();}if(far){for(let i=0;i<9;i++){let x=490+i*115,y=210+(i%3)*32;label('শব্দ',x,y,'#977bca65',23);}sceneTitle('দূরত্ব + চারপাশের শব্দ',t,152.58,C.pink)}else sceneTitle('বন্ধু কাছে: কম জোরেই শোনে',t,146.2,C.lime);return;}
 place(960,472,1.05,()=>phone(65,t,'video',.55));if(t<117.74||t>=314.14){router(440,455,1.5,t);beam(600,445,820,445,t,C.cyan,5);place(1450,455,.9,()=>icon('wifi',0,t));sceneTitle('ভালো ওয়াইফাই',t,Math.max(113.94,105.62),C.lime);}
 else {tower(425,480,1,t,col);tower(1495,480,1.15,t+1,col);beam(525,390,815,430,t,col,weak?7:3);beam(1090,430,1390,360,t+.5,col,weak?6:3);if(t>=120&&t<122.0){glass(780,190,360,580,10,'#6b7a98');let p=E((t-120)/1.4);rr(784,195,176*p,570,7,grad(784,195,176,570,'#637889','#293a51'));rr(1136-176*p,195,176*p,570,7,grad(784,195,176,570,'#637889','#293a51'));}
 if(t>=121.7&&t<123.04){rr(745,580,430,100,25,grad(745,580,430,100,'#3274a1','#182a4e'),C.cyan,2);rr(855,512,220,95,22,'#5586a66b',C.cyan,2);circle(824,684,38,'#080d20','#8aa7bd',5);circle(1092,684,38,'#080d20','#8aa7bd',5);}
 let state=t<126.12?'সিগন্যাল দুর্বল':t<127.44?'5G':t<128.6?'4G':t<131.52?'এক দাগ সিগন্যাল':'সংযোগ ধরে রাখার চেষ্টা';sceneTitle(t>=172?'দুর্বল নেটওয়ার্ক সিগন্যাল':weak?state:'নতুন টাওয়ারে সংযোগ',t,117.74,weak?C.pink:C.cyan);place(960,188,.52,()=>icon('bars',weak?1:4,t));if(t>=139.92&&t<145.04||t>=163.9){badge('শক্তি খরচ ↑',960,805,C.pink,43);}}
}

function chipScene(t){const u=t-194.3;const x=960,y=490;glass(x-270,y-200,540,400,35,C.purple);rr(x-190,y-145,380,290,24,grad(x-190,y-145,380,290,'#2b3a64','#10213c'),C.cyan,4);for(let i=0;i<10;i++){let xx=x-170+i*38;for(let side of [-1,1]){rr(xx,y+side*170-12,18,38,4,'#86b4c8');beam(xx,y+side*190,xx+(i-4.5)*33,y+side*285,t+i,C.cyan,2)}}
 for(let i=0;i<4;i++){let xx=x-90+(i%2)*180,yy=y-67+Math.floor(i/2)*134;let light=.4+.5*(Math.sin(t*4+i)+1)/2;g.save();g.globalAlpha=light;rr(xx-65,yy-44,130,88,12,i%2?C.purple:C.cyan);g.restore();label(i%2?'GPU':'CPU',xx,yy,'#08152b',32)}
 card(410,435,260,220,'গেম','play',C.pink);card(1510,435,260,220,'ভিডিও এডিট','chip',C.cyan);beam(550,440,680,485,t,C.pink,5);beam(1240,485,1370,440,t,C.cyan,5);sceneTitle('প্রসেসর ও গ্রাফিক্স: বেশি কাজ, বেশি শক্তি',t,W(64,'প্রসেসর'),C.lime);
}
function bikeScene(t){g.save();g.translate(960,515);let fast=t>=211.4;for(let x of [-265,265]){circle(x,100,95,'#0b1227','#8aa6b9',13);place(x,100,1,()=>{for(let i=0;i<6;i++){let a=i*Math.PI/3-t*(fast?7:2);pathline([[0,0],[Math.cos(a)*80,Math.sin(a)*80]],C.cyan,3)}});}pathline([[-265,100],[-80,-95],[135,-90],[265,100],[-265,100]],C.blue,12);rr(-150,-153,230,75,25,grad(-150,-153,230,75,'#ff8bd6','#732f86'),C.pink,2);rr(-218,-161,126,22,10,'#e4eff5');rr(-90,-40,150,118,15,grad(-90,-40,150,118,'#7a98ac','#1a2d45'),C.cyan,2);for(let i=0;i<5;i++)pathline([[-73,-22+i*20],[45,-22+i*20]],'#25394d',5);pathline([[133,-90],[170,-206],[210,-220]],'#abcad5',8);circle(178,-133,25,'#d8faff');for(let i=0;i<8;i++){let x=-600+((t*(fast?210:70)+i*140)%1200);g.globalAlpha=.2;pathline([[x,257],[x+55,257]],C.cyan,3);}g.restore();g.globalAlpha=1;place(960,205,.7,()=>battery(fast?40:75,fast?C.pink:C.lime,330,100));sceneTitle(fast?'গতি বাড়লে জ্বালানি খরচও বাড়ে':'মোটরসাইকেলের সহজ উপমা',t,205.1,fast?C.pink:C.cyan);}
function displayScene(t){if(t>=194.3&&t<205.1||t>=214.08&&t<219.54){chipScene(t);return;}if(t>=205.1&&t<214.08){bikeScene(t);return;}const bright=t>=W(61,'ব্রাইটনেস');place(960,480,1.10,()=>phone(65,t,'video',bright?.97:.24));if(t>=182.8)place(1430,285,1.5,()=>icon('sun',0,t));else place(1430,285,1.3,()=>icon('moon'));place(460,475,.9,()=>battery(65,C.lime,300,145));beam(620,475,805,475,t,bright?C.pink:C.cyan,bright?8:3);sceneTitle(t<179.06?'তোমার ফোনের স্ক্রিন':bright?'বেশি আলো → বেশি শক্তি':'কম ব্রাইটনেস',t,177.48,bright?C.pink:C.lime);if(bright)badge('ব্যাটারি থেকে শক্তি',960,835,C.pink,37);}

function ionScene(t){const aging=t>=243.3;const x1=500,x2=1420,y=480;glass(430,210,1060,535,30,C.cyan);rr(x1-60,260,120,430,12,grad(x1-60,260,120,430,'#647b9a','#182f4b'),C.cyan,2);rr(x2-60,260,120,430,12,grad(x2-60,260,120,430,'#ff8bc2','#6a2b6f'),C.pink,2);rr(935,255,50,445,12,'#87e0e52d',C.cyan+'70',1);for(let i=0;i<36;i++){let f=(t*.13+i/36)%1,x=580+f*760,y=300+(i%7)*53;const stuck=aging&&i%4===0;if(stuck){x=605+(i%3)*15;y=300+(i%7)*53;}g.save();g.shadowColor=stuck?C.muted:C.cyan;g.shadowBlur=stuck?2:12;circle(x,y,8,stuck?'#6b7389':C.cyan);if(!stuck)text('+',x,y,10,'#082140');g.restore();}pathline([[500,260],[500,185],[1420,185],[1420,260]],C.lime,3);for(let i=0;i<12;i++){let f=(t*.25+i/12)%1;circle(500+920*f,185,5,C.lime);}label('ইলেকট্রোড',500,790,C.white,29);label('ইলেকট্রোলাইট',960,790,C.white,29);label('ইলেকট্রোড',1420,790,C.white,29);if(aging){place(1610,480,1.2,()=>icon('heat',0,t));sceneTitle('অতিরিক্ত তাপ ও সময় → ক্ষমতা কমে',t,W(80,'তাপের'),C.pink);}else sceneTitle('লিথিয়াম আয়নের চলাচল',t,W(78,'লিথিয়াম'),C.cyan);}
function tankScene(t){let old=t>=259.36;const loss=old?E((t-259.36)/2):0;[620,1300].forEach((x,i)=>{let h=390,usable=i?1-loss*.36:1;glass(x-150,290,300,h,28,i?C.purple:C.cyan);g.save();g.beginPath();g.roundRect(x-136,304,272,362,18);g.clip();let yy=666-362*usable;g.fillStyle=grad(x-136,yy,272,362*usable,i?'#5582e4':'#2adcea',i?'#273871':'#15496d');g.fillRect(x-136,yy,272,362*usable);neon(()=>{g.moveTo(x-136,yy);g.bezierCurveTo(x-60,yy-7,x+55,yy+7,x+136,yy)},i?C.purple:C.cyan,3,14);if(i&&loss){g.fillStyle='#7d88a333';g.fillRect(x-136,304,272,yy-304);}g.restore();label(i?'ব্যবহারের পরে':'নতুন অবস্থায়',x,737,C.white,33);if(t>=264.64)glowWord('১০০%',x,232,65,i?C.purple:C.lime);});sceneTitle(t>=264.64?'১০০% চার্জ ≠ আগের সমান শক্তি':'ব্যবহারযোগ্য ধারণক্ষমতার উপমা',t,t>=264.64?W(84,'১০০'):254.3,t>=264.64?C.lime:C.cyan);}
function agingScene(t){if(t>=254.3&&t<270.24){tankScene(t);return;}if(t>=231.4&&t<254.3){ionScene(t);return;}if(t>=270.24){place(960,480,1.7,()=>battery(65,C.purple));sceneTitle('ব্যাটারি এজিং',t,W(85,'এজিং'),C.lime);return;}const u=t-219.54;const p=E(u/1.3);for(let i=0;i<3;i++){let x=480+i*480;g.save();g.globalAlpha=.35;card(x,505,300,220,['অ্যাপ','নেটওয়ার্ক','ডিসপ্লে'][i],['message','bars','play'][i],C.purple);g.restore();}if(t>=223.35)for(let i=0;i<3;i++)pathline([[365+i*480,415],[590+i*480,580]],C.pink,6);enter(t,227.06,960,455,()=>battery(65,C.pink,480,230),1);sceneTitle(t<223.35?'কিন্তু দাঁড়াও!':t<227.06?'সমস্যা এই তিনটিও নাও হতে পারে':'সমস্যা ব্যাটারির ভেতরেও',t,219.54,C.pink);}

function usageScene(t){const rows=['কোন অ্যাপ বেশি খরচ করছে?','স্ক্রিন কতক্ষণ অন ছিল?','ব্যাকগ্রাউন্ডে অস্বাভাবিক কাজ?'];glass(370,210,1180,570,30,C.cyan);label('Battery Usage',570,265,C.white,38);badge('উদাহরণ UI',1370,265,C.purple,24);for(let i=0;i<17;i++){let h=70+((i*17)%7)*14;rr(440+i*61,444-h,35,h,6,i<10?C.cyan:C.purple);}const active=t<286.86?0:t<288.82?1:2;rows.forEach((s,i)=>{const y=508+i*82;glass(427,y-29,1055,66,14,active===i?C.lime:C.cyan);label(s,710,y+3,active===i?C.lime:C.white,31);rr(1040,y-7,380,15,7,'#21344d');rr(1040,y-7,[302,245,157][i],15,7,active===i?C.lime:C.purple);});let cy=508+active*82;g.save();g.translate(1485+Math.sin(t)*4,cy+5);g.fillStyle=C.white;g.beginPath();g.moveTo(0,0);g.lineTo(-24,-29);g.lineTo(-20,10);g.closePath();g.fill();g.restore();sceneTitle(t<280.98?'এবার গোয়েন্দার মতো তদন্ত':'সেটিংস → ব্যাটারি ইউসেজ',t,272.36,C.lime);if(t>=293.68)badge('বেশি ব্যবহার করলে বেশি খরচ স্বাভাবিক',960,832,C.purple,31);}
function tipScene(t){const at=[302.16,307.74,314.14],xs=[430,960,1490];const cols=[C.cyan,C.purple,C.pink];const names=['অটো ব্রাইটনেস','অ্যাপের সেটিংস','ভালো ওয়াইফাই'];for(let i=0;i<3;i++){let active=t>=at[i];enter(t,298.72+i*.25,xs[i],500,()=>{glass(-210,-260,420,520,28,active?C.lime:cols[i]);place(0,-127,1.15,()=>icon(['sun','gear','wifi'][i],0,t));label(names[i],0,0,active?C.lime:C.white,35);if(i===0){rr(-142,86,284,20,10,'#344863');rr(-142,86,active?138:246,20,10,C.lime);circle(active?-4:104,96,17,C.white);}if(i===1){rr(-55,73,110,47,24,active?C.lime:'#47546f');circle(active?30:-30,96,18,'#f5fbff');}if(i===2){place(0,100,.6,()=>icon(t>=318.98?'heat':'bars',4,t));}if(active)place(150,200,.35,()=>icon('check'));},1);}sceneTitle(t>=322?'ফোনভেদে সমাধান আলাদা হতে পারে':'ব্যাটারি বাঁচানোর তিনটি সহজ উপায়',t,298.72,C.lime);if(t>=318.98&&t<322)badge('অতিরিক্ত তাপ এড়িয়ে চলো',960,820,C.pink,35);}
function closing(t){if(t<343.98){const ns=[['message',480,320],['chip',960,250],['wifi',1440,320],['cloud',600,670],['play',1320,670]];ns.forEach(([n,x,y],i)=>{let xx=x+Math.sin(t*.35+i)*14,yy=y+Math.cos(t*.4+i)*14;card(xx,yy,230,170,'',n,i%2?C.purple:C.cyan);beam(960,480,xx,yy,t+i,C.cyan,2)});place(960,600,.86,()=>phone(65,t));sceneTitle('প্রযুক্তির ভেতরে অদেখা এক জগৎ',t,328.6,C.lime);return;}
 const showBrand=t>=349.62;if(!showBrand){glowWord(t<346.22?'প্রযুক্তির জাদু সবাই দেখে':'আমরা দেখাই কীভাবে কাজ করে',960,420,t<346.22?92:82,C.lime);for(let i=0;i<4;i++)place(480+i*320,650,.65,()=>icon(['chip','wifi','cloud','message'][i],0,t));return;}
 glass(570,200,780,580,35,C.cyan);if(avatar.complete&&avatar.naturalWidth){g.save();g.beginPath();g.roundRect(860,240,200,200,45);g.clip();g.drawImage(avatar,860,240,200,200);g.restore();}text('ByteVerseToon',960,490,62,C.white,800);rr(705,550,510,92,25,grad(705,550,510,92,'#b8fb58','#78c32c'));text('সাবস্ক্রাইব',960,595,48,'#0b1a27',800);if(t>=354.9)text('১০০% চার্জ কতক্ষণ চলে?',960,710,42,C.white);else text('প্রযুক্তির গল্পে সঙ্গে থাকো',960,710,34,C.muted);}

// Short caption phrases stay on screen; the lime backing follows the actual spoken word.
const captions=[];let group=[];for(const w of words){if(group.length&&(w.line!==group[0].line||group.length>=6||group.map(a=>a.text).join(' ').length+w.text.length>43)){captions.push(group);group=[];}group.push(w)}if(group.length)captions.push(group);
function caption(t){if(t>359.81)return;let index=captions.findIndex((a,i)=>t>=a[0].start&&(i===captions.length-1||t<captions[i+1][0].start));if(index<0)return;const arr=captions[index];g.font='750 46px Bangla';const widths=arr.map(w=>g.measureText(w.text).width);let full=widths.reduce((a,b)=>a+b,0)+(arr.length-1)*15;const bx=960-full/2-34,by=924;glass(bx,by,full+68,100,21,C.cyan);let x=960-full/2;let active=arr.findLastIndex(w=>t>=w.start);if(active<0)active=0;for(let i=0;i<arr.length;i++){let a=t>=arr[i].start;const w=widths[i];if(i===active){g.save();g.shadowColor=C.lime;g.shadowBlur=12;rr(x-7,by+18,w+14,65,9,C.lime);g.restore();}text(arr[i].text,x+w/2,by+52,46,i===active?'#071526':a?C.white:'#a3b1c6',750);x+=w+15;}}

function render(t){t+=window.PATCH_OFFSET||0;pendingTitle=null;background(t);g.save();let chapter=t<42.76?0:t<105.62?1:t<173.74?2:t<219.54?3:t<272.36?4:t<298.72?5:t<328.6?6:7;let starts=[0,42.76,105.62,173.74,219.54,272.36,298.72,328.6];let u=t-starts[chapter];let scale=.96+.04*E(u/.8);g.translate(960,475);g.scale(scale,scale);g.translate(-960,-475);
 if(chapter===0)opening(t);else if(chapter===1)cityScene(t);else if(chapter===2)signalScene(t);else if(chapter===3)displayScene(t);else if(chapter===4)agingScene(t);else if(chapter===5)usageScene(t);else if(chapter===6)tipScene(t);else closing(t);g.restore();if(pendingTitle){g.save();g.setTransform(pendingTitle.matrix);g.globalAlpha=pendingTitle.alpha;pendingTitle.draw();g.restore();}caption(t);}
window.addEventListener('hf-seek',e=>render(e.detail.time));
document.fonts.ready.then(()=>{const clock={t:0};const tl=gsap.timeline({paused:true});tl.to(clock,{t:362,duration:362,ease:'none',onUpdate:()=>render(clock.t)},0);window.__timelines.main=tl;render(0);});
