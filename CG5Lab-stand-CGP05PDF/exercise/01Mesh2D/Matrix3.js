export let Matrix3 = {

    // Creates a 3x3 row-major translation matrix, that translates 2D homogeneous points by tx in x direction and ty in y direction.
    translation: function (tx, ty) {
        return [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1,
        ];
    },

    //Creates a 3x3 row-major rotation matrix, that rotates 2D homogeneous points anti-clockwise.
    rotation: function (angle) {
        let c = Math.cos(angle);
        let s = Math.sin(angle);
        return [
            c, -s, 0,
            s, c, 0,
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
        // Einfachere Möglichkeit FalkSchema
        //              b[0] b[1] b[2] 
        //              b[3] b[4] b[5]
        //              b[6] b[7] b[8]
        // a[0] a[1] a[2]
        // a[3] a[4] a[5]
        // a[6] a[7] a[8] 

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



        // // 1. Reihen aus Matrix b abspeichern
        // let row0 = [b[0], b[1], b[2]];
        // let row1 = [b[3], b[4], b[5]];
        // let row2 = [b[6], b[7], b[8]];

        // // 2. Mulitplikation der Reihen mit Matrix a
        // let result0 = multiplyMatrixAndPoint(a, row0);
        // let result1 = multiplyMatrixAndPoint(a, row1);
        // let result2 = multiplyMatrixAndPoint(a, row2);

        // return [
        //     result0[0], result0[1], result0[2],
        //     result1[0], result1[1], result1[2],
        //     result2[0], result2[1], result2[2]
        // ];
    },

    // Creates a 3x3 homogeneous matrix that scales a [-1;1]x[-1;1] coordinate frame such that no skewing happens when mapping to a [0;w-1]x[0;h-1] pixel grid
    // w, h are the width and height of the pixel grid, respectively.
    aspect: function (w, h) {
        // Womit muss hier Skalliert werden, um die Matrix rückgängig machen zu können
        if (w > h) {
            let aspect = h / w;
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
                0, 0, 1,
            ];
        }


    }
};

// Nicht wirklich zielführend für Rotation
// function multiplyMatrixAndPoint(matrix, vec) {
//     // Speichere jeden Wert der Matrix -> Zeilen und Spaltennummer
//     let c0r0 = matrix[0],
//         c1r0 = matrix[1],
//         c2r0 = matrix[2];
//     let c0r1 = matrix[3],
//         c1r1 = matrix[4],
//         c2r1 = matrix[5];
//     let c0r2 = matrix[6],
//         c1r2 = matrix[7],
//         c2r2 = matrix[8];

//     // Erstellen des Homogenens Punktes aus point
//     let x = vec[0];
//     let y = vec[1];
//     let z = vec[2];

//     // Matrix wird 1.Transponiert 2.verrechnet
//     // Muliplikation des Vektors mit jedem Teil der 1. Zeile -> Multiplikationen werden untereinander Addiert
//     let resultX = (x * c0r0) + (y * c0r1) + (z * c0r2);

//     // Muliplikation des Vektors mit jedem Teil der 2. Zeile -> Multiplikationen werden untereinander Addiert
//     let resultY = (x * c1r0) + (y * c1r1) + (z * c1r2);

//     // Muliplikation des Vektors mit jedem Teil der 3. Zeile -> Multiplikationen werden untereinander Addiert
//     let resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2);

//     return [resultX, resultY, resultZ];
// }