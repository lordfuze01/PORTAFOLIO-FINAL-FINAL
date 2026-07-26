# Sidebar de navegación en proyectos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar una sidebar de navegación (puerto vanilla del componente React
`LineSidebar` que trajo el usuario) a las 3 páginas de proyecto
(`especiferal.html`, `mordiendo.html`, `elsabio.html`), reestructurando cada
página en 5 secciones ancladas: Concepto, Proceso, Herramientas, Producto
final, Galería.

**Architecture:** CSS compartido nuevo en `pagina.css` (`.page-body`,
`.page-content`, `.line-sidebar*`) y un archivo `sidebar.js` nuevo (IIFE
autocontenida, sin dependencias) cargado igual en las 3 páginas — mismo
criterio que `menu.js`, evita triplicar ~120 líneas de comportamiento
idéntico. El efecto de proximidad al cursor se calcula con un loop
`requestAnimationFrame` y suavizado exponencial (mismo algoritmo que el
componente de referencia), sin GSAP: la librería local solo trae el core
(sin ScrollTrigger) y este efecto no lo necesita. El scroll-spy usa
`IntersectionObserver`. El scroll suave al hacer click reutiliza
`html { scroll-behavior: smooth }`, ya global en `pagina.css` (con su propio
fallback a `auto` bajo `prefers-reduced-motion`), así que los links de la
sidebar son anchors `<a href="#seccion">` normales — funcionan incluso si
`sidebar.js` no carga.

**Tech Stack:** HTML/CSS/JS vanilla, sin build, sin dependencias nuevas.
Verificación con Playwright (Chromium headless) contra un server estático
local — no se agrega como dependencia del proyecto, se instala de forma
efímera en un directorio temporal para cada verificación (el sitio sigue sin
test runner ni `package.json`).

## Global Constraints

- Sitio estático, sin build ni framework (HTML/CSS/JS planos).
- Sin tipografías serif; `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif`.
- 5 secciones fijas, mismo orden en las 3 páginas: **Concepto (01), Proceso
  (02), Herramientas (03), Producto final (04), Galería (05)** — ids
  `concepto`, `proceso`, `herramientas`, `producto-final`, `galeria`.
- Breakpoint mobile: `820px` (mismo que ya usa `pagina.css` para
  `.galeria--2` / `.grid--2` / `.grid--3`).
- `prefers-reduced-motion: reduce`: sin loop de proximidad ni desplazamiento
  — el item activo se marca solo con `aria-current` + color fijo por CSS.
- No inventar copy real de los proyectos. Texto nuevo = placeholder corto
  ("Próximamente...") + comentario `>>> EDITA AQUI` (mismo patrón que ya usa
  el sitio en la galería de cada proyecto).
- CSS compartido en `pagina.css`, comportamiento compartido en `sidebar.js`
  nuevo — no duplicar código en cada HTML.
- **No hacer `git commit` en ningún paso.** El usuario lleva sus propios
  commits (`CONTEXTO-AGENTE.md`: "El usuario hace sus propios commits").
  Cada tarea termina dejando los archivos modificados sin commitear.
- Spec de referencia:
  `docs/superpowers/specs/2026-07-26-sidebar-proyecto-design.md`.

---

### Task 1: CSS + `sidebar.js` + montaje completo en `especiferal.html`

Esta tarea construye el mecanismo completo (CSS compartido + comportamiento)
y lo verifica de punta a punta en una sola página. Las Tasks 2 y 3 repiten
la misma estructura HTML en las otras 2 páginas, reutilizando este CSS/JS
sin cambios.

**Files:**
- Modify: `pagina.css` (agregar bloque nuevo al final del archivo)
- Create: `sidebar.js`
- Modify: `especiferal.html` (reestructurar `<main class="page">`, agregar
  `<script src="./sidebar.js">`)

**Interfaces:**
- Produces (consumido igual por Task 2 y 3): clases CSS `.page-body`,
  `.page-content`, `.line-sidebar`, `.line-sidebar__list`,
  `.line-sidebar__item`, `.line-sidebar__link`, `.line-sidebar__marker`,
  `.line-sidebar__index`, `.line-sidebar__text`,
  `.line-sidebar__item[aria-current="true"]`. Variable CSS
  `--header-height` (seteada por `sidebar.js` en `:root`, usada por
  `scroll-margin-top`).
