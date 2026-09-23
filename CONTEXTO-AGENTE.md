# Contexto para el agente — Portafolio BY KNOX

> Archivo de traspaso. Léelo antes de trabajar en este proyecto para no re-descubrir todo.
> Última actualización: 2026-09-22.

## Qué es

Portafolio personal de **Santiago Enciso** (marca **BY KNOX** / "Knox"), dirección
creativa (entornos visuales, físicos y audiovisuales). Sitio **estático**: HTML + CSS +
JavaScript, sin framework ni build. El logo/mascota es un **conejo** (animación Lottie).

## Ubicación y despliegue

- **Carpeta local:** `Documents\portafolio` (en el equipo del usuario)
- **Repo GitHub:** `https://github.com/lordfuze01/PORTAFOLIO-FINAL-FINAL.git` (rama `main`)
- **Hosting en vivo:** Cloudflare, proyecto **byknox** (config en `wrangler.jsonc`,
  sirve desde la raíz `"directory": "."`).
- **Publicar = `git push` a `main`.** Cloudflare redespliega solo. Editar en VS Code
  NO publica: hay que `git add -A` → `git commit -m "..."` → `git push`.
  **El usuario hace sus propios commits** (no commitear por él salvo que lo pida).

## Estructura de archivos

- `index.html` — intro del conejo (Lottie) + landing con scroll + manifiesto (incluye
  el "quién es Knox", ver más abajo) + sección de 3 disciplinas gigantes (`#roles`).
  El fondo cambia de color por sección al hacer scroll (`data-color`, ver "Quinta
  pasada"). **Todo el CSS y JS va inline en este archivo** (dentro de `<style>` y `<script>`).
- ~~`knox.html`~~ — retirada (2026-09-22), ver nota abajo.
- `trabajos.html` — índice de categorías (Gráfico/Estrategia/Audiovisual, ver nota abajo)
- `trabajos-grafico.html`, `trabajos-estrategia.html`, `trabajos-audiovisual.html` —
  **mosaico estilo gilhuybrecht.com** de cada categoría; al hacer clic el proyecto se
  abre encima (ver "Séptima pasada"). Las arma `mosaico.js` a partir de
  **`proyectos.js`: ahí vive la información y las fotos de cada proyecto, una sola
  vez** (instrucciones en su comentario de arriba).
- `especiferal.html`, `mordiendo.html`, `elsabio.html` — ya no tienen contenido:
  redirigen a `trabajos-<categoría>.html#<id>` para que los links viejos sigan
  funcionando. ~~`sidebar.js`~~ retirado.
- `contacto.html` — contacto (con línea de disponibilidad)
- `pagina.css` — estilos de las páginas internas (trabajos/contacto/proyectos)
- `menu.js` — comportamiento del menú lateral (compartido por todas las páginas internas)
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
- Auditoría de secretos (2026-07-10): cero claves/tokens en archivos e historial.
  El repo es PÚBLICO → se quitaron rutas locales con usuario (README, este
  archivo) y se des-rastreó `graphify-out/` (derivado, con rutas absolutas;
  sigue en disco y en `.gitignore`). Reglas `.env` listas en `.gitignore` y
  `.assetsignore`; no existe ningún .env porque el sitio no usa APIs.
- Se borró CSS muerto (`.project*`, `.info-row*`, `.grid--2` en pagina.css;
  `fadeIn`, `--accent` en index.html) y se agregaron meta description + favicon
  SVG ("K" sobre negro, data URI) a las 4 páginas.

### Mejoras UI/UX (2026-07-10, referencia podium.global / fromanother.love / Studio Namma) — HECHO
- **Footer "cierre" en index** (`<footer id="cierre">`): disponibilidad con punto
  que pulsa + eyebrow "¿Tienes una idea?" + CTA gigante "Hablemos →" (a contacto)
  + línea de servicios + correo/IG/ciudad + © . Filas con `data-cierre-fila` se
  revelan en cascada (GSAP + IntersectionObserver, patrón del manifiesto).
- **Disponibilidad** (`.status` / `.status__dot`): duplicada a propósito en
  index inline y pagina.css (como el CSS del menú). El punto es inline para que
  no flote al partirse el texto. También está en contacto.html.
- **Transición entre páginas**: `@view-transition { navigation: auto }` en ambos
  CSS (crossfade nativo; navegadores viejos lo ignoran; reduced-motion lo apaga).
- **Trabajos**: enlaces del índice activos hacia las páginas de detalle (se quitó
  el preventDefault); vista previa de cursor intacta. Cards en `grid--2`
  (cambiar a `grid--3` con el tercer proyecto).
- **Páginas de proyecto**: estructura lista sin fotos — galería con placeholders
  "Próximamente" (`.galeria__item`, la `--ancha` es 16:9), chips de fechas y
  herramientas, enlace "Siguiente proyecto" circular entre ambas.

### Bug del anillo azul en el menú lateral — CORREGIDO (2026-09-22)
Al abrir el panel (`abrirMenu()` en `menu.js`) el JS mueve el foco al primer
link (`primerLink.focus()`) para accesibilidad. El navegador a veces (no
siempre, por eso "a veces") dibujaba igual el anillo `:focus-visible` ahí
aunque el menú se hubiera abierto con clic de mouse — heurística
inconsistente entre navegadores para foco puesto por script.
Fix: `toggle` ahora distingue clic de mouse vs. teclado con
`MouseEvent.detail` (0 = teclado/Enter-Espacio, ≥1 = mouse) y se lo pasa a
`abrirMenu(porTeclado)`. Si fue por mouse, se agrega la clase
`sin-anillo-foco` al link antes de enfocarlo (se quita sola en su próximo
`blur`); esa clase tiene una regla `:focus-visible { outline: none; }` que
gana por especificidad. Si fue por teclado, foco normal con su anillo.
Regla duplicada como el resto del CSS del menú: en `pagina.css` y inline en
`index.html` (buscar `.sin-anillo-foco`).

El mismo problema aparecía también en el botón hamburguesa (`menuToggle`) al
**cerrar** el menú: `cerrarMenu()` hace `toggle.focus()` para devolver el
foco al botón, y si el cierre vino de un clic (en el botón o en el fondo
oscuro) pasaba lo mismo que con `primerLink`. Se extrajo la lógica a un
helper compartido `enfocarSegunOrigen(el, porTeclado)` que usan tanto
`abrirMenu()` como `cerrarMenu()`; ahora `cerrarMenu(porTeclado)` también
recibe ese booleano (`true` solo en el handler de `Escape`, `false` en el
clic del overlay, `e.detail === 0` en el clic del propio botón).

### Categorías de trabajos renombradas + fotos propias (2026-09-22) — HECHO
Se retiraron los nombres viejos de categoría (Visual, Industrial) y ahora son
**Gráfico, Estrategia, Audiovisual**. Los proyectos que ya estaban adentro de
cada página se quedaron donde estaban, solo bajo el nombre nuevo (decisión
explícita del usuario, no hubo reclasificación de proyectos):
- `trabajos-visual.html` → renombrado a **`trabajos-grafico.html`** (sigue
  con "Mordiendo el polvo").
- `trabajos-industrial.html` → renombrado a **`trabajos-audiovisual.html`**
  (sigue con "Especiferal" y "El sabio se parcha el bobo se estresa" — son
  proyectos de diseño industrial de contenido, el tag `.work__cat` de cada
  uno sigue diciendo "Industrial" porque describe la disciplina del proyecto,
  no la categoría de navegación).
- `trabajos-estrategia.html` no cambió de nombre de archivo ni de label.
- `trabajos.html` (el hero de 3 columnas) actualizado: labels, `href` a las
  páginas renombradas, y fotos de fondo reemplazadas — ya no son los
  placeholders de `imagenes/masonry/`.
- Fotos nuevas en `imagenes/grafico.jpg`, `imagenes/estrategia.jpg`,
  `imagenes/audiovisual.jpg` (venían en `FOTOS MASSONERY/` como
  `GRAFICO.png`, `ESTRATEGIA.jpeg`, `AUDIOVISUAL.jpeg`; se redimensionaron a
  máx. 2000px de lado largo y se recomprimieron a JPEG para no pesar tanto
  como los originales — el de Gráfico era un PNG de ~3800px/880KB, el de
  Audiovisual un JPEG de ~2650px/1.3MB; Estrategia ya venía liviano y se dejó
  prácticamente igual). Los originales siguen en `FOTOS MASSONERY/` sin
  tocar.
- `imagenes/grafico.jpg` (2026-09-22, segunda pasada): el PNG original es un
  mapa-infografía con harto margen negro alrededor y las 7 etiquetas
  (Alemania/Japón/Bosnia/Palestina/Congo/Ruanda/Vietnam) repartidas en todo
  el ancho — con `background-size:cover` centrado, la columna del hero (muy
  angosta y alta) terminaba mostrando sobre todo el negro vacío del medio.
  Se recortó a mano (no es un auto-trim, es una zona elegida a ojo) al
  cluster más denso — Alemania, Bosnia, Congo, Ruanda, Palestina, con sus
  líneas rojas de conexión — dejando fuera Japón y Vietnam (quedó un
  fragmento rojo sin texto de Vietnam en el borde derecho, se dejó así
  porque cortarlo más apretado partía el texto de "PALESTINA" a la mitad).
  Quedó casi cuadrado (~1900×1789, aspecto 1.06) en vez del 1.28 original,
  para que la columna angosta recorte menos. Si se quiere ajustar el
  encuadre de nuevo, el crop se hizo con PIL desde el PNG original en
  `FOTOS MASSONERY/GRAFICO.png`, caja `(530, 284, 2801, 2422)` en la imagen
  a resolución completa (3785×2958).
- No se reclasificó ningún proyecto entre categorías, solo se renombraron
  etiquetas/título/meta/URL de página. Si en algún momento se quiere que el
  contenido de cada categoría coincida temáticamente con su nombre nuevo
  (p. ej. mover Especiferal a Gráfico o crear proyectos audiovisuales
  reales), eso queda pendiente y hay que decidirlo con el usuario.

### Se retiró knox.html; manifiesto de la Home extendido + sección de roles (2026-09-22) — HECHO
El usuario sintió que `knox.html` ("¿Quién es Knox?") no aportaba ya que duplicaba
cosas que ahora también se cuentan en la Home. Se retiró la página completa y su
contenido/identidad se fusionó en el manifiesto de `index.html`:

- **Borrados:** `knox.html`, `knox-bunny.js`, `text-pressure.js` (ningún otro archivo
  los usaba — se confirmó con grep antes de borrar). El bloque CSS asociado
  (`.knox-hero`, `.text-pressure-*`, `.knox-bio*`, el `@font-face` de Roboto Flex que
  vivía ahí) se borró de `pagina.css` — era el último tramo del archivo.
- **Nav (las 9 páginas internas):** se quitó el item "Knox" del `menu-panel` en
  `index.html`, `trabajos.html`, `trabajos-grafico.html`, `trabajos-audiovisual.html`,
  `trabajos-estrategia.html`, `especiferal.html`, `mordiendo.html`, `elsabio.html` y
  `contacto.html`, y se renumeraron los que quedaron (Home 01, Trabajos 02, Contacto 03).
  Se hizo con un script que localiza el bloque `<li>` exacto — si se vuelve a tocar el
  nav a mano, ojo con mantener la numeración consistente en las 9 páginas.
- **Texto del manifiesto (`#intro` en `index.html`):** el título viejo ("Dirección
  creativa / para seres humanos.") se reemplazó por "Las mejores cosas siempre nacen
  de las mismas fuentes: la curiosidad y la observación." El `<p class="intro__lead">`
  único de 5 líneas se volvió **3 párrafos separados** (cada uno su propio `<p
  class="intro__lead">`): identidad de Knox/Santiago, disciplinas + la pregunta
  "¿esto se siente humano?", y el cierre "la tecnología acelera; las personas dan el
  sentido" (esa última línea es la original, se conservó porque seguía funcionando).
  Esto es justamente el "quién es Knox" que vivía en la página retirada.
- **Ojo con el revelado GSAP:** el manifiesto pasó de ~7 líneas a 15 (título + 3
  párrafos). El observer viejo disparaba TODAS las líneas de una vez cuando `#intro`
  entraba en pantalla — con la sección ahora más alta que 100vh eso significaba que
  los párrafos de abajo ya estaban revelados antes de que el usuario llegara a leerlos.
  Se cambió a que **cada bloque** (`.intro__title`, cada `.intro__lead`, el
  `.flow-menu`) tenga su propio `IntersectionObserver` y se revele por separado al
  entrar — buscar el comentario "REVELADO DEL MANIFIESTO" en el script de `index.html`.
- **Sección nueva `#roles`** (después de `#intro`, antes de `#behance`): 3 filas con un
  titular gigante cada una — **Service Designer / Filmmaker / Realizador gráfico** —,
  inspirada en el scroll de `russellnumo.nl` que el usuario mostró como referencia.
  Tipografía: **Roboto Flex Variable** (la misma fuente autohospedada que usaba
  `knox.html`, sigue en `lib/roboto-flex-variable.woff2`) en `wght 950 / wdth 70`
  —negrilla máxima y bien condensada, para imitar una tipografía alta tipo Aalto sin
  sumar una fuente nueva—, mayúsculas, `clamp(2.6rem, 11vw, 8rem)`. El `@font-face` se
  volvió a declarar (ahora dentro de `index.html`, ya no en `pagina.css`).
  Animación: cada fila revela su `.line` al entrar en pantalla (mismo patrón que el
  manifiesto) y además **opacidad/escala responden en vivo al scroll**
  (`actualizarRoles()`, mismo espíritu que `actualizarHero()`): la fila centrada se ve
  grande y nítida, las vecinas se achican y apagan. Respeta `prefers-reduced-motion`.
- **Docs actualizados** para que no quedaran mintiendo sobre `knox.html`: `PRODUCT.md`,
  `README.md`, `.impeccable/design.json` (la entrada de tipografía "pressure" se marcó
  retirada y se agregó una entrada "roles" nueva). **`DESIGN.md` quedó con varias
  menciones viejas de `knox.html`/el marco "Detrás de Knox" sin actualizar** (son parte
  de la explicación del sistema tipográfico/espaciado, no solo una lista de archivos;
  no se tocó por alcance/tiempo) — pendiente si se vuelve a trabajar en ese doc.
- Las páginas de detalle de proyecto (`especiferal.html`, `mordiendo.html`,
  `elsabio.html`) NO se tocaron más allá del nav — sus contenidos siguen intactos.

### Segunda pasada del mismo día: se quitó la bio, el titular va a todo el ancho,
### `#roles` pasó a marquee horizontal (2026-09-22) — HECHO
El usuario vio la primera versión y pidió tres cambios puntuales:

1. **Se quitaron los 3 párrafos** que se habían agregado bajo el título del
   manifiesto (la bio de Knox/Santiago). `#intro` ahora solo tiene el `<h2
   class="intro__title">` ("Las mejores cosas siempre nacen de las mismas
   fuentes: la curiosidad y la observación.") — nada más.
2. **El título ahora ocupa todo el ancho de la pantalla**, no una columna
   centrada de 1000px: se quitó `max-width:1000px` de `.intro` y se subió el
   tamaño de `.intro__title` a `clamp(2.2rem, 9vw, 7.5rem)` (antes tope
   4.2rem). Sigue centrado (`text-align:center`), solo que ahora usa todo el
   ancho disponible en vez de una columna angosta.
3. **El flow-menu (Ver trabajos / Contacto) se movió** de adentro de
   `#intro` a vivir suelto en `<main>`, justo antes de `<section
   class="behance">` ("Fragmentos del trabajo"). El JS que lo mide/ensancha
   (`ajustarAnchoCompleto` en el bloque "FLOWING MENU") no necesitó cambios
   -- mide su propio offset contra el viewport, no depende de quien sea su
   padre. Lo que sí cambió: el revelado-al-entrar del flow-menu vivía
   colgado del observer de `#intro`; ahora tiene el suyo propio, buscando el
   elemento por `id="flowMenu"` directo en `document` (ya no
   `intro.querySelector('.flow-menu')`, porque ya no es hijo de `#intro`).

Además, **`#roles` se rediseñó por completo**: el usuario mandó el link
`https://www.russellnumo.nl` como referencia y, más importante, pegó el
código fuente real del componente **`ScrollVelocity`** de React Bits (usa
`motion/react` — Framer Motion). Como este sitio es vanilla sin build, se
portó el comportamiento a mano (no el código):

- Cada una de las 3 filas (**Service Designer / Filmmaker / Realizador
  gráfico**) ahora es un **marquee horizontal infinito**: el HTML trae UNA
  sola copia del texto (`.roles__row > .roles__track > .roles__text`); el JS
  clona copias hasta cubrir ~2.5x el ancho de la fila (mismo patrón
  `completarCopias`/`calcularRepeticiones` que ya usaba el flow-menu para su
  marquee de hover) y las mueve con `translateX` en un loop `requestAnimationFrame`.
- **Filas alternas van en direcciones opuestas** (fila par arriba/abajo,
  impar al revés — igual que `index % 2 !== 0 ? -velocity : velocity` en el
  componente original).
- **La velocidad reacciona al scroll**: se mide `window.scrollY` cada frame,
  se saca velocidad instantánea (px/s), se suaviza con `lerp` (no hay spring
  de Framer Motion, se aproxima con suavizado exponencial simple) y ese
  valor amplifica cuánto se mueve cada fila ese frame. La DIRECCIÓN del
  scroll (subir/bajar) decide hacia dónde arrastran TODAS las filas (su
  signo base por fila se mantiene, así que siguen alternándose entre sí).
  En reposo (sin scroll) igual hay una deriva base constante — nunca se
  quedan quietas del todo. Toda la lógica está en el bloque "ROLES:" del
  script, función `frame()`.
- **Foto fija al centro** (`.roles__portrait`, position:absolute,
  50%/50%), por ENCIMA de las 3 franjas (tapa lo que quede detrás en esa
  zona — es el efecto que pidió el usuario: "en el centro hay una imagen").
  Hoy usa `foto-portada.jpg` como placeholder (la misma foto del hero) con
  alt "Santiago Enciso — Knox"; está marcado con un comentario `>>> LA FOTO`
  en el HTML para cambiarla fácil el día que haya una mejor.
- `.roles` ahora tiene `min-height:64vh` propio (antes cada fila tenía
  62vh): sin eso, con el texto quitado y el layout mucho más compacto, la
  sección quedaba más baja que la foto centrada y esta se salía por
  arriba/abajo.
- `prefers-reduced-motion`: no se arma el marquee (nunca se clona ni se
  corre el rAF) — queda una sola copia de cada texto, centrada y quieta
  (`.roles__row{justify-content:center}` es el default en CSS; la clase
  `.is-animated` que cambia a `justify-content:flex-start` y agrega el
  separador "—" entre copias solo la pone el JS cuando SÍ va a animar).
- El fade de entrada de toda la sección (`opacity 0→1` al hacer scroll hasta
  ahí) también lo pone el JS con estilo inline, nunca como default en CSS:
  así, si el script no llega a correr, la sección se ve completa de una vez
  en vez de quedar invisible para siempre.

### Tercera pasada del mismo día: corregir el titular y arreglar el trastabilleo
### del marquee de "roles" (2026-09-22) — HECHO
El usuario vio la segunda versión y señaló dos cosas puntuales:

1. **Había entendido mal "aprovecha el espacio" en el titular de `#intro`**:
   no pedía letra más grande, pedía que cupieran más palabras por línea a
   **el mismo tamaño de letra original**. Se revirtió `.intro__title` a
   `clamp(1.1rem, 5.3vw, 4.2rem)` (el tamaño de antes de esta sesión, no el
   `7.5rem` que se había subido) y las 3 líneas cortas se juntaron en 2
   líneas más largas: "Las mejores cosas siempre nacen de las mismas
   fuentes:" / "la curiosidad y la observación." — así cada `.line` sí llena
   más del ancho disponible, sin agrandar la tipografía.
2. **El marquee de `#roles` se sentía trabado al hacer scroll.** Causa real:
   la primera versión leía `offsetWidth` de cada fila DENTRO del loop de
   `requestAnimationFrame` en cada frame, para mover el texto a mano con
   `translateX` — eso fuerza un recálculo de layout (forced reflow) del
   navegador constantemente, que es justo lo que se sentía como
   trastabilleo. Se rediseñó para separar dos cosas:
   - El movimiento BASE ahora es una animación **CSS nativa** (`@keyframes
     roles-marquee`, con `--part-width`/`--marquee-duration` igual que el
     marquee de hover del flow-menu, que ya corría suave) — vive en el
     compositor del navegador, no en el hilo principal, así que no le afecta
     nada de lo que haga el JS.
   - El scroll YA NO mueve `translateX` a mano: solo ajusta
     `animation.playbackRate` (Web Animations API, `track.getAnimations()`)
     de cada fila, cacheando la referencia a la animación una sola vez. Cero
     lecturas de layout dentro del loop de scroll.
   - La alternancia de dirección entre filas la resuelve el CSS
     (`animation-direction: reverse` en la fila `nth-child(2n)`, o sea la
     del medio); el JS ya no necesita saber la dirección de cada fila, solo
     aplica el mismo `playbackRate` (con signo) a las 3 — como cada una ya
     arranca en su propia dirección por CSS, el mismo signo las invierte a
     las 3 juntas cuando cambia la dirección del scroll, y conserva la
     alternancia entre ellas.
   - De paso se agregó un re-medido en `document.fonts.ready` (ademas del de
     `resize`): si `Roboto Flex Variable` (font-display:swap) todavía no
     había cargado al medir por primera vez, las filas podían quedar con
     menos copias de las necesarias y salir huecos en el loop una vez
     cargaba la fuente real.
3. **Se quitó la foto del centro** (`.roles__portrait`, HTML y CSS
   borrados) — el usuario dijo "si quieres" quitarla, y a la vez pidió subir
   el tamaño del texto de las 3 filas, así que se hizo lo segundo aprovechando
   el espacio que dejaba la foto: `.roles__text` pasó de
   `clamp(2.4rem, 9vw, 6.5rem)` a `clamp(3rem, 12vw, 9.5rem)`. Si en algún
   momento se quiere una foto ahí de nuevo, tocaría resolver primero cómo se
   ve sin que tape tanto texto ahora que las letras son más grandes.

### Cuarta pasada: espacio vacío del titular, el marquee no se movía,
### quitar separadores (2026-09-22) — HECHO
Después de la tercera pasada el usuario probó en el navegador y reportó 3 cosas:

1. **Mucho espacio vacío (marrón) arriba y abajo del titular de `#intro`.**
   `.intro` seguía con `min-height:100vh/100dvh` de cuando la sección tenía
   el manifiesto completo + el flow-menu adentro; con solo 2 líneas de
   título eso dejaba media pantalla vacía arriba y abajo. Se quitó el
   `min-height` (la sección ahora se ajusta a su contenido) y se bajó el
   `padding` de `clamp(5rem,14vh,10rem)/clamp(3rem,8vh,5rem)` a
   `clamp(3.5rem,10vh,6rem)` simétrico.
2. **El marquee de `#roles` no se movía nada — bug real, no de percepción.**
   Causa: `#home` (todo el contenido de la home) arranca en `display:none`
   mientras corre la intro del conejo (ver "FLOWING MENU" mas abajo en este
   mismo doc / el comentario `#home pasa de display:none a block` en el
   script). El script de `#roles` corre ANTES de eso, así que la primera
   vez que `medir()` leía `original.offsetWidth` daba **0** (todo dentro de
   un `display:none` mide 0) — `medir()` se salía sin fijar
   `--part-width` ni clonar copias, y el `@keyframes` quedaba animando
   hacia `translateX(0px)`, es decir: sin movimiento visible, para siempre
   (nunca se volvía a medir). El flow-menu ya tenía resuelto este mismo
   problema con un `ResizeObserver` sobre `#home` que reintenta
   `calcularRepeticiones()` en el momento exacto en que deja de estar
   oculto -- se copió el mismo patrón para `#roles` (bloque "ROLES:" en el
   script, busca `new ResizeObserver` justo después del listener de
   `resize`). **Si se toca esta sección de nuevo: cualquier medición de
   `offsetWidth`/`getBoundingClientRect` que dependa del layout real
   necesita este mismo seguro, o corre el riesgo de medir 0 mientras el
   conejo todavía está en pantalla.**
3. **Se quitaron los separadores "—" color marrón** entre copias repetidas
   del texto (`.roles__text::after`, borrado por completo) — ahora cada
   franja repite la frase pegada a sí misma (solo el padding de
   `.roles__text` como espacio), infinite scroll liso sin decoración extra.

### Quinta pasada: colores al hacer scroll + letras que se deslizan (2026-09-22) — HECHO
El usuario volvió a mandar `https://www.russellnumo.nl` pidiendo "las letras en slides"
y "los cambios de color cuando haces scroll" en la home. Se leyó el código real de la
referencia (Next.js + Framer Motion + GSAP SplitText): el body pasa de `#ffffff` a
`#0e0e0e` con `useScroll`/`useTransform` (offset `["start end","start start"]`,
tramo `[0, 0.5]`) al acercarse el footer; los párrafos suben línea a línea desde una
máscara; la cita enciende sus palabras (opacidad 0.1→1) amarrada al scroll; el hero son
3 franjas de texto alto y angosto (fuente Humane) en marquee. Se portó a vanilla:

- **COLOR POR SECCION** (script en `index.html`, justo después del motor del hero):
  cada parte de `#home` trae `data-color="taupe|arena|indigo"` → hero taupe, `#intro` +
  `#roles` + `#flowMenu` arena, `#behance` indigo, `#cierre` taupe. El fondo del
  `<body>` y del `<html>` se mezcla de un capítulo al siguiente mientras el borde
  superior de la sección va del 100% al 50% de la pantalla (mezcla "en luz", raíz de
  cuadrados, como Framer). Las secciones y `.home` ya **no tienen fondo propio**
  (`background: transparent`); sin JS todo queda taupe como antes. La paleta vive en
  `PALETA` dentro del script. Posiciones medidas solo en resize/ResizeObserver/fonts;
  en el scroll solo se lee `scrollY` (sin lecturas de layout por frame). También
  actualiza `<meta name="theme-color">`.
- **Tinta por luminancia, no por sección:** `#home[data-tema="claro"]` invierte
  `--bone` (pasa a taupe), `--ash`, `--line` y `--bg-final`. El tema se elige por la
  luminancia real del fondo (`LUZ_CRUCE = 0.18`, donde arena y taupe dan el mismo
  contraste ~3.7:1). Primero se probó cambiar al 50% de la mezcla y "Ver trabajos /
  Contacto" quedaba claro sobre gris claro justo cuando estaba centrado. Reglas
  relacionadas: `.lightbox` fuerza sus variables oscuras; sobre indigo `--ash` sube a
  #B1A6A0 (el #8C7C73 daba ~3.3:1); transiciones de color 0.5s en los textos.
- **Botón del menú movido** fuera de `.hero__head` a hijo directo de `#home`. Bug
  previo confirmado con `elementFromPoint`: dentro del hero quedaba en la capa del
  sticky y lo tapaban la foto, el flow-menu y la galería (no se podía clicar en casi
  toda la home). Su icono sigue a `--bone`; abierto va siempre en arena (queda sobre el
  panel oscuro).
- **Manifiesto:** las palabras del titular se "encienden" con el scroll (opacidad
  0.18→1 en ola, fórmula de la referencia). Las envuelve el JS en `.palabra` — el HTML
  se edita igual que antes. Convive con el revelado por líneas.
- **#roles más parecido a la referencia:** Roboto Flex en `wght 880 / wdth 25 / opsz
  144`, `clamp(3.6rem, 17vw, 15rem)`, `line-height .92`, **letter-spacing +0.02em** (con
  tracking negativo las letras se montaban y dejaban rayitas claras entre glifos),
  `padding-top .1em` (la tilde de la Á de "gráfico" se cortaba por el
  `overflow:hidden` de la fila), `gap: 0`. Entrada: cada franja se destapa con
  `clip-path` + `y` en cascada (GSAP). Con el cursor encima la franja casi se detiene
  (`LENTO_HOVER`). Quieta (reduced-motion): el texto se parte en 2 líneas en vez de
  cortarse.
- **"Fragmentos del trabajo" y "Hablemos →"** ahora suben desde una máscara `.line`
  al entrar (además de la cascada de filas que ya tenían).
- Verificado con capturas (Playwright, 1440×900 y 390×844): transiciones, menú visible
  en todas las alturas, sin overflow horizontal, sin errores de consola, flujo con
  conejo y con `#main`, y `prefers-reduced-motion`.

### Sexta pasada: solo marrón y blanco + proyectos estilo Gil Huybrecht (2026-09-22) — HECHO
El usuario vio la quinta pasada y dijo: "hay muchos cambios de color, dejémoslo solo
marrón y blanco, que el marrón vaya hasta el 'las mejores… curiosidad y observación' y
ahí empiece a cambiar", y mandó `https://gilhuybrecht.com` para la forma de mostrar los
proyectos dentro de Trabajos: "el proyecto se muestra a la derecha cuando lo abres y a
la izquierda la información".

- **Home, dos colores:** `#hero` e `#intro` en `data-color="taupe"`; `#roles`,
  `#flowMenu`, `#behance` y `#cierre` en `arena`. Se quitó el indigo de `PALETA` y su
  regla de `--ash`. El tramo del cambio ahora es configurable (`EMPIEZA = 0.6`,
  `TERMINA = 0.1`: posición del borde superior de la sección nueva en fracción de la
  pantalla); con el cambio en las franjas, el manifiesto se lee entero sobre marrón y
  el blanco entra cuando sus palabras terminan de encenderse. **Decisión propia:** el
  cierre se quedó en blanco (un solo cambio en toda la home); si el usuario quiere que
  vuelva a marrón al final como el footer de Russell, es poner `data-color="taupe"` en
  `#cierre`.
- **Cosas que había que aclarar por estar ahora sobre arena:** el botón specular de
  Behance (texto y anillo de respaldo en taupe con `.home[data-tema="claro"]`; el
  brillo WebGL lee el tema cada frame y usa `lineColorClaro`/`baseColorClaro`), el
  hover de los datos del cierre (a `--accent`, antes aclaraba a #F6F4F3) y el pie
  legal (a `--ash`).
- **Vista de proyecto (Gil Huybrecht):** se estudió la referencia con capturas: al abrir
  un proyecto, columna izquierda fija con nombre, descripción, ficha numerada
  (1 Dev / 2 Client / 3 Agency / 4 Year) y "Back"; columna derecha con las imágenes
  apiladas; en móvil se apila. Se portó a las 3 páginas de proyecto:
  `<body class="proyecto-pagina">` + `<main class="proyecto">` con
  `aside.proyecto__info` (sticky bajo el header, `--alto-header: calc(4.32rem + 1px)`,
  ficha 01 Fecha · 02 Herramientas · 03 Proceso · 04 Producto final, "← Volver" al pie)
  y `div.proyecto__media` (fotos a todo el ancho con su proporción real, un bloque
  "Próximamente", y el `.next` "Siguiente proyecto" al final). Al abrir, la columna de
  fotos se destapa de derecha a izquierda (`clip-path`) y las fotos se asientan
  (zoom 1.06→1); la info entra con `.reveal`. Todo CSS, sin JS nuevo. Con el crossfade
  de `@view-transition` que ya existía, abrir un proyecto desde la lista se ve como el
  "open" de la referencia.
- Los datos de cada ficha son **los mismos que ya tenían las páginas** (chips, eyebrow,
  concepto); no se inventó nada. El sabio sigue en "Próximamente" (PRODUCT.md prohíbe
  rellenarlo sin el usuario).
- Fotos: Mordiendo usa `foto-portada.jpg`; Especiferal ahora muestra
  `imagenes/especiferal-hover.jpg` (su imagen de la lista; antes su galería estaba
  toda en placeholders); El sabio usa `imagenes/elsabio.jpg`, **nuevo**: el original
  `EL SABIO SE PARCHA EL BOBO SE ESTRESA HOVER.png` completo (1305×585, sin el recorte
  4:3 del hover), exportado a JPEG q86 (101 KB).
- **Retirados:** el riel lateral de secciones (`.line-sidebar`, `.page-body`,
  `.page-content`), la galería vieja (`.galeria*`) y `sidebar.js` (ningún otro archivo
  lo usaba). Las listas por categoría (`trabajos-*.html`) no cambiaron.
- Verificado con capturas (1440×900 y 390×844): sin overflow horizontal ni errores de
  consola; secuencia de apertura desde `trabajos-grafico.html` revisada cuadro a cuadro.

### Séptima pasada: Trabajos copiando el mosaico de Gil Huybrecht (2026-09-23) — HECHO
El usuario pidió: "hacer mis trabajos igual a la de Gil, que dentro de cada categoría se
muestre el mosaico gigante y cuando lo clickeas funcione como la de él, literal
copiarlo exacto". Se estudió la referencia a fondo (medidas con `getComputedStyle`,
video de Playwright cuadro a cuadro de la entrada, hover, apertura, enfoque y cierre).
Gil dibuja las imágenes en WebGL (canvas fijo) usando elementos vacíos del DOM como
posiciones; aquí se reprodujo el mismo comportamiento con HTML + CSS + GSAP core, con
el contenido y la marca del usuario (no el código, la fuente ni las imágenes de Gil).

- **Datos:** `proyectos.js` (nuevo) define cada proyecto una vez: `id`, `categoria`
  (`grafico`/`estrategia`/`audiovisual`), `nombre`, `tipo`, `descripcion`, `ficha`
  (pares dato/valor; "Próximamente" sale en gris) y `fotos` (`src`, `ancho`, `alto`,
  `alt`). Mismos datos que ya tenían las páginas; no se inventó nada ni se asignaron
  fotos nuevas a proyectos (PRODUCT.md lo prohíbe): hoy hay 1 foto por proyecto.
- **Páginas de categoría** (`<body class="mosaico-pagina" data-categoria="...">`):
  cabecera de columnas chicas como la de Gil (KNOX · Disponible para proyectos ·
  Servicios · lista de proyectos de la categoría · Behance · Escríbeme), el mosaico,
  la pastilla de abajo (en Gil es "Grid | Gallery"; aquí cambia de categoría), el
  contenedor `#vista` y el cursor con etiqueta. Sin footer (Gil no tiene).
- **Mosaico** (medidas de Gil a 1440px): 14 columnas, cada foto ocupa 2 (7 por fila),
  gap ~0.94vw, 72px entre filas, arranca al 31.25vw; rótulo con el nombre del proyecto
  sobre su primera foto y el número 1, 2, 3… a la derecha. `subgrid` alinea rótulos
  e imágenes de una fila aunque un nombre se parta en dos líneas. Hover: el proyecto
  queda entero y los demás al 20%. En <650px: 4 columnas, 2 fotos por fila, solo las
  dos primeras fotos de cada proyecto y una fila por proyecto (como Gil en móvil).
- **Abrir** (clic en una foto o en su nombre de la cabecera): las fotos del proyecto
  vuelan del mosaico a la columna derecha con giro 3D (`volar()`: left/top/ancho/alto
  con `expo.inOut` + rotationX/Y a mitad de camino), el mosaico queda al 15%, la
  cabecera y la pastilla se esconden y la info sube línea a línea a la izquierda
  (descripción partida en líneas reales). Info en 5/14 columnas, fotos en 9/14 con
  scroll propio (la rueda sobre la info también las mueve). Ficha con la pastilla de
  resaltado que sigue a la fila bajo el cursor.
- **Cursor con etiqueta** (solo mouse): "Volver" sobre la info (clic = cerrar, como el
  "Back" de Gil, que es una etiqueta de cursor), "Ampliar" sobre una foto (clic = la
  foto vuela sola al centro, "Cerrar" para devolverla). Esc cierra; el botón
  `.vista__volver` queda para teclado y en móvil es la pastilla "Volver" abajo.
- **Dirección:** abrir hace `pushState` a `#id`; cerrar hace `history.back()` (o
  `replaceState` si se llegó con el link directo); atrás/adelante del navegador
  cierran/abren. Llegar con `#id` abre directo sin cargador ni vuelo.
- **Entrada:** cargador 0%→100% al centro solo la primera vez por sesión
  (`sessionStorage 'knox-mosaico'`; lo prende un script en el `<head>` con la clase
  `mz-cargando` y el CSS lo desvanece solo a los 7s si el JS fallara), luego el
  mosaico sube en ola desde abajo y los textos de la cabecera suben de su máscara.
- **No se copió:** el modo "Gallery" (diagonal de portadas) ni "Star Wars" (easter egg
  de Gil con temática de Star Wars).
- **Retirado:** la vista dividida por página de la sexta pasada (`.proyecto*`), el
  índice de texto con vista previa al cursor (`.work*`), la ficha "Sobre los
  proyectos" (`.ficha*`), `.next` y `.chips`.
- Verificado con Playwright (1440×900 y 390×844): vuelos, enfoque, cierre, teclado
  (Enter abre, Esc cierra, foco vuelve a la foto), atrás/adelante, redirecciones,
  categoría vacía, "menos movimiento", sin overflow ni errores de consola.

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

- Escribe en español; responder en español. El SITIO está en inglés desde 2026-09-23.
- Da reglas de diseño claras ("no serif", "centrado") — respetarlas por encima de
  propuestas propias.
- Normalmente él controla los commits/push; el 2026-09-23 pidió explícitamente commit + push.

### Octava pasada: sitio en inglés + barra de vidrio en Trabajos + proyectos nuevos (2026-09-23) — HECHO
Pedido del usuario: pasar todo el sitio a inglés, nota grunge en el conejo, su nombre
bajo BY KNOX, mover el manifiesto, renombrar "Fragmentos", rehacer la barra superior
de Trabajos y sumar proyectos.

- **Idioma:** todo el texto visible, `lang`, títulos, descripciones, aria-labels y
  textos de JS (menu.js, mosaico.js, proyectos.js) en inglés. Los comentarios del
  código siguen en español (son para el usuario). "Realizador gráfico" → "Graphic
  Designer"; menú: Home / Work / Contact.
- **Conejo:** nota abajo "this loading screen doesn't serve any functional purpose.
  it just looks neat. / ft. knox" en Special Elite (`lib/special-elite.woff2`, Apache
  2.0, alojada local por la CSP) + filtro SVG `#tintaSucia` que corre y mancha la
  tinta. Entra con `steps(4)` y se va con el conejo. El conejo se queda grande 1.5s
  (antes 0.9) para que alcance a leerse.
- **Hero:** `p.home__name` "Santiago Enciso Ballesta" bajo el wordmark; misma entrada
  (sube + aparece) 0.3s después.
- **Orden de la home:** hero → roles → manifiesto → flow-menu → galería → cierre.
  `#roles` pasó a `taupe` para mantener la regla de un solo cambio de color (marrón
  hasta el manifiesto, blanco después).
- **Galería:** "Fragmentos del trabajo" → "Finger on the shutter".
- **Trabajos (categorías):** la cabecera de columnas estilo Gil se reemplazó por una
  barra fija: KNOX a la izquierda, pastilla "liquid glass" centrada (`.mc-areas`:
  backdrop blur+saturate, filo de luz, sombra) con Graphic / Strategy / Audiovisual y
  un "lente" (`.mc-areas__lente`) que se desliza con rebote a la área bajo el cursor
  (lo mueve mosaico.js, sección 4); menú a la derecha. Se quitó la pastilla de abajo
  (`.mosaico-barra`) y el mosaico arranca más arriba (14vw). En móvil la pastilla va
  en su propia fila bajo KNOX.
- **Proyectos:** Graphic: Galopea Visual Identity, Monchispets Creative Direction.
  Strategy: SIICOR 2 Renewal, Unlock Your Wings. Audiovisual: Mordiendo el polvo
  (movido desde Graphic; `mordiendo.html` redirige ahí), I Don't Like Sand,
  Especiferal, El sabio. Los nuevos no tienen datos ni fotos: todo "Coming soon".
- **Proyecto sin fotos:** `fotos: []` pinta una casilla rayada "Coming soon" que se
  puede abrir (no se amplía).
- **Video:** campo `video` en proyectos.js (link de YouTube o Vimeo) → iframe 16:9
  arriba de las fotos (youtube-nocookie / player.vimeo). Si no hay fotos, la casilla
  del mosaico vuela directo al video. `_headers`: la CSP ahora tiene `frame-src` para
  esos dos dominios.
- Verificado con Playwright (1440×900 y 390×844): sin errores de consola ni overflow;
  video probado con un link de prueba (no quedó en el repo).

### Novena pasada: fuera el liquid glass (2026-09-23) — HECHO
El usuario: "la barra de liquid glass no me convence, mira toda la identidad de la
página y haz una que sí vaya acorde", y en las franjas dejar solo "Graphic".
- Franja 3 de #roles: "Graphic Designer" → "Graphic".
- La cabecera de las categorías ahora es la misma barra de `.site-header` (taupe al
  72%, blur, hairline abajo, KNOX en 800 / 0.18em). Las áreas van numeradas como el
  menú lateral (01 / 02 / 03; el número del área actual en el acento #788F98), en
  mayúsculas 0.78rem / 700 / 0.18em. Hover: el texto rueda hacia arriba desde su
  máscara (`.mc-areas__rollo`, copia por `::after` con `data-t`). Una hairline
  (`.mc-areas__linea`) se desliza bajo el área con el cursor y vuelve a la actual,
  pegada al borde de la barra. En móvil las áreas bajan a su fila, sin números.
- (misma fecha) `.home__name` alineado con la tinta de BY KNOX: `padding-left:
  calc(tamaño del wordmark * 0.066 - 0.02em)` (el margen interno de la "B" gigante).
  El tamaño del wordmark vive en `--word-size` dentro de `.home__word`; si se cambia,
  cambiar también el clamp del padding del nombre.
