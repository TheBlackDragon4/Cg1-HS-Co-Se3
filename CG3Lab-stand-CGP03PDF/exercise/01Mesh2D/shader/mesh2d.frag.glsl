#version 300 es
precision highp float;

out vec4 fragColor; // Farben wird eine Hierachie höher weitergeleitet FrameBuffer 
// Implement me (Assignment 2, 3)
in vec3 fs_color; // Farben werden vom Vertex Schader empfangen

// Aufgabe c)
uniform vec3 wf_color; // Farbe von Wireframe wird verwendet
uniform bool isWireframeColor; // Nimmt die Farbe auf, die reinkommen soll

void main()
{
    if(isWireframeColor){
        fragColor = vec4(fs_color, 1.0);
    }else{
        // fragColor = vec4(fs_color , 1.0);
        fragColor = vec4(wf_color, 1.0);
        // fs_color.rgb // fs_color.r, fs_color.g, fs_color.b // fs_color.xyz
    }
   
}