(() => {const G=Game;
G.data.businessActions=[
 {id:'steadyBusiness',name:'단골과 안정 운영',description:'추가 투자 없이 품질과 신뢰를 지켜요. 성장은 천천히 이어져요.',effects:{'business.reputation':1,'business.quality':1,'status.fatigue':4}},
 {id:'quality',name:'제품·서비스 개선',description:'기업에서 180만 원 투자 · 내 분야의 실력을 높여요.',cost:180,effects:{'business.quality':5,'experience.technical':2,'status.fatigue':7}},
 {id:'expand',name:'새로운 시장 도전',description:'기업에서 300만 원 투자 · 손님을 넓히지만 경기와 무역의 영향을 더 받아요.',cost:300,effects:{'business.reputation':5,'status.fatigue':9},risk:.05},
 {id:'care',name:'직원·안전 돌보기',description:'기업에서 150만 원 투자 · 직원 만족과 안전을 높여요.',cost:150,effects:{'business.morale':6,'business.safety':8,'experience.service':3,'status.fatigue':5}}
];
G.data.businessActions.push({id:'delegate',name:'운영을 맡기고 회복하기',description:'운영 대행비 200만 원과 줄어든 매출을 감수하고 쉬어요.',cost:200,revenueFactor:.75,effects:{}});
G.businessFit=(s,sector)=>Math.min(1,(s.stats[sector.stat]*.65+Math.min(80,s.experience[sector.experience])*.65)/100);
G.businessFitText=(s,sector)=>G.businessFit(s,sector)>=.65?'경험과 강점을 잘 살릴 수 있어요':G.businessFit(s,sector)>=.4?'배우며 도전할 기반이 있어요':'이 분야의 경험을 더 쌓으면 좋아요';
G.canStartBusiness=s=>s.phase==='adult'&&!s.business&&!s.report&&!s.pendingEvent&&s.finance.cash>=2500&&s.career.businessClosedTurn!==s.turn&&(s.experience.economic>=12||s.experience.business>=12);
G.startBusiness=(s,sectorId)=>{
 G.requireOpenTurn(s);
 const sector=G.data.businessSectors.find(x=>x.id===sectorId);if(!sector)throw Error('창업할 분야를 먼저 골라 주세요.');
 if(!G.canStartBusiness(s))throw Error('가계 현금 2,500만 원과 경제 또는 창업 경험 12가 필요해요. 기업을 정리한 해에는 다시 창업할 수 없어요.');
 G.rememberJob(s);s.career.previousJob=s.career.job||s.career.previousJob;s.career.job=null;s.finance.cash-=1200;
 const fit=G.businessFit(s,sector);
 s.business={instanceId:`${s.turn}:${sector.id}:${s.history.length}`,sector:sector.id,cash:1200,quality:35+fit*15,reputation:40,safety:55,morale:65,employees:1,wage:750,exporting:false,last:null};
 G.recordHistory(s,'milestone',sector.name+' 창업','가계에서 기업으로 1,200만 원을 출자했어요. 나머지 현금은 가계 생활비로 남겨 두었어요.');
};
G.closeBusiness=(s,forced=false)=>{
 if(!forced)G.requireOpenTurn(s);if(!s.business)throw Error('운영 중인 기업이 없어요.');
 const returned=Math.max(0,s.business.cash-120);s.finance.cash+=returned;
 G.recordHistory(s,'milestone',forced?'기업 운영을 마무리했어요':'기업을 정리하고 다시 출발해요',`정리 비용 120만 원을 뺀 기업 현금 ${Math.round(returned).toLocaleString('ko-KR')}만 원을 가계로 돌려받았어요. 경험은 남아 있어요.`);
 s.business=null;s.career.job=null;s.career.businessClosedTurn=s.turn;
};
G.calculateBusinessTurn=(s,id,rng=Math.random)=>{
 const b=s.business,a=G.data.businessActions.find(x=>x.id===id);if(!a)throw Error('기업 활동을 골라 주세요.');
 const sector=G.data.businessSectors.find(x=>x.id===b.sector)||G.data.businessSectors[0];
 const scale=s.economy.index;
 const investment=Math.round((a.cost||0)*scale);
 if(id!=='delegate'&&b.cash<investment)throw Error('기업 현금이 부족해요. 안정 운영으로 쉬어 가세요.');
 const changes=G.applyEffects(s,a.effects);for(const k of ['quality','reputation','safety','morale'])b[k]=Math.min(100,b[k]);
 const fit=G.businessFit(s,sector);
 const market=(sector.market==='trade'?s.economy.trade*.025:sector.market==='digital'&&s.year>=2012?.04:0);
 const uncertainty=(rng()-.5)*(a.risk||.025);
 const revenue=Math.round((5100+b.quality*8+b.reputation*5)*(1+fit*.16)*scale*(1+s.economy.growth*.055+market+uncertainty)*(0.96+b.morale*.0006)*(a.revenueFactor||1));
 const wages=Math.round(b.employees*b.wage*scale),materials=Math.round(revenue*(.29+s.economy.prices*.008)),overhead=Math.round(480*scale);
 let accident=0;if(rng()<.08&&b.safety<65){accident=Math.round(200*scale);s.report.messages.push('일터에서 작은 사고가 나 기업이 수리비를 지출했어요.');}
 const profit=revenue-wages-materials-overhead-investment-accident;
 b.cash+=profit;
 const reserve=Math.round(900*scale);
 // Only distribute this year's earnings and preserve working capital. Never drain old capital as salary.
 const salary=Math.max(0,Math.round(Math.min(2450*scale,Math.max(0,profit)*.86,Math.max(0,b.cash-reserve))));
 b.cash-=salary;
 b.last={revenue,wages,materials,overhead,investment,accident,profit,salary,reserve,cash:Math.round(b.cash)};
 s.report.business={...b.last};s.report.changes.push(...changes);
 if(id!=='delegate')G.applyEffects(s,{'experience.business':3,['experience.'+sector.experience]:2});
 G.recordHistory(s,'business',a.name,sector.name+'에서 경험을 쌓았어요.');
 if(salary<1900*scale)s.report.messages.push('올해 대표 소득이 적어요. 가계 생활비와 기업 운영자금을 따로 살펴보세요.');
 if(b.cash<0)G.closeBusiness(s,true);
 return salary;
};
})();
