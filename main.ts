import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I='01400000xxxxxxxx000000000000000x000xxxxxxxxxxxxx22220xxxxxxxxxxx00xxxxxxxxxxxxxx0000',
P='000112230000000022222221222122202220000000000000011000000000000012000000000000001101',
U='011022330000000011111111111111101110000000000000000000000000000010000000000000000010';
function run(p,q){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=Buffer.alloc(65536);
let sp=0,cs=0,ol=0,ip=0,pc=0,st=0;
const end=c=>({o:o.subarray(0,ol),c});
for(;;){
if(st===1e6)return end(10);
if(pc<0||pc>=n)return end(9);
const op=p[pc],w=I[op];
if(!w||w==='x')return end(5);
const im=w.charCodeAt(0)-48,po=P.charCodeAt(op)-48,pu=U.charCodeAt(op)-48;
if(pc+im>=n)return end(9);
st++;
const nx=pc+1+im;
if(sp<po)return end(2);
if(sp-po+pu>256)return end(3);
pc=nx;
switch(op){
case 0:return end(0);
case 1:D[sp++]=(p[nx-1]<<24)>>24;break;
case 2:D[sp++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);break;
case 3:sp--;break;
case 4:D[sp]=D[sp-1];sp++;break;
case 5:{const x=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=x;break;}
case 6:D[sp]=D[sp-2];sp++;break;
case 7:{const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;break;}
case 23:D[sp-1]=-D[sp-1]|0;break;
case 27:D[sp-1]=~D[sp-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=D[sp-1],a=D[sp-2];let r;
if(op===16)r=(a+b)|0;
else if(op===17)r=(a-b)|0;
else if(op===18)r=Math.imul(a,b);
else if(op===19){if(b===0)return end(4);r=a===(1<<31)&&b===-1?a:(a/b)|0;}
else if(op===20){if(b===0)return end(4);r=b===-1?0:(a%b)|0;}
else if(op===21){if(b===0)return end(4);r=((a>>>0)/(b>>>0))|0;}
else if(op===22){if(b===0)return end(4);r=((a>>>0)%(b>>>0))|0;}
else if(op===24)r=a&b;
else if(op===25)r=a|b;
else if(op===26)r=a^b;
else if(op===28)r=a<<(b&31);
else if(op===29)r=a>>(b&31);
else if(op===30)r=(a>>>(b&31))|0;
else if(op===32)r=a===b?1:0;
else if(op===33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
sp-=2;D[sp++]=r;break;}
case 48:case 49:case 50:{
const rel=((p[nx-2]|(p[nx-1]<<8))<<16)>>16;let t=true;
if(op!==48){const v=D[--sp];t=op===49?v===0:v!==0;}
if(t)pc=nx+rel;break;}
case 51:
if(cs===64)return end(7);
C[cs++]=nx;pc=p[nx-2]|(p[nx-1]<<8);break;
case 52:
if(cs===0)return end(8);
pc=C[--cs];break;
case 64:{
const a=D[sp-1];
if(a<0||a>=256)return end(6);
D[sp-1]=M[a];break;}
case 65:{
const a=D[sp-1],v=D[sp-2];
if(a<0||a>=256)return end(6);
sp-=2;M[a]=v;break;}
case 80:{
const s=String(D[sp-1]);
if(ol+s.length>65536)return end(11);
sp--;o.write(s,ol);ol+=s.length;break;}
case 81:
if(ol+1>65536)return end(11);
o[ol++]=D[--sp]&255;break;
case 82:D[sp++]=ip<q.length?q[ip++]:-1;break;
case 83:return end(D[--sp]&255);
}}}
const A=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(A).sort()){
const r=run(new Uint8Array(readFileSync(join(A,d,'program.bin'))),new Uint8Array(readFileSync(join(A,d,'input.bin'))));
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),r.o);
writeFileSync(join(O,d,'exit.txt'),r.c+'\n');
}
