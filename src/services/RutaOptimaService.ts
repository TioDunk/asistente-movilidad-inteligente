/**
 * Servicio encargado de consumir la API de accidentes / alertas
 */

export interface RutaOptimaResponse {
  mensaje?: string;
  alerta?: string;
  texto?: string;
  [key: string]: unknown;
}

/**
 * Consulta la API del servicio de accidentes por dirección.
 * @param direccion Dirección ingresada por el usuario
 */
export const obtenerAlertaPorDireccion = async (
  direccion: string
): Promise<RutaOptimaResponse> => {
  const encodedDireccion = encodeURIComponent(direccion.trim());
  const apiUrl = `/api/accidentes/alerta?direccion=${encodedDireccion}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    // 🔹 Detectamos si la respuesta es JSON o texto plano
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data: RutaOptimaResponse = await response.json();
      return data;
    } else {
      const textoPlano = await response.text();
      return { texto: textoPlano };
    }
  } catch (error) {
    console.error("❌ Error al consultar la API de accidentes:", error);
    throw error;
  }
};
