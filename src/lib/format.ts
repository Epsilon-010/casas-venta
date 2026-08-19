/** Formatea precios en MXN: 12900000 -> "$12,900,000" */
export const mxn = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

/** Precio corto: 12900000 -> "$12.9 M" */
export const mxnShort = (n: number) =>
  `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)} M`;

/** Datos de contacto (placeholder) usados en Navbar, Footer, WhatsApp, Contacto */
export const CONTACTO = {
  marca: "Altavista",
  marcaSub: "Residencias",
  telefono: "+52 222 000 0000",
  whatsapp: "522220000000",
  email: "ventas@altavista.mx",
  horario: "Lun – Sáb · 9:00 – 19:00",
};

export const waLink = (msg = "Hola, me interesa una propiedad de Altavista Residencias.") =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(msg)}`;
