(() => {const G=Game;
G.needsRecovery=s=>s.status.fatigue>=90;
G.fatigueGrowthRate=s=>s.status.fatigue>=80?.5:s.status.fatigue>=60?.75:1;
G.fitnessFatigueRate=s=>1-Math.max(0,Math.min(100,s.stats.fitness))*.003;
G.processRecoveryTurn=s=>{
 const changes=G.applyEffects(s,{'status.fatigue':-40,'status.health':10,'status.happiness':3});
 if(s.phase==='adult'){
  const job=G.data.jobs.find(j=>j.id===s.career.job);
  const income=s.business?G.calculateBusinessTurn(s,'delegate'):job?Math.round(job.baseIncome*.55*Math.pow(s.economy.index,.85)):0;
  G.calculateHouseholdFinance(s,income);
 }else if(s.phase==='transition')s.report.messages.push('올해 과정은 쉬어 가요. 과정 단계와 수업료는 늘지 않지만, 진로 전환기는 22세에 끝나요.');
 G.addNPCDialogue(s,s.phase==='youth'?'teacher':'counselor','쉬어 가도 괜찮아요','몸이 쉬어 달라고 말하고 있어요. 이번에는 일정을 비우고 회복부터 해 봐요. 다시 움직일 시간은 있어요.');
 G.recordHistory(s,'activity','몸의 신호를 듣고 쉬었어요','피로가 높아 일정을 비우고 회복에 집중했어요.',{activity:'rest'});
 s.report.messages.push('회복에 집중해 피로 40을 덜었어요. 성인기에는 줄어든 근로소득 또는 위임 운영 수입과 생활비가 반영돼요.');
 return changes;
};
})();
