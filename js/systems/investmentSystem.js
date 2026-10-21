(() => {const G=Game;
G.data.investmentActions=[
 {id:'none',name:'현금 지키기',description:'올해는 투자 거래 없이 현금을 남겨 둬요.'},
 {id:'buyStocks',name:'주식에 500만 원 투자',description:'거래비 5만 원. 여러 기업에 나누어 투자해요. 가치가 내려갈 수도 있어요.',asset:'stocks',amount:500,fee:.01,buy:true},
 {id:'sellStocks',name:'주식 500만 원어치 팔기',description:'보유 금액이 적으면 전부 팔아요. 거래비 1%를 제외하고 현금으로 받아요.',asset:'stocks',amount:500,fee:.01},
 {id:'buyProperty',name:'부동산에 3,000만 원 투자',description:'거래비 60만 원. 작은 지분을 사요. 매년 보유 비용도 들어요.',asset:'property',amount:3000,fee:.02,buy:true},
 {id:'sellProperty',name:'부동산 지분 팔기',description:'최대 3,000만 원어치를 팔아요. 거래비 3%를 제외하고 현금으로 받아요.',asset:'property',amount:3000,fee:.03}
];
G.applyInvestment=(s,id='none')=>{
 const action=G.data.investmentActions.find(a=>a.id===(id||'none'));if(!action)throw Error('투자 선택을 확인해 주세요.');
 if(action.id==='none')return;
 const account=s.finance.investments;
 if(action.buy){
  const cost=action.amount*(1+action.fee);
  if(s.finance.cash-cost<1200)throw Error('투자 후 생활비로 가계 현금 1,200만 원을 남겨 두어야 해요.');
  if(s.finance.debt>0)throw Error('갚을 돈을 먼저 정리한 뒤 투자할 수 있어요.');
  s.finance.cash-=cost;account[action.asset]+=action.amount;
 }else{
  const amount=Math.min(account[action.asset],action.amount);if(amount<=0)throw Error('팔 수 있는 투자 자산이 없어요.');
  account[action.asset]-=amount;s.finance.cash+=amount*(1-action.fee);
 }
 G.recordHistory(s,'investment',action.name,action.description);s.report.messages.push(action.name+' 선택을 반영했어요.');
};
G.updateInvestments=(s,rng=Math.random)=>{
 if(s.finance.investmentYear===s.year)return;
 const rates={stocks:Math.max(-.06,Math.min(.045,.012+s.economy.growth*.018+(rng()-.5)*.04)),property:Math.max(-.035,Math.min(.025,.007+s.economy.growth*.009+(rng()-.5)*.018))};
 const before={...s.finance.investments};let upkeep=0;
 for(const key of ['stocks','property'])s.finance.investments[key]=Math.round(before[key]*(1+rates[key])*100)/100;
 upkeep=Math.round(s.finance.investments.property*.003);G.spendHousehold(s,upkeep);
 s.finance.investmentYear=s.year;
 s.report.investments={rates,values:{...s.finance.investments},change:Math.round(s.finance.investments.stocks+s.finance.investments.property-before.stocks-before.property),upkeep};
};
})();
