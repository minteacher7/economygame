(() => {const G=Game;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
G.renderRequirements=rows=>rows.length?`<ul class="goal-checklist">${rows.map(r=>`<li class="${r.met?'goal-met':''}"><span>${r.met?'✓':'○'} ${esc(r.label)}</span><b>${r.current} / ${r.min!==undefined?r.min+' 이상':r.max+' 이하'}</b></li>`).join('')}</ul>`:'<p class="muted">별도 능력 조건 없이 선택할 수 있어요.</p>';
G.renderGuidance=(s,selection)=>{
 const goals=G.getGoals(s,selection);
 const picker=s.phase==='youth'||s.phase==='transition'||(s.phase==='adult'&&!s.career.job&&!s.business);
 return `<section class="guidance-panel"><div class="guidance-title"><h3>나의 준비 수첩</h3><span>목표 · 조건 · 남은 시간</span></div>${picker?`<details ${!goals.length?'open':''}><summary>준비할 목표 고르기</summary>${s.phase!=='adult'&&!s.career.path?`<label for="course-target">대학 과정 목표 (선택)</label><select id="course-target" data-goal="courseTarget"><option value="">아직 정하지 않았어요</option>${G.data.universityCourses.map(c=>`<option value="${c.id}" ${s.goals.courseTarget===c.id?'selected':''}>${c.name}</option>`).join('')}</select>`:''}<label for="job-target">관심 직업 목표 (선택)</label><select id="job-target" data-goal="jobTarget"><option value="">여러 직업을 알아볼래요</option>${G.data.jobs.map(j=>`<option value="${j.id}" ${s.goals.jobTarget===j.id?'selected':''}>${j.name}</option>`).join('')}</select><small>목표는 언제든 바꿀 수 있어요. 직업 목표는 지원 제한이 아니에요.</small></details>`:''}${goals.length?goals.map((goal,i)=>`<details class="goal-card" ${i===0?'open':''}><summary>${esc(goal.title)} <span>${esc(goal.deadline)}</span></summary>${G.renderRequirements(goal.requirements)}<p>${esc(goal.hint)}</p></details>`).join(''):'<p>관심 있는 목표를 고르면 필요한 능력과 경험, 준비 방법을 알려 줄게요. 지금은 여러 경험을 해도 좋아요.</p>'}</section>`;
};
G.renderFamilyPanel=(s,selection)=>{
 const costs=G.getFamilyCosts(s),selected=G.data.familyActions.find(a=>a.id===(selection.family||'none'));
 const projected=JSON.parse(JSON.stringify(s));
 if(selected?.id==='marry')projected.family.married=true;
 if(selected?.id==='birth')projected.family.children.push({birthYear:s.year});
 const future=G.getFamilyCosts(projected),price=Math.round((selected?.cost||0)*s.economy.index);
 return `<section class="optional-panel family-panel"><h3>가족과 함께하는 삶</h3><p>${s.family.married?'동반자와 함께 살고 있어요.':'나의 생활을 꾸려 가고 있어요.'} ${s.family.children.length?'자녀 '+costs.ages.map(age=>age===0?'올해 태어난 아이':age+'세').join(', '):''}</p><label for="family-choice">올해의 가족 계획</label><select id="family-choice" data-choice="family">${G.data.familyActions.map(a=>`<option value="${a.id}" ${selected?.id===a.id?'selected':''} ${!G.canChooseFamilyAction(s,a)?'disabled':''}>${a.name}${a.id==='marry'&&!s.family.married?' · 관계 45 이상':''}</option>`).join('')}</select><p>${esc(selected?.description)}</p>${price?`<p>올해 준비 비용 <b>${price.toLocaleString('ko-KR')}만 원</b> · ${selected.id==='marry'?'행복 +8, 관계 +8, 피로 +4':'행복 +10, 관계 +5, 피로 +10'}</p>`:''}<p>올해 가족 추가 생활비 예상: <b>${future.total.toLocaleString('ko-KR')}만 원</b></p><small>준비 비용은 한 번, 추가 생활비는 매년 들어요. 자녀는 0~5세·6~12세·13~18세에 비용이 달라지고 19세부터 기본 양육비가 끝나요. 가족이 생기면 매년 작은 행복이 더해지고, 미성년 자녀를 돌보는 피로도 생겨요. 이 비용은 내 가계 부담을 단순화한 게임용 금액이에요. 가족 계획은 자유롭게 선택해요.</small></section>`;
};
})();
