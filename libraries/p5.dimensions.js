console.log("p5.dimensions working");

p5.prototype.nDist = function (pos1, pos2) {
    var positions = [];
    a1 = Object.keys(pos1).map(function(k) { return pos1[k] }); //turns pos1's values into an array
    a2 = Object.keys(pos2).map(function(k) { return pos2[k] }); //turns pos2's values into an array
    positions = a1.concat(a2) //Joins arrays together
    var total = 0;
    for(var i=0; i < positions.length/2; i++){
        total += Math.pow(positions[i]-positions[i+positions.length/2], 2);
    }
    return Math.sqrt(total);
};


p5.prototype.nVector = function() {
    //nVector creates an object with the properties x,y,z, then a to g for each parameter passed in
    var obj = new Object();
    var dimensionalSymbols = ["x","y","z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w",
    "xx","yy","zz","aa","bb","cc","dd","ee","ff","gg","hh","ii","jj","kk","ll","mm","nn","oo","pp","qq","rr","ss","tt","uu","vv","ww"];
    for (var i = 0; i < arguments.length; i++){
        if (i > dimensionalSymbols.length){
            throw "P5JS ERROR: Too many dimensions were entered!";
        }
        obj[dimensionalSymbols[i]] = arguments[i];
    }
    return obj;
}
