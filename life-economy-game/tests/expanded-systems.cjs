require('./playthrough.cjs');
const assert=require('assert');const G=Game;
function character(){const s=G.createNewCharacter(()=>.4);Object.assign(s.character,{familyName:'이',givenName:'새봄',gender:'male'});return s;}
function adult(){const s=character();Object.assign(s,{phase:'adult',turn:16,year:1997,age:23});s.finance.cash=6000;s.experience.economic=20;G.prepareTurn(s);return s;}
function settle(s){if(s.pendingEvent)G.resolveEventChoice(s,1);G.continueTurn(s);}
// Insufficient youth funds reject the whole turn, including earlier activity growth.
let s=character();s.allowance=0;const original=JSON.stringify(s);
assert.throws(()=>G.playTurn(s,{activities:['study','create']},()=>.99),/용돈/);assert.equal(JSON.stringify(s),original);
s.age=16;G.playTurn(s,{activities:['parttime','create']},()=>.99);assert.equal(s.allowance,7);
s=character();Object.assign(s,{age:16,allowance:0});assert.throws(()=>G.playTurn(s,{activities:['create','parttime']},()=>.99),/용돈/);
// No forced paid activities before part-time work unlocks.
s=character();for(let i=0;i<6;i++){G.playTurn(s,{activities:['study','rest']},()=>.99);settle(s);}assert.equal(s.allowance,18);
// All programs advance within the original path and university graduates only after four years.
for(const path of G.data.paths){s=character();Object.assign(s,{phase:'transition',turn:12,age:19,year:1993});s.experience.economic=20;
 for(let year=0;year<4;year++){G.playTurn(s,{path:year?undefined:path.id,field:'digital',course:'practice'},()=>.99);assert.equal(s.career.programYear,year+1);assert.equal(s.career.path,path.id);settle(s);}
 assert.equal(s.phase,'adult');assert.equal(s.career.completedPath,path.id);
}
s=character();Object.assign(s,{phase:'transition',turn:12,age:19,year:1993});G.playTurn(s,{path:'university',field:'digital',course:'focus'},()=>.99);settle(s);
assert.throws(()=>G.playTurn(s,{path:'technical',course:'focus'},()=>.99),/過程|과정/);G.leaveProgram(s);G.playTurn(s,{path:'technical',course:'support'},()=>.99);settle(s);assert.equal(s.career.programYear,1);
// Annual choices charge once, preserve base rewards even without recognition, and are recorded.
s=character();Object.assign(s,{semester:2,turn:1,allowance:8});G.playTurn(s,{activities:['study','rest'],annual:'olympiad'},()=>.99);assert.equal(s.annualYear,1987);assert(s.history.some(h=>h.type==='annual'&&!h.success));assert.equal(s.allowance,8);
s=character();assert.throws(()=>G.playTurn(s,{activities:['study','rest'],annual:'olympiad'},()=>.99),/행사/);
// Investment purchases and sales do not use company money, and invalid purchases are atomic.
s=adult();G.chooseJob(s,'teacher');s.report={messages:[]};const cash=s.finance.cash;G.applyInvestment(s,'buyStocks');assert.equal(s.finance.cash,cash-505);assert.equal(s.finance.investments.stocks,500);G.applyInvestment(s,'sellStocks');assert.equal(s.finance.investments.stocks,0);assert.equal(s.finance.cash,cash-10);
s.report=null;s.finance.cash=1200;const poor=JSON.stringify(s);assert.throws(()=>G.playTurn(s,{work:'steady',life:'health',investment:'buyProperty'},()=>.5),/현금/);assert.equal(JSON.stringify(s),poor);
s=adult();s.report={messages:[]};s.finance.investments={stocks:1000,property:3000};G.updateInvestments(s,()=>0);const assets=JSON.stringify(s.finance.investments);G.updateInvestments(s,()=>1);assert.equal(JSON.stringify(s.finance.investments),assets);assert(s.report.investments.rates.stocks>=-.06&&s.report.investments.rates.stocks<=.045);
// Career exit and return restore job-specific progression, even after entrepreneurship.
s=adult();G.chooseJob(s,'teacher');s.career.level=3;s.career.years=9;G.quitJob(s);assert.equal(s.career.job,null);G.chooseJob(s,'teacher');assert.equal(s.career.level,3);G.startBusiness(s,'learningCare');const funds=s.finance.cash,company=s.business.cash;G.closeBusiness(s);assert.equal(s.finance.cash,funds+company-120);G.chooseJob(s,'teacher');assert.equal(s.career.level,3);assert(!G.canStartBusiness(s));
G.quitJob(s);G.playTurn(s,{work:'recover',life:'health'},()=>.99);assert.equal(s.finance.last.income,0);settle(s);
// Loading an old save preserves cash, restores a course and adds portfolio / business metadata once.
s=character();delete s.balanceRevision;delete s.finance.investments;delete s.career.records;delete s.career.programYear;Object.assign(s,{phase:'transition',turn:14,age:21,year:1995});s.career.path='technical';s.history.push({type:'career',title:'대학교 진학'});const oldCash=s.finance.cash;G.migrateGame(s);assert.equal(s.career.path,'university');assert.equal(s.career.programYear,2);assert.equal(s.finance.cash,oldCash);const migrated=JSON.stringify(s);G.migrateGame(s);assert.equal(JSON.stringify(s),migrated);
// Endings also work without a current job.
s=adult();s.phase='ending';assert.equal(G.calculateEnding(s).results.length,6);
console.log('PASS: 용돈 거래 원자성, 5개 진로 4년 과정, 중도 전환, 연간 행사, 투자 비용·손실·중복 방지, 퇴사·폐업·복귀, 이전 저장 이전');
// Balance audit: 6 sectors × 4 policies × 5 seeds, with real historic years.
const audit=[];
for(const sector of G.data.businessSectors)for(let policy=0;policy<4;policy++)for(let seed=1;seed<=5;seed++){
 let n=seed;const rng=()=>{n=(n*1664525+1013904223)>>>0;return n/4294967296;};
 s=adult();G.chooseJob(s,'logistics');G.startBusiness(s,sector.id);let minimum=s.finance.cash,closed=false,at42=null;
 while(s.phase!=='ending'){
  const work=s.business?G.data.businessActions[policy].id:'shortWork';
  G.playTurn(s,{work,life:s.status.health<65?'health':'family',annual:s.year%3===0?'conference':'none'},rng);
  if(s.pendingEvent)G.resolveEventChoice(s,1);
  minimum=Math.min(minimum,s.finance.cash);if(!s.business)closed=true;
  if(s.report.age===42)at42={household:Math.round(s.finance.cash),business:Math.round(s.business?.cash||0)};
  G.continueTurn(s);
 }
 assert(Number.isFinite(s.finance.cash));assert(Number.isFinite(s.finance.debt));assert(s.finance.cash>=0);
 audit.push({sector:sector.name,policy:G.data.businessActions[policy].name,seed,minimum:Math.round(minimum),cash:Math.round(s.finance.cash),company:Math.round(s.business?.cash||0),debt:Math.round(s.finance.debt),closed,at42});
}
const summary={runs:audit.length,closures:audit.filter(a=>a.closed).length,householdDepleted:audit.filter(a=>a.minimum===0).length,age42HouseholdRange:[Math.min(...audit.map(a=>a.at42.household)),Math.max(...audit.map(a=>a.at42.household))],age42CompanyRange:[Math.min(...audit.map(a=>a.at42.business)),Math.max(...audit.map(a=>a.at42.business))],finalHouseholdRange:[Math.min(...audit.map(a=>a.cash)),Math.max(...audit.map(a=>a.cash))]};
console.log(JSON.stringify(summary));
assert.equal(summary.closures,0);assert.equal(summary.householdDepleted,0);
require('fs').writeFileSync('tests/balance-results.json',JSON.stringify({summary,runs:audit},null,2));
// Closing a company cancels its own delayed orders, including when another company opens later.
s=adult();G.startBusiness(s,'distribution');const oldBusiness=s.business.instanceId;
s.delayed.push({turn:s.turn+1,title:'이전 기업의 거래',businessId:oldBusiness,effects:{'business.cash':450}});G.closeBusiness(s);s.turn++;G.startBusiness(s,'localShop');const beforeOrder=s.business.cash;G.processDelayedEffects(s);assert.equal(s.business.cash,beforeOrder);
s.delayed.push({turn:s.turn,title:'저장된 오래된 거래',effects:{'business.cash':450}});G.closeBusiness(s);assert.doesNotThrow(()=>G.processDelayedEffects(s));
// Lowest start-up capital, modest skills, annual fees, repeated new-market investment, harsh luck.
s=adult();s.finance.cash=2500;for(const k of Object.keys(s.stats))s.stats[k]=35;s.experience.economic=12;G.startBusiness(s,'creativeStudio');
let lowCapitalMinimum=s.finance.cash;
while(s.phase!=='ending'){G.playTurn(s,{work:'expand',life:'health',annual:'conference'},()=>.01);if(s.pendingEvent)G.resolveEventChoice(s,0);lowCapitalMinimum=Math.min(lowCapitalMinimum,s.finance.cash);G.continueTurn(s);}
assert(s.business);assert(lowCapitalMinimum>0);assert.equal(s.finance.debt,0);console.log('PASS: 폐업 후 지연 거래 격리, 최소 창업자금 스트레스 경로 / 최소 가계 현금 '+Math.round(lowCapitalMinimum)+'만 원');
