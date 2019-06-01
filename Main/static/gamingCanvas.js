/**
 * Created by Owner on 11/28/2018.
 */

var c = document.querySelector('canvas');

var co = c.getContext('2d');

c.width = window.innerWidth;
c.height = window.innerHeight;

window.addEventListener('resize', function () {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    circs = init();
});

window.addEventListener('click' , function () {
   circs = init();
});

let mouse = {
    x:undefined,
    y:undefined
};

window.addEventListener('mousemove',function (event) {
     mouse.x = event.x;
     mouse.y = event.y;
});

// Circle With Gravity
function Circle(velocity_y, friction) {
    this.x = randomXPos();
    this.y = randomYPos();
    this.radius = randomRadius(10);
    this.velocity_y = velocity_y;
    this.velocity_x = Math.random() * velocity_y ? Math.random() > 0.5 : Math.random() * -velocity_y;
    this.friction = friction;
    this.fill_color = randomColors();
    this.dx = Math.random() * 4;

    this.draw = function () {
        co.beginPath();
        co.arc(this.x,this.y,this.radius,0,Math.PI * 2, false);
        co.fillStyle = this.fill_color;
        co.stroke();
        co.fill();
    };

    this.update = function () {
        this.draw();
        if(this.y + this.radius + this.velocity_y>innerHeight-115){
            this.velocity_y = -this.velocity_y * this.friction;
        }else{
               this.velocity_y += 1;
               this.x += this.velocity_x;
        }
        if(this.x + this.radius + this.velocity_x> innerWidth || this.x - this.radius < 0){
            this.velocity_x = -this.velocity_x;
        }

        this.y += this.velocity_y;
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            let dy = Math.random() * 4;
            this.x += this.dx;
            this.y -= dy;
            if(this.x + this.radius + this.dx> innerWidth || this.x - this.radius < 0){
                this.dx = -this.dx;
            }
        }
    }

}


// random color generator
function randomColors(){
    let colors = [
        "#2185C5",
        "#7ECEFD",
        "#098583",
        "#1afafa",
        "#00ABA8"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// random x position
function randomXPos() {
    return Math.random() * innerWidth;
}

// random y position
function randomYPos() {
    return Math.random() * (innerHeight-400) + 300;
}

// random radius
function randomRadius(n) {
    return Math.random() * n + 10;
}

//initializer
function init() {
    const circ_num = 500;
    var circs = [];
    var velocity_y = 30;
    var friction = .9;

    for(var i=0; i < circ_num; i++){
        circs.push(new Circle(velocity_y, friction));
    }
    return circs;

}

var circs = init();

function animation() {
    requestAnimationFrame(animation);
    co.clearRect(0, 0, innerWidth, innerHeight);

    for(var i=0; i < circs.length; i++){
        circs[i].update();
    }
}

animation();