/**
 * Created by Owner on 11/30/2018.
 */
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    circles = init();

});
window.addEventListener('movemouse',function (event) {
    angle = event.x;
});

function degToRadian(deg) {
    return deg * (Math.PI/180);
}

colors = [
  "#1afaaa",
  "#1afafa",
  "#1777ff",
  "#098583",
  "#00ABA8"
];

var angle = 0;
function Circles(angle) {
    this.centerX = innerWidth/2;
    this.centerY = innerHeight/2;
    this.angle = angle;
    this.radius = Math.random() * 15 + 2;
    this.speed = Math.random() +0.2;
    this.rad = Math.random() * 55 + 5;
    this.x = 0;
    this.y = 0;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    };

    this.update = function () {
        this.x = this.rad * this.radius * Math.cos(degToRadian(this.angle)) + this.centerX;
        this.y = this.rad * this.radius * Math.sin(degToRadian(this.angle)) + this.centerY;
        this.angle += this.speed;
        this.draw();
    }
}

function init() {
    var numCircles = 1000;
    var circles = [];
    for(var i=0; i < numCircles; i++){
        circles.push(new Circles(angle));
    }
    return circles;
}

var circles = init();

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    for(var i=0; i < circles.length;i++){
        circles[i].update();
    }
}

animate();