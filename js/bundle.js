/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Bike.js":
/*!************************!*\
  !*** ./src/js/Bike.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _math = __webpack_require__(/*! ./math.js */ "./src/js/math.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bike = function () {
    function Bike() {
        var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "red";

        _classCallCheck(this, Bike);

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

    _createClass(Bike, [{
        key: "move",
        value: function move() {
            if (this.active) {
                this.mark.push({
                    x: this.x,
                    y: this.y
                });
                if (this.mark.length > 100) {
                    this.mark.shift();
                }
                var dx = this.speed * Math.cos(this.rotation);
                var dy = this.speed * Math.sin(this.rotation);
                this.x = this.x + dx;
                this.y = this.y + dy;
            }
        }
    }, {
        key: "checkCollsion",
        value: function checkCollsion(width, height) {
            if (this.active) {
                if (this.y < 1 || this.y > height) {
                    return true;
                }
                if (this.x > width * 0.25 && this.x < width * 0.75) {
                    if (this.y > height * 0.35 && this.y < height * 0.65) return true;
                } else if (this.x <= width * 0.25) {
                    var distance = Math.sqrt(Math.pow(this.x - width * 0.25, 2) + Math.pow(this.y - height * 0.5, 2));
                    if (distance > height * 0.5 || distance < height * 0.15) return true;
                } else if (this.x >= width * 0.75) {
                    var _distance = Math.sqrt(Math.pow(this.x - width * 0.75, 2) + Math.pow(this.y - height * 0.5, 2));
                    if (_distance > height * 0.5 || _distance < height * 0.15) return true;
                }
            }
        }
    }, {
        key: "checkLap",
        value: function checkLap() {
            if (this.active && this.speed > 0) {
                return this.x > 300 && this.x <= 300 + this.speed && this.y > 150;
            }
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            if (this.active) {
                // ctx.beginPath();
                // ctx.fillStyle = this.color;
                // ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
                // ctx.fill();
                //console.log(this.)
                if (this.speed > 0 && this.mark.length > 0) {
                    var j = 0;
                    for (var i = this.mark.length - 1; i >= 0; i--) {
                        ctx.beginPath();
                        var alpha = (0, _math.easeInOut)(j * 0.01) - 1;
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
    }]);

    return Bike;
}();

exports.default = Bike;

/***/ }),

/***/ "./src/js/Game.js":
/*!************************!*\
  !*** ./src/js/Game.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Bike = __webpack_require__(/*! ./Bike.js */ "./src/js/Bike.js");

var _Bike2 = _interopRequireDefault(_Bike);

var _Keyboard = __webpack_require__(/*! ./Keyboard.js */ "./src/js/Keyboard.js");

var _Keyboard2 = _interopRequireDefault(_Keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function endGame(color, ctx) {
    var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    ctx.fillStyle = "rgba(0,0,0, 0.5)";
    ctx.fillRect(0, 0, 600, 300);
    ctx.fillStyle = "red";
    if (all) {
        ctx.fillText("Nikt nie wygrał XD", 300, 150);
        return;
    }
    var c = "czerwony";
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

var Game = function () {
    function Game(ctx, playfield) {
        _classCallCheck(this, Game);

        this.ctx = ctx;
        this.playfield = playfield;
        this.bikes = [];
        this.input = new _Keyboard2.default();
        this.laps = 4;
        this.colors = [];
    }

    _createClass(Game, [{
        key: "start",
        value: function start() {
            if (this.bikes.length) {
                this.input.listenTo(window);
                var bikes = this.bikes;
                var playfield = this.playfield;
                var ctx = this.ctx;
                var input = this.input;
                var laps = this.laps;
                var this_ = this;
                var animation = void 0;
                var dead = [];
                var end = false;

                function _render() {
                    if (dead.length === bikes.length) {
                        cancelAnimationFrame(animation);
                        endGame("xd", this_.ctx, true);
                        return;
                    }
                    if (dead.length === bikes.length - 1 && bikes.length !== 1) {
                        dead.forEach(function (bike) {
                            if (this_.colors.indexOf(bike.color) !== -1) {
                                this_.colors.splice(this_.colors.indexOf(bike.color), 1);
                            }
                        });
                        cancelAnimationFrame(animation);
                        endGame(this_.colors[0], this_.ctx);
                        return;
                    }

                    playfield.draw(this_.laps);
                    bikes.forEach(function (bike) {
                        if (bike.speed > 0) {
                            var left = input.keyStates.get(bike.leftTurnKey) * -1;
                            bike.rotation += bike.angle * (left ? left : 0);
                            bike.move();
                            if (bike.checkLap()) {
                                bike.lapsLeft--;
                                if (bike.lapsLeft === 0) {
                                    bikes.forEach(function (bike) {
                                        bike.speed = 0;
                                    });
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
                    if (!end) animation = requestAnimationFrame(_render);
                }
                _render();
            }
        }
    }, {
        key: "addBike",
        value: function addBike(color) {
            var bike = new _Bike2.default(color);
            this.bikes.push(bike);
            this.colors.push(color);
            bike.y = 200 + 20 * this.bikes.length;
            bike.x = 278;
            bike.lapsLeft = this.laps + 1;
            bike.active = true;
            bike.draw(this.ctx);
        }
    }, {
        key: "setPlayerKey",
        value: function setPlayerKey(color, key) {
            var bike = this.bikes.find(function (bike) {
                return bike.color === color;
            });
            if (bike) {
                if (this.input.addKey(key)) {
                    bike.leftTurnKey = key;
                    return true;
                } else return false;
            }
        }
    }]);

    return Game;
}();

exports.default = Game;

/***/ }),

/***/ "./src/js/Keyboard.js":
/*!****************************!*\
  !*** ./src/js/Keyboard.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
    function Keyboard() {
        _classCallCheck(this, Keyboard);

        this.keyStates = new Map();
        this.assignedKeys = new Map();
    }

    _createClass(Keyboard, [{
        key: 'addKey',
        value: function addKey(key) {
            if (!this.assignedKeys.has(key)) {
                this.assignedKeys.set(key, 1);
                this.keyStates.set(key, 0);
                return true;
            } else {
                window.alert("Ten klawisz jest zajęty");
                return false;
            }
        }
    }, {
        key: 'handleEvent',
        value: function handleEvent(e) {
            var key = e.code;
            if (!this.assignedKeys.has(key)) {
                return;
            }
            e.preventDefault();

            var keyState = e.type === 'keydown' ? 1 : 0;
            if (this.keyStates.get(key) === keyState) return;
            this.keyStates.set(key, keyState);
        }
    }, {
        key: 'listenTo',
        value: function listenTo(window) {
            var _this = this;

            ['keydown', 'keyup'].forEach(function (eName) {
                window.addEventListener(eName, function (e) {
                    _this.handleEvent(e);
                });
            });
        }
    }]);

    return Keyboard;
}();

exports.default = Keyboard;

/***/ }),

/***/ "./src/js/Playfield.js":
/*!*****************************!*\
  !*** ./src/js/Playfield.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loaders = __webpack_require__(/*! ./loaders.js */ "./src/js/loaders.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Playfield = function () {
    function Playfield(ctx, canvas, urls) {
        _classCallCheck(this, Playfield);

        this.buffer = document.createElement('canvas');
        this.buffer.width = canvas.width;
        this.buffer.height = canvas.height;
        this.urls = urls;
        this.ctx = ctx;
        this.canvas = canvas;
        this.imgs = [];
    }

    _createClass(Playfield, [{
        key: "load",
        value: function load() {
            var _this = this;

            var images = [];
            this.urls.forEach(function (url) {
                images.push((0, _loaders.loadImage)(url));
            });
            return new Promise(function (resolve) {
                Promise.all(images).then(function (imgs) {
                    _this.imgs = imgs;
                    _this.createBuffer();
                    _this.draw();
                    resolve();
                });
            });
        }
    }, {
        key: "draw",
        value: function draw() {
            var laps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

            this.ctx.drawImage(this.buffer, 0, 0);
            this.ctx.font = "20px Comic Sans MS";
            this.ctx.fillStyle = "black";
            this.ctx.textAlign = "center";
            if (laps > 1) this.ctx.fillText("Pozostałe okrążenia: " + laps, 300, 150);else this.ctx.fillText("Ostatnie okrążenie!", 300, 150);
        }
    }, {
        key: "createBuffer",
        value: function createBuffer() {
            var ctx = this.buffer.getContext('2d');
            var grass = ctx.createPattern(this.imgs[0], "repeat");
            var dirt = ctx.createPattern(this.imgs[1], "repeat");
            var finish = ctx.createPattern(this.imgs[2], "repeat");
            this.drawBackground(ctx, grass);
            this.drawTrack(ctx, dirt, grass, finish);
        }
    }, {
        key: "drawBackground",
        value: function drawBackground(ctx, pattern) {
            ctx.rect(0, 0, this.buffer.width, this.buffer.height);
            ctx.fillStyle = pattern;
            ctx.fill();
        }
    }, {
        key: "drawTrack",
        value: function drawTrack(ctx, pattern, bg, finish) {
            var width = this.buffer.width;
            var height = this.buffer.height;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(width * 0.25, height);
            ctx.lineTo(width * 0.75, height);
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
    }]);

    return Playfield;
}();

exports.default = Playfield;

/***/ }),

/***/ "./src/js/UI.js":
/*!**********************!*\
  !*** ./src/js/UI.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ui;
function getColor(el) {
    var playerNum = el.parentNode.parentNode.className.split('-')[1];
    var color = void 0;
    switch (playerNum) {
        case "1":
            {
                color = "red";
                break;
            }
        case "2":
            {
                color = "blue";
                break;
            }
        case "3":
            {
                color = "limegreen";
                break;
            }
        case "4":
            {
                color = "gold";
                break;
            }
    }
    return color;
}

function ui(game) {
    var addPlayerBtns = document.getElementsByClassName('add-player');
    for (var i = 0; i < addPlayerBtns.length; i++) {
        addPlayerBtns[i].addEventListener('click', function (e) {
            e.target.parentNode.style.display = "none";
            game.addBike(getColor(e.target));
        });
    }
    document.querySelector(".start-game").addEventListener("click", function (e) {
        game.start();
        e.target.style.display = "none";
        document.getElementById("players-wrapper").style.display = "none";
    });
    var kbBtns = document.querySelectorAll('button[class^="turn"]');

    var _loop = function _loop(_i) {
        kbBtns[_i].addEventListener("click", function (e) {
            var overlay = document.createElement('div');
            overlay.classList.add('press-key');
            overlay.innerText = "Wciśnij klawisz";
            document.body.appendChild(overlay);
            var color = getColor(e.target);
            document.onkeypress = function (e) {
                e.preventDefault();
                if (game.setPlayerKey(color, e.code)) {
                    kbBtns[_i].innerText = e.code;
                }
                document.body.removeChild(overlay);
                document.onkeypress = function () {};
            };
        });
    };

    for (var _i = 0; _i < kbBtns.length; _i++) {
        _loop(_i);
    }
}

/***/ }),

