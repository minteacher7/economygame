(() => {const G=Game;
// Dedicated fictional NPC cast; supplied names are used without real-person likenesses.
G.data.npcProfiles=[
  {
    "name": "강혜원",
    "portraitIndex": 0,
    "age": 15
  },
  {
    "name": "김가빈",
    "portraitIndex": 1,
    "age": 15
  },
  {
    "name": "김수연",
    "portraitIndex": 2,
    "age": 40
  },
  {
    "name": "김지유",
    "portraitIndex": 3,
    "age": 15
  },
  {
    "name": "남궁노을",
    "portraitIndex": 4,
    "age": 16
  },
  {
    "name": "문서연",
    "portraitIndex": 5,
    "age": 21
  },
  {
    "name": "배지원",
    "portraitIndex": 6,
    "age": 45
  },
  {
    "name": "오연오",
    "portraitIndex": 7,
    "age": 33
  },
  {
    "name": "오현지",
    "portraitIndex": 8,
    "age": 48
  },
  {
    "name": "유예나",
    "portraitIndex": 9,
    "age": 21
  },
  {
    "name": "이예빈",
    "portraitIndex": 10,
    "age": 26
  },
  {
    "name": "이예슬",
    "portraitIndex": 11,
    "age": 35
  },
  {
    "name": "장은설",
    "portraitIndex": 12,
    "age": 38
  },
  {
    "name": "고도영",
    "portraitIndex": 13,
    "age": 17
  },
  {
    "name": "김도윤",
    "portraitIndex": 14,
    "age": 18
  },
  {
    "name": "김주헌",
    "portraitIndex": 15,
    "age": 25
  },
  {
    "name": "김현석",
    "portraitIndex": 16,
    "age": 42
  },
  {
    "name": "문서준",
    "portraitIndex": 17,
    "age": 32
  },
  {
    "name": "손석희",
    "portraitIndex": 18,
    "age": 44
  },
  {
    "name": "오준혁",
    "portraitIndex": 19,
    "age": 33
  },
  {
    "name": "유민준",
    "portraitIndex": 20,
    "age": 25
  },
  {
    "name": "이건하",
    "portraitIndex": 21,
    "age": 26
  },
  {
    "name": "이진우",
    "portraitIndex": 22,
    "age": 36
  },
  {
    "name": "임상연",
    "portraitIndex": 23,
    "age": 43
  },
  {
    "name": "홍서진",
    "portraitIndex": 24,
    "age": 35
  }
];
G.data.npcProfiles.push({name:'이윤지',portraitIndex:25,age:28,portraitClass:'npc-yoonji'});
G.data.npcRoles={
  "friend": {
    "role": "같은 반 친구",
    "portraits": [
      0,
      1,
      3,
      4
    ]
  },
  "teacher": {
    "role": "담임 선생님",
    "portraits": [
      2
    ]
  },
  "senior": {
    "role": "동아리 선배",
    "portraits": [
      13,
      14
    ]
  },
  "shopkeeper": {
    "role": "동네 가게 주인",
    "portraits": [
      6
    ]
  },
  "professor": {
    "role": "대학교 교수",
    "portraits": [
      8
    ]
  },
  "peer": {
    "role": "함께 배우는 동기",
    "portraits": [
      5,
      9
    ]
  },
  "mentor": {
    "role": "먼저 배운 선배",
    "portraits": [
      15,
      20
    ]
  },
  "instructor": {
    "role": "기술 과정 지도 선생님",
    "portraits": [
      16,
      18
    ]
  },
  "counselor": {
    "role": "진로 상담 선생님",
    "portraits": [
      12
    ]
  },
  "colleague": {
    "role": "직장 동료",
    "portraits": [
      7,
      19
    ]
  },
  "manager": {
    "role": "직장 상사",
    "portraits": [
      23
    ]
  },
  "junior": {
    "role": "직장 후배",
    "portraits": [
      10,
      21
    ]
  },
  "employee": {
    "role": "함께 일하는 직원",
    "portraits": [
      17
    ]
  },
  "customer": {
    "role": "가게를 찾은 고객",
    "portraits": [
      11
    ]
  },
  "buyer": {
    "role": "해외 거래 담당자",
    "portraits": [
      22
    ]
  },
  "neighbor": {
    "role": "동네 이웃",
    "portraits": [
      24
    ]
  },
  "host": {
    "role": "행사 진행자",
    "portraits": [
      24
    ]
  }
};
G.data.npcRoles.customer.portraits.push(25);
G.data.npcs=Object.fromEntries(Object.entries(G.data.npcRoles).map(([key,value])=>[key,{...G.data.npcProfiles[value.portraits[0]],role:value.role,roleKey:key}]));
// Opening and both replies belong to the event, not to the effect engine.
const scripts={
 youth0:['friend','이번 발표, 우리 같이 준비할래? 네 생각도 들어 보고 싶어.','같이 생각하니까 혼자서는 못 찾던 방법이 보인다! 고마워.','알겠어. 이번에는 네 시간부터 챙겨. 다음에 또 같이 하자.'],
 youth1:['senior','학교 축제에 작은 전시를 하려고 해. 네가 만든 것도 보여 주면 어때?','처음 전시라 떨렸지? 네 작품 앞에서 사람들이 멈춰 서더라.','지금은 준비할 시간이 필요한 거구나. 다음 작품도 기대할게.'],
 youth2:['teacher','이 라디오가 왜 멈췄는지 함께 살펴볼까? 전원을 빼고 안전하게 시작하자.','직접 살펴보니 부품이 어떻게 이어지는지 알겠지? 차근차근 잘 해냈어.','좋아. 피곤할 때 무리하지 않는 것도 중요한 판단이야.'],
 youth3:['friend','갖고 싶은 게 있는데 용돈이 모자라. 같이 저축 계획을 세워 볼래?','어디에 썼는지 적으니까 다음 주에 아낄 곳이 보이네!','그럼 오늘은 쉬자. 계획이 필요할 때 다시 같이 적어 보자.'],
 youth4:['shopkeeper','물건을 찾기 쉽게 진열하고 싶은데, 네 아이디어를 들어 볼 수 있을까?','손님 눈높이에서 보니까 다르구나. 아이디어를 내 줘서 고마워.','괜찮아. 네 일정도 중요하지. 다음에 들르면 새 진열을 보여 줄게.'],
 youth5:['teacher','도서관에서 궁금한 주제를 찾아보는 모임이 열려. 너도 함께할래?','질문을 끝까지 따라가 봤구나. 오늘 배운 것이 다음 질문으로 이어질 거야.','이번에는 쉬어 가도 괜찮아. 책과 질문은 언제든 다시 만날 수 있어.'],
 youth6:['senior','동아리에서 이웃을 돕기로 했어. 우리랑 시간을 조금 나눠 볼래?','같이해 줘서 고마워. 작은 도움이 누군가에게는 큰 힘이 되더라.','괜찮아. 네 몸과 마음을 먼저 챙겨. 다음에 여유가 생기면 함께하자.'],
 youth7:['friend','처음 해 보는 활동이라 나도 떨려. 새 동아리, 같이 가 볼래?','실수해도 같이 웃으니까 괜찮네. 다음에는 조금 더 익숙해지겠지?','알겠어. 나는 먼저 가 볼게. 궁금하면 나중에 이야기해 줄게.'],
 youth8:['teacher','여러 일을 하는 분들이 학교에 오신대. 궁금한 것을 직접 물어볼까?','직업 이름만 볼 때와는 다르지? 네가 중요하게 생각하는 것도 찾아보자.','이번에는 참여하지 않아도 괜찮아. 다른 체험 기회도 함께 찾아보자.'],
 youth9:['friend','안 쓰는 물건으로 작은 장터를 열 거야. 가격도 같이 정해 볼래?','손님이 뭘 원하는지 듣는 것도 중요하네. 같이 준비하길 잘했어!','좋아. 이번 장터는 우리가 해 볼게. 다음에 또 이야기하자.'],
 opportunity0:['senior','꾸준히 만든 작품을 봤어. 청소년 전시에 함께 내 볼래?','네 작품 이야기를 직접 들으니 더 멋지다. 함께한 사람들도 응원하고 있어.','기회가 와도 모두 잡을 필요는 없지. 네 속도로 계속 만들어 봐.'],
 opportunity1:['teacher','네가 쌓아 온 탐구 기록이 눈에 띄었어. 탐구 모임에 참여해 볼까?','새로운 질문 앞에서도 차근차근 생각했구나. 그 경험이 오래 남을 거야.','좋아. 지금 하던 배움을 이어 가는 것도 의미 있는 선택이야.'],
 opportunity2:['senior','이웃을 돕던 네 모습이 생각났어. 동네 기획단에 함께해 줄래?','여러 사람의 의견을 모으는 일이 쉽진 않지? 덕분에 한 걸음 나아갔어.','네가 할 수 있는 만큼 함께하면 돼. 다음 기회에도 만나자.'],
 adult0:['colleague','바쁘다 보니 안전 점검을 놓쳤어요. 시간을 내서 함께 살펴볼까요?','점검하니 놓쳤던 위험이 보이네요. 안전하게 일할 방법을 찾았어요.','우선 바로 할 수 있는 점검부터 나눠서 해 봐요. 위험한 일은 서두르지 말고요.'],
 adult1:['junior','새 도구를 배우는 수업이 열렸어요. 같이 배워 보면 어떨까요?','함께 실습하니 서로 알려 줄 수 있었어요. 다음 작업에도 써 봐요.','먼저 쉬운 기능부터 함께 익혀 봐요. 조금씩 배워도 괜찮아요.'],
 adult2:['neighbor','동네 나눔 활동을 준비하고 있어. 시간이나 마음을 조금 보태 줄래?','함께하니까 할 수 있는 일이 늘었어. 이웃들도 정말 반가워했어.','부담 없는 일부터 나눠 보자. 작은 도움도 고마워.'],
 adult3:['manager','일하기 전에 시간과 임금 약속을 확인해 봅시다. 궁금한 내용이 있나요?','시간을 들여 확인하니 서로의 약속이 더 분명해졌네요.','우선 궁금한 항목을 적어 두고 하나씩 확인합시다.'],
 adult4:['shopkeeper','고장 난 물건을 가져오셨군요. 비용과 앞으로 쓸 시간을 함께 따져 볼까요?','직접 살펴보니 오래 쓸 방법이 보이네요. 다음에도 상태를 확인해 주세요.','당장 할 수 있는 관리부터 해 봐요. 큰 지출은 천천히 결정해도 돼요.'],
 adult5:['colleague','저는 조금 다르게 생각했어요. 서로 왜 그렇게 생각했는지 이야기해 볼까요?','설명을 듣고 나니 이해가 돼요. 시간을 내 줘서 고마워요.','오늘은 겹치는 의견부터 정리해 봐요. 나머지는 차분히 다시 이야기해요.'],
 responsibleOrder:['buyer','저희 가게에 납품해 주실 수 있나요? 품질 약속과 준비 비용부터 함께 확인하고 싶습니다.','준비해 주셔서 감사합니다. 약속한 품질을 지키며 오래 거래해 봅시다.','알겠습니다. 지금의 손님을 돌보는 것도 중요한 선택이지요. 다음 기회에 다시 뵙겠습니다.']
};
for(const event of [...G.data.events,...G.data.businessEvents]){
 const script=scripts[event.id];if(!script)continue;
 event.npc=script[0];event.dialogue=script[1];event.choices.forEach((c,i)=>c.reply=script[i+2]);
}
// Working relationships should not appear as current coworkers after leaving a job.
for(const id of ['adult0','adult1','adult3','adult5']){
 const e=G.data.events.find(e=>e.id===id);
 e.npcVariants=[{conditions:{'business.cash':{min:0}},npc:'employee'},{conditions:{'career.job':null},npc:'counselor'}];
}
G.data.events.push(
 {id:'campusQuestion',category:'choice',title:'질문에서 시작하는 배움',description:'수업을 마친 뒤 교수님이 탐구 노트를 살펴봅니다.',npc:'professor',dialogue:'좋은 질문을 적었네요. 답을 외우기보다 직접 확인하는 작은 탐구를 해 볼까요?',conditions:{phase:'transition','career.path':'university'},weight:2,cooldown:2,choices:[{name:'작은 탐구를 함께하기',effects:{'experience.academic':4,'status.fatigue':5},resultText:'탐구 과정을 직접 경험했어요.',reply:'직접 확인한 내용을 잘 정리했네요. 결과뿐 아니라 과정도 기억해 두세요.'},{name:'이번에는 수업 복습에 집중하기',effects:{'status.fatigue':-5},resultText:'배운 것을 정리하며 쉬어 갔어요.',reply:'좋아요. 기초를 다질 시간도 필요하니까요. 질문은 다음에 이어 가요.'}]},
 {id:'practicePartner',category:'choice',title:'같이 해 보는 실습',description:'실습을 마친 동기가 아직 정리 중인 도구를 가리킵니다.',npc:'peer',dialogue:'오늘 배운 작업, 한 번 더 해 볼래? 서로 놓친 부분을 알려 주면 좋겠어.',conditions:{phase:'transition','career.path':'technical'},weight:2,cooldown:2,choices:[{name:'동기와 다시 연습하기',effects:{'experience.technical':4,'experience.people':2,'status.fatigue':5},resultText:'서로 도우며 실습 경험을 쌓았어요.',reply:'네 설명을 들으니 이해됐어. 나도 다음에는 도와줄게.'},{name:'오늘은 정리하고 쉬기',effects:{'status.fatigue':-6},resultText:'다음 실습을 위해 몸을 쉬었어요.',reply:'좋아. 무리하다 다치면 안 되지. 다음 수업 때 만나자.'}]},
 {id:'firstInterview',category:'choice',title:'면접 전날의 조언',description:'먼저 취업을 준비했던 선배가 연락을 해 왔습니다.',npc:'mentor',dialogue:'정답 같은 말을 찾기보다 네 경험을 이야기해 봐. 같이 연습해 볼까?',conditions:{phase:'transition','career.path':'employment'},weight:2,cooldown:2,choices:[{name:'경험을 말로 정리해 보기',effects:{'stats.social':2,'experience.careerExploration':4,'status.fatigue':4},resultText:'내 경험을 설명하는 연습을 했어요.',reply:'실제로 해 본 이야기를 들으니 네 강점이 보여. 그걸 네 말로 전해 봐.'},{name:'혼자 차분히 준비하기',effects:{'status.fatigue':-5,'experience.careerExploration':1},resultText:'내 속도로 생각을 정리했어요.',reply:'좋아. 떨리면 천천히 숨을 쉬어. 네 속도로 말해도 괜찮아.'}]},
 {id:'differentPaths',category:'choice',title:'다른 길을 걷는 사람들',description:'진로 모임의 동기가 새로운 체험 소식을 전합니다.',npc:'peer',dialogue:'우리 아직 정답을 못 찾았다고 조급해하지 말자. 다른 일을 해 보는 사람을 만나 볼래?',conditions:{phase:'transition','career.path':'exploration'},weight:2,cooldown:2,choices:[{name:'함께 체험 이야기 듣기',effects:{'experience.careerExploration':4,'experience.adaptability':2,'status.fatigue':4},resultText:'여러 삶의 모습을 알게 되었어요.',reply:'사람마다 중요하게 생각하는 게 다르네. 우리도 하나씩 찾아보자.'},{name:'지금까지의 경험 정리하기',effects:{'status.fatigue':-5,'experience.moneyHabit':1},resultText:'나에게 맞는 속도를 돌아보았어요.',reply:'그러자. 계속 움직이는 것만큼 돌아보는 시간도 필요하겠지.'}]},
 {id:'firstCustomer',category:'choice',title:'아이디어를 들어 줄 첫 손님',description:'창업 준비 모임에서 만난 손님이 이야기를 청합니다.',npc:'customer',dialogue:'어떤 도움을 주는 상품인지 궁금해요. 제가 써 보는 입장에서 의견을 드려도 될까요?',conditions:{phase:'transition','career.path':'startup'},weight:2,cooldown:2,choices:[{name:'손님의 의견을 듣고 고쳐 보기',effects:{'experience.business':4,'experience.people':2,'status.fatigue':5},resultText:'손님의 필요를 바탕으로 아이디어를 다듬었어요.',reply:'제 이야기를 반영해 주셨네요. 어떤 점이 달라졌는지 더 잘 알겠어요.'},{name:'먼저 준비 내용을 정리하기',effects:{'status.fatigue':-5},resultText:'준비할 일을 차근차근 정리했어요.',reply:'좋아요. 준비되면 다시 설명해 주세요. 기대하고 있을게요.'}]}
);
G.data.activityDialogue={
 study:['teacher','오늘 차근차근 쌓은 배움이 다음 질문을 풀 힘이 될 거야. 이제 눈도 좀 쉬어 주렴.'],exercise:['friend','같이 몸을 움직이니 개운하다! 물 마시고 잠깐 쉬었다 가자.'],friends:['friend','오늘 같이 보낸 시간, 오래 기억날 것 같아. 다음에도 이야기하자.'],create:['senior','네 생각이 작품으로 보이기 시작했네. 다음에는 어떤 걸 만들고 싶어?'],explore:['teacher','직접 만나 보니 어땠니? 네가 좋아했던 순간을 기억해 두자.'],parttime:['shopkeeper','오늘 수고했어. 번 돈을 어디에 쓸지도 네가 천천히 정해 보렴.'],volunteer:['senior','함께해 줘서 고마워. 누군가를 도우면서 우리도 배우게 되네.'],rest:['friend','오늘은 푹 쉬어. 나중에 기운 나면 다시 같이 하자.']
};
G.data.workDialogue={steady:['colleague','오늘도 맡은 일을 이어 갔네요. 퇴근 후에는 숨 돌릴 시간도 챙겨요.'],learn:['junior','함께 배우니 든든해요. 새로 익힌 방법을 다음 일에도 써 봐요.'],lead:['manager','동료의 이야기를 듣고 도와주었군요. 함께 일하는 힘이 쌓이고 있어요.'],balance:['colleague','오늘은 일과 쉼을 나누었네요. 오래 일하려면 나를 돌볼 시간도 필요하지요.'],retrain:['instructor','다시 배우는 일이 낯설 수 있어요. 하나씩 손에 익혀 봅시다.'],recover:['counselor','잠시 쉬면서 방향을 찾아도 괜찮아요. 다음 걸음은 회복한 뒤 생각해 봐요.'],shortWork:['mentor','짧은 일에서도 경험은 남아요. 다음에 어떤 일을 하고 싶은지 살펴봐요.'],steadyBusiness:['customer','익숙한 품질이라 다시 찾아왔어요. 다음에도 잘 부탁드려요.'],quality:['customer','전보다 쓰기 편해진 부분이 있네요. 제 이야기도 들어 주셔서 고마워요.'],expand:['employee','새로운 손님을 만나 봤어요. 반응을 살피며 다음 계획을 세워 봐요.'],care:['employee','안전과 일하는 환경을 함께 살펴주니 든든해요. 오래 일할 수 있는 곳을 만들어 가요.']};
})();
