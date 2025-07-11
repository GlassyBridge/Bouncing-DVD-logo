class Logo {
    constructor(effect){
        this.effect = effect;
        this._size = 150;
        this._speed = 3;

        this.image = new Image();
        this.image.src = 'images/dvd-logo-png-19264.png';
        
        this.image.onload = () => {
            console.log("Image Loaded");
            
            let {width,height} = this.ratio(this.image);
            this.width = this.size * width;
            this.height = this.size * height;
            
            this.x = Math.random() * (this.effect.width - this.width);
            this.y = Math.random() * (this.effect.height - this.height);
        };

        this.vx = this.speed;
        this.vy = this.speed;

        this.image.onload();
        
        this.type = 'color';
        this.color = 'hsl(' + this.x / 4 + ', 100%, 50%)';
        this.change = true;
    }

    set size(newSize) {
        if (this._size !== newSize) {
            this._size = newSize;

            let {width,height} = this.ratio(this.image);
            this.width = this.size * width;
            this.height = this.size * height;

            this.x = Math.max(0, Math.min(this.effect.width - this.width, this.x));
            this.y = Math.max(0, Math.min(this.effect.height - this.height, this.y));
        }
    }
    get size() {
        return this._size;
    }

    set speed(newSpeed) {
        if (this._speed !== newSpeed) {
            this._speed = newSpeed;

            this.vx = (this.vx > 0 ? 1 : -1) * this._speed;
            this.vy = (this.vy > 0 ? 1 : -1) * this._speed;
        }
    }
    get speed() {
        return this._speed;
    }

    set imageSrc(newSrc) {
        if (this.image.src !== newSrc) {
            this.image.src = newSrc;

            let {width,height} = this.ratio(this.image);
            this.width = this.size * width;
            this.height = this.size * height;
        }
    }
    get imageSrc() {
        return this.image.src;
    }

    ratio(image){
        let width = image.naturalWidth;
        let height = image.naturalHeight;

        if (width == 0 || height == 0){
            return {width : 1, height : 1};
        }
        const aspectRatio = width / height;
            
        width = 1;
        height = 1 / aspectRatio;

        return {width, height};
    }
    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height);

        context.save();
        context.globalCompositeOperation = this.type; //'source-atop' for transparent backgrounds else use 'color'/'multiply'
        
        if (this.change) {
            context.fillStyle = 'hsl(' + this.x / 4 + ', 100%, 50%)';
        }
        else {
            context.fillStyle = this.color;
        }

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
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.logo = new Logo(this);
    }
    changeSpeed(speed){
        this.logo.speed = speed;
    }
    changeSize(size){
        this.logo.size = size;
    }
    changeImage(imageUrl){
        this.logo.image.src = imageUrl;
    }
    changeType(type){
        this.logo.type = type;
    }
    changeColor(color){
        this.logo.color = color;
    }
    randomColor(bolean){
        this.logo.change = bolean;
    }
    handleImage(context){
        this.logo.draw(context);
        this.logo.update();
    }
}

function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    effect.handleImage(ctx);
    requestAnimationFrame(animate);
}

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d', {willReadFrequently: true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const effect = new Effect(canvas);

animate();

const speedInput = document.getElementById('speedInput');
speedInput.value = effect.logo.speed;
const speedDisplay = document.getElementById('currentSpeed');
speedDisplay.value = effect.logo.speed;

const sizeInput = document.getElementById('sizeInput');
sizeInput.value = effect.logo.size / 10;
const sizeDisplay = document.getElementById('currentSize');
sizeDisplay.value = effect.logo.size / 10;

const randomColor = document.getElementById('rd-color');
const wiotb = document.getElementById('image-check');

const image = document.getElementById('image');
const color = document.getElementById('color');
const colorCont = document.getElementById('color-field')

speedInput.addEventListener('input', () => {
    speedDisplay.value = speedInput.value;
    effect.changeSpeed(parseInt(speedInput.value, 10));
});

speedDisplay.addEventListener('input', () => {
    speedInput.value = speedDisplay.value;
    effect.changeSpeed(parseInt(speedDisplay.value, 10));
});

sizeInput.addEventListener('input', () => {
    sizeDisplay.value = sizeInput.value;
    effect.changeSize(parseInt(sizeInput.value, 10) * 10);
});

sizeDisplay.addEventListener('input', () => {
    sizeInput.value = sizeDisplay.value;
    effect.changeSize(parseInt(sizeDisplay.value, 10) * 10);
});

image.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        effect.changeImage(URL.createObjectURL(file));
    }
});

wiotb.addEventListener('input', () => {
    if (wiotb.checked){
        effect.changeType('source-atop');
    }
    else {
        effect.changeType('multiply');
    }
});

randomColor.addEventListener('input', () => {
    if (randomColor.checked){
        colorCont.hidden = true;
        effect.randomColor(true);
    }
    else {
        colorCont.hidden = false;
        effect.randomColor(false);
    }
});

color.addEventListener('input', () => {
    console.log('color: ' + color.value);
    effect.changeColor(color.value);
});

const expand = document.getElementById('expand');
const hide = document.getElementById('hide');

expand.addEventListener('click', () => {
    if (expand.textContent === '• • •'){
        expand.textContent = '•••';
        hide.hidden = true;
    }
    else {
        expand.textContent = '• • •';
        hide.hidden = false;
    }
});