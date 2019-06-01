var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener("click", function () {
   refresh();
});

/*
* ------------------------------------------
* *-----------------------------
*  Design
* *-----------------------------
* ------------------------------------------
*/
function mountainRange(mountainAmount, height,  color) {
			for (var i = 0; i < mountainAmount; i++) {
				var mountainWidth = canvas.width / mountainAmount;

				// Draw triangle
				c.beginPath();
				c.moveTo(i * mountainWidth, canvas.height);
				c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);

				// Triangle peak
				c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
				c.lineTo(i * mountainWidth - 325, canvas.height);
				c.fillStyle = color;
				c.fill();
				c.closePath();
			}
}

function MiniStars(num) {
    this.x = Math.random() * innerWidth +10;
    this.y = Math.random() * innerHeight /2 + 100;
    this.radius = Math.random() * 3;
    this.num = num;
    this.draw = function () {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        c.shadowColor = '#E3EAEF';
        c.shadowBlur = (Math.random() * 10) + 10;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;

        c.fillStyle = "white";
        c.fill();

        c.closePath();
        c.restore();

    };

    this.init = function () {
        var mini = [];
        var numStars = this.num;
        for(var i=0;i<numStars;i++){
            mini.push(new MiniStars());
        }
        return mini;
    }


}


function background() {
    var g = c.createLinearGradient(0,innerHeight,0,0);
    g.addColorStop(1,'#071e26');
    g.addColorStop(0,'#3f586b');
    c.fillStyle = g;
    c.fill();

}

function Stars() {
    this.x = Math.random() * innerWidth;
    this.y = Math.random() * innerHeight/2;
    this.dy = Math.random() * 4 + 1;
    this.dx = Math.random() * 4 + 2;
    this.radius = Math.random() * 5 + 3;
    this.friction = 0.9;
    this.numParticles = Math.random() * 500 + 200;

    this.draw = function () {
        c.save();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        c.shadowColor = '#E3EAEF';
        c.shadowBlur = (Math.random() * 10) + 10;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;

        c.fillStyle = "white";
        c.fill();

        c.closePath();
        c.restore();
    };
    this.update = function () {
        if(this.radius >0){
            this.draw();
        }
        this.y += this.dy;
        // this.x -= this.dx;
        if(this.y + this.radius > innerHeight-115){
            this.dy = -this.dy * this.friction;
            this.dx = -this.dx ? Math.random()*2 < 1 : this.dx*2;
            this.radius -= 1;

        }
        this.dy++;
    };


    this.init = function () {
        var stars = [];
        for(var i=0;i<this.numParticles;i++){
            stars.push(new Stars());
        }

        return stars;
    }
}


var mini = new MiniStars(150);
var minis = mini.init();


var star = new Stars();

function refresh() {
    stars = star.init();
}

var stars = star.init();

// var delay = 3;

// setInterval(refresh, delay*1000);

function animate() {
    window.requestAnimationFrame(animate);
    // clear every frame
    c.rect(0,0,innerWidth,innerHeight);
    //background
    background();

    //mini stars
    for(var i=0;i<minis.length;i++){
        minis[i].draw();
    }
    // mountains
    mountainRange(1, innerHeight/2 + 200, "#384551");
    mountainRange(2, innerHeight/2, "#2B3843");
    mountainRange(3, innerHeight/2 - 200, "#26333E");

    // starts
    for(var i=0;i<stars.length;i++){
        stars[i].update();
    }



}

animate();