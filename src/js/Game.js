import Bike from "./Bike.js";
import Keyboard from "./Keyboard.js";

function endGame(color, ctx, all = false) {
    ctx.fillStyle = "rgba(0,0,0, 0.5)"
    ctx.fillRect(0, 0, 600, 300)
    ctx.fillStyle = "red";
    if (all) {
        ctx.fillText("Nikt nie wygrał XD", 300, 150);
        return;
    }
    let c = "czerwony";
    switch (color) {
        case "gold":
            {
                c = "żółty";
                break;
            }
        case "limegreen":
            {
                c = "zielony";
                break;
            }
        case "blue":
            {
                c = "niebieski";
                break;
            }
    }
    ctx.fillText("Zwycięzył gracz " + c + "! Gratulacje!", 300, 150);
}
export default class Game {
    constructor(ctx, playfield) {
        this.ctx = ctx;
        this.playfield = playfield;
        this.bikes = [];
        this.input = new Keyboard();
        this.laps = 4;
        this.colors = [];
    }
    start() {
        if (this.bikes.length) {
            this.input.listenTo(window);
            let bikes = this.bikes;
            let playfield = this.playfield;
            let ctx = this.ctx;
            let input = this.input;
            let laps = this.laps;
            let this_ = this;
            let animation;
            let dead = [];
            let end = false;

            function render() {
                if (dead.length === bikes.length) {
                    cancelAnimationFrame(animation);
                    endGame("xd", this_.ctx, true);
                    return;
                }
                if (dead.length === bikes.length - 1 && bikes.length !== 1) {
                    dead.forEach(bike => {
                        if (this_.colors.indexOf(bike.color) !== -1) {
                            this_.colors.splice(this_.colors.indexOf(bike.color), 1);
                        }
                    })
                    cancelAnimationFrame(animation);
                    endGame(this_.colors[0], this_.ctx)
                    return;
                }

                playfield.draw(this_.laps);
                bikes.forEach(bike => {
                    if (bike.speed > 0) {
                        let left = input.keyStates.get(bike.leftTurnKey) * -1;
                        bike.rotation += bike.angle * (left ? left : 0);
                        bike.move();
                        if (bike.checkLap()) {
                            bike.lapsLeft--;
                            if (bike.lapsLeft === 0) {
                                bikes.forEach(bike => {
                                    bike.speed = 0;
                                })
                                cancelAnimationFrame(animation);
                                endGame(bike.color, this_.ctx);
                                end = true;
                                return;
                            }

                            if (bike.lapsLeft < this_.laps) this_.laps = bike.lapsLeft;
                        }
                        if (!bike.checkCollsion(600, 300)) {
                            bike.draw(ctx);
                        } else {
                            if (bike.speed > 0) {
                                dead.push(bike);
                            }
                            bike.speed = 0;
                            bike.draw(ctx);
                            return;
                        }
                    } else {
                        bike.draw(ctx);
                    }

                });
                if (!end) animation = requestAnimationFrame(render);
            }
            render();
        }
    }
    addBike(color) {
        let bike = new Bike(color);
        this.bikes.push(bike);
        this.colors.push(color);
        bike.y = 200 + 20 * this.bikes.length;
        bike.x = 278;
        bike.lapsLeft = this.laps + 1;
        bike.active = true;
        bike.draw(this.ctx);
    }
    setPlayerKey(color, key) {
        let bike = this.bikes.find(bike => bike.color === color);
        if (bike) {
            if (this.input.addKey(key)) {
                bike.leftTurnKey = key;
                return true;
            } else return false;
        }
    }
}