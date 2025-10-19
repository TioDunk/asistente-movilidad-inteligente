import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import { obtenerSiniestrosMultiples } from "../services/SiniestralidadService";
import type { Siniestro } from "../services/SiniestralidadService";
import "./SiniestralidadLive.css";
import { BannerInstitucional } from "../components/BannerInstitucional";

// Ícono personalizado para choques
const crashIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2967/2967350.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -30],
});

export const SiniestralidadLive = () => {
  const [alertas, setAlertas] = useState<Siniestro[]>([]);

  // Función para cargar alertas desde el servicio
  const cargarAlertasDesdeAPI = async () => {
    const nuevasAlertas = await obtenerSiniestrosMultiples(5); // 5 llamadas seguidas
    setAlertas(nuevasAlertas);
  };

  // Cargar datos inicialmente y luego cada 30 segundos
  useEffect(() => {
    cargarAlertasDesdeAPI();
    const intervalo = setInterval(cargarAlertasDesdeAPI, 30000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <>
      <BannerInstitucional />
      <div className="siniestralidad-container">
        <h2>🚨 Siniestralidad en Vivo</h2>
        <p>
          Visualización de siniestros viales reportados en Bogotá. Los íconos
          indican incidentes recientes o seleccionados aleatoriamente del
          histórico.
        </p>

        {/* --- Mapa --- */}
        <div className="mapa-container">
          <MapContainer
            center={[4.711, -74.072]} // Centro de Bogotá
            zoom={12}
            style={{ height: "500px", width: "100%", borderRadius: "15px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />

            {alertas.map((alerta) => (
              <Marker
                key={alerta.id}
                position={[alerta.lat, alerta.lon]}
                icon={crashIcon}
              >
                <Popup>
                  <strong>{alerta.tipo}</strong> <br />
                  <b>📍 Dirección:</b> {alerta.direccion} <br />
                  <b>⚠️ Gravedad:</b> {alerta.gravedad} <br />
                  <b>🕒 Fecha:</b> {alerta.fecha.split(" ")[0]} <br />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* --- Botones inferiores --- */}
        <div className="botones-container">
          <Link to="/" className="btn-volver">
            ⬅️ Volver a rutas
          </Link>
          <Link to="/reportar" className="btn-reportar">
            📝 Reportar siniestro
          </Link>
        </div>
      </div>
    </>
  );
};
