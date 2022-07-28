#version 300 es

layout (location = 0) in vec4 inVertex;
out vec3 vs_Color;

void main() 
{
  gl_Position = inVertex;
}