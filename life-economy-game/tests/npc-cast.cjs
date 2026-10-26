require('./npc-dialogue.cjs');
const assert=require('assert');const G=Game;
const names='강혜원 김가빈 김수연 김지유 남궁노을 문서연 배지원 오연오 오현지 유예나 이예빈 이예슬 장은설 고도영 김도윤 김주헌 김현석 문서준 손석희 오준혁 유민준 이건하 이진우 임상연 홍서진'.split(' ');
assert.deepEqual(G.data.npcProfiles.map(p=>p.name),names);assert.equal(new Set(G.data.npcProfiles.map(p=>p.portraitIndex)).size,25);
for(const p of G.data.npcProfiles){const html=G.visuals.npc(p);assert(html.includes('npc-face-art'));assert(!html.includes('painted-portrait'));assert(html.includes('--npc-x:'+p.portraitIndex%5*25+'%'));assert(html.includes('--npc-y:'+Math.floor(p.portraitIndex/5)*25+'%'));}
const s=G.createNewCharacter();s.report={dialogues:[]};
const encountered=new Set();for(let turn=0;turn<46;turn++){s.turn=turn;for(const key of Object.keys(G.data.npcRoles)){G.addNPCDialogue(s,key,'활동을 돌아보며','오늘도 함께했어요.');encountered.add(s.report.dialogues.at(-1).npc.name);}}
assert.equal(encountered.size,25);
const saved=JSON.stringify(s.report.dialogues);G.saveGame(s);assert.equal(JSON.stringify(G.loadGame().report.dialogues),saved);
s.report.dialogues=[{npc:{name:'김 선생님',role:'담임 선생님',gender:'male',appearance:2,age:40},title:'이전 저장',text:'잘했어.'}];G.saveGame(s);const loaded=G.loadGame();assert.equal(loaded.report.dialogues[0].npc.name,'김수연');assert.equal(loaded.report.dialogues[0].npc.portraitIndex,2);
const once=JSON.stringify(loaded);G.migrateGame(loaded);assert.equal(JSON.stringify(loaded),once);
assert(require('fs').statSync('assets/images/npc-cast-v1.png').size>10000);
console.log('PASS: 제공한 이름 25개, 전용 얼굴 25칸, 전 인물 등장 가능, 저장된 얼굴·이름 유지, 이전 NPC 저장 변환');
