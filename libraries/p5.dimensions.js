(function () {
    function nVector() {
        //nVector is a constructor function which creates an object with x,y,z, then alphabetically named properties.
        var obj = {};
        for (var i = 0; i < arguments.length; i++) {
            if (i > dimensionalSymbols.length) {
                throw "P5JS ERROR: Too many dimensions were entered!";
            }
            obj[dimensionalSymbols[i]] = arguments[i];
        }
        return generateMethods(obj);
    }
    ;
    p5.prototype.nVector = nVector;
    ;
    function nMatrix(size, input) {
        // constructor function for a matrix. fills in a
        var output = {};
        output.size = size;
        output.data = [];
        for (var i = 0; i < size[1]; i++) {
            output.data[i] = [];
            for (var j = 0; j < size[0]; j++) {
                output.data[i][j] = input[(i * size[0]) + j];
            }
        }
        output.inverse = function () {
            // this is meant to find the inverse of the matrix
            return nMatrix([1, 1], [1]);
        };
        output.multiply = function (vector) {
            if (output.size[0] != vector.dimension()) {
                throw "Vector is wrong size for this matrix";
            }
            else {
                var multipliedVector = {};
                for (var i = 0; i < vector.dimension(); i++) {
                    multipliedVector[dimensionalSymbols[i]] = 0;
                    for (var j = 0; j < vector.dimension(); j++) {
                        multipliedVector[dimensionalSymbols[i]] += Number(output.data[i][j] * vector[dimensionalSymbols[j]]);
                    }
                }
            }
            return generateMethods(multipliedVector);
        };
        return output;
    }
    ;
    p5.prototype.nMatrix = nMatrix;
    function perspectiveProjectionMatrix(vector, shift) {
        var workingVector = vector.nPush(1);
        function createMatrixString(dimension) {
            var outputString = "[";
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (i == j) {
                        outputString += "1,";
                    }
                    else {
                        outputString += "0,";
                    }
                }
                outputString += "0,";
            }
            for (var k = 0; k <= dimension; k++) {
                if (k == dimension - 1) {
                    outputString += "1,";
                }
                else if ((k == dimension)) {
                    outputString += shift + ",";
                }
                else {
                    outputString += "0,";
                }
            }
            outputString += "]";
            return outputString;
        }
        var matrixString = createMatrixString(vector.dimension());
        var matrixSize = vector.dimension() + 1;
        var projectionMatrix = nMatrix([matrixSize, matrixSize], eval(matrixString));
        var multipliedVector = projectionMatrix.multiply(workingVector);
        multipliedVector = multipliedVector.nDiv(multipliedVector[dimensionalSymbols[vector.dimension()]]);
        var output = multipliedVector.nPop(2);
        return output;
    }
    p5.prototype.perspectiveProjectionMatrix = perspectiveProjectionMatrix;
    var dimensionalSymbols = ["x", "y", "z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
        "xx", "yy", "zz", "aa", "bb", "cc", "dd", "ee", "ff", "gg", "hh", "ii", "jj", "kk", "ll", "mm", "nn", "oo", "pp", "qq", "rr", "ss", "tt", "uu", "vv", "ww"
    ];
    function getVectorValues(vector) {
        var output = Object.keys(vector).filter(function (i) { return dimensionalSymbols.includes(i); }); //filters values
        output = output.map(function (v) { return vector[v]; }); //turns v1's values into an array
        return output;
    }
    ;
    function generateMethods(vector) {
        vector.nDist = function (v2) { return nDist(this, v2); };
        vector.nDistSq = function (v2) { return nDistSq(this, v2); };
        vector.nDot = function (v2) { return nDot(this, v2); };
        vector.nLerp = function (v2, percent) { return nLerp(this, v2, percent); };
        vector.nAdd = function (v2) { return nAdd(this, v2); };
        vector.nSub = function (v2) { return nSub(this, v2); };
        vector.nMul = function (n) { return nMul(this, n); };
        vector.nDiv = function (n) { return nDiv(this, n); };
        vector.nSetMag = function (n) { return nSetMag(this, n); };
        // vector.nCross = function(v2) { return nCross(this, v2) };
        vector.nEqual = function (v2) { return nEqual(this, v2); };
        vector.nNormalize = function () { return nNormalize(this); };
        vector.nMag = function () { return nMag(this); };
        vector.nMagSq = function () { return nMagSq(this); };
        vector.nPush = function (number) {
            var output = {};
            var dimension = getVectorValues(this).length;
            for (var i = 0; i < dimension; i++) {
                output[dimensionalSymbols[i]] = this[dimensionalSymbols[i]];
            }
            output[dimensionalSymbols[dimension]] = number;
            return generateMethods(output);
        };
        vector.nPop = function (number) {
            var output = {};
            var dimension = getVectorValues(this).length;
            for (var i = 0; i < dimension - number; i++) {
                output[dimensionalSymbols[i]] = this[dimensionalSymbols[i]];
            }
            return generateMethods(output);
        };
        vector.dimension = function () {
            return getVectorValues(this).length;
        };
        return vector;
    }
    ;
    function nDist(v1, v2) {
        //nDist calculates the euclidean distance between two points(nVector objects), or between 'this' and another point. 
        return Math.sqrt(nDistSq(v1, v2));
    }
    ;
    p5.prototype.nDist = nDist;
    function nDistSq(v1, v2) {
        //nDist calculates the euclidean distance between two points(nVector objects), or between 'this' and another point. 
        var positions = [];
        var a1 = getVectorValues(v1);
        var a2 = getVectorValues(v2);
        positions = a1.concat(a2); //Joins arrays together
        var total = 0;
        for (var i = 0; i < positions.length / 2; i++) {
            total += Math.pow(positions[i] - positions[i + positions.length / 2], 2);
        }
        return total;
    }
    ;
    p5.prototype.nDistSq = nDistSq;
    function nRandomVector(d, min, max) {
        var obj = {};
        for (var i = 0; i < d; i++) {
            obj[dimensionalSymbols[i]] = Math.round(Math.random() * (max - min) + min);
        }
        return generateMethods(obj);
    }
    ;
    p5.prototype.nRandomVector = nRandomVector;
    function nDot(v1, v2) {
        //implement dot product - which is equal to v1.x * v2.x + v1.y * v2.y ...
        var output = 0;
        var dimensionCount = getVectorValues(v1).length;
        for (var i = 0; i < dimensionCount; i++) {
            output += v1[dimensionalSymbols[i]] * v2[dimensionalSymbols[i]];
        }
        return output;
    }
    ;
    p5.prototype.nDot = nDot;
    // p5.prototype.nCross = function(v1, v2) { // Returns cross of two vectors
    //     var output:nVector;
    //     var v1Values = getVectorValues(v1)
    //     var v2Values = getVectorValues(v2)
    //     if (v1Values.length != 3 || v2Values.length != 3) { // Checks if both vectors are 3 dimensional
    //         throw "P5JS ERROR: Vectors must be 3 dimensional!";
    //     } else {
    //         // Doing the actual calculations
    //         output.x = v1.y * v2.z - v1.z * v2.y;
    //         output.y = v1.z * v2.x - v1.x * v2.z;
    //         output.z = v1.x * v2.y - v1.y * v2.x;
    //     }
    //     return generateMethods(output); //Returns vector
    // }
    function nEqual(v1, v2) {
        var values1 = getVectorValues(v1);
        var values2 = getVectorValues(v2);
        if (values1.length != values2.length) {
            return false;
        }
        else {
            for (var i = 0; i < values1.length; i++) {
                if (values1[i] != values2[i]) {
                    return false;
                }
            }
            return true;
        }
    }
    ;
    p5.prototype.nEqual = nEqual;
    function nNormalize(v1) {
        var obj = {};
        for (var i = 0; i < getVectorValues(v1).length; i++) {
            obj[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] / nMag(v1);
        }
        return generateMethods(obj);
    }
    ;
    p5.prototype.nNormalize = nNormalize;
    function nSetMag(v1, n) {
        var output = nNormalize(v1);
        for (var i = 0; i < getVectorValues(v1).length; i++) {
            output[dimensionalSymbols[i]] = output[dimensionalSymbols[i]] * n;
        }
        return output;
    }
    ;
    p5.prototype.nSetMag = nSetMag;
    function nLimit(v1, n) {
        var output = v1;
        if (nMagSq(v1) > n * n) {
            output = nSetMag(v1, n);
        }
        return output;
    }
    ;
    p5.prototype.nLimit = nLimit;
    function nArray(v1) {
        var output = [];
        for (var i = 0; i < getVectorValues(v1).length; i++) {
            output[i] = v1[dimensionalSymbols[i]];
        }
        return output;
    }
    ;
    p5.prototype.nArray = nArray;
    function nAdd(v1, v2) {
        //implement add of nVectors
        var output = {};
        var dimensionCount = getVectorValues(v1).length;
        for (var i = 0; i < dimensionCount; i++) {
            output[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] + v2[dimensionalSymbols[i]];
        }
        return generateMethods(output);
    }
    ;
    p5.prototype.nAdd = nAdd;
    function nSub(v1, v2) {
        //implement subtraction of nVectors
        var output = {};
        var dimensionCount = getVectorValues(v1).length;
        for (var i = 0; i < dimensionCount; i++) {
            output[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] - v2[dimensionalSymbols[i]];
        }
        return generateMethods(output);
    }
    ;
    p5.prototype.nSub = nSub;
    function nMul(v, n) {
        var output = {};
        var values = getVectorValues(v);
        for (var i = 0; i < values.length; i++) {
            output[dimensionalSymbols[i]] = values[i] * n;
        }
        return generateMethods(output); //Returns vector
    }
    ;
    p5.prototype.nMul = nMul;
    function nDiv(v, n) {
        var output = {};
        var values = getVectorValues(v);
        for (var i = 0; i < values.length; i++) {
            output[dimensionalSymbols[i]] = values[i] / n;
        }
        return generateMethods(output);
    }
    ;
    p5.prototype.nDiv = nDiv;
    function nMag(v1) {
        //implement magnitude calculation of nVectors
        var dimensionCount = getVectorValues(v1).length;
        var origin = {};
        for (var i = 0; i < dimensionCount; i++) {
            origin[dimensionalSymbols[i]] = 0;
        }
        return nDist(origin, v1);
    }
    ;
    p5.prototype.nMag = nMag;
    function nMagSq(v1) {
        //implement magnitude calculation of nVectors
        var dimensionCount = getVectorValues(v1).length;
        var origin = {};
        for (var i = 0; i < dimensionCount; i++) {
            origin[dimensionalSymbols[i]] = 0;
        }
        return nDistSq(origin, v1);
    }
    ;
    p5.prototype.nMagSq = nMagSq;
    function nLerp(v1, v2, percentage) {
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
        var output = {};
        for (var i = 0; i < dimensionCount; i++) {
            output[dimensionalSymbols[i]] = v1[dimensionalSymbols[i]] + ((v2[dimensionalSymbols[i]] - v1[dimensionalSymbols[i]]) * percentage);
        }
        return generateMethods(output);
    }
    ;
    p5.prototype.nLerp = nLerp;
    function nObject(objectData) {
        //nObject is a constructor function for an object with nDimensional verticies, edges and faces.
        // objectData must be an object with properties as follows: dimension: integer, vertices: nVector, edges, array[2], faces: array[3]
        var obj;
        if (arguments.length == 1) {
            if (objectData.dimension > dimensionalSymbols.length) {
                throw "P5JS ERROR: Dimension of object is too high!";
            }
            obj.dimension = objectData.dimension;
            obj.vertices = objectData.vertices;
            obj.edges = objectData.edges;
            obj.faces = objectData.faces;
        }
        else if (arguments.length == 4) {
            obj.dimension = arguments[0];
            obj.vertices = arguments[1];
            obj.edges = arguments[2];
            obj.faces = arguments[3];
        }
        return obj;
    }
    ;
    p5.prototype.nObject = nObject;
    function nShift(object, forces) {
        if (forces.length != object.dimension) {
            throw "P5JS ERROR: You have too many dimensional movements!";
        }
        else {
            for (var n = 0; n < object.vertices.length; n++) {
                for (var i = 0; i < forces.length; i++) {
                    object.vertices[n][dimensionalSymbols[i]] += forces[i];
                }
            }
        }
        return object;
    }
    ;
    p5.prototype.nShift = nShift;
})();
//# sourceMappingURL=p5.dimensions.js.map