const $ = (id) => document.getElementById(id);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const FORMATS = {
  square: { w: 1080, h: 1080, innerWidth: 990, textHeight: 700 },
  portrait: { w: 1080, h: 1350, innerWidth: 980, textHeight: 950 },
  story: { w: 1080, h: 1920, innerWidth: 964, textHeight: 1450 },
};

const PRESETS = {
  classic: { canvas:'#ffffff', card:'#ffffff', text:'#0f1419', muted:'#536471', radius:0, shadow:0 },
  explica: { canvas:'#dfeee1', card:'#ffffff', text:'#223327', muted:'#667468', radius:32, shadow:34 },
  night: { canvas:'#111814', card:'#17231a', text:'#f5f8f4', muted:'#a6b2a8', radius:30, shadow:44 },
};

const FONT_MAP = {
  x: { css:'Arial,"Helvetica Neue",Helvetica,sans-serif' },
  system: { css:'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif' },
  rounded: { css:'"Arial Rounded MT Bold","Trebuchet MS",Arial,sans-serif' },
  serif: { css:'Georgia,"Times New Roman",serif' },
};

const TXT = {
  'pt-BR': {
    slogan:'IDEIAS CLARAS. POSTS QUE CONECTAM.', autosave:'edição ao vivo', language:'Idioma', newProject:'Novo projeto', downloadAll:'Baixar carrossel',
    create:'Criar', images:'Imagens', preview:'Prévia', export:'Exportar', createTitle:'Sua publicação, sem complicação.',
    createLead:'Defina o formato, perfil e texto. O carrossel é dividido automaticamente quando necessário.', format:'Formato', square:'Quadrado',
    profile:'Perfil', name:'Nome', handle:'Usuário', verified:'Mostrar selo verificado', content:'Conteúdo', text:'Texto', characters:'caracteres', cards:'card(s)',
    time:'Horário', date:'Data', source:'Fonte / dispositivo', appearance:'Aparência', classicHint:'limpo e direto', explicaHint:'verde editorial',
    night:'Noturno', nightHint:'alto contraste', font:'Fonte', fontSize:'Tamanho do texto', advanced:'Ajustes avançados', canvas:'Fundo', cardColor:'Card',
    textColor:'Texto', muted:'Secundário', corners:'Cantos', shadow:'Sombra', manageImages:'Gerenciar imagens', seePreview:'Ver prévia',
    imagesTitle:'Uma imagem para cada card.', imagesLead:'Adicione uma imagem geral ou personalize cada slide do carrossel.', defaultImage:'Imagem padrão',
    defaultImageHint:'Pode aparecer no primeiro card ou em todos.', remove:'Remover', chooseImage:'Escolher imagem', position:'Posição', applyImage:'Aplicar',
    below:'Abaixo do texto', side:'Ao lado do texto', first:'Somente no 1º card', all:'Em todos os cards', carouselCards:'Cards do carrossel',
    carouselImagesHint:'Toque em um card para trocar sua imagem.', previewTitle:'Veja antes de publicar.', downloadCurrent:'Baixar este card', exportTitle:'Pronto para publicar.',
    exportLead:'Escolha a qualidade e baixe um card ou o carrossel completo.', totalCards:'Cards', quality:'Qualidade',
    exportNote:'4K e 8K podem levar mais tempo em celulares com pouca memória.', changeImage:'Trocar imagem', clearImage:'Remover imagem', noImage:'Sem imagem',
    card:'Card', downloaded:'Card baixado.', carouselReady:'Carrossel pronto.', imageAdded:'Imagem adicionada.', imageRemoved:'Imagem removida.',
    resetDone:'Novo projeto criado.', onlyImages:'Use apenas arquivos de imagem.', exportError:'Não foi possível exportar nessa resolução. Tente uma qualidade menor.'
  },
  en: {
    slogan:'CLEAR IDEAS. POSTS THAT CONNECT.', autosave:'live editing', language:'Language', newProject:'New project', downloadAll:'Download carousel',
    create:'Create', images:'Images', preview:'Preview', export:'Export', createTitle:'Your post, without the friction.',
    createLead:'Choose the format, profile and text. The carousel splits automatically when needed.', format:'Format', square:'Square', profile:'Profile',
    name:'Name', handle:'Username', verified:'Show verified badge', content:'Content', text:'Text', characters:'characters', cards:'card(s)', time:'Time',
    date:'Date', source:'Source / device', appearance:'Appearance', classicHint:'clean and direct', explicaHint:'editorial green', night:'Night', nightHint:'high contrast',
    font:'Font', fontSize:'Text size', advanced:'Advanced settings', canvas:'Canvas', cardColor:'Card', textColor:'Text', muted:'Secondary', corners:'Corners',
    shadow:'Shadow', manageImages:'Manage images', seePreview:'See preview', imagesTitle:'One image for every card.', imagesLead:'Add a general image or customize each carousel slide.',
    defaultImage:'Default image', defaultImageHint:'Can appear on the first card or all cards.', remove:'Remove', chooseImage:'Choose image', position:'Position', applyImage:'Apply',
    below:'Below text', side:'Beside text', first:'First card only', all:'All cards', carouselCards:'Carousel cards', carouselImagesHint:'Tap a card to change its image.',
    previewTitle:'See it before you post.', downloadCurrent:'Download this card', exportTitle:'Ready to publish.', exportLead:'Choose quality and download one card or the full carousel.',
    totalCards:'Cards', quality:'Quality', exportNote:'4K and 8K may take longer on phones with limited memory.', changeImage:'Change image', clearImage:'Remove image',
    noImage:'No image', card:'Card', downloaded:'Card downloaded.', carouselReady:'Carousel ready.', imageAdded:'Image added.', imageRemoved:'Image removed.',
    resetDone:'New project created.', onlyImages:'Please use image files only.', exportError:'Could not export at this resolution. Try a lower quality.'
  },
  es:{}, fr:{}, de:{}
};
TXT.es={...TXT['pt-BR'],slogan:'IDEAS CLARAS. POSTS QUE CONECTAN.',language:'Idioma',newProject:'Nuevo proyecto',downloadAll:'Descargar carrusel',create:'Crear',images:'Imágenes',preview:'Vista previa',export:'Exportar',createTitle:'Tu publicación, sin complicaciones.',imagesTitle:'Una imagen para cada tarjeta.',chooseImage:'Elegir imagen',downloadCurrent:'Descargar esta tarjeta',exportTitle:'Listo para publicar.'};
TXT.fr={...TXT.en,slogan:'DES IDÉES CLAIRES. DES POSTS QUI CONNECTENT.',language:'Langue',newProject:'Nouveau projet',downloadAll:'Télécharger le carrousel',create:'Créer',images:'Images',preview:'Aperçu',export:'Exporter',createTitle:'Votre publication, sans complication.',chooseImage:'Choisir une image',downloadCurrent:'Télécharger cette carte'};
TXT.de={...TXT.en,slogan:'KLARE IDEEN. POSTS, DIE VERBINDEN.',language:'Sprache',newProject:'Neues Projekt',downloadAll:'Karussell herunterladen',create:'Erstellen',images:'Bilder',preview:'Vorschau',export:'Exportieren',createTitle:'Dein Beitrag, ohne Umwege.',chooseImage:'Bild auswählen',downloadCurrent:'Diese Karte herunterladen'};