- Produces: `sidebar.js`, IIFE que se auto-ejecuta al cargar. Requiere que
  el HTML tenga: `.site-header` (para medir su alto), `.page-body` con un
  `.line-sidebar` (con `.line-sidebar__item > .line-sidebar__link[href^="#..."]`
  dentro) y `.page-content > section[id]` con un `id` igual al `href` de
  cada link, en el mismo orden.
- Consumes: variables ya existentes en `pagina.css` (`--bone`, `--ash`,
  `--muted`, `--line`) y clases ya existentes (`.site-header`, `.page`,
  `.chips`, `.chip`, `.galeria`, `.galeria--2`, `.galeria__item`,
  `.divider`, `.next`) — sin modificarlas.

- [ ] **Step 1: Escribir el script de verificación (Playwright)**

Crear el archivo `verify-sidebar.mjs` en un directorio temporal (fuera del
repo, para no dejar basura):

```bash
VERIFY_DIR=$(mktemp -d)
echo "VERIFY_DIR=$VERIFY_DIR"
```

Guardar en `"$VERIFY_DIR/verify-sidebar.mjs"` este contenido (verifica
`especiferal.html`; Task 2/3 reutilizan el mismo archivo cambiando la URL y
las aserciones de contenido):

```javascript
import { chromium } from 'playwright';

const PAGE_URL = process.argv[2] || 'http://localhost:8123/especiferal.html';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (msg) => { if (msg.type() === 'error') errors.push('console: ' + msg.text()); });

await page.goto(PAGE_URL, { waitUntil: 'load' });
await page.waitForTimeout(300);

// 1. Los 5 items existen, en el orden correcto, apuntando a las secciones correctas.
const labels = await page.locator('.line-sidebar__text').allInnerTexts();
console.log('items sidebar:', labels);
const hrefs = await page.locator('.line-sidebar__link').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
console.log('hrefs:', hrefs);
const expected = ['#concepto', '#proceso', '#herramientas', '#producto-final', '#galeria'];
console.log('hrefs correctos:', JSON.stringify(hrefs) === JSON.stringify(expected));

// 2. Las 5 secciones existen con esos ids.
for (const id of ['concepto', 'proceso', 'herramientas', 'producto-final', 'galeria']) {
  const count = await page.locator('#' + id).count();
  console.log('seccion #' + id + ' existe:', count === 1);
}

// 3. Scrollspy: al hacer scroll hasta "Producto final", ese item se marca activo.
// scrollIntoViewIfNeeded solo mueve lo minimo para que se vea algo del
// elemento; con secciones cortas eso puede no cruzar la linea del
// scrollspy. Forzamos alineacion al tope real de la seccion.
await page.evaluate(() => document.getElementById('producto-final').scrollIntoView({ block: 'start' }));
await page.waitForTimeout(700);
const activo = await page.locator('.line-sidebar__item[aria-current="true"] .line-sidebar__text').innerText();
console.log('activo tras scroll a Producto final:', activo);

// 4. Click en "Concepto" scrollea de vuelta arriba y lo marca activo.
await page.locator('.line-sidebar__link', { hasText: 'Concepto' }).click();
await page.waitForTimeout(500);
const activo2 = await page.locator('.line-sidebar__item[aria-current="true"] .line-sidebar__text').innerText();
console.log('activo tras click en Concepto:', activo2);
const conceptoTop = await page.evaluate(() => document.getElementById('concepto').getBoundingClientRect().top);
console.log('concepto pegado justo debajo del header tras click (0-100 esperado):', conceptoTop, conceptoTop >= 0 && conceptoTop < 100);

// 5. Efecto de proximidad: mover el mouse sobre el 2do item sube su --effect por encima de 0.
const segundoItem = page.locator('.line-sidebar__item').nth(1);
const box = await segundoItem.boundingBox();
await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
await page.waitForTimeout(300);
const effect = await segundoItem.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue('--effect') || '0'));
console.log('--effect del item bajo el mouse (> 0.5 esperado):', effect);

// 5b. pointerleave: al sacar el mouse de la lista, el --effect vuelve a 0.
await page.mouse.move(10, 10);
await page.waitForTimeout(400);
const effectTrasLeave = await segundoItem.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue('--effect') || '0'));
console.log('--effect tras sacar el mouse (< 0.05 esperado):', effectTrasLeave);

// 6. Mobile (<=820px): la sidebar se vuelve horizontal, sin marker, con scroll propio.
await page.setViewportSize({ width: 480, height: 900 });
await page.waitForTimeout(200);
const flexDir = await page.locator('.line-sidebar__list').evaluate((el) => getComputedStyle(el).flexDirection);
console.log('flex-direction mobile (row esperado):', flexDir);
const markerDisplay = await page.locator('.line-sidebar__marker').first().evaluate((el) => getComputedStyle(el).display);
console.log('marker oculto en mobile (none esperado):', markerDisplay);

// 7. Sin overflow horizontal.
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log('overflow horizontal (0 esperado):', overflow);

// 8. prefers-reduced-motion: reduce -> el loop de proximidad no se activa
// (hover sobre un item inactivo no le sube el --effect).
await page.setViewportSize({ width: 1400, height: 1000 });
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.reload({ waitUntil: 'load' });
await page.waitForTimeout(300);
const tercerItem = page.locator('.line-sidebar__item').nth(2);
const box2 = await tercerItem.boundingBox();
await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2);
await page.waitForTimeout(300);
const effectReducedMotion = await tercerItem.evaluate((el) => parseFloat(getComputedStyle(el).getPropertyValue('--effect') || '0'));
console.log('--effect con reduced-motion, item inactivo bajo el mouse (0 esperado):', effectReducedMotion);

console.log('errores de consola/pagina:', errors.length ? errors : 'ninguno');
await browser.close();
```

