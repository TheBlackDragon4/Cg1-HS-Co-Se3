#version 300 es
precision highp float;

out vec4 outColor;
in vec3 vs_Color;

void main() 
{
  outColor = vec4(vs_Color, 1);
}