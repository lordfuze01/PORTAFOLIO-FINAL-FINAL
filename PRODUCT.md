# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos audiencias con el mismo peso; el sitio no se parte en dos recorridos:

- **Clientes potenciales** — marcas, emprendimientos o personas con una idea cruda que
  buscan a alguien que dirija el proyecto creativo y están decidiendo si contratarlo.
- **Estudios, directores creativos y reclutadores** — evalúan el perfil profesional de
  Santiago para un puesto, una práctica o una colaboración.

Ambos llegan sin conocer la marca, hojean en pocos minutos (desktop o móvil) y deciden
si vale la pena escribir. Todo el contenido está en español.

## Product Purpose

Portafolio personal de **Santiago Enciso Ballesta**, que trabaja bajo la marca
**BY KNOX** ("Knox") desde Bogotá, Colombia. Muestra su dirección creativa y su trabajo
multidisciplinario.

El sitio cumple su trabajo cuando **el visitante escribe** (correo, celular o Instagram).
Leer el manifiesto, recorrer los trabajos o saltar a Behance son caminos hacia ese
contacto, no fines en sí mismos.

## Positioning

"Dirección creativa para seres humanos." / "Human Centered."

El mecanismo es *design thinking* aplicado a través de disciplinas que rara vez viven en
un mismo perfil —comunicación gráfica, ilustración, audiovisual, editorial y diseño
industrial— con una postura declarada: integrar las herramientas del presente, incluida
la IA, sin perder la esencia humana, porque es esa esencia la que da ganas de vivir las
cosas. La combinación completa (industrial + editorial + fotografía + audiovisual, desde
Bogotá, con esa postura explícita) es lo que un portafolio vecino no podría copiar con
verdad.

## Operating Context

- Sitio estático servido por **Cloudflare Pages** (proyecto `byknox`, `wrangler.jsonc`
  sirve desde la raíz). **Publicar = `git push` a `main`**; Cloudflare redespliega solo.
  El usuario hace sus propios commits — no commitear por él salvo que lo pida.
- Cuatro páginas principales — Home (`index.html`), Knox, Trabajos, Contacto — más una
  página de detalle por proyecto. Menú lateral compartido por todas.
- El visitante evalúa hojeando: intro del conejo, hero fotográfico que crece con el
  scroll, manifiesto, galería "Fragmentos del trabajo" con lightbox, índice de trabajos
  con vista previa al cursor, fichas técnicas (fecha · proyecto · medios) y cierre con
  disponibilidad y datos de contacto.
- **Behance** (`behance.net/santiagenciso1`) es el archivo extendido del trabajo; el
  sitio muestra la selección.
- Canales de contacto reales: `sencisoballesta@gmail.com`, `+57 316 280 1718`,
  Instagram `@by_kn0x`. Disponibilidad declarada en el sitio: "Disponible para
  proyectos — Bogotá / remoto".

## Capabilities and Constraints

- **Stack:** HTML + CSS + JavaScript plano, **sin framework ni build**. Todo el CSS y el
  JS de `index.html` van inline en ese archivo; `pagina.css` + `menu.js` sirven a las
  páginas internas.
- Librerías locales en `lib/` (funcionan sin internet): **GSAP solo core, sin
  ScrollTrigger** → los efectos de scroll se hacen con IntersectionObserver + `gsap.to`;
  además Lottie, OGL y la fuente variable Roboto Flex.
- El logo/mascota es un **conejo animado en Lottie** (`conejo.json`, incrustado también
  en `knox.html`).
- El hero usa un **motor de scroll manual** (`actualizarHero()` con rAF): la foto crece
  de 56vh a 100vh, se aclara y enfoca. No romper esa lógica.
- El CSS del menú lateral y de `.status` está **duplicado a propósito** en `index.html`
  (inline) y en `pagina.css`: si se toca uno, hay que tocar el otro.
- `_headers` define CSP con `'unsafe-inline'`/`'unsafe-eval'` (necesarios por el JS
  inline y las expresiones de Lottie). **La CSP no se puede probar en local**: se
  verifica después de publicar.
- `.assetsignore` controla qué archivos del repo **no** se publican en el sitio (docs
  internos, `graphify-out/`, `CLAUDE.md`, `CONTEXTO-AGENTE.md`, `PRODUCT.md`,
  `conejo.json`).
- **El repo es público:** nada de claves, tokens ni rutas locales con el nombre de
  usuario en archivos versionados.