- [ ] **Step 2: Correr el script contra la página SIN modificar (debe fallar)**

```bash
cd "C:\Users\mudki\Documents\PORTAFOLIO"
python -m http.server 8123 >/tmp/http-server.log 2>&1 &
sleep 1
cd "$VERIFY_DIR"
npm init -y >/dev/null 2>&1
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install playwright@1.62.0 >/dev/null 2>&1
npx playwright install chromium >/dev/null 2>&1
node verify-sidebar.mjs http://localhost:8123/especiferal.html
```

Esperado: imprime `items sidebar: []`, `hrefs: []`, `hrefs correctos: false`
y las 5 líneas `seccion #... existe: false` — el markup todavía no existe.
Después de eso el script se cuelga ~30s en
`page.locator('#producto-final').scrollIntoViewIfNeeded()` (esa sección
tampoco existe aún) y termina abortando con un error de timeout de
Playwright: es el comportamiento esperado en este paso, no un problema del
script — confirma que el script realmente está probando algo real. Cortar
la espera con Ctrl+C si hace falta y seguir al Step 3.

- [ ] **Step 3: Agregar el CSS al final de `pagina.css`**

```css

/* =========================================================
   SIDEBAR DE PROYECTO — layout de 2 columnas + lista con efecto
   de proximidad al cursor (puerto vanilla del componente React
   "LineSidebar"). Compartido por especiferal.html / mordiendo.html
   / elsabio.html. Comportamiento en sidebar.js. Ver
   docs/superpowers/specs/2026-07-26-sidebar-proyecto-design.md.
   ========================================================= */
.page-body {
  display: flex;
  align-items: flex-start;
  gap: clamp(2rem, 5vw, 4rem);
  margin-top: clamp(2.5rem, 6vw, 4rem);
}
.page-content { flex: 1; min-width: 0; }
.page-content > section {
  padding: clamp(1.6rem, 4vw, 2.6rem) 0;
  border-top: 1px solid var(--line);
  scroll-margin-top: var(--header-height, 90px);
}
.page-content > section:first-child { border-top: 0; padding-top: 0; }
.page-content h2 {
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: 0.9rem;
}
.page-content section p { color: var(--muted); max-width: 60ch; }
.page-content section p + p { margin-top: 0.9rem; }

.line-sidebar {
  position: sticky;
  top: 0;
  align-self: flex-start;
  flex: 0 0 180px;
  width: 180px;
}
.line-sidebar__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.line-sidebar__item { --effect: 0; }
.line-sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.2rem 0;
  text-decoration: none;
}
.line-sidebar__link:focus-visible {
  outline: 2px solid var(--bone);
  outline-offset: 4px;
}
.line-sidebar__marker {
  flex: 0 0 auto;
  width: 32px;
  height: 2px;
  background: var(--line);
  transform-origin: left center;
  transform: scaleX(calc(0.45 + var(--effect) * 0.55));
}
.line-sidebar__item[aria-current="true"] .line-sidebar__marker { background: var(--bone); }
.line-sidebar__index {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: var(--ash);
  flex: 0 0 auto;
}
.line-sidebar__text {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
  display: inline-block;
  color: color-mix(in srgb, var(--muted) calc((1 - var(--effect)) * 100%), var(--bone) calc(var(--effect) * 100%));
  transform: translateX(calc(var(--effect) * 14px));
}

@media (max-width: 820px) {
  .page-body { flex-direction: column; gap: 0; }
  .line-sidebar {
    width: 100%;
    flex: none;
    z-index: 5;
    background: rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--line);
    margin-bottom: 1.6rem;
  }
  .line-sidebar__list {
    flex-direction: row;
    gap: 1.5rem;
    padding: 0.9rem clamp(1.25rem, 5vw, 3.5rem);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .line-sidebar__list::-webkit-scrollbar { display: none; }
  .line-sidebar__marker { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .line-sidebar__marker,
  .line-sidebar__text { transition: none; }
}
```

