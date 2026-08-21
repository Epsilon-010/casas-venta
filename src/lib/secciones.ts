/** Secciones de la página única (ids en Hero / FeaturedProperties / Contacto) */
export const SECCIONES = [
  { id: "inicio", label: "Inicio" },
  { id: "propiedades", label: "Propiedades" },
  { id: "contacto", label: "Contacto" },
];

/** Evento global: el botón "Me interesa" de una tarjeta preselecciona la casa en el formulario */
export const EVENTO_ELEGIR_CASA = "elegir-casa";

/** Evento global: abre el modal legal (LegalModal) con el documento indicado */
export const EVENTO_ABRIR_LEGAL = "abrir-legal";
export type DocumentoLegal = "privacidad" | "terminos";

export const abrirLegal = (doc: DocumentoLegal) =>
  window.dispatchEvent(new CustomEvent(EVENTO_ABRIR_LEGAL, { detail: doc }));

/** Scroll suave a una sección compensando la altura del navbar fijo */
export const irASeccion = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === "inicio" ? 0 : el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
  history.replaceState(null, "", `#${id}`);
};
