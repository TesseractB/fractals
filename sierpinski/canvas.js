var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var mode = "prod"

function drawPoint(coordinates, diameter) {
    if (!diameter) { diameter = 1; }
    ctx.fillRect(coordinates[0], coordinates[1], diameter, diameter);
}
drawPoint([350,0])
drawPoint([0,699])
drawPoint([700,699])
//this changes transparent pixels to white


if (mode === "dev") {
    ctx.moveTo(350,0)
    ctx.lineTo(0,699)
    ctx.lineTo(700,699)
    ctx.lineTo(350,0)
    ctx.stroke()
}

var originals = [
    [350,0],
    [0,699],
    [700,699]
]
// a function that returns a random point on the canvas
function randomPoint() {
    var x = Math.floor(Math.random() * 700);
    var y = Math.floor(Math.random() * 700);
    return [x,y];
}

//a function that takes an array of points and returns if that point is within the bounds of the triangle drawn by the original points
function isPointInTriangle(point, triangle) {
    var x = point[0];
    var y = point[1];
    var x1 = triangle[0][0];
    var y1 = triangle[0][1];
    var x2 = triangle[1][0];
    var y2 = triangle[1][1];
    var x3 = triangle[2][0];
    var y3 = triangle[2][1];
    var a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    var b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
    var c = 1 - a - b;
    if (a >= 0 && a <= 1 && b >= 0 && b <= 1 && c >= 0 && c <= 1) {
        return true;
    } else {
        return false;
    }
}

//a function that gets a random point that is within the triangle
function getRandomPointInTriangle(triangle) {
    var point = randomPoint();
    while (!isPointInTriangle(point, triangle)) {
        point = randomPoint();
    }
    return point;
}

//a function that takes two points, and returns the midpoint between them
function getMidpoint(point1, point2) {
    var x = (point1[0] + point2[0]) / 2;
    var y = (point1[1] + point2[1]) / 2;
    return [x,y];
}




    

var currentPosition = getRandomPointInTriangle(originals);

drawPoint(currentPosition);




setInterval(function() {
    //draw a point at the midpoint of the current position and a random original point, then set that point as the current position
    var midpoint = getMidpoint(currentPosition, originals[Math.floor(Math.random() * 3)]);
    drawPoint(midpoint);
    currentPosition = midpoint;

}, 1)
