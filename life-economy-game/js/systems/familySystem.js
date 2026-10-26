(() => {const G=Game;
G.ensureFamily=s=>{
 s.family??={married:false,marriedYear:null,children:[]};
 if(s.family.married&&!s.family.spouse)s.family.spouse={gender:s.character.gender==='male'?'female':'male',appearance:((s.character.appearance||0)+2)%5,birthYear:1987-13};
 s.family.children.forEach((c,i)=>{c.portrait??=i%2;});
 s.family.youngestAge=s.family.children.length?Math.max(0,s.year-Math.max(...s.family.children.map(c=>c.birthYear))):-1;
};
G.getSpouseIncome=(s,parenting=false)=>{
 if(!s.family.married)return 0;
 const young=s.family.children.some(c=>s.year-c.birthYear<6);
 return Math.round(1800*Math.pow(s.economy.index,.85)*(1+s.economy.growth*.035+s.economy.jobs*.02)*(parenting?.8:young?.9:1));
};
G.familyMoment=(s,title,dialogue,speaker='spouse')=>{
 s.report.familyMoment={title,dialogue,speaker,scene:0};
};
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
 if(action.id==='marry'){s.family.married=true;s.family.marriedYear=s.year;G.ensureFamily(s);G.familyMoment(s,'두 사람이 만드는 첫 일상','우리, 일도 집안일도 함께 나누면서 살아가자.');}
 if(action.id==='birth'){s.family.children.push({birthYear:s.year,portrait:s.family.children.length%2});G.familyMoment(s,'처음 마주한 작은 얼굴','작은 손을 쥐자, 앞으로 함께할 하루들이 떠올랐어요.','child');}G.ensureFamily(s);
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
  G.familyMoment(s,'가족도 함께 성장해요',ages.includes(19)?'이제 나도 내 하루를 꾸려 볼게. 늘 응원해 줘서 고마워.':ages.includes(6)?'처음 가는 학교라 떨려. 내 이야기 들어 줄 거지?':'내가 좋아하는 것을 조금씩 찾아보고 싶어.','child');s.report.familyMoment.childIndex=ages.indexOf(ages.includes(19)?19:ages.includes(6)?6:13);G.recordHistory(s,'milestone','가족도 함께 성장해요',message);s.report.messages.push(message);
 }
 return changes;
};
})();
