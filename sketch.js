var distance;
var values;
var outputElement = document.getElementById("output");
var outX = document.getElementById("OutX");
var outY = document.getElementById("OutY");
var outZ = document.getElementById("OutZ");
var outA = document.getElementById("OutA");

function setup() {
    calculate();
    noCanvas();
}

function draw() {
    calculate();
}

function calculate() {
    var a = parseFloat(document.getElementById("dimIn1").value) || 0;
    var b = parseFloat(document.getElementById("dimIn2").value) || 0;
    var c = parseFloat(document.getElementById("dimIn3").value) || 0;
    var d = parseFloat(document.getElementById("dimIn4").value) || 0;
    var e = parseFloat(document.getElementById("dimIn5").value) || 0;
    var f = parseFloat(document.getElementById("dimIn6").value) || 0;
    var g = parseFloat(document.getElementById("dimIn7").value) || 0;
    var h = parseFloat(document.getElementById("dimIn8").value) || 0;
    values = {
        pos1: nVector(a, b, c, d),
        pos2: nVector(e, f, g, h),
        result: ''
    };
    values.result = nAdd(values.pos1, values.pos2);
    renderOutput(values.result);
}

function renderOutput(v1) {
    outX.innerHTML = v1.x;
    outY.innerHTML = v1.y;
    outZ.innerHTML = v1.z;
    outA.innerHTML = v1.a;
};