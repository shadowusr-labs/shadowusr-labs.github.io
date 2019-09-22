function init() {
    
    window.requestAnimationFrame(draw);
}

var radius = 35;
var d = 0;
function draw() {
    let ctx = document.getElementById('viewport').getContext('2d');
    
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, 0, 800, 800);
    
    
    let ctx2 = document.getElementById('explosion').getContext('2d');
    
    ctx2.clearRect(0, 0, 800, 800);
    ctx2.fillStyle = "#fff";
    ctx2.beginPath();
    ctx2.arc(400, 400, radius, 0, Math.PI * 2);
    //ctx2.stroke();
    ctx2.fill();
    ctx2.closePath();
    
    //let radius = 100;
    ctx2.save();
    //ctx2.globalCompositeOperation = 'destination-out'
    ctx2.beginPath();
    //ctx2.fillStyle = 'red';
    if (radius > 250) {
        d+=5;
	console.log(123);
    }
    ctx2.arc(370, 370, radius - 35 + d, 0, Math.PI * 2);
    //ctx2.fill();
    //ctx2.restore();
    ctx2.clip();
    ctx2.clearRect(0, 0, 800, 800);
    ctx2.restore();
    radius+=10;
    //console.log(radius);
    if (radius < 450) {
        window.requestAnimationFrame(draw);
    }
}

function start() {
    
}