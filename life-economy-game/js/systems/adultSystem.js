(() => {const G=Game;
G.data.workActions=[{id:'steady',name:'꾸준히 일하기',description:'맡은 일에 집중해요. 수입이 조금 늘고 피로가 쌓여요.',effects:{'experience.economic':3,'stats.persistence':2,'status.fatigue':8},income:1.06},{id:'learn',name:'전문성 키우기',description:'배움에 시간을 써요. 올해 수입은 조금 줄어요.',effects:{'experience.technical':5,'stats.learning':3,'status.fatigue':6},income:.95},{id:'lead',name:'동료와 협력하기',description:'사람을 돕고 협력하는 힘을 길러요.',effects:{'experience.people':5,'stats.social':3,'status.relationships':3,'status.fatigue':9},income:1},{id:'balance',name:'일과 쉼 조절하기',description:'근무를 줄여 건강을 돌봐요. 수입은 줄어요.',effects:{'status.fatigue':-12,'status.health':5},income:.85}];
G.data.lifeActions=[{id:'family',name:'소중한 사람과 시간',description:'100만 원 · 관계와 행복을 돌봐요.',cost:100,effects:{'status.relationships':7,'status.happiness':5,'status.fatigue':-5}},{id:'health',name:'운동과 충분한 쉼',description:'80만 원 · 건강을 회복해요.',cost:80,effects:{'status.health':7,'status.fatigue':-18,'stats.fitness':2}},{id:'save',name:'알뜰한 생활',description:'돈 관리 습관을 쌓고 100만 원을 아껴요. 즐길 일은 줄어요.',effects:{'finance.cash':100,'experience.moneyHabit':5,'status.happiness':-2,'status.fatigue':-6}},{id:'community',name:'지역사회 참여',description:'70만 원 · 이웃을 돕고 관계를 넓혀요.',cost:70,effects:{'experience.service':6,'status.relationships':5,'status.happiness':3,'status.fatigue':-3}},{id:'hobby',name:'나만의 취미',description:'120만 원 · 창작과 즐거움을 누려요.',cost:120,effects:{'stats.creativity':3,'status.happiness':8,'status.fatigue':-10}}];
G.data.lifeActions.push({id:'parenting',name:'육아에 시간 쓰기',description:'40만 원 · 아이와 놀고 배우며 행복과 관계가 자라요. 돌봄에는 체력이 들어요.',cost:40,effects:{'status.happiness':7,'status.relationships':5,'status.fatigue':4}});
G.data.breakActions=[
 {id:'retrain',name:'다시 배우기',description:'수입 없이 전문기술을 배워요. 생활비는 모아 둔 돈에서 나가요.',effects:{'experience.technical':7,'experience.careerExploration':4,'status.fatigue':2},income:0},
 {id:'recover',name:'쉬며 방향 찾기',description:'수입 없이 건강과 마음을 돌봐요. 생활비를 확인해 주세요.',effects:{'status.health':10,'status.fatigue':-20,'status.happiness':5},income:0},
 {id:'shortWork',name:'단기 일로 재출발',description:'연 1,400만 원 정도를 벌며 다음 일을 찾아요. 안정된 직장보다는 수입이 적어요.',effects:{'experience.economic':4,'experience.adaptability':3,'status.fatigue':6},income:1400}
];
G.getWorkActions=s=>s.business?G.data.businessActions.filter(a=>a.id!=='delegate'):s.career.job?G.data.workActions:G.data.breakActions;
G.systems.adult=(s,workId,lifeId,rng=Math.random)=>{
 const work=G.getWorkActions(s).find(a=>a.id===workId),life=G.getLifeActivities(s).find(a=>a.id===lifeId);
 if(!life||!work)throw Error('올해의 일과 생활 활동을 골라 주세요.');
 let changes=[],income=0;
 if(s.business)income=G.calculateBusinessTurn(s,workId,rng);
 else if(!s.career.job){changes.push(...G.applyEffects(s,work.effects));income=Math.round(work.income*s.economy.index);G.recordHistory(s,'work',work.name,work.description);}
 else{
  changes.push(...G.applyEffects(s,work.effects));
  const job=G.data.jobs.find(j=>j.id===s.career.job),ready=G.jobReadiness(s,job),adapt=Math.min(.06,s.experience.adaptability*.0015);
  const sector=(job.sector==='trade'||job.sector==='technology'?s.economy.trade*.025:0)+(job.sector==='digital'&&s.year>=2012?.05:0);
  income=Math.round(job.baseIncome*(.8+Math.min(ready,120)*.002+s.career.level*.035)*(1+s.economy.growth*.045+s.economy.jobs*.02+sector+adapt)*work.income*Math.pow(s.economy.index,.85)*(s.status.health<30?.85:1));
  changes.push(...G.applyEffects(s,{['experience.'+job.experience]:workId==='learn'?5:2,...(workId==='learn'?{['stats.'+job.stat]:2}:{})}));
  s.report.workedJob=job.id;s.report.workAction=workId;
  G.recordHistory(s,'work',work.name,work.description);
 }
 G.spendHousehold(s,life.cost||0);changes.push(...G.applyEffects(s,life.effects));
 s.report.parenting=lifeId==='parenting';
 if(s.report.parenting){income=Math.round(income*.9);s.report.messages.push('육아 시간을 확보해 내 근로소득은 10%, 배우자 근로소득은 20% 줄었어요. 기업 운영 시 줄인 대표 소득은 기업에 남겨 두어요.');if(s.business&&s.report.business){const retained=s.report.business.salary-income;s.business.cash+=retained;s.report.business.salary=income;s.report.business.cash=Math.round(s.business.cash);s.business.last={...s.report.business};}}
 G.recordHistory(s,'life',life.name,life.description,{activity:lifeId});G.calculateHouseholdFinance(s,income);return changes;
};
G.prepareTurn=s=>{G.ensureFamily(s);if(s.phase==='adult')G.updateEconomy(s);};
G.playTurn=(s,selection,rng=Math.random)=>{
 G.requireOpenTurn(s);
 // A failed combined choice must not charge costs, grant experience or consume the year.
 if(G.needsRecovery(s)&&!selection.recovery)throw Error('피로가 90 이상이에요. 이번에는 회복에 집중해 주세요.');
 const draft=JSON.parse(JSON.stringify(s));G.migrateGame(draft);G.prepareTurn(draft);
 draft.report={year:draft.year,age:draft.age,changes:[],messages:[],tip:''};
 if(G.needsRecovery(draft)){draft.report.changes.push(...G.processRecoveryTurn(draft));G.finishTurn(draft);Object.assign(s,draft);return;}
 if(draft.phase==='youth')draft.report.changes.push(...G.systems.youth(draft,selection.activities));
 if(draft.phase==='transition')draft.report.changes.push(...G.systems.transition(draft,selection.path,selection.field,selection.course||'focus',selection.university||'general'));
 if(draft.phase==='adult'){
  draft.report.changes.push(...G.resolveFamilyAction(draft,selection.family||'none'));
  G.applyInvestment(draft,selection.investment||'none');
  draft.report.changes.push(...G.systems.adult(draft,selection.work,selection.life,rng));
  G.updateInvestments(draft,rng);
 }
 draft.report.changes.push(...G.resolveAnnualEvent(draft,selection.annual||'none',rng));
 G.addActivityDialogue(draft,selection);
 const event=G.selectWeightedEvent(draft,rng);
 if(event){draft.pendingEvent=event.id;G.saveGame(draft);}else G.finishTurn(draft);
 Object.assign(s,draft);
};
G.finishTurn=s=>{
 s.report.changes.push(...G.processDelayedEffects(s));
 if(s.report.business)s.report.business.cash=Math.round(s.business?.cash||0);
 if(s.phase==='youth'){
  s.report.changes.push(...G.applyEffects(s,{allowance:2}));
  s.report.messages.push('다음 학기를 위한 정기 용돈 2천 원을 받았어요.');
 }
 if(s.phase==='adult')s.report.changes.push(...G.processFamilyYear(s));
 const fatigue=s.status.fatigue;
 s.report.changes.push(...G.applyEffects(s,{'status.fatigue':-5,'status.health':fatigue>75?-7:fatigue>55?-3:0,'status.happiness':fatigue>75?-4:0}));
 if(fatigue>55)s.report.messages.push('피로가 쌓여 건강이 줄었어요. 다음에는 쉬는 시간을 챙겨 보세요.');
 if(s.report.workedJob&&s.career.job===s.report.workedJob&&!s.business){const growth=G.calculateJobGrowth(s,s.report.workAction);if(growth)s.report.messages.push(growth);}
 G.checkGoalMilestones(s);
 G.recordHistory(s,'turn','이번 시간을 마쳤어요','선택들이 나의 삶에 쌓였어요.',{snapshot:{health:s.status.health,happiness:s.status.happiness,cash:s.finance.cash,debt:s.finance.debt,businessCash:s.business?.cash||0}});
 s.turn++;
 if(s.turn>=46){s.phase='ending';s.year=2026;s.age=52;}
 else if(s.turn<12){s.phase='youth';s.year=1987+Math.floor(s.turn/2);s.age=13+Math.floor(s.turn/2);s.semester=s.turn%2+1;}
 else if(s.turn<16){s.phase='transition';s.year=1993+s.turn-12;s.age=19+s.turn-12;}
 else{s.phase='adult';s.year=1997+s.turn-16;s.age=23+s.turn-16;}
 G.ensureFamily(s);G.saveGame(s);
};
G.continueTurn=s=>{s.report=null;G.prepareTurn(s);G.saveGame(s);};
})();