- [ ] **Step 4: Crear `sidebar.js`**

Crear `sidebar.js` en la raíz del proyecto (mismo nivel que `menu.js`):

```javascript
// ====== SIDEBAR DE PROYECTO: navegacion con efecto de proximidad ======
// Compartido por especiferal.html / mordiendo.html / elsabio.html.
// Requiere en el HTML: .site-header, .page-body > .line-sidebar (con
// .line-sidebar__item > .line-sidebar__link[href="#id"]) y
// .page-content > section[id] con el mismo id, en el mismo orden.
(function () {
  'use strict';
  var sidebar = document.querySelector('.line-sidebar');
  var body = document.querySelector('.page-body');
  if (!sidebar || !body) return;

  var items = Array.prototype.slice.call(sidebar.querySelectorAll('.line-sidebar__item'));
  var links = items.map(function (item) { return item.querySelector('.line-sidebar__link'); });
  var sections = links.map(function (link) {
    return document.getElementById(link.getAttribute('href').slice(1));
  });

  // El alto del site-header (sticky) cambia entre breakpoints (padding
  // distinto en <=640px): se mide en JS en vez de asumir un numero fijo,
  // mismo criterio que el flow-menu de index.html.
  var header = document.querySelector('.site-header');
  var headerHeight = 0;
  function ajustarOffsets() {
    headerHeight = header ? header.getBoundingClientRect().height : 0;
    sidebar.style.top = headerHeight + 'px';
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
  }
  ajustarOffsets();

  var tienePuntero = window.matchMedia('(pointer: fine)').matches;
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var activeIndex = -1;

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    items.forEach(function (item, i) {
      if (i === index) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
      if (menosMovimiento || !tienePuntero) {
        item.style.setProperty('--effect', i === index ? 1 : 0);
      }
    });
  }

  // --- Scrollspy: queda activa la ULTIMA seccion cuyo borde superior ya
  // paso una linea justo debajo del header. Algoritmo clasico de indice de
  // lectura (independiente del alto de cada seccion) -- se probo primero
  // con IntersectionObserver + rootMargin y, con secciones cortas y
  // pegadas (como los placeholders "Proximamente"), marcaba activa la
  // seccion vecina en vez de la que realmente se estaba mirando.
  var scrollTicking = false;
  function actualizarActivoPorScroll() {
    scrollTicking = false;
    var threshold = headerHeight + 24;
    var current = 0;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (!section) continue;
      if (section.getBoundingClientRect().top - threshold <= 0) current = i;
    }
    setActive(current);
  }
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(actualizarActivoPorScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  function onResize() {
    ajustarOffsets();
    actualizarActivoPorScroll();
  }
  window.addEventListener('resize', onResize);
  actualizarActivoPorScroll();

  // --- Click: los links son <a href="#id"> normales (scroll-behavior:
  // smooth ya es global en pagina.css, con su propio fallback a "auto"
  // bajo prefers-reduced-motion) -- solo hace falta marcar activo al toque.
  links.forEach(function (link, index) {
    link.addEventListener('click', function () { setActive(index); });
  });

  // --- Efecto de proximidad al cursor: solo con puntero fino y sin
  // "menos movimiento" (en touch o reduced-motion, setActive ya deja el
  // --effect fijo en 0/1 mas arriba, sin este loop). ---
  if (!tienePuntero || menosMovimiento) return;

  var targets = items.map(function () { return 0; });
  var current = items.map(function () { return 0; });
  var rafId = null;
  var last = 0;

  function runFrame(now) {
    var dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    var tau = 0.1; // 100ms de suavizado, igual de sensacion que el original
    var k = 1 - Math.exp(-dt / tau);
    var moving = false;

    items.forEach(function (item, i) {
      var target = Math.max(targets[i], i === activeIndex ? 1 : 0);
      var cur = current[i];
      var next = cur + (target - cur) * k;
      var settled = Math.abs(target - next) < 0.0015;
      var value = settled ? target : next;
      current[i] = value;
      item.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    });

    rafId = moving ? requestAnimationFrame(runFrame) : null;
  }

  function startLoop() {
    if (rafId != null) return;
    last = performance.now();
    rafId = requestAnimationFrame(runFrame);
  }

  var list = sidebar.querySelector('.line-sidebar__list');
  list.addEventListener('pointermove', function (e) {
    var rect = list.getBoundingClientRect();
    var pointerY = e.clientY - rect.top;
    var radius = 90;
    items.forEach(function (item, i) {
      var center = item.offsetTop + item.offsetHeight / 2;
      var distance = Math.abs(pointerY - center);
      var p = Math.max(0, 1 - distance / radius);
      targets[i] = p * p * (3 - 2 * p); // falloff "smooth", igual al original
    });
    startLoop();
  });

  list.addEventListener('pointerleave', function () {
    targets = targets.map(function () { return 0; });
    startLoop();
  });
})();
```