const state = {
  format:'square', view:'create', desktopEditorView:'create', lang:'pt-BR', current:0,
  slides:[], avatarUrl:'', defaultImage:null, slideImages:{}, targetCard:null, preset:'classic', rebuildTimer:null,
};

function t(key){ return (TXT[state.lang]||TXT['pt-BR'])[key] || TXT['pt-BR'][key] || key; }
function isMobile(){ return window.matchMedia('(max-width:900px)').matches; }
function toast(message){ const el=$('toast'); if(!el)return; el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),1800); }
function safeObjectUrl(file){ return URL.createObjectURL(file); }
function imageItem(file){ return {name:file.name,url:safeObjectUrl(file)}; }
function revoke(item){ if(item?.url) URL.revokeObjectURL(item.url); }
function initials(){ return ($('nameInput').value||'Perfil').trim().split(/\s+/).slice(0,2).map(x=>x[0]||'').join('').toUpperCase()||'P'; }

let textMeasurer=null;
function getTextMeasurer(){
  if(textMeasurer && textMeasurer.isConnected) return textMeasurer;
  textMeasurer=document.createElement('div');
  textMeasurer.className='text-measurer';
  textMeasurer.setAttribute('aria-hidden','true');
  document.body.appendChild(textMeasurer);
  return textMeasurer;
}
function selectedFontCss(){
  return (FONT_MAP[$('fontSelect').value]||FONT_MAP.x).css;
}
function getImage(index){
  if(Object.prototype.hasOwnProperty.call(state.slideImages,index)) return state.slideImages[index];
  if(!state.defaultImage) return null;
  return $('defaultImageMode').value==='all' || index===0 ? state.defaultImage : null;
}
function layoutFor(index){
  const cfg=FORMATS[state.format];
  const size=Number($('fontSizeInput').value||57);
  const image=Boolean(getImage(index));
  const side=image && $('imageLayoutSelect').value==='side';
  const gap=side?30:0;
  const textWidth=side ? Math.floor((cfg.innerWidth-gap)*1.13/2) : cfg.innerWidth;
  const imageReserve=image&&!side ? ({square:320,portrait:420,story:640}[state.format]||320) : 0;
  const lineRatio=state.format==='story'?1.20:1.18;
  const maxHeight=Math.max(size*lineRatio*3,cfg.textHeight-imageReserve-(image&&!side?25:0));
  return {
    width:Math.max(220,textWidth),
    maxHeight:Math.max(180,maxHeight),
    lineRatio,
    maxLines:Math.max(3,Math.floor(maxHeight/(size*lineRatio))),
    image,side
  };
}
function measureTextHeight(text,index){
  const box=getTextMeasurer();
  const layout=layoutFor(index);
  const size=Number($('fontSizeInput').value||57);
  box.style.width=`${layout.width}px`;
  box.style.fontFamily=selectedFontCss();
  box.style.fontSize=`${size}px`;
  box.style.fontWeight='400';
  box.style.lineHeight=String(layout.lineRatio);
  box.style.letterSpacing='-.015em';
  box.textContent=String(text||'') || '\u200b';
  return {height:box.scrollHeight,layout};
}
function textFits(text,index){
  const {height,layout}=measureTextHeight(text,index);
  return height<=layout.maxHeight+2;
}
function buildBreakpoints(text){
  const points=[];
  const add=(pos,priority)=>{if(pos>0&&pos<=text.length)points.push({pos,priority});};
  let m;
  const paragraph=/\n{2,}/g; while((m=paragraph.exec(text))) add(m.index+m[0].length,5);
  const newline=/\n/g; while((m=newline.exec(text))) add(m.index+1,4);
  const sentence=/[.!?…]+[\]\)\}"'»”’]*\s+/gu; while((m=sentence.exec(text))) add(m.index+m[0].length,3);
  const clause=/[;:]\s+/g; while((m=clause.exec(text))) add(m.index+m[0].length,2);
  const whitespace=/\s+/g; while((m=whitespace.exec(text))) add(m.index+m[0].length,1);
  add(text.length,6);
  const map=new Map();
  for(const p of points) map.set(p.pos,Math.max(map.get(p.pos)||0,p.priority));
  return [...map.entries()].map(([pos,priority])=>({pos,priority})).sort((a,b)=>a.pos-b.pos);
}
function hardCut(text,index){
  const boundaries=[];
  let pos=0;
  for(const char of Array.from(text)){pos+=char.length;boundaries.push(pos);}
  let lo=0,hi=boundaries.length-1,best=Math.min(text.length,1);
  while(lo<=hi){
    const mid=(lo+hi)>>1;
    const cut=boundaries[mid];
    if(textFits(text.slice(0,cut),index)){best=cut;lo=mid+1;}else hi=mid-1;
  }
  return Math.max(1,best);
}
function chooseCut(text,index){
  if(textFits(text,index)) return text.length;
  const points=buildBreakpoints(text);
  let lo=0,hi=points.length-1,bestIndex=-1;
  while(lo<=hi){
    const mid=(lo+hi)>>1;
    if(textFits(text.slice(0,points[mid].pos),index)){bestIndex=mid;lo=mid+1;}else hi=mid-1;
  }
  if(bestIndex<0) return hardCut(text,index);
  const maxPoint=points[bestIndex];
  const floor=maxPoint.pos*.78;
  let preferred=maxPoint;
  for(let i=bestIndex;i>=0;i--){
    const p=points[i];
    if(p.pos<floor) break;
    if(p.priority>preferred.priority || (p.priority===preferred.priority&&p.pos>preferred.pos)) preferred=p;
  }
  return preferred.pos;
}
function splitText(){
  let rest=String($('bodyInput').value||'').replace(/\r\n?/g,'\n').trim();
  if(!rest) return [''];
  const slides=[];
  let guard=0;
  while(rest && guard++<120){
    const cut=chooseCut(rest,slides.length);
    const chunk=rest.slice(0,cut).trimEnd();
    const next=rest.slice(cut).replace(/^\s+/u,'');
    if(!chunk){
      const safe=hardCut(rest,slides.length);
      slides.push(rest.slice(0,safe));
      rest=rest.slice(safe).replace(/^\s+/u,'');
      continue;
    }
    slides.push(chunk);
    if(!next || next===rest) break;
    rest=next;
  }
  if(rest && guard>=120) slides.push(rest);
  return slides.length?slides:[''];
}

