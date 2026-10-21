(() => {const G=Game;
G.getFamilyCosts=s=>{
 const children=s.family.children.map(c=>({age:Math.max(0,s.year-c.birthYear),birthYear:c.birthYear}));
 const spouse=s.family.married?280:0;
 const childcare=children.reduce((sum,c)=>sum+(c.age<6?360:c.age<13?280:c.age<19?320:0),0);
 return {spouse:Math.round(spouse*s.economy.index),children:Math.round(childcare*s.economy.index),total:Math.round((spouse+childcare)*s.economy.index),ages:children.map(c=>c.age)};
};
G.canChooseFamilyAction=(s,action)=>s.phase==='adult'&&G.checkConditions(s,action.conditions)&&(action.id!=='birth'||s.family.children.length<2);
G.resolveFamilyAction=(s,id='none')=>{
 const action=G.data.familyActions.find(a=>a.id===(id||'none'));
 if(!action||!G.canChooseFamilyAction(s,action))throw Error('지금 선택할 수 없는 가족 계획이에요. 결혼은 관계 45 이상, 자녀는 이번 버전에서 두 명까지 맞이할 수 있어요.');
 if(action.id==='none')return [];
 const cost=Math.round(action.cost*s.economy.index);
 if(s.finance.cash<cost)throw Error('가족 계획의 준비 비용이 부족해요. 먼저 가계 현금을 모아 주세요.');
 const changes=G.applyEffects(s,{'finance.cash':-cost,...action.effects});
 if(action.id==='marry'){s.family.married=true;s.family.marriedYear=s.year;}
 if(action.id==='birth')s.family.children.push({birthYear:s.year});
 s.report.familyAction={name:action.name,cost};
 G.recordHistory(s,'milestone',action.id==='marry'?'함께 살아갈 동반자를 맞았어요':'우리 가족에 아이가 찾아왔어요',`${action.name} 준비에 ${cost.toLocaleString('ko-KR')}만 원을 썼어요. 새로운 일상을 함께 만들어 가요.`);
 s.report.messages.push(`${action.name}: 준비 비용 ${cost.toLocaleString('ko-KR')}만 원을 썼어요. 올해부터 가족 추가 생활비도 반영돼요.`);
 return changes;
};
G.getLifeActivities=(s,plan='none')=>G.data.lifeActions.filter(a=>a.id!=='parenting'||s.family.children.some(c=>s.year-c.birthYear<19)||(plan==='birth'&&s.family.children.length<2));
G.processFamilyYear=s=>{
 const ages=G.getFamilyCosts(s).ages,dependent=ages.filter(age=>age<19),small=ages.filter(age=>age<6);
 const changes=G.applyEffects(s,{'status.happiness':(s.family.married?1:0)+dependent.length,'status.fatigue':small.length*2+(dependent.length-small.length)});
 if(ages.includes(6)||ages.includes(13)||ages.includes(19)){
  const message=ages.includes(19)?'자녀가 성인이 되어 기본 양육비 부담이 줄었어요.':ages.includes(6)?'아이가 학교생활을 시작하며 돌봄 비용도 달라졌어요.':'자녀가 청소년이 되어 배움과 생활의 비용이 달라졌어요.';
  G.recordHistory(s,'milestone','가족도 함께 성장해요',message);s.report.messages.push(message);
 }
 return changes;
};
})();
