(() => {
  const G=Game;
  G.ui.candidate=G.createNewCharacter();
  G.render();

  // Do not replace focused inputs while Korean IME composition is in progress.
  document.addEventListener('input',event=>{
    if(G.ui.screen!=='setup')return;
    const key={'family-name':'familyName','given-name':'givenName'}[event.target.id];
    if(key){
      G.ui.nameDraft[key]=event.target.value;
      G.ui.candidate.character[key]=event.target.value;
    }
  });
  document.addEventListener('change',event=>{
    if(event.target.dataset?.goal){
      const key=event.target.dataset.goal,value=event.target.value;
      const allowed=key==='courseTarget'?G.data.universityCourses:key==='jobTarget'?G.data.jobs:null;
      if(allowed&&(value===''||allowed.some(x=>x.id===value))){G.state.goals[key]=value;G.saveGame(G.state);G.render();document.getElementById(key==='courseTarget'?'course-target':'job-target')?.focus();}
      return;
    }
    if(event.target.dataset?.choice){
      const key=event.target.dataset.choice;
      if(['annual','investment','family'].includes(key)){
        G.ui.selection[key]=event.target.value;G.ui.error='';if(key==='family'&&!G.getLifeActivities(G.state,event.target.value).some(a=>a.id===G.ui.selection.life))G.ui.selection.life='';G.render();
        document.getElementById(key==='annual'?'annual-choice':key==='family'?'family-choice':'investment-choice')?.focus();
      }
      return;
    }
    if(G.ui.screen!=='setup'||event.target.name!=='gender')return;
    if(!['male','female'].includes(event.target.value))return;
    G.ui.nameDraft.gender=event.target.value;
    Object.assign(G.ui.candidate.character,G.ui.nameDraft);
    G.ui.error='';
    G.render();
    document.querySelector('input[name="gender"]:checked')?.focus();
  });
  document.addEventListener('submit',event=>{
    if(event.target.id==='character-form'){
      event.preventDefault();
      document.getElementById('start').click();
    }
  });
  const freshSelection=()=>G.freshSelection();
  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button||button.disabled)return;
    if(button.id==='start')event.preventDefault();
    const u=G.ui,s=G.state;
    u.error='';
    try{
      if(button.dataset.group){
        const {group,id}=button.dataset;
        if(group==='activities'){
          if(u.selection.activities.length<2)u.selection.activities.push(id);
        }else u.selection[group]=id;
      }else if(button.dataset.event!==undefined){
        G.resolveEventChoice(s,Number(button.dataset.event));
      }else if(button.dataset.job){
        G.chooseJob(s,button.dataset.job);u.changeJob=false;u.startup=false;u.selection.work='';G.saveGame(s);
      }else switch(button.id){
        case 'begin-setup':u.screen='setup';break;
        case 'intro':u.screen='intro';break;
        case 'start':
          Object.assign(u.candidate.character,{
            familyName:u.nameDraft.familyName.trim().slice(0,12),
            givenName:u.nameDraft.givenName.trim().slice(0,20),
            gender:u.nameDraft.gender
          });
          G.startNewGame(u.candidate);
          u.selection=freshSelection();u.changeJob=false;u.startup=false;u.hideJobs=false;u.screen='game';
          break;
        case 'load':
          G.state=G.loadGame();
          if(!G.state)throw Error('저장된 기록을 읽을 수 없어요.');
          u.selection=freshSelection();u.changeJob=false;u.startup=false;u.hideJobs=false;u.screen='game';G.prepareTurn(G.state);
          break;
        case 'reroll':
          if(u.rerolls<2){u.rerolls++;u.candidate=G.createNewCharacter();Object.assign(u.candidate.character,u.nameDraft);}
          break;
        case 'clear':u.selection.activities=[];break;
        case 'play':G.playTurn(s,u.selection);break;
        case 'next':G.continueTurn(s);u.selection=freshSelection();break;
        case 'business':u.startup=true;u.selection.sector='';break;
        case 'cancel-business':u.startup=false;break;
        case 'confirm-business':G.startBusiness(s,u.selection.sector);u.startup=false;u.changeJob=false;u.selection.work='';G.saveGame(s);break;
        case 'close-business':G.closeBusiness(s);u.selection.work='';u.changeJob=true;G.saveGame(s);break;
        case 'quit-job':G.quitJob(s);u.selection.work='';u.hideJobs=true;G.saveGame(s);break;
        case 'cancel-job':u.changeJob=false;u.hideJobs=true;break;
        case 'leave-program':G.leaveProgram(s);u.selection.path='';u.selection.course='focus';G.saveGame(s);break;
        case 'change-job':u.changeJob=true;u.hideJobs=false;break;
        case 'home':
          u.screen='intro';u.candidate=G.createNewCharacter();
          Object.assign(u.candidate.character,u.nameDraft);u.selection=freshSelection();
          break;
      }
    }catch(error){u.error=error.message;}
    G.render();
    if(u.error&&u.screen==='setup'){
      if(!u.nameDraft.familyName.trim())document.getElementById('family-name')?.focus();
      else if(!u.nameDraft.givenName.trim())document.getElementById('given-name')?.focus();
      else document.querySelector('input[name="gender"]')?.focus();
    }
    if(!u.error&&(['play','next','begin-setup','intro','start'].includes(button.id)||button.dataset.event!==undefined)){
      window.scrollTo({top:0,behavior:'smooth'});
    }
  });
})();