function shadowCss(v){ v=Number(v||0); return v?`0 ${Math.round(8+v*.35)}px ${Math.round(22+v*.9)}px rgba(24,38,27,${Math.min(.24,.05+v/360)})`:'none'; }
function applyVisuals(){
  const c=$('socialCanvas');
  c.style.setProperty('--canvas',$('canvasColor').value);
  c.style.setProperty('--card',$('cardColor').value);
  c.style.setProperty('--text',$('textColor').value);
  c.style.setProperty('--muted',$('mutedColor').value);
  c.style.setProperty('--radius',`${$('radiusInput').value}px`);
  c.style.setProperty('--shadow',shadowCss($('shadowInput').value));
  c.style.setProperty('--post-font',selectedFontCss());
}
function renderText(el,text){
  el.replaceChildren();
  const lines=String(text||'').split('\n');
  lines.forEach((line,li)=>{
    line.split(/(\s+)/).forEach(tok=>{
      if(/^[@#][\p{L}\p{N}_À-ÿ]+$/u.test(tok.trim())){
        const s=document.createElement('span'); s.className='tag'; s.textContent=tok; el.appendChild(s);
      }else el.appendChild(document.createTextNode(tok));
    });
    if(li<lines.length-1) el.appendChild(document.createElement('br'));
  });
}
function renderAvatar(){
  const ini=initials();
  $('avatarEditor').querySelector('b').textContent=ini;
  $('previewAvatar').querySelector('span').textContent=ini;
  const img=$('previewAvatarImg');
  if(state.avatarUrl){
    img.src=state.avatarUrl; img.style.display='block'; $('previewAvatar').querySelector('span').style.display='none';
    $('avatarEditor').style.backgroundImage=`url("${state.avatarUrl}")`; $('avatarEditor').style.backgroundSize='cover'; $('avatarEditor').style.backgroundPosition='center'; $('avatarEditor').querySelector('b').style.opacity='0';
  }else{
    img.style.display='none'; $('previewAvatar').querySelector('span').style.display='grid'; $('avatarEditor').style.backgroundImage=''; $('avatarEditor').querySelector('b').style.opacity='1';
  }
}
function renderSlide(){
  const slide=state.slides[state.current]||{content:'',image:null};
  const c=$('socialCanvas'); c.className=`social-canvas format-${state.format}`; applyVisuals();
  $('previewName').textContent=$('nameInput').value.trim()||'Seu nome';
  $('previewHandle').textContent=$('handleInput').value.trim()||'@usuario';
  $('verifiedBadge').style.display=$('verifiedInput').checked?'inline-grid':'none';
  $('previewTime').textContent=$('timeInput').value; $('previewDate').textContent=$('dateInput').value; $('previewSource').textContent=$('sourceInput').value;
  renderText($('previewBody'),slide.content); $('previewBody').style.fontSize=`${$('fontSizeInput').value}px`; renderAvatar();
  const main=$('postMain'),frame=$('mediaFrame'),img=$('previewImage'); main.className='post-main'; frame.classList.add('hidden');
  if(slide.image){ img.src=slide.image.url; frame.classList.remove('hidden'); if($('imageLayoutSelect').value==='side') main.classList.add('side'); }
  $('pagerText').textContent=`${state.current+1} / ${state.slides.length}`;
  $('slideNumber').textContent=state.slides.length>1?`${state.current+1} / ${state.slides.length}`:'';
  $$('.mini-thumb').forEach((x,i)=>x.classList.toggle('active',i===state.current)); fitCanvas();
}
function renderManager(){
  const root=$('cardsManager'); root.replaceChildren();
  state.slides.forEach((slide,i)=>{
    const row=document.createElement('article'); row.className='manager-card'; row.dataset.index=i;
    const thumb=document.createElement('div'); thumb.className='manager-thumb'; const image=getImage(i);
    if(image){ const im=document.createElement('img'); im.src=image.url; im.alt=''; thumb.appendChild(im); }
    else { const p=document.createElement('span'); p.className='placeholder'; p.textContent='▧'; thumb.appendChild(p); }
    const copy=document.createElement('div'); copy.className='manager-copy'; const snip=(slide.content||'').replace(/\s+/g,' ').slice(0,82);
    const strong=document.createElement('strong'); strong.textContent=`${t('card')} ${i+1}`; const small=document.createElement('small'); small.textContent=snip||t('noImage'); copy.append(strong,small);
    const acts=document.createElement('div'); acts.className='manager-actions';
    const change=document.createElement('button'); change.className='mini-btn primary'; change.type='button'; change.textContent=t('changeImage'); change.addEventListener('click',(e)=>{e.stopPropagation();state.targetCard=i;$('cardImageInput').click();});
    const clear=document.createElement('button'); clear.className='mini-btn'; clear.type='button'; clear.textContent=t('clearImage'); clear.addEventListener('click',(e)=>{e.stopPropagation();if(state.slideImages[i])revoke(state.slideImages[i]);state.slideImages[i]=null;rebuildNow();toast(t('imageRemoved'));});
    acts.append(change,clear); row.append(thumb,copy,acts);
    row.addEventListener('click',()=>{state.current=i;setView('preview');}); root.appendChild(row);
  });
}
function renderThumbs(){
  const root=$('miniThumbs'); root.replaceChildren();
  state.slides.forEach((_,i)=>{ const b=document.createElement('button'); b.type='button'; b.className=`mini-thumb${i===state.current?' active':''}`; b.textContent=String(i+1).padStart(2,'0'); b.addEventListener('click',()=>{state.current=i;renderSlide();}); root.appendChild(b); });
}
function updateCapacityHint(){
  const el=$('capacityHint'); if(!el)return;
  const {maxLines}=layoutFor(state.current||0); el.textContent=`≈ ${maxLines} linhas úteis por card neste formato`;
}
function rebuildNow(){
  const texts=splitText();
  state.slides=texts.map((content,i)=>({content,image:getImage(i)}));
  state.current=Math.max(0,Math.min(state.current,state.slides.length-1));
  $('charCount').textContent=$('bodyInput').value.length; $('slideEstimate').textContent=state.slides.length;
  $('slideCountBadge').textContent=`${state.slides.length} ${state.slides.length===1?'card':'cards'}`;
  $('managerCount').textContent=state.slides.length; $('exportCards').textContent=state.slides.length;
  updateCapacityHint(); renderManager(); renderThumbs(); renderSlide(); updateExportInfo();
}
function scheduleRebuild(delay=55){ clearTimeout(state.rebuildTimer); state.rebuildTimer=setTimeout(rebuildNow,delay); }
function fitCanvas(){
  requestAnimationFrame(()=>{ const stage=$('previewStage'),wrap=$('canvasWrap'),canvas=$('socialCanvas'); if(!stage||!wrap||!canvas)return; const aw=Math.max(100,stage.clientWidth-20),ah=Math.max(100,stage.clientHeight-20); const scale=Math.min(aw/canvas.offsetWidth,ah/canvas.offsetHeight,1); wrap.style.width=`${canvas.offsetWidth*scale}px`; wrap.style.height=`${canvas.offsetHeight*scale}px`; canvas.style.transform=`scale(${scale})`; });
}

function setView(view){
  state.view=view;
  if(isMobile()) $$('[data-view-panel]').forEach(el=>el.classList.toggle('active',el.dataset.viewPanel===view));
  else{
    if(view!=='preview') state.desktopEditorView=view;
    $$('[data-view-panel]').forEach(el=>{ const panel=el.dataset.viewPanel; if(panel==='preview') el.classList.add('active'); else el.classList.toggle('active',panel===state.desktopEditorView); });
  }
  $$('[data-view],[data-mobile-view]').forEach(el=>{const v=el.dataset.view||el.dataset.mobileView;if(v)el.classList.toggle('active',v===view);});
  if(view==='preview'||!isMobile()) setTimeout(fitCanvas,30); if(view==='images')renderManager(); if(view==='export')updateExportInfo(); if(isMobile())window.scrollTo({top:0,behavior:'smooth'});
}
function qualityScale(){
  const cfg=FORMATS[state.format]; const value=$('qualitySelect').value;
  if(value==='native') return 1;
  const maxSide=Number(value||0); return maxSide>0 ? maxSide/Math.max(cfg.w,cfg.h) : 1;
}
function updateExportInfo(){
  const cfg=FORMATS[state.format],scale=qualityScale(); $('exportFormat').textContent=`${cfg.w} × ${cfg.h}`; $('qualityHint').textContent=`${Math.round(cfg.w*scale)} × ${Math.round(cfg.h*scale)} px`;
}
function applyPreset(name){
  const p=PRESETS[name]; if(!p)return; state.preset=name; $('canvasColor').value=p.canvas; $('cardColor').value=p.card; $('textColor').value=p.text; $('mutedColor').value=p.muted; $('radiusInput').value=p.radius; $('shadowInput').value=p.shadow; $$('.preset').forEach(x=>x.classList.toggle('active',x.dataset.preset===name)); rebuildNow();
}
function setLanguage(lang){ state.lang=lang; document.documentElement.lang=lang; $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n)); $$('[data-i18n-option]').forEach(el=>el.textContent=t(el.dataset.i18nOption)); renderManager(); }
async function ensureSelectedFont(){ if(document.fonts?.ready) await document.fonts.ready; }
async function renderPng(index){
  const prev=state.current; state.current=index; renderSlide(); await ensureSelectedFont(); if(document.fonts?.ready)await document.fonts.ready; await new Promise(r=>setTimeout(r,80));
  const cfg=FORMATS[state.format],scale=qualityScale();
  try{
    const canvas=await html2canvas($('socialCanvas'),{scale,useCORS:true,allowTaint:true,backgroundColor:null,logging:false,width:cfg.w,height:cfg.h,scrollX:0,scrollY:0});
    state.current=prev; renderSlide(); return await new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('blob')),'image/png',1));
  }catch(err){ state.current=prev; renderSlide(); throw err; }
}
function downloadBlob(blob,name){ const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000); }
function crc32(bytes){let crc=-1;for(let i=0;i<bytes.length;i++){crc^=bytes[i];for(let b=0;b<8;b++)crc=(crc>>>1)^((crc&1)?0xEDB88320:0)}return(crc^-1)>>>0}
const u16=n=>[n&255,(n>>>8)&255],u32=n=>[n&255,(n>>>8)&255,(n>>>16)&255,(n>>>24)&255];
async function makeZip(files){ const enc=new TextEncoder(),parts=[],central=[];let offset=0;for(const f of files){const data=new Uint8Array(await f.blob.arrayBuffer()),name=enc.encode(f.name),crc=crc32(data);const local=new Uint8Array([80,75,3,4,20,0,0,0,0,0,0,0,0,0,...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),0,0,...name]);parts.push(local,data);central.push(new Uint8Array([80,75,1,2,20,0,20,0,0,0,0,0,0,0,0,0,...u32(crc),...u32(data.length),...u32(data.length),...u16(name.length),0,0,0,0,0,0,0,0,0,0,0,0,...u32(offset),...name]));offset+=local.length+data.length}const size=central.reduce((s,p)=>s+p.length,0),end=new Uint8Array([80,75,5,6,0,0,0,0,...u16(files.length),...u16(files.length),...u32(size),...u32(offset),0,0]);return new Blob([...parts,...central,end],{type:'application/zip'}); }
async function downloadCurrent(){ try{ const b=await renderPng(state.current); downloadBlob(b,`explica-card-${String(state.current+1).padStart(2,'0')}.png`); toast(t('downloaded')); }catch(_e){ toast(t('exportError')); } }
async function downloadAll(){ const btns=[$('downloadAllBtn'),$('downloadAllTopBtn')].filter(Boolean); btns.forEach(b=>b.disabled=true); try{ const files=[]; for(let i=0;i<state.slides.length;i++) files.push({name:`card-${String(i+1).padStart(2,'0')}.png`,blob:await renderPng(i)}); downloadBlob(await makeZip(files),'explica-carrossel.zip'); toast(t('carouselReady')); }catch(_e){toast(t('exportError'));} finally{btns.forEach(b=>b.disabled=false);} }
function reset(){
  if(state.avatarUrl)URL.revokeObjectURL(state.avatarUrl); revoke(state.defaultImage); Object.values(state.slideImages).forEach(revoke);
  state.avatarUrl='';state.defaultImage=null;state.slideImages={};state.current=0;state.format='square';
  $('nameInput').value='Marcos Adriano'; $('handleInput').value='@explicamarcos'; $('bodyInput').value='Você conhece a Micron Technology?\n\nUma gigante dos semicondutores que está revolucionando o mercado de memória! 💾\n\nA Micron é pioneira em DRAM e NAND, essenciais para PCs, smartphones e muito mais!\n\nQuais produtos você não vive sem?';
  $('timeInput').value='10:56 PM'; $('dateInput').value='Jun 26, 2026'; $('sourceInput').value='Nokia Tijolão'; $('verifiedInput').checked=true;
  $('fontSelect').value='x'; $('fontSizeInput').value=57; $('fontSizeValue').textContent='57'; $('defaultImageName').textContent='PNG, JPG ou WEBP'; $('defaultImageInput').value=''; $('avatarInput').value=''; $('defaultImageMode').value='first'; $('imageLayoutSelect').value='below';
  $$('.format-btn').forEach(x=>x.classList.toggle('active',x.dataset.format==='square')); applyPreset('classic'); setView('create'); toast(t('resetDone'));
}

