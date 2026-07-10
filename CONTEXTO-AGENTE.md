# Contexto para el agente — Portafolio BY KNOX

> Archivo de traspaso. Léelo antes de trabajar en este proyecto para no re-descubrir todo.
> Última actualización: 2026-07-09.

## Qué es

Portafolio personal de **Santiago Enciso** (marca **BY KNOX** / "Knox"), dirección
creativa (entornos visuales, físicos y audiovisuales). Sitio **estático**: HTML + CSS +
JavaScript, sin framework ni build. El logo/mascota es un **conejo** (animación Lottie).

## Ubicación y despliegue

- **Carpeta local:** `C:\Users\mudki\Documents\portafolio`
- **Repo GitHub:** `https://github.com/lordfuze01/PORTAFOLIO-FINAL-FINAL.git` (rama `main`)
- **Hosting en vivo:** Cloudflare, proyecto **byknox** (config en `wrangler.jsonc`,
  sirve desde la raíz `"directory": "."`).
- **Publicar = `git push` a `main`.** Cloudflare redespliega solo. Editar en VS Code
  NO publica: hay que `git add -A` → `git commit -m "..."` → `git push`.
  **El usuario hace sus propios commits** (no commitear por él salvo que lo pida).

## Estructura de archivos

- `index.html` — intro del conejo (Lottie) + landing con scroll + sección "Introducción".
  **Todo el CSS y JS va inline en este archivo** (dentro de `<style>` y `<script>`).
- `knox.html` — "¿Quién es Knox?"
- `trabajos.html` — índice de trabajos
- `contacto.html` — contacto
- `pagina.css` — estilos de las páginas internas (knox/trabajos/contacto)
- `menu.js` — comportamiento del menú lateral (compartido por las 4 páginas)
- `_headers` — cabeceras de Cloudflare: seguridad (CSP, nosniff, anti-iframe) + cache
- `.assetsignore` — qué archivos del repo NO se publican en el sitio
  (docs internos, graphify-out, CLAUDE.md, CONTEXTO-AGENTE.md, conejo.json)
- `lib/gsap.min.js`, `lib/lottie.min.js` — librerías locales (funcionan sin internet).
  **Solo está el core de GSAP** (no ScrollTrigger) → para efectos de scroll usar
  IntersectionObserver + gsap.to (así se hizo la intro).
- `foto-portada.jpg` — imagen del hero (las fuentes pesadas están en `.gitignore`).

## Estado actual del trabajo

### Rediseño de la sección "Introducción" (inferior de index.html) — HECHO
Antes era un bloque centrado genérico con botones tipo píldora. Se rediseñó a un
**manifiesto centrado**:
- **Reglas del usuario (respetar):** SIN tipografías serif. Todo CENTRADO.
  Sin riel/columna a la izquierda.
- Fondo negro (continúa el hero), texto en blanco cálido `--bone: #ECE7DF`.
- Título grande en Helvetica bold; énfasis con `<em>` en **cursiva** (humano,
  sentirnos humanos, sentido).
- Enlaces-índice centrados (Conoce a Knox / Ver trabajos / Hablemos) con subrayado
  que barre y flecha que se desliza en hover.
- **Animación de scroll:** cada frase va envuelta en `<span class="line"><span>…</span></span>`
  y se revela subiendo en cascada al entrar en viewport (GSAP + IntersectionObserver,
  `.line { overflow:hidden }` como máscara). Respeta `prefers-reduced-motion`.
- Responsive: `.intro__title` y `.intro__lead` usan `width:100%` para que el texto
  ajuste (baje de línea) en móviles y nunca desborde. Enlaces se apilan en ≤560px.

Marcadores en el código para editar textos: buscar en `index.html` el comentario
`>>> Los TEXTOS se editan en el HTML` dentro de `<section class="intro" id="intro">`.
Colores/tamaños: variables en `:root` (`--bone`, `--ash`, `--line`) y los `clamp(...)`
en `.intro__title` / `.intro__lead`.

