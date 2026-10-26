Game.data.activities = [
  {
    "id": "study",
    "name": "공부",
    "description": "차근차근 배우는 시간. 피로가 쌓여요.",
    "effects": {
      "stats.learning": 5,
      "stats.persistence": 2,
      "status.fatigue": 8,
      "experience.academic": 4
    },
    "conditions": {}
  },
  {
    "id": "exercise",
    "name": "운동",
    "description": "몸이 튼튼해져요. 힘을 쓴 만큼 피곤해요.",
    "effects": {
      "stats.fitness": 5,
      "status.health": 4,
      "status.happiness": 2,
      "status.fatigue": 6
    },
    "conditions": {}
  },
  {
    "id": "friends",
    "name": "친구와 활동",
    "description": "6천 원 · 친구와 즐거운 시간을 보내요. 먼저 용돈을 모아야 해요.",
    "effects": {
      "stats.social": 4,
      "status.relationships": 5,
      "status.happiness": 3,
      "allowance": -6,
      "experience.people": 4
    },
    "conditions": {}
  },
  {
    "id": "create",
    "name": "취미·창작",
    "description": "5천 원 · 재료를 사서 작품을 만들어요. 창작 경험이 쌓여요.",
    "effects": {
      "stats.creativity": 5,
      "status.happiness": 3,
      "status.fatigue": 4,
      "allowance": -5,
      "experience.creative": 4
    },
    "conditions": {}
  },
  {
    "id": "explore",
    "name": "진로체험",
    "description": "새로운 일을 만나 봐요. 이동하며 피로가 쌓여요.",
    "effects": {
      "stats.economySense": 2,
      "experience.careerExploration": 5,
      "experience.adaptability": 3,
      "experience.technical": 2,
      "status.fatigue": 5
    },
    "conditions": {}
  },
  {
    "id": "parttime",
    "name": "아르바이트",
    "description": "10천 원 벌기 · 일 경험을 얻지만 피로가 많이 쌓여요.",
    "effects": {
      "stats.economySense": 4,
      "experience.economic": 5,
      "allowance": 10,
      "status.fatigue": 12,
      "status.happiness": -2
    },
    "conditions": {
      "age": {
        "min": 16
      }
    }
  },
  {
    "id": "volunteer",
    "name": "봉사·동아리",
    "description": "함께 돕고 배워요. 시간과 체력을 써요.",
    "effects": {
      "stats.social": 3,
      "stats.persistence": 2,
      "experience.service": 5,
      "status.relationships": 4,
      "status.fatigue": 7
    },
    "conditions": {}
  },
  {
    "id": "rest",
    "name": "휴식",
    "description": "성장은 잠시 쉬고 나를 돌봐요.",
    "effects": {
      "status.fatigue": -20,
      "status.health": 5,
      "status.happiness": 4
    },
    "conditions": {}
  }
];
