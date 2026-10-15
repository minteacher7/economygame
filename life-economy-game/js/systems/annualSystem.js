(() => {const G=Game;
G.canAttendAnnual=s=>s.phase!=='ending'&&(s.phase!=='youth'||s.semester===2)&&s.annualYear!==s.year;
G.getAnnualEvents=s=>G.canAttendAnnual(s)?G.data.annualEvents.filter(e=>G.checkConditions(s,e.conditions)):[];
G.resolveAnnualEvent=(s,id='none',rng=Math.random)=>{
 if(!id||id==='none')return [];
 const event=G.getAnnualEvents(s).find(e=>e.id===id);
 if(!event)throw Error('이 해에는 선택할 수 없는 행사예요.');
 const youth=s.phase==='youth',cost=youth?2:60;
 if((youth?s.allowance:s.finance.cash)<cost)throw Error('행사 참가비가 부족해요. 이번에는 쉬거나 활동을 바꿔 주세요.');
 const changes=G.applyEffects(s,{[youth?'allowance':'finance.cash']:-cost,...event.effects});
 const chance=Math.min(.8,.15+s.stats[event.stat]*.004+s.experience[event.experience]*.004);
 const success=rng()<chance;
 if(success)changes.push(...G.applyEffects(s,event.reward));
 const result=success?'준비한 것을 잘 보여 주고 좋은 반응을 얻었어요.':'새로운 자극과 배움을 얻었어요. 다음 도전의 밑거름이 될 거예요.';
 s.annualYear=s.year;G.recordHistory(s,'annual',event.name,result,{success});s.report.messages.push(`${event.name}: ${result}`);
 return changes;
};
})();
