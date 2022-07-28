#version 300 es
precision highp float;

uniform bool u_useUniformColor;
uniform vec3 u_uniformColor;

in vec3 fs_color; // kommt vom Vertex Shader
out vec4 fragColor;
vec3 fs_normal; // Lokale Variable

void main()
{

  fs_normal = normalize(fs_color); // LAB 4 1e)

  if(u_useUniformColor)
  {
    fragColor = vec4(u_uniformColor, 1.0);
  }	else
  {  
	  fragColor = vec4(fs_normal, 1.0);
  }
}