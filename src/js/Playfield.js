import {
    loadImage
} from "./loaders.js";
export default class Playfield {
    constructor(ctx, canvas, urls) {
        this.buffer = document.createElement('canvas');
        this.buffer.width = canvas.width;
        this.buffer.height = canvas.height;
        this.urls = urls;
        this.ctx = ctx;
        this.canvas = canvas;
        this.imgs = [];
    }
    load() {
        let images = [];
        this.urls.forEach(url => {
            images.push(loadImage(url))
        })
        return new Promise(resolve => {
            Promise.all(images).then((imgs) => {
                this.imgs = imgs;
                this.createBuffer();
                this.draw()
                resolve();
            });
        })
    }
    draw(laps = 4) {
        this.ctx.drawImage(this.buffer, 0, 0);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = "black"
        this.ctx.textAlign = "center";
        if(laps > 1) this.ctx.fillText("Pozostałe okrążenia: " + laps, 300, 150);
        else this.ctx.fillText("Ostatnie okrążenie!", 300, 150);
        
    }
    createBuffer() {
        const ctx = this.buffer.getContext('2d');
        const grass = ctx.createPattern(this.imgs[0], "repeat");
        const dirt = ctx.createPattern(this.imgs[1], "repeat");
        const finish = ctx.createPattern(this.imgs[2], "repeat");
        this.drawBackground(ctx, grass);
        this.drawTrack(ctx, dirt, grass, finish);
    }
    drawBackground(ctx, pattern) {
        ctx.rect(0, 0, this.buffer.width, this.buffer.height);
        ctx.fillStyle = pattern;
        ctx.fill();
    }
    drawTrack(ctx, pattern, bg, finish) {
        let width = this.buffer.width;
        let height = this.buffer.height;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width * 0.25, height);
        ctx.lineTo(width * 0.75, height)
        ctx.arc(width * 0.75, height * 0.5, height * 0.5, Math.PI / 2, 3 * Math.PI / 2, true);
        ctx.lineTo(width * 0.25, 0);
        ctx.arc(width * 0.25, height * 0.5, height * 0.5, 3 * Math.PI / 2, Math.PI / 2, true);
        ctx.fillStyle = pattern;
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width * 0.25, height * 0.65);
        ctx.lineTo(width * 0.75, height * 0.65);
        ctx.arc(width * 0.75, height * 0.5, height * 0.15, Math.PI / 2, 3 * Math.PI / 2, true);
        ctx.lineTo(width * 0.25, height * 0.35);
        ctx.arc(width * 0.25, height * 0.5, height * 0.15, 3 * Math.PI / 2, Math.PI / 2, true);
        ctx.closePath();
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = finish;
        ctx.fillRect(width * 0.5, height * 0.65, 20, height * 0.35);

    }
}