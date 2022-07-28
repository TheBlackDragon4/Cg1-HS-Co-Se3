#version 300 es

layout (location = 0) 
in vec4 inVertex; // geht hinein

layout (location = 1) 
in vec3 inColor; // Hineingehender Wert inColor

out vec3 vs_Color; // Hinausgehender Wert vs_Color

uniform float u_scale;

void main() 
{
  gl_Position = inVertex;
  vs_Color = inColor;
}