### Sección "Corto" (debajo de la Introducción) — HECHO
Inspirada en orastudio.ca. Spec completo en
`docs/superpowers/specs/2026-07-08-seccion-corto-design.md`. Resumen:
- **Layout:** grid 1/3 texto ("Conoce uno de nuestros *cortos*." + botón "Ver corto →")
  a la izquierda, 2/3 miniatura a la derecha. Miniatura = bloque 16:9 oscuro con botón
  play (placeholder: **aún no hay archivo de video**). En ≤700px se apilan.
- **Parallax continuo:** `actualizarCorto()` (mismo patrón que `actualizarHero()`, con
  rAF): el texto se desplaza lento y la miniatura más rápido + escala 0.94→1, opacidad
  ligada al progreso. Con `prefers-reduced-motion` queda estático.
- **Visor (lightbox):** clic en miniatura o "Ver corto" → el marco se expande tipo FLIP
  hasta casi fullscreen. Cierra con ✕, Escape o clic fuera; bloquea el scroll del body.
- **Para enchufar el video real:** buscar `>>> AQUI VA EL VIDEO` en `index.html` y
  ponerle `src` al `<video id="visorVideo">`; el "Próximamente" desaparece solo.

### Menú lateral (botón hamburguesa en las 4 páginas) — HECHO
Spec en `docs/superpowers/specs/2026-07-09-menu-lateral-design.md`. Botón fijo
arriba-derecha → panel deslizante desde la derecha (GSAP), overlay oscuro, cierra
con ✕/Escape/clic fuera. Comportamiento en `menu.js`; CSS duplicado a propósito
en `index.html` (inline) y `pagina.css` — si se toca uno, tocar el otro.
En `index.html` reemplazó al nav viejo del hero; el índice de enlaces de la intro
ahora es el "flow menu" (filas anchas con marquee CSS infinito al hacer hover).

### Limpieza + seguridad (2026-07-09) — HECHO
- `.assetsignore`: se dejaron de publicar `docs/`, `graphify-out/`, `CLAUDE.md`,
  `CONTEXTO-AGENTE.md` y `conejo.json` (antes eran públicos en el sitio).
- `_headers`: cabeceras de seguridad (CSP con 'unsafe-inline'/'unsafe-eval' —
  necesarios por el JS inline y las expresiones de Lottie —, nosniff, anti-iframe,
  Referrer-Policy, Permissions-Policy). **La CSP no se puede probar en local**
  (el server local no manda cabeceras): tras publicar, abrir el sitio y verificar
  que el conejo reproduce; si algo falla, borrar la línea Content-Security-Policy.
- Cache de `foto-portada.jpg` bajado de 1 año a 1 día (para poder reemplazarla
  con el mismo nombre sin que los visitantes vean la vieja).
- Se borró CSS muerto (`.project*`, `.info-row*`, `.grid--2` en pagina.css;
  `fadeIn`, `--accent` en index.html) y se agregaron meta description + favicon
  SVG ("K" sobre negro, data URI) a las 4 páginas.

## Notas técnicas / gotchas

- El hero usa un motor de scroll manual (`actualizarHero()`): la foto crece de 56vh a
  100vh, se aclara y enfoca al bajar. No romper esa lógica al tocar la intro.
- Al volver desde subpáginas se usa `index.html#main` (clase `skip-intro`) para saltar
  el conejo sin flash blanco.
- Para previsualizar sin conejo: abrir `index.html`, dejar pasar la intro y hacer scroll,
  o usar el modo responsive del navegador (F12).
- **Edge headless tiene un piso de viewport (~492px)**: al sacar capturas con
  `--window-size=360` renderiza a ~492px y recorta la imagen. Eso da falsos "desbordes".
  Para verificar overflow real, medir `document.body.scrollWidth` vs viewport en la página.

## Preferencias del usuario

- Escribe en español; responder en español.
- Da reglas de diseño claras ("no serif", "centrado") — respetarlas por encima de
  propuestas propias.
- Él controla los commits/push.
