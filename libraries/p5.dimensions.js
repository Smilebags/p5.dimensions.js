console.log("p5.dimensions working");

p5.prototype.nDist = function (pos1, pos2) {
    // nDist uses the number of dimensions present in the first nVector passed in as the working dimension space then calculates the nDimensional distance between the points. 
    var dimensions = Object.keys(pos1).length;
    var sum = 0;
    if (pos1.x !== undefined) {
        sum += Math.pow(Math.abs(pos1.x - pos2.x),2);
    }
    if (pos1.y !== undefined) {
        sum += Math.pow(Math.abs(pos1.y - pos2.y),2);
    }
    if (pos1.z !== undefined) {
        sum += Math.pow(Math.abs(pos1.z - pos2.z),2);
    }
    if (pos1.a !== undefined) {
        sum += Math.pow(Math.abs(pos1.a - pos2.a),2);
    }
    if (pos1.b !== undefined) {
        sum += Math.pow(Math.abs(pos1.b - pos2.b),2);
    }
    if (pos1.c !== undefined) {
        sum += Math.pow(Math.abs(pos1.c - pos2.c),2);
    }
    if (pos1.d !== undefined) {
        sum += Math.pow(Math.abs(pos1.d - pos2.d),2);
    }
    if (pos1.e !== undefined) {
        sum += Math.pow(Math.abs(pos1.e - pos2.e),2);
    }
    if (pos1.f !== undefined) {
        sum += Math.pow(Math.abs(pos1.f - pos2.f),2);
    }
    if (pos1.g !== undefined) {
        sum += Math.pow(Math.abs(pos1.g - pos2.g),2);
    }
    


   return Math.sqrt(sum);
};


p5.prototype.nVector = function(x,y,z,a,b,c,d,e,f,g) {
    //nVector creates an object with the properties x,y,z, then a to g for each parameter passed in
    var obj = new Object;
    if(x !== undefined) {
        obj.x = x;
    }
    if(y !== undefined) {
        obj.y = y;
    }
    if(z !== undefined) {
        obj.z = z;
    }
    if(a !== undefined) {
        obj.a = a;
    }
    if(b !== undefined) {
        obj.b = b;
    }
    if(c !== undefined) {
        obj.c = c;
    }
    if(d !== undefined) {
        obj.d = d;
    }
    if(e !== undefined) {
        obj.e = e;
    }
    if(f !== undefined) {
        obj.f = f;
    }
    if(g !== undefined) {
        obj.g = g;
    }
    return obj;
};