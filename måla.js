// Hämta canvas och context
const canvas = document.getElementById('minCanvas');
const ctx = canvas.getContext('2d');

// Hur långt vi "gått" i världen (scroll)
let scrollX = 0;

// Lista med hus (x-position, höjd från botten, bredd, höjd, färg)
const houses = [
  {x:200,y:250,w:120,h:100,c:'#FF8C00'},
  {x:600,y:220,w:100,h:70,c:'#8A2BE2'},
  {x:1000,y:260,w:140,h:110,c:'#228B22'},
  {x:1500,y:230,w:110,h:80,c:'#DA70D6'},
  {x:1800,y:240,w:130,h:90,c:'#FFD700'}
];

// Kullens position efter sista huset
let lastHouse = houses[houses.length-1];
let hillX = lastHouse.x + lastHouse.w + 200; // mittpunkt för kullen
let hillY = canvas.height - 140; 
let hillR = 120;

// Funktion för att rita en gubbe
function drawMan(mx, my) {
  ctx.fillStyle='#ffe0bd';
  ctx.beginPath();
  ctx.arc(mx,my-50,12,0,Math.PI*2); // huvud
  ctx.fill();

  ctx.fillStyle='orange';
  ctx.fillRect(mx-8,my-40,16,35); // kropp

  ctx.fillStyle='black';
  ctx.fillRect(mx-8,my-5,6,20); // vänster ben
  ctx.fillRect(mx+2,my-5,6,18); // höger ben
}

// Funktion för att rita scenen
function draw() {
  // Bakgrund: himmel
  ctx.fillStyle='#87CEEB';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Gräs
  ctx.fillStyle='#3CB371';
  ctx.fillRect(0,canvas.height-150,canvas.width,200);

  // Väg
  ctx.fillStyle='#555';
  ctx.fillRect(0,canvas.height-60,canvas.width,60);

  // Vägmarkeringar
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  for (let i = 0; i < canvas.width; i += 40) {
      ctx.fillRect(i, canvas.height - 30, 20, 5);
    }
  ctx.fillStyle = "rgba(78, 79, 82, 1)";
  for (let i = 0; i < canvas.width; i += 120) {
      ctx.fillRect(i, canvas.height - 30, 20, 5);
    }

  // === Rita kulle ===
  ctx.beginPath();
  ctx.arc(hillX - scrollX, hillY, hillR, Math.PI, 0, false); 
  ctx.fillStyle = "#228B22";
  ctx.fill();
  ctx.closePath();

  // Rita alla hus
  houses.forEach(h=>{
    let x=h.x-scrollX, y=canvas.height-h.y;

    // Husets kropp
    ctx.fillStyle=h.c; 
    ctx.fillRect(x,y,h.w,h.h);

    // Tak (triangel)
    ctx.fillStyle='#333';
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+h.w/2,y-40);
    ctx.lineTo(x+h.w,y);
    ctx.fill();

    // Dörr
    ctx.fillStyle='#654321';
    ctx.fillRect(x+h.w/2-15,y+h.h-40,30,40);

    // Fönster
    ctx.fillStyle='#B0E0E6';
    ctx.fillRect(x+10,y+20,30,25);
    ctx.strokeStyle='#000';
    ctx.strokeRect(x+10,y+20,30,25);
  });

  // Lykstolpe bredvid hus nr 2
  let lx=houses[1].x+houses[1].w+40-scrollX, ly=canvas.height-60;
  ctx.fillStyle='#444';
  ctx.fillRect(lx,ly-100,8,100); // stolpe
  ctx.fillStyle='#FFD700';
  ctx.beginPath();
  ctx.arc(lx+4,ly-110,15,0,7); // lampa
  ctx.fill();

  // Gubbe framför hus nr 4
  let mx1=houses[3].x+houses[3].w/2-scrollX; 
  let my1=canvas.height-60;
  drawMan(mx1,my1);

  // Ny gubbe på kullen
let mx2 = hillX - hillR/2 - scrollX; // starta lite till vänster på kullen
let dx = mx2 - (hillX - scrollX);    // avstånd från kullens mittpunkt
let angle = Math.acos(dx / hillR);   // vinkel på cirkeln
let my2 = hillY - Math.sin(angle) * hillR; // rätt höjd

drawMan(mx2, my2);

}

// Rita scenen första gången
draw();

// Lyssna på tangenttryckningar
document.addEventListener('keydown',e=>{
  if(e.key==='d'){ // gå höger
    scrollX+=10;
    draw();
  }
  if(e.key==='a'){ // gå vänster
    scrollX=Math.max(0,scrollX-10);
    draw();
  }
});

