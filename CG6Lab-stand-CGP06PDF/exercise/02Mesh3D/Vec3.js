// @ts-check
// LAB6 a)
export let Vec3 = {

    /////////////////////// MUSS ICH ALS KLASSE UMSCHREIBEN ///////////////////////////////

    /**
     * Create a vector with three components
     * @param {number} a first component
     * @param {number} b second component
     * @param {number} c third component
     */
     constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    },


    /**
     * Calculates the scalar product of a two vectors
     * @param {number[]} a 1x3 vector
     * @param {number[]} b 1x3 vector
     * @returns {number} scalarproduct.
     */
    dot: function (a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    },

    /**
     * Calculates the euclideanLength of two vectors
     * @param {number[]} a 1x3 vector
     * @param {number[]} b 1x3 vector
     * @returns {number} Euclidean Length.
     */
    euclideanLength: function (a, b) {
        let vec = [
            b[0] - a[0], 
            b[1] - a[1], 
            b[2] - a[2]
        ]
        let calculate = Math.sqrt(Math.pow(vec[0], 2) + Math.pow(vec[1], 2) + Math.pow(vec[2], 2));
        return calculate;
    },

    /**
     * Calculates the add  product of a two vectors
     * @param {number[]} a 1x3 vector 
     * @param {number[]} b 1x3 vector
     * @returns {number[]} vector 1x3.
     */
    add: function (a, b) {
        return [
            a[0] + b[0],
            a[1] + b[1],
            a[2] + b[2]
        ];
    },

    /**
     * Calculates the sub  product of a two vectors
     * @param {number[]} a 1x3 vector 
     * @param {number[]} b 1x3 vector
     * @returns {number[]} vector 1x3.
     */
    sub: function (a, b) {
        return [
            a[0] - b[0],
            a[1] - b[1],
            a[2] - b[2]
        ];
    },
    
    /**
     * Calculates the crossproduct of a two vectors
     * @param {number[]} a 1x3 vector 
     * @param {number[]} b 1x3 vector
     * @returns {number[]} vector 1x3.
     */
    cross: function (a, b) {
        return [
            a[1] * b[2] - a[2] * b[1], 
            a[2] * b[0] - a[0] * b[2], 
            a[0] * b[1] - a[1] * b[0]
        ];
    },
    
    /**
     * Calculates the scale of one vectors and on scale factor
     * @param {number[]} a 1x3 vector 
     * @param {number} s scale factor
     * @returns {number[]} vector 1x3.
     */
    scale: function (a, s) {
        return [
            a[0] * s,
            a[1] * s,
            a[2] * s
        ];
    },
    
    /**
     * Calculates the normalized vector
     * @param {number[]} a 1x3 vector 
     * @returns {number[]} vector 1x3.
     */
    normalize: function (a) {
        let calculate = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2)); 
        // 1 / calculate
        return [ 
            a[0] / calculate,
            a[1] / calculate,
            a[2] / calculate
        ]
    },

};



