/**
 * Servicio encargado de obtener siniestros viales desde la API
 */

export interface Siniestro {
  id: number;
  lat: number;
  lon: number;
  tipo: string;
  direccion: string;
  gravedad: string;
  fecha: string;
}

/**
 * Llama al endpoint que devuelve un siniestro aleatorio
 */
export const obtenerSiniestroAleatorio =
  async (): Promise<Siniestro | null> => {
    const apiUrl = `/v1/siniestro_aleatorio`;

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

      const data = await response.json();

      if (data && data.status === "success" && data.data) {
        const d = data.data;
        return {
          id: d.OBJECTID ?? Date.now(),
          lat: d.Y,
          lon: d.X,
          tipo: d.CLASE_ACC || "SIN CLASE",
          direccion: d.DIRECCION || "Dirección desconocida",
          gravedad: d.GRAVEDAD || "Sin gravedad registrada",
          fecha: d.FECHA_OCURRENCIA_ACC || "",
        };
      }

      return null;
    } catch (error) {
      console.error("❌ Error al obtener siniestro aleatorio:", error);
      return null;
    }
  };

/**
 * Llama al servicio varias veces para obtener múltiples registros
 */
export const obtenerSiniestrosMultiples = async (
  cantidad: number
): Promise<Siniestro[]> => {
  const resultados: Siniestro[] = [];

  for (let i = 0; i < cantidad; i++) {
    const siniestro = await obtenerSiniestroAleatorio();
    if (siniestro) resultados.push(siniestro);
  }

  return resultados;
};
