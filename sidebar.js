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
  // mismo criterio que el flow-menu de index.html. Se usa para
  // scroll-margin-top (que las secciones no queden tapadas por el header
  // al saltar con un click).
  var header = document.querySelector('.site-header');
  var headerHeight = 0;
  function ajustarAltoHeader() {
    headerHeight = header ? header.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
  }
  ajustarAltoHeader();

  // --- Ancho completo de .page-body (desktop): se estira a lo ancho real
  // del documento y se le resta ese mismo ancho como margin-left negativo
  // -- mismo truco que ya usa .flow-menu en index.html para salirse del
  // max-width centrado de .page. Adentro, la sidebar es position:sticky
  // NATIVO (ver pagina.css): antes se imitaba "sticky centrado" a mano
  // con JS en cada scroll, pero eso siempre queda un frame detras del
  // scroll real -- el temblor/jitter reportado. Con sticky nativo lo
  // mueve el compositor del navegador, sin JS de por medio, asi que esto
  // SOLO corre en load/resize (nunca en scroll).
  var esFullBleed = window.matchMedia('(min-width: 821px)');
  function ajustarAnchoCompleto() {
    body.style.width = '';
    body.style.marginLeft = '';
    if (!esFullBleed.matches) return; // mobile: .page-body vuelve al layout normal (columna)
    var offset = body.getBoundingClientRect().left;
    body.style.width = document.documentElement.clientWidth + 'px';
    body.style.marginLeft = (-offset) + 'px';
  }
  ajustarAnchoCompleto();

  var tienePuntero = window.matchMedia('(pointer: fine)').matches;
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var usaProximidad = tienePuntero && !menosMovimiento;
  var activeIndex = -1;

  // --- Efecto de proximidad al cursor: rAF loop con suavizado exponencial
  // (mismo algoritmo que el componente de referencia). Se define siempre,
  // incluso si no se va a usar el listener de pointermove mas abajo, porque
  // setActive() tambien lo usa para animar el item activo (crece/cambia de
  // color) aunque el mouse nunca haya pasado por la lista.
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

  function setActive(index) {
    if (index === activeIndex) return;
    activeIndex = index;
    items.forEach(function (item, i) {
      if (i === index) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
    if (usaProximidad) {
      startLoop();
    } else {
      // Touch o reduced-motion: sin loop, el --effect queda fijo en 0/1.
      items.forEach(function (item, i) {
        item.style.setProperty('--effect', i === index ? 1 : 0);
      });
    }
  }

  // --- Scrollspy: queda activa la ULTIMA seccion cuyo borde superior ya
  // paso una linea justo debajo del header. Algoritmo clasico de indice de
  // lectura (independiente del alto de cada seccion) -- mas confiable aca
  // que IntersectionObserver con rootMargin, que con secciones cortas y
  // pegadas (como los placeholders "Proximamente") puede marcar activa la
  // seccion vecina en vez de la que realmente se está mirando.
  function actualizarActivoPorScroll() {
    var threshold = headerHeight + 24;
    var currentIndex = 0;
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      if (!section) continue;
      if (section.getBoundingClientRect().top - threshold <= 0) currentIndex = i;
    }
    setActive(currentIndex);
  }
  var scrollTicking = false;
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
      scrollTicking = false;
      actualizarActivoPorScroll();
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  function onResize() {
    ajustarAltoHeader();
    ajustarAnchoCompleto();
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

  // --- Proximidad al cursor: solo con puntero fino y sin "menos
  // movimiento" (en touch o reduced-motion, setActive ya deja el --effect
  // fijo en 0/1 mas arriba, sin conectar estos listeners). ---
  if (!usaProximidad) return;

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
