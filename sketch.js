var distance;
var values;
var outputElement = document.getElementById("distanceLabel");

function setup() {
    calculate();
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
    values.result = nLimit(values.pos1, 2);
    // values.result = nMagSq(values.pos1);
    outputElement.innerHTML = JSON.stringify(values);
}