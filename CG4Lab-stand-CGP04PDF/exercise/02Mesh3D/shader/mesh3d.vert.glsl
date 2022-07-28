#version 300 es
precision highp float;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec3 a_color; 
layout(location = 2) in vec3 a_normal; // LAB 4 1e)

out vec3 fs_color; // Weiterleitung an den Fragment Shader
uniform mat4 u_mvp; // Wird benötigt für die Positionsberechnung
uniform mat4 u_mvInvT; // LAB04 2f)

void main()
{    
    gl_Position =  vec4(u_mvp * vec4(a_position.xyz, 1)); // Hier sind wir im ClipSpace
    
    // LAB04 2g)
    // a_normal mit u_mvInvT transformieren 
    vec4 normale_H = vec4(a_normal, 0); // w Komponente muss eingegeben werden -> w Komponente ist 0 da hier ein Richtungsvektor -> Länge ist egal
    vec4 normale_Mult_H_InvTrans = vec4(u_mvInvT * normale_H); // Multiplikation der TransformiertInversen mit der Normalen Matrix
    vec3 normal_Transponieren = normale_Mult_H_InvTrans.xyz; // Wird als Vec4 erstellt und in Fragment Shader übergeben 
    // Zugriff auf die einzelenen Werte XYZ 

    // fs_color = vec3(abs(vec4(u_mvInvT * vec4(a_normal, 1)))); // LAB04 1c)
    fs_color = abs(normal_Transponieren); // Aus LAB03
}