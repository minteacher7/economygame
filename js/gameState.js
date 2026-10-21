'use strict';
window.Game = { data: {}, systems: {}, version: 1 };
(() => {
const G = Game;
G.labels = {learning:'학습력',creativity:'창의력',fitness:'체력',social:'사회성',persistence:'끈기',economySense:'경제감각',health:'건강',happiness:'행복',fatigue:'피로',relationships:'관계',allowance:'용돈',cash:'가계 현금',debt:'가계 빚',academic:'학업 경험',creative:'창작 경험',technical:'기술 경험',people:'협력 경험',economic:'경제 경험',service:'나눔 경험',careerExploration:'진로 탐색 경험',business:'창업 경험',moneyHabit:'돈 관리 습관',adaptability:'변화 적응 경험',quality:'제품 품질',reputation:'기업 신뢰',safety:'일터 안전',morale:'직원 만족',employees:'직원 수',wage:'직원 임금'};
G.characterName = s => [s.character.familyName, s.character.givenName]
 .filter(v => typeof v === 'string').map(v => v.trim()).join('') || '나';
G.createNewCharacter = (rng=Math.random) => {
 const pick = a => a[Math.floor(rng()*a.length)];
 const character={talent:pick(G.data.talents).id,trait:pick(G.data.traits).id,background:pick(G.data.backgrounds).id};
 const s={version:1,balanceRevision:2,annualYear:null,family:{married:false,marriedYear:null,children:[]},goals:{courseTarget:'',jobTarget:'',completed:{}},phase:'youth',turn:0,year:1987,age:13,semester:1,character,stats:Object.fromEntries(['learning','creativity','fitness','social','persistence','economySense'].map(k=>[k,35+Math.floor(rng()*21)])),status:{health:75,happiness:65,fatigue:10,relationships:55},allowance:6,experience:Object.fromEntries(['academic','creative','technical','people','economic','service','careerExploration','business','moneyHabit','adaptability'].map(k=>[k,0])),finance:{cash:100,debt:0,last:null,investments:{stocks:0,property:0},investmentYear:null},career:{path:null,field:null,job:null,level:0,track:'expert',years:0,programYear:0,records:{},previousJob:null,businessClosedTurn:-1},business:null,economy:{growth:0,jobs:0,prices:0,trade:0,index:1},flags:{},counts:{},cooldowns:{},delayed:[],history:[],pendingEvent:null,report:null,preparedTurn:-1,unlocks:[]};
 [G.data.talents,G.data.traits,G.data.backgrounds].forEach((a,i)=>G.applyEffects(s,a.find(x=>x.id===character[['talent','trait','background'][i]]).effects,{initial:true}));
 return s;
};
G.recordHistory=(s,type,title,description='',extra={})=>s.history.push({turn:s.turn,year:s.year,age:s.age,type,title,description,...extra});
G.validateIdentity=character=>{
 const c=character.character;
 if(typeof c.familyName!=='string'||!c.familyName.trim())throw Error('성을 입력해 주세요.');
 if(typeof c.givenName!=='string'||!c.givenName.trim())throw Error('이름을 입력해 주세요.');
 if(!['male','female'].includes(c.gender))throw Error('성별을 선택해 주세요.');
};
G.startNewGame=character=>{G.validateIdentity(character);G.state=character;G.recordHistory(character,'milestone','나의 이야기가 시작되었어요','열세 살, 앞으로 어떤 삶을 만들어 갈까요?');G.saveGame(character);return character;};
G.saveGame=s=>{try{localStorage.setItem('life-economy-save',JSON.stringify(s));G.storageWarning='';return true;}catch(e){G.storageWarning='이 브라우저에서 저장할 수 없어요. 창을 닫으면 진행이 사라질 수 있어요.';return false;}};
G.migrateGame=s=>{
 s.family??={married:false,marriedYear:null,children:[]};s.goals??={courseTarget:'',jobTarget:'',completed:{}};s.goals.completed??={};
 s.finance.investments??={stocks:0,property:0};s.finance.investmentYear??=null;
 s.career.records??={};s.career.previousJob??=null;s.career.businessClosedTurn??=-1;s.annualYear??=null;
 if(s.balanceRevision!==2){
  if(s.phase==='transition'&&s.career.path){
   const first=s.history.find(h=>h.type==='career');
   const original=G.data.paths.find(p=>p.name===first?.title);
   if(original)s.career.path=original.id;
   if(s.career.path==='university'&&!s.career.field)s.career.field='education';
  }
  s.career.programYear=s.career.path?Math.max(0,Math.min(4,s.turn-12)):0;
  if(s.business){
   s.business.sector??='distribution';s.business.instanceId??='legacy-business';s.business.wage=750;s.business.employees=1;
   if(s.career.job){s.career.records[s.career.job]={level:s.career.level,years:s.career.years,track:s.career.track};s.career.previousJob=s.career.job;s.career.job=null;}
   s.delayed.forEach(d=>{if(Object.keys(d.effects).some(k=>k.startsWith('business.')))d.businessId=s.business.instanceId;});
  }
  s.balanceRevision=2;
 }
 if(s.career.path==='university')s.career.universityCourse??='general';
 s.character.appearance=Number.isInteger(s.character.appearance)&&s.character.appearance>=0&&s.character.appearance<5?s.character.appearance:0;
 s.career.programYear??=0;
 return s;
};
G.loadGame=()=>{try{const s=JSON.parse(localStorage.getItem('life-economy-save'));if(!s||s.version!==1||!['youth','transition','adult','ending'].includes(s.phase)||!Number.isInteger(s.turn)||s.turn<0||s.turn>46||!s.stats||!Array.isArray(s.history)||!s.finance||!s.career||!s.status||!s.experience||!s.character||!s.counts||!s.cooldowns||!s.economy||!Array.isArray(s.delayed)||!s.flags) return null;return G.migrateGame(s);}catch(e){return null;}};
})();
