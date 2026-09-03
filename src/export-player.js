// Exported tours load their own bundled styles.css first, then this file on
// top of it, so a design change can reach already-published tours without a
// re-export. The version is pinned per export: old tours keep the version they
// shipped with, and anything structural gets a new one rather than editing v1.
// A tour whose copy fails to load must still render correctly, so styles.css
// always carries the complete design and this layer only adjusts it.
export const playerThemeVersion = 'v1'
export const playerThemeUrl = `https://showround.app/player/${playerThemeVersion}/theme.css`

export const playerHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#f17022">
  <title>Showround Tour</title>
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="${playerThemeUrl}">
</head>
<body>
  <header>
    <div class="brand"><i class="brand-mark"><svg class="orbit-mark" viewBox="0 0 40 40" aria-hidden="true"><g transform="rotate(-15 20 20)"><path class="orbit-arc" d="M29.83 13.12A12 12 0 1 0 20 32"/><path class="orbit-head" d="M19.5 26.3 27.6 32 19.5 37.7Z"/></g><circle class="orbit-core" cx="20" cy="20" r="3.6"/></svg></i><span class="brand-lockup"><span class="brand-name">SHOW<b>ROUND</b></span><span class="brand-by">by Chaos Created</span></span></div>
    <h1 id="tour-name">360° Tour</h1>
    <select id="scene-picker" aria-label="Choose scene"></select>
  </header>
  <main id="viewer">
    <div id="hotspots"></div>
    <div id="loading">Loading tour…</div>
    <div class="hint">Drag to look around · Scroll to zoom</div>
  </main>
  <footer>
    <button id="play" aria-label="Play or pause">▶</button>
    <span id="current">00:00</span>
    <input id="seek" type="range" min="0" max="1000" value="0" aria-label="Video position">
    <span id="duration">00:00</span>
  </footer>
  <script type="module" src="./player.js"></script>