function bindLiveInput(id){
  const el=$(id); if(!el)return;
  const eventName=(el.type==='checkbox'||el.tagName==='SELECT')?'change':'input';
  el.addEventListener(eventName,async()=>{
    if(id==='fontSizeInput') $('fontSizeValue').textContent=el.value;
    if(id==='fontSelect'){ rebuildNow(); }
    else if(id==='bodyInput') scheduleRebuild(60);
    else rebuildNow();
  });
}
['nameInput','handleInput','bodyInput','timeInput','dateInput','sourceInput','verifiedInput','fontSelect','fontSizeInput','canvasColor','cardColor','textColor','mutedColor','radiusInput','shadowInput','defaultImageMode','imageLayoutSelect'].forEach(bindLiveInput);

$$('.format-btn').forEach(btn=>btn.addEventListener('click',()=>{state.format=btn.dataset.format;state.current=0;$$('.format-btn').forEach(x=>x.classList.toggle('active',x===btn));rebuildNow();}));
$$('.preset').forEach(btn=>btn.addEventListener('click',()=>applyPreset(btn.dataset.preset)));
$$('[data-collapse]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.section-card').classList.toggle('collapsed')));
$$('[data-view],[data-mobile-view]').forEach(btn=>btn.addEventListener('click',()=>setView(btn.dataset.view||btn.dataset.mobileView)));
$('avatarInput').addEventListener('change',e=>{const f=e.target.files?.[0];if(!f)return;if(!f.type.startsWith('image/'))return toast(t('onlyImages'));if(state.avatarUrl)URL.revokeObjectURL(state.avatarUrl);state.avatarUrl=safeObjectUrl(f);renderSlide();});
$('defaultImageInput').addEventListener('change',e=>{const f=e.target.files?.[0];if(!f)return;if(!f.type.startsWith('image/'))return toast(t('onlyImages'));revoke(state.defaultImage);state.defaultImage=imageItem(f);$('defaultImageName').textContent=f.name;rebuildNow();toast(t('imageAdded'));});
$('removeDefaultImageBtn').addEventListener('click',()=>{revoke(state.defaultImage);state.defaultImage=null;$('defaultImageInput').value='';$('defaultImageName').textContent='PNG, JPG ou WEBP';rebuildNow();toast(t('imageRemoved'));});
$('cardImageInput').addEventListener('change',e=>{const f=e.target.files?.[0];if(!f||state.targetCard===null)return;if(!f.type.startsWith('image/'))return toast(t('onlyImages'));if(state.slideImages[state.targetCard])revoke(state.slideImages[state.targetCard]);state.slideImages[state.targetCard]=imageItem(f);e.target.value='';rebuildNow();toast(t('imageAdded'));});
$('prevBtn').addEventListener('click',()=>{state.current=(state.current-1+state.slides.length)%state.slides.length;renderSlide();});
$('nextBtn').addEventListener('click',()=>{state.current=(state.current+1)%state.slides.length;renderSlide();});
$('downloadCurrentBtn').addEventListener('click',downloadCurrent); $('downloadCurrentExportBtn').addEventListener('click',downloadCurrent); $('downloadAllBtn').addEventListener('click',downloadAll); $('downloadAllTopBtn').addEventListener('click',downloadAll); $('resetBtn').addEventListener('click',reset);
$('qualitySelect').addEventListener('change',updateExportInfo); $('languageSelect').addEventListener('change',e=>setLanguage(e.target.value));
window.addEventListener('resize',()=>{setView(state.view);fitCanvas();});

window.ExplicaStudio={version:'14.0.0',rebuild:rebuildNow,getSlides:()=>state.slides.map(s=>s.content),getState:()=>({format:state.format,current:state.current,cards:state.slides.length,font:$('fontSelect').value,fontSize:Number($('fontSizeInput').value)})};
setLanguage('pt-BR'); applyPreset('classic'); rebuildNow(); setView('create');
if(document.fonts?.ready) document.fonts.ready.then(()=>{rebuildNow();fitCanvas();});
