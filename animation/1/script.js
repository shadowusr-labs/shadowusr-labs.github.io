window.addEventListener('load', init);

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var radiuses = {}, ds = {}, tntImage;

function init() {
    drawTnt();
}

function drawTnt() {
    let ctx = document.getElementById('viewport').getContext('2d');
    ctx.fillStyle = '#404040';
    ctx.fillRect(0, 0, 800, 800);

    ctx.fillStyle = '#c33b18';
    ctx.fillRect(300, 300, 200, 200);

    let colors = ['#db4218', '#c33b18', '#aa3313', '#922e17'];
    for (let i = 0; i < 16; i++) {
        ctx.fillStyle = colors[i % 4];
        ctx.fillRect(300 + i * 12.5, 300, 12.5, 200);
    }
    
    ctx.fillStyle = '#dcdadb';
    ctx.fillRect(300, 366, 200, 66);

    ctx.fillStyle = '#000';
    ctx.font = '65px Minecraft';
    ctx.fillText("TNT", 335, 422);
    tntImage = ctx.getImageData(300, 300, 200, 200);
}

function explode() {
    startBlinking();
}

function startBlinking() {
    // Blink logic here
    let ctx = document.getElementById('viewport').getContext('2d');

    let blinksCount = 5;
    for (var i = 0; i < blinksCount; i++) {
        (i % 2) ? setTimeout(() => { ctx.fillStyle = '#fff'; ctx.fillRect(300, 300, 200, 200); }, i * 500) : setTimeout(() => { ctx.putImageData(tntImage, 300, 300); }, i * 500);
    }
    setTimeout(() => { ctx.fillStyle = '#404040'; ctx.fillRect(0, 0, 800, 800); }, i * 500);

    setTimeout(() => {
        for (let i = 0; i < 15; i++) {
            generateExplosionParticle();
        }
    }, i * 500);
}

function generateExplosionParticle() {
    let colors = ['#fff', '#fff', '#b1b1b1', '#636363', '#d2d2d2'];

    let canvas = document.createElement('canvas');
    let scale = (random(15, 35) * 0.01);
    canvas.id = random(0, 1000000);
    canvas.width = 800;
    canvas.height = 800;
    canvas.style.position = 'absolute';
    canvas.style.top = random(-150, 150) + 'px';
    canvas.style.left = random(-250, 250) + 'px';
    
    canvas.style.transform = 'scale(' + scale + ') rotate(' + (random(0, 359)) + 'deg)';
    canvas.style.zIndex = random(101, 10000);
    canvas.style.color = colors[Math.floor(Math.random() * colors.length)];

    document.getElementById('viewport-wrapper').appendChild(canvas);

    radiuses[canvas.id] = 35;
    ds[canvas.id] = 0;

    setTimeout(() => { animateExplosionParticle(canvas.id, canvas.style.color); }, random(0, 500));
}

function animateExplosionParticle(id, color) {    
    let ctx2 = document.getElementById(id).getContext('2d');
    
    ctx2.clearRect(0, 0, 800, 800);
    ctx2.fillStyle = color;
    ctx2.beginPath();
    ctx2.arc(400, 400, radiuses[id], 0, Math.PI * 2);
    ctx2.fill();
    ctx2.closePath();
    
    ctx2.save();
    ctx2.beginPath();
    if (radiuses[id] > 250) {
        ds[id] += 5;
    }
    ctx2.arc(370, 370, radiuses[id] - 35 + ds[id], 0, Math.PI * 2);
    ctx2.clip();
    ctx2.clearRect(0, 0, 800, 800);
    ctx2.restore();

    radiuses[id] += 13;

    if (radiuses[id] < 450) {
        window.requestAnimationFrame(() => { animateExplosionParticle(id, color); });
    } else {
        delete radiuses[id];
        delete ds[id];
        document.getElementById(id).remove();
    }
}