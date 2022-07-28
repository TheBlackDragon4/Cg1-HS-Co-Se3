#version 300 es
precision highp float;

uniform bool u_useUniformColor;
uniform vec3 u_uniformColor;

in vec3 fs_color;
out vec4 fragColor;

void main()
{
  if(u_useUniformColor)
  {
    fragColor = vec4(u_uniformColor, 1.0);
  }	else
  {  
	  fragColor = vec4(fs_color, 1.0);
  }
}