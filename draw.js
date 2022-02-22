function draw() {
  var canvas = document.querySelector("canvas");
  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;
  const canvasStartX = 4;
  const canvasStartY = 0;
  const canvasEndX = canvas.width;
  const canvasEndY = canvas.height;
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");
  }
  const drawSys = () => {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(canvasStartX, 0);
    ctx.lineTo(canvasStartX, 100);
    ctx.moveTo(0, 100);
    ctx.lineTo(200, 100);
    ctx.stroke();

    const yMarks = 10;
    const div = canvasEndY / 10;
    var d;

    var i = 0;
    ctx.beginPath();
    while (i + div <= canvasEndY) {
      i += div;
      ctx.moveTo(canvasStartX, i);
      ctx.lineTo(0, i);
    }
    ctx.stroke();
  };

  const point = (x, y) => {
    ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
  };

  const drawData = (data) => {
    var i = 0;
    ctx.beginPath();
    ctx.moveTo(0, utils.mapRange(data[0], 0, 160, 0, 100));
    while (i + 1 < data.length) {
      var datapoint_0 = canvasHeight - utils.mapRange(data[i], 0, 220, 0, 100);
      var datapoint_1 =
        canvasHeight - utils.mapRange(data[i + 1], 0, 220, 0, 100);
      var x_0 = utils.mapRange(i, 0, 8, 0, 200);
      var x_1 = utils.mapRange(i + 1, 0, 8, 0, 200);
      ctx.moveTo(x_0, datapoint_0);
      ctx.lineTo(x_1, datapoint_1);
      point(x_1, datapoint_1);
      i += 1;
    }
    ctx.stroke();
  };

  const utils = {
    mapRange: (val, in_min, in_max, out_min, out_max) => {
      return Math.floor(
        ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    },
  };

  return {
    drawSys: () => {
      drawSys();
    },
    drawData: (data) => {
      drawData(data);
    },
  };
}
// var diagram = draw();
// diagram.drawSys();
