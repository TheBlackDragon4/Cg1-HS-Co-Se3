#version 300 es
precision highp float;

uniform bool u_useUniformColor;
uniform vec3 u_uniformColor;

in vec3 fs_position; // kommt vom Vertex Shader
in vec3 fs_normal; // Lokale Variable
out vec4 fragColor;
// LAB05 e) + LAB05 2e)
uniform vec3 diffuse_color; // Wird benötigt für die Farbzuordnung
uniform vec3 specular_color; // Wird benötigt für die Spekulare Farbgebung
uniform vec3 ambient_color; // Wird benötigt für die Ambiente Farbgebung
uniform float specular_exponent; // Wird benötigt für den Spekularen Exponenten

void main()
{
  vec3 n = normalize(fs_normal); // LAB4 1e) -> Normalisiert Positionswerte

  // LAB5 c) Berechnen des Vektors l 
  // Berechne vec(l)
  // Lichtquelle vec(L) = 0
  vec3 L = vec3(0.0, 0.0, 0.0);
  vec3 p = fs_position.xyz;
  vec3 l = L - p; // l = Lichtquelle - zu beleuchtende Punkt -> Spitze - Fuss

  // LAB5 d , e) Berechne f_diffuse, gewichte f_diffuse mit der Weiß. Gib das Ergebnis nun aus
  // vec3 white = vec3(255.0, 255.0, 255.0); // Vektor der Farbe White für die Testgewichtung
  float f_diffuse = max(dot(n, normalize(l)), 0.0); // Berechnung von f_deffuse nach angegebener Formel
  
  // LAB5 2 a, b) // Berechnung der Formel v = p - C -> View Vector = position - Camera
  vec3 v = -p; // v = C - p  -> C = 0 daher können wir einfach v = p schreiben
  vec3 h = normalize(l) + normalize(v); // h = halfway Vektor l = Lichtvektor v = View Vektor -> zwischen Punkt und Kamera sein
  float f_spec = pow(max(dot(n, normalize(h)), 0.0), specular_exponent); // LAB05 2 c, d)
  // float f_spec = max(dot(n, normalize(h)), 0.0); // Lustiges Verhalten in der Ausgabe


  if(u_useUniformColor)
  {
    fragColor = vec4(u_uniformColor, 1.0);
  }	else
  {
	  // fragColor = vec4(abs(fs_position) , 1.0);
    // Hier ist die Reihenfolge extrem wichtig
    // Formel ist hier : Diffuse * Spekulare Farbe + Specular * diffuser Farbe= Resultat Reflexion
	  // fragColor = vec4(  f_diffuse * specular_color + f_spec * diffuse_color , 1.0);
	  fragColor = vec4(ambient_color + f_diffuse * diffuse_color + f_spec * specular_color , 1.0);
  }
}