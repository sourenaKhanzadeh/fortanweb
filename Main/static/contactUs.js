/**
 * Created by Owner on 11/30/2018.
 */
const canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});


//Circle constructor
function Circle() {
    this.x = innerWidth/2;
    this.y = innerHeight/2;
    this.radius = Math.random() * 3 + 1;
    this.color = 'rgb(' + Math.floor(Math.random() * 215) + ', ' +
        Math.floor(Math.random() * 215) +
        ',' + Math.floor(Math.random() * 215);

}

// drawing
Circle.prototype.draw =  function () {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,Math.PI * 2,false);
    this.x += 1;
    c.fillStyle = this.color;
    c.fill();
    c.stroke();

};

// update
Circle.prototype.update = function(){
    this.draw();
};

// initialize
Circle.prototype.init = function () {

};

let n = new Circle();

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    n.update();
}

animate();