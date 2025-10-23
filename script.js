// 🎂 Timer since 24 October 2006
const birthDate = new Date("2006-10-24T00:00:00");
function updateTimer() {
  const now = new Date();
  let diff = now - birthDate;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  diff -= years * (1000 * 60 * 60 * 24 * 365.25);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("years").textContent = years;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours.toString().padStart(2,"0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2,"0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2,"0");
}
setInterval(updateTimer, 1000);
updateTimer();

// 💫 3D hearts background
let scene, camera, renderer, hearts=[], particles;
function createHeartShape(){
  const x=0,y=0;
  const s=new THREE.Shape();
  s.moveTo(x+0.25,y+0.25);
  s.bezierCurveTo(x+0.25,y+0.25,x+0.2,y,x,y);
  s.bezierCurveTo(x-0.3,y,x-0.3,y+0.35,x-0.3,y+0.35);
  s.bezierCurveTo(x-0.3,y+0.55,x-0.1,y+0.77,x+0.25,y+1.0);
  s.bezierCurveTo(x+0.6,y+0.77,x+0.8,y+0.55,x+0.8,y+0.35);
  s.bezierCurveTo(x+0.8,y+0.35,x+0.8,y,x+0.5,y);
  s.bezierCurveTo(x+0.35,y,x+0.25,y+0.25,x+0.25,y+0.25);
  return s;
}

function init3D(){
  scene=new THREE.Scene();
  camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  camera.position.z=6;

  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setClearColor(0x000000,0);
  document.getElementById("bg").appendChild(renderer.domElement);

  const light=new THREE.PointLight(0xff66b2,1.5);
  light.position.set(0,0,10);
  scene.add(light);

  const heartGeo=new THREE.ExtrudeGeometry(createHeartShape(),{depth:0.3,bevelEnabled:true,bevelSize:0.05});
  const heartMat=new THREE.MeshStandardMaterial({color:0xff66b2,metalness:0.5,roughness:0.3,emissive:0x550033});

  for(let i=0;i<15;i++){
    const h=new THREE.Mesh(heartGeo,heartMat);
    h.position.set((Math.random()-0.5)*10,(Math.random()-0.5)*6,(Math.random()-0.5)*6);
    h.rotation.x=Math.random()*Math.PI;
    h.rotation.y=Math.random()*Math.PI;
    h.scale.setScalar(Math.random()*0.8+0.4);
    scene.add(h);hearts.push(h);
  }

  const particleGeo=new THREE.BufferGeometry();
  const count=200;
  const pos=new Float32Array(count*3);
  for(let i=0;i<count*3;i++) pos[i]=(Math.random()-0.5)*12;
  particleGeo.setAttribute('position',new THREE.BufferAttribute(pos,3));
  const particleMat=new THREE.PointsMaterial({color:0xff99cc,size:0.05});
  particles=new THREE.Points(particleGeo,particleMat);
  scene.add(particles);

  window.addEventListener("resize",()=>{
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
  });
}
function animate3D(){
  requestAnimationFrame(animate3D);
  hearts.forEach(h=>{
    h.rotation.x+=0.01;
    h.rotation.y+=0.01;
    h.position.y+=0.003;
    if(h.position.y>3)h.position.y=-3;
  });
  particles.rotation.y+=0.001;
  renderer.render(scene,camera);
}
init3D();animate3D();

// 💌 Big letter logic
const envelope=document.getElementById("envelope");
const bigLetter=document.getElementById("bigLetter");
const closeLetter=document.getElementById("closeLetter");
const openSound=new Audio("https://cdn.pixabay.com/audio/2022/03/15/audio_13c90b6df3.mp3");

envelope.addEventListener("click",()=>{
  bigLetter.style.display="flex";
  openSound.play();
});
closeLetter.addEventListener("click",()=>{
  bigLetter.style.display="none";
});
