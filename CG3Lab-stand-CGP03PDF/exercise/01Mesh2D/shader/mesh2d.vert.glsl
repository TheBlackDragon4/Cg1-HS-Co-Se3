#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color; // Definiert die Farbe des Baby-Löwen -> Hier wird eine Farbe erwartet ansonsten 0

// Implement me (Assignment 2)
out vec3 fs_color; // die Farbinformationen werden in den FragmentSchader weitergeleitet

uniform mat3 transform;

// gleichbedeutetend mit einer For-Schleife
void main()
{
    gl_Position = vec4(transform * vec3(a_position.xy , 1) , 1.0);
    // gl_Position = vec4(a_position , 1.0);
    fs_color = a_color; 
}