- [ ] **Step 5: Reestructurar `especiferal.html`**

Reemplazar todo el contenido de `<main class="page">` (desde `<span class="eyebrow...`
hasta el `</a>` de `.next`, sin tocar el `<footer>` que sigue después) por:

```html
      <span class="eyebrow reveal">Proyecto 01 · Colección · Industrial · Editorial</span>
      <h1 class="page__title reveal">Especiferal</h1>

      <div class="page-body reveal">
        <nav class="line-sidebar" aria-label="Secciones del proyecto">
          <ul class="line-sidebar__list">
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#concepto">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">01</span>
                <span class="line-sidebar__text">Concepto</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#proceso">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">02</span>
                <span class="line-sidebar__text">Proceso</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#herramientas">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">03</span>
                <span class="line-sidebar__text">Herramientas</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#producto-final">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">04</span>
                <span class="line-sidebar__text">Producto final</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#galeria">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">05</span>
                <span class="line-sidebar__text">Galería</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="page-content">
          <section id="concepto">
            <h2>Concepto</h2>
            <p>
              Colección propositiva de accesorios y productos inspirada en especies
              ferales. Ilustración, editorial, industrial y comunicación visual.
            </p>
            <!-- >>> EDITA AQUI: conta el brief/idea detras de Especiferal. -->
            <p>Próximamente más sobre el concepto.</p>
          </section>

          <section id="proceso">
            <h2>Proceso</h2>
            <!-- >>> EDITA AQUI: investigacion, bocetos, iteraciones. -->
            <p>Próximamente.</p>
          </section>

          <section id="herramientas">
            <h2>Herramientas</h2>
            <div class="chips">
              <span class="chip">Mar — May 2025</span>
              <span class="chip">InDesign</span>
              <span class="chip">Fusion 360</span>
              <span class="chip">Impresión 3D</span>
            </div>
            <!-- >>> EDITA AQUI: como se uso cada herramienta/material. -->
            <p class="mt">Próximamente más sobre el proceso técnico.</p>
          </section>

          <section id="producto-final">
            <h2>Producto final</h2>
            <!-- >>> EDITA AQUI: descripcion del resultado terminado. -->
            <p>Próximamente.</p>
          </section>

          <section id="galeria">
            <h2>Galería</h2>
            <!-- >>> AQUI VAN LAS FOTOS: dentro de cada .galeria__item pega
                 <img src="./fotos/especiferal-1.jpg" alt="descripcion corta" loading="lazy" />
                 y borra el texto "Próximamente". -->
            <div class="galeria galeria--2">
              <div class="galeria__item galeria__item--ancha">Próximamente</div>
              <div class="galeria__item">Próximamente</div>
              <div class="galeria__item">Próximamente</div>
            </div>
          </section>
        </div>
      </div>

      <hr class="divider" />

      <a class="next" href="mordiendo.html">
        <span class="next__label">Siguiente proyecto</span>
        <span class="next__name">Mordiendo el polvo →</span>
      </a>
```

