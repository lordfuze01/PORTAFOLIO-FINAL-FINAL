// ====== MENU LATERAL: boton hamburguesa + panel deslizante ======
// Compartido por las 4 paginas del sitio.
(function () {
  var toggle = document.getElementById('menuToggle');
  var overlay = document.getElementById('menuOverlay');
  var panel = document.getElementById('menuPanel');
  if (!toggle || !overlay || !panel || typeof gsap === 'undefined') return;

  var lineas = panel.querySelectorAll('.menu-panel__item .line > span');
  var primerLink = panel.querySelector('.menu-panel__link');
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var abierto = false;

  // Mueve el foco a `el` sin que el navegador dibuje el anillo azul de
  // :focus-visible cuando el foco lo dispara un clic de mouse (el anillo
  // solo tiene sentido si la interaccion fue por teclado). Ver nota en
  // abrirMenu().
  function enfocarSegunOrigen(el, porTeclado) {
    if (porTeclado) {
      el.focus();
      return;
    }
    el.classList.add('sin-anillo-foco');
    el.addEventListener('blur', function alPerderFoco() {
      el.classList.remove('sin-anillo-foco');
      el.removeEventListener('blur', alPerderFoco);
    });
    el.focus();
  }

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

  function abrirMenu(porTeclado) {
    if (abierto) return;
    abierto = true;
    overlay.hidden = false;
    bloquearScroll();
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');

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

    // El foco al primer link es necesario para accesibilidad (que el teclado
    // caiga dentro del panel), pero si el menu se abrio con clic de mouse el
    // navegador a veces igual dibuja el anillo azul de :focus-visible ahi
    // (heuristica inconsistente entre navegadores). Ese anillo solo tiene
    // sentido cuando la apertura fue por teclado; si fue por mouse lo
    // suprimimos hasta que el link pierda el foco.
    if (primerLink) enfocarSegunOrigen(primerLink, porTeclado);
  }

  function cerrarMenu(porTeclado) {
    if (!abierto) return;
    abierto = false;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');

    function alTerminar() {
      overlay.hidden = true;
      desbloquearScroll();
      // Mismo caso que al abrir: cerrar con clic (en el boton o en el fondo
      // oscuro) no debe dejar el anillo azul en el boton hamburguesa.
      enfocarSegunOrigen(toggle, porTeclado);
    }
    if (menosMovimiento) {
      alTerminar();
      return;
    }
    gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.in' });
    gsap.to(panel, { xPercent: 100, duration: 0.45, ease: 'power3.in', onComplete: alTerminar });
  }

  toggle.addEventListener('click', function (e) {
    // MouseEvent.detail es 0 cuando el click lo dispara el teclado
    // (Enter/Espacio sobre el boton) y >=1 cuando lo dispara el mouse.
    var porTeclado = e.detail === 0;
    if (abierto) cerrarMenu(porTeclado); else abrirMenu(porTeclado);
  });
  overlay.addEventListener('click', function (e) {
    // Clic en el fondo oscuro: siempre es mouse (no hay equivalente de
    // teclado para "clic fuera").
    if (e.target === overlay) cerrarMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarMenu(true);
  });
})();
