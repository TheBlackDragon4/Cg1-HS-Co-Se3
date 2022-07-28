// @ts-check
export let Matrix4 = {

    /**
     * Creates a diagonal matrix with a single element on the diagonal.
     * @param {number} s A scalar value that is placed on the diagonal of matrix 
     * @returns A diagonal matrix.
     */
    diagonal: function (s) {
        return [
            s, 0, 0, 0,
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
        return [
            1, 0, 0, tx,
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
        return [
            1, 0, 0, 0,
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
        return [
            c, 0, s, 0,
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
        return [
            c, -s, 0, 0,
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

        return [
            1 / (alpha * tangens), 0, 0, 0,
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
        // LAB04 d)
        return [
            a[ 0],a[ 4],a[ 8],a[12],
            a[ 1],a[ 5],a[ 9],a[13],
            a[ 2],a[ 6],a[10],a[14],
            a[ 3],a[ 7],a[11],a[15]
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
        return ((a * e * i) + (b * f * g) + (c * d * h)) - (c * e * g) - (b * d * i) - (a * f *h) ;
    },

    /**
     * Computes the determinate of a 4x4 matrix
     * |a b c d|
     * |e f g h|
     * |i j k l|
     * 
     * a[ 0] a[ 1] a[ 2] a[ 3]
     * a[ 4] a[ 5] a[ 6] a[ 7]
     * a[ 8] a[ 9] a[10] a[11]
     * a[12] a[13] a[14] a[15]
     * 
     * @param {number[]} a is the input matrix;
     * @returns The determinant of a matrix;
     */
     determinate4x4: function (a) {

        let pos1 = a[ 0] * a[ 5] * a[10] * a[15]; // v
        let pos2 = a[ 1] * a[ 6] * a[11] * a[12]; // v
        let pos3 = a[ 2] * a[ 7] * a[ 8] * a[13]; // v
        let pos4 = a[ 3] * a[ 4] * a[ 9] * a[14]; // v

        let neg1 = a[ 3] * a[ 6] * a[ 9] * a[12]; // v
        let neg2 = a[ 2] * a[ 5] * a[ 8] * a[15]; // v
        let neg3 = a[ 1] * a[ 4] * a[11] * a[14]; // v
        let neg4 = a[ 0] * a[ 7] * a[10] * a[13]; // v

        return  (pos1 + pos2 + pos3 + pos4) - neg1 - neg2 - neg3 - neg4; 
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
        return [
            a[ 0] + b[ 0],  a[ 4] + b[ 4],  a[ 8] + b[ 8],  a[12] + b[12],
            a[ 1] + b[ 1],  a[ 5] + b[ 5],  a[ 9] + b[ 9],  a[13] + b[13],
            a[ 2] + b[ 2],  a[ 6] + b[ 6],  a[10] + b[10],  a[14] + b[14],
            a[ 3] + b[ 3],  a[ 7] + b[ 7],  a[11] + b[11],  a[15] + b[14]
        ];
    },

    /**
     * Subtracts return two matrices.
     * @param {number[]} a Left matrix operand of difference.
     * @param {number[]} b Right matrix operand of difference
     * @return The difference of two matrices.
     */
    sub: function (a, b) {
        return [
            a[ 0] - b[ 0],  a[ 4] - b[ 4],  a[ 8] - b[ 8],  a[12] - b[12],
            a[ 1] - b[ 1],  a[ 5] - b[ 5],  a[ 9] - b[ 9],  a[13] - b[13],
            a[ 2] - b[ 2],  a[ 6] - b[ 6],  a[10] - b[10],  a[14] - b[14],
            a[ 3] - b[ 3],  a[ 7] - b[ 7],  a[11] - b[11],  a[15] - b[14]
        ];
    },

    /**
     * Scales a matrix by a constant factor and returns the result.
     * @param {number} s scalar factor.
     * @param {number[]} a Matrix that is scaled
     * @returns A scaled matrix.
     */
    scale: function (s, a) {
        return [
            s * a[ 0], s * a[ 4], s * a[ 8], s * a[12],
            s * a[ 1], s * a[ 5], s * a[ 9], s * a[13],
            s * a[ 2], s * a[ 6], s * a[10], s * a[14],
            s * a[ 3], s * a[ 7], s * a[11], s * a[15]
        ];
    },


    /**
     * Computes the inverse of a matrix.
     * @param {number[]} a Matrix
     * @returns inverse of matrix.
     */
    inverse: function (a) {
        
        return [
            a[ 0],a[ 4],a[ 8],a[12],
            a[ 1],a[ 5],a[ 9],a[13],
            a[ 2],a[ 6],a[10],a[14],
            a[ 3],a[ 7],a[11],a[15]
        ];
    },

    /**
     * Computes the inverse of a matrix
     * 
     * A_inv = 1 / det(A) * Adjunkte(A)
     * 
     * a[ 0] a[ 1] a[ 2] a[ 3]
     * a[ 4] a[ 5] a[ 6] a[ 7]
     * a[ 8] a[ 9] a[10] a[11]
     * a[12] a[13] a[14] a[15]
     * 
     * @param {number[]} a Matrix
     * @return inverse of matrix 
     */
    inverse4x4: function(a) {
        let det_a = this.determinate4x4(a);
        let pre = 1/det_a;

        let m11 = this.determinate3x3(a[5],a[6],a[7],a[9],a[10],a[11],a[13],a[14],a[15])    
        let m12 = -1*this.determinate3x3(a[4],a[6],a[7],a[8],a[10],a[11],a[12],a[14],a[15])
        let m13 = this.determinate3x3(a[4],a[5],a[7],a[8], a[9],a[11],a[12],a[13],a[15])    
        let m14 = -1*this.determinate3x3(a[4],a[5],a[6],a[8],a[9],a[10],a[12],a[13],a[14])

        let m21 = -1*this.determinate3x3(a[1],a[2],a[3],a[9],a[10],a[11],a[13],a[14],a[15])
        let m22 = this.determinate3x3(a[0],a[2],a[3],a[8],a[10],a[11],a[12],a[14],a[15])
        let m23 = -1*this.determinate3x3(a[0],a[1],a[3],a[8],a[9],a[11],a[12],a[13],a[15])
        let m24 = this.determinate3x3(a[0],a[1],a[2],a[8],a[9],a[10],a[12],a[13],a[14])

        let m31 = this.determinate3x3(a[1],a[2],a[3],a[5],a[6],a[7],a[13],a[14],a[15])
        let m32 = -1*this.determinate3x3(a[0],a[2],a[3],a[4],a[6],a[7],a[12],a[14],a[15])
        let m33 = this.determinate3x3(a[0],a[1],a[3],a[4],a[5],a[7],a[12],a[13],a[15])
        let m34 = -1*this.determinate3x3(a[0],a[1],a[2],a[4],a[5],a[6],a[12],a[13],a[14])

        let m41 = -1*this.determinate3x3(a[1],a[2],a[3],a[5],a[6],a[7],a[9],a[10],a[11])
        let m42 = this.determinate3x3(a[0],a[2],a[3],a[4],a[6],a[7],a[8],a[10],a[11])    
        let m43 = -1*this.determinate3x3(a[0],a[1],a[3],a[4],a[5],a[7],a[8],a[9],a[11])      
        let m44 = this.determinate3x3(a[0],a[1],a[2],a[4],a[5],a[6],a[8],a[9],a[10])

        let adj_mat = [
            m11, m12, m13, m14,
            m21, m22, m23, m24,
            m31, m32, m33, m34,
            m41, m42, m43, m44
        ]

        return this.scale(pre, adj_mat);
    }

};


/*
Adjunkte Matrix bestimmen:
----------------------------
----------------------------

Ausgangsmatrix:
a[ 0] a[ 1] a[ 2] a[ 3]
a[ 4] a[ 5] a[ 6] a[ 7]
a[ 8] a[ 9] a[10] a[11]
a[12] a[13] a[14] a[15]

Adjunkte Matrix:
+M11 = det3x3(5,6,7,9,10,11,13,14,15)    
-M12 = det3x3(4,6,7,8,10,11,12,14,15)  
+M13 = det3x3(4,5,7,8,9,11,12,13,15)    
-M14 = det3x3(4,5,6,8,9,10,12,13,14)
-M21 = det3x3(5,6,7,9,10,11,13,14,15)
+M22 = det3x3(0,2,3,8,10,11,12,14,15) 
-M23 = det3x3(0,1,3,8,9,11,12,13,15)
+M24 = det3x3(0,1,2,8,9,10,12,13,14)
+M31 = det3x3(1,2,3,5,6,7,13,14,15)
-M32 = det3x3(0,2,3,4,6,7,12,14,15)
+M33 = det3x3(0,1,3,4,5,7,12,13,15)
-M34 = det3x3(0,1,2,4,5,6,12,13,14)
-M41 = det3x3(1,2,3,5,6,7,9,10,11)
+M42 = det3x3(0,2,3,4,6,7,8,10,11)    
-M43 = det3x3(0,1,3,4,5,7,8,9,11)      
+M44 = det3x3(0,1,2,4,5,6,8,9,10)

*/
