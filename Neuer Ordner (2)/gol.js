/*
REGELN:
    x = 0 : n == 3          ->      x = 1
    x = 1 : n < 2           ->      x = 0
    x = 1 : 2 <= n <= 3     ->      x = 1
    x = 1 : n >= 3          ->      x = 0

*/



const log = console.log

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const followPathBtn = document.querySelector("#followPath")

const CIRCLE_RADIUS = 14;
const CANVAS_WIDTH = 250;
const CANVAS_HEIGHT = 250;
const PLAYER_SIZE = 10;

var field = (function createField() {
    var field = [];
    var nr_rows = CANVAS_HEIGHT / PLAYER_SIZE;
    var nr_columns = CANVAS_WIDTH / PLAYER_SIZE;
    log("rows: " + nr_rows)
    log("columns: " + nr_columns)
    for (var i=0; i < nr_rows; i++) {
        var row = [];
        for (var j=0; j < nr_columns; j++) {
            var p = getRandomInt(0,1)
            
            row.push(p)
        }
        field.push(row)
    }
    log(field)
    return field;
})()

// for (var i=0; i < field.length; i++) {
//     for (var j=0; j < field[i].length; j++) {
//         var c = field[i][j] == 0 ? "white" : "black";
//         log(c)
//         addPlayer(i*5, j*5, c)
//     }
// }

function cell(x,y, status) {
    // field[x][y] = 1;
    var color = status == 0 ? "black" : "white";
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.lineWidth = PLAYER_SIZE.toString()
    ctx.fillRect(x*PLAYER_SIZE, y*PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);

    // this.inc = (x, y) => {
    //     this.partitions[x][y]++;
    //     return this;
    // }
    // this.decr = (x, y) => {
    //     this.partitions[x][y]--;
    //     return this;
    // }

    // this.get = (x, y) => {
    //     return this.partitions[x][y];
    // }
}

function killPlayer(x,y) {
    field[x][y] = 0;
}

// const patterns = {
//     0: {
//         pattern: [0,0],
//         interact: {

//         }
//     },
//     1: {
//         pattern: [0,1],
//         der: {
//             1: [1,0],
//         },
//         interact: {
//             top: 
//         }
//     }
// };

function Pattern() {
    this.patterns = {
        0: [0,0],
        1: [0,1],
        2: [1,0],
        3: [1,1]
    };
    this.interactions = {}
    // { 0: {1: {t}} }
    this.token = -1;
    this.patternMap = [];

    // interaction { patternID: {  } }
    this.init = (field) => {
        var rows = field.length;
        for (var i=0; i < rows; i++) {
            var j = 0;
            var newRow = [];
            this.patternMap.push(newRow)
            while (j < rows -1) {
                var patternFromField = [field[i][j], field[i][j+1]]
                var pattern = this.check(patternFromField)
                this.addPatternToMap(i, j, pattern);
                j++;
            }
        }
        log(this.patternMap)
    }

    

    this.addPatternToMap = (coor_x, coor_y, patternID) => {
        this.patternMap[coor_x][coor_y] = patternID;
        
    }

    this.check = (pattern) => {
        for (const [key, value] of Object.entries(this.patterns)) {
            if (value[0] ==pattern[0] && value[1] == pattern[1]) {
                return parseInt(key)
            }
        }
    }

    

    this.identifyPattern = (x,y,field) => {
        switch (x) {
            case 0:
                x_limit = 0;
                break;
            case field.length - 1:
                x_limit = field.length - 1;
                break;
            default:
                x_limit = -1;

        }
        switch (y) {
            case 0:
                y_limit = 0;
                break;
            case field[x].length - 1:
                y_limit = field[x].length - 1;
                break;
                default:
                    x_limit = -1;
        }
        
    }

        


    this.lookForInteraction = (p0, p1, orientation) => {
        // { 0: { t: { 0:  } } }
        var patternID = this.interactions[p0] == undefined ? this.interactions[p1] : this.interactions[p0];
        var resultingPattern = this.interactions[patternID][orientation]
    }

    

    this.addInteraction = (arr, res) => {
        for (const [key, value] of Object.entries(this.patterns)) {
            // this.
        }
    }
    return {
        init: this.init,
        addInteraction: this.addInteraction,
        identifyPattern: this.identifyPattern,
        lookForInteraction: this.lookForInteraction
    }
}