- Idioma: español (`lang="es"`).
- Terminología del sitio, respetarla: **Trabajos** (no "Proyectos") en la navegación,
  **Ficha** para la tabla fecha · proyecto · medios, **Cierre** para el footer de
  `index.html`, **Archivo** para la galería de fragmentos.
- Gotcha de verificación: Edge headless tiene un piso de viewport (~492px), así que las
  capturas a 360px dan falsos desbordes. Para medir overflow real, comparar
  `document.body.scrollWidth` contra el viewport dentro de la página.

## Brand Commitments

- Nombre: **BY KNOX / KNOX**. Persona detrás: Santiago Enciso Ballesta, Bogotá.
- **Voz confirmada: primera persona del singular.** KNOX es la marca personal de
  Santiago, no un estudio ni un colectivo.
  *Pendiente:* varios textos ya publicados hablan en plural ("diseñamos", "buscamos",
  "creamos", "la convertimos"). Unificarlos al singular es una edición de copy que
  requiere aprobación explícita del usuario, no un arreglo silencioso.
- **Reglas de diseño dadas por el usuario, por encima de cualquier propuesta propia:**
  sin tipografías serif; el manifiesto va centrado, sin riel ni columna a la izquierda.
- El conejo (Lottie) es el símbolo de la marca y abre el sitio.
- Frases de marca en uso: "Dirección creativa para seres humanos.", "Human Centered.",
  "Dirección creativa. Human centered creation, desde Bogotá."
- Servicios declarados: Dirección creativa · Diseño gráfico · Audiovisual · Fotografía ·
  Editorial · Diseño industrial.

## Evidence on Hand

**Real hoy:**

- Fotografía propia publicada: `foto-portada.jpg` (hero, de la colección "Mordiendo el
  polvo"), `imagenes/masonry/masonry-01…08.jpg` (galería "Fragmentos del trabajo") e
  `imagenes/*-hover.jpg` (vistas previas del índice). Los originales sin comprimir
  (`FOTO PORTADA FINAL.jpg`, `DSC04623-2.jpg`, `FOTOS MASSONERY/`) viven solo en disco:
  no se versionan ni se publican.
- **Behance** como archivo completo y verificable del trabajo.
- Dos proyectos con datos reales: **Especiferal** (Mar — May 2025 · InDesign · Fusion 360
  · Impresión 3D) y **Mordiendo el polvo** (Feb 2025 — Actualidad · Fotografía ·
  Lightroom · Baja obturación).

**Pendiente — no rellenar por cuenta propia:**

- Las galerías de Especiferal y Mordiendo están en "Próximamente"; se llenarán con fotos
  reales que llegan más adelante.
- "El sabio se parcha el bobo se estresa" (proyecto 03) no tiene fecha, medios ni
  descripción reales todavía.
- Las secciones Concepto / Proceso / Producto final de las páginas de proyecto siguen en
  "Próximamente".
- **No existen clientes con nombre, logos, casos con métricas ni testimonios.** Nunca
  fabricarlos.
- No hay archivo de video ni cortometraje grabado.

## Product Principles

1. **Todo camino termina en escribir.** Cada sección debe dejar el contacto más cerca,
   no más lejos; el cierre no es decorativo, es el objetivo.
2. **Dos audiencias, una sola lectura.** La evidencia que convence a un cliente es la
   misma que convence a un estudio. Nunca una sección aparte "para reclutadores".
3. **El trabajo se muestra, no se narra.** Con material fotográfico escaso, la imagen que
   existe se usa en grande y el vacío se declara ("Próximamente") en lugar de rellenarse
   con adornos.
4. **Lo humano manda sobre la técnica.** La postura de la marca obliga a que cada efecto
   sirva a la lectura; un recurso que solo demuestra destreza técnica sobra.
5. **Honestidad de portafolio.** Cero clientes, métricas o testimonios inventados; el
   estado real de cada proyecto (en curso, próximamente) se dice tal cual.

## Accessibility & Inclusion

- Las animaciones existentes respetan `prefers-reduced-motion` (manifiesto, cierre,
  parallax, transiciones de página). Mantenerlo en todo lo nuevo.
- Las interacciones que dependen del cursor —la vista previa flotante en Trabajos— están
  limitadas a `(pointer: fine)` y nunca deben ser el único camino al contenido.
- Foco visible con `outline` en enlaces y botones; el menú lateral usa `aria-expanded` /
  `aria-controls` y cierra con Escape.
- **No se estableció un estándar formal** (nivel WCAG, auditoría externa) con el usuario;
  queda como decisión abierta.
