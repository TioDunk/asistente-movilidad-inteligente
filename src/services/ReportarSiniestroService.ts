/**
 * Servicio para registrar siniestros viales
 */

export interface ReporteSiniestroRequest {
  tipo: string;
  direccion: string;
  descripcion: string;
  fecha: string;
}

export interface ReporteSiniestroResponse {
  mensaje?: string;
  [key: string]: unknown;
}

export const reportarSiniestro = async (
  payload: ReporteSiniestroRequest
): Promise<ReporteSiniestroResponse> => {
  const apiUrl = `/api/accidentes/guardar`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    // Detectar si devuelve texto o JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data: ReporteSiniestroResponse = await response.json();
      return data;
    } else {
      const textoPlano = await response.text();
      return { mensaje: textoPlano };
    }
  } catch (error) {
    console.error("❌ Error al reportar el siniestro:", error);
    throw error;
  }
};
