require('./ui-smoke.cjs');
const fs=require('fs'),vm=require('vm'),assert=require('assert');const G=Game,handlers={};
document.addEventListener=(k,fn)=>handlers[k]=fn;document.querySelector=()=>({focus(){}});window.scrollTo=()=>{};
for(const id of ['annual-choice','investment-choice'])document.getElementById(id).focus=()=>{};
const s=G.createNewCharacter();Object.assign(s,{phase:'adult',turn:16,year:1997,age:23});Object.assign(s.character,{familyName:'김',givenName:'지우',gender:'female'});s.finance.cash=8000;s.experience.economic=20;G.state=s;G.ui.screen='game';G.ui.selection=G.freshSelection();G.prepareTurn(s);
vm.runInThisContext(fs.readFileSync('js/main.js','utf8'));
function click(id,dataset={}){handlers.click({preventDefault(){},target:{closest:()=>({id,dataset,disabled:false})}});assert.equal(G.ui.error,'');}
function select(key,value){handlers.change({target:{dataset:{choice:key},value}});}
function html(){const output=document.getElementById('panel').innerHTML;const text=output.replace(/<[^>]+>/g,'');assert(!/undefined|NaN|steadyBusiness|learningCare|buyStocks|researchFair/.test(text));return output;}
click('',{job:'teacher'});click('business');assert(html().includes('어떤 기업을 만들까'));
click('',{group:'sector',id:'learningCare'});click('confirm-business');assert(s.business);assert(!s.career.job);assert(html().includes('직원·안전 돌보기'));
select('annual','conference');select('investment','buyStocks');assert.equal(G.ui.selection.annual,'conference');assert.equal(G.ui.selection.investment,'buyStocks');
click('',{group:'work',id:'care'});click('',{group:'life',id:'health'});click('play');if(s.pendingEvent)click('',{event:'1'});assert(s.report.investments);assert(s.history.some(h=>h.type==='annual'));assert(html().includes('연말 기업 현금'));click('next');
click('close-business');click('',{job:'teacher'});click('quit-job');assert(html().includes('단기 일로 재출발'));
// The second year shows only course work, never the initial path cards.
const t=G.createNewCharacter();Object.assign(t,{phase:'transition',turn:12,year:1993,age:19});G.state=t;G.ui.selection=G.freshSelection();G.render();click('',{group:'path',id:'university'});click('',{group:'course',id:'practice'});click('play');click('next');const screen=html();assert(screen.includes('2학년'));assert(!screen.includes('data-group="path"'));click('leave-program');assert(html().includes('data-group="path"'));
console.log('PASS: 창업 분야 선택→창업→행사·투자→기업 장부→폐업→재취업→퇴사, 2학년 화면·중도 전환, 한국어 UI');
