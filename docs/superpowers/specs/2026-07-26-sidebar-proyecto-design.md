# Sidebar de navegación en páginas de proyecto — Design Spec

> Fecha: 2026-07-26
> Estado: Aprobado por el usuario, pendiente de implementación.

## Qué es

Una sidebar vertical a la izquierda para navegar dentro de una página de proyecto,
que además obliga a explicar cada proyecto con más profundidad (hoy son solo
eyebrow + título + lead + chips + galería). Inspirada en el componente React
`LineSidebar` que trajo el usuario como referencia (lista de items con efecto de
proximidad al cursor: el item bajo el mouse, y los vecinos atenuados por
distancia, se resaltan y desplazan con suavizado cuadro a cuadro), re-implementada
en vanilla JS + GSAP siguiendo el mismo criterio que ya se usó para el botón
"specular" y la galería Masonry de `index.html` (puerto sin React, mismo
comportamiento).

## Alcance

- **Páginas afectadas:** `especiferal.html`, `mordiendo.html`, `elsabio.html`
  (las 3 páginas de detalle de proyecto).
- **No afecta:** `index.html`, `knox.html`, `trabajos.html`, `contacto.html`.
- El bloque actual de cabecera (`eyebrow` + `page__title` + primer párrafo) se
  queda arriba, a todo el ancho, igual que hoy. Debajo, la página pasa de una
  columna centrada a **dos columnas**: sidebar (izquierda) + contenido (derecha).

## Secciones (fijas, iguales en las 3 páginas)

Mismo set de 5 secciones en las 3 páginas — no varían por tipo de proyecto,
aunque el texto de cada una sí se adapta al proyecto. Orden de arriba a abajo,
tanto en la página como en la sidebar:

| # | Sección | Contenido |
|---|---------|-----------|
| 01 | **Concepto** | El `page__lead` actual se muda aquí (ya es el concepto en una frase) + espacio para más texto |
| 02 | **Proceso** | Nueva. Placeholder |
| 03 | **Herramientas** | Los `chips` actuales (fechas/software) se muestran aquí + espacio para texto |
| 04 | **Producto final** | Nueva. Placeholder |
| 05 | **Galería** | La galería `.galeria` que ya existe, con un `<h2>` visible agregado (hoy solo tiene `aria-label`, sin título en pantalla) |

Cada sección nueva (Proceso, Producto final) y el texto extra de Concepto/
Herramientas llevan el mismo patrón de comentario que ya usa el sitio para
marcar contenido pendiente (ej. `>>> AQUI VAN LAS FOTOS` en la galería):
`>>> EDITA AQUI: texto real del proyecto` + un placeholder corto tipo
"Próximamente". **No se inventa copy real de los proyectos** — el usuario
completa el texto después.

En `elsabio.html` (proyecto sin contenido, "Próximamente") las 5 secciones se
crean igual, todas con el placeholder — mismo criterio que ya tiene esa página
hoy con la galería.

## Estructura de página

```
.page (header, ancho completo, como hoy)
  eyebrow / page__title

.page-body (nuevo, dos columnas desde 820px)
  ├─ aside.line-sidebar (sticky, izquierda)
  │    5 items: Concepto · Proceso · Herramientas · Producto final · Galería
  └─ .page-content (derecha)
       ├─ section#concepto
       ├─ section#proceso
       ├─ section#herramientas
       ├─ section#producto-final
       └─ section#galeria (la .galeria existente + <h2>)

.next "Siguiente proyecto" + footer (ancho completo, como hoy, fuera de .page-body)
```

## Comportamiento de la sidebar

- **Posición:** `position: sticky` dentro de la columna izquierda, pegada justo
  debajo de `.site-header` (que también es `sticky; top:0`) — mismo patrón que
  `.hero__sticky` en `index.html`. El `top` exacto se calcula en JS a partir de
  `site-header.offsetHeight` (no un valor fijo en CSS), porque el alto del
  header cambia entre breakpoints (`padding` distinto en `≤640px`); mismo
  criterio que ya usa el `flow-menu` de `index.html` para medir offsets reales
  en vez de asumir un número. Sube con la página hasta topar bajo el header y
  ahí se queda fija mientras el contenido de la derecha sigue scrolleando.
- **Efecto de proximidad al cursor:** puerto fiel del componente de referencia —
  al mover el mouse sobre la lista, cada item calcula su distancia al cursor y
  un rAF loop (`exponential smoothing`, igual criterio que el original) anima
  color/desplazamiento/escala hacia ese valor. Colores tomados de las variables
  del sitio en vez del morado (`#A855F7`) del original — ver "Estilo visual".
