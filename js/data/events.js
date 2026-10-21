Game.data.events = [
  {
    "id": "youth0",
    "category": "choice",
    "title": "친구와 만든 발표",
    "description": "발표를 함께 준비하자는 제안을 받았어요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.people": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth1",
    "category": "choice",
    "title": "학교 축제",
    "description": "축제에서 작은 작품을 선보일 수 있어요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.creative": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth2",
    "category": "choice",
    "title": "고장 난 라디오",
    "description": "직접 고쳐 볼 기회가 생겼어요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.technical": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth3",
    "category": "choice",
    "title": "용돈 계획",
    "description": "갖고 싶은 물건을 위해 계획을 세워 볼까요?",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.moneyHabit": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth4",
    "category": "choice",
    "title": "동네 가게 돕기",
    "description": "가게에서 진열 아이디어를 기다리고 있어요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.economic": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth5",
    "category": "choice",
    "title": "도서관의 초대",
    "description": "새로운 주제를 찾아보는 모임이 열려요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.academic": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth6",
    "category": "choice",
    "title": "우리 동네 돌봄",
    "description": "도움이 필요한 이웃과 시간을 보낼 수 있어요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.service": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth7",
    "category": "choice",
    "title": "새로운 동아리",
    "description": "익숙하지 않은 활동에 도전할 기회예요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.adaptability": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth8",
    "category": "choice",
    "title": "직업인과의 만남",
    "description": "어른에게 일하는 이야기를 들어 볼까요?",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.careerExploration": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "youth9",
    "category": "choice",
    "title": "작은 바자회",
    "description": "친구들과 물건을 나누는 장터가 열려요.",
    "conditions": {
      "phase": "youth"
    },
    "weight": 1,
    "cooldown": 3,
    "choices": [
      {
        "name": "시간을 내어 참여하기",
        "effects": {
          "experience.business": 5,
          "status.fatigue": 5,
          "status.happiness": 2
        },
        "resultText": "새로운 경험이 쌓였어요."
      },
      {
        "name": "이번에는 내 시간을 지키기",
        "effects": {
          "status.fatigue": -5,
          "status.happiness": 1
        },
        "resultText": "여유를 되찾았어요."
      }
    ]
  },
  {
    "id": "opportunity0",
    "category": "opportunity",
    "title": "청소년 작품 전시",
    "description": "꾸준히 쌓은 경험을 알아본 사람들이 함께하자고 해요.",
    "conditions": {
      "phase": "youth",
      "experience.creative": {
        "min": 12
      }
    },
    "weight": 3,
    "cooldown": 20,
    "choices": [
      {
        "name": "특별한 기회에 도전하기",
        "effects": {
          "stats.creativity": 5,
          "status.fatigue": 8,
          "flags.opportunity0": true
        },
        "delayed": [
          {
            "after": 2,
            "title": "함께했던 사람들의 응원",
            "effects": {
              "status.relationships": 5,
              "status.happiness": 4
            }
          }
        ],
        "resultText": "새로운 무대에서 나의 가능성을 발견했어요."
      },
      {
        "name": "지금의 생활에 집중하기",
        "effects": {
          "status.fatigue": -5
        },
        "resultText": "내 속도대로 가기로 했어요."
      }
    ]
  },
  {
    "id": "opportunity1",
    "category": "opportunity",
    "title": "탐구 모임 초대",
    "description": "꾸준히 쌓은 경험을 알아본 사람들이 함께하자고 해요.",
    "conditions": {
      "phase": "youth",
      "experience.academic": {
        "min": 12
      }
    },
    "weight": 3,
    "cooldown": 20,
    "choices": [
      {
        "name": "특별한 기회에 도전하기",
        "effects": {
          "stats.learning": 5,
          "status.fatigue": 8,
          "flags.opportunity1": true
        },
        "delayed": [
          {
            "after": 2,
            "title": "함께했던 사람들의 응원",
            "effects": {
              "status.relationships": 5,
              "status.happiness": 4
            }
          }
        ],
        "resultText": "새로운 무대에서 나의 가능성을 발견했어요."
      },
      {
        "name": "지금의 생활에 집중하기",
        "effects": {
          "status.fatigue": -5
        },
        "resultText": "내 속도대로 가기로 했어요."
      }
    ]
  },
  {
    "id": "opportunity2",
    "category": "opportunity",
    "title": "우리 동네 기획단",
    "description": "꾸준히 쌓은 경험을 알아본 사람들이 함께하자고 해요.",
    "conditions": {
      "phase": "youth",
      "experience.service": {
        "min": 12
      }
    },
    "weight": 3,
    "cooldown": 20,
    "choices": [
      {
        "name": "특별한 기회에 도전하기",
        "effects": {
          "stats.social": 5,
          "status.fatigue": 8,
          "flags.opportunity2": true
        },
        "delayed": [
          {
            "after": 2,
            "title": "함께했던 사람들의 응원",
            "effects": {
              "status.relationships": 5,
              "status.happiness": 4
            }
          }
        ],
        "resultText": "새로운 무대에서 나의 가능성을 발견했어요."
      },
      {
        "name": "지금의 생활에 집중하기",
        "effects": {
          "status.fatigue": -5
        },
        "resultText": "내 속도대로 가기로 했어요."
      }
    ]
  },
  {
    "id": "adult0",
    "category": "choice",
    "title": "일터의 안전",
    "description": "바쁜 일정 속에서 안전 점검 시간이 부족해요.",
    "conditions": {
      "phase": "adult"
    },
    "weight": 1,
    "cooldown": 4,
    "tip": "안전하게 일할 권리는 중요해요. 안전에 쓰는 시간과 돈은 사고를 막는 데 도움이 됩니다.",
    "choices": [
      {
        "name": "시간과 비용을 들여 해결하기",
        "effects": {
          "status.health": 5,
          "experience.service": 4,
          "finance.cash": -80,
          "status.fatigue": 4
        },
        "resultText": "직접 행동하며 경험을 쌓았어요."
      },
      {
        "name": "지금 할 수 있는 작은 방법 찾기",
        "effects": {
          "experience.adaptability": 2,
          "status.fatigue": 2
        },
        "resultText": "부담을 나누어 천천히 해결하기로 했어요."
      }
    ]
  },
  {
    "id": "adult1",
    "category": "choice",
    "title": "다시 배우는 기회",
    "description": "새로운 도구를 배우는 수업이 열렸어요.",
    "conditions": {
      "phase": "adult"
    },
    "weight": 1,
    "cooldown": 4,
    "tip": "새 기술은 일하는 방식을 바꿉니다. 배움은 변화에 적응하는 힘이 될 수 있어요.",
    "choices": [
      {
        "name": "시간과 비용을 들여 해결하기",
        "effects": {
          "experience.technical": 6,
          "experience.adaptability": 5,
          "finance.cash": -80,
          "status.fatigue": 4
        },
        "resultText": "직접 행동하며 경험을 쌓았어요."
      },
      {
        "name": "지금 할 수 있는 작은 방법 찾기",
        "effects": {
          "experience.adaptability": 2,
          "status.fatigue": 2
        },
        "resultText": "부담을 나누어 천천히 해결하기로 했어요."
      }
    ]
  },
  {
    "id": "adult2",
    "category": "choice",
    "title": "이웃의 부탁",
    "description": "동네의 작은 나눔 활동에 초대받았어요.",
    "conditions": {
      "phase": "adult"
    },
    "weight": 1,
    "cooldown": 4,
    "tip": "",
    "choices": [
      {
        "name": "시간과 비용을 들여 해결하기",
        "effects": {
          "status.relationships": 7,
          "experience.service": 5,
          "finance.cash": -80,
          "status.fatigue": 4
        },
        "resultText": "직접 행동하며 경험을 쌓았어요."
      },
      {
        "name": "지금 할 수 있는 작은 방법 찾기",
        "effects": {
          "experience.adaptability": 2,
          "status.fatigue": 2
        },
        "resultText": "부담을 나누어 천천히 해결하기로 했어요."
      }
    ]
  },
  {
    "id": "adult3",
    "category": "choice",
    "title": "계약서 살펴보기",
    "description": "일을 시작하기 전 약속을 꼼꼼히 확인할 기회예요.",
    "conditions": {
      "phase": "adult"
    },
    "weight": 1,
    "cooldown": 4,
    "tip": "일하는 시간과 임금은 분명하게 약속해야 해요. 궁금한 내용은 확인하고 도움을 요청할 수 있어요.",
    "choices": [
      {
        "name": "시간과 비용을 들여 해결하기",
        "effects": {
          "experience.moneyHabit": 5,
          "status.happiness": 3,
          "finance.cash": -80,
          "status.fatigue": 4
        },
        "resultText": "직접 행동하며 경험을 쌓았어요."
      },
      {
        "name": "지금 할 수 있는 작은 방법 찾기",
        "effects": {
          "experience.adaptability": 2,
          "status.fatigue": 2
        },
        "resultText": "부담을 나누어 천천히 해결하기로 했어요."
      }
    ]
  },
  {
    "id": "adult4",
    "category": "choice",
    "title": "수리할까 바꿀까",
    "description": "생활용품이 고장 났어요. 오래 쓸 방법을 고민해요.",
    "conditions": {
      "phase": "adult"
    },
    "weight": 1,
    "cooldown": 4,
    "tip": "가계는 소비를 선택해요. 가격뿐 아니라 얼마나 오래 쓸 수 있는지도 생각해 볼 수 있어요.",
    "choices": [
      {
        "name": "시간과 비용을 들여 해결하기",
        "effects": {
          "experience.moneyHabit": 4,
          "experience.technical": 3,
          "finance.cash": -80,
          "status.fatigue": 4
        },
        "resultText": "직접 행동하며 경험을 쌓았어요."
      },
      {
        "name": "지금 할 수 있는 작은 방법 찾기",
        "effects": {
          "experience.adaptability": 2,
          "status.fatigue": 2
        },
        "resultText": "부담을 나누어 천천히 해결하기로 했어요."
      }
    ]
  },
  {
    "id": "adult5",
    "category": "choice",
    "title": "서로 다른 생각",
    "description": "동료와 의견이 달라 대화가 필요해요.",
    "conditions": {
      "phase": "adult"
    },
    "weight": 1,
    "cooldown": 4,
    "tip": "",
    "choices": [
      {
        "name": "시간과 비용을 들여 해결하기",
        "effects": {
          "stats.social": 3,
          "status.relationships": 5,
          "finance.cash": -80,
          "status.fatigue": 4
        },
        "resultText": "직접 행동하며 경험을 쌓았어요."
      },
      {
        "name": "지금 할 수 있는 작은 방법 찾기",
        "effects": {
          "experience.adaptability": 2,
          "status.fatigue": 2
        },
        "resultText": "부담을 나누어 천천히 해결하기로 했어요."
      }
    ]
  }
];
