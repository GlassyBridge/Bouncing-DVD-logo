const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = 'Screenshot 2025-07-10 at 5.09.11 PM.png';

class Logo {
    constructor(effect, image){
        this.effect = effect;
        this.image = image;

        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
        this.x = Math.random() * (this.effect.width - this.width);
        this.y = Math.random() * (this.effect.height - this.height);
        
        this.vx = 3;
        this.vy = 3;
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update(){
        this.x += this.vx;
        if (this.x > this.effect.width - this.width|| this.x < 0) this.vx *= -1;
        this.y += this.vy;
        if (this.y > this.effect.height - this.height|| this.y < 0) this.vy *= -1;
    }
}

class Effect {
    constructor(canvas, image){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.image = image;

        this.image.onload = () => {
            this.logo = new Logo(this, this.image);
        };
        this.image.onload();
    }
    handleImage(context){
        this.logo.draw(context);
        this.logo.update();
    }
}
const effect = new Effect(canvas, image);

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    effect.handleImage(ctx);
    requestAnimationFrame(animate);
}

animate();