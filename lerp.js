function setup() {
    createCanvas(windowWidth, windowHeight);
    dotPos = new nVector(0, 0);
    oldDotPos = new nVector(0, 0);
    mousePos = new nVector(mouseX, mouseY);
    var distance = 0;
    var dotSize = 0;
    fill(0, 0, 255);
    noStroke();
    colorMode(HSB, 1000);
}

function draw() {
    // background(255);
    mousePos.x = mouseX;
    mousePos.y = mouseY;
    distance = nDist(mousePos, dotPos);
    fill(700 - distance / 2, 1000, 800);
    dotSize = distance / 10;
    dotPos = nLerp(dotPos, mousePos, 0.05);
    if (mouseIsPressed) {
        ellipse(dotPos.x, dotPos.y, dotSize, dotSize);
    }
    oldDotPos = dotPos;
}

function mousePressed() {
    dotPos = mousePos;
}