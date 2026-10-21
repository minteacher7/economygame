(() => {const G=Game;
G.data.fields=[{id:'education',name:'교육·사회',experience:'people'},{id:'science',name:'과학·연구',experience:'academic'},{id:'digital',name:'IT·기술',experience:'technical'},{id:'culture',name:'문화·디자인',experience:'creative'},{id:'commerce',name:'경영·경제',experience:'economic'},{id:'health',name:'보건·복지',experience:'service'}];
G.spendHousehold=(s,cost)=>{const paid=Math.min(s.finance.cash,cost);s.finance.cash-=paid;s.finance.debt+=cost-paid;};
G.requireOpenTurn=s=>{if(s.report||s.pendingEvent||s.phase==='ending')throw Error('먼저 이번 결과를 확인해 주세요.');};
G.systems.transition=(s,pathId,fieldId,optionId='focus',universityId='general')=>{
 const current=s.career.path;
 if(current&&pathId&&pathId!==current)throw Error('이미 시작한 과정을 이어가고 있어요. 방향을 바꾸려면 과정 그만두기를 선택해 주세요.');
 const path=G.data.paths.find(p=>p.id===(current||pathId));
 if(!path||(!current&&!G.checkConditions(s,path.conditions)))throw Error('진로를 골라 주세요.');
 const field=G.data.fields.find(f=>f.id===(current?s.career.field:fieldId));
 if(path.id==='university'&&!field)throw Error('관심 분야를 골라 주세요.');
 const option=path.options.find(o=>o.id===optionId);if(!option)throw Error('올해 과정 활동을 골라 주세요.');
 const university=path.id==='university'?G.data.universityCourses.find(c=>c.id===(current?(s.career.universityCourse||'general'):universityId)):null;
 if(path.id==='university'&&(!university||(!current&&!G.getCourseRequirements(s,university).every(r=>r.met))))throw Error('이 대학 과정의 준비 조건을 확인해 주세요. 일반 대학 과정은 별도 능력 조건이 없어요.');
 if(!current){if(university)s.career.universityCourse=university.id;s.career.path=path.id;s.career.field=path.id==='university'?field.id:null;s.career.programYear=0;}
 const stage=path.stages[Math.min(3,s.career.programYear)];
 const changes=G.applyEffects(s,path.effects).concat(G.applyEffects(s,option.effects));
 G.spendHousehold(s,path.cost||0);
 if(university)changes.push(...G.applyEffects(s,university.effects));
 if(field)changes.push(...G.applyEffects(s,{['experience.'+field.experience]:5}));
 s.career.programYear++;
 G.recordHistory(s,'career',`${path.name} · ${stage}`,option.name);
 s.report?.messages.push(`${stage}을 마쳤어요. ${option.name}의 경험이 쌓였어요.`);
 if(s.career.programYear===4){s.career.completedPath=path.id;G.recordHistory(s,'milestone',path.id==='university'?'대학교를 졸업했어요':'준비 과정을 마쳤어요',path.name+'에서 쌓은 경험을 다음 일에 활용해요.');}
 return changes;
};
G.leaveProgram=s=>{
 G.requireOpenTurn(s);if(s.phase!=='transition'||!s.career.path)throw Error('진행 중인 과정이 없어요.');
 const path=G.data.paths.find(p=>p.id===s.career.path);
 G.recordHistory(s,'career',`${path.name}을 멈추고 방향을 다시 찾았어요`,'쌓은 경험은 남지만, 새 과정은 첫 단계부터 시작해요. 22세 이후에는 일과 재교육을 통해 계속 배울 수 있어요.');
 s.career.path=null;s.career.field=null;s.career.universityCourse=null;s.career.programYear=0;
};
G.jobReadiness=(s,j)=>j?s.stats[j.stat]*.6+s.experience[j.experience]*1.5+s.experience.careerExploration*.3:0;
G.readinessText=v=>v>=80?'🟢 준비가 잘 되어 있어요':v>=55?'🟡 충분히 도전할 수 있어요':v>=35?'🟠 조금 더 준비하면 좋아요':'⚪ 아직 준비가 더 필요해요';
G.rememberJob=s=>{if(s.career.job)s.career.records[s.career.job]={level:s.career.level,years:s.career.years,track:s.career.track,nextReview:G.getPromotionDue(s)};};
G.chooseJob=(s,id)=>{
 G.requireOpenTurn(s);if(s.phase!=='adult'||s.business)throw Error('기업을 정리한 뒤 직업을 선택해 주세요.');
 const job=G.data.jobs.find(j=>j.id===id);if(!job)throw Error('직업을 골라 주세요.');
 if(s.career.job===id)return;
 G.rememberJob(s);s.career.job=id;Object.assign(s.career,s.career.records[id]||{level:0,years:0,track:'expert',nextReview:3});
 G.recordHistory(s,'milestone',job.name+'에서 새로운 시작',job.description);
};
G.quitJob=s=>{
 G.requireOpenTurn(s);if(s.phase!=='adult'||s.business||!s.career.job)throw Error('지금은 직장을 그만둘 수 없어요.');
 G.rememberJob(s);s.career.previousJob=s.career.job;s.career.job=null;
 G.recordHistory(s,'milestone','직장을 떠나 재정비하기로 했어요','올해는 쉬거나 재교육을 받고, 다시 취업할 수 있어요. 쉬는 동안에도 생활비가 들어요.');
};
G.calculateJobGrowth=(s,action)=>{
 const due=G.getPromotionDue(s);s.career.years++;
 if(action==='learn'||action==='lead')s.career.track=action==='lead'?'management':'expert';
 if(s.career.years<due)return '';
 const requirements=G.getPromotionRequirements(s);
 const missing=requirements.filter(r=>!r.met);
 if(!missing.length){
  s.career.level++;s.career.nextReview=s.career.years+3;
  const title=s.career.track==='expert'?'전문가로 한 걸음 성장했어요':'동료를 돕는 책임이 커졌어요';
  G.recordHistory(s,'milestone',title,'성장 심사의 능력·경험·건강·피로 조건을 충족했어요.');return title;
 }
 s.career.nextReview=s.career.years+1;
 const reason=missing.map(r=>`${r.label} ${r.min!==undefined?r.min+' 이상':r.max+' 이하'} (현재 ${r.current})`).join(', ');
 const message='이번 성장 심사는 잠시 보류됐어요. '+reason+'. 다음 근무 연도에 다시 심사해요.';
 G.recordHistory(s,'career','성장 심사와 다음 도전',message);return message;
};
})();