/***/ "./src/js/loaders.js":
/*!***************************!*\
  !*** ./src/js/loaders.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadImage = loadImage;
function loadImage(url) {
    return new Promise(function (resolve) {
        var image = new Image();
        image.addEventListener('load', function () {
            resolve(image);
        });
        image.src = url;
    });
}

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Playfield = __webpack_require__(/*! ./Playfield.js */ "./src/js/Playfield.js");

var _Playfield2 = _interopRequireDefault(_Playfield);

var _Game = __webpack_require__(/*! ./Game.js */ "./src/js/Game.js");

var _Game2 = _interopRequireDefault(_Game);

var _UI = __webpack_require__(/*! ./UI.js */ "./src/js/UI.js");

var _UI2 = _interopRequireDefault(_UI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IMAGES = ['images/grass.jpg', 'images/dirt.jpg', 'images/meta.jpg', 'images/blue.png', 'images/limegreen.png', 'images/red.png', 'images/gold.png'];

document.addEventListener('DOMContentLoaded', function (e) {
    var canvas = document.getElementById("screen");
    var ctx = canvas.getContext("2d");
    var playfield = new _Playfield2.default(ctx, canvas, IMAGES);
    playfield.load().then(function () {
        var game = new _Game2.default(ctx, playfield);
        (0, _UI2.default)(game);
    });
});

/***/ }),

/***/ "./src/js/math.js":
/*!************************!*\
  !*** ./src/js/math.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.easeInOut = easeInOut;
function easeInOut(x) {
    return x * x / (x * x) + (1 - x) * (1 - x);
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map