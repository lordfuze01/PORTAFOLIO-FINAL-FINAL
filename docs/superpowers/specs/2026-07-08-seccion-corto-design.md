# Spec — Sección "Corto" en index.html

Fecha: 2026-07-08 · Estado: aprobado por el usuario (diseño verbal)

## Objetivo

Nutrir la página principal añadiendo una sección debajo de la Introducción, inspirada
en orastudio.ca: texto grande a la izquierda (~1/3 del ancho) que invita a ver un corto,
y a la derecha (~2/3) una miniatura de video. Animada con **parallax continuo** ligado
al scroll usando GSAP core (no hay ScrollTrigger en el proyecto).

## Decisiones tomadas

| Tema | Decisión |
|---|---|
| Video | **Placeholder por ahora** — no existe archivo de video; se deja el hueco marcado en el código |
| Clic en miniatura | **Se expande y reproduce ahí** (lightbox casi fullscreen en la misma página) |
| Miniatura | **Bloque oscuro 16:9 + botón play** (sin imagen; degradado sutil) |
| Animación | **Parallax continuo** (scrub manual ligado al scroll, patrón de `actualizarHero()`) |

## 1. Estructura (HTML)

Nueva `<section class="corto" id="corto">` dentro de `<main>`, después de la sección
`intro`. Dos columnas en desktop:

- **Izquierda (~1/3):** texto grande, Helvetica bold, alineado a la izquierda,
  sin serif. Mismo patrón editable de la intro (`<span class="line"><span>…</span></span>`)
  con comentario `>>> COMO EDITAR LOS TEXTOS`.
  - Texto propuesto: "Conoce uno de nuestros *cortos*" (*cortos* en `<em>` cursiva).
  - Debajo, una línea pequeña de acción: "Ver corto →".
- **Derecha (~2/3):** miniatura — bloque 16:9 con fondo oscuro degradado y botón de
  play circular centrado. Hover: el play crece levemente y toma borde `--bone`.
- **Responsive ≤700px:** columnas apiladas (texto arriba, miniatura abajo, ancho completo).

## 2. Parallax continuo (JS)

- Manejador de scroll propio, mismo patrón que `actualizarHero()` — **sin tocar** esa
  función ni el observer de la intro.
- Mientras la sección cruza el viewport se calcula un progreso 0→1.
- Con `gsap.set` dentro de `requestAnimationFrame`:
  - el texto se desplaza en Y más lento que el scroll;
  - la miniatura se desplaza más rápido y escala 0.94→1 (sensación de profundidad);
  - la opacidad de entrada va ligada al progreso.
- `prefers-reduced-motion`: sin parallax; todo estático y visible.

## 3. Lightbox (clic en la miniatura)

- Clic → la miniatura se expande con GSAP hasta un overlay casi fullscreen sobre negro
  (tipo FLIP: se mide la posición inicial y se anima hasta el centro).
- Dentro: un `<video>` **sin `src` todavía**, marcado con comentario
  `>>> AQUI VA EL VIDEO`. Mientras no haya `src`, el overlay muestra el bloque
  placeholder con la leyenda "Próximamente".
- Cierre: botón ✕, tecla Escape, o clic fuera del video. La animación se revierte
  hacia la miniatura.
- El scroll del `body` se bloquea mientras el overlay está abierto.

## 4. Restricciones y no-objetivos

- No tocar: motor del hero (`actualizarHero()`), intro y su IntersectionObserver,
  animación del conejo, flujo `skip-intro`.
- Todo el CSS va en el `<style>` de `index.html` y el JS en el `<script>` existente,
  siguiendo el estilo del archivo (comentarios en español, variables `--bone`/`--ash`).
- Sin tipografías serif. Sin dependencias nuevas (solo GSAP core local).
- Los commits/push los hace el usuario.

## Criterio de éxito

Al bajar desde la intro, el texto y la miniatura entran con velocidades distintas
(parallax visible), el hover del play responde, el clic abre el lightbox con
"Próximamente" y se cierra por los tres caminos, sin romper hero ni intro, y sin
overflow horizontal en móvil (verificar `document.body.scrollWidth`, no capturas de
Edge headless <492px).