</body>
</html>`

const embedStyles = `html,body{height:100%}.visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}body.embed{background:#0e1112}body.embed #viewer{position:relative;height:100%;width:100%;overflow:hidden}.embed-scene{position:absolute;top:12px;right:12px;z-index:6}.embed-scene select{width:auto;max-width:230px;height:auto;padding:8px 11px;border:1px solid #ffffff3d;border-radius:9px;background:#101817d1;color:#fff;font-size:11px;cursor:pointer;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.embed-scene select option{color:#171b1c;background:#fff}.embed-transport{position:absolute;left:14px;right:14px;bottom:44px;z-index:6;display:grid;grid-template-columns:30px 40px 1fr 40px;gap:10px;align-items:center;padding:8px 13px;border-radius:26px;background:#101817bf;color:#e7edea;font-size:10px;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.embed-transport button{width:28px;height:28px;padding:0;border:0;border-radius:50%;background:var(--orange);color:#171b1c;font-size:11px;cursor:pointer}body.embed.still .embed-transport{display:none}.embed-credit{position:absolute;right:12px;bottom:12px;z-index:6;padding:6px 11px;border-radius:20px;background:#101817bf;color:#fff;font-size:10px;text-decoration:none;opacity:.9;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.embed-credit:hover{opacity:1;text-decoration:underline}body.embed .hint{left:14px;bottom:14px;transform:none}body.embed.still .hint{bottom:14px}@media (max-width:520px){.embed-credit{left:12px;right:auto}body.embed .hint{display:none}}`

export const playerStyles = `@import url('https://fonts.googleapis.com/css2?family=Bungee&display=swap');:root{font-family:Arial,sans-serif;color:#171b1c;background:#0e1112;--orange:#f17022;--aqua:#62c2cc;--ice:#e4f6f8;--lime:#eeff66}*{box-sizing:border-box}body{margin:0;overflow:hidden}header{height:64px;padding:0 22px;display:grid;grid-template-columns:180px 1fr 180px;align-items:center;background:#fff}header h1{text-align:center;font-size:16px;margin:0}.brand{display:flex;align-items:center}.brand-mark{display:inline-grid;place-items:center;width:36px;height:36px;margin-right:8px;border-radius:50%;background:var(--orange);flex:none}.brand-mark svg{width:33px;height:33px;stroke-linecap:round;stroke-linejoin:round}.brand-lockup{display:flex;flex-direction:column;gap:2px}.brand-name{font-family:'Bungee','Arial Black',Impact,sans-serif;font-size:15px;font-weight:400;letter-spacing:-.3px;text-transform:uppercase;line-height:1}.brand-by{font-size:9px;font-weight:700;color:#8b9491;line-height:1}.orbit-arc{fill:none;stroke:#fff;stroke-width:5.5}.orbit-head,.orbit-core{fill:#fff;stroke:none}.brand-name b{color:var(--orange);font-weight:400}select{width:100%;padding:8px;border:1px solid #dcebed;border-radius:7px;background:#fff}main{position:relative;height:calc(100vh - 120px);overflow:hidden}canvas{width:100%;height:100%;display:block;cursor:grab}canvas:active{cursor:grabbing}#hotspots{position:absolute;inset:0;overflow:hidden;pointer-events:none}.hotspot{position:absolute;top:0;left:0;border:0;padding:0;background:none;display:flex;align-items:center;pointer-events:auto;cursor:pointer;transition:opacity .15s}.hotspot.hidden{opacity:0;pointer-events:none}.hotspot>i{position:relative;z-index:2;width:42px;height:42px;display:grid;place-items:center;transform:translate(-50%,-50%);border:3px solid #fff;border-radius:50%;background:var(--lime);color:#171b1c;font-style:normal;box-shadow:0 5px 18px #0007}.pin-icon{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.hotspot.info>i{background:var(--aqua)}.card{transform:translate(-16px,-50%);min-width:140px;max-width:260px;padding:8px 12px 8px 20px;border-radius:0 8px 8px 0;background:#17201ee8;color:#fff;text-align:left;box-shadow:0 5px 18px #0005}.card strong{display:block;font-size:12px}.card p{display:none;margin:6px 0 0;color:#dce8e3;font-size:10px;line-height:1.45}.info:hover .card p,.info.open .card p{display:block}.link .card{opacity:0;transition:.15s}.link:hover .card{opacity:1}#loading{position:absolute;inset:0;display:grid;place-items:center;background:#16201d;color:#fff}.hint{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);padding:7px 12px;border-radius:20px;background:#101817cc;color:#fff;font-size:10px;pointer-events:none}footer{height:56px;padding:0 24px;display:grid;grid-template-columns:34px 42px 1fr 42px;gap:10px;align-items:center;background:#fff;color:#6d7773;font-size:10px}footer button{width:32px;height:32px;border:0;border-radius:50%;background:var(--orange);cursor:pointer}body.still footer{display:none}body.still main{height:calc(100vh - 64px)}input[type=range]{accent-color:var(--orange)}.error{color:#ff9c76}` + embedStyles


export const embedHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#f17022">
  <title>Showround Tour</title>
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="${playerThemeUrl}">
</head>
<body class="embed">
  <h1 id="tour-name" class="visually-hidden">360° Tour</h1>
  <main id="viewer">
    <div id="hotspots"></div>
    <div id="loading">Loading tour…</div>
    <div class="embed-scene"><select id="scene-picker" aria-label="Choose scene"></select></div>
    <div class="embed-transport">
      <button id="play" aria-label="Play or pause">▶</button>
      <span id="current">00:00</span>
      <input id="seek" type="range" min="0" max="1000" value="0" aria-label="Video position">
      <span id="duration">00:00</span>
    </div>
    <div class="hint">Drag to look around</div>
    <a class="embed-credit" href="https://showround.app" target="_blank" rel="noopener">Create your own virtual tours at showround.app</a>
  </main>
  <script type="module" src="./player.js"><\/script>
</body>
</html>`

export const playerScript = `import * as THREE from './three.module.js';

const PIN_ICONS = __PIN_ICONS__;
const pinIcon=(name,fallback)=>'<svg class="pin-icon" viewBox="0 0 24 24" aria-hidden="true">'+(PIN_ICONS[name]||PIN_ICONS[fallback]||PIN_ICONS.arrow||'')+'</svg>';

const viewer=document.querySelector('#viewer'),hotspotLayer=document.querySelector('#hotspots');
const video=document.createElement('video');
video.playsInline=true;video.preload='metadata';
const scene3d=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(72,1,.1,1100);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
viewer.prepend(renderer.domElement);
const videoTexture=new THREE.VideoTexture(video);
videoTexture.colorSpace=THREE.SRGBColorSpace;
const material=new THREE.MeshBasicMaterial({map:videoTexture});
const photoTextures=new Map();
const geometry=new THREE.SphereGeometry(500,60,40);geometry.scale(-1,1,1);
scene3d.add(new THREE.Mesh(geometry,material));
let tour,currentScene,longitude=0,latitude=0,dragging=false,startX=0,startY=0,startLong=0,startLat=0;

const formatTime=(seconds=0)=>{if(!Number.isFinite(seconds))return'00:00';return String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(Math.floor(seconds%60)).padStart(2,'0')};
const escapeHtml=value=>{const node=document.createElement('span');node.textContent=value;return node.innerHTML};

async function loadTour(){
  try{
    tour=await fetch('./tour.json').then(response=>{if(!response.ok)throw new Error('Tour data could not be loaded');return response.json()});
    document.title=tour.name+' — Showround';
    document.querySelector('#tour-name').textContent=tour.name;
    const picker=document.querySelector('#scene-picker');
    picker.innerHTML=tour.scenes.map(scene=>'<option value="'+scene.id+'">'+escapeHtml(scene.name)+'</option>').join('');
    picker.addEventListener('change',()=>loadScene(picker.value));
    loadScene(tour.entrySceneId);
  }catch(error){
    const loading=document.querySelector('#loading');loading.textContent=error.message;loading.classList.add('error');
  }
}

function loadScene(id){
  currentScene=tour.scenes.find(scene=>scene.id===id);
  if(!currentScene)return;
  const source=currentScene.src||currentScene.video;
  const still=currentScene.kind==='photo';
  longitude=0;latitude=0;
  document.querySelector('#scene-picker').value=id;
  renderHotspots();
  document.body.classList.toggle('still',still);
  const loading=document.querySelector('#loading');
  loading.textContent='Loading scene\u2026';loading.classList.remove('error');loading.style.display='grid';
  if(still){video.pause();showPhoto(currentScene,source);return}
  material.map=videoTexture;material.needsUpdate=true;
  video.pause();video.src=source;video.load();
  video.addEventListener('canplay',()=>{loading.style.display='none';video.play().catch(()=>{})},{once:true});
}

function showPhoto(target,source){
  const loading=document.querySelector('#loading');
  const show=photoTexture=>{if(currentScene!==target)return;material.map=photoTexture;material.needsUpdate=true;loading.style.display='none'};
  const cached=photoTextures.get(target.id);
  if(cached){show(cached);return}
  const image=new Image();
  image.addEventListener('load',()=>{
    let drawn=image;
    const limit=renderer.capabilities.maxTextureSize,largest=Math.max(image.naturalWidth,image.naturalHeight);
    if(limit&&largest>limit){
      const scale=limit/largest,canvas=document.createElement('canvas');
      canvas.width=Math.round(image.naturalWidth*scale);canvas.height=Math.round(image.naturalHeight*scale);
      canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);drawn=canvas;
    }
    const photoTexture=new THREE.Texture(drawn);
    photoTexture.colorSpace=THREE.SRGBColorSpace;photoTexture.needsUpdate=true;
    photoTextures.set(target.id,photoTexture);show(photoTexture);
  },{once:true});
  image.addEventListener('error',()=>{if(currentScene!==target)return;loading.textContent='This photo could not be loaded';loading.classList.add('error')},{once:true});
  image.src=source;
}

