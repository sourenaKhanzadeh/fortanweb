/**
 * Created by Owner on 11/28/2018.
 */
var elem = document.querySelector('canvas');
var c = elem.getContext('2d');
elem.width = window.innerWidth;
elem.height = window.innerHeight;

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(500, 100, 100, 100);

// // line
// c.beginPath();

// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(350, 100);
// c.lineTo(350, 300);
// c.lineTo(300, 300);

// c.strokeStyle = "#faa";
// c.stroke();
// for (var i=0; i < 100;i++){
//     c.beginPath();
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     c.arc(x,y,30,0,Math.PI * 2, false);
//     c.stroke();
// }
var mouse = {
    x:undefined,
    y:undefined
};

var max_radius = 40;
var min_radius = 2;

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

window.addEventListener('resize',
    function () {
    elem.width = innerWidth;
    elem.height = innerHeight;
});

var colors = [
  '#Faa0aa',
  '#a0a0af',
  '#aaf0aa',
  '#aadfFF',
  '#aaaaaa'
];

function Circle(x, y, speed_x, speed_y, radius) {
    this.x  = x;
    this.y = y;
    this.speed_x = speed_x;
    this.speed_y  = speed_y;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };
    this.update = function () {

        if(this.x + this.radius> innerWidth || this.x - this.radius < 0 ){
            this.speed_x = -this.speed_x;
        }
        if(this.y + this.radius> innerHeight || this.y - this.radius < 0 ){
            this.speed_y = -this.speed_y;
        }

        this.x += this.speed_x;
        this.y += this.speed_y;

        // interactivity
        if(mouse.x  - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50 &&
            this.radius < max_radius){
            this.radius += 1;
        }else if(this.radius > min_radius){
            this.radius -= 1;
        }

        this.draw();

    };
}


var circles = [];
var circle_nums = 500;

for(var i=0; i <circle_nums; i++){
    var radius = min_radius;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight  - radius * 2) + radius;
    var speed_x = (Math.random() - 0.5) * 8;
    var speed_y = (Math.random() - 0.5) * 8;
    circles.push(new Circle(x, y, speed_x, speed_y, radius));

}

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0,0,innerWidth, innerHeight);

    c.beginPath();
    for(var i=0; i < circles.length; i++){
        circles[i].update();
    }


}

animate();
