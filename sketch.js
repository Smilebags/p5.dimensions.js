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
    var a = parseFloat(document.getElementById("dimIn1").value);
    var b = parseFloat(document.getElementById("dimIn2").value);
    var c = parseFloat(document.getElementById("dimIn3").value);
    var d = parseFloat(document.getElementById("dimIn4").value);
    var e = parseFloat(document.getElementById("dimIn5").value);
    var f = parseFloat(document.getElementById("dimIn6").value);
    var g = parseFloat(document.getElementById("dimIn7").value);
    var h = parseFloat(document.getElementById("dimIn8").value);
    values = {
        pos1: nVector(a,b,c,d),
        pos2: nVector(e,f,g,h),
        result: ''
    };
    values.result = nDist(values.pos1,values.pos2);
    outputElement.innerHTML = values.result;
}