(() => {const G=Game;
G.data.universityCourses=[
 {id:'general',name:'일반 대학 과정',description:'기초부터 배우며 관심 분야를 찾아가요. 별도 능력 조건은 없어요.',requirements:[],effects:{'experience.careerExploration':2}},
 {id:'research',name:'탐구 프로젝트 대학 과정',description:'연구와 발표를 함께하는 가상의 대학 과정이에요.',requirements:[{path:'stats.learning',label:'학습력',min:55},{path:'stats.persistence',label:'끈기',min:45}],effects:{'experience.academic':3,'experience.technical':2}},
 {id:'creative',name:'창작 실습 대학 과정',description:'작품을 만들고 협력하는 가상의 대학 과정이에요.',requirements:[{path:'stats.creativity',label:'창의력',min:55},{path:'stats.social',label:'사회성',min:40}],effects:{'experience.creative':3,'experience.people':2}}
];
G.data.familyActions=[
 {id:'none',name:'지금의 가족생활 이어가기',description:'올해는 새로운 가족 계획 없이 일상을 돌봐요.'},
 {id:'marry',name:'결혼하기',description:'함께 살아갈 동반자를 맞아요. 행복과 관계가 늘고 생활비도 늘어요.',cost:300,conditions:{'family.married':false,'status.relationships':{min:45}},effects:{'status.happiness':8,'status.relationships':8,'status.fatigue':4}},
 {id:'birth',name:'출산·아이 맞이하기',description:'아이와 새 일상을 시작해요. 기쁨과 돌봄 책임이 함께 생겨요.',cost:400,effects:{'status.happiness':10,'status.relationships':5,'status.fatigue':10}}
];
G.data.goalHints={
 learning:'공부, 학업 경시대회, 전공 집중으로 학습력을 키워요.',
 creativity:'취미·창작, 창작대회, 나만의 취미를 활용해요.',
 fitness:'운동과 충분한 쉼으로 체력을 키워요.',
 social:'친구와 활동, 봉사·동아리, 동료와 협력하기가 도움이 돼요.',
 persistence:'공부와 봉사·동아리, 꾸준히 일하기로 끈기를 키워요.',
 economySense:'진로체험, 아르바이트, 작은 장터 운영으로 경제감각을 키워요.'
};
})();