- **Scrollspy:** el item activo se actualiza solo según qué `section` está en
  el viewport, con `IntersectionObserver` — mismo patrón que ya usa
  `index.html` para el manifiesto y el footer "Cierre" (no el `.reveal` de
  `pagina.css`, que es una animación de entrada sin scroll-tracking). Sin
  ScrollTrigger (la lib local solo trae el core de GSAP).
- **Click:** hace `scrollIntoView({ behavior: 'smooth' })` a la sección
  correspondiente y la marca activa de inmediato (no espera al observer).
- **`prefers-reduced-motion: reduce`:** se desactiva el suavizado del rAF y el
  desplazamiento por proximidad; el item activo se marca solo con un estilo
  CSS fijo (color/borde), sin animación — mismo criterio que el resto del
  sitio (manifiesto, footer, botón specular, masonry).

## Mobile (`max-width: 820px`, mismo breakpoint donde ya colapsan `.galeria--2` / `.grid--2`)

La sidebar deja de ser una columna fija y se convierte en una barra horizontal
con scroll (chips clickeables, mismas 5 secciones) pegada arriba de
`.page-content`, debajo del `site-header`. Sin efecto de proximidad al cursor
(no aplica en touch): solo click-to-scroll + resaltado del item activo por
scrollspy, con transición CSS simple.

## Estilo visual

- **Paleta:** se reemplaza el `accentColor` morado del componente original por
  `--bone` (texto/acento activo) y `--muted`/`--ash` (texto inactivo), ya
  definidos en `pagina.css`. Marcador y líneas separadoras con `--line`.
- **Índices numerados** (`01, 02, 03...`) se mantienen del original — coherente
  con el resto del sitio (`work__index`, `menu-panel__num`).
- Tipografía heredada del sitio (Helvetica, sin serif).

## Implementación

`especiferal.html`, `mordiendo.html` y `elsabio.html` ya comparten `pagina.css`
y cargan `lib/gsap.min.js` + `menu.js`. La sidebar se construye como pieza
compartida en vez de duplicar código en cada HTML:

- **CSS:** nuevo bloque en `pagina.css` (`.line-sidebar` y variantes), mismo
  archivo donde ya vive el resto del estilo de estas páginas.
- **JS:** nuevo archivo `sidebar.js` (mismo criterio que `menu.js`), cargado
  junto a `gsap.min.js` en las 3 páginas. Contiene el rAF loop de proximidad,
  el `IntersectionObserver` del scrollspy y el scroll suave al click.
- **HTML:** cada página de proyecto agrega el `<aside class="line-sidebar">`
  con sus 5 items y envuelve las secciones existentes/nuevas en
  `.page-content`. La estructura (items, ids de sección, orden) es idéntica en
  las 3 páginas — lo único que cambia entre páginas es el texto dentro de cada
  sección.

## No-alcance (fuera de esta spec)

- No se escribe el texto real de Concepto/Proceso/Herramientas/Producto final
  de Especiferal ni de Mordiendo el polvo — el usuario lo completa después
  (placeholders + comentario `>>> EDITA AQUI`).
- No se agregan más secciones que las 5 acordadas (se descartó "Créditos").
- No se toca `trabajos.html`, `knox.html`, `contacto.html` ni `index.html`.
- No se replica el `falloff` configurable (`linear/smooth/sharp`) como prop
  pública editable — se fija `smooth` (el default del original) a menos que
  se pida lo contrario.

## Verificación (sitio estático, sin test runner)

- Abrir las 3 páginas de proyecto, confirmar que la sidebar aparece con los 5
  items en el orden correcto (Concepto arriba, Galería abajo) y que el efecto
  de proximidad se siente igual de suave que en el componente de referencia.
- Mover el mouse por la lista sin hacer click: verificar que el resaltado seguí
  al cursor y vuelve a cero al salir de la lista (`pointerleave`).
- Hacer scroll manual por la página: el item activo debe cambiar solo al
  pasar de una sección a otra.
- Click en cada item: debe scrollear suave a la sección y marcarla activa al
  toque.
- Achicar la ventana a ≤820px: la sidebar debe convertirse en barra horizontal
  con scroll, sin efecto de proximidad, y seguir marcando el item activo por
  scrollspy.
- Emular `prefers-reduced-motion: reduce` (DevTools): sin suavizado rAF ni
  desplazamiento, solo el estado activo por CSS.
- Verificar `elsabio.html` (proyecto sin contenido real): la sidebar y las 5
  secciones existen igual, todas con placeholder.
- Medir `document.body.scrollWidth` vs. viewport tras el cambio (gotcha ya
  documentado en `CONTEXTO-AGENTE.md`: falsos desbordes horizontales).
