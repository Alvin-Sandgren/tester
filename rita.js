const canvas = document.getElementById('minCanvas');
const ctx = canvas.getContext('2d');

let scrollX = 0;
let keys = {};

class Ball {
  constructor(x, y, r, speed, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.color = color;
  }
  move() {
    if (keys['d']) this.x += 10;
    if (keys['a']) this.x -= 10;
    if (keys['w']) this.y -= this.speed;
    if (keys['s']) this.y += this.speed;
    this.clamp();
  }
  clamp() {
    this.x = Math.max(this.r, Math.min(canvas.width - this.r, this.x));
    this.y = Math.max(this.r, Math.min(canvas.height - this.r, this.y));
  }
  draw() {
    circle(this.x, this.y, this.r, this.color);
  }
}

class Enemy {
  constructor(x, y, r, dx, dy, color = "red") {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }
  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x - this.r < 0 || this.x + this.r > canvas.width) this.dx *= -1;
    if (this.y - this.r < 0 || this.y + this.r > canvas.height) this.dy *= -1;
  }
  draw() {
    circle(this.x, this.y, this.r, this.color);
  }
}

class Man {
  constructor(x, y, red = false) {
    this.x = x;
    this.y = y;
    this.red = red;
  }
  draw() {
    drawMan(this.x, this.y, this.red);
  }
}

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

  objects.forEach(obj => obj instanceof Ball && obj.draw());

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
  let hit = dist(objects[0].x, objects[0].y, mx1, my1-50) < objects[0].r + 12;
  let man = new Man(mx1, my1, hit);
  man.draw();

  objects.forEach(obj => obj instanceof Enemy && obj.draw());
}

document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

function moveObjects() {
  objects.forEach(obj => obj.move && obj.move());
  if (keys['ArrowRight']) scrollX += 10;
  if (keys['ArrowLeft']) scrollX -= 10;
}

let objects = [
  new Ball(260, 285, 60, 5, 'yellow'),
  new Ball(26, 285, 60, 5, 'lightgreen'),
  new Enemy(100, 100, 20, 20, 12, 'red'),
  new Enemy(300, 200, 25, 10, 15, 'blue'),
  new Enemy(350, 20, 25, 10, 15, 'green'),
  new Enemy(50, 300, 25, 10, 15, 'orange'),
  new Enemy(10, 300, 25, 17, 15, 'black'),
  new Enemy(250, 300, 25, 19, 15, 'white'),
  new Enemy(240, 300, 25, 9, 15, 'lightblue'),
  new Enemy(90, 300, 25, 7, 15, 'purple'),
];

function loop() {
  moveObjects();
  draw();
  requestAnimationFrame(loop);
}
loop();