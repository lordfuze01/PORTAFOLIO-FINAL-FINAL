---
name: BY KNOX
description: Portafolio de dirección creativa de Santiago Enciso — la sala oscura donde solo la imagen emite luz.
colors:
  grafito-profundo: "#1E1E20"
  grafito-elevado: "#2A2A2C"
  marfil-archivo: "#ECE7DF"
  blanco-titular: "#F9F8F6"
  terracota-encendida: "#C4622E"
  gris-lectura: "#a6a6a6"
  gris-nota: "#7c7c7c"
  gris-pie: "#666666"
  hairline-marfil: "rgba(236, 231, 223, 0.16)"
  hairline-grafito: "#3D3D3F"
  blanco-apertura: "#FFFFFF"
  tinta-apertura: "#111114"
typography:
  display:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 15vw, 14rem)"
    fontWeight: 800
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.8rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.4rem, 4.5vw, 3.1rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  cta:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.6rem, 13vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.22em"
rounded:
  sm: "2px"
  md: "4px"
  lg: "18px"
  full: "999px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 3.5rem)"
  grid-gap: "1.25rem"
  row-y: "clamp(1.4rem, 4vw, 2.4rem)"
  section-y: "clamp(1.6rem, 4vw, 2.6rem)"
  block-y: "clamp(2.5rem, 6vw, 4.5rem)"
  hero-y: "clamp(5rem, 14vh, 10rem)"
components:
  row-index:
    textColor: "{colors.blanco-titular}"
    typography: "{typography.headline}"
    padding: "clamp(1.4rem, 4vw, 2.4rem) 0.4rem"
  row-index-hover:
    textColor: "{colors.blanco-titular}"
    padding: "clamp(1.4rem, 4vw, 2.4rem) 0.4rem clamp(1.4rem, 4vw, 2.4rem) 1.4rem"
  button-specular:
    backgroundColor: "transparent"
    textColor: "{colors.blanco-titular}"
    rounded: "{rounded.lg}"
    padding: "18px 40px"
  button-specular-lg:
    backgroundColor: "transparent"
    textColor: "{colors.blanco-titular}"
    rounded: "{rounded.lg}"
    padding: "clamp(20px, 2.4vw, 28px) clamp(44px, 5vw, 60px)"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.gris-lectura}"
    rounded: "{rounded.sm}"
    padding: "0.35rem 0.75rem"
  site-header:
    backgroundColor: "rgba(30, 30, 32, 0.72)"
    textColor: "{colors.blanco-titular}"
    padding: "1.4rem clamp(1.25rem, 5vw, 3.5rem)"
  menu-panel:
    backgroundColor: "{colors.grafito-profundo}"
    width: "min(420px, 92vw)"
    padding: "clamp(5rem, 12vh, 7rem) clamp(1.6rem, 4vw, 2.4rem) clamp(2rem, 6vh, 3rem)"
  menu-link:
    textColor: "{colors.marfil-archivo}"
    padding: "clamp(0.9rem, 2.4vh, 1.3rem) 0"
  menu-link-hover:
    textColor: "{colors.blanco-titular}"
  flow-menu-link:
    textColor: "{colors.marfil-archivo}"
    typography: "{typography.headline}"
    padding: "clamp(1rem, 3.5vh, 1.8rem) 1rem"
  flow-menu-marquee:
    backgroundColor: "{colors.marfil-archivo}"
    textColor: "{colors.grafito-profundo}"
  cta-cierre:
    backgroundColor: "transparent"
    textColor: "{colors.marfil-archivo}"
    typography: "{typography.cta}"
    padding: "clamp(1.6rem, 5vh, 3rem) 1rem"
  cta-cierre-hover:
    backgroundColor: "{colors.marfil-archivo}"
    textColor: "{colors.grafito-profundo}"
  gallery-item:
    backgroundColor: "{colors.grafito-elevado}"
    textColor: "{colors.gris-nota}"
    rounded: "{rounded.md}"
  status-dot:
    backgroundColor: "{colors.terracota-encendida}"
    rounded: "{rounded.full}"
    size: "8px"
  lightbox-nav:
    backgroundColor: "transparent"
    textColor: "{colors.marfil-archivo}"
    rounded: "{rounded.full}"
    size: "48px"
