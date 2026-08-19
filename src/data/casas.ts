/**
 * DATOS DE LAS PROPIEDADES
 * -------------------------------------------------------------
 * ⚠️  TODO lo que hay aquí es PLACEHOLDER (direcciones, precios,
 *     imágenes de Unsplash, coordenadas). Reemplazar por los datos
 *     reales cuando el cliente los entregue.
 *
 * Para agregar/editar una casa solo se toca este archivo; el resto
 * de la app (cards, detalle, filtros) se genera automáticamente.
 * -------------------------------------------------------------
 */

export type Ciudad = "Puerto Vallarta" | "Puebla";

export interface Casa {
  slug: string;              // usado en la URL: /casas/:slug
  nombre: string;
  ciudad: Ciudad;
  estado: string;
  colonia: string;
  direccion: string;         // dirección completa (placeholder)
  precio: number;            // MXN
  recamaras: number;
  banos: number;
  estacionamiento: number;
  m2Construccion: number;
  m2Terreno: number;
  niveles: number;
  entrega: string;           // p.ej. "Inmediata" | "Dic 2026"
  descripcion: string;
  destacado: boolean;        // aparece en el hero / sección destacada
  etiqueta?: string;         // "Nueva", "Vista al mar", etc.
  amenidades: string[];
  imagenes: string[];        // la [0] es la portada
  mapa: { lat: number; lng: number };
  tour360?: string;          // URL opcional a tour virtual
}

// Helper para URLs de Unsplash (imágenes de relleno)
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const casas: Casa[] = [
  {
    slug: "casa-marina-conchas-chinas",
    nombre: "Casa Marina",
    ciudad: "Puerto Vallarta",
    estado: "Jalisco",
    colonia: "Conchas Chinas",
    direccion: "Paseo de los Delfines 214, Conchas Chinas, 48390 Puerto Vallarta, Jal.",
    precio: 12_900_000,
    recamaras: 4,
    banos: 4.5,
    estacionamiento: 3,
    m2Construccion: 420,
    m2Terreno: 560,
    niveles: 3,
    entrega: "Inmediata",
    destacado: true,
    etiqueta: "Vista al mar",
    descripcion:
      "Residencia contemporánea en la zona más exclusiva de Vallarta. Volúmenes de concreto aparente, dobles alturas y terrazas escalonadas que abrazan la bahía. Cada espacio fue pensado para vivir hacia afuera: alberca infinita, cocina abierta y ventanales de piso a techo.",
    amenidades: [
      "Alberca infinita",
      "Roof garden con vista a la bahía",
      "Cocina integral italiana",
      "Domótica y seguridad 24/7",
      "Paneles solares",
      "Cuarto de servicio",
    ],
    imagenes: [
      u("photo-1613490493576-7fde63acd811"),
      u("photo-1600585154340-be6161a56a0c"),
      u("photo-1600607687939-ce8a6c25118c"),
      u("photo-1600566753086-00f18fb6b3ea"),
      u("photo-1600210492486-724fe5c67fb0"),
    ],
    mapa: { lat: 20.5849, lng: -105.2436 },
  },
  {
    slug: "casa-arena-marina-vallarta",
    nombre: "Casa Arena",
    ciudad: "Puerto Vallarta",
    estado: "Jalisco",
    colonia: "Marina Vallarta",
    direccion: "Av. Paseo de la Marina 88, Marina Vallarta, 48335 Puerto Vallarta, Jal.",
    precio: 8_450_000,
    recamaras: 3,
    banos: 3.5,
    estacionamiento: 2,
    m2Construccion: 310,
    m2Terreno: 380,
    niveles: 2,
    entrega: "Inmediata",
    destacado: false,
    etiqueta: "Nueva",
    descripcion:
      "Casa de líneas puras a pasos del campo de golf. Fachada blanca con celosías de madera, patio central con vegetación tropical y una planta baja completamente abierta hacia el jardín. Ideal para familia o inversión vacacional.",
    amenidades: [
      "Jardín privado con alberca",
      "Family room",
      "Estudio / home office",
      "Aire acondicionado en toda la casa",
      "Acceso controlado",
      "Cerca de marina y golf",
    ],
    imagenes: [
      u("photo-1600596542815-ffad4c1539a9"),
      u("photo-1600585154526-990dced4db0d"),
      u("photo-1600566753190-17f0baa2a6c3"),
      u("photo-1600573472592-401b489a3cdc"),
    ],
    mapa: { lat: 20.6675, lng: -105.2513 },
  },
  {
    slug: "casa-selva-amapas",
    nombre: "Casa Selva",
    ciudad: "Puerto Vallarta",
    estado: "Jalisco",
    colonia: "Amapas",
    direccion: "Calle Hortensias 47, Amapas, 48399 Puerto Vallarta, Jal.",
    precio: 6_200_000,
    recamaras: 3,
    banos: 2.5,
    estacionamiento: 2,
    m2Construccion: 240,
    m2Terreno: 260,
    niveles: 2,
    entrega: "Nov 2026",
    destacado: false,
    etiqueta: "Preventa",
    descripcion:
      "Entre la montaña y el mar, Casa Selva integra la vegetación al proyecto: muros verdes, terraza sombreada y una paleta de materiales naturales. A 5 minutos caminando de la Zona Romántica y la playa Los Muertos.",
    amenidades: [
      "Terraza con jacuzzi",
      "Muros verdes",
      "Cocina abierta",
      "Bodega",
      "Pet friendly",
      "Precio de preventa",
    ],
    imagenes: [
      u("photo-1600047509807-ba8f99d2cdde"),
      u("photo-1600121848594-d8644e57abab"),
      u("photo-1600210491892-03d54c0aaf87"),
      u("photo-1600585152220-90363fe7e115"),
    ],
    mapa: { lat: 20.5947, lng: -105.2394 },
  },
  {
    slug: "casa-angelopolis-puebla",
    nombre: "Casa Angelópolis",
    ciudad: "Puebla",
    estado: "Puebla",
    colonia: "Lomas de Angelópolis",
    direccion: "Blvd. de los Volcanes 1520, Cascatta, Lomas de Angelópolis, 72830 San Andrés Cholula, Pue.",
    precio: 9_750_000,
    recamaras: 4,
    banos: 4.5,
    estacionamiento: 3,
    m2Construccion: 385,
    m2Terreno: 300,
    niveles: 3,
    entrega: "Inmediata",
    destacado: true,
    etiqueta: "Cluster privado",
    descripcion:
      "Residencia de concreto aparente y cristal dentro de un cluster con seguridad 24 h. Doble altura en sala, cocina con isla, roof garden con vista a los volcanes y recámara principal con vestidor y baño tipo spa. La mejor zona de Puebla, a minutos de escuelas y plazas.",
    amenidades: [
      "Roof garden con vista a los volcanes",
      "Casa club con alberca y gym",
      "Cocina con isla",
      "Vestidor en recámara principal",
      "Cisterna y calentador solar",
      "Seguridad 24 h",
    ],
    imagenes: [
      u("photo-1600585154084-4e5fe7c39198"),
      u("photo-1600566752355-35792bedcfea"),
      u("photo-1600585153490-76fb20a32601"),
      u("photo-1600607687644-c7171b42498f"),
      u("photo-1600566752227-8f3b9d0e6b8f"),
    ],
    mapa: { lat: 19.0225, lng: -98.2712 },
  },
];

export const ciudades: Ciudad[] = ["Puerto Vallarta", "Puebla"];

export const getCasa = (slug: string) => casas.find((c) => c.slug === slug);
