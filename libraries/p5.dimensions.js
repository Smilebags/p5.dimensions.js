

p5.prototype.nDist = function (pos1, pos2) {
    //nDist calculates the euclidean distance between two points(nVector objects), or between 'this' and another point. 
    if (arguments.length == 1) {
        return nDist(this,pos1);
    } else {
        var positions = [];
        a1 = Object.keys(pos1).map(function(k) { return pos1[k] }); //turns pos1's values into an array
        a2 = Object.keys(pos2).map(function(k) { return pos2[k] }); //turns pos2's values into an array
        positions = a1.concat(a2) //Joins arrays together
        var total = 0;
        for(var i=0; i < positions.length/2; i++){
            total += Math.pow(positions[i]-positions[i+positions.length/2], 2);
        }
        return Math.sqrt(total);
    }
};


p5.prototype.nVector = function() {
    //nVector is a constructor function which creates an object with x,y,z, then alphabetically named properties.
    var obj = new Object();
    var dimensionalSymbols = ["x","y","z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w",
    "xx","yy","zz","aa","bb","cc","dd","ee","ff","gg","hh","ii","jj","kk","ll","mm","nn","oo","pp","qq","rr","ss","tt","uu","vv","ww"];
    for (var i = 0; i < arguments.length; i++){
        if (i > dimensionalSymbols.length){
            throw "P5JS ERROR: Too many dimensions were entered!";
        } else {
            obj[dimensionalSymbols[i]] = arguments[i];
        }
    }
    
    obj.add = function(vector){ //Adds two multidimensional vectors together
      var usedLetters = [];
      for(var i = 0; i < Object.keys(obj).length; i++){
        if (obj[Object.keys(obj)[i]] && vector[Object.keys(obj)[i]] && Object.keys(obj)[i] != "add" && Object.keys(obj)[i] != "add"){
          obj[Object.keys(obj)[i]] += vector[Object.keys(obj)[i]];
          usedLetters.push(Object.keys(obj)[i]);
        } 
      }
      for(var i = 0; i < Object.keys(vector).length; i++){
        if (!usedLetters.includes(Object.keys(vector)[i]) && Object.keys(vector)[i] != "add"){
          obj[Object.keys(vector)[i]] = vector[Object.keys(vector)[i]];
        }
      }
      return obj;
    }
    
    return obj;
}
