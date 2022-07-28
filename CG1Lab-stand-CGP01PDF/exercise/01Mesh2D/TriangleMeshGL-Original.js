import { SimpleMeshModelIO } from "./../../lib/helper/simple-mesh-model-io.js"

export class TriangleMeshGL{
    
    constructor(gl, simpleMeshIO) {
        this.nTriangleIndices = 0;
        this.vao = 0;
        
        const triangles     = simpleMeshIO.indices;
        const positions     = simpleMeshIO.positions;
        const colors        = simpleMeshIO.colors;

        const positionAttributeLocation = 0;
        const colorAttributeLocation = 1;

        
        // 2.0 -> 2.4 reinkopieren
        

    }

    draw(gl)
    {

    }

}