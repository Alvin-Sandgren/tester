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

  // En gubbe framför hus nr 4
  let mx=houses[3].x+houses[3].w/2-scrollX, my=canvas.height-60;
  ctx.fillStyle='#ffe0bd';
  ctx.beginPath();
  ctx.arc(mx,my-50,12,0,7); // huvud
  ctx.fill();
  ctx.fillStyle='blue';
  ctx.fillRect(mx-8,my-40,16,35); // kropp
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
