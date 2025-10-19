# 🚦 Asistente de Movilidad Inteligente – Frontend

Aplicación web desarrollada con **React + TypeScript**, diseñada como parte del prototipo **Asistente de Movilidad Inteligente** del **Ministerio de Transporte de Colombia**.  
Este sistema forma parte de la iniciativa de **modernización tecnológica** en el marco de la **Maestría en Arquitectura de Software – Tendencias Emergentes**, orientada a fortalecer la seguridad vial y la movilidad inteligente mediante el uso de **IA**, **IoT** y **Machine Learning**.

---

## 📋 Descripción

El frontend permite la **interacción ciudadana y visualización en tiempo real** de datos viales.  
Integra componentes que conectan con servicios predictivos y APIs REST para mostrar rutas seguras, siniestralidad vial y permitir el reporte ciudadano de incidentes.

---

## 🚀 Características principales

- ✅ Módulo **Ruta Óptima** – Recomienda rutas seguras según el nivel de riesgo vial.
- ✅ Módulo **Siniestralidad en Vivo** – Muestra alertas de accidentes en un mapa interactivo con Leaflet.
- ✅ Módulo **Reporte de Siniestro** – Permite registrar incidentes viales en tiempo real.
- ✅ Integración con **API FastAPI** mediante peticiones GET y POST.
- ✅ Consumo de datos dinámicos para **localidades y tipos de siniestros**.
- ✅ Estilo institucional del Ministerio de Transporte con banner, colores y tipografía coherentes.

---

## 🛠️ Tecnologías utilizadas

| Tecnología                     | Descripción                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| ⚛️ **React + TypeScript**      | Framework y tipado estático para desarrollo escalable        |
| ⚡ **Vite**                    | Entorno de desarrollo rápido y ligero                        |
| 🗺️ **Leaflet**                 | Mapa interactivo para visualización geográfica de siniestros |
| 🎨 **CSS3 (modular)**          | Diseño institucional y responsivo                            |
| 🔀 **React Router DOM**        | Navegación entre módulos                                     |
| 🌐 **Fetch API / Ngrok proxy** | Conexión segura con el backend FastAPI                       |

---

## 📦 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd asistente-movilidad-front
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 4. Acceder a la aplicación

```bash
http://localhost:5173
```

---

## 🧩 Estructura del proyecto

```
asistente-movilidad-front/
├── src/
│   ├── components/
│   │   ├── BannerInstitucional.tsx
│   │   └── MapView.tsx
│   ├── pages/
│   │   ├── RutaOptima.tsx
│   │   ├── SiniestralidadLive.tsx
│   │   └── ReportarSiniestro.tsx
│   ├── services/
│   │   ├── rutaOptimaService.ts
│   │   ├── PredecirSiniestroService.ts
│   │   └── ReportarSiniestroService.ts
│   └── App.tsx
├── public/
│   └── LogoMinTransporte.png
└── README.md
```

---

## 🌐 Módulos principales

### 🧭 **Ruta Óptima**

Permite al usuario ingresar un destino y recibir recomendaciones predictivas de ruta segura, consultando el endpoint `/accidentes/alerta`.

### 🚨 **Siniestralidad en Vivo**

Renderiza un mapa de Bogotá con marcadores de siniestros obtenidos del endpoint `/siniestro_aleatorio`, actualizados periódicamente.

### 📝 **Reporte de Siniestro**

Formulario ciudadano que registra incidentes y envía la información al backend.  
Adicionalmente, genera un registro predictivo con coordenadas, fecha, hora y ubicación del siniestro.

---

## 🧪 Validación y pruebas

Las pruebas piloto demostraron:

- Navegación fluida e intuitiva entre los módulos.
- Consumo estable de APIs mediante proxy de Vite.
- Visualización correcta de coordenadas y datos en tiempo real.
- Correcto funcionamiento del formulario de reporte y del sistema de alertas.

---

## 🎯 Objetivo del proyecto

Fortalecer la infraestructura tecnológica del **Ministerio de Transporte de Colombia** a través de una aplicación web que combine **IA**, **IoT** y **Machine Learning**, contribuyendo a la reducción de accidentes y la gestión de una **movilidad más inteligente y segura**.

---

## 👨‍💻 Desarrollado por

Proyecto académico de la **Maestría en Arquitectura de Software – Tendencias Emergentes**.  
Universidad Cooperativa de Colombia – 2025.
