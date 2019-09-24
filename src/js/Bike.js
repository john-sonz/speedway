import {
    easeInOut
} from "./math.js"
export default class Bike {
    constructor(color = "red") {
        this.color = color;
        this.speed = 3;
        this.active = false;
        this.angle = 3 * Math.PI / 180;
        this.rotation = 0;
        this.x = 300;
        this.y = 250;
        this.leftTurnKey = false;
        this.mark = [];
        this.img = new Image();
        this.img.src = "images/" + this.color + ".png";
    }
    move() {
        if (this.active) {
            this.mark.push({
                x: this.x,
                y: this.y
            });
            if (this.mark.length > 100) {
                this.mark.shift();
            }
            let dx = this.speed * Math.cos(this.rotation);
            let dy = this.speed * Math.sin(this.rotation);
            this.x = this.x + dx;
            this.y = this.y + dy;
        }
    }
    checkCollsion(width, height) {
        if (this.active) {
            if (this.y < 1 || this.y > height) {
                return true;
            }
            if (this.x > width * 0.25 && this.x < width * 0.75) {
                if (this.y > height * 0.35 && this.y < height * 0.65) return true;
            } else if (this.x <= width * 0.25) {
                let distance = Math.sqrt((Math.pow((this.x - width * 0.25), 2) + Math.pow((this.y - height * 0.5), 2)));
                if (distance > height * 0.5 || distance < height * 0.15) return true;
            } else if (this.x >= width * 0.75) {
                let distance = Math.sqrt((Math.pow((this.x - width * 0.75), 2) + Math.pow((this.y - height * 0.5), 2)));
                if (distance > height * 0.5 || distance < height * 0.15) return true;
            }
        }
    }
    checkLap() {
        if (this.active && this.speed > 0) {
            return (this.x > 300 && this.x <= (300 + this.speed) && this.y > 150)
        }
    }
    draw(ctx) {
        if (this.active) {
            if (this.speed > 0 && this.mark.length > 0) {
                let j = 0;
                for (let i = this.mark.length - 1; i >= 0; i--) {
                    ctx.beginPath();
                    let alpha = easeInOut(j * 0.01) - 1;
                    ctx.fillStyle = "rgba(0,0,0," + alpha + ")";
                    ctx.arc(this.mark[i].x, this.mark[i].y, 5, 0, 2 * Math.PI);
                    ctx.fill();
                    j++;
                }
            }
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.drawImage(this.img, -22, -12, 45, 24);
            ctx.restore();

        }
    }
}