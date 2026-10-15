(() => {const G=Game;
G.getAvailableActivities=s=>G.data.activities.filter(a=>G.checkConditions(s,a.conditions));
G.previewYouthBudget=(s,ids)=>{
 let cash=s.allowance;
 for(const id of ids){const a=G.getAvailableActivities(s).find(x=>x.id===id);if(!a)return {ok:false,cash,message:'지금 선택할 수 없는 활동이에요.'};const change=a.effects.allowance||0;if(cash+change<0)return {ok:false,cash,message:`${a.name}에 쓸 용돈이 부족해요. 앞에 아르바이트를 고르거나 무료 활동을 선택해 주세요.`};cash+=change;}
 return {ok:true,cash,message:''};
};
G.applyActivity=(s,id)=>{
 const a=G.getAvailableActivities(s).find(a=>a.id===id);
 if(!a)throw Error('지금 선택할 수 없는 활동이에요.');
 if(s.allowance+(a.effects.allowance||0)<0)throw Error('용돈이 부족해요. 먼저 돈을 모아 주세요.');
 const changes=G.applyEffects(s,a.effects,{activity:id});s.counts[id]=(s.counts[id]||0)+1;
 G.recordHistory(s,'activity',a.name,a.description,{activity:id});return changes;
};
G.systems.youth=(s,ids)=>{
 if(!Array.isArray(ids)||ids.length!==2)throw Error('활동 두 개를 골라 주세요.');
 const budget=G.previewYouthBudget(s,ids);if(!budget.ok)throw Error(budget.message);
 const changes=ids.flatMap(id=>G.applyActivity(s,id));G.checkUnlocks(s);return changes;
};
})();
