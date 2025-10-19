/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Servicio para registrar el siniestro con coordenadas y datos temporales
 */

export interface RegistrarSiniestroPayload {
  latitud: number;
  longitud: number;
  hora: number;
  dia_semana: number;
  mes: number;
  ano: number;
  localidad: string;
  clase_acc: string;
  direccion: string;
}

export const registrarSiniestro = async (
  payload: RegistrarSiniestroPayload
): Promise<any> => {
  const apiUrl = `/v1/ml/predecir`;

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

    return await response.json();
  } catch (error) {
    console.error("❌ Error al registrar siniestro:", error);
    throw error;
  }
};
