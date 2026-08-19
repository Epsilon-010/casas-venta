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

/** Datos de contacto del propietario (placeholder — reemplazar con los reales) */
export const CONTACTO = {
  nombre: "Propietario",
  telefono: "+52 222 000 0000",
  whatsapp: "522220000000",
  email: "contacto@correo.com",
  horario: "Lun – Sáb · 9:00 – 19:00",
};

export const waLink = (msg = "Hola, vi tus casas en venta y me gustaría más información.") =>
  `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(msg)}`;
