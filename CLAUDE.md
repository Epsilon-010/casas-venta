# Casas Promoción — Memoria del proyecto

Sitio de **una sola página** para que **una persona (propietario, sin marca ni empresa)** promocione **4 casas en venta**: 3 en **Puebla** y 1 en **Puerto Escondido (Oaxaca)**. Estética premium/blanca.

## Stack
- Vite 8 + React 19 + TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`, sin `tailwind.config`)
- `react-router-dom` sigue en `package.json` pero **ya no se usa** (no hay rutas; navegación por anclas)
- Fuentes: Inter (texto) + Cormorant Garamond (display) vía Google Fonts (`index.html`)
- Scripts: `npm run dev` · `npm run build` (tsc + vite) · `npm run lint` · `npm run preview`

## Secciones (una página, `src/pages/Home.tsx`)
| id | Componente | Qué es |
|---|---|---|
| `#inicio` | `Hero.tsx` | Hero unificado (móvil = escritorio): imagen estática de Cloudinary, titular gigante serif "TU HOGAR" **detrás de la casa** (duplicado de la imagen con `mask-image` en primer plano), parallax con mouse, botones → `#propiedades` / `#contacto`. Ya no hay slideshow |
| `#propiedades` | `FeaturedProperties.tsx` | Casas **agrupadas por ciudad** (`#ciudad-puebla`, `#ciudad-puerto-escondido`); una `PropertyCard` por casa (id = slug) |
| — | `Benefits.tsx` | Franja compacta: un bloque `mist` con 4 beneficios en fila (voz de propietario) |
| `#contacto` | `Contacto.tsx` | Datos de contacto + `ContactForm` integrado |

Navbar (`Navbar.tsx`): escritorio = píldora blanca centrada con recorte cóncavo (radio 24px igual al `rounded-b-3xl`), links EN MAYÚSCULAS con scroll suave + scroll-spy; **móvil = solo botón hamburguesa flotante** (círculo blanco arriba-derecha) con desplegable. Lista de secciones en `src/lib/secciones.ts` (`SECCIONES`, `irASeccion`). Footer lista casas por ciudad (anclas a `#slug`).

## Estructura
```
src/
├─ App.tsx              Navbar + <Home/> + Footer + WhatsAppButton (sin router)
├─ main.tsx             Entry
├─ index.css            @theme tokens + utilidades: container-x, glass, eyebrow, btn-primary, btn-ghost, btn-light, animate-float…
├─ data/casas.ts        ★ ÚNICA fuente de datos. Tipo Casa, Ciudad = "Puebla" | "Puerto Escondido", `casas`, `ciudades`, `casasPorCiudad`, getCasa
├─ lib/format.ts        mxn(), mxnShort(), CONTACTO (nombre/tel/WhatsApp/email/horario placeholder), waLink()
├─ lib/secciones.ts     SECCIONES (ids del nav), EVENTO_ELEGIR_CASA, irASeccion(), abrirLegal() (abre LegalModal)
├─ lib/consent.ts       Consentimiento de cookies de terceros (Google Maps): get/setConsentimiento (localStorage) + EVENTO_CONSENTIMIENTO
├─ pages/Home.tsx       Hero → FeaturedProperties → Benefits → Contacto
├─ components/
│  ├─ Navbar.tsx        Fija, píldora blanca centrada; menú móvil; scroll-spy
│  ├─ Hero.tsx
│  ├─ FeaturedProperties.tsx  Sección #propiedades agrupada por ciudad
│  ├─ PropertyCard.tsx  Tarjeta por casa: imagen plana (SIN efecto 3D; hover zoom suave, chips, precio, miniaturas) + panel crema con specs, "Ver info" (panel desplegable) y **"Me interesa" → abre CasaDetalleModal**. **Móvil: imagen primero, texto después**; escritorio alterna lado por índice
│  ├─ CasaDetalleModal.tsx  Detalle completo en modal fullscreen: galería con flechas, specs, descripción, amenidades, mapa (Google embed), WhatsApp y "Agendar visita" (cierra, dispara EVENTO_ELEGIR_CASA y baja a #contacto). Bloquea scroll del body, cierra con Esc/backdrop
│  ├─ Benefits.tsx
│  ├─ LegalModal.tsx    Aviso de Privacidad (LFPDPPP) + Términos y Condiciones en modal con tabs. Se abre con `abrirLegal("privacidad"|"terminos")` (evento global en `lib/secciones.ts`); enlazado desde Footer, ContactForm ("Al enviar aceptas…") y CookieBanner. Montado una vez en App.tsx
│  ├─ CookieBanner.tsx  Banner de cookies (abajo-izquierda, z-60): el sitio no usa cookies propias, pero el iframe de Google Maps sí puede instalar de terceros → el mapa en CasaDetalleModal SOLO se carga con consentimiento ("Cargar mapa" también lo otorga). Elección en localStorage vía lib/consent.ts
│  ├─ Contacto.tsx      Sección #contacto (datos + form)
│  ├─ ContactForm.tsx   Form (no envía a backend; console.log + estado "enviado"). Escucha EVENTO_ELEGIR_CASA para preseleccionar casa
│  ├─ Footer.tsx        Fondo oscuro; casas por ciudad, navegación por anclas, correo
│  ├─ SectionHeader.tsx, Img.tsx (fallback /placeholder.svg), Icons.tsx, WhatsAppButton.tsx
public/
├─ favicon.svg
└─ placeholder.svg
```

## Diseño (tokens en `src/index.css` → `@theme`)
- `ink` #14161a, `ink-soft`, `mist` #f6f5f2, `stone-50..300`, `sand` #c8a97e (dorado), `forest` #1f3d34
- Radios grandes (`rounded-3xl/4xl`), botones pill, tarjetas blancas borde `stone-200`, sombras `shadow-soft/card`
- Títulos: `font-display` + palabra en `italic text-sand(-dark)`
- Tailwind v4: `!` al final de la clase (`text-white/60!`), gradientes `bg-linear-to-*`, aspect `aspect-4/3`

## Datos placeholder que hay que reemplazar
- `data/casas.ts`: nombres, direcciones, precios, m², amenidades, coordenadas `mapa`, **imágenes** (URLs de Unsplash; poner las reales en `public/`)
- `lib/format.ts` → `CONTACTO` (teléfono, WhatsApp, email, horario)
- `Hero.tsx` (eslogan), `Benefits.tsx` (textos)
- `LegalModal.tsx`: revisar los textos legales con el propietario (usa `CONTACTO.nombre` como responsable; actualizar la constante `ACTUALIZADO` si se modifican)

## Pendientes / ideas
- Conectar `ContactForm` a un backend (Formspree, EmailJS, API)
- Quitar `react-router-dom` de `package.json` si no se vuelve a usar
- Deploy (Vercel/Netlify): página única, no requiere rewrites
