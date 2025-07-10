const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d', {willReadFrequently: true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const image = new Image();
image.src = 'https://www.pngfind.com/pngs/b/47-476875_dvd-logo-png.png';
//image.src = 'Screenshot 2025-07-10 at 5.09.11 PM.png';

image.onload = function (){
    const width = image.naturalWidth;
    const height = image.naturalHeight;

    const ratio = width/height;
};

class Logo {
    constructor(effect, image){
        this.effect = effect;
        this.image = image;
        this.size = 150;
        
        let {width,height} = this.ratio(this.image);
        this.width = this.size * width;
        this.height = this.size * height;
        
        this.x = Math.random() * (this.effect.width - this.width);
        this.y = Math.random() * (this.effect.height - this.height);
        
        this.vx = 3;
        this.vy = 3;
        
    }
    ratio(image){
        let width = image.naturalWidth;
        let height = image.naturalHeight;
        const aspectRatio = width / height;
            
        width = 1;
        height = 1 / aspectRatio;

        return {width, height};
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

        context.save();
        context.globalCompositeOperation = 'color'; //'source-atop' for transparent backgrounds.
        context.fillStyle = 'hsl(' + this.x / 4 + ', 100%, 50%)';

        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
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