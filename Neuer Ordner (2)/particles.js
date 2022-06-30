class Confetti {
    constructor(x=50,y=50, mode="pop") {
        this.pos = {x: x, y:y};
        this.center = {x: this.pos.x + (this._size / 2), y: this.pos.y + (this._size / 2)}
        this._color = "white";
        this._size = CIRCLE_RADIUS;
        this.ctx = ctx;
        this.path = mode == "pop" ? calcParabola(x, y) : [];
        this._fillCircle = true;
        this.v_x = getRandomFloat(-PARTICLE_MAX_SPEED, PARTICLE_MAX_SPEED, 1);
        this.v_y = getRandomFloat(-PARTICLE_MAX_SPEED, PARTICLE_MAX_SPEED, 1);;
    }

    set setPosition(pos = {x:this.pos.x, y: this.pos.y}) {
        this.pos = {x: x, y: y};
    }

    set fill(shouldBeFilled) {
        this._fillCircle = shouldBeFilled;
    }

    get position() {
        return this.pos;
    }

    set color(_color) {
        this._color = _color;
        this.ctx.fillStyle = _color;
    }

    set size(_size) {
        this._size = _size;
    }

    renderPath(index) {
        if (index < this.path.length) {
            this.draw(this.path[index].x, this.path[index].y)

        }
    }

    draw(x = this.pos.x, y =  this.pos.y) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, this._size, 0, 2 * Math.PI);
        this.ctx.lineWidth = 5;
        if (this._fillCircle == true) {
            this.ctx.fillStyle = this._color

            this.ctx.fill()
        } 
        else {
            this.ctx.strokeStyle = this._color;
            this.ctx.stroke();
        }
    }

    set velocity(_velocity) {
        this.v_x = _velocity.x;
        this.v_y = _velocity.y;
    }



    update() {
        switch (true) {
            case (this.pos.x >= CANVAS_WIDTH - this._size):
                this.v_x = (-1) * Math.sqrt(this.v_x * this.v_x);
                break;
            case (this.pos.x <= this._size):
                this.v_x = Math.sqrt(this.v_x * this.v_x);
                break;
        }

        switch (true) {
            case (this.pos.y >= CANVAS_HEIGHT - this._size):
                this.v_y = (-1) * Math.sqrt(this.v_y * this.v_y);
                break;
            case (this.pos.y <= 0):
                this.v_y = Math.sqrt(this.v_y * this.v_y);
                break;
        }

        this.pos.x += this.v_x
        this.pos.y += this.v_y
        this.draw()
    } 
}