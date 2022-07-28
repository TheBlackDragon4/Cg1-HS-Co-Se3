#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color; 

// Implement me (Assignment 2)
out vec3 fs_color; // Set color for fragment shader

// Implement me (Assignment 3)
uniform mat3 transform; // used in 01Mesh2d.js

void main()
{
    gl_Position = vec4(transform *  vec3(a_position.xy, 1), 1.0); // 3er Vecktor gemacht
    fs_color = a_color;
}

// Zum Verstaendnis: main wird in etwa so in einer Loop aufgerufen
// for(int i = 0; i < nVertices; i++)
// {
//     gl_Position[i] = vec4(transform * vec3(a_position[i].xy, 1), 1.0);
//     fs_color[i] = a_color[i];
// }