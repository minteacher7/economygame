require('./ui-smoke.cjs');
const assert=require('assert');const G=Game;
function state(phase='youth'){
 const s=G.createNewCharacter(()=>.4);Object.assign(s.character,{familyName:'김',givenName:'하늘',gender:'female'});
 if(phase==='transition')Object.assign(s,{phase,turn:12,year:1993,age:19});
 if(phase==='adult')Object.assign(s,{phase,turn:16,year:1997,age:23});
 s.finance.cash=10000;s.report={year:s.year,age:s.age,changes:[],messages:[]};G.ensureFamily(s);return s;
}
for(const event of [...G.data.events,...G.data.businessEvents].filter(e=>e.category!=='family')){
 assert(event.npc,event.id);assert(event.dialogue,event.id);assert(event.choices.every(c=>c.reply),event.id);
 const s=state(event.conditions.phase||'adult');s.career.path=event.conditions['career.path']||null;
 const html=G.renderEventDialogue(s,event),visible=html.replace(/<[^>]+>/g,'');
 assert(html.includes('npc-face-art'));assert(visible.includes(event.dialogue));assert(!/undefined|NaN|colleague|professor|careerExploration/.test(visible));
}
for(const [path,eventId,npc] of [['university','campusQuestion','professor'],['technical','practicePartner','peer'],['employment','firstInterview','mentor'],['exploration','differentPaths','peer'],['startup','firstCustomer','customer']]){
 const s=state('transition');s.career.path=path;s.pendingEvent=eventId;
 const e=G.data.events.find(e=>e.id===eventId);assert(G.checkConditions(s,e.conditions));
 assert.equal(G.selectWeightedEvent(s,()=>0).id,eventId);
 G.saveGame(s);const restored=G.loadGame();assert.equal(restored.pendingEvent,eventId);
 G.resolveEventChoice(restored,1);assert.equal(restored.turn,13);assert.equal(restored.pendingEvent,null);
 const d=restored.report.dialogues.at(-1);assert.equal(d.npc.name,G.eventNPC(s,e).name);assert.equal(d.text,e.choices[1].reply);
 G.saveGame(restored);assert.deepEqual(G.loadGame().report.dialogues,restored.report.dialogues);
}
let s=state('adult'),e=G.data.events.find(e=>e.id==='adult3');assert.equal(G.eventNPC(s,e).role,'진로 상담 선생님');s.career.job='teacher';assert.equal(G.eventNPC(s,e).role,'직장 상사');s.business={cash:1200};assert.equal(G.eventNPC(s,e).role,'함께 일하는 직원');
s=state();G.addActivityDialogue(s,{activities:['study','rest']});assert.equal(s.report.dialogues.length,1);assert([15,16].includes(s.report.dialogues[0].npc.age));
s.pendingEvent='youth0';G.resolveEventChoice(s,0);assert(s.report.dialogues.some(d=>d.text===G.data.events[0].choices[0].reply));assert(!s.report.messages.includes(G.data.events[0].choices[0].resultText));
// Saved NPC presentation is fixed at the time of the encounter, even as the player advances.
s.age=52;assert(G.renderReportDialogues(s).includes(s.report.dialogues[0].npc.name+'의 얼굴'));
const x=G.renderNPCDialogue(s,{npc:{...G.data.npcs.friend,name:'<img src=x>'},title:'<script>',text:'<script>alert(1)</script>'});assert(!x.includes('<script>'));assert(x.includes('&lt;script&gt;'));
// Actual turn entry now produces transition events and never consumes a second year resolving them.
s=state('transition');s.report=null;G.playTurn(s,{path:'university',field:'science',course:'focus'},()=>0);assert.equal(s.pendingEvent,'campusQuestion');assert.equal(s.turn,12);assert.equal(s.career.programYear,1);G.resolveEventChoice(s,0);assert.equal(s.turn,13);assert.equal(s.career.programYear,1);
console.log('PASS: 모든 일반 사건 NPC·대사·응답, 진로 5개 대화 사건, 상황별 인물, 선택 전후 저장, 턴 중복 방지, 초상화·한국어·이스케이프');
