(() => {const G=Game;
G.getNPC=(s,key,scene='')=>{
 const fallback=s.phase==='youth'?'teacher':s.phase==='transition'?'counselor':'neighbor';
 const roleKey=G.data.npcRoles[key]?key:fallback,role=G.data.npcRoles[roleKey];
 // Role and scene select a stable cast member, independent of player appearance and current year.
 const seed=Array.from(roleKey+scene).reduce((sum,c)=>sum+c.codePointAt(0),0);
 const index=scene?role.portraits[seed%role.portraits.length]:role.portraits[0];
 return {...G.data.npcProfiles[index],role:role.role,roleKey};
};
G.normalizeNPC=(s,npc)=>{
 if(Number.isInteger(npc?.portraitIndex)&&npc.portraitIndex>=0&&npc.portraitIndex<25)return npc;
 const roleKey=npc?.roleKey||Object.keys(G.data.npcRoles).find(k=>G.data.npcRoles[k].role===npc?.role)||(npc?.role==='오랜 친구이자 이웃'?'neighbor':undefined);
 return G.getNPC(s,roleKey);
};
G.migrateNPCDialogues=s=>{s.report?.dialogues?.forEach(d=>{d.npc=G.normalizeNPC(s,d.npc);});};
G.eventNPC=(s,event)=>G.getNPC(s,event.npcVariants?.find(v=>G.checkConditions(s,v.conditions))?.npc||event.npc,event.id);
G.addNPCDialogue=(s,npc,title,text)=>{
 if(!text||!s.report)return;
 s.report.dialogues??=[];s.report.dialogues.push({npc:typeof npc==='string'?G.getNPC(s,npc,title+':'+s.turn):{...npc},title,text});
};
G.addActivityDialogue=(s,selection)=>{
 if(s.phase==='youth'){
  const id=selection.activities?.at(-1),line=G.data.activityDialogue[id];
  if(line)G.addNPCDialogue(s,line[0],'이번 학기를 함께한 사람',line[1]);
 }else if(s.phase==='transition'){
  const mentors={university:'professor',technical:'instructor',employment:'mentor',exploration:'peer',startup:'customer'};
  const lines={university:'올해의 배움을 잘 이어 왔어요. 궁금했던 것은 다음 수업에서도 함께 살펴봅시다.',technical:'손으로 직접 해 본 경험은 남아요. 다음에는 조금 더 익숙하게 다룰 수 있을 거예요.',employment:'네 경험을 하나씩 정리하고 있구나. 준비하는 시간도 네 삶의 한 부분이야.',exploration:'여러 길을 살펴봤네. 마음에 남았던 순간부터 다시 생각해 보자.',startup:'준비한 아이디어를 들으니 어떤 일을 하려는지 알겠어요. 앞으로도 손님의 이야기를 들어 주세요.'};
  G.addNPCDialogue(s,mentors[s.career.path]||'counselor','올해 과정을 돌아보며',lines[s.career.path]||'올해 쌓은 경험을 다음 선택에 이어 가 봐요.');
 }else if(s.phase==='adult'){
  const line=G.data.workDialogue[selection.work];if(line)G.addNPCDialogue(s,line[0],'일을 마친 뒤',line[1]);
 }
};
})();
