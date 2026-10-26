(() => {const G=Game;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
G.renderNPCDialogue=(s,dialogue)=>{
 const npc=G.normalizeNPC(s,dialogue.npc);
 return `<section class="npc-dialogue" aria-label="${esc(npc.role)} ${esc(npc.name)}의 대사"><div class="npc-portrait">${G.visuals.npc(npc)}</div><div class="npc-lines"><div class="npc-nameplate"><strong>${esc(npc.name)}</strong><span>${esc(npc.role)}</span></div><small class="npc-context">${esc(dialogue.title)}</small><blockquote>“${esc(dialogue.text)}”</blockquote></div></section>`;
};
G.renderEventDialogue=(s,event)=>G.renderNPCDialogue(s,{npc:G.eventNPC(s,event),title:event.title,text:event.dialogue||event.description});
G.renderReportDialogues=s=>(s.report.dialogues||[]).map(d=>G.renderNPCDialogue(s,d)).join('');
G.renderScene=(scene,label)=>`<div class="life-scene" style="--scene-x:${scene%3*50}%;--scene-y:${scene<3?0:100}%" role="img" aria-label="${esc(label)}"></div>`;
G.familyPortrait=(s,speaker='spouse',index)=>{
 const year=s.report?.year||s.year;
 if(speaker==='spouse'&&s.family.spouse)return G.visuals.portrait({...s,character:s.family.spouse},Math.max(23,year-s.family.spouse.birthYear));
 const c=s.family.children[index??s.family.children.length-1];if(!c)return G.visuals.portrait(s,s.report?.age||s.age);
 const age=Math.max(0,year-c.birthYear);
 if(age>=19)return G.visuals.portrait({...s,character:{gender:c.portrait===1?'female':'male',appearance:c.portrait===1?0:3}},age);
 const col=age<1?0:age<6?1:age<13?2:3;
 return `<div class="child-portrait" style="--child-x:${col*100/3}%;--child-y:${c.portrait===1?100:0}%" role="img" aria-label="${age}세 자녀의 모습"></div>`;
};
G.renderFamilyAlbum=s=>{
 if(!s.family.married&&!s.family.children.length)return '';
 const year=s.report?.year||s.year;
 return `<section class="family-album"><h3>함께 살아가는 얼굴들</h3><div class="family-faces">${s.family.married?`<figure>${G.familyPortrait(s)}<figcaption>나의 동반자</figcaption></figure>`:''}${s.family.children.map((c,i)=>`<figure>${G.familyPortrait(s,'child',i)}<figcaption>${i===0?'첫째':'둘째'} · ${Math.max(0,year-c.birthYear)}세</figcaption></figure>`).join('')}</div></section>`;
};
G.renderFamilyScene=(s,m)=>!m?'':`<section class="family-story">${G.renderScene(m.scene??0,m.title)}<div class="dialogue-face">${G.familyPortrait(s,m.speaker,m.childIndex)}</div><div class="dialogue-box"><small>${m.speaker==='child'?'아이와 함께한 순간':'동반자와 함께한 순간'}</small><h3>${esc(m.title)}</h3><blockquote>“${esc(m.dialogue)}”</blockquote></div></section>`;
G.renderCondition=s=>`<section class="condition-note ${s.status.fatigue>=60?'condition-warning':''}"><b>${s.status.fatigue>=90?'몸이 보내는 휴식 신호':s.status.fatigue>=60?'지금은 속도를 줄일 때':'오늘의 몸과 마음'}</b><p>체력 덕분에 피로 증가가 ${Math.round((1-G.fitnessFatigueRate(s))*100)}% 줄어요. ${s.status.fatigue>=60?'현재 능력·경험 성장 효율은 '+Math.round(G.fatigueGrowthRate(s)*100)+'%예요.':'지금은 온전히 배울 힘이 있어요.'}</p><small>피로 60부터 성장 75%, 80부터 50%. 90 이상이면 다음 활동은 회복에 집중해요.</small></section>`;
G.renderEndingStory=(s,e)=>`<section class="ending-story">${G.renderScene(e.story.scene,e.story.title)}<div class="ending-protagonist">${G.visuals.portrait(s,52)}</div><div class="ending-caption"><span>마지막 장 · 그리고 다음 계절</span><h1>${esc(e.story.title)}</h1><p>${esc(G.characterName(s))}의 1987—2026</p></div></section><div class="ending-prose"><p>${esc(e.story.description)}</p><p>${esc(e.epilogue)}</p>${e.chapters.length?`<p class="muted">이 삶에는 ‘${e.chapters.map(c=>esc(c.title)).join('’, ‘')}’의 모습도 함께 담겨 있어요.</p>`:''}</div>${G.renderFamilyAlbum(s)}<h2>여섯 가지 시선으로 돌아보는 삶</h2><p>한 가지 점수나 등급으로 묶지 않아요. 내게 소중했던 순간을 떠올려 보세요.</p>`;
})();
