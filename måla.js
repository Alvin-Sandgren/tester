const canvas = document.getElementById("minCanvas");
const ctx = canvas.getContext("2d");

// Byggnad
function drawBuilding(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "#ccc";
    ctx.fillRect(x + 5, y + 5, w - 10, 8); // Tak
    ctx.fillStyle = "#654321";
    ctx.fillRect(x + w / 2 - 7, y + h - 18, 14, 18); // Dörr
    ctx.fillStyle = "#aee7f8";
    [0, 1].forEach(i => [0, 1].forEach(j =>
        ctx.fillRect(x + 10 + i * (w - 30), y + 20 + j * 25, 16, 16)
    ));
}

// Väg
function drawRoad(x, y, w, h) {
    ctx.fillStyle = "#444";
    ctx.fillRect(x, y, w, h);
    ctx.save();
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w / 2, y + h);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#bbb";
    [x - 8, x + w].forEach(xp => ctx.fillRect(xp, y, 8, h));
}

// Träd
function drawTree(x, y) {
    ctx.fillStyle = "#8d5524";
    ctx.fillRect(x - 3, y, 6, 18);
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#2ecc40";
    ctx.fill();
}

// Bil
function drawCar(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 28, 14);
    ctx.fillStyle = "#222";
    [x + 6, x + 22].forEach(xp => {
        ctx.beginPath();
        ctx.arc(xp, y + 14, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Bakgrund
ctx.fillStyle = "#8fd694";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Vägar
drawRoad(190, 0, 40, canvas.height);
drawRoad(0, 190, canvas.width, 40);

// Byggnader
const colors = ["#b5651d", "#e67e22", "#2980b9", "#7f8c8d", "#c0392b"];
for (let row = 0; row < 4; row++)
    for (let col = 0; col < 4; col++)
        if (row !== 1 && col !== 1)
            drawBuilding(40 + col * 100, 40 + row * 100, 80, 80, colors[Math.random() * colors.length | 0]);

// Träd
[...Array(6)].forEach((_, i) => {
    drawTree(170, 60 + i * 60);
    drawTree(270, 60 + i * 60);
    drawTree(60 + i * 60, 170);
    drawTree(60 + i * 60, 270);
});

// Bilar
[
    [200, 60, "#e74c3c"],
    [195, 250, "#3498db"],
    [120, 200, "#f1c40f"],
    [320, 210, "#2ecc71"]
].forEach(([x, y, c]) => drawCar(x, y, c));