// var p = new Pattern();
// p.init(field)

class Neighborhood {
    constructor() {
        this.hood = {};

    }

    countNeighbors() {

    }

    inc(x,y) {
        this.hood[x][y]++;
    }
    
    decr(x,y) {
        this.hood[x][y]--;
    }

    getNeighbors(x,y) {
        
    }

    setNeighbors(x,y, nr) {
        this.hood[x][y] = nr;
    }

    isBoundary(x,y) {

    }
}

function checkNeighbors(x,y, field) {
    // var x_l = x > 0 ? -1 : 0;
    // var x_u =(x < (CANVAS_WIDTH / PLAYER_SIZE) + 1) ? x + 1 : x;
    // x_l = x == 0 ? x : x - 1;
    // var y_l = y > 0 ? -1 : 0;
    // y_l = (y < (CANVAS_HEIGHT / PLAYER_SIZE) + 1) ? y + 1 : y;
    // var y_u = (y < (CANVAS_HEIGHT / PLAYER_SIZE) + 1) ? y + 1 : y;
    // var colCounter = (x_u == x+1) ? 3 : 2;
    // var neighborCount = 0;
    // for (x_l; x_l < colCounter; x_l++) {
    //     for ()
    //     var cell = field[x_l][y_l] 
    // }
    // var col_u =( y + 1 <= field[x].length) ? 1 : 0;
    // var col_l =( y - 1 >= field[x].length) ? -1 : 0;
    // var row_l = (x - 1 <= field.length) ? 0 : -1;
    // var row_u = (x + 1 >= field.length) ? 0 : 2;
    // log("row_l: " + row_l + "\ni: " + i)

    // var neighborCount = 0;
    // for (row_l; row_l <= row_u; row_l++) {
    //     for (var i=col_l; i < col_u; i++) {
    //        ( field[x + row_l][y+i] == 1 ) ? neighborCount++ : neighborCount += 0;
    //     }
        
    // }
    // return neighborCount;

    var neighborCount = 0;
    var row_l = -1;
    var row_u = 1;
    var col_l = -1;
    var col_u = 1;
    if (x == 0) {
        row_l = 0;
    }
    if (y == 0) {
        col_l = 0;
    }
    if ((x -1) == field.length) {
        row_u = 0;
    }
    if ((y -1) == 0 ) {
        col_u = 0
    }
    
    for (row_l; row_l < row_u; row_l++) {
        for (var i = col_l; i < col_u; i++) {
            if (row_l == 0 && i == 0) {
                continue
            }
            log("row_l: "+row_l +"\ni: "+i)
            log("vaule: " + field[x+row_l][y+i])
            if (field[x+row_l][y+i] == 1) {
                neighborCount++
            }
            else {
                neighborCount += 0;
            }
        }
    }
    log("neigbors: " + neighborCount)
    return neighborCount
    
}


var tempField = field;


function render() {
    setInterval(() => {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i=0; i < field.length; i++) {
        for (var j=0; j < field[i].length; j++) {
            // var neighborCount = checkNeighbours(i, j)
            var cellVal = field[i][j];
            var neighbors = 3;
            switch(cellVal) {
                case 1:
               if (neighbors <= 3 && neighbors >= 2) {
                tempField[i][j] = 1;

               }
               else {
                tempField[i][j] = 0;
               }
               break;
               case 0:
                if (neighbors == 3) {
                    tempField[i][j] = 1;
                }
                else {
                    tempField[i][j] = 0;
                }
                break;
            }
            
            // cell(i,j, field[i][j])

        }
        
    }
    for (var i=0; i < tempField.length; i++) {
        for (var j=0; j < tempField[i].length; j++) {
            cell(i,j,tempField[i][j]);
        }
    }
    field = tempField;
}, 1000)
}

render();

// cell(50,50,1)
// cell(10,10,1)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}