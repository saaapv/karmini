# KARMA — Tattoo & Piercing Studio (versión corregida)

Sitio de una sola página: HTML + CSS + JavaScript puro. Sin instalaciones, sin build.

## Cómo verlo
Abre la carpeta en VS Code → clic derecho en `index.html` → **Open with Live Server**. (También funciona con doble clic: ya no hay rutas absolutas.)

## Qué hay en la carpeta
| Archivo | Para qué sirve |
|---|---|
| `js/config.js` | **Lo único que editas**: WhatsApp, textos, artistas, portafolio, testimonios, FAQ, redes, mapa, estadísticas. |
| `index.html` | Estructura. No se toca. |
| `css/styles.css` | Estilos y animaciones. Colores en el bloque `:root`. |
| `js/main.js` | Lógica (filtros, lightbox, formulario, carrusel). No se toca. |
| `legal.html` | **Plantilla** de privacidad/términos/cookies. Hay que reemplazarla por textos revisados por un abogado. |
| `robots.txt`, `sitemap.xml`, `favicon.svg` | SEO e identidad. Cambia `karmastudio.com` por tu dominio. |
| `assets/` | Pon aquí tus fotos (`images/tatuajes`, `piercings`, `artistas`, `hero`) y videos. |

## Cómo editar (todo en `js/config.js`)
- **WhatsApp**: `estudio.whatsapp`, solo dígitos con código de país (`573001234567`).
- **Agregar una foto**: copia el archivo a `assets/images/tatuajes/` (minúsculas, sin espacios) y agrega una línea en `portafolio` copiando una existente con un `id` nuevo. Si usas un estilo nuevo, agrégalo también en `filtros`.
- **Una red que no tienes**: déjala en `""` y no aparece.
- **Mapa**: en Google Maps → Compartir → Insertar un mapa → copia solo la URL del `src` y pégala en `mapaEmbed`.
- **Formulario**: por defecto abre WhatsApp con los datos. Para recibir correos usa Formspree: `modo: "formspree"` y pega tu `endpoint`.
- Si te equivocas, el sitio muestra un aviso rojo: revisa comas y comillas, o deshaz con Ctrl+Z. Antes de editar, copia `config.js` como respaldo.
- Imágenes: ancho ~1000 px, formato `.webp`, menos de 200 KB. Video del hero: menos de 3 MB, sin audio.

## Cómo publicar y actualizar
Netlify (arrastrar la carpeta en *Add new site → Deploy manually*) o Vercel/GitHub Pages. Para actualizar contenido: edita `config.js` y vuelve a subir la carpeta (con Git, Vercel/Netlify republican solos).

## Qué se corrigió respecto a la versión anterior
- **Rutas relativas** en todo el proyecto (antes se rompía en GitHub Pages y con doble clic).
- **Menú móvil**: el botón de cerrar quedaba tapado; ahora el header va encima y el foco se gestiona.
- **Contenido invisible**: los elementos con reveal quedaban ocultos si fallaba el JS o nadie añadía `.is-visible`. Ahora hay un solo sistema y un respaldo automático.
- **Lightbox**: el video vacío siempre visible (`hidden` anulado por el reset), navegación que ignoraba el filtro, sin gestión de foco.
- **Errores aislados**: cada bloque de `main.js` corre protegido y avisa si `config.js` tiene un error.
- **Estadísticas, redes, mapa, hero y JSON-LD** ahora salen de `config.js` (antes estaban fijos en el HTML).
- **Hero**: el degradado del texto ya no desaparece, el título es accesible (`aria-label`) y no parpadea.
- **Marquee** continuo (antes saltaba), **hover y centrado** de elementos anulados por conflictos entre CSS y GSAP.
- **Rendimiento**: se eliminaron GSAP, ScrollTrigger y Lenis (≈100 KB y la causa de la mayoría de los conflictos); las animaciones usan CSS e IntersectionObserver. Sin animaciones de `box-shadow` ni `will-change` permanente.
- **Accesibilidad**: enlace "Saltar al contenido", filtros con `aria-pressed`, carrusel con botón de pausa, bio de artistas siempre visible (en táctil no hay hover), colores de texto pequeño con contraste ≥ 4.5:1, icono de WhatsApp oscuro sobre verde, `prefers-reduced-motion`.
- **SEO**: un solo dominio, `canonical`, `og:image` absoluta, JSON-LD generado desde `config.js`.
- **Limpieza**: de 23 archivos a los necesarios; se eliminaron `animations.css`, `animations.js`, cursor personalizado, skeleton, ribbon, glitch, keyframes sin uso y la documentación duplicada.

## Pendiente antes de publicar (lo debe hacer el estudio)
1. Reemplazar WhatsApp, teléfono, correo, dirección, horarios y **cifras reales** de `estadísticas`.
2. Subir fotos reales (portafolio, artistas, `estudio.jpg`, `og-image.jpg` de 1200×630, poster/video del hero).
3. Sustituir los testimonios de ejemplo por **reseñas reales con permiso**, y revisar FAQ (precios, abono, pagos).
4. Redactar `legal.html` con un abogado (Colombia: Ley 1581 de 2012) y cambiar `karmastudio.com` en `index.html`, `robots.txt`, `sitemap.xml` y `config.js`.
5. Probar en un celular real y correr Lighthouse (Chrome → F12 → Lighthouse) antes de anunciar el sitio.
