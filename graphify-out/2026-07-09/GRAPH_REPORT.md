# Graph Report - .  (2026-07-09)

## Corpus Check
- Corpus is ~24,177 words - fits in a single context window. You may not need a graph.

## Summary
- 386 nodes · 747 edges · 27 communities (20 shown, 7 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 87 edges (avg confidence: 0.57)
- Token cost: 176,297 input · 0 output

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

## God Nodes (most connected - your core abstractions)
1. `r()` - 19 edges
2. `e()` - 17 edges
3. `t()` - 15 edges
4. `createNS()` - 15 edges
5. `n()` - 15 edges
6. `o()` - 15 edges
7. `CONTEXTO-AGENTE.md — handoff doc for BY KNOX portfolio` - 15 edges
8. `i()` - 14 edges
9. `s()` - 14 edges
10. `a()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `lerp(a, b, t)` --semantically_similar_to--> `animar() (rAF lerp loop following cursor)`  [INFERRED] [semantically similar]
  index.html → trabajos.html
- `zd()` --indirect_call--> `e()`  [INFERRED]
  lib/gsap.min.js → lib/lottie.min.js
- `README.md — project overview` --conceptually_related_to--> `CONTEXTO-AGENTE.md — handoff doc for BY KNOX portfolio`  [INFERRED]
  README.md → CONTEXTO-AGENTE.md
- `Manifiesto / Introducción section redesign (design decisions)` --conceptually_related_to--> `Intro manifiesto reveal IIFE (IntersectionObserver)`  [INFERRED]
  CONTEXTO-AGENTE.md → index.html
- `skip-intro flow (index.html#main to bypass bunny intro)` --conceptually_related_to--> `irAlMenu()`  [INFERRED]
  CONTEXTO-AGENTE.md → index.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Shared site navigation across the four pages** — index_page, knox_page, trabajos_page, contacto_page, contacto_pagina_css_stylesheet [EXTRACTED 1.00]
- **Sección Corto: parallax + lightbox interaction flow** — docs_superpowers_specs_2026_07_08_seccion_corto_design_seccion_corto, index_actualizarcorto, docs_superpowers_specs_2026_07_08_seccion_corto_design_visor_lightbox, index_abrirvisor, index_cerrarvisor [INFERRED 0.85]
- **Manifiesto redesign: rationale + reveal implementation** — contexto_agente_manifiesto_section, index_intro_reveal_effect, index_reveal_scroll_animation, contexto_agente_overview [INFERRED 0.85]

## Communities (27 total, 7 thin omitted)

### Community 1 - "Lottie/GSAP minified core helpers"
Cohesion: 0.14
Nodes (41): gb(), Gw(), hb(), zl(), a(), addDecorator(), addEffect(), addPropertyDecorator() (+33 more)

### Community 2 - "Portfolio site pages & flows"
Cohesion: 0.12
Nodes (32): contacto.html — Contact page, pagina.css shared internal-page stylesheet, BY KNOX portfolio project, GitHub repo PORTAFOLIO-FINAL-FINAL (main branch, Cloudflare-linked), Manifiesto / Introducción section redesign (design decisions), CONTEXTO-AGENTE.md — handoff doc for BY KNOX portfolio, skip-intro flow (index.html#main to bypass bunny intro), Parallax continuo mechanism (scroll-linked scrub via rAF) (+24 more)

### Community 3 - "GSAP.min.js core internals"
Cohesion: 0.07
Nodes (14): he(), Md(), Nd(), oa(), Od(), pa(), Pd(), qa() (+6 more)

### Community 4 - "Lottie bezier/path math"
Cohesion: 0.12
Nodes (18): crossProduct(), floatEqual(), floatZero(), getIntersection(), joinLines(), lerp(), lerpPoint(), linearOffset() (+10 more)

### Community 5 - "Lottie vector math utils"
Cohesion: 0.21
Nodes (15): $bm_isInstanceOfArray(), $bm_neg(), div(), getPerpendicularVector(), getProjectingAngle(), isNumerable(), length(), mul() (+7 more)

### Community 6 - "GSAP minified internals A"
Cohesion: 0.23
Nodes (13): Ae(), ce(), $d(), ee(), ka(), le(), me(), ne() (+5 more)

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
Cohesion: 0.47
Nodes (6): Animation(), Da(), la(), ma(), Ua(), Va()

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

## Knowledge Gaps
- **6 isolated node(s):** `CLAUDE.md — graphify usage rules`, `graphify knowledge graph tool`, `GitHub repo PORTAFOLIO-FINAL-FINAL (main branch, Cloudflare-linked)`, `alScroll() (rAF-throttled scroll handler for corto section)`, `Interactive project index (cursor-following preview)` (+1 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `hb()` connect `Lottie/GSAP minified core helpers` to `GSAP.min.js core internals`, `GSAP minified internals B`, `GSAP context/callback internals`, `GSAP timeline/tween core`, `GSAP animation core classes`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `i()` connect `Lottie/GSAP minified core helpers` to `Lottie.min.js element classes`, `GSAP timeline/tween core`, `GSAP minified internals D`, `GSAP minified internals B`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `e()` connect `Lottie/GSAP minified core helpers` to `Lottie.min.js element classes`, `GSAP context/callback internals`, `GSAP.min.js core internals`?**
  _High betweenness centrality (0.072) - this node is a cross-community bridge._
- **Are the 13 inferred relationships involving `r()` (e.g. with `addDecorator()` and `addPropertyDecorator()`) actually correct?**
  _`r()` has 13 INFERRED edges - model-reasoned connections that need verification._
- **Are the 10 inferred relationships involving `e()` (e.g. with `Eb()` and `Hc()`) actually correct?**
  _`e()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `t()` (e.g. with `a()` and `addDecorator()`) actually correct?**
  _`t()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `n()` (e.g. with `Gw()` and `Nc()`) actually correct?**
  _`n()` has 7 INFERRED edges - model-reasoned connections that need verification._