Y agregar `sidebar.js` junto a los otros scripts, al final del `<body>`:

```html
    <script src="./lib/gsap.min.js"></script>
    <script src="./menu.js"></script>
    <script src="./sidebar.js"></script>
```

- [ ] **Step 6: Correr el script de verificación de nuevo (debe pasar)**

```bash
cd "$VERIFY_DIR"
node verify-sidebar.mjs http://localhost:8123/especiferal.html
```

Esperado, línea por línea:
- `items sidebar: [ 'Concepto', 'Proceso', 'Herramientas', 'Producto final', 'Galería' ]`
- `hrefs correctos: true`
- `seccion #concepto/#proceso/#herramientas/#producto-final/#galeria existe: true` (las 5)
- `activo tras scroll a Producto final: Producto final`
- `activo tras click en Concepto: Concepto`
- `concepto pegado justo debajo del header tras click (0-100 esperado): <número> true`
- `--effect del item bajo el mouse (> 0.5 esperado): <número > 0.5>`
- `--effect tras sacar el mouse (< 0.05 esperado): <número < 0.05>`
- `flex-direction mobile (row esperado): row`
- `marker oculto en mobile (none esperado): none`
- `overflow horizontal (0 esperado): 0`
- `--effect con reduced-motion, item inactivo bajo el mouse (0 esperado): 0`
- `errores de consola/pagina: ninguno`

Si algo no coincide, corregir CSS/JS/HTML de este Task antes de seguir (no
avanzar a Task 2 con el mecanismo roto).

- [ ] **Step 7: Apagar el server local**

```bash
pids=$(netstat -ano 2>/dev/null | grep ':8123' | grep LISTENING | awk '{print $5}' | sort -u)
for p in $pids; do taskkill //PID "$p" //F; done
```

No hacer commit — dejar `pagina.css`, `sidebar.js` y `especiferal.html`
modificados/creados para revisión del usuario.

---

### Task 2: Aplicar la misma estructura a `mordiendo.html`

**Files:**
- Modify: `mordiendo.html`

**Interfaces:**
- Consumes: el CSS y `sidebar.js` producidos en Task 1, sin cambios —
  requiere la misma estructura HTML (5 items/secciones con los mismos
  `href`/`id`, en el mismo orden) descrita en la interfaz de Task 1.

- [ ] **Step 1: Reestructurar `mordiendo.html`**

Reemplazar el contenido de `<main class="page">` (desde `<span class="eyebrow...`
hasta el `</a>` de `.next`) por:

