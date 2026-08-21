import { useEffect, useState } from "react";
import { EVENTO_CONSENTIMIENTO, getConsentimiento, setConsentimiento } from "../lib/consent";
import { abrirLegal } from "../lib/secciones";

/**
 * Banner de cookies: aparece hasta que el visitante acepta o rechaza.
 * Solo aplica a cookies de terceros (mapa de Google Maps); el sitio no
 * instala cookies propias. Si se rechazan, el mapa no se carga hasta que
 * el visitante lo pida expresamente en el detalle de la casa.
 */
export default function CookieBanner() {
  const [eleccion, setEleccion] = useState(getConsentimiento);

  // Si aceptan desde otro lado (p. ej. "Cargar mapa" en el modal), se oculta
  useEffect(() => {
    const onCambio = () => setEleccion(getConsentimiento());
    window.addEventListener(EVENTO_CONSENTIMIENTO, onCambio);
    return () => window.removeEventListener(EVENTO_CONSENTIMIENTO, onCambio);
  }, []);

  if (eleccion) return null;

  return (
    <div className="fixed bottom-4 left-4 right-24 z-[60] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md">
      <div className="rounded-3xl border border-stone-200 bg-white/95 p-5 shadow-card backdrop-blur">
        <p className="text-xs leading-relaxed text-ink-soft">
          Este sitio no usa cookies propias, pero el mapa de Google Maps puede instalar cookies de
          terceros al mostrarse. Consulta el{" "}
          <button
            onClick={() => abrirLegal("privacidad")}
            className="font-medium underline underline-offset-2 hover:text-ink"
          >
            Aviso de Privacidad
          </button>
          .
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => setConsentimiento("aceptadas")} className="btn-primary px-4! py-2! text-xs!">
            Aceptar
          </button>
          <button onClick={() => setConsentimiento("rechazadas")} className="btn-ghost px-4! py-2! text-xs!">
            Rechazar
          </button>
        </div>
      </div>
    </div>
  );
}
