#version 300 es
precision highp float;

in vec3 vs_Color; // Eingehender Wert vs_Color
out vec4 outColor; // Ausgehender Wert outColor

void main() 
{
  outColor = vec4(vs_Color, 1.0);
}