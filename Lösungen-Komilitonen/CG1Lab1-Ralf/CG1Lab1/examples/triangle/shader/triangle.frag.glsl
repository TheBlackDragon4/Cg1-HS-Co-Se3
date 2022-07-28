#version 300 es
precision highp float;

in vec3 vs_Color;
out vec4 outColor;

void main() 
{
  outColor = vec4(vs_Color, 1.0);
}