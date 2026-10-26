require('./playthrough.cjs');
const assert=require('assert');const G=Game;
function adult(){const s=G.createNewCharacter(()=>.4);Object.assign(s,{phase:'adult',turn:16,year:1997,age:23});s.finance.cash=10000;G.prepareTurn(s);G.chooseJob(s,'teacher');return s;}
function finish(s){if(s.pendingEvent)G.resolveEventChoice(s,1);G.continueTurn(s);}
let s=adult();const initialCash=s.finance.cash;const cost=Math.round(300*s.economy.index);
G.playTurn(s,{work:'balance',life:'health',family:'marry'},()=>.99);
assert(s.family.married);assert.equal(s.finance.last.familyLiving,Math.round(280*s.economy.index));assert.equal(s.report.familyAction.cost,cost);assert(s.history.some(h=>h.title==='함께 살아갈 동반자를 맞았어요'));finish(s);
const marriedSave=JSON.stringify(s);assert.throws(()=>G.playTurn(s,{work:'balance',life:'health',family:'marry'},()=>.99),/가족 계획/);assert.equal(JSON.stringify(s),marriedSave);
G.playTurn(s,{work:'balance',life:'parenting',family:'birth'},()=>.99);
assert.equal(s.family.children.length,1);assert.equal(s.family.children[0].birthYear,1998);assert.equal(s.finance.last.familyLiving,Math.round(640*s.economy.index));assert(s.report.changes.some(c=>c.label==='행복'&&c.delta>0));finish(s);
G.saveGame(s);assert.deepEqual(G.loadGame().family,s.family);
// Child stages are derived from years, not incremented repeatedly on render or load.
s.economy.index=1;s.year=2004;assert.equal(G.getFamilyCosts(s).total,560);s.year=2011;assert.equal(G.getFamilyCosts(s).total,600);s.year=2017;assert.equal(G.getFamilyCosts(s).total,280);assert(!G.getLifeActivities(s).some(a=>a.id==='parenting'));
// Independent family choice and affordability; neither gender nor marriage is required for parenthood.
s=adult();s.finance.cash=0;const poor=JSON.stringify(s);assert.throws(()=>G.playTurn(s,{work:'steady',life:'health',family:'birth'},()=>.99),/준비 비용/);assert.equal(JSON.stringify(s),poor);
s=adult();G.playTurn(s,{work:'steady',life:'parenting',family:'birth'},()=>.99);assert(!s.family.married&&s.family.children.length===1);finish(s);
G.playTurn(s,{work:'steady',life:'parenting',family:'birth'},()=>.99);finish(s);assert.throws(()=>G.playTurn(s,{work:'steady',life:'parenting',family:'birth'},()=>.99),/두 명/);
// Real university gate and matching help use exactly the same requirements.
s=G.createNewCharacter();Object.assign(s,{phase:'transition',turn:12,year:1993,age:19});s.stats.learning=54.9;s.stats.persistence=45;
assert(!G.getCourseRequirements(s,G.data.universityCourses[1])[0].met);
assert.throws(()=>G.playTurn(s,{path:'university',field:'science',university:'research',course:'focus'},()=>.99),/준비 조건/);
s.stats.learning=55;G.playTurn(s,{path:'university',field:'science',university:'research',course:'focus'},()=>.99);assert.equal(s.career.universityCourse,'research');finish(s);
G.playTurn(s,{course:'focus'},()=>.99);assert.equal(s.career.universityCourse,'research');assert.equal(s.career.programYear,2);
// Annual promotion: exact checks are performed after the whole year's choices and fatigue recovery.
s=adult();s.career.years=2;s.career.nextReview=3;s.stats.learning=55;s.experience.academic=18;s.status.health=60;s.status.fatigue=10;
const goal=G.getGoals(s,{work:'learn'}).find(g=>g.id==='promotion');assert.equal(goal.deadline,'올해 말 심사');assert(goal.requirements.every(r=>r.met));
G.playTurn(s,{work:'learn',life:'health'},()=>.99);assert.equal(s.career.level,1);assert.equal(s.career.nextReview,6);finish(s);
s=adult();s.career.years=2;s.career.nextReview=3;s.stats.learning=55;s.experience.academic=18;s.status.health=10;s.status.fatigue=0;
G.playTurn(s,{work:'steady',life:'health'},()=>.99);assert.equal(s.career.level,0);assert.equal(s.career.nextReview,4);assert(s.report.messages.some(m=>m.includes('건강 40 이상')));finish(s);
s.status.health=50;G.playTurn(s,{work:'learn',life:'health'},()=>.99);assert.equal(s.career.level,1);
// Goal accomplishment is recorded once, and older saves get safe family defaults.
s=G.createNewCharacter();s.goals.jobTarget='teacher';s.stats.learning=55;s.experience.academic=18;s.report={messages:[]};G.checkGoalMilestones(s);G.checkGoalMilestones(s);assert.equal(s.history.filter(h=>h.type==='goal').length,1);
delete s.family;delete s.goals;const oldCash=s.finance.cash;G.migrateGame(s);assert.deepEqual(s.family.children,[]);assert.equal(s.finance.cash,oldCash);
// A family playthrough reaches 52, with child adulthood recorded and no invalid numbers.
s=adult();let familyYears=0;
while(s.phase!=='ending'){
 G.playTurn(s,{work:s.status.fatigue>55?'balance':'learn',life:s.status.health<60?'health':s.family.children.some(c=>s.year-c.birthYear<19)?'parenting':'family',family:s.age===23?'marry':s.age===25?'birth':'none'},()=>.8);
 if(s.pendingEvent)G.resolveEventChoice(s,1);assert(Number.isFinite(s.finance.cash));assert(Number.isFinite(s.finance.last.familyLiving));familyYears++;G.continueTurn(s);
}
assert.equal(familyYears,30);assert(s.history.some(h=>h.description.includes('자녀가 성인이')));assert.equal(G.calculateEnding(s).results.length,6);
console.log('PASS: 결혼·출산·육아 비용/효과, 자녀 성장, 조건·중복·자금 검증, 저장 호환, 대학 과정 조건, 성장 심사 성공/보류/재도전, 목표 중복 방지, 가족 경로 52세 완주');
