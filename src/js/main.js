import Playfield from "./Playfield.js";
import Game from "./Game.js";
import ui from "./UI.js";

const IMAGES = ['images/grass.jpg', 'images/dirt.jpg', 'images/meta.jpg', 'images/blue.png', 'images/limegreen.png', 'images/red.png', 'images/gold.png'];

document.addEventListener('DOMContentLoaded', e => {
    const canvas = document.getElementById("screen");
    const ctx = canvas.getContext("2d");
    const playfield = new Playfield(ctx, canvas, IMAGES)
    playfield.load().then(() => {
        const game = new Game(ctx, playfield);
        ui(game);
    })
});