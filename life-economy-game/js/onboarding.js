(() => {
  const G = Game;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  G.renderIntroduction = () => `
    <section class="title-screen">
      <div class="title-copy"><p class="chapter-label">1987 — 2026 · 나만의 인생 육성 이야기</p>
        <h1>인생경제</h1><p class="title-subtitle">나의 선택, 우리의 경제</p>
        <p class="title-description">열세 살의 나에게 펼쳐진 마흔 번의 봄.<br>배우고, 일하고, 사랑하는 일상을 만들어 가세요.</p>
      </div>
      <div class="rule-book"><div class="rule-heading"><span>게임 안내</span><span>첫 번째 장</span></div>
        <h2>목표는 ‘나다운 삶’을 만드는 것</h2>
        <p>52세까지 살아가며 행복, 경제적 안정, 건강, 직업 만족, 관계, 사회 기여를 돌아봐요. 가장 좋은 직업이나 하나의 정답은 없어요.</p>
        <ol class="rules">
          <li><b>청소년기 · 13~18세</b><span>학기마다 활동 두 번을 골라요. 경험과 능력이 쌓여요.</span></li>
          <li><b>진로 전환기 · 19~22세</b><span>대학교, 기술, 취업 등의 과정을 고르고 4년 동안 이어 가요.</span></li>
          <li><b>성인기 · 23~52세</b><span>매년 일과 생활, 행사와 투자를 선택해요. 창업이나 재출발에도 도전할 수 있어요.</span></li>
        </ol>
        <p class="rule-note">선택마다 얻는 것과 잃는 것이 있어요. 피로와 지출을 살피세요.<br>실제 경제 사건이 나의 삶에도 찾아와요. 총 46턴, 선택 후 자동저장됩니다.</p>
        <div class="actions"><button id="begin-setup" class="primary">나의 인생 만들기 <span aria-hidden="true">→</span></button>${G.loadGame()?'<button id="load">저장한 인생 이어하기</button>':''}</div>
      </div>
    </section>`;
  G.renderCharacterSetup = () => {
    const u=G.ui,c=u.candidate;
    return `<section class="creation-screen"><div class="creation-heading"><button id="intro" class="quiet">← 게임 안내</button><p class="chapter-label">이야기를 시작하기 전에</p><h1>이 인생의 주인공은, 당신.</h1><p>성, 이름, 성별을 모두 입력해 주세요. 별명을 써도 좋아요.</p></div>
      <div class="creation-layout"><div class="creation-portrait">${G.visuals.character(c,'creation-character')}<p>선택한 모습으로 시작해<br>시간과 함께 성장해요.</p></div>
        <div class="creation-details"><form id="character-form" novalidate>
          <fieldset class="character-name-form"><legend>나의 이름</legend><div class="name-inputs">
            <label for="family-name">성 <span class="required-label">필수</span><input id="family-name" name="familyName" autocomplete="family-name" maxlength="12" placeholder="예: 김" value="${escape(u.nameDraft.familyName)}" required></label>
            <label for="given-name">이름 <span class="required-label">필수</span><input id="given-name" name="givenName" autocomplete="given-name" maxlength="20" placeholder="예: 하늘" value="${escape(u.nameDraft.givenName)}" required></label>
          </div></fieldset>
          <fieldset class="gender-options"><legend>성별 <span class="required-label">필수</span></legend>${[['male','남성'],['female','여성']].map(([value,label])=>`<label><input type="radio" name="gender" value="${value}" ${u.nameDraft.gender===value?'checked':''} required><span>${label}</span></label>`).join('')}</fieldset>
          <p id="setup-error" class="setup-error" role="alert">${escape(u.error)}</p>
          <h2>태어날 때 만난 가능성</h2><div class="origin">${['talents','traits','backgrounds'].map((key,i)=>{const a=G.data[key].find(a=>a.id===c.character[['talent','trait','background'][i]]);return `<article>${G.visuals.icon(['star','compass','leaf'][i])}<small>${['재능','성향','출발환경'][i]}</small><h3>${a.name}</h3><p>${a.description}</p></article>`;}).join('')}</div>
          <div class="actions"><button type="submit" id="start" class="primary">이 인생 시작하기 →</button><button type="button" id="reroll" ${u.rerolls>=2?'disabled':''}>다시 만나기 (${2-u.rerolls}회 남음)</button></div><p class="muted">새 인생을 시작하면 이전 저장 기록이 바뀌어요.</p>
        </form></div>
      </div></section>`;
  };
})();
