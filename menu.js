// ====== MENU LATERAL: boton hamburguesa + panel deslizante ======
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

  // Compensa el ancho de la scrollbar al quitarla (evita el salto del
  // contenido cuando el body pasa a overflow:hidden con el menu abierto).
  function bloquearScroll() {
    var anchoScrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (anchoScrollbar > 0) document.body.style.paddingRight = anchoScrollbar + 'px';
    document.body.style.overflow = 'hidden';
  }
  function desbloquearScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  function abrirMenu() {
    if (abierto) return;
    abierto = true;
    overlay.hidden = false;
    bloquearScroll();
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');

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
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');

    function alTerminar() {
      overlay.hidden = true;
      desbloquearScroll();
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
