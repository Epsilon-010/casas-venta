# Casas Promoción — Memoria del proyecto

Prototipo web para vender **4 casas** (3 en Puerto Vallarta, 1 en Puebla) con estética premium/blanca.
Marca placeholder: **Altavista Residencias**.

## Stack
- Vite 8 + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, sin `tailwind.config`) · react-router-dom 7
- Fuentes: Inter (texto) + Cormorant Garamond (display) vía Google Fonts (`index.html`)
- Scripts: `npm run dev` · `npm run build` (tsc + vite) · `npm run lint` · `npm run preview`

## Rutas (`src/App.tsx`)
| Ruta | Página | Qué es |
|---|---|---|
| `/` | `pages/Home.tsx` | Landing: Hero → FeaturedProperties → Cities → Benefits → Testimonials → CTA |
| `/casas` | `pages/Casas.tsx` | Listado con filtros en URL: `?ciudad=Puebla&orden=precio-asc` |
| `/casas/:slug` | `pages/CasaDetalle.tsx` | Galería, specs, descripción, amenidades, mapa (Google embed), sidebar con WhatsApp + form, similares |
| `/nosotros` | `pages/Nosotros.tsx` | Historia de la marca (texto placeholder) + Benefits + CTA |
| `/contacto` | `pages/Contacto.tsx` | Formulario + datos de contacto |
| `*` | `pages/NotFound.tsx` | 404 |

## Estructura
```
src/
├─ App.tsx              Router + Layout (Navbar, Footer, ScrollToTop, WhatsAppButton global)
├─ main.tsx             Entry
├─ index.css            @theme tokens (colores, fuentes, sombras) + utilidades: container-x, glass, eyebrow, btn-primary, btn-ghost, btn-light, animate-fade-up
├─ data/casas.ts        ★ ÚNICA fuente de datos de las 4 casas (tipo Casa, ciudades, getCasa). Todo placeholder.
├─ lib/format.ts        mxn(), mxnShort(), CONTACTO (tel/WhatsApp/email placeholder), waLink()
├─ components/
│  ├─ Navbar.tsx        Fija, glass; transparente sobre el hero de Home, blanca al hacer scroll; menú móvil
│  ├─ Footer.tsx        Fondo ink; lista casas desde data
│  ├─ Logo.tsx          Isotipo + wordmark (prop light)
│  ├─ Icons.tsx         SVGs inline (Bed, Bath, Car, Area, Pin, Arrow, Check, WhatsApp, Menu, X, Leaf, Shield, Key, Star, Chevrons)
│  ├─ Img.tsx           <img> con fallback a /placeholder.svg si la URL falla
│  ├─ PropertyCard.tsx  Card de casa (imagen overlay, etiqueta, ciudad, precio, specs). size "md"|"lg"
│  ├─ SectionHeader.tsx Eyebrow + título display + texto + acción
│  ├─ Hero.tsx          Hero full-bleed (casa destacada), chips, mini-card, stat strip
│  ├─ FeaturedProperties.tsx  Grid 2 grandes (destacado:true) + 2 medianas
│  ├─ Cities.tsx        Bloques Puerto Vallarta / Puebla → link a /casas?ciudad=
│  ├─ Benefits.tsx      4 tarjetas de beneficios
│  ├─ Testimonials.tsx  Fondo verde bosque, 3 testimonios placeholder (avatars pravatar.cc)
│  ├─ CTA.tsx           Bloque final con imagen + WhatsApp + link a /contacto
│  ├─ ContactForm.tsx   Form (no envía a backend; console.log + estado "enviado"). Prop casaSlug preselecciona
│  ├─ WhatsAppButton.tsx Botón flotante (prop mensaje)
│  └─ ScrollToTop.tsx
public/
├─ favicon.svg
└─ placeholder.svg      Fallback de imágenes
```

## Diseño (tokens en `src/index.css` → `@theme`)
- `ink` #14161a (texto/negro), `ink-soft`, `mist` #f6f5f2 (fondo cálido), `stone-50..300`, `sand` #c8a97e (acento dorado), `forest` #1f3d34 (verde profundo)
- Radios grandes (`rounded-3xl/4xl`), botones pill, tarjetas blancas con borde `stone-200`, sombras `shadow-soft/card`
- Títulos: `font-display` + palabra en `italic text-sand(-dark)`
- Tailwind v4: `!` va al final de la clase (`text-white/60!`), gradientes `bg-linear-to-*`, aspect `aspect-4/3`

## Datos placeholder que hay que reemplazar (cliente)
- `data/casas.ts`: nombres, direcciones, precios, m², amenidades, coordenadas `mapa`, **imágenes** (URLs de Unsplash; poner las reales en `public/` o `src/assets/`)
- `lib/format.ts` → `CONTACTO` (marca, teléfono, WhatsApp, email, horario)
- `Testimonials.tsx` (testimonios y avatares), `Nosotros.tsx` (texto/cifras), `Cities.tsx` (imágenes de ciudad)
- Nota: "Puerto" se asumió como **Puerto Vallarta**; si es otro puerto, cambiar `Ciudad` en `data/casas.ts` y textos en Hero/Cities/Footer.

## Pendientes / ideas
- Conectar `ContactForm` a un backend (Formspree, EmailJS, API)
- Reemplazar Google Maps embed por Maps API con clave si se quiere estilo custom
- SEO por página (títulos/OG) — p.ej. react-helmet o `document.title` en cada page
- Deploy (Vercel/Netlify): SPA → agregar rewrite a `/index.html`
