/**
 * Consentimiento de cookies de terceros (solo las del mapa de Google Maps:
 * el sitio no instala cookies propias). La elección se guarda en localStorage
 * y se avisa por evento global para que banner y modal reaccionen en vivo.
 */
export type Consentimiento = "aceptadas" | "rechazadas";

const KEY = "cookies-consentimiento";

/** Evento global: se dispara cuando el usuario acepta o rechaza cookies */
export const EVENTO_CONSENTIMIENTO = "cambio-consentimiento";

export function getConsentimiento(): Consentimiento | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "aceptadas" || v === "rechazadas" ? v : null;
  } catch {
    return null;
  }
}

export function setConsentimiento(v: Consentimiento) {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* modo privado sin storage: la elección vale solo para esta visita */
  }
  window.dispatchEvent(new CustomEvent(EVENTO_CONSENTIMIENTO, { detail: v }));
}
