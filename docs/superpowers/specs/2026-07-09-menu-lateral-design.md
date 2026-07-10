# Menú lateral "BY KNOX" — Design Spec

> Fecha: 2026-07-09
> Estado: Aprobado por el usuario, pendiente de implementación.

## Qué es

Un menú lateral (panel deslizante desde la derecha) que reemplaza toda la navegación
actual del sitio (`home__nav` en `index.html` e `site-header__nav` en las subpáginas)
por un único componente consistente en las 4 páginas. Inspirado en el componente React
`StaggeredMenu` que trajo el usuario como referencia, pero re-implementado en vanilla
JS + GSAP (sin framework, sin build), reutilizando patrones ya existentes en el sitio.

## Alcance

- **Páginas afectadas:** `index.html`, `knox.html`, `trabajos.html`, `contacto.html`.
- **Reemplaza:**
  - En `index.html`: `<nav class="home__nav">` (Knox / Trabajos / Contacto, arriba a
    la derecha junto al wordmark).
  - En `knox.html` / `trabajos.html` / `contacto.html`: `<nav class="site-header__nav">`
    dentro de `<header class="site-header">`. El `site-header__brand` ("KNOX", link a
    `index.html#main`) se mantiene a la izquierda.
- **No afecta:** `<nav class="intro__links">` al final de la sección Introducción en
  `index.html` — son enlaces de contenido, no de navegación del sitio, se quedan igual.

## Paleta y tipografía (reutilizada, no se crea nada nuevo)

Ya definida en `:root` de cada página (confirmado en `index.html`, `knox.html`,
`pagina.css` — las 4 páginas usan fondo negro):

- `--bg` / `--bg-final`: `#000000` — fondo del panel.
- `--bone`: `#ECE7DF` — texto principal de los links.
- `--ash`: `#7c7c7c` — números de los links y bloque de contacto.
- `--line`: `rgba(236, 231, 223, 0.16)` — hairlines entre links.
- Tipografía: `'Helvetica Neue', Helvetica, Arial, sans-serif` (regla del usuario:
  sin serif, en todo el sitio).

## Estructura del componente

### Botón toggle
- Texto plano "Menú" (sin ícono), cambia a "Cerrar" cuando el panel está abierto.
- Posición fija arriba a la derecha, en las 4 páginas, en el lugar donde hoy está el
  nav que reemplaza.
- Mismo tratamiento tipográfico que los enlaces actuales (`home__link` / `site-header__nav a`).

### Panel
- Se desliza desde el borde derecho del viewport.
- Ancho: `min(420px, 92vw)` en desktop/tablet; `100vw` en `≤560px` (mismo breakpoint
  que ya usa `intro__links` para apilarse).
- Alto completo: `100dvh`.
- Fondo `--bg-final` (negro), texto `--bone`.
- Overlay detrás del panel: negro semitransparente (~60% opacidad) sobre el resto de
  la página, click en el overlay cierra el menú.

### Contenido del panel
1. **Lista de navegación**, numerada estilo editorial:
   ```
   01  Home
   02  Knox
   03  Trabajos
   04  Contacto
   ```
   - Número en `--ash`, texto del link en `--bone`, tamaño grande (similar a
     `.intro__title`, con `clamp(...)`).
   - Separador hairline `--line` entre cada item.
   - El link de la página actual se marca como activo (mismo criterio visual que
     `.is-active` ya usado en `site-header__nav`).
2. **Bloque de contacto** (equivalente a `socialItems` del ejemplo React), al fondo
   del panel, en `--ash`, tamaño menor:
   - Instagram `@by_kn0x` → `https://www.instagram.com/by_kn0x/`
   - Email `sencisoballesta@gmail.com` → `mailto:sencisoballesta@gmail.com`
   (mismos datos que ya existen en `contacto.html`, no se inventan nuevos).

### Botón de cierre
- Dentro del panel, arriba (texto "Cerrar", ya cubierto por el toggle que cambia de
  estado — no hay un botón ✕ adicional, el mismo botón que abre sirve para cerrar).

## Interacción y cierre

Reutiliza el patrón ya usado en el "visor" de video (lightbox) descrito en
`CONTEXTO-AGENTE.md`:
- Cierra con: click en el botón "Cerrar", click en el overlay, o tecla `Escape`.
- Bloquea el scroll del `body` mientras el panel está abierto (misma técnica que el visor).

## Animación (GSAP, ya cargado localmente en `lib/gsap.min.js`)

- **Apertura:** `gsap.to` anima el panel de `translateX(100%)` a `translateX(0)`.
- **Cascada de links:** cada link va envuelto en `<span class="line"><span>…</span></span>`
  (idéntico al patrón ya usado en `.intro__title` / `.intro__lead`), con
  `overflow:hidden` como máscara. Tras terminar la entrada del panel, un
  `gsap.to(..., {stagger: ...})` revela los links uno tras otro (subiendo, igual que
  en la Introducción).
- **Cierre:** animación inversa simple (panel sale hacia la derecha), sin cascada de
  salida (para que se sienta rápido).
- **`prefers-reduced-motion: reduce`:** el panel aparece/desaparece sin transición de
  posición ni cascada — mismo criterio que ya aplica la sección Introducción.

## No-alcance (fuera de esta spec)

- No se replica el efecto de "capas de color" en cascada del componente React
  original (decisión del usuario: cascada simple de texto, sin capas adicionales).
- No se agregan redes sociales nuevas (GitHub/LinkedIn del ejemplo no aplican a
  este portafolio).
- No se modifica `intro__links` ni la lógica del hero/manifiesto existente.

## Verificación (sitio estático, sin test runner)

- Abrir cada una de las 4 páginas, verificar que el botón "Menú" reemplaza al nav
  anterior y que el panel se ve y anima igual en las 4.
- Verificar navegación real: cada link lleva a la página correcta, el estado activo
  se marca bien en cada subpágina.
- Verificar cierre por las 3 vías (botón, overlay, Escape) y que el scroll del body
  queda bloqueado/restaurado correctamente.
- Verificar responsive en `≤560px` (panel a `100vw`).
- Verificar `prefers-reduced-motion` (DevTools → emular) sin cascada ni slide.
- Medir `document.body.scrollWidth` vs viewport tras abrir el panel para descartar
  overflow horizontal (gotcha ya documentado en `CONTEXTO-AGENTE.md` sobre falsos
  desbordes en capturas con Edge headless).