---

# Design System: BY KNOX

## Overview

**Creative North Star: "La sala oscura"**

El sitio es un cuarto de revelado. Todo lo que no es imagen se apaga hasta quedar en
grafito (#1E1E20), para que lo único que emita luz sea el trabajo: la portada que crece
con el scroll, las fotos del archivo, el conejo. La terracota funciona como la luz de
seguridad de un laboratorio fotográfico: está siempre encendida, pero es tan escasa que
cuando aparece —una cursiva, el punto de disponibilidad, el anillo de foco— se nota.

La densidad es baja a propósito. El contenido respira en un contenedor de 1120px, pero
las líneas que lo separan se salen hasta el borde real de la ventana: el texto lee
centrado y calmado mientras la retícula corta la pantalla entera. No hay tarjetas, no hay
cajas, no hay íconos decorativos. La unidad de construcción es la **fila separada por una
hairline**, que se desliza a la derecha cuando el cursor la toca y atenúa a sus hermanas
—el mismo gesto en trabajos, contacto, menú, ficha y "siguiente proyecto"—. El tipo es
una sola familia (Helvetica Neue) empujada a sus extremos: 800 con tracking negativo para
los titulares, versalita de 0.8rem con tracking ancho para todo lo que sea metadato.

El único momento en que el sistema abandona el grafito es la apertura: la pantalla del
conejo es blanco puro, y existe para apagarse. Después de eso, el blanco máximo del sitio
es marfil, nunca #FFF. Ese contraste —el paso de la sala iluminada a la sala oscura— es
la entrada a la marca, no un preloader.

**Key Characteristics:**

- Grafito dominante, marfil para leer, terracota por debajo del 10%.
- Una sola familia tipográfica, llevada de 400 a 800 sin pedir refuerzos.
- Hairlines en vez de bordes; filas en vez de tarjetas.
- Las líneas sangran al borde de la ventana; el texto se queda centrado.
- Las cursivas son semánticas y siempre terracota: marcan la palabra que carga el sentido.
- Metadato en versalita ancha; titulares en negrilla apretada. Nunca al revés.
- La imagen es la única fuente de luz de la página.

**Anti-referencias confirmadas (nunca).** Estética SaaS/startup, plantilla de portafolio
(Wix/Squarespace/Framer de fábrica), brutalismo ruidoso y agencia corporativa. Las cuatro
son rechazos duros del sistema, no preferencias.

## Colors

Una paleta de tres voces —grafito, marfil, terracota— con una escala de grises de trabajo
entre ellas; la disciplina 60-30-10 está escrita en el CSS y es normativa.

### Primary

- **Terracota Encendida** (#C4622E): el único acento del sistema. Vive en las cursivas de
  énfasis (`em` es terracota globalmente), el punto de disponibilidad que pulsa, el
  `outline` de foco visible, el `::selection` (la marca aparece hasta al copiar texto), el
  marcador activo de la sidebar de proyecto y la etiqueta de una fila de contacto en
  hover. Nunca como fondo de un área grande.

### Neutral

- **Grafito Profundo** (#1E1E20): el fondo de todo el sitio y el color del `theme-color`
  del navegador. Es el 60% dominante y la sala en la que ocurre todo.
- **Grafito Elevado** (#2A2A2C): superficie apenas por encima del fondo. Fondo de tarjeta
  declarado y base de los placeholders de galería (junto a #242426 / #2c2c2e en la trama
  diagonal de "Próximamente").
- **Marfil de Archivo** (#ECE7DF): el blanco cálido de lectura. Manifiesto, enlaces del
  menú, marco del bloque "Detrás de Knox", franja del marquee. Es el color con el que la
  marca habla.
- **Blanco Titular** (#F9F8F6): el blanco máximo del sitio, reservado a titulares,
  wordmark y estados hover/activo. Un grado por encima del marfil, nunca puro.
- **Gris Lectura** (#a6a6a6): texto secundario y párrafos de las páginas internas.
- **Gris Nota** (#7c7c7c): metadato de bajo peso — numeración del menú, índices de la
  sidebar, eyebrow del archivo, servicios y datos del cierre.
- **Gris Pie** (#666666): línea legal y ciudad en los footers. El escalón más bajo.
- **Hairline Marfil** (rgba(236, 231, 223, 0.16)): la línea fina sobre grafito en
  `index.html`. Marfil translúcido, no gris: la línea es del mismo material que el texto.
- **Hairline Grafito** (#3D3D3F): la misma línea en las páginas internas, resuelta en
  opaco.
- **Blanco Apertura** (#FFFFFF) y **Tinta de Apertura** (#111114): existen únicamente en
  la pantalla de bienvenida del conejo. Fuera de esa pantalla no aparecen jamás.

### Named Rules

**La regla del 10%.** Terracota Encendida nunca ocupa más del 10% de una pantalla. Su
escasez es la razón por la que funciona. Test: si en una captura de pantalla la terracota
se lee como "un color del sitio" y no como "un detalle que resalta", se rompió la regla.

**La regla del blanco único.** #FFFFFF solo existe en la pantalla del conejo. En cualquier
otro lugar el blanco es Blanco Titular (#F9F8F6) o Marfil de Archivo (#ECE7DF). Un
`#fff` suelto en el CSS del sitio es un error, no un atajo.

**La regla de la línea de marfil.** Las hairlines no son grises neutros: son el color del
texto bajado en opacidad. Al agregar una línea nueva, derivarla del marfil, no de un gris
inventado.

## Typography

**Display / Body / Label Font:** 'Helvetica Neue', Helvetica, Arial, sans-serif — una sola
familia para todo el sitio.
**Fuente variable (excepción localizada):** 'Roboto Flex Variable', autohospedada en
`lib/roboto-flex-variable.woff2` (`wght` 100–1000, `wdth` 25–151%). Existe solo para el
titular con efecto de presión de `knox.html`; no es una segunda fuente del sistema.

**Character:** Helvetica llevada a sus dos extremos y nada en el medio. Arriba, 700–800
con tracking negativo (hasta -0.04em) y interlineado por debajo de 1: bloques compactos y
pesados que funcionan como imagen. Abajo, 0.74–0.82rem en mayúsculas con tracking de
0.14em a 0.28em: metadato que se lee como pie de foto de catálogo. El contraste entre esos
dos registros es toda la jerarquía; no hace falta una segunda familia.

### Hierarchy

- **Display** (800, clamp(2.6rem, 15vw, 14rem), lh 0.82, ls -0.04em, mayúsculas): el
  wordmark "BY KNOX" del hero. Un solo uso en todo el sitio.
- **CTA** (800, clamp(2.6rem, 13vw, 7.5rem), lh 1, ls -0.03em): reservado a la fila de
  cierre que lleva a contacto. Es el segundo pico tipográfico de la home —por debajo del
  wordmark, por encima del flow menu— y existe un solo uso. Si aparece un segundo, deja
  de ser el paso final.
- **Headline** (700–800, clamp(1.8rem, 6vw, 5.5rem), lh 1.02, ls -0.02/-0.03em): títulos
  de página, nombres del índice de trabajos, filas del flow menu, manifiesto de la home.
- **Title** (700–800, clamp(1.4rem, 4.5vw, 3.1rem), lh 1.12, ls -0.02em): el `statement`
  ("Human Centered."), los valores de contacto, "Siguiente proyecto".
- **Body** (400, clamp(1.05rem, 2.2vw, 1.3rem), lh 1.6, máx. 60ch): leads y párrafos, en
  Gris Lectura. El manifiesto de la home se corta a 52ch por ir centrado; el bloque de
  Knox, a 46ch.
- **Label** (400, 0.74–0.82rem, ls 0.14–0.28em, mayúsculas, gris): eyebrows, fechas y
  herramientas de la ficha, categorías del índice, disponibilidad, chips, pista de scroll.

### Named Rules

**La regla sin serif.** Nunca una tipografía serif, en ningún rol: ni display, ni cita, ni
acento, ni firma. Es una regla del autor, no una preferencia estilística.

**La regla de la cursiva con sentido.** La cursiva no decora: marca la palabra que carga
el argumento (*humano*, *sentirnos humanos*, *sentido*, *design thinking*) y va siempre en
terracota — `em { font-style: italic; color: var(--accent) }` es global en los dos
stylesheets. Nunca poner en cursiva una frase entera ni usarla por ritmo.

**La regla de la versalita.** Todo lo que sea metadato —fecha, categoría, herramienta,
estado, eyebrow— va en mayúsculas, ≤0.82rem, tracking ≥0.14em y en gris. Nunca en el color
del texto principal y nunca en negrilla.

## Layout

Contenedor centrado de **1120px** (`--max`) con margen lateral fluido
`clamp(1.25rem, 5vw, 3.5rem)`, compartido por `.page`, `.site-header` y `.site-footer`.
El ritmo vertical es todo `clamp()`, no una escala numérica: filas en
`clamp(1.4rem, 4vw, 2.4rem)`, secciones en `clamp(1.6rem, 4vw, 2.6rem)`, divisores en
`clamp(2.5rem, 6vw, 4.5rem)` y las secciones centradas de la home en
`clamp(5rem, 14vh, 10rem)`. Las galerías y grids usan un gap fijo de 1.25rem.

El hero de la home no es una sección normal: mide 230dvh de recorrido con un
`.hero__sticky` de 100dvh adentro, y un motor de scroll manual en rAF lleva la foto de
56vh a 100vh mientras le quita el `brightness(0.55) blur(3px)` inicial. Ese recorrido es
la primera unidad de lectura del sitio.

**Breakpoints reales:** 820px (grids a una columna, ficha apilada, sidebar de proyecto a
franja horizontal, marco de Knox a una columna), 640px (categoría del índice debajo del
nombre, contacto en dos líneas, panel de menú a 100vw, hero a 44vh) y 560px (márgenes
laterales mínimos del manifiesto). En escritorio, la página de proyecto es una franja
sticky de 226px + contenido de máx. 854px con 40px de gap.

### Named Rules

**La regla de sangrar.** Las estructuras de navegación e índice se salen del contenedor
centrado hasta el borde real de la ventana; el JS mide el offset y lo compensa con un
`margin-left` negativo (flow menu, `.page-body` de la sidebar, marco de Knox). El texto se
queda centrado y tranquilo; las líneas cortan la ventana entera. Ese desajuste deliberado
es lo que impide que el sitio lea como una plantilla de una sola columna.

**La regla del sticky nativo.** La sidebar de proyecto usa `position: sticky` puro. Está
prohibido reimplementarla con scroll + JS: cualquier imitación va un frame detrás del
scroll real y produce el temblor que ya se corrigió una vez.

## Elevation & Depth

Hoy el sistema es plano por construcción. La profundidad no viene de sombras sino de tres
recursos: **hairlines** que separan sin encerrar, **capas de tono** muy cercanas entre sí
(#1E1E20 → #2A2A2C, y los overlays `rgba(30,30,32,0.6/0.72/0.88/0.92)`) y **desenfoque de
fondo** (`backdrop-filter: blur(8–10px)` en el header sticky y en la franja móvil de la
sidebar). Solo dos elementos llevan sombra real: el botón specular y la imagen del
lightbox.

**Decisión del autor:** el sistema queda **abierto a más profundidad**. Las superficies
que hoy son planas —galería, fichas, contenedores— pueden recibir sombra suave cuando eso
ayude a separarlas del fondo. Lo que no cambia es el carácter de la sombra.

### Shadow Vocabulary

- **Ambiental de superficie** (`box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18)`): paso
  autorizado, aún no implementado. Para galería, fichas o contenedores que necesiten
  despegarse del grafito sin volverse tarjetas.
- **Ambiental de control** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 24px rgba(0,0,0,0.25)`):
  el botón specular. El `inset` claro de 1px es el filo de luz superior; no se elimina.
- **Flotante** (`box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6)`): la imagen del lightbox y
  cualquier pieza que se superponga a toda la página.

### Named Rules

**La regla de la sombra sin borde.** Toda sombra es difusa (blur ≥ 16px), negra pura y de
baja opacidad. Nunca una sombra corta y dura que dibuje un contorno, y nunca una sombra
con tinte de color. Si la sombra se lee como un borde, está mal hecha.

**La regla de la capa cercana.** Las superficies elevadas se separan por tono en pasos
mínimos (12 puntos de luminancia entre #1E1E20 y #2A2A2C). Un salto grande de valor rompe
la sala oscura.

## Shapes

El lenguaje formal es casi recto, con radios que crecen según qué tan "encima" de la
página está el elemento: 2px en chips, 4px en todo lo que muestra imagen (galería,
masonry, vista previa flotante, lightbox), 18px en el botón specular y círculo completo en
el punto de disponibilidad y en los controles del lightbox.

**El proyecto no adopta una doctrina única de radio.** Cada componente elige el suyo según
convenga; esta sección describe los valores en uso, no una regla que los uniforme. Lo que
sí es estable: los bordes son hairlines de 1px (`--line`), nunca gruesos, y las divisiones
estructurales son líneas —`border-top` / `border-bottom`— y no contenedores cerrados.

La única forma pesada del sistema es el **marco de marfil** del bloque "Detrás de Knox":
un rectángulo de 15px a los lados y ~100px arriba y abajo, con un lienzo grafito adentro.
Es una pieza enmarcada, y su asimetría (fino a los lados, grueso arriba y abajo) es
deliberada.

## Components

### Fila de índice (componente firma)

- **Carácter:** la unidad base de todo el sitio. Antes de construir una tarjeta, preguntar
  si puede ser una fila.
- **Forma:** sin radio ni fondo. `border-top: 1px solid var(--line)` en cada ítem y
  `border-bottom` en el último, de modo que la lista se lee como una tabla sin tabla.
- **Estructura:** grid de tres columnas — índice (`01`, 0.85rem, gris) · nombre
  (Headline, 800) · categoría (Label, alineada a la derecha).
- **Hover:** la fila entera se desliza `padding-left: 1.4rem` con
  `cubic-bezier(0.16, 1, 0.3, 1)` en 0.4s **y todas las hermanas bajan a `opacity: 0.35`**
  mientras la activa se queda en 1. El foco se gana quitándoselo a las demás.
- **Móvil (≤640px):** la categoría pasa debajo del nombre, alineada con él; nunca se
  comprime en su columna.
- **Dónde vive:** índice de trabajos, filas de contacto, enlaces del menú lateral, ficha
  técnica y "Siguiente proyecto".

### Fila de cierre (componente firma)

- **Carácter:** el paso final de la home y el único punto donde el sistema se invierte.
  No es un botón: es una fila a todo el ancho, del mismo material que el flow menu, en
  escala CTA.
- **Forma:** hairline arriba y abajo, sin radio ni fondo en reposo, texto marfil centrado
  a `clamp(2.6rem, 13vw, 7.5rem)`. Sale del padding lateral del cierre negándolo exacto
  (`margin: … calc(-1 * clamp(1.4rem, 6vw, 4rem))`), sin JS.
- **Hover / Focus:** el fondo se llena de Marfil de Archivo y el texto pasa a Grafito
  Profundo en 0.45s con `cubic-bezier(0.16, 1, 0.3, 1)`; la flecha avanza 0.18em. El
  teclado recibe exactamente el mismo estado, más un `outline` de terracota a -6px.
- **Relación con el flow menu:** mismo material, temperamento opuesto. Las filas del
  índice tantean —la franja entra desde el borde más cercano al cursor y el texto corre en
  marquee—; la de cierre no tantea: llega entera y se queda. Es la única vez en todo el
  sitio en que se prende la luz de la sala oscura, y por eso no puede repetirse.

### Buttons

- **Forma:** radio de 18px (`--sb-radius`), sin borde, fondo transparente con
  `color-mix` sobre `--sb-tint`.
- **Primario (specular):** el único botón del sitio, en la sección de archivo. Texto
  Blanco Titular, peso 500, `padding: 18px 40px` (lg: `clamp(20px,2.4vw,28px)
  clamp(44px,5vw,60px)`), con un anillo de luz cónico que gira en 3.5s y un brillo WebGL
  (`lib/ogl.min.js`) que sigue el cursor cuando hay WebGL2.
- **Degradación:** sin WebGL2 o con `prefers-reduced-motion`, el botón conserva forma,
  sombra y anillo estático a 35deg. Nunca queda sin identidad.
- **Hover / Active / Focus:** la flecha `→` avanza 6px en 0.35s; `:active` escala a 0.97;
  `:focus-visible` traza un outline al 60% del color de texto con 3px de offset.

### Chips

- **Estilo:** solo contorno — `1px solid var(--line)`, radio 2px, sin fondo, texto Label en
  Gris Lectura, `padding: 0.35rem 0.75rem`.
- **Estado:** no tienen estados. Son etiquetas de lectura (fechas, herramientas), no
  filtros ni acciones. Si algo necesita seleccionarse, no es un chip.

### Cards / Containers

El sistema **no tiene tarjetas**. `--card` (#2A2A2C) está declarado y se usa como base de
los placeholders de galería, pero no existe ningún contenedor con fondo, sombra y radio
que agrupe contenido. Los agrupamientos se hacen con líneas y espacio.

El **item de galería** es lo más cercano: `aspect-ratio` 4/3 (la variante ancha, 16/9),
`1px solid var(--line)`, radio 4px y una trama diagonal a 45° (#242426 / #2c2c2e) con la
palabra "Próximamente" en versalita mientras no hay foto. Al llegar la imagen real, el
`<img>` con `object-fit: cover` la tapa por completo.

### Inputs / Fields

No existen. El sitio no tiene formularios: el contacto son enlaces `mailto:`, `tel:` y
externos, tratados como filas de índice. Si algún día hace falta un campo, debe heredar el
lenguaje de la fila —hairline inferior, sin caja, foco en terracota— y no una caja con
fondo.

### Navigation

- **Header:** sticky, `rgba(30,30,32,0.72)` con `backdrop-filter: blur(10px)` y hairline
  inferior. Marca "KNOX" a la izquierda en 0.95rem, peso 800, tracking 0.18em.
- **Botón hamburguesa:** fijo arriba a la derecha, tres barras de 26×2px en marfil que se
  cruzan en aspa con `cubic-bezier(0.65, 0, 0.35, 1)` cuando `aria-expanded="true"`.
- **Panel lateral:** entra desde la derecha (`min(420px, 92vw)`; 100vw en ≤640px), fondo
  grafito, hairline izquierda. Los cuatro enlaces son filas numeradas (`01`–`04` en Gris
  Nota a 0.5em) que se revelan con `yPercent` escalonado a 0.06s. El activo y el hover van
  a Blanco Titular. Cierra con ✕, Escape o clic fuera.
- **Flow menu (home):** tres filas a todo el ancho de la ventana; al entrar el cursor, una
  franja marfil sube o baja **desde el borde más cercano al cursor** (`expo.out`, 0.6s) y
  dentro corre un marquee CSS infinito con el mismo texto en grafito.

### Sidebar de proyecto (componente firma)

Riel vertical sticky centrado en el viewport (226px, `top: 50%` + `translateY(-50%)`), con
un marcador de línea de 32×2px a la izquierda de cada ítem. La proximidad del cursor
alimenta una variable `--effect` (0→1) que interpola el color del texto y del marcador
entre gris y terracota vía `color-mix`, desplaza el ítem 14px a la derecha y estira el
marcador. Un tick más corto (16×1px, `::after`) marca la mitad del hueco entre ítems: son
"las líneas entre las líneas" que le dan textura al riel en reposo. En ≤820px se convierte
en una franja horizontal con scroll y los marcadores desaparecen.

### Disponibilidad

Punto de 8px en terracota que pulsa (`opacity` 1→0.3, `scale` 1→0.75, 2.4s
`ease-in-out`, infinito) seguido de texto Label. El punto es `inline-block` a propósito:
si el texto se parte en varias líneas, queda pegado a la primera palabra en vez de flotar.
Se apaga con `prefers-reduced-motion`.

## Do's and Don'ts

### Do:

- **Do** construir con filas separadas por hairline antes que con cualquier contenedor
  cerrado. Es el gesto que unifica trabajos, contacto, menú y ficha.
- **Do** mantener terracota por debajo del 10% de cualquier pantalla, y usarla en énfasis,
  estado, foco y selección — no en superficies.
- **Do** aplicar el gesto de hover completo cuando hagas una lista nueva: la fila activa se
  desliza 1.4rem y las hermanas bajan a 0.35 de opacidad.
- **Do** poner todo metadato en versalita gris (mayúsculas, ≤0.82rem, tracking ≥0.14em) y
  todo titular en 700–800 con tracking negativo.
- **Do** respetar `prefers-reduced-motion` en cada animación nueva; el sitio ya lo hace en
  el revelado, el punto, el lightbox, el marquee y el titular de presión.
- **Do** sacar las estructuras de navegación al borde real de la ventana con el patrón de
  offset medido en JS, dejando el texto en el contenedor centrado.
- **Do** declarar el vacío ("Próximamente" sobre la trama diagonal) cuando falta una foto,
  en vez de rellenar con un adorno.
- **Do** duplicar cualquier cambio del menú lateral o de `.status` en `index.html` (inline)
  **y** en `pagina.css`. La duplicación es deliberada.

### Don't:

- **Don't** introducir una tipografía serif en ningún rol. Sin excepciones.
- **Don't** usar #FFFFFF fuera de la pantalla de apertura del conejo.
- **Don't** poner cursiva por ritmo o decoración: la cursiva marca la palabra que carga el
  sentido y va en terracota.
- **Don't** agregar sombras duras, cortas o con tinte de color. Difusas, negras y de baja
  opacidad, o ninguna.
- **Don't** convertir el manifiesto de la home en un bloque alineado a la izquierda ni
  agregarle un riel lateral: va centrado.
- **Don't** reimplementar el sticky de la sidebar de proyecto con scroll + JS.
- **Don't** usar ScrollTrigger: solo está el core de GSAP. Los efectos de scroll se hacen
  con IntersectionObserver + `gsap.to`, o con el motor manual en rAF del hero.
- **Don't** derivar hacia estética SaaS/startup, plantilla de portafolio, brutalismo
  ruidoso o agencia corporativa. Son las cuatro anti-referencias confirmadas del proyecto.
- **Don't** inventar logos de clientes, testimonios, métricas o casos de estudio para
  llenar una composición.
