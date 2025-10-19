/**
 * Servicio para obtener catálogos (localidades y tipos de accidente)
 */

export interface CatalogosResponse {
  localidades_disponibles: string[];
  tipos_clase_acc: string[];
}

export const obtenerCatalogos = async (): Promise<CatalogosResponse> => {
  const apiUrl = `/v1/estadisticas`;

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
    return {
      localidades_disponibles: data.localidades_disponibles || [],
      tipos_clase_acc: data.tipos_clase_acc || [],
    };
  } catch (error) {
    console.error("❌ Error al obtener catálogos:", error);
    return { localidades_disponibles: [], tipos_clase_acc: [] };
  }
};
