


const BLOCK_SIZE = 15;
const BLOCK_COLOR = "white";
const BODY_FOOD_COLOR = "green";
const UPDATE_RATE = 1000 / 2;
var lastTime = 0;
var elapsedTime = 0;
var nextDirection;



function checkKey(e) {

    e = e || window.event;

    switch (e.keyCode) {
        // up
        case 38:
            return {x: 0, y: -1}
            break;
            // down
        case 40:
            return {x: 0, y: 1}
            break;
            // left
        case 37:
            return {x: -1, y: 0}
            // right
        case 39:
            return {x: 1, y: 0}
        default:
            return;
        
    }
}


class Snake {
    constructor() {
        this.x_0;
        this.y_0;
        this.speed;
        this._direction = {x: 1, y: 0}
        this.body = [];
        this.foodBlocks = [];
        this.blockSize = BLOCK_SIZE;
        this.bodyColor = BLOCK_COLOR;
        this.bodyFoodColor = BODY_FOOD_COLOR
    }

    addBlock() {
        this.foodBlocks.push(1)
    }

    set direction(_direction = {x: 1, y: 0}) {
        if ((this._direction.x * _direction.x) == -1 || (this._direction.y * _direction.y) == -1) {
            log("skip direction")
            return
        }
        this._direction = _direction;
        log("direction: " + this._direction.x + " - " + this._direction.y)
        // this._direction.x += _direction.x == 1 ? this.blockSize : 0;
        // this._direction.y += _direction.y == 1 ? this.blockSize : 0;
    }

    updateFoodBlocks() {

        if (this.foodBlocks.length > 0) {
            for (var i=0; i < this.foodBlocks.length; i++) {
                if (this.foodBlocks[i] < this.body.length) {
                this.body[this.foodBlocks[i]].containsFood = true;
                this.foodBlocks[i]++;
            }
            else {
                this.foodBlocks.unshift();
            }
            }
        }
    }

    drawBlocks() {
        for (var i=0; i < this.body.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.body[i].containsFood ? this.bodyFoodColor : this.bodyColor;
            ctx.fillRect(this.body[i].x, this.body[i].y, this.blockSize, this.blockSize);
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.rect(this.body[i].x, this.body[i].y, this.blockSize, this.blockSize);
            ctx.stroke();
        }

    }

    update() {
        this.body[0].x += this._direction.x * this.blockSize;
        this.body[0].y += this._direction.y * this.blockSize;
        
        for (var i=1; i < this.body.length; i++) {
            this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y
        }
        this.drawBlocks()
        
        this.updateFoodBlocks();
    }
}
var lastTime = Date.now();
const mock = [{x:0, y: 0, containsFood: false, direction: {x:1, y:0}}, {x:1, y: 0, containsFood: false, direction: {x:1, y:0}},  {x:2, y: 0, containsFood: false, direction: {x:1, y:0}}]

var snake = new Snake();
snake.body = mock;
snake.update();
document.addEventListener("keydown", (ev) => {
    nextDirection = checkKey(ev);
})


const loop = () => {
    elapsedTime = Date.now() - lastTime;
    if (elapsedTime >= 1000) {
        snake.direction = nextDirection;
        ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        snake.update();
        lastTime = Date.now();
        // log("time elapsed: " + elapsedTime)
        elapsedTime = 0;

    }
    requestAnimationFrame(loop);

}




requestAnimationFrame(loop)