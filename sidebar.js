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
  var esDesktop = true;
  function ajustarOffsets() {
    headerHeight = header ? header.getBoundingClientRect().height : 0;
    document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    // Se cachea aca (solo corre en load/resize) en vez de llamar
    // getComputedStyle en cada frame de scroll -- getComputedStyle fuerza
    // un recalculo de estilos, y no hace falta pagar ese costo 60 veces
    // por segundo.
    esDesktop = getComputedStyle(sidebar).position === 'absolute';
  }
  ajustarOffsets();

  // --- Posicion vertical de la sidebar: imita position:sticky centrado en
  // el viewport (top:50%) sin depender de un ancestro posicionado (algo
  // que position:sticky real exigiria y que rompería el left:0 pegado al
  // borde real de la ventana -- ver comentario en pagina.css). Mientras el
  // usuario baja la pagina, la sidebar la sigue normalmente hasta que su
  // centro coincide con el centro del viewport; ahi se "clava" en ese
  // punto (en pantalla se ve fija, centrada) hasta que el final de
  // .page-body se acerca, momento en el que se suelta y vuelve a
  // scrollear con el documento -- igual que un sticky nativo.
  //
  // Se mueve con `transform: translateY()`, NO con `top`: `top` en un
  // elemento position:absolute dispara layout (reflow) en cada frame de
  // scroll, y eso es justo lo que causaba el temblor/jitter reportado --
  // la sidebar quedaba siempre un frame atras del scroll real, que si es
  // 100% compositor (no dispara layout, lo mueve la GPU). `top` se deja
  // en su valor por defecto (auto -> posicion estatica, el tope de
  // .page-body) y translateY() se calcula relativo a ese punto.
  function actualizarPosicionSidebar() {
    if (!esDesktop) {
      sidebar.style.transform = '';
      return;
    }
    var containerTop = body.getBoundingClientRect().top + window.scrollY;
    var containerBottom = containerTop + body.offsetHeight;
    var sidebarHeight = sidebar.offsetHeight;
    var deseado = window.scrollY + window.innerHeight / 2 - sidebarHeight / 2;
    var minimo = containerTop;
    var maximo = Math.max(containerTop, containerBottom - sidebarHeight);
    var topDeseado = Math.min(Math.max(deseado, minimo), maximo);
    var desplazamiento = topDeseado - containerTop; // relativo a la posicion estatica
    sidebar.style.transform = 'translateY(' + desplazamiento + 'px)';
  }
  actualizarPosicionSidebar();

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
  function onFrameDeScroll() {
    scrollTicking = false;
    actualizarActivoPorScroll();
    actualizarPosicionSidebar();
  }
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(onFrameDeScroll);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  function onResize() {
    ajustarOffsets();
    actualizarActivoPorScroll();
    actualizarPosicionSidebar();
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
