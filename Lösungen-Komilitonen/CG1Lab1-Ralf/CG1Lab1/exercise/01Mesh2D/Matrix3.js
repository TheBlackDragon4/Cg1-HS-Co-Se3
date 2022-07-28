export let Matrix3 = {

    // Creates a 3x3 row-major translation matrix, that translates 2D homogeneous points by tx in x direction and ty in y direction.
    translation: function (tx, ty) {
        return [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major rotation matrix, that rotates 2D homogeneous points anti-clockwise.
    rotation: function (angle) {
        return [
            Math.cos(angle), Math.sin(angle), 0,
            -Math.sin(angle), Math.cos(angle), 0,
            0, 0, 1,
        ];
    },

    // Creates a 3x3 row-major scale matrix, that scales 2D homogeneous points by sx in x and by sy in y direction.
    scaling: function (sx, sy) {
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1,
        ];
    },

    // Returns the product of two 3x3 matrices.
    multiply: function (a, b) { 
        // Falkschema
        //                  b[0] b[1] b[2]
        //                  b[3] b[4] b[5]
        //                  b[6] b[7] b[8]
        // a[0] a[1] a[2]
        // a[3] a[4] a[5]
        // a[6] a[7] a[8]

        // Methode 1.
        // Break second matrix down into rows
        // let row0 = [matrix_b[0], matrix_b[1], matrix_b[2]];
        // let row1 = [matrix_b[3], matrix_b[4], matrix_b[5]];
        // let row2 = [matrix_b[6], matrix_b[7], matrix_b[8]];

        // // Multiply rows with matrix a
        // let result0 = multiplyMatrixAndPoint(matrix_a, row0);
        // let result1 = multiplyMatrixAndPoint(matrix_a, row1);
        // let result2 = multiplyMatrixAndPoint(matrix_a, row2);

        // return [
        //     result0[0], result0[1], result0[2],
        //     result1[0], result1[1], result1[2],
        //     result2[0], result2[1], result2[2],
        // ];

        // Methode 2. 
        return [
            a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
			a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
			a[0] * b[2] + a[1] * b[5] + a[2] * b[8],

			a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
			a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
			a[3] * b[2] + a[4] * b[5] + a[5] * b[8],

			a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
			a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
			a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
        ];
    },

    // Creates a 3x3 homogeneous matrix that scales a [-1;1]x[-1;1] coordinate frame such that no 
    // skewing happens when mapping to a [0;w-1]x[0;h-1] pixel grid 
    // w, h are the width and height of the pixel grid, respectively.
    aspect: function (w, h)
    {
        if(w > h)
        {
            let aspect = h/w;
            return [
                aspect, 0, 0,
                0, 1, 0,
                0, 0, 1,
            ];

        } else {
            let aspect = w / h;
            return [
                1, 0, 0,
                0, aspect, 0,
                0, 0, 1
            ]
        }

        
    }
};

function multiplyMatrixAndPoint(matrix, vec) {
    // Save each value of the matrix to variable
    let c0r0 = matrix[0], c1r0 = matrix[1], c2r0 = matrix[2];
    let c0r1 = matrix[3], c1r1 = matrix[4], c2r1 = matrix[5];
    let c0r2 = matrix[6], c1r2 = matrix[7], c2r2 = matrix[8];
  
    // Points x, y and z
    let x = vec[0];
    let y = vec[1];
    let z = vec[2];
  
    // Multiply the points against each part of the n-th column, then add them together
    let resultX = (x * c0r0) + (y * c0r1) + (z * c0r2);
    let resultY = (x * c1r0) + (y * c1r1) + (z * c1r2);
    let resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2);
  
    return [resultX, resultY, resultZ];
  }
  