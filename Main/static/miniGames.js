/**
 * Created by Owner on 11/30/2018.
 */
/**
 * Created by Owner on 11/29/2018.
 */
var  can = document.querySelector('canvas');
var c = can.getContext('2d');

can.width = window.innerWidth;
can.height = window.innerHeight;

window.addEventListener('mousemove', function (event) {
    bAngle = event.x * .9;
});

window.addEventListener('resize', function () {
   can.window = window.innerWidth;
   can.height = window.innerHeight;
   x = innerWidth/2;
   y = innerHeight - 100;

});

var x = innerWidth/2;
var y = innerHeight - 100;

var colors = [
    "#ffaa12",
    "#fff222",
    "#22f1f1",
    "#00ff2a"

];

function draw(startX, startY, len, angle) {
    c.beginPath();
    c.save();
    c.translate(startX, startY);
    c.rotate(angle * Math.PI / 180);
    c.moveTo(0, 0);
    c.lineTo(0, -len);
    c.stroke();

    if (len < 10) {
        c.restore();
        return;
    }
    draw(0, -len, len*levels, -bAngle);
    draw(0, -len, len*levels, bAngle);
    c.moveTo(0, 0);
    c.arc(startX,startY, Math.random() * 4+2,Math.PI * 2,false);
    c.fillStyle = colors[Math.floor(Math.random() * colors.length)];
    c.stroke();
    c.fill();
    c.restore();

}

var x1 = 0;
var angle = 0;
var bAngle= 15;
var levels = .75;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    draw(x, y, x1, angle);
      if (x1 < 170){
        x1 += 1;
    }

}

animate();