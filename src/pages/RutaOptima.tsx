import { useState } from "react";
import { useGeolocation } from "../hooks/useGeoLocation";
import { BannerInstitucional } from "../components/BannerInstitucional";
import { obtenerAlertaPorDireccion } from "../services/RutaOptimaService";
import "./RutaOptima.css";
import Logo from "../assets/LogoMinTransporte.png";

export const RutaOptima = () => {
  const location = useGeolocation();
  const [destino, setDestino] = useState("");
  const [sugerencia, setSugerencia] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleBuscarRuta = async () => {
    if (location.status !== "granted") return;

    if (!destino.trim()) {
      setSugerencia("⚠️ Por favor ingresa una dirección válida.");
      return;
    }

    setLoading(true);
    setSugerencia("");

    try {
      // Llamamos al servicio externo
      const data = await obtenerAlertaPorDireccion(destino);

      // Interpretamos la respuesta
      const mensaje =
        data?.mensaje ||
        data?.alerta ||
        data?.texto ||
        "No se encontró información para la dirección ingresada.";

      setSugerencia(
        `Desde tu ubicación actual (${
          location.address || "ubicación desconocida"
        }) hasta "${destino}", el servicio indica: ${mensaje}`
      );

      setSugerencia(
        `Desde tu ubicación actual (${
          location.address || "ubicación desconocida"
        }) hasta "${destino}", el servicio indica: ${mensaje}`
      );
    } catch {
      setSugerencia(
        "❌ Ocurrió un error al consultar el servicio. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  // Renderizado condicional del popup institucional
  if (showWelcome) {
    return (
      <div className="popup-overlay">
        <div className="popup-content mintransporte-style">
          <img
            src={Logo}
            alt="Ministerio de Transporte de Colombia"
            className="popup-logo"
          />
          <h2>🚦 Asistente de Movilidad Inteligente</h2>

          <p>
            Este aplicativo es una iniciativa del{" "}
            <strong>
              Ministerio de Transporte de la República de Colombia
            </strong>
            , enmarcado en la política de <strong>Gobierno Digital</strong>,
            orientada a fortalecer la{" "}
            <strong>movilidad segura, sostenible y eficiente</strong> mediante
            el uso de inteligencia artificial y analítica predictiva.
          </p>

          <p>
            Actualmente, la versión disponible se encuentra en{" "}
            <strong>fase piloto</strong> y opera exclusivamente para el{" "}
            <strong>Distrito Capital — Bogotá D.C.</strong>
          </p>

          <p>
            Al continuar, reconoces que esta herramienta tiene fines de
            orientación y experimentación, y no sustituye las indicaciones de
            las autoridades de tránsito competentes.
          </p>

          <button
            className="btn-mintransporte"
            onClick={() => setShowWelcome(false)}
          >
            🚀 Ingresar al asistente
          </button>
        </div>
      </div>
    );
  }

  // Estados de permiso de GPS
  if (location.status === "pending") {
    return (
      <div className="ruta-optima-container">
        <h2>🧭 Asistente de Ruta Óptima</h2>
        <p>Solicitando permisos de ubicación...</p>
      </div>
    );
  }

  if (location.status === "denied") {
    return (
      <div className="ruta-optima-container">
        <h2>🧭 Asistente de Ruta Óptima</h2>
        <p className="error">
          ⚠️ No se concedieron permisos de ubicación. Por favor habilita el
          acceso al GPS para continuar.
        </p>
      </div>
    );
  }

  // Pantalla principal
  return (
    <>
      <BannerInstitucional />
      <div className="ruta-optima-container">
        <h2>🧭 Asistente de Ruta Óptima</h2>

        <p>
          📍 Tu ubicación actual:
          <br />
          <strong>{location.address}</strong>
        </p>

        <div className="input-group">
          <label htmlFor="destino">Destino:</label>
          <input
            type="text"
            id="destino"
            placeholder="Calle 88 # 94 L 44, Bogotá"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button onClick={handleBuscarRuta} disabled={loading}>
            {loading ? "Analizando..." : "Buscar ruta óptima"}
          </button>

          <button
            className="btn-secundario"
            onClick={() => (window.location.href = "/siniestralidad-en-vivo")}
          >
            🔴 Ver siniestralidad en vivo
          </button>
        </div>

        {sugerencia && (
          <div className="resultado">
            <h4>📍 Resultado:</h4>
            <p>{sugerencia}</p>
          </div>
        )}
      </div>
    </>
  );
};
