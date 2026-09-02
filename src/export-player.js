export const playerHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#f17022">
  <title>Chaos360 Tour</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <header>
    <div class="brand"><span>◉</span> CHAOS<b>360</b></div>
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

export const playerStyles = `@import url('https://fonts.googleapis.com/css2?family=Squada+One&display=swap');:root{font-family:Arial,sans-serif;color:#171b1c;background:#0e1112;--orange:#f17022;--aqua:#62c2cc;--ice:#e4f6f8;--lime:#eeff66}*{box-sizing:border-box}body{margin:0;overflow:hidden}header{height:64px;padding:0 22px;display:grid;grid-template-columns:180px 1fr 180px;align-items:center;background:#fff}header h1{text-align:center;font-size:16px;margin:0}.brand{font-family:'Squada One',Impact,sans-serif;font-size:20px;font-weight:400;letter-spacing:.1px}.brand span{display:inline-grid;place-items:center;width:32px;height:32px;margin-right:8px;border-radius:50%;background:var(--aqua)}.brand b{color:var(--orange);font-weight:400}select{width:100%;padding:8px;border:1px solid #dcebed;border-radius:7px;background:#fff}main{position:relative;height:calc(100vh - 120px);overflow:hidden}canvas{width:100%;height:100%;display:block;cursor:grab}canvas:active{cursor:grabbing}#hotspots{position:absolute;inset:0;overflow:hidden;pointer-events:none}.hotspot{position:absolute;top:0;left:0;border:0;padding:0;background:none;display:flex;align-items:center;pointer-events:auto;cursor:pointer;transition:opacity .15s}.hotspot.hidden{opacity:0;pointer-events:none}.hotspot>i{position:relative;z-index:2;width:42px;height:42px;display:grid;place-items:center;transform:translate(-50%,-50%);border:3px solid #fff;border-radius:50%;background:var(--lime);color:#171b1c;font-style:normal;font-weight:800;font-size:18px;box-shadow:0 5px 18px #0007}.hotspot.info>i{background:var(--aqua)}.card{transform:translate(-16px,-50%);min-width:140px;max-width:260px;padding:8px 12px 8px 20px;border-radius:0 8px 8px 0;background:#17201ee8;color:#fff;text-align:left;box-shadow:0 5px 18px #0005}.card strong{display:block;font-size:12px}.card p{display:none;margin:6px 0 0;color:#dce8e3;font-size:10px;line-height:1.45}.info:hover .card p,.info.open .card p{display:block}.link .card{opacity:0;transition:.15s}.link:hover .card{opacity:1}#loading{position:absolute;inset:0;display:grid;place-items:center;background:#16201d;color:#fff}.hint{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);padding:7px 12px;border-radius:20px;background:#101817cc;color:#fff;font-size:10px;pointer-events:none}footer{height:56px;padding:0 24px;display:grid;grid-template-columns:34px 42px 1fr 42px;gap:10px;align-items:center;background:#fff;color:#6d7773;font-size:10px}footer button{width:32px;height:32px;border:0;border-radius:50%;background:var(--orange);cursor:pointer}input[type=range]{accent-color:var(--orange)}.error{color:#ff9c76}`

export const playerScript = `import * as THREE from './three.module.js';

const viewer=document.querySelector('#viewer'),hotspotLayer=document.querySelector('#hotspots');
const video=document.createElement('video');
video.playsInline=true;video.preload='metadata';
const scene3d=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(72,1,.1,1100);
const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
viewer.prepend(renderer.domElement);
const texture=new THREE.VideoTexture(video);
texture.colorSpace=THREE.SRGBColorSpace;
const geometry=new THREE.SphereGeometry(500,60,40);geometry.scale(-1,1,1);
scene3d.add(new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:texture})));
let tour,currentScene,longitude=0,latitude=0,dragging=false,startX=0,startY=0,startLong=0,startLat=0;

const formatTime=(seconds=0)=>{if(!Number.isFinite(seconds))return'00:00';return String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(Math.floor(seconds%60)).padStart(2,'0')};
const escapeHtml=value=>{const node=document.createElement('span');node.textContent=value;return node.innerHTML};

async function loadTour(){
  try{
    tour=await fetch('./tour.json').then(response=>{if(!response.ok)throw new Error('Tour data could not be loaded');return response.json()});
    document.title=tour.name+' — Chaos360';
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
  video.pause();video.src=currentScene.video;video.load();
  longitude=0;latitude=0;
  document.querySelector('#scene-picker').value=id;
  renderHotspots();
  document.querySelector('#loading').style.display='grid';
  video.addEventListener('canplay',()=>{document.querySelector('#loading').style.display='none';video.play().catch(()=>{})},{once:true});
}

function renderHotspots(){
  hotspotLayer.innerHTML=(currentScene.hotspots||[]).map(point=>{
    const info=point.type==='info';
    return '<button class="hotspot '+(info?'info':'link')+'" data-id="'+point.id+'"><i>'+(info?'i':point.icon==='door'?'⌂':'→')+'</i><span class="card"><strong>'+escapeHtml(point.label)+'</strong>'+(info?'<p>'+escapeHtml(point.description||'')+'</p>':'')+'</span></button>';
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

export const exportReadme = `CHAOS360 PUBLISHED TOUR

This folder contains a complete Chaos360 tour.

To preview locally:
1. Open a terminal in this folder.
2. Run one of these commands:
   python -m http.server 8080
   npx serve .
3. Visit http://localhost:8080

To publish:
Upload the entire folder to any static web host, including GitHub Pages,
Netlify, Cloudflare Pages, Amazon S3, or your existing web server.

Keep index.html, tour.json, player.js, styles.css, three.module.js,
three.core.min.js, and the videos folder together. Opening index.html
directly from a file:// address is blocked by browser security; serve it
over HTTP instead.
`
