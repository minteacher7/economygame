(() => {
const G=Game;
G.get=(s,path)=>path.split('.').reduce((o,k)=>o?.[k],s);
G.checkConditions=(s,c={})=>Object.entries(c).every(([path,rule])=>{const v=G.get(s,path);return typeof rule==='object'&&rule!==null ? (rule.min===undefined||v>=rule.min)&&(rule.max===undefined||v<=rule.max)&&(rule.eq===undefined||v===rule.eq)&&(rule.not===undefined||v!==rule.not):v===rule;});
G.calculateModifiers=(s,path,context={})=>{
 if(context.initial)return 1;
 let m=1;
 if(path==='status.fatigue')return G.fitnessFatigueRate(s);
 if(path.startsWith('stats.')||path.startsWith('experience.'))m*=G.fatigueGrowthRate(s);
 if(path.startsWith('stats.')){const v=G.get(s,path);m*=v<70?1:v<85?.8:v<95?.6:.3;if(context.activity)m*=Math.max(.45,1-(s.counts[context.activity]||0)*.06);}
 const talent=G.data.talents.find(x=>x.id===s.character.talent),background=G.data.backgrounds.find(x=>x.id===s.character.background);
 return m*Math.min(1.25,(talent?.growthModifiers?.[path]||1)*(background?.growthModifiers?.[path]||1));
};
G.applyEffects=(s,effects={},context={})=>{const changes=[];const modifierState={...s,status:{...s.status}};Object.entries(effects).forEach(([path,amount])=>{const parts=path.split('.'),key=parts.pop(),obj=parts.reduce((o,k)=>o[k],s);const before=obj[key]||0;if(typeof amount!=='number'){obj[key]=amount;return;}let delta=amount>0?amount*G.calculateModifiers(modifierState,path,context):amount;let after=Math.round((before+delta)*10)/10;if(path.startsWith('stats.')||path.startsWith('status.'))after=Math.max(0,Math.min(100,after));else {if(path==='finance.cash'&&after<0)s.finance.debt+=-after;after=Math.max(0,after);}obj[key]=after;if(after!==before)changes.push({label:path==='business.cash'?'기업 현금':G.labels[key]||'새로운 변화',delta:Math.round((after-before)*10)/10});});return changes;};
G.processDelayedEffects=s=>{
 const due=s.delayed.filter(d=>d.turn<=s.turn);s.delayed=s.delayed.filter(d=>d.turn>s.turn);
 return due.flatMap(d=>{
  const active=!!s.business&&(!d.businessId||d.businessId===s.business.instanceId);
  const effects=Object.fromEntries(Object.entries(d.effects).filter(([path])=>!path.startsWith('business.')||active));
  if(!Object.keys(effects).length){G.recordHistory(s,'delayed','마무리한 기업의 예정 거래','기업을 정리했으므로 이전 기업의 예정 거래도 마무리했어요.');return [];}
  G.recordHistory(s,'delayed',d.title,'과거 선택의 효과가 나타났어요.');return G.applyEffects(s,effects);
 });
};
G.checkUnlocks=s=>{const items=G.data.events.filter(e=>e.category==='opportunity'&&G.checkConditions(s,e.conditions));s.unlocks=items.map(e=>e.id);return items;};
})();
