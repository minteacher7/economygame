(() => {const G=Game;
const req=(s,path,label,min)=>({path,label,min,current:Math.round((G.get(s,path)||0)*10)/10,met:(G.get(s,path)||0)>=min});
G.getCourseRequirements=(s,course)=>course.requirements.map(r=>req(s,r.path,r.label,r.min));
G.getJobPreparation=(s,job)=>[req(s,'stats.'+job.stat,G.labels[job.stat],55),req(s,'experience.'+job.experience,G.labels[job.experience],18)];
G.getPromotionRequirements=(s,track=s.career.track)=>{
 const job=G.data.jobs.find(j=>j.id===s.career.job);if(!job)return [];
 const management=track==='management';
 const stat=management?'social':job.stat,experience=management?'people':job.experience;
 return [req(s,'stats.'+stat,G.labels[stat],Math.min(65,55+s.career.level*2)),req(s,'experience.'+experience,G.labels[experience],Math.min(42,18+s.career.level*4)),req(s,'status.health','건강',40),{path:'status.fatigue',label:'피로',max:70,current:Math.round(s.status.fatigue*10)/10,met:s.status.fatigue<=70}];
};
G.getPromotionDue=s=>s.career.nextReview??(Math.floor(s.career.years/3)+1)*3;
G.getGoals=(s,selection={})=>{
 const goals=[];
 const make=(id,title,deadline,requirements,hint,extra={})=>({id,title,deadline,requirements,hint,...extra});
 if(s.phase==='youth'||s.phase==='transition'){
  const course=G.data.universityCourses.find(c=>c.id===(s.career.path==='university'?s.career.universityCourse:s.goals.courseTarget));
  if(!s.career.path&&course)goals.push(make('course',course.name+' 준비',s.phase==='youth'?'19세 첫 과정 선택 전':'올해 과정 선택 전',G.getCourseRequirements(s,course),'조건을 갖추면 이 과정을 선택할 수 있어요. 일반 대학 과정과 다른 진로도 열려 있어요.'));
  if(s.phase==='transition'&&s.career.path){const path=G.data.paths.find(p=>p.id===s.career.path);const remaining=16-s.turn;goals.push(make('finishCourse',path.name+' 이어 가기','22세 말 · 남은 '+remaining+'년',[{label:'마친 단계',min:4,current:s.career.programYear,met:s.career.programYear>=4}],s.career.programYear+remaining<4?'방향을 바꾸어 남은 기간에 4단계를 모두 마치기는 어려워요. 경험은 남고 성인기 재교육도 가능해요.':'한 해에 한 단계씩 진행해요. 4단계를 마치면 졸업·수료가 기록돼요.'));}
 }
 if(!s.business&&!(s.phase==='adult'&&s.career.job)){
  const job=G.data.jobs.find(j=>j.id===s.goals.jobTarget);
  if(job)goals.push(make('job',job.name+' 준비 목표',s.phase==='adult'?'원하는 재취업 시점까지':'23세 첫 직업 선택 전',G.getJobPreparation(s,job),G.data.goalHints[job.stat]+' 이 수치는 준비 권장 목표예요. 부족해도 지원할 수 있어요.'));
 }
 if(s.phase==='adult'&&s.career.job&&!s.business){
  const track=selection.work==='lead'?'management':selection.work==='learn'?'expert':s.career.track;
  const left=G.getPromotionDue(s)-s.career.years;
  goals.push(make('promotion',track==='management'?'협력·관리 성장 심사':'전문가 성장 심사',left<=1?'올해 말 심사':left+'번의 근무 후 심사',G.getPromotionRequirements(s,track),'선택한 일·생활·행사와 피로 정리를 마친 뒤 심사해요. 조건을 놓치면 다음 근무 연도에 다시 도전해요. 전문성 키우기는 직업 분야 경험도 더해 줘요.'));
 }
 if(s.phase==='adult'&&!s.business){
  const experience=Math.max(s.experience.economic,s.experience.business);
  goals.push(make('startup','나의 기업 시작하기','기한 없음 · 자금과 경험이 준비되면',[req(s,'finance.cash','가계 현금',2500),{label:'경제 또는 창업 경험',min:12,current:Math.round(experience),met:experience>=12}],'출자 1,200만 원을 보내고도 생활비를 남겨요. 창업 분야의 능력·경험도 매출에 도움이 돼요.',{metOverride:G.canStartBusiness(s)}));
 }
 if(s.business){
  goals.push(make('reserve','기업 운영자금 지키기','매년 결산 때',[req(s,'business.cash','기업 현금',Math.round(900*s.economy.index))],'안정 운영으로 투자비를 쉬거나 지출을 조절해요. 대표 소득을 지급할 때 이 운영자금을 먼저 남겨요.'));
  goals.push(make('safety','안전한 일터 만들기','다음 기업 활동 전',[req(s,'business.safety','일터 안전',65)],'직원·안전 돌보기를 선택해요. 안전 65 이상이면 현재 모형의 작은 사고 비용이 발생하지 않아요.'));
 }
 return goals;
};
G.checkGoalMilestones=s=>{
 for(const goal of G.getGoals(s)){
  if(['promotion','finishCourse'].includes(goal.id))continue;
  const key=goal.id+':'+goal.title;
  const ready=goal.metOverride??goal.requirements.every(r=>r.met);
  if(ready&&!s.goals.completed[key]){
   s.goals.completed[key]=s.year;G.recordHistory(s,'goal',goal.title+' 목표에 도달했어요','선택과 경험이 쌓여 준비 목표를 달성했어요.');
   s.report.messages.push('목표 달성 · '+goal.title);
  }
 }
};
})();
