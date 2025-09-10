const canvas = document.getElementById('minCanvas');
const ctx = canvas.getContext('2d');

let scrollX = 0;
let ball = { x: 260, y: 285, r: 60, speed: 5 };

const houses = [
  {x:200,y:250,w:120,h:100,c:'#FF8C00'},
  {x:600,y:220,w:100,h:70,c:'#8A2BE2'},
  {x:1000,y:260,w:140,h:110,c:'#228B22'},
  {x:1500,y:230,w:110,h:80,c:'#DA70D6'},
  {x:1800,y:240,w:130,h:90,c:'#FFD700'}
];

function circle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2);
  ctx.fill();
}

function dist(ax, ay, bx, by) {
  return Math.hypot(ax-bx, ay-by);
}

function drawMan(mx, my, red=false) {
  circle(mx, my-50, 12, red ? 'red' : '#ffe0bd'); 
  ctx.fillStyle = red ? 'red' : 'orange';        
  ctx.fillRect(mx-8,my-40,16,35);
  ctx.fillStyle='black';                        
  ctx.fillRect(mx-8,my-5,6,20);
  ctx.fillRect(mx+2,my-5,6,18);
}

function draw() {
  ctx.fillStyle='#87CEEB'; ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle='#3CB371'; ctx.fillRect(0,canvas.height-150,canvas.width,200);
  ctx.fillStyle='#555'; ctx.fillRect(0,canvas.height-60,canvas.width,60);

  ctx.fillStyle="white";
  for (let i=0;i<canvas.width;i+=40) ctx.fillRect(i, canvas.height-30,20,5);
  ctx.fillStyle="#4E4F52";
  for (let i=0;i<canvas.width;i+=120) ctx.fillRect(i, canvas.height-30,20,5);

  circle(ball.x, ball.y, ball.r, "yellow");

  houses.forEach(h=>{
    let x=h.x-scrollX, y=canvas.height-h.y;
    ctx.fillStyle=h.c; ctx.fillRect(x,y,h.w,h.h);
    ctx.fillStyle='#333'; ctx.beginPath();
    ctx.moveTo(x,y); ctx.lineTo(x+h.w/2,y-40); ctx.lineTo(x+h.w,y); ctx.fill();
    ctx.fillStyle='#654321'; ctx.fillRect(x+h.w/2-15,y+h.h-40,30,40);
    ctx.fillStyle='#B0E0E6'; ctx.fillRect(x+10,y+20,30,25);
    ctx.strokeStyle='#000'; ctx.strokeRect(x+10,y+20,30,25);
  });

  let mx1=houses[3].x+houses[3].w/2-scrollX, my1=canvas.height-60;
  let hit = dist(ball.x, ball.y, mx1, my1-50) < ball.r + 12;
  drawMan(mx1,my1, hit);

  circle(enemy.x, enemy.y, enemy.r, enemy.color);
}

let keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function moveBall() {
  if (keys['d']) ball.x += 10;
  if (keys['a']) ball.x += -10;
  if (keys['w']) ball.y -= ball.speed;
  if (keys['s']) ball.y += ball.speed;
  if (keys['ArrowRight']) scrollX += 10;
  if (keys['ArrowLeft']) scrollX -= 10;
}

function clampBall() {
  ball.x = Math.max(ball.r, Math.min(canvas.width - ball.r, ball.x));
  ball.y = Math.max(ball.r, Math.min(canvas.height - ball.r, ball.y));
}

let enemy = { x: 100, y: 100, r: 20, dx: 4, dy: 3, color: 'red' };

function moveEnemy() {
  enemy.x += enemy.dx;
  enemy.y += enemy.dy;
  if (enemy.x - enemy.r < 0 || enemy.x + enemy.r > canvas.width) enemy.dx *= -1;
  if (enemy.y - enemy.r < 0 || enemy.y + enemy.r > canvas.height) enemy.dy *= -1;
}

function loop() {
  moveBall();
  clampBall();
  moveEnemy();
  draw();
  requestAnimationFrame(loop);
}
loop();
