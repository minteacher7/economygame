(() => {const G=Game;
G.updateEconomy=s=>{if(s.preparedTurn===s.turn)return;s.preparedTurn=s.turn;const active=G.data.economyEvents.filter(e=>s.year>=e.year&&s.year<e.year+e.duration).at(-1);for(const k of ['growth','jobs','prices','trade'])s.economy[k]=active?.[k]||0;s.economy.index*=1.008+s.economy.prices*.006;s.historical=G.data.economyEvents.find(e=>e.year===s.year)||null;if(s.historical)G.recordHistory(s,'history',s.historical.title,s.historical.description);};
G.calculateHouseholdFinance=(s,income)=>{
 const tax=Math.round(income*.1),insurance=Math.round(income*.045),living=Math.round(1450*s.economy.index),familyLiving=G.getFamilyCosts(s).total,interest=Math.round(s.finance.debt*.035);
 s.finance.cash+=income;G.spendHousehold(s,tax+insurance+living+familyLiving+interest);
 const repayment=Math.min(s.finance.debt,Math.max(0,s.finance.cash-700)*.3);s.finance.cash-=repayment;s.finance.debt-=repayment;
 s.finance.last={income,tax,insurance,living,familyLiving,interest,repayment:Math.round(repayment),balance:Math.round(income-tax-insurance-living-familyLiving-interest-repayment)};
 return s.finance.last;
};
})();
