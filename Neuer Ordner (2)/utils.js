const log = console.log;


function getRandomFloat(min, max, decimals) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
  
    return parseFloat(str);
  }

  function distanceBetweenPoints(p_0, p_1) {
    return Math.sqrt(Math.pow((p_1.x +  - p_0.x), 2) + Math.pow((p_1.y - p_0.y), 2));
}

function abs(value) {
  return Math.sqrt(value * value)
}