```html
      <span class="eyebrow reveal">Proyecto 02 · Fotografía · Gráfico</span>
      <h1 class="page__title reveal">Mordiendo el polvo</h1>

      <div class="page-body reveal">
        <nav class="line-sidebar" aria-label="Secciones del proyecto">
          <ul class="line-sidebar__list">
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#concepto">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">01</span>
                <span class="line-sidebar__text">Concepto</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#proceso">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">02</span>
                <span class="line-sidebar__text">Proceso</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#herramientas">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">03</span>
                <span class="line-sidebar__text">Herramientas</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#producto-final">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">04</span>
                <span class="line-sidebar__text">Producto final</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#galeria">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">05</span>
                <span class="line-sidebar__text">Galería</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="page-content">
          <section id="concepto">
            <h2>Concepto</h2>
            <p>
              Colección fotográfica y gráfica sobre el deporte automotor de la
              región. Piezas visuales coherentes y dinámicas.
            </p>
            <!-- >>> EDITA AQUI: conta el brief/idea detras de esta coleccion. -->
            <p>Próximamente más sobre el concepto.</p>
          </section>

          <section id="proceso">
            <h2>Proceso</h2>
            <!-- >>> EDITA AQUI: como se cubren las carreras, logistica, etc. -->
            <p>Próximamente.</p>
          </section>

          <section id="herramientas">
            <h2>Herramientas</h2>
            <div class="chips">
              <span class="chip">Feb 2025 — Actualidad</span>
              <span class="chip">Fotografía</span>
              <span class="chip">Lightroom</span>
              <span class="chip">Baja obturación</span>
            </div>
            <!-- >>> EDITA AQUI: equipo/tecnica usada (camara, lentes, etc). -->
            <p class="mt">Próximamente más sobre el equipo y la técnica.</p>
          </section>

          <section id="producto-final">
            <h2>Producto final</h2>
            <!-- >>> EDITA AQUI: como se entrega/usa esta coleccion. -->
            <p>Próximamente.</p>
          </section>

          <section id="galeria">
            <h2>Galería</h2>
            <!-- >>> AQUI VAN LAS FOTOS: dentro de cada .galeria__item pega
                 <img src="./fotos/mordiendo-1.jpg" alt="descripcion corta" loading="lazy" />
                 y borra el texto "Próximamente". -->
            <div class="galeria galeria--2">
              <div class="galeria__item galeria__item--ancha">
                <img src="./foto-portada.jpg" alt="Colección Mordiendo el polvo" loading="lazy" />
              </div>
              <div class="galeria__item">Próximamente</div>
              <div class="galeria__item">Próximamente</div>
            </div>
          </section>
        </div>
      </div>

      <hr class="divider" />

      <a class="next" href="elsabio.html">
        <span class="next__label">Siguiente proyecto</span>
        <span class="next__name">El sabio se parcha el bobo se estresa →</span>
      </a>
```

Y agregar `sidebar.js` al final del `<body>`, junto a los otros scripts:

```html
    <script src="./lib/gsap.min.js"></script>
    <script src="./menu.js"></script>
    <script src="./sidebar.js"></script>
```

- [ ] **Step 2: Verificar con el mismo script de Task 1**

```bash
cd "C:\Users\mudki\Documents\PORTAFOLIO"
python -m http.server 8123 >/tmp/http-server.log 2>&1 &
sleep 1
cd "$VERIFY_DIR"
node verify-sidebar.mjs http://localhost:8123/mordiendo.html
```

Mismas aserciones que el Step 6 del Task 1 (labels, hrefs, 5 secciones,
scrollspy, click, proximidad, mobile, sin overflow). Además, confirmar a
ojo (`page.screenshot` o abrir en el navegador) que la imagen principal de
la galería sigue siendo `foto-portada.jpg` (no se rompió al mover el
`.galeria` dentro de `#galeria`).

Apagar el server igual que en Task 1, Step 7.

No hacer commit — dejar `mordiendo.html` modificado para revisión del
usuario.

---

### Task 3: Aplicar la misma estructura a `elsabio.html`

**Files:**
- Modify: `elsabio.html`

**Interfaces:**
- Consumes: mismo contrato de Task 1/2 (CSS + `sidebar.js`, sin cambios).

- [ ] **Step 1: Reestructurar `elsabio.html`**

Reemplazar el contenido de `<main class="page">` (desde el comentario
`>>> PENDIENTE` hasta el `</a>` de `.next`) por:

