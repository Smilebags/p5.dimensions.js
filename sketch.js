function setup() {
    createCanvas(400,400, WEBGL);


    var point1 = nVector(0,0,0,0);
    console.log(typeof(point1));
    console.log(point1);
    var point2 = nVector(1,1,1,1);
    console.log(typeof(point2));
    console.log(point2);
        var distance = nDist(point1,point2);
    console.log(distance);
}

function draw() {

}