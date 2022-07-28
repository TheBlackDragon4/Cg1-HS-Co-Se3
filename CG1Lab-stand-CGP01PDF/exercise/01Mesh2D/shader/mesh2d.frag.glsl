#version 300 es
precision highp float;

out vec4 fragColor; // Farben wird eine Hierachie höher weitergeleitet FrameBuffer 
// Implement me (Assignment 2, 3)
in vec3 fs_color; // Farben werden vom Vertex Schader empfangen

void main()
{
    fragColor = vec4(fs_color , 1.0);
    // fs_color.rgb // fs_color.r, fs_color.g, fs_color.b // fs_color.xyz
}