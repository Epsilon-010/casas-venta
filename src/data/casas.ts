/**
 * DATOS DE LAS PROPIEDADES
 */

export type Ciudad = "Puerto Vallarta" | "Puebla" | "Puerto Escondido";

export interface Casa {
  slug: string;
  nombre: string;
  ciudad: Ciudad;
  estado: string;
  colonia: string;
  direccion: string;
  precio: number;
  recamaras: number;
  banos: number;
  estacionamiento: number;
  m2Construccion: number;
  m2Terreno: number;
  niveles: number;
  entrega: string;
  descripcion: string;
  destacado: boolean;
  etiqueta?: string;
  amenidades: string[];
  imagenes: string[];
  mapa: { lat: number; lng: number };
  tour360?: string;
}

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const casas: Casa[] = [
  // --- PUEBLA (3 Propiedades) ---
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
      "Residencia de concreto aparente y cristal dentro de un cluster con seguridad 24 h. Doble altura en sala, cocina con isla, roof garden con vista a los volcanes.",
    amenidades: ["Roof garden", "Casa club", "Seguridad 24h", "Cocina con isla"],
    imagenes: [u("photo-1600585154084-4e5fe7c39198"), u("photo-1600566752355-35792bedcfea"), u("photo-1600585153490-76fb20a32601")],
    mapa: { lat: 19.0225, lng: -98.2712 },
  },
  {
    slug: "residencia-sonata-puebla",
    nombre: "Residencia Sonata",
    ciudad: "Puebla",
    estado: "Puebla",
    colonia: "Lomas de Angelópolis",
    direccion: "Av. Sonata 402, Distrito Sonata, 72830 San Andrés Cholula, Pue.",
    precio: 7_200_000,
    recamaras: 3,
    banos: 3.0,
    estacionamiento: 2,
    m2Construccion: 290,
    m2Terreno: 200,
    niveles: 2,
    entrega: "Inmediata",
    destacado: false,
    etiqueta: "Moderna",
    descripcion:
      "Casa inteligente con diseño vanguardista. Ubicada en la zona con mayor plusvalía de Puebla, cerca de restaurantes y plazas comerciales de primer nivel.",
    amenidades: ["Smart Home", "Jardín lineal", "Acceso controlado", "Aire acondicionado"],
    imagenes: [u("photo-1600596542815-ffad4c1539a9"), u("photo-1600585154526-990dced4db0d"), u("photo-1600566753190-17f0baa2a6c3")],
    mapa: { lat: 19.0315, lng: -98.2655 },
  },
  {
    slug: "villa-la-paz-puebla",
    nombre: "Villa La Paz",
    ciudad: "Puebla",
    estado: "Puebla",
    colonia: "La Paz",
    direccion: "Calle Tehuantepec 115, Colonia La Paz, 72160 Puebla, Pue.",
    precio: 6_500_000,
    recamaras: 3,
    banos: 2.5,
    estacionamiento: 2,
    m2Construccion: 260,
    m2Terreno: 220,
    niveles: 2,
    entrega: "Dic 2026",
    destacado: false,
    etiqueta: "Preventa",
    descripcion:
      "Proyecto residencial en la tradicional Colonia La Paz. Arquitectura que fusiona lo clásico con lo contemporáneo, grandes ventanales y mucha luz natural.",
    amenidades: ["Roof garden privado", "Estudio", "Cerca de restaurantes", "Patio central"],
    imagenes: [u("photo-1600047509807-ba8f99d2cdde"), u("photo-1600121848594-d8644e57abab"), u("photo-1600210491892-03d54c0aaf87")],
    mapa: { lat: 19.0550, lng: -98.2160 },
  },

  // --- PUERTO ESCONDIDO (1 Propiedad) ---
  {
    slug: "casa-zicatela-oaxaca",
    nombre: "Casa Zicatela",
    ciudad: "Puerto Escondido",
    estado: "Oaxaca",
    colonia: "La Punta",
    direccion: "Calle del Morro s/n, La Punta, 70934 Puerto Escondido, Oax.",
    precio: 5_800_000,
    recamaras: 2,
    banos: 2.0,
    estacionamiento: 1,
    m2Construccion: 180,
    m2Terreno: 200,
    niveles: 2,
    entrega: "Inmediata",
    destacado: true,
    etiqueta: "Frente al mar",
    descripcion:
      "Diseño tropical minimalista a unos pasos de la famosa playa La Punta. Espacios abiertos, acabados de chukum y madera local, ideal para vacacionar o rentas de Airbnb.",
    amenidades: ["Alberca tipo plunge", "Palapa", "A pasos de la playa", "Diseño sustentable"],
    imagenes: [u("photo-1613490493576-7fde63acd811"), u("photo-1600566753086-00f18fb6b3ea"), u("photo-1600607687939-ce8a6c25118c")],
    mapa: { lat: 15.8500, lng: -97.0600 },
  },
];

export const ciudades: Ciudad[] = ["Puerto Vallarta", "Puebla", "Puerto Escondido"];

export const getCasa = (slug: string) => casas.find((c) => c.slug === slug);