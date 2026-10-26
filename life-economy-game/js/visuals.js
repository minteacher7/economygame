/* Local vector artwork: no network requests; character appearance follows saved state. */
(() => {
  const G = Game;
  const drawings = {
    book: '<path d="M12 24Q32 16 48 26Q64 16 84 24V76Q64 68 48 78Q30 68 12 76Z" fill="#fff4d9"/><path d="M48 27V76M22 35L38 38M22 46L38 49M58 38L74 35M58 49L74 46"/>',
    ball: '<circle cx="48" cy="48" r="32" fill="#e9a46e"/><path d="M17 47H79M48 16V80M26 26Q64 48 26 70M70 26Q32 48 70 70"/>',
    people: '<circle cx="33" cy="32" r="13" fill="#edb78d"/><circle cx="68" cy="38" r="12" fill="#c98d6e"/><path d="M10 78V67Q10 48 33 48Q55 48 55 68V78" fill="#84afba"/><path d="M57 78V66Q57 53 70 53Q88 53 88 73V78" fill="#d2ab66"/>',
    art: '<path d="M77 61C91 39 69 14 43 18C10 19 4 70 36 80C52 85 49 61 64 66Q73 70 77 61Z" fill="#eacb91"/><circle cx="31" cy="37" r="5" fill="#d27d64"/><circle cx="49" cy="30" r="5" fill="#7ba396"/><circle cx="66" cy="40" r="5" fill="#789bb7"/><path d="M25 77L68 26" stroke="#fff8e8" stroke-width="9"/>',
    compass: '<circle cx="48" cy="49" r="31" fill="#fff8e7"/><path d="M59 27L53 55L35 71L41 43Z" fill="#df8d71"/><path d="M48 8V16M48 81V88M8 49H16M80 49H88"/>',
    shop: '<path d="M18 42H78V80H18Z" fill="#fff3db"/><path d="M13 42L22 18H74L83 42Z" fill="#89aea2"/><path d="M29 19L25 41M48 19V41M67 19L71 41" stroke="#fff6dd" stroke-width="9"/><path d="M28 56H45V80H28Z" fill="#d9b176"/><path d="M55 56H68V68H55Z" fill="#93b9c2"/>',
    heart: '<path d="M48 78L16 47C-4 22 30 5 48 28C66 5 100 22 80 47Z" fill="#db947f"/><path d="M25 46H37L43 35L52 59L60 46H72" stroke="#fff5e3"/>',
    rest: '<path d="M16 57Q48 42 81 57V79H16Z" fill="#8da99b"/><path d="M16 57V43Q16 36 27 36H69Q80 36 80 44V57" fill="#b7cbb0"/><path d="M29 54V46H50V54" fill="#fff3dd"/><path d="M65 12A16 16 0 1 0 84 31A16 16 0 0 1 65 12Z" fill="#e9bb70"/>',
    tools: '<path d="M20 20L33 18L43 33L34 43L18 32Z" fill="#a2b8b8"/><path d="M35 38L77 80M73 19L80 29L63 46L51 35Z" stroke-width="12"/><path d="M57 42L22 80" stroke="#d7a167" stroke-width="13"/>',
    laptop: '<rect x="18" y="19" width="61" height="46" rx="5" fill="#84a8b0"/><path d="M11 76L18 65H79L86 76Z" fill="#c2d2c4"/><path d="M39 33L29 43L39 53M57 33L67 43L57 53" stroke="#fff6e7"/>',
    leaf: '<path d="M20 71Q7 24 77 16Q87 79 20 71Z" fill="#a5bc87"/><path d="M16 82L63 34M36 61V41M45 51H62"/>',
    wallet: '<rect x="13" y="26" width="70" height="54" rx="9" fill="#d6aa75"/><path d="M18 26L66 14V27" fill="#a2ba91"/><path d="M61 44H85V64H61Z" fill="#fff0d2"/><circle cx="70" cy="54" r="2"/>',
    star: '<path d="M48 12L59 35L85 39L66 58L71 84L48 71L25 84L30 58L11 39L37 35Z" fill="#e4bc6f"/>',
    case: '<rect x="13" y="31" width="70" height="49" rx="7" fill="#9bb6ab"/><path d="M34 30V19H62V30M13 49Q48 68 83 49"/><path d="M43 49H53V62H43Z" fill="#f3d296"/>'
  };
  const keys = {
    study:'book',exercise:'ball',friends:'people',create:'art',explore:'compass',parttime:'shop',volunteer:'heart',rest:'rest',
    university:'book',technical:'tools',employment:'case',exploration:'compass',startup:'shop',
    education:'book',science:'compass',digital:'laptop',culture:'art',commerce:'wallet',health:'heart',
    steady:'case',learn:'book',lead:'people',balance:'rest',family:'people',save:'wallet',community:'heart',hobby:'art',
    advertise:'star',price:'wallet',quality:'star',hire:'people',train:'book',wage:'wallet',safety:'heart',environment:'leaf',research:'tools',export:'compass',reserve:'wallet',
    teacher:'book',developer:'laptop',designer:'art',manufacturing:'tools',cook:'shop',marketing:'people',logistics:'case',
    learning:'book',creativity:'art',fitness:'ball',social:'people',persistence:'star',economySense:'wallet',happiness:'star',fatigue:'rest',relationships:'people'
  };
  G.visuals = {};
  G.visuals.npc=npc=>{
    const i=Number.isInteger(npc.portraitIndex)&&npc.portraitIndex>=0&&npc.portraitIndex<Game.data.npcProfiles.length?npc.portraitIndex:2;
    const extra=Game.data.npcProfiles[i]?.portraitClass||'';
    return `<div class="npc-face-art ${escape(extra)}" style="--npc-x:${i%5*25}%;--npc-y:${Math.floor(i/5)*25}%" role="img" aria-label="${escape(npc.name)}의 얼굴"></div>`;
  };
  G.visuals.icon = (key, className='game-icon') => `<svg class="${className}" viewBox="0 0 96 96" fill="none" stroke="#365550" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${drawings[keys[key] || key] || drawings.star}</svg>`;


  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  G.visuals.portrait=(s,age=s.age)=>{
    const index=Number.isInteger(s.character.appearance)?Math.max(0,Math.min(4,s.character.appearance)):0;
    const row=age<23?0:age<45?1:age<65?2:3;
    const gender=s.character.gender==='female'?'female':'male';
    return `<div class="painted-portrait roster-portrait roster-${gender}" style="--portrait-x:${index*25}%;--portrait-y:${row*100/3}%" role="img" aria-label="${age}세 ${gender==='female'?'여성':'남성'} 캐릭터 ${index+1}"></div>`;
  };
  G.visuals.appearancePicker=s=>{
    if(!['male','female'].includes(s.character.gender))return '<p class="muted">성별을 선택하면 다섯 가지 모습을 고를 수 있어요.</p>';
    return `<fieldset class="appearance-picker"><legend>나의 모습</legend><p>외형은 재능이나 능력에 영향을 주지 않아요.</p><div class="appearance-grid">${Array.from({length:5},(_,i)=>`<button type="button" data-appearance="${i}" aria-pressed="${(s.character.appearance||0)===i}" class="appearance-choice ${(s.character.appearance||0)===i?'selected':''}">${G.visuals.portrait({...s,character:{...s.character,appearance:i}},15)}<span>모습 ${i+1}${(s.character.appearance||0)===i?' ✓':''}</span></button>`).join('')}</div><details class="growth-preview"><summary>이 모습으로 자라면?</summary><div class="growth-grid">${[[15,'청소년'],[30,'성인'],[50,'50대'],[68,'노년']].map(([age,label])=>`<figure>${G.visuals.portrait(s,age)}<figcaption>${label}</figcaption></figure>`).join('')}</div><p>게임은 52세에 마무리돼요. 노년은 미래의 모습 미리보기예요.</p></details></fieldset>`;
  };
  G.visuals.character=(s,mode='portrait')=>{
    const age=s.report?.age||s.age;
    if(!['male','female'].includes(s.character.gender)&&G.ui?.screen==='setup')return `<figure class="character-view ${mode}"><div class="portrait-options">${['male','female'].map(gender=>G.visuals.portrait({...s,character:{...s.character,gender}},15)).join('')}</div><figcaption>성별을 선택하면 나의 모습이 보여요.</figcaption></figure>`;
    const tired=s.status.fatigue>=65||s.status.health<35;
    const message=tired?'잠깐 쉬어 가도 괜찮아.':s.status.happiness>=75?'요즘 나의 하루가 즐거워!':age<19?'나는 어떤 사람이 될까?':s.business?'우리 가게의 내일을 만들어 보자.':'나만의 속도로 자라는 중이야.';
    return `<figure class="character-view ${mode}"><div class="character-scene">${G.visuals.portrait(s,age)}<span class="character-age">${escape(G.characterName(s))} · ${age}세</span></div><figcaption>${message}</figcaption></figure>`;
  };
  const activities=['study','exercise','friends','create','explore','parttime','volunteer','rest'];
  G.visuals.activity=id=>{
    const index=Math.max(0,activities.indexOf(id));
    return `<span class="activity-art painted-activity" style="--activity-x:${index%4*100/3}%;--activity-y:${index<4?0:100}%" aria-hidden="true"></span>`;
  };
})();
