const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);

const image = new Image();
image.src = 'Screenshot 2025-07-10 at 5.09.11 PM.png';
console.log(image);

class Logo {
    constructor(effect, image){
        this.effect = effect;
        this.image = image;

        this.width = this.image.naturalWidth;
        this.height = this.image.naturalHeight;
        this.x = Math.random() * (this.effect.width - this.width);
        this.y = Math.random() * (this.effect.height - this.height);
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
}

image.onload = () => {
    const effect = new Effect(canvas);
    const logo = new Logo(effect, image);
    logo.draw(ctx);
};