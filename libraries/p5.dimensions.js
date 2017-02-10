(function() {
    var dimensionalSymbols = ["x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
        "xx", "yy", "zz", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww"
    ];

    function getVectorValues(vector) {
        var output = Object.keys(vector).filter(function(i) { return dimensionalSymbols.includes(i) }) //filters values
        output = output.map(function(v) { return vector[v] }) //turns v1's values into an array
        return output
    }

    function generateMethods(vector) {
        vector.nDist = function(v2) { return nDist(this, v2) }
        vector.nDistSq = function(v2) { return nDistSq(this, v2) }
        vector.nDot = function(v2) { return nDot(this, v2) }
        vector.nLerp = function(v2, percent) { return nLerp(this, v2, percent) }
        vector.nAdd = function(v2) { return nAdd(this, v2) }
        vector.nSub = function(v2) { return nSub(this, v2) }
        vector.nMul = function(n) { return nMul(this, n) }
        vector.nDiv = function(n) { return nDiv(this, n) }
        vector.nSetMag = function(n) { return nSetMag(this, n) }
        vector.nCross = function(v2) { return nCross(this, v2) }
        vector.nEqual = function(v2) { return nEqual(this, v2) }
        vector.nNormalize = function() { return nNormalize(this) }
        vector.nMag = function() { return nMag(this) }
        vector.nMagSq = function() { return nMagSq(this) }
        return vector;
    }

    p5.prototype.nDist = function(v1, v2) {
        //nDist calculates the euclidean distance between two points(nVector objects), or between 'this' and another point. 
        return Math.sqrt(nDistSq(v1, v2));
    }
    p5.prototype.nDistSq = function(v1, v2) {
        //nDist calculates the euclidean distance between two points(nVector objects), or between 'this' and another point. 
        if (arguments.length == 1) {
            return nDistSq(this, v1);
        } else {
            var positions = [];
            var a1 = getVectorValues(v1)
            var a2 = getVectorValues(v2)
            positions = a1.concat(a2); //Joins arrays together
            var total = 0;
            for (var i = 0; i < positions.length / 2; i++) {
                total += Math.pow(positions[i] - positions[i + positions.length / 2], 2);
            }
            return total;
        }
    }


    p5.prototype.nVector = function() {
        //nVector is a constructor function which creates an object with x,y,z, then alphabetically named properties.
        var obj = new Object();
        for (var i = 0; i < arguments.length; i++) {
            if (i > dimensionalSymbols.length) {
                throw "P5JS ERROR: Too many dimensions were entered!";
            }
            obj[dimensionalSymbols[i]] = arguments[i];
        }
        return generateMethods(obj);

    }

    p5.prototype.nRandomVector = function(d, min, max) {
        var obj = new Object();
        for (var i = 0; i < d; i++) {
            obj[dimensionalSymbols[i]] = Math.round(Math.random() * (max - min) + min);
        }
        return generateMethods(obj);
    }

    p5.prototype.nDot = function(v1, v2) {
        //implement dot product - which is equal to v1.x * v2.x + v1.y * v2.y ...
        var output = 0;
        var dimensionCount = getVectorValues(v1).length
        for (i = 0; i < dimensionCount; i++) {
            output += v1[dimensionalSymbols[i]] * v2[dimensionalSymbols[i]];
        }
        return output;
    }

    p5.prototype.nCross = function(v1, v2) { // Returns cross of two vectors
        var output = new nVector();
        var v1Values = getVectorValues(v1)
        var v2Values = getVectorValues(v2)
        if (v1Values.length != 3 || v2Values.length != 3) { // Checks if both vectors are 3 dimensional
            throw "P5JS ERROR: Vectors must be 3 dimensional!";
        } else {
            // Doing the actual calculations
            output.x = v1.y * v2.z - v1.z * v2.y;
            output.y = v1.z * v2.x - v1.x * v2.z;
            output.z = v1.x * v2.y - v1.y * v2.x;
        }
        return generateMethods(output); //Returns vector
    }

    p5.prototype.nEqual = function(v1, v2) { //Checks if vectors are equal
        var values1 = getVectorValues(v1)
        var values2 = getVectorValus(v2)
        if (values1.length != values2.length) {
            return false;
        } else {
            for (var i = 0; i < values1.length; i++) {
                if (values1[i] != values2[i]) {
                    return false;
                }
            }
            return true;
        }
    }

    p5.prototype.nNormalize = function(v1) {
        var obj = new nVector();
        for (var i = 0; i < getVectorValues(v1).length; i++) {
            obj[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] / nMag(v1);
        }
        return generateMethods(obj);
    }

    p5.prototype.nSetMag = function(v1, n) {
        var output = nNormalize(v1);
        for (var i = 0; i < getVectorValues(v1).length; i++) {
            output[dimensionalSymbols[i]] = output[dimensionalSymbols[i]] * n;
        }
        return output;
    }

    p5.prototype.nLimit = function(v1, n) {
        var output = v1;
        if (nMagSq(v1) > n * n) {
            output = nSetMag(v1, n);
        }
        return output;
    }

    p5.prototype.nArray = function(v1) {
        var output = [];
        for (var i = 0; i < getVectorValues(v1).length; i++) {
            output[i] = v1[dimensionalSymbols[i]];
        }
        return output;
    }

    p5.prototype.nAdd = function(v1, v2) {
        //implement add of nVectors
        var output = new nVector();
        var dimensionCount = getVectorValues(v1).length;
        for (i = 0; i < dimensionCount; i++) {
            output[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] + v2[dimensionalSymbols[i]];
        }
        return generateMethods(output);
    }

    p5.prototype.nSub = function(v1, v2) {
        if (arguments.length == 1) {
            return nSub(this, v1);
        } else {
            //implement subtraction of nVectors
            var output = new nVector();
            var dimensionCount = getVectorValues(v1).length;
            for (i = 0; i < dimensionCount; i++) {
                output[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] - v2[dimensionalSymbols[i]];
            }
            return generateMethods(output);
        }
    }

    p5.prototype.nMul = function(v, n) { //Multiplies vector's values
        var output = new nVector();
        values = getVectorValues(v);
        for (var i = 0; i < values.length; i++) {
            output[dimensionalSymbols[i]] = values[i] * n;
        }
        return generateMethods(output); //Returns vector
    }

    p5.prototype.nDiv = function(v, n) { //Divides vector's values
        var output = new nVector();
        values = getVectorValues(v);
        for (var i = 0; i < values.length; i++) {
            output[dimensionalSymbols[i]] = values[i] / n;
        }
        return generateMethods(output);
    }

    p5.prototype.nMag = function(v1) {
        //implement magnitude calculation of nVectors
        var dimensionCount = getVectorValues(v1).length;
        var origin = new nVector();
        for (i = 0; i < dimensionCount; i++) {
            origin[dimensionalSymbols[i]] = 0;
        }
        return nDist(origin, v1);
    }

    p5.prototype.nMagSq = function(v1) {
        //implement magnitude calculation of nVectors
        var dimensionCount = getVectorValues(v1).length;
        var origin = new nVector();
        for (i = 0; i < dimensionCount; i++) {
            origin[dimensionalSymbols[i]] = 0;
        }
        return nDistSq(origin, v1);
    }

    p5.prototype.nLerp = function(v1, v2, percentage) {
        //linear interpolation between two vectors by percentage amount
        switch (percentage) {
            case (percentage <= 0):
                percentage = 0;
                break;
            case (percentage >= 1):
                percentage = 1;
                break;
        }
        var dimensionCount = getVectorValues(v1).length;
        var output = new nVector();
        for (i = 0; i < dimensionCount; i++) {
            output[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] + ((v2[dimensionalSymbols[i]] - v1[dimensionalSymbols[i]]) * percentage);
        }
        return generateMethods(output);
    }
})();