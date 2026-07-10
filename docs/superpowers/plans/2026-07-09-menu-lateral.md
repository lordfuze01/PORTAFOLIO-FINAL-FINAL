# Menú lateral "BY KNOX" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la navegación actual (`home__nav` en index.html, `site-header__nav`
en las 3 subpáginas) por un menú lateral único: botón "Menú"/"Cerrar" arriba a la
derecha que abre un panel deslizante desde la derecha, con links numerados y datos de
contacto, animado con GSAP (cascada de texto, mismo patrón que el manifiesto de
index.html).

**Architecture:** Un archivo JS compartido (`menu.js`) contiene toda la lógica de
abrir/cerrar/animar y se referencia igual en las 4 páginas — evita duplicar ~90 líneas
de comportamiento idéntico 4 veces. El HTML del panel y el CSS del componente sí se
duplican en cada página (mismo patrón ya usado en el sitio: `site-header` está
copiado igual en las 3 subpáginas, y los colores `--bone`/`--ash`/`--line` ya están
duplicados entre `index.html` y `pagina.css`).

**Tech Stack:** HTML/CSS/JS vanilla, sin build. GSAP core (`lib/gsap.min.js`, ya está
en el repo, sin ScrollTrigger). Sin dependencias nuevas.

## Global Constraints

- Sin frameworks, sin build step — el sitio es estático (HTML/CSS/JS planos).
- Sin tipografías serif; `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif`
  en todo texto nuevo.
- Respetar `prefers-reduced-motion: reduce` en toda animación nueva (sin cascada ni
  slide, aparece/desaparece directo) — mismo criterio que el resto del sitio.
- Reutilizar colores existentes, no inventar hex nuevos: `--bone: #ECE7DF`,
  `--ash: #7c7c7c`, `--line: rgba(236, 231, 223, 0.16)` (o el `--line` sólido de
  `pagina.css` donde ya exista, ver Task 1), `--bg-final`/`--bg: #000000`.
- **No hacer `git commit` en ningún paso.** El usuario lleva sus propios commits
  (`CONTEXTO-AGENTE.md`: "El usuario hace sus propios commits"). Cada tarea termina
  dejando los archivos modificados sin commitear, listos para que el usuario revise
  con `git diff` y decida.
- Spec de referencia: `docs/superpowers/specs/2026-07-09-menu-lateral-design.md`.

---

## Corrección respecto a la spec

La spec asumía que `--bone`/`--ash` ya existían igual en las 4 páginas. Al revisar
`pagina.css` (usado por `knox.html`, `trabajos.html`, `contacto.html`) resultó que solo
tiene `--fg: #ffffff` / `--muted: #a6a6a6` / `--line: #262626` — valores distintos, sin
`--bone` ni `--ash`. Task 1 agrega `--bone`/`--ash` a `pagina.css` (mismos valores hex
que ya usa `index.html`) para que el panel se vea idéntico en las 4 páginas, tal como
pedía el diseño aprobado.

---

### Task 1: CSS compartido del menú en `pagina.css`

**Files:**
- Modify: `pagina.css:6-14` (añadir variables), `pagina.css:52-80` (eliminar reglas
  muertas de `site-header__nav`), `pagina.css:382` (eliminar línea muerta), y añadir
  bloque nuevo de CSS del menú al final del archivo.

**Interfaces:**
- Produces (usado por Task 3, 4, 5, 6): clases CSS
  `.menu-toggle`, `.menu-overlay`, `.menu-overlay[hidden]`, `.menu-panel`,
  `.menu-panel__list`, `.menu-panel__item`, `.menu-panel__link`,
  `.menu-panel__link.is-active`, `.menu-panel__num`, `.menu-panel__contact`.
  Breakpoint del panel: `max-width: 640px` → panel a `100vw`.

- [ ] **Step 1: Añadir `--bone` y `--ash` al `:root` de `pagina.css`**

En `pagina.css:6-14`, reemplazar:

```css
:root {
  --bg: #000000;
  --fg: #ffffff;
  --muted: #a6a6a6;      /* texto secundario */
  --line: #262626;       /* lineas / bordes sutiles */
  --card: #0c0c0c;       /* fondo de tarjetas */
  --accent: #ffffff;     /* acento (cambialo si quieres color) */
  --max: 1120px;         /* ancho maximo del contenido */
}
```