function renderHotspots(){
  hotspotLayer.innerHTML=(currentScene.hotspots||[]).map(point=>{
    const info=point.type==='info';
    return '<button class="hotspot '+(info?'info':'link')+'" data-id="'+point.id+'"><i>'+pinIcon(point.icon,info?'info':'arrow')+'</i><span class="card"><strong>'+escapeHtml(point.label)+'</strong>'+(info?'<p>'+escapeHtml(point.description||'')+'</p>':'')+'</span></button>';
  }).join('');
  hotspotLayer.querySelectorAll('.hotspot').forEach(button=>button.addEventListener('click',()=>{
    const point=currentScene.hotspots.find(item=>item.id===button.dataset.id);
    if(point.type==='info')button.classList.toggle('open');else loadScene(point.targetSceneId);
  }));
}

function positionHotspots(){
  if(!currentScene)return;
  hotspotLayer.querySelectorAll('.hotspot').forEach(button=>{
    const point=currentScene.hotspots.find(item=>item.id===button.dataset.id);
    const phi=THREE.MathUtils.degToRad(point.pitch),theta=THREE.MathUtils.degToRad(point.yaw);
    const position=new THREE.Vector3(Math.cos(phi)*Math.cos(theta),Math.sin(phi),Math.cos(phi)*Math.sin(theta));
    const visible=position.dot(camera.getWorldDirection(new THREE.Vector3()))>0;
    position.project(camera);
    const rect=renderer.domElement.getBoundingClientRect();
    button.style.transform='translate('+(position.x*.5+.5)*rect.width+'px,'+(-position.y*.5+.5)*rect.height+'px)';
    button.classList.toggle('hidden',!visible);
  });
}

