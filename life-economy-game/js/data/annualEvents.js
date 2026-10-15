Game.data.annualEvents=[
 {id:'olympiad',name:'학업 경시대회',description:'공부한 내용을 새로운 문제에 적용해요.',conditions:{age:{max:22}},stat:'learning',experience:'academic',effects:{'experience.academic':4,'status.fatigue':6},reward:{'stats.learning':3,'status.happiness':4}},
 {id:'researchFair',name:'탐구대회',description:'궁금한 주제를 실험하고 결과를 발표해요.',conditions:{age:{max:22}},stat:'learning',experience:'technical',effects:{'experience.technical':4,'status.fatigue':7},reward:{'stats.persistence':3,'status.happiness':4}},
 {id:'creativeFair',name:'창작대회',description:'나만의 그림, 이야기, 작품을 선보여요.',stat:'creativity',experience:'creative',effects:{'experience.creative':4,'status.fatigue':6},reward:{'stats.creativity':3,'status.happiness':4}},
 {id:'conference',name:'컨퍼런스 · 배움과 교류',description:'다양한 분야의 발표를 듣고 경험을 나누어요.',conditions:{age:{min:19}},stat:'social',experience:'people',effects:{'experience.people':4,'experience.adaptability':3,'status.fatigue':5},reward:{'status.relationships':5,'status.happiness':3}},
 {id:'exhibition',name:'기술·사업 박람회',description:'새 기술과 제품을 만나고 내 생각을 소개해요.',conditions:{age:{min:19}},stat:'economySense',experience:'business',effects:{'experience.business':4,'experience.technical':3,'status.fatigue':6},reward:{'stats.economySense':3,'status.relationships':4}}
];