```html
      <!-- >>> PENDIENTE: reemplazar la categoria, fecha, y el contenido de
           cada seccion con la info real de este proyecto. -->
      <span class="eyebrow reveal">Proyecto 03 · Próximamente</span>
      <h1 class="page__title reveal">El sabio se parcha el bobo se estresa</h1>

      <div class="page-body reveal">
        <nav class="line-sidebar" aria-label="Secciones del proyecto">
          <ul class="line-sidebar__list">
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#concepto">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">01</span>
                <span class="line-sidebar__text">Concepto</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#proceso">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">02</span>
                <span class="line-sidebar__text">Proceso</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#herramientas">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">03</span>
                <span class="line-sidebar__text">Herramientas</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#producto-final">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">04</span>
                <span class="line-sidebar__text">Producto final</span>
              </a>
            </li>
            <li class="line-sidebar__item">
              <a class="line-sidebar__link" href="#galeria">
                <span class="line-sidebar__marker" aria-hidden="true"></span>
                <span class="line-sidebar__index">05</span>
                <span class="line-sidebar__text">Galería</span>
              </a>
            </li>
          </ul>
        </nav>

        <div class="page-content">
          <section id="concepto">
            <h2>Concepto</h2>
            <!-- >>> EDITA AQUI: conta el brief/idea de este proyecto. -->
            <p>Próximamente más detalles de este proyecto.</p>
          </section>

          <section id="proceso">
            <h2>Proceso</h2>
            <!-- >>> EDITA AQUI: investigacion, bocetos, iteraciones. -->
            <p>Próximamente.</p>
          </section>

          <section id="herramientas">
            <h2>Herramientas</h2>
            <div class="chips">
              <span class="chip">Próximamente</span>
            </div>
            <!-- >>> EDITA AQUI: como se uso cada herramienta/material. -->
            <p class="mt">Próximamente.</p>
          </section>

          <section id="producto-final">
            <h2>Producto final</h2>
            <!-- >>> EDITA AQUI: descripcion del resultado terminado. -->
            <p>Próximamente.</p>
          </section>

          <section id="galeria">
            <h2>Galería</h2>
            <!-- >>> AQUI VAN LAS FOTOS: dentro de cada .galeria__item pega
                 <img src="./fotos/elsabio-1.jpg" alt="descripcion corta" loading="lazy" />
                 y borra el texto "Próximamente". -->
            <div class="galeria galeria--2">
              <div class="galeria__item galeria__item--ancha">
                <img src="./imagenes/sabio-se-parcha-hover.jpg" alt="El sabio se parcha el bobo se estresa" loading="lazy" />
              </div>
              <div class="galeria__item">Próximamente</div>
              <div class="galeria__item">Próximamente</div>
            </div>
          </section>
        </div>
      </div>

      <hr class="divider" />

      <a class="next" href="especiferal.html">
        <span class="next__label">Siguiente proyecto</span>
        <span class="next__name">Especiferal →</span>
      </a>
```

Y agregar `sidebar.js` al final del `<body>`, junto a los otros scripts:

```html
    <script src="./lib/gsap.min.js"></script>
    <script src="./menu.js"></script>
    <script src="./sidebar.js"></script>
```

- [ ] **Step 2: Verificar con el mismo script**

```bash
cd "C:\Users\mudki\Documents\PORTAFOLIO"
python -m http.server 8123 >/tmp/http-server.log 2>&1 &
sleep 1
cd "$VERIFY_DIR"
node verify-sidebar.mjs http://localhost:8123/elsabio.html
```

Mismas aserciones que Task 1/2. Apagar el server igual que en Task 1,
Step 7, y borrar el directorio temporal de verificación:

```bash
rm -rf "$VERIFY_DIR"
```

- [ ] **Step 3: Verificación final cruzada (las 3 páginas + navegación entre ellas)**

Manual, en el navegador (sin Playwright): abrir `trabajos.html`, entrar a
cada uno de los 3 proyectos desde el índice, confirmar que:
- La sidebar se ve igual (mismos 5 items, mismo efecto) en las 3.
- El link "Siguiente proyecto" sigue encadenando
  Especiferal → Mordiendo → El sabio → Especiferal correctamente.
- El menú hamburguesa (`menu.js`) sigue abriendo/cerrando normal en las 3
  (no quedó roto por el `sidebar.js` nuevo).

No hacer commit — dejar `elsabio.html` modificado para revisión del
usuario. Al final de este Task, los 5 archivos tocados en todo el plan
(`pagina.css`, `sidebar.js`, `especiferal.html`, `mordiendo.html`,
`elsabio.html`) quedan sin commitear, listos para `git diff` + revisión del
usuario.
