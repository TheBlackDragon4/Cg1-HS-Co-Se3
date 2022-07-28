// @ts-check
export let Matrix4 = {

    /**
     * Creates a diagonal matrix with a single element on the diagonal.
     * @param {number} s A scalar value that is placed on the diagonal of matrix 
     * @returns A diagonal matrix.
     */
    diagonal: function (s) {
        return [s, 0, 0, 0,
            0, s, 0, 0,
            0, 0, s, 0,
            0, 0, 0, s
        ];
    },

    /**
     * Creates and returns a 4x4 row-major translation matrix. 
     * A translation-matrix multiplied with a 3D homogeneous point translates that point by 
     * tx in x direction, ty in y direction, and tz in z direction.
     * @param {number} tx Translation in x direction.
     * @param {number} ty Translation in y direction.
     * @param {number} tz Translation in y direction.
     * @returns A 4x4 row-major translation matrix.
     */
    translation: function (tx, ty, tz) {
        return [1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        ];
    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the x axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} Rotation angle in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationX: function (angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return [1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the y axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} Rotation angle in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationY: function (angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return [c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Create and returns a 4x4 row-major rotation matrix rotation around the z axis.
     * A rotation-matrix multiplied with a 3D homogeneous point rotates that point by 
     * angle radians around the origin in anti-clockwise direction.
     * @param {number} Rotation angle in radians. 
     * @returns A 4x4 row-major rotation matrix.
     */
    rotationZ: function (angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return [c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Creates and returns the matrix-matrix product of two 4x4 row-major matrices.
     * @param {number[]} a A row-major 4x4 matrix as left-operand of the matrix product.
     * @param {number[]} b A row-major 4x4 matrix as right-operand of the matrix product.
     * @returns The matrix-matrix product of two 4x4 row-major matrices.
     */
    multiply: function (a, b) {
        //                         b[ 0] b[ 1] b[ 2] b[ 3]
        //                         b[ 4] b[ 5] b[ 6] b[ 7]
        //                         b[ 8] b[ 9] b[10] b[11]
        //                         b[12] b[13] b[14] b[15]
        // a[ 0] a[ 1] a[ 2] a[ 3]
        // a[ 4] a[ 5] a[ 6] a[ 7]
        // a[ 8] a[ 9] a[10] a[11]
        // a[12] a[13] a[14] a[15]
        return [
            a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12],
            a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13],
            a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14],
            a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15],

            a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12],
            a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13],
            a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14],
            a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15],

            a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12],
            a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13],
            a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14],
            a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15],

            a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12],
            a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13],
            a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14],
            a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15]
        ];
    },

    /**
     * Creates 4x4 perspective projection matrix.
     * @param {number} fieldOfViewRadians Field of view in y direction provided in radians.
     * @param {number} aspectRatio Aspect ratio of view plane, i.e., width / height.
     * @param {number} nearPlaneDistance Distance from near plane to camera origin.
     * @param {number} farPlaneDistance  Distance from far plane to camera origin.
     */
    perspective: function (fieldOfViewRadians, aspectRatio, nearPlaneDistance, farPlaneDistance) {
        let alpha = aspectRatio; // Berechnung von width / hight in 02Mesh3D.js
        let tangens = Math.tan(fieldOfViewRadians / 2); // Berechnung des Tangens 
        // let n = -nearPlaneDistance; // Nahe Eben / Naher Bildschrim
        // let f = -farPlaneDistance; // Ferne Ebene / Weiter entfernter Bildschirm

        return [1 / (alpha * tangens), 0, 0, 0,
            0, 1 / (tangens), 0, 0,
            0, 0, (nearPlaneDistance + farPlaneDistance) / (nearPlaneDistance - farPlaneDistance), (2 * (farPlaneDistance * nearPlaneDistance)) / (nearPlaneDistance - farPlaneDistance),
            0, 0, -1, 0
        ];
    },

    /**
     * Returns the transpose of a matrix.
     * @param {number[]} a The input matrix.
     * @returns The transpose
     */
    transpose: function (a) {
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * 
     * @param {number[]} a The matrix of which we want to compute the trace = Spur.
     * @returns The trace of a matrix.
     */
    trace: function (a) {
        return a[0] + a[5] + a[10] + a[15];
    },

    /**
     * Computes the determinate of a 3x3 matrix
     * |a b c|
     * |d e f|
     * |g h i|
     * @param {number} a 
     * @param {number} b 
     * @param {number} c 
     * @param {number} d 
     * @param {number} e 
     * @param {number} f 
     * @param {number} g 
     * @param {number} h 
     * @param {number} i 
     * @returns The determinant of a matrix;
     */
    determinate3x3: function (a, b, c, d, e, f, g, h, i) {
        return 1;
    },

    /**
     * Compute the determinate of a matrix.
     * @param {number[]} a Matrix
     * @returns The determinate of a matrix. 
     */
    determinate: function (A) {
        return 1;
    },

    /**
     * Adds return two matrices.
     * @param {number[]} a Left matrix operand of sum.
     * @param {number[]} b Right matrix operand of sum
     * @return The sum of two matrices.
     */
    add: function (a, b) {
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Subtracts return two matrices.
     * @param {number[]} a Left matrix operand of difference.
     * @param {number[]} b Right matrix operand of difference
     * @return The difference of two matrices.
     */
    sub: function (a, b) {
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },

    /**
     * Scales a matrix by a constant factor and returns the result.
     * @param {number} s scalar factor.
     * @param {number[]} a Matrix that is scaled
     * @returns A scaled matrix.
     */
    scale: function (s, a) {
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    },


    /**
     * Computes the inverse of a matrix.
     * @param {number[]} a Matrix
     * @returns inverse of matrix.
     */
    inverse: function (a) {
        return [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
};