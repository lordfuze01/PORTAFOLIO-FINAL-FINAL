# Graph Report - PORTAFOLIO  (2026-07-09)

## Corpus Check
- 10 files · ~30,658 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 442 nodes · 762 edges · 43 communities (25 shown, 18 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Lottie/GSAP minified core helpers
- Portfolio site pages & flows
- GSAP.min.js core internals
- Lottie bezier/path math
- Lottie vector math utils
- GSAP minified internals A
- GSAP minified internals B
- Lottie SVG filter effects
- GSAP context/callback internals
- GSAP timeline/tween core
- Lottie shape/mask elements
- GSAP minified internals C
- GSAP animation core classes
- GSAP minified internals D
- Lottie RGB/HSV color convert
- Lottie quaternion interpolation
- Cover photo (foto-portada.jpg)
- GSAP minified internals E
- Lottie shape intersection
- Claude/graphify config
- Lottie animation search
- Lottie canvas/tag creation
- Lottie polynomial roots
- Lottie HSL/RGB convert
- Lottie effects sequence
- Lottie value rounding
- Corrección respecto a la spec
- Contexto para el agente — Portafolio BY KNOX
- Spec — Sección "Corto" en index.html
- BY KNOX — Portafolio
- menu.js
- Line-by-line scroll reveal pattern (.line + IntersectionObserver + GSAP)
- Visor lightbox (FLIP-style video expand overlay)
- CLAUDE.md
- graphify knowledge graph tool
- GitHub repo PORTAFOLIO-FINAL-FINAL (main branch, Cloudflare-linked)
- Manifiesto / Introducción section redesign (design decisions)
- CONTEXTO-AGENTE.md — handoff doc for BY KNOX portfolio
- skip-intro flow (index.html#main to bypass bunny intro)
- Cloudflare deploy flow (git push to main auto-redeploys)
- README.md — project overview
- wrangler.jsonc Cloudflare Pages config

## God Nodes (most connected - your core abstractions)
1. `r()` - 19 edges
2. `e()` - 17 edges
3. `t()` - 15 edges
4. `createNS()` - 15 edges
5. `n()` - 15 edges
6. `o()` - 15 edges
7. `i()` - 14 edges
8. `s()` - 14 edges
9. `a()` - 14 edges
10. `addPropertyDecorator()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `lerp(a, b, t)` --semantically_similar_to--> `animar() (rAF lerp loop following cursor)`  [INFERRED] [semantically similar]
  index.html → trabajos.html
- `zd()` --indirect_call--> `e()`  [INFERRED]
  lib/gsap.min.js → lib/lottie.min.js
- `x()` --indirect_call--> `i()`  [INFERRED]
  lib/gsap.min.js → lib/lottie.min.js
- `rb()` --indirect_call--> `i()`  [INFERRED]
  lib/gsap.min.js → lib/lottie.min.js
- `Eb()` --indirect_call--> `e()`  [INFERRED]
  lib/gsap.min.js → lib/lottie.min.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared site navigation across the four pages** — index_page, knox_page, trabajos_page, contacto_page, contacto_pagina_css_stylesheet [EXTRACTED 1.00]

## Communities (43 total, 18 thin omitted)

### Community 1 - "Lottie/GSAP minified core helpers"
Cohesion: 0.15
Nodes (40): Gw(), hb(), zl(), a(), addDecorator(), addEffect(), addPropertyDecorator(), b() (+32 more)

### Community 2 - "Portfolio site pages & flows"
Cohesion: 0.14
Nodes (20): contacto.html — Contact page, pagina.css shared internal-page stylesheet, BY KNOX portfolio project, Parallax continuo mechanism (scroll-linked scrub via rAF), actualizarCorto(), actualizarHero(), alScroll() (rAF-throttled scroll handler for corto section), foto-portada.jpg hero image (+12 more)

### Community 3 - "GSAP.min.js core internals"
Cohesion: 0.07
Nodes (14): gb(), Md(), Nd(), oa(), Od(), pa(), Pd(), qa() (+6 more)

### Community 4 - "Lottie bezier/path math"
Cohesion: 0.12
Nodes (18): crossProduct(), floatEqual(), floatZero(), getIntersection(), joinLines(), lerp(), lerpPoint(), linearOffset() (+10 more)

### Community 5 - "Lottie vector math utils"
Cohesion: 0.21
Nodes (15): $bm_isInstanceOfArray(), $bm_neg(), div(), getPerpendicularVector(), getProjectingAngle(), isNumerable(), length(), mul() (+7 more)

### Community 6 - "GSAP minified internals A"
Cohesion: 0.15
Nodes (20): Ae(), Animation(), ce(), $d(), Da(), ee(), he(), ka() (+12 more)

### Community 7 - "GSAP minified internals B"
Cohesion: 0.21
Nodes (12): Ao(), cb(), cc(), ga(), ha(), ia(), r(), s() (+4 more)

### Community 8 - "Lottie SVG filter effects"
Cohesion: 0.17
Nodes (12): createNS(), HShapeElement(), ShapeGroupData(), SVGDropShadowEffect(), SVGFillFilter(), SVGGaussianBlurEffect(), SVGMatte3Effect(), SVGProLevelsFilter() (+4 more)

### Community 9 - "GSAP context/callback internals"
Cohesion: 0.27
Nodes (10): _a(), Context(), Db(), Eb(), fb(), Gc(), Hc(), ib() (+2 more)

### Community 10 - "GSAP timeline/tween core"
Cohesion: 0.27
Nodes (10): _assertThisInitialized(), ic(), ta(), Timeline(), Tween(), w(), x(), xa() (+2 more)

### Community 11 - "Lottie shape/mask elements"
Cohesion: 0.20
Nodes (10): createSizedArray(), CVCompElement(), CVMaskElement(), DashProperty(), HCompElement(), MaskElement(), ShapeCollection(), ShapePath() (+2 more)

### Community 12 - "GSAP minified internals C"
Cohesion: 0.33
Nodes (6): Aa(), Ca(), na(), Vb(), wb(), Xb()

### Community 13 - "GSAP animation core classes"
Cohesion: 0.14
Nodes (13): Alcance, Animación (GSAP, ya cargado localmente en `lib/gsap.min.js`), Botón de cierre, Botón toggle, Contenido del panel, Estructura del componente, Interacción y cierre, Menú lateral "BY KNOX" — Design Spec (+5 more)

### Community 14 - "GSAP minified internals D"
Cohesion: 0.40
Nodes (5): kb(), ob(), ra(), rb(), Za()

### Community 15 - "Lottie RGB/HSV color convert"
Cohesion: 0.60
Nodes (5): addBrightnessToRGB(), addHueToRGB(), addSaturationToRGB(), HSVtoRGB(), RGBtoHSV()

### Community 16 - "Lottie quaternion interpolation"
Cohesion: 0.40
Nodes (5): createQuaternion(), getValueAtCurrentTime(), interpolateValue(), quaternionToEuler(), slerp()

### Community 17 - "Cover photo (foto-portada.jpg)"
Cohesion: 0.67
Nodes (4): Backlit Silhouette Photography Technique, Foto Portada - Downhill Rider Portrait, Downhill Mountain Biker Subject (Helmet, Goggles, 100% Gear), High-Contrast Black and White Portrait Style

### Community 18 - "GSAP minified internals E"
Cohesion: 0.50
Nodes (4): ja(), Lc(), Nc(), ub()

### Community 19 - "Lottie shape intersection"
Cohesion: 0.50
Nodes (4): boxIntersect(), intersectData(), intersectsImpl(), splitData()

### Community 27 - "Corrección respecto a la spec"
Cohesion: 0.18
Nodes (10): Corrección respecto a la spec, Global Constraints, Menú lateral "BY KNOX" Implementation Plan, Task 1: CSS compartido del menú en `pagina.css`, Task 2: Comportamiento compartido en `menu.js`, Task 3: Integrar el menú en `contacto.html`, Task 4: Integrar el menú en `knox.html`, Task 5: Integrar el menú en `trabajos.html` (+2 more)

### Community 28 - "Contexto para el agente — Portafolio BY KNOX"
Cohesion: 0.20
Nodes (9): Contexto para el agente — Portafolio BY KNOX, Estado actual del trabajo, Estructura de archivos, Notas técnicas / gotchas, Preferencias del usuario, Qué es, Rediseño de la sección "Introducción" (inferior de index.html) — HECHO, Sección "Corto" (debajo de la Introducción) — HECHO (+1 more)

### Community 29 - "Spec — Sección "Corto" en index.html"
Cohesion: 0.22
Nodes (8): 1. Estructura (HTML), 2. Parallax continuo (JS), 3. Lightbox (clic en la miniatura), 4. Restricciones y no-objetivos, Criterio de éxito, Decisiones tomadas, Objetivo, Spec — Sección "Corto" en index.html

### Community 30 - "BY KNOX — Portafolio"
Cohesion: 0.33
Nodes (5): BY KNOX — Portafolio, Despliegue (Cloudflare), Estructura, Flujo de trabajo, Notas

### Community 32 - "Line-by-line scroll reveal pattern (.line + IntersectionObserver + GSAP)"
Cohesion: 0.67
Nodes (3): Sección "Corto" design (orastudio.ca-inspired layout), Intro manifiesto reveal IIFE (IntersectionObserver), Line-by-line scroll reveal pattern (.line + IntersectionObserver + GSAP)

## Knowledge Gaps
- **51 isolated node(s):** `graphify`, `Qué es`, `Ubicación y despliegue`, `Estructura de archivos`, `Rediseño de la sección "Introducción" (inferior de index.html) — HECHO` (+46 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `hb()` connect `Lottie/GSAP minified core helpers` to `GSAP.min.js core internals`, `GSAP minified internals A`, `GSAP minified internals B`, `GSAP context/callback internals`, `GSAP timeline/tween core`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Why does `i()` connect `Lottie/GSAP minified core helpers` to `Lottie.min.js element classes`, `GSAP timeline/tween core`, `GSAP minified internals D`, `GSAP minified internals B`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `e()` connect `Lottie/GSAP minified core helpers` to `Lottie.min.js element classes`, `GSAP context/callback internals`, `GSAP.min.js core internals`?**
  _High betweenness centrality (0.055) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `r()` (e.g. with `addDecorator()` and `addPropertyDecorator()`) actually correct?**
  _`r()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `e()` (e.g. with `Eb()` and `Hc()`) actually correct?**
  _`e()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `t()` (e.g. with `a()` and `addDecorator()`) actually correct?**
  _`t()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `n()` (e.g. with `Gw()` and `Nc()`) actually correct?**
  _`n()` has 7 INFERRED edges - model-reasoned connections that need verification._