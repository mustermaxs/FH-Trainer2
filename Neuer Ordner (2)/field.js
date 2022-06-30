const FIELD_PARTICLE_RADIUS = 4;
const LINE_WIDTH = 0.2;
const ACC = 2;
const NR_PARTICLES = 80;
const BALL_RADIUS = 7;
var PROX_LIMIT = 30;
const PARTICLE_MAX_SPEED = 1;
var ballsColor = "black";
const CONNECT = true;
const COLOR = "255, 190, 250";

document.querySelector("#showBalls").addEventListener("input", (ev) => {
    ballsColor = ev.target.checked == true ? "white" : "transparent";
})
document.querySelector("#proximity").addEventListener("change", (ev) => {
    PROX_LIMIT = parseInt(ev.target.value);
    log(PROX_LIMIT)
})
function shortestPath(x_0, y_0, x_1, y_1, v) {
//    const nrOfPoints = 
    var distance = Math.sqrt((x_1 - x_0) * (y_1 - y_0)) / 2
    var v_dest = {v_x: x_1 - x_0, v_y: y_1 - y_0};
    var t_dest = Math.sqrt(((distance)/ACC))
    var path = [];
    var timeStep = 0.2;
    var c = 0;
    var t = 0;
    var x_c = x_1 < x_0 ? +1 : -1;
    var y_c = y_1 < y_0 ? +1 : -1;

    while (t < t_dest) {
        var point_x = (ACC * (t*t)) + (x_0 * x_c)
        var point_y = (ACC * (t*t)) + (y_0 * y_c)
        path.push({x: point_x, y: point_y})
        t += timeStep;
    }
    return path;
}

const particleField = (function() {
    var field = [];
    for (var i=0; i < NR_PARTICLES; i++) {
        var randomLocation = {x: getRandomFloat(0, CANVAS_WIDTH, 0), y: getRandomFloat(0, CANVAS_HEIGHT, 0)}
        var particle = new Confetti(randomLocation.x, randomLocation.y, "field")
        // particle.fill = false;
        particle.color = "black";
        particle.size = FIELD_PARTICLE_RADIUS;
        particle.fill = true;
        field.push(particle);
        particle.draw();
    }
    return field;
    
})();


function checkIfBallsCollide(dist) {
    // var dist = distanceBetweenPoints(p_0.pos, p_1.pos)
    if (dist < (BALL_RADIUS + BALL_RADIUS)) {
        return true;
    }
    return false;
}

function calculateProximity(distance) {
    
    var res = (distance != 0) ? ( 1 / (distance / 100) ) : 1;
    return res
}

function drawLine(x_0, y_0, x_1, y_1, distance) {
    var prox_coeff = calculateProximity(distance)
    ctx.beginPath();
    ctx.moveTo(x_0 +( BALL_RADIUS / 2), y_0 +( BALL_RADIUS / 2));
    ctx.lineTo(x_1 +( BALL_RADIUS / 2), y_1 +( BALL_RADIUS / 2));
    // ctx.bezierCurveTo(x_0 + dist , distance * 2, x_0, distance * 2, x_1, y_1);

    ctx.strokeStyle = adjustColorToProximity(prox_coeff)
    ctx.lineWidth = LINE_WIDTH * prox_coeff;
    ctx.stroke()
}

function adjustColorToProximity(coeff) {
    return `rgba(${COLOR}, ${coeff})`;
}



function connect(i) {
    for (var j=i; j < particleField.length; j++) {
        var distance = distanceBetweenPoints({x:particleField[i].pos.x, y: particleField[i].pos.y},{x:particleField[j].pos.x, y: particleField[j].pos.y})         
        if (distance <= PROX_LIMIT && distance >= 8) {
            drawLine(particleField[i].pos.x, particleField[i].pos.y, particleField[j].pos.x, particleField[j].pos.y, distance)
            
        }
        // particleField[i].color = adjustColorToProximity(calculateProximity(distance))
        var ballsCollide = checkIfBallsCollide(distance);
        if (ballsCollide) {
            let dx = particleField[i].pos.x - particleField[j].pos.x;
            let dy = particleField[i].pos.y - particleField[j].pos.y;
            let angle = Math.atan2(dy, dx);
            let sin = Math.sin(angle);
            let cos = Math.cos(angle)

            let vx1 = (particleField[i].v_x * cos + particleField[i].v_y * sin)
            let vy1 = (particleField[i].v_y * cos - particleField[i].v_x * sin)

            let vx2 = (particleField[j].v_x * cos + particleField[j].v_y * sin)
            let vy2 = (particleField[j].v_y * cos - particleField[j].v_x * sin)

            particleField[i].v_x = vx2 * cos - vy1 * sin;
            particleField[i].v_y = vy1 * cos + vx2 * sin;
            particleField[j].v_x = vx1 * cos - vy2 * sin;
            particleField[j].v_y = vy2 * cos + vx1 * sin;
        }
    }
}

function getImpulse(particle) {
    return abs((particle.v_y) - (particle.v_x))
}

function force(p_0, p_1) {
    
    var effector = getImpulse(p_0) > getImpulse(p_1) ? {v_x: p_0.v_x, v_y: p_0.v_y} : {v_x: p_1.v_x, v_y: p_1.v_y};

}

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (var i=0; i < particleField.length; i++) {
        if (CONNECT) {
            connect(i)
        }
        particleField[i].color = ballsColor
        particleField[i].update()
    }
    requestAnimationFrame(animate)
}

const init = (function() {
    // var field = drawParticleField();
    PROX_LIMIT = parseInt(document.querySelector("#proximity").value);
    animate()
})()