por:

```css
:root {
  --bg: #000000;
  --fg: #ffffff;
  --muted: #a6a6a6;      /* texto secundario */
  --line: #262626;       /* lineas / bordes sutiles */
  --card: #0c0c0c;       /* fondo de tarjetas */
  --accent: #ffffff;     /* acento (cambialo si quieres color) */
  --max: 1120px;         /* ancho maximo del contenido */

  /* Mismos valores que index.html, para que el menu lateral se vea igual
     en todas las paginas (independiente de --fg/--muted de aqui). */
  --bone: #ECE7DF;
  --ash:  #7c7c7c;
}
```

- [ ] **Step 2: Eliminar las reglas muertas de `site-header__nav`**

En `pagina.css:52-80`, eliminar por completo este bloque (el nav que reemplazamos por
el botón del menú; sin esto queda CSS sin ningún elemento que lo use):

```css
.site-header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1rem, 3vw, 2.2rem);
}
.site-header__nav a {
  position: relative;
  text-decoration: none;
  color: var(--muted);
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  padding-bottom: 3px;
  transition: color 0.25s ease;
}
.site-header__nav a::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  height: 1px;
  background: var(--fg);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.28s ease;
}
.site-header__nav a:hover { color: var(--fg); }
.site-header__nav a:hover::after { transform: scaleX(1); }
.site-header__nav a.is-active { color: var(--fg); }
.site-header__nav a.is-active::after { transform: scaleX(1); }
```

- [ ] **Step 3: Eliminar la línea muerta del media query**

En el bloque `@media (max-width: 640px)` (antes en `pagina.css:371-383`), eliminar la
línea `.site-header__nav { gap: 1rem; }` (ya no existe ese elemento). El bloque queda:

```css
@media (max-width: 640px) {
  /* Contacto: etiqueta arriba y valor abajo (mas limpio en movil) */
  .contact-row a,
  .contact-row span.value {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
  .contact-row__value { font-size: clamp(1.5rem, 8vw, 2.2rem); }
  /* Header: la marca y el menu se separan bien en pantallas chicas */
  .site-header { gap: 0.4rem 1.2rem; padding: 1.1rem clamp(1.1rem, 5vw, 2rem); }
}
```

- [ ] **Step 4: Añadir el CSS del componente al final de `pagina.css`**

Añadir al final del archivo (después de la línea 388, el cierre del bloque
`prefers-reduced-motion`):

```css

/* =========================================================
   MENU LATERAL — boton toggle + panel deslizante (compartido
   con index.html, ver docs/superpowers/specs/2026-07-09-menu-lateral-design.md)
   ========================================================= */
.menu-toggle {
  position: fixed;
  top: clamp(1.2rem, 3vw, 2rem);
  right: clamp(1.2rem, 3vw, 2rem);
  z-index: 60;
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--bone);
  font-family: inherit;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.3em 0.1em;
}
.menu-toggle:hover { color: #ffffff; }
.menu-toggle:focus-visible { outline: 2px solid var(--bone); outline-offset: 4px; }

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: rgba(0, 0, 0, 0.6);
}
.menu-overlay[hidden] { display: none; }

.menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  height: 100dvh;
  width: min(420px, 92vw);
  background: var(--bg);
  border-left: 1px solid var(--line);
  padding: clamp(5rem, 12vh, 7rem) clamp(1.6rem, 4vw, 2.4rem) clamp(2rem, 6vh, 3rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  will-change: transform;
}

.menu-panel__list {
  list-style: none;
}
.menu-panel__item { border-bottom: 1px solid var(--line); }
.menu-panel__item:first-child { border-top: 1px solid var(--line); }

.menu-panel__link {
  display: block;
  padding: clamp(0.9rem, 2.4vh, 1.3rem) 0;
  text-decoration: none;
  color: var(--bone);
  font-size: clamp(1.5rem, 4vw, 2.1rem);
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: color 0.25s ease;
}
.menu-panel__link .line { overflow: hidden; display: block; }
.menu-panel__link .line > span { display: block; will-change: transform; }
.menu-panel__num {
  display: inline-block;
  color: var(--ash);
  font-size: 0.5em;
  font-weight: 500;
  letter-spacing: 0.06em;
  margin-right: 0.5em;
  vertical-align: middle;
}
.menu-panel__link:hover,
.menu-panel__link.is-active { color: #ffffff; }
.menu-panel__link.is-active .menu-panel__num { color: var(--bone); }
.menu-panel__link:focus-visible { outline: 2px solid var(--bone); outline-offset: 4px; }

.menu-panel__contact {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: clamp(1.2rem, 3vh, 1.8rem);
  border-top: 1px solid var(--line);
}
.menu-panel__contact a {
  color: var(--ash);
  text-decoration: none;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  transition: color 0.25s ease;
}
.menu-panel__contact a:hover { color: var(--bone); }
.menu-panel__contact a:focus-visible { outline: 2px solid var(--bone); outline-offset: 3px; }

@media (max-width: 640px) {
  .menu-panel { width: 100vw; border-left: 0; }
}
```

