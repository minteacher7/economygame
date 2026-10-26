Game.data.businessEvents = [
  {
    "id": "responsibleOrder",
    "category": "choice",
    "title": "새로운 거래 제안",
    "description": "해외 가게가 주문을 제안했어요. 품질 약속과 준비 비용을 살펴야 해요.",
    "conditions": {
      "phase": "adult",
      "business.quality": {
        "min": 40
      }
    },
    "weight": 2,
    "cooldown": 5,
    "tip": "무역은 시장을 넓히지만 다른 나라 기업과도 경쟁하게 해요. 품질과 약속을 지키는 일이 중요합니다.",
    "choices": [
      {
        "name": "품질을 준비하고 거래하기",
        "effects": {
          "business.cash": -150,
          "business.reputation": 8
        },
        "delayed": [
          {
            "after": 2,
            "title": "꾸준한 해외 주문",
            "effects": {
              "business.cash": 450
            }
          }
        ],
        "resultText": "기업 자금으로 다음 기회를 준비했어요."
      },
      {
        "name": "국내 손님에게 집중하기",
        "effects": {
          "business.quality": 3
        },
        "resultText": "익숙한 시장에서 신뢰를 쌓았어요."
      }
    ]
  }
];
