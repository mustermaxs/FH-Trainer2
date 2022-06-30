const log = console.log

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const followPathBtn = document.querySelector("#followPath")

const CIRCLE_RADIUS = 14;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;

const pubsub = (function() {
    var subscribers = {};
    var token = -1;

    const subscribe = (topic, foo) => {
        if (!(topic in subscribers)) {
            subscribers[topic] = [];
        }
        subscribers[topic].push({id: ++token, foo: foo})
        return token;
        
    }
    const publish = (topic, data) => {
        if (!(topic in subscribers)) {
            return
        }
        subscribers[topic].forEach((subscriber) => {
            subscriber.foo(data)
        })
    }
    const unsubscribe = (topic, id) => {
        for (var i=0; i < subscribers[topic].length; i++) {
            if (subscribers[topic][i].id == id) {
                subscribers[topic].splice(i, 1);
            }
        }
    }
    return {
        subscribe: subscribe,
        publish: publish,
        unsubscribe: unsubscribe
    }
})();



class Mouse {
    constructor() {
        this.traces = [];
        this.handleTracing = this.handleTracing.bind(this)
        this.mouseCurrentlyDown = false;
    }

    mouseDown() {
        document.addEventListener("mousedown", handleMouseDown)
        // document.addEventListener("mouseup", handleMouseUp)
    }
    handleMouseDown(ev) {
        
    }
    handleMouseUp() {

    }

    handleMouseMove() {

    }

    handleTracing(mouseMoveEv) {
        if (this.traces.length > 500) {
            this.traces.shift();
        }
          this.traces.push({x: mouseMoveEv.clientX, y: mouseMoveEv.clientY});
          pubsub.publish("trace_added", this.traces[this.traces.length - 1])
    }

    trace() {
        const onMouseMove = (ev) => {
            document.addEventListener("mousemove", this.handleTracing);
            document.addEventListener("mouseup", (ev) => {
                pubsub.publish("trace_mouseup", {last_x: ev.clientX, last_y: ev.clientY})
                document.removeEventListener("mousemove", this.handleTracing); 
            
        })
        }
        this.traces = [];
        const onMouseDown = () => {
            
        }

        document.addEventListener("mousedown", onMouseMove);

        
    }
}
m = new Mouse();
m.trace()

class TraceableObject {

}


function createAcceleration(data) {
var {x_0, y_0, distance, units, dx, dy} = data;
    // x_0, y_0, y_1, y_1, vel_max, distance, units, dx, dy, x,y
    var accelerationPoints = [];
    for (var k=0; k < units ; k++) {
        var accCoeffX = (Math.cos(Math.PI*x_0) + 1) / 2
        var accCoeffY = (Math.cos(Math.PI*y_0) + 1) / 2
        if (dx <  0) { x_0 = x_0 + (accCoeffX * units) }
        else {  x_0 = x_0 - (accCoeffX * units) }
        if (dy < 0 ) { y_0 = y_0 + (accCoeffY * units) }
        else {  y_0 = y_0 - (accCoeffY * units) }
       
        accelerationPoints.push({x: x_0, y: y_0})
    }
    log(accelerationPoints)
    return accelerationPoints
}

class Circle {
    constructor() {
        this.x = 30;
        this.y = 30;
        this.color = "white";
        this.velocity = 0.8;
        this.dest = {x: 30, y:30}
        this.reachedDestination = true;
        this.shortestPathArray = [];
        this.pointCounter = 0;
        this.followPath = this.followPath.bind(this)
        log("draw circle")
    }

    moveTo() {
        // if (this.x == this.dest.x && this.y == this.dest.y) {
        //     this.reachedDestination = true;
        //     return
        // }
        // this.reachedDestination = false;
        // if (this.x < this.dest.x) {this.x += this.velocity;}
        // else {this.x -= this.velocity}
        // if (this.y < this.dest.y) {this.y += this.velocity}
        // else {this.y -= this.velocity}

        // this.draw(this.x, this.y);
        
        if (this.pointCounter < this.shortestPathArray.length -1) {
            this.pointCounter++;
            var nextPoint = this.shortestPathArray[this.pointCounter];
            this.draw(nextPoint.x, nextPoint.y);
            return;
        }
        this.pointCounter = 0;
        this.reachedDestination = true;
        this.shortestPathArray = [];
        
    }

