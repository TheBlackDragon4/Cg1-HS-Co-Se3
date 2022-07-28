#version 300 es

layout (location = 0) in vec4 inVertex;
layout (location = 1) in vec3 inColor;

uniform mat3 mat3_transform;

out vec3 vs_Color;

void main() 
{
  gl_Position = mat3_transform * inVertex;
  vs_Color = inColor;
}