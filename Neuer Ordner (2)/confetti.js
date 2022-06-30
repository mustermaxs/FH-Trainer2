



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



function calcParabola(x_start, y_start, v_x=randomVelocity().v_x, v_y=randomVelocity().v_y) {
    var path = [];
    var t = 1;
    var x = 0, y = 0;
    while ((x < CANVAS_WIDTH && x >= 0) && (y < CANVAS_HEIGHT &&  y >= 0)) {
        x = v_x * t + x_start;
        y = y_start + ((v_y * t ) + ((G / 2) * Math.pow(t, 2)) );
        t += 0.2
        path.push({x:x, y:y});
    }

    return path;
}

function randomVelocity() {
    return {
        v_x: getRandomFloat(-25, 25, 2),
        v_y: getRandomFloat(-45,-1, 2)
    }
}



var pathIndex = 0;
function renderConfetti() {
    var confetties = this.confetties;
    
    // path für jedes einzelne Confetti-Partikel im Confetti-Objekt speicher (this.path)
    this.pathIndex++;
    for (var i=0; i < confetties.length; i++) {
        var confetti = confetties[i];
        confetti.renderPath(this.pathIndex);
    }
    this.pathIndex++;

}

function render(cb) {
    var t_1 = new Date().getMilliseconds();
    // if (t_1 - cb.t_0 >= 300) {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // for (var a=0; a < confetties.length; a++) {
    //     var confetti = confetties[a];
    //     confetti.
    // }
    renderConfetti(this)
    log(`rendererd ${this.blastID}`)

    window.requestAnimationFrame(this.render)
// }
}

var blastID = -1;
function ConfettiBlast(ev) {
    blastID++;
    this.blastID = blastID;
    this.confetties = [];
    this.pathIndex = 0;
    this.t_0 = new Date().getSeconds();
    const NUMBER_OF_PARTICLES = 30;

    this.render = () => {
            var t_1 = new Date().getMilliseconds();
            // if (t_1 - cb.t_0 >= 300) {
            ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        
            // for (var a=0; a < confetties.length; a++) {
            //     var confetti = confetties[a];
            //     confetti.
            // }
            this.renderParticles(this)
            log(`rendererd ${this.blastID}`)
        
            window.requestAnimationFrame(this.render)
        // }
    }

    this.renderParticles = () => {
            var confetties = this.confetties;
            
            // path für jedes einzelne Confetti-Partikel im Confetti-Objekt speicher (this.path)
            this.pathIndex++;
            for (var i=0; i < confetties.length; i++) {
                var confetti = confetties[i];
                confetti.renderPath(this.pathIndex);
            }
            this.pathIndex++;
        
    }

    for (var i=0; i < NUMBER_OF_PARTICLES; i++) {
        var confetti = new Confetti(ev.clientX, ev.clientY)
        confetti.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        confetti.draw();
        this.confetties.push(confetti)
    }
    log("new confetti-blast, id: "+this.blastID)
    
    // window.requestAnimationFrame(render)
}

// var confetties = [];

const initConfetti = () => {
canvas.addEventListener("click", (ev) => {
    log("x: "+ev.clientX)
    log("y: "+ev.clientY)
    cb = new ConfettiBlast(ev)
    // setInterval(() => {renderConfetti()}, 500)
    var t_0 = new Date().getMilliseconds();
    window.requestAnimationFrame(() => {cb.render(cb)})
})
}