- [ ] **Step 5: Verificar visualmente**

Todavía no hay markup que use estas clases (llega en Task 3-6), así que no hay nada
que ver aún. Verificar solo que el archivo no tiene errores de sintaxis: abrir
`trabajos.html` (o cualquier subpágina) en el navegador y confirmar que el resto de la
página se ve exactamente igual que antes (el header sigue con el brand "KNOX", aunque
el nav de la derecha va a desaparecer recién en el Task correspondiente a esa página).

No hacer commit — dejar `pagina.css` modificado para revisión del usuario.

---

### Task 2: Comportamiento compartido en `menu.js`

**Files:**
- Create: `menu.js`

**Interfaces:**
- Consumes (debe existir en el HTML de cada página, ver Task 3-6): elementos con
  `id="menuToggle"`, `id="menuOverlay"`, `id="menuPanel"`, y dentro del panel,
  elementos `.menu-panel__item .line > span` (para la cascada) y al menos un
  `.menu-panel__link` (el primero recibe el foco al abrir).
- Consumes: variable global `gsap` (de `lib/gsap.min.js`, debe cargarse ANTES que
  este script en el HTML).
- Produces: nada que otros archivos consuman directamente — es autocontenido, se
  ejecuta solo (IIFE) al cargar.

- [ ] **Step 1: Crear el archivo**

Crear `menu.js` en la raíz del proyecto (mismo nivel que `index.html`), con este
contenido completo:

```javascript
// ====== MENU LATERAL: boton "Menu"/"Cerrar" + panel deslizante ======
// Compartido por las 4 paginas del sitio. Mismo patron de cierre
// (Escape / clic fuera del panel / bloqueo de scroll del body) que el
// visor de video de index.html (ver seccion "CORTO").
(function () {
  var toggle = document.getElementById('menuToggle');
  var overlay = document.getElementById('menuOverlay');
  var panel = document.getElementById('menuPanel');
  if (!toggle || !overlay || !panel || typeof gsap === 'undefined') return;

  var lineas = panel.querySelectorAll('.menu-panel__item .line > span');
  var primerLink = panel.querySelector('.menu-panel__link');
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var abierto = false;

  function abrirMenu() {
    if (abierto) return;
    abierto = true;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    toggle.textContent = 'Cerrar';
    toggle.setAttribute('aria-expanded', 'true');

    if (menosMovimiento) {
      gsap.set(overlay, { opacity: 1 });
      gsap.set(panel, { xPercent: 0 });
      gsap.set(lineas, { yPercent: 0 });
    } else {
      gsap.set(lineas, { yPercent: 110 });
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        panel,
        { xPercent: 100 },
        {
          xPercent: 0,
          duration: 0.55,
          ease: 'power3.out',
          onComplete: function () {
            gsap.to(lineas, { yPercent: 0, duration: 0.7, ease: 'power4.out', stagger: 0.06 });
          },
        }
      );
    }
    if (primerLink) primerLink.focus();
  }

  function cerrarMenu() {
    if (!abierto) return;
    abierto = false;
    toggle.textContent = 'Menú';
    toggle.setAttribute('aria-expanded', 'false');

    function alTerminar() {
      overlay.hidden = true;
      document.body.style.overflow = '';
      toggle.focus();
    }
    if (menosMovimiento) {
      alTerminar();
      return;
    }
    gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    gsap.to(panel, { xPercent: 100, duration: 0.45, ease: 'power3.in', onComplete: alTerminar });
  }

  toggle.addEventListener('click', function () {
    if (abierto) cerrarMenu(); else abrirMenu();
  });
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) cerrarMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarMenu();
  });
})();
```

- [ ] **Step 2: Verificar que no hay errores de sintaxis**

Abrir el archivo en el navegador vía devtools no es posible todavía (nada lo carga
aún). En vez de eso, correr un check de sintaxis rápido con Node (ya que no hay test
runner en este proyecto):

Run: `node --check menu.js`
Expected: sin output (exit code 0) — significa que el archivo es JS válido.

No hacer commit — dejar `menu.js` sin trackear para revisión del usuario.

---

### Task 3: Integrar el menú en `contacto.html`

Se hace primero esta página porque es la más simple (no tiene `<script>` propio
todavía), sirve de prueba mínima del componente antes de tocar páginas con más JS.

**Files:**
- Modify: `contacto.html:9-17` (header), `contacto.html:64-66` (cierre de body)

**Interfaces:**
- Consumes: clases CSS de Task 1 (`pagina.css`), comportamiento de Task 2 (`menu.js`).

- [ ] **Step 1: Reemplazar el nav del header**

En `contacto.html:9-17`, reemplazar:

```html
    <header class="site-header">
      <a class="site-header__brand" href="index.html#main">KNOX</a>
      <nav class="site-header__nav">
        <a href="knox.html">¿Quién es Knox?</a>
        <a href="trabajos.html">Trabajos</a>
        <a href="contacto.html" class="is-active">Contacto</a>
      </nav>
    </header>
```

por:

```html
    <header class="site-header">
      <a class="site-header__brand" href="index.html#main">KNOX</a>
      <button type="button" id="menuToggle" class="menu-toggle" aria-expanded="false" aria-controls="menuPanel">Menú</button>
    </header>
```

- [ ] **Step 2: Añadir el panel y los scripts antes de `</body>`**

En `contacto.html:64-66`, reemplazar:

```html
      <p class="site-footer__legal">© 2025 KNOX</p>
    </footer>
  </body>
</html>
```

por:

```html
      <p class="site-footer__legal">© 2025 KNOX</p>
    </footer>

    <div class="menu-overlay" id="menuOverlay" hidden>
      <div class="menu-panel" id="menuPanel">
        <nav aria-label="Navegación principal">
          <ol class="menu-panel__list">
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="index.html#main">
                <span class="line"><span><span class="menu-panel__num">01</span>Home</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="knox.html">
                <span class="line"><span><span class="menu-panel__num">02</span>Knox</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="trabajos.html">
                <span class="line"><span><span class="menu-panel__num">03</span>Trabajos</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link is-active" href="contacto.html">
                <span class="line"><span><span class="menu-panel__num">04</span>Contacto</span></span>
              </a>
            </li>
          </ol>
        </nav>
        <div class="menu-panel__contact">
          <a href="https://www.instagram.com/by_kn0x/" target="_blank" rel="noopener">@by_kn0x</a>
          <a href="mailto:sencisoballesta@gmail.com">sencisoballesta@gmail.com</a>
        </div>
      </div>
    </div>

    <script src="./lib/gsap.min.js"></script>
    <script src="./menu.js"></script>
  </body>
</html>
```

- [ ] **Step 3: Verificar en el navegador**

Abrir `contacto.html` con el servidor de preview.
Expected:
- El header muestra "KNOX" a la izquierda y "Menú" a la derecha (ya no hay 3 links).
- Clic en "Menú": el panel entra desde la derecha, el botón cambia a "Cerrar", los 4
  links aparecen en cascada (subiendo, uno tras otro), "04 Contacto" se ve resaltado
  (color blanco, `is-active`).
- Clic en "Cerrar", clic fuera del panel (sobre el overlay oscuro), y tecla `Escape`
  cierran el panel las 3 formas.
- Mientras el panel está abierto, la página de fondo no hace scroll.
- Con `prefers-reduced-motion` emulado (DevTools → Rendering → Emulate CSS
  media feature): el panel aparece/desaparece sin animación, sin cascada.

No hacer commit — dejar `contacto.html` sin trackear para revisión del usuario.

---

### Task 4: Integrar el menú en `knox.html`

**Files:**
- Modify: `knox.html` header (nav), y antes de `</body>` (no tiene `<script>` propio
  todavía, igual que contacto.html).

**Interfaces:**
- Consumes: mismas clases CSS y `menu.js` de Tasks 1-2.

- [ ] **Step 1: Reemplazar el nav del header**

En `knox.html`, buscar:

```html
    <header class="site-header">
      <a class="site-header__brand" href="index.html#main">KNOX</a>
      <nav class="site-header__nav">
        <a href="knox.html" class="is-active">¿Quién es Knox?</a>
        <a href="trabajos.html">Trabajos</a>
        <a href="contacto.html">Contacto</a>
      </nav>
    </header>
```

reemplazar por:

```html
    <header class="site-header">
      <a class="site-header__brand" href="index.html#main">KNOX</a>
      <button type="button" id="menuToggle" class="menu-toggle" aria-expanded="false" aria-controls="menuPanel">Menú</button>
    </header>
```

- [ ] **Step 2: Añadir el panel y los scripts antes de `</body>`**

Buscar el cierre del `<footer class="site-footer">` seguido de `</body>` (al final del
archivo) y, justo antes de `</body>`, insertar el mismo bloque de panel que en
Task 3, pero con `is-active` en "02 Knox" en vez de "04 Contacto":

```html
    <div class="menu-overlay" id="menuOverlay" hidden>
      <div class="menu-panel" id="menuPanel">
        <nav aria-label="Navegación principal">
          <ol class="menu-panel__list">
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="index.html#main">
                <span class="line"><span><span class="menu-panel__num">01</span>Home</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link is-active" href="knox.html">
                <span class="line"><span><span class="menu-panel__num">02</span>Knox</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="trabajos.html">
                <span class="line"><span><span class="menu-panel__num">03</span>Trabajos</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="contacto.html">
                <span class="line"><span><span class="menu-panel__num">04</span>Contacto</span></span>
              </a>
            </li>
          </ol>
        </nav>
        <div class="menu-panel__contact">
          <a href="https://www.instagram.com/by_kn0x/" target="_blank" rel="noopener">@by_kn0x</a>
          <a href="mailto:sencisoballesta@gmail.com">sencisoballesta@gmail.com</a>
        </div>
      </div>
    </div>

    <script src="./lib/gsap.min.js"></script>
    <script src="./menu.js"></script>
  </body>
```

- [ ] **Step 3: Verificar en el navegador**

Igual que Task 3, Step 3, pero en `knox.html`: confirmar que "02 Knox" aparece
resaltado como activo y los otros 3 links llevan a las páginas correctas.

No hacer commit — dejar `knox.html` sin trackear para revisión del usuario.

---

### Task 5: Integrar el menú en `trabajos.html`

Esta página sí tiene un `<script>` propio (la vista previa que sigue al cursor sobre
la lista de proyectos, `trabajos.html:125-172`). Hay que sumar los scripts nuevos sin
tocar ese bloque.

**Files:**
- Modify: `trabajos.html` header (nav), y antes de `</body>` — añadir el panel y los
  `<script>` nuevos DESPUÉS del `<script>` existente, sin modificarlo.

**Interfaces:**
- Consumes: mismas clases CSS y `menu.js` de Tasks 1-2. No interfiere con el script
  de vista previa existente (selectores e IDs distintos: `menuToggle`/`menuOverlay`/
  `menuPanel` vs `workList`/`workPreview`).

- [ ] **Step 1: Reemplazar el nav del header**

En `trabajos.html`, buscar:

```html
    <header class="site-header">
      <a class="site-header__brand" href="index.html#main">KNOX</a>
      <nav class="site-header__nav">
        <a href="knox.html">¿Quién es Knox?</a>
        <a href="trabajos.html" class="is-active">Trabajos</a>
        <a href="contacto.html">Contacto</a>
      </nav>
    </header>
```

reemplazar por:

```html
    <header class="site-header">
      <a class="site-header__brand" href="index.html#main">KNOX</a>
      <button type="button" id="menuToggle" class="menu-toggle" aria-expanded="false" aria-controls="menuPanel">Menú</button>
    </header>
```

- [ ] **Step 2: Añadir el panel y los scripts nuevos antes de `</body>`**

En `trabajos.html:172-174`, el archivo termina así (script existente ya cerrado):

```html
    </script>
  </body>
```

Reemplazar por (el panel va ANTES de los `<script>`, los `<script>` nuevos van
DESPUÉS del que ya existe):

```html
    </script>

    <div class="menu-overlay" id="menuOverlay" hidden>
      <div class="menu-panel" id="menuPanel">
        <nav aria-label="Navegación principal">
          <ol class="menu-panel__list">
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="index.html#main">
                <span class="line"><span><span class="menu-panel__num">01</span>Home</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="knox.html">
                <span class="line"><span><span class="menu-panel__num">02</span>Knox</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link is-active" href="trabajos.html">
                <span class="line"><span><span class="menu-panel__num">03</span>Trabajos</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="contacto.html">
                <span class="line"><span><span class="menu-panel__num">04</span>Contacto</span></span>
              </a>
            </li>
          </ol>
        </nav>
        <div class="menu-panel__contact">
          <a href="https://www.instagram.com/by_kn0x/" target="_blank" rel="noopener">@by_kn0x</a>
          <a href="mailto:sencisoballesta@gmail.com">sencisoballesta@gmail.com</a>
        </div>
      </div>
    </div>

    <script src="./lib/gsap.min.js"></script>
    <script src="./menu.js"></script>
  </body>
```

- [ ] **Step 3: Verificar en el navegador**

Igual que Task 3, Step 3, pero en `trabajos.html`, confirmando además que la vista
previa flotante que sigue al cursor sobre la lista de proyectos (`work__preview`)
sigue funcionando exactamente igual que antes (el menú no debe romperla).

No hacer commit — dejar `trabajos.html` sin trackear para revisión del usuario.

---

### Task 6: Integrar el menú en `index.html` (CSS inline + markup + script)

Esta es la única página donde el CSS del componente va inline en el `<style>` propio
del archivo (no usa `pagina.css`), siguiendo su convención existente
(`CONTEXTO-AGENTE.md`: "Todo el CSS y JS va inline en este archivo").

**Files:**
- Modify: `index.html:128-146` (CSS viejo del nav — eliminar), `index.html:431-435`
  (media query — eliminar línea muerta), añadir bloque CSS nuevo dentro del `<style>`
  existente, `index.html:461-465` (markup del nav — reemplazar), añadir panel antes
  del cierre de `<script>` finales, `index.html:560-561` (scripts — añadir
  `menu.js` después de gsap).

**Interfaces:**
- Consumes: comportamiento de `menu.js` (Task 2). El CSS de esta página es su propia
  copia (no depende de `pagina.css`).

- [ ] **Step 1: Eliminar el CSS viejo de `home__nav`/`home__link`**

En `index.html:128-146`, eliminar:

```css
      .home__nav {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1.2rem;              /* SEPARACION entre los enlaces (mas = mas separados) */
        padding-top: 0.6rem;
        flex-shrink: 0;
        text-align: right;
      }
      .home__link {
        color: #8a8a8a;
        text-decoration: none;
        font-size: clamp(1.05rem, 1.7vw, 1.5rem);  /* TAMANO de los enlaces */
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        transition: color 0.25s ease;
      }
      .home__link:hover { color: var(--titulo-color); }
```

- [ ] **Step 2: Eliminar la línea muerta del media query**

En `index.html:431-435`, reemplazar:

```css
      @media (max-width: 640px) {
        .hero__head { flex-direction: column; gap: 0.8rem; }
        .home__nav { flex-direction: row; align-items: flex-start; gap: 1.4rem; }
        .hero__cover { height: 44vh; }
      }
```

por:

```css
      @media (max-width: 640px) {
        .hero__head { flex-direction: column; gap: 0.8rem; }
        .hero__cover { height: 44vh; }
      }
```

- [ ] **Step 3: Añadir el CSS del componente**

Añadir, justo antes del cierre `</style>` de `index.html` (después del bloque
`@media (max-width: 560px)` que ya existe cerca del final del `<style>`), el mismo
bloque de CSS del menú usado en `pagina.css` (Task 1, Step 4), completo y sin
modificar — mismos nombres de clase, mismas variables (`--bone`, `--ash`, `--line`,
`--bg-final` ya existen en el `:root` de `index.html` con esos mismos valores):

```css

      /* =========================================================
         MENU LATERAL — boton toggle + panel deslizante (compartido
         con pagina.css, ver docs/superpowers/specs/2026-07-09-menu-lateral-design.md)
         ========================================================= */
      .menu-toggle {
        position: fixed;
        top: clamp(1.2rem, 3vw, 2rem);
        right: clamp(1.2rem, 3vw, 2rem);
        z-index: 60;
        background: none;
        border: 0;
        cursor: pointer;
        color: var(--bone);
        font-family: inherit;
        font-size: clamp(0.95rem, 1.6vw, 1.15rem);
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 0.3em 0.1em;
      }
      .menu-toggle:hover { color: #ffffff; }
      .menu-toggle:focus-visible { outline: 2px solid var(--bone); outline-offset: 4px; }

      .menu-overlay {
        position: fixed;
        inset: 0;
        z-index: 55;
        background: rgba(0, 0, 0, 0.6);
      }
      .menu-overlay[hidden] { display: none; }

      .menu-panel {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        height: 100dvh;
        width: min(420px, 92vw);
        background: var(--bg-final);
        border-left: 1px solid var(--line);
        padding: clamp(5rem, 12vh, 7rem) clamp(1.6rem, 4vw, 2.4rem) clamp(2rem, 6vh, 3rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        will-change: transform;
      }

      .menu-panel__list { list-style: none; }
      .menu-panel__item { border-bottom: 1px solid var(--line); }
      .menu-panel__item:first-child { border-top: 1px solid var(--line); }

      .menu-panel__link {
        display: block;
        padding: clamp(0.9rem, 2.4vh, 1.3rem) 0;
        text-decoration: none;
        color: var(--bone);
        font-size: clamp(1.5rem, 4vw, 2.1rem);
        font-weight: 600;
        letter-spacing: -0.01em;
        transition: color 0.25s ease;
      }
      .menu-panel__link .line { overflow: hidden; display: block; }
      .menu-panel__link .line > span { display: block; will-change: transform; }
      .menu-panel__num {
        display: inline-block;
        color: var(--ash);
        font-size: 0.5em;
        font-weight: 500;
        letter-spacing: 0.06em;
        margin-right: 0.5em;
        vertical-align: middle;
      }
      .menu-panel__link:hover,
      .menu-panel__link.is-active { color: #ffffff; }
      .menu-panel__link.is-active .menu-panel__num { color: var(--bone); }
      .menu-panel__link:focus-visible { outline: 2px solid var(--bone); outline-offset: 4px; }

      .menu-panel__contact {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding-top: clamp(1.2rem, 3vh, 1.8rem);
        border-top: 1px solid var(--line);
      }
      .menu-panel__contact a {
        color: var(--ash);
        text-decoration: none;
        font-size: 0.92rem;
        letter-spacing: 0.02em;
        transition: color 0.25s ease;
      }
      .menu-panel__contact a:hover { color: var(--bone); }
      .menu-panel__contact a:focus-visible { outline: 2px solid var(--bone); outline-offset: 3px; }

      @media (max-width: 640px) {
        .menu-panel { width: 100vw; border-left: 0; }
      }
```

- [ ] **Step 4: Reemplazar el markup del nav**

En `index.html:461-465`, reemplazar:

```html
            <nav class="home__nav">
              <a class="home__link" href="knox.html">Knox</a>
              <a class="home__link" href="trabajos.html">Trabajos</a>
              <a class="home__link" href="contacto.html">Contacto</a>
            </nav>
```

por:

```html
            <button type="button" id="menuToggle" class="menu-toggle" aria-expanded="false" aria-controls="menuPanel">Menú</button>
```

- [ ] **Step 5: Añadir el panel antes de los scripts finales**

En `index.html:560-561`, el archivo tiene:

```html
    <script src="./lib/lottie.min.js"></script>
    <script src="./lib/gsap.min.js"></script>
```

justo antes de esas líneas (después del cierre del `<div class="visor" ...>` que ya
existe, ver `index.html:550-556`), insertar el panel del menú:

```html
    <div class="menu-overlay" id="menuOverlay" hidden>
      <div class="menu-panel" id="menuPanel">
        <nav aria-label="Navegación principal">
          <ol class="menu-panel__list">
            <li class="menu-panel__item">
              <a class="menu-panel__link is-active" href="index.html#main">
                <span class="line"><span><span class="menu-panel__num">01</span>Home</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="knox.html">
                <span class="line"><span><span class="menu-panel__num">02</span>Knox</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="trabajos.html">
                <span class="line"><span><span class="menu-panel__num">03</span>Trabajos</span></span>
              </a>
            </li>
            <li class="menu-panel__item">
              <a class="menu-panel__link" href="contacto.html">
                <span class="line"><span><span class="menu-panel__num">04</span>Contacto</span></span>
              </a>
            </li>
          </ol>
        </nav>
        <div class="menu-panel__contact">
          <a href="https://www.instagram.com/by_kn0x/" target="_blank" rel="noopener">@by_kn0x</a>
          <a href="mailto:sencisoballesta@gmail.com">sencisoballesta@gmail.com</a>
        </div>
      </div>
    </div>
```

- [ ] **Step 6: Añadir `menu.js` después de `gsap.min.js`**

Inmediatamente después de la línea `<script src="./lib/gsap.min.js"></script>`
(la que quedó del Step 5), añadir:

```html
    <script src="./menu.js"></script>
```

- [ ] **Step 7: Verificar en el navegador**

Abrir `index.html`, dejar pasar la intro del conejo (o cargar con `#main` para
saltarla). Confirmar:
- El wordmark "BY KNOX" sigue arriba a la izquierda, "Menú" arriba a la derecha
  (donde antes estaban Knox/Trabajos/Contacto).
- Clic en "Menú" abre el panel igual que en las otras 3 páginas: cascada de los 4
  links, "01 Home" resaltado como activo, contacto (@by_kn0x / email) al fondo.
- Cierra con botón/overlay/Escape, bloquea y restaura el scroll del body.
- La sección "CORTO" (visor de video, más abajo en la página) sigue funcionando
  igual que antes — el menú no debe interferir con su lógica de apertura/cierre
  (IDs distintos: `visor`/`visorMarco` vs `menuOverlay`/`menuPanel`).
- Con `prefers-reduced-motion` emulado: sin cascada ni slide.

No hacer commit — dejar `index.html` sin trackear para revisión del usuario.

---

### Task 7: Verificación cruzada final (las 4 páginas)

**Files:** ninguno (solo verificación manual, no se edita código).

- [ ] **Step 1: Navegación real entre páginas**

Con el servidor de preview corriendo, partiendo de `index.html`: abrir el menú,
clic en "Knox" → confirmar que carga `knox.html` con "02 Knox" activo. Desde ahí,
abrir el menú y clic en "Trabajos" → `trabajos.html` con "03 Trabajos" activo. Repetir
hacia "Contacto" y de vuelta a "Home" (`index.html#main`, sin ver el conejo de nuevo).

- [ ] **Step 2: Responsive**

Con el viewport en `≤640px` (usar el modo responsive del navegador, no capturas con
Edge headless por el piso de ~492px documentado en `CONTEXTO-AGENTE.md`), abrir el
menú en cada una de las 4 páginas y confirmar que el panel ocupa `100vw` (pantalla
completa) en vez del ancho parcial de escritorio.

- [ ] **Step 3: Overflow horizontal**

En cada página, con el menú abierto, correr en la consola del navegador:

```js
document.body.scrollWidth > window.innerWidth
```

Expected: `false` en las 4 páginas (sin desborde horizontal causado por el panel).

- [ ] **Step 4: Accesibilidad básica**

En cada página: abrir el menú con el mouse, confirmar que el foco salta al primer
link del panel (se puede tabular por los 4 links + 2 contactos con Tab). Cerrar con
Escape y confirmar que el foco vuelve al botón "Menú". Confirmar que
`aria-expanded` del botón cambia entre `"false"` y `"true"`.

No hacer commit — este task es solo verificación, no debería haber cambios de
archivo pendientes salvo los ya dejados en Tasks 1-6.