    setDestination(dest_x,dest_y) {
        this.dest = {x: dest_x, y:dest_y}
        this.createShortestPath(dest_x, dest_y)
        this.reachedDestination = false;

    }

    followPath(path) {
        if (this.x != path[0].x) {
            this.setDestination(path[0].x, path[0].y);
            return
        }
        this.reachedDestination = false;
        this.shortestPathArray = path;
        log(path)
        this.moveTo()

    }

    draw(x, y){
        this.x = x;
        this.y = y;
        // log("X: " + this.x)
        // log("Y: " + this.y)
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = "0.3"
        ctx.arc(this.x, this.y, CIRCLE_RADIUS, 0, 2 * Math.PI);
        ctx.stroke();
    }

    update() {
        if(!this.reachedDestination) {
            this.moveTo()
        }
        this.draw(this.x, this.y)
    }

    createShortestPath(x,y) {
        var point_x = this.x;
        var point_y = this.y;
        this.shortestPathArray = [];
        var dx = x - this.x;
        var dy = y - this.y;
        var distance = Math.sqrt(((dx*dx) + (dy*dy)));
        var units = Math.round(distance / this.velocity);

        var x_units = dx / units;
        var y_units = dy / units;
        for (var i=0; i < units; i++) {

            if (this.x < x) {point_x += x_units}
            else { point_x += x_units}
            if (this.y < y) {point_y += y_units}
            else { point_y += y_units}
            
            this.shortestPathArray.push({x: point_x, y: point_y})
        }
        // this.shortestPathArray = createAcceleration({
        //     x_0: x, y_0: y, distance: distance, units: units, dx: dx, dy: dy
        // })
    }



    static getCenterPoint() {
        return {
            x: this.x + CIRCLE_RADIUS,
            y: this.y + CIRCLE_RADIUS
        }
    }
}

const circle = new Circle();

const randomColor = () => {
     return {
        r: getRandomInt(0, 250),
        g: 0,
        b: getRandomInt(0, 250)
    }
}
var balls = []
function paint(point) {
        var color = randomColor();
        ctx.beginPath();
        ctx.lineWidth = "0.6"
        ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.strokeStyle = `white`;

        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.stroke();
        return {x: point.x, y: point.y}
        
}
function createCircle(point) {
    var color = randomColor();
    ctx.beginPath();
    ctx.lineWidth = "0.6"
    ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
    ctx.strokeStyle = `white`;

    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    ctx.stroke();
    balls.push({x: point.x, y: point.y})
    return {x: point.x, y: point.y}
    
}

pubsub.subscribe("trace_added", (point) => { paint(point); balls.push(point)})


// canvas.addEventListener("click", (ev) => {
//     log(circle.x)
    
//     circle.setDestination(ev.clientX, ev.clientY)
// });


const init = (function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle.draw(30,30);
    // window.requestAnimationFrame(render)
})()

function calcCoor(ball) {
    var acc = getRandomFloat(0,0.8, 2);
    // var acc = 0.05
    var pathPoints = [];
    var t = 0;
    var y = ball.y;
    while (y < CANVAS_HEIGHT) {
       y = (acc *( Math.pow(t++,2))) + ball.y;
        pathPoints.push({x: ball.x, y: y})
    }
    return pathPoints
}



for (var i=0; i < 100; i++) {
    var x = getRandomInt(0, CANVAS_WIDTH)
    var y = getRandomInt(0, CANVAS_HEIGHT)
    paint({x: x, y: y})
    balls.push({x,y})
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var j = -1;

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    j++;
    for (var i=0; i < balls.length; i++) {
        var ball = balls[i]
        if (j < ball.path.length) {
            paint({x: ball.path[j].x, y: ball.path[j].y})
        }

    }
    // balls.forEach((ball) => {
    //     if (i < ball.path.length) {
    //         paint({x: ball.path[i].x, y: ball.path[i].y})
    //     }
    //     else {

    //     }

    // })
    window.requestAnimationFrame(render)
}
function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }


var mouse = new Mouse();
mouse.trace(createCircle)

followPathBtn.addEventListener("click", ()=> {
    balls.forEach((ball) => {
        ball.path = calcCoor(ball);
    })

    window.requestAnimationFrame(render)

})