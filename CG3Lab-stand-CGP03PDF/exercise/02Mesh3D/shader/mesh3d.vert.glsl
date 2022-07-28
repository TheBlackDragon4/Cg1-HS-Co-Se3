#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color; 

out vec3 fs_color;

uniform mat4 u_mvp;

void main()
{    
    // gl_Position =  vec4(transform);
    // LAB 03 g)
    gl_Position =  vec4(u_mvp * vec4(a_position.xyz, 1));
    fs_color = abs(vec3(a_position));
}