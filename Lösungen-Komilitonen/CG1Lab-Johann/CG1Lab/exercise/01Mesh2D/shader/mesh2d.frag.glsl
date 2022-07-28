#version 300 es
precision highp float;

out vec4 fragColor;
in vec3 b_color;

void main()
{
    fragColor = vec4(b_color, 1.0);
}