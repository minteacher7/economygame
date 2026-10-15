require('./ui-smoke.cjs');
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const handlers={};
for(const id of ['family-name','given-name','setup-error'])document.getElementById(id).focus=()=>{};
document.addEventListener=(event,fn)=>handlers[event]=fn;
document.querySelector=()=>({focus(){}});
window.scrollTo=()=>{};
Game.ui.screen='intro';Game.ui.nameDraft={familyName:'',givenName:'',gender:''};
vm.runInThisContext(fs.readFileSync('js/main.js','utf8'));
function click(id){handlers.click({preventDefault(){},target:{closest:()=>({id,dataset:{},disabled:false})}});}
function input(id,value){handlers.input({target:{id,value}});}
assert.equal(Game.ui.screen,'intro');
assert(!document.getElementById('app').innerHTML.includes('id="family-name"'));
click('begin-setup');assert.equal(Game.ui.screen,'setup');
const saved=localStorage.getItem('life-economy-save');
for(const [field,value,message] of [[null,null,'성을 입력'],['family-name','  ','성을 입력'],['family-name','김','이름을 입력'],['given-name','하늘','성별을 선택']]){
 if(field)input(field,value);
 click('start');assert.equal(Game.ui.screen,'setup');assert(Game.ui.error.includes(message));assert.equal(localStorage.getItem('life-economy-save'),saved);
}
handlers.change({target:{name:'gender',value:'female'}});click('reroll');
assert.equal(Game.ui.nameDraft.givenName,'하늘');assert.equal(Game.ui.candidate.character.gender,'female');
click('start');assert.equal(Game.ui.screen,'game');assert.equal(Game.characterName(Game.loadGame()),'김하늘');assert.equal(Game.loadGame().character.gender,'female');
const s=Game.state;
const portraits=['male','female'].flatMap(gender=>[13,18,28,40,50].map(age=>Game.visuals.character({...s,age,character:{...s.character,gender}})));
assert.equal(new Set(portraits).size,10);assert(portraits.every(p=>p.includes('painted-portrait')&&!p.includes('avatar-person')));
for(const asset of ['character-atlas-v2.png','activity-atlas.png','town-background.png'])assert(fs.statSync('assets/images/'+asset).size>10000);
const invalid=Game.createNewCharacter();assert.throws(()=>Game.startNewGame(invalid),/성을 입력/);
console.log('PASS: 안내→생성 순서, 공백·미입력 시작 차단, 저장 보호, 다시 뽑기 유지, 이름·성별 복원, 10종 캐릭터 이미지');