function animate(){
  requestAnimationFrame(animate);
  const width=viewer.clientWidth,height=viewer.clientHeight;
  renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
  latitude=Math.max(-85,Math.min(85,latitude));
  const phi=THREE.MathUtils.degToRad(90-latitude),theta=THREE.MathUtils.degToRad(longitude);
  camera.lookAt(500*Math.sin(phi)*Math.cos(theta),500*Math.cos(phi),500*Math.sin(phi)*Math.sin(theta));
  renderer.render(scene3d,camera);positionHotspots();
}

renderer.domElement.addEventListener('pointerdown',event=>{dragging=true;startX=event.clientX;startY=event.clientY;startLong=longitude;startLat=latitude;renderer.domElement.setPointerCapture(event.pointerId)});
renderer.domElement.addEventListener('pointermove',event=>{if(!dragging)return;longitude=startLong+(startX-event.clientX)*.14;latitude=startLat+(event.clientY-startY)*.14});
renderer.domElement.addEventListener('pointerup',()=>dragging=false);
renderer.domElement.addEventListener('wheel',event=>{camera.fov=Math.max(35,Math.min(90,camera.fov+event.deltaY*.04));camera.updateProjectionMatrix()},{passive:true});
document.querySelector('#play').addEventListener('click',()=>video.paused?video.play():video.pause());
document.querySelector('#seek').addEventListener('input',event=>{if(Number.isFinite(video.duration))video.currentTime=event.target.value/1000*video.duration});
video.addEventListener('timeupdate',()=>{document.querySelector('#current').textContent=formatTime(video.currentTime);document.querySelector('#duration').textContent=formatTime(video.duration);document.querySelector('#seek').value=video.duration?video.currentTime/video.duration*1000:0});
video.addEventListener('play',()=>document.querySelector('#play').textContent='❚❚');
video.addEventListener('pause',()=>document.querySelector('#play').textContent='▶');
animate();loadTour();`

export const exportReadme = `SHOWROUND PUBLISHED TOUR

This folder contains a complete Showround tour, built with Showround by Chaos Created.

To preview locally:
1. Open a terminal in this folder.
2. Run one of these commands:
   python -m http.server 8080
   npx serve .
3. Visit http://localhost:8080

To publish:
Upload the entire folder to any static web host, including GitHub Pages,
Netlify, Cloudflare Pages, Amazon S3, or your existing web server.

To embed the tour in another page:
Use embed.html rather than index.html. It is the same tour with the page
chrome removed, so it fills whatever iframe you give it. The Embed button
in the editor writes the iframe code for you.

Keep index.html, embed.html, tour.json, player.js, styles.css,
three.module.js, three.core.min.js, and the media folder together.

About the theme stylesheet:
Both pages load a small theme file from showround.app after their own
styles.css, which lets the player's look be refreshed without re-exporting
the tour. It is optional. If it cannot be reached the tour still renders
correctly from its bundled styles, so the folder above remains complete on
its own and will work on a private network or behind a firewall. Opening index.html
directly from a file:// address is blocked by browser security; serve it
over HTTP instead.
`
