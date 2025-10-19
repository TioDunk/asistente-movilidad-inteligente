import { useEffect, useState } from "react";

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  error?: string;
  status: "pending" | "granted" | "denied";
}

export const useGeolocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    status: "pending",
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: 0,
        longitude: 0,
        error: "Tu navegador no soporta geolocalización.",
        status: "denied",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        //Llamada a Nominatim (OpenStreetMap)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await res.json();

          setLocation({
            latitude: lat,
            longitude: lon,
            address: data.display_name || "Dirección no disponible",
            status: "granted",
          });
        } catch {
          setLocation({
            latitude: lat,
            longitude: lon,
            address: "No se pudo obtener la dirección.",
            status: "granted",
          });
        }
      },
      (error) => {
        setLocation({
          latitude: 0,
          longitude: 0,
          error: error.message,
          status: "denied",
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return location;
};
