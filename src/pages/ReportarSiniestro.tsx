import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BannerInstitucional } from "../components/BannerInstitucional";
import { reportarSiniestro } from "../services/ReportarSiniestroService";
import { registrarSiniestro } from "../services/PredecirSiniestroService";
import { obtenerCatalogos } from "../services/EstadisticasService";
import "./ReportarSiniestro.css";

export const ReportarSiniestro = () => {
  const [formData, setFormData] = useState({
    tipo: "",
    descripcion: "",
    ubicacion: "",
    localidad: "",
  });

  const [tipos, setTipos] = useState<string[]>([]);
  const [localidades, setLocalidades] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [mensajeAPI, setMensajeAPI] = useState("");

  // Ubicación geográfica del navegador
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  useEffect(() => {
    const cargarParametros = async () => {
      const data = await obtenerCatalogos();
      setTipos(data.tipos_clase_acc);
      setLocalidades(data.localidades_disponibles);
    };

    // Obtener coordenadas GPS del usuario
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        console.warn("⚠️ No se pudo obtener la ubicación del usuario.");
      }
    );

    cargarParametros();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const obtenerFechaActual = (): string => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.tipo ||
      !formData.descripcion ||
      !formData.ubicacion ||
      !formData.localidad
    ) {
      alert("Por favor completa todos los campos antes de enviar.");
      return;
    }

    try {
      const fechaActual = new Date();
      const payloadSecundario = {
        latitud: coords?.lat || 0,
        longitud: coords?.lon || 0,
        hora: fechaActual.getHours(),
        dia_semana: fechaActual.getDay(),
        mes: fechaActual.getMonth() + 1,
        ano: fechaActual.getFullYear(),
        localidad: formData.localidad,
        clase_acc: formData.tipo,
        direccion: formData.ubicacion,
      };
      await registrarSiniestro(payloadSecundario);
      const payloadPrincipal = {
        tipo: formData.tipo,
        direccion: formData.ubicacion,
        descripcion: formData.descripcion,
        localidad: formData.localidad,
        fecha: obtenerFechaActual(),
      };

      const response = await reportarSiniestro(payloadPrincipal);

      setMensajeAPI(
        response.mensaje ||
          "✅ Siniestro reportado exitosamente y registrado en el sistema predictivo."
      );
      setShowPopup(true);
    } catch (error) {
      console.error(error);
      setMensajeAPI(
        "❌ Ocurrió un error al enviar el reporte. Intenta nuevamente."
      );
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({ tipo: "", descripcion: "", ubicacion: "", localidad: "" });
  };

  return (
    <>
      <BannerInstitucional />
      <div className="reportar-container">
        <h2>📝 Reportar Siniestro</h2>
        <p>
          Completa la información del siniestro vial que deseas reportar. Los
          datos se utilizarán para mejorar la respuesta y la prevención.
        </p>

        <form className="formulario" onSubmit={handleSubmit}>
          {/* Tipo dinámico */}
          <div className="campo">
            <label htmlFor="tipo">Tipo de siniestro</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo</option>
              {tipos.map((t, index) => (
                <option key={index} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Localidad dinámica */}
          <div className="campo">
            <label htmlFor="localidad">Localidad</label>
            <select
              id="localidad"
              name="localidad"
              value={formData.localidad}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una localidad</option>
              {localidades.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Dirección */}
          <div className="campo">
            <label htmlFor="ubicacion">Dirección</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              placeholder="Ej. Calle 25 #74-63, Bogotá D.C."
              value={formData.ubicacion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Descripción */}
          <div className="campo">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              placeholder="Describe brevemente lo ocurrido..."
              rows={4}
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Botones */}
          <div className="botones-formulario">
            <Link to="/siniestralidad-en-vivo" className="btn-volver">
              ⬅️ Volver al mapa
            </Link>
            <button type="submit" className="btn-enviar">
              🚀 Enviar reporte
            </button>
          </div>
        </form>

        {/* Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3>📋 Resultado del reporte</h3>
              <p>{mensajeAPI}</p>
              <hr />
              <p>
                <strong>Tipo:</strong> {formData.tipo}
              </p>
              <p>
                <strong>Localidad:</strong> {formData.localidad}
              </p>
              <p>
                <strong>Dirección:</strong> {formData.ubicacion}
              </p>
              <p>
                <strong>Descripción:</strong> {formData.descripcion}
              </p>
              <button onClick={handleClosePopup} className="btn-cerrar">
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
