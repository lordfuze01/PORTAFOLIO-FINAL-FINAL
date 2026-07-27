// ====== KNOX: el marco (.knox-bio-frame) se sale del ancho centrado de
// .page a todo el ancho de la ventana -- mismo truco que .flow-menu de
// index.html / .page-body de la sidebar de proyecto (clientWidth, no
// 100vw, para no generar overflow horizontal por el ancho de la
// scrollbar). Corre solo en load/resize. ======
(function () {
  'use strict';
  var frame = document.querySelector('.knox-bio-frame');
  if (!frame) return;

  function ajustarAnchoCompleto() {
    frame.style.width = '';
    frame.style.marginLeft = '';
    var offset = frame.getBoundingClientRect().left;
    frame.style.width = document.documentElement.clientWidth + 'px';
    frame.style.marginLeft = -offset + 'px';
  }
  ajustarAnchoCompleto();
  window.addEventListener('resize', ajustarAnchoCompleto);
})();

// ====== KNOX: conejo Lottie (misma animacion que index.html, via CONEJO
// incrustado mas arriba) que crece al bajar y se achica al subir con el
// scroll -- solo en knox.html. ======
(function () {
  'use strict';
  var el = document.getElementById('knoxBunny');
  if (!el || typeof lottie === 'undefined' || typeof CONEJO === 'undefined') return;

  lottie.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: CONEJO,
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var MIN_SCALE = 0.7;
  var MAX_SCALE = 1.5;
  var SENSIBILIDAD = 0.0018; // px de scroll necesarios para mover la escala

  var targetScale = 1;
  var currentScale = 1;
  var lastScrollY = window.scrollY;
  var rafId = null;

  function loop() {
    currentScale += (targetScale - currentScale) * 0.08;
    if (Math.abs(targetScale - currentScale) < 0.001) {
      currentScale = targetScale;
      rafId = null;
    } else {
      rafId = requestAnimationFrame(loop);
    }
    el.style.transform = 'scale(' + currentScale.toFixed(3) + ')';
  }
  function startLoop() {
    if (rafId != null) return;
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener(
    'scroll',
    function () {
      var sy = window.scrollY;
      var delta = sy - lastScrollY;
      lastScrollY = sy;
      targetScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, targetScale + delta * SENSIBILIDAD));
      startLoop();
    },
    { passive: true }
  );
})();

// ====== KNOX: el texto de "Detras de Knox" se revela linea a linea al
// entrar en pantalla (mismo patron GSAP + IntersectionObserver del
// manifiesto de index.html). ======
(function () {
  'use strict';
  var texto = document.getElementById('knoxBioText');
  if (!texto || typeof gsap === 'undefined') return;

  var lineas = texto.querySelectorAll('.line > span');
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (menosMovimiento) {
    gsap.set(lineas, { yPercent: 0, opacity: 1 });
    return;
  }

  gsap.set(lineas, { yPercent: 110 });

  var reproducido = false;
  var io = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting || reproducido) return;
        reproducido = true;
        gsap.to(lineas, {
          yPercent: 0,
          duration: 1.6,
          ease: 'power4.out',
          stagger: 0.14,
        });
        io.disconnect();
      });
    },
    { threshold: 0.25 }
  );
  io.observe(texto);
})();

// ====== KNOX: los textos de "Detras de Knox" se estiran un poquito al
// scrollear -- segun la VELOCIDAD del scroll, no la posicion -- y vuelven
// solos a su tamano normal apenas se frena. Mismo patron rAF que el
// conejo de arriba, pero con friccion: el impulso decae cada frame aunque
// no entren mas eventos de scroll, asi el texto nunca se queda "estirado"
// si el usuario para de golpe. ======
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var objetivos = document.querySelectorAll('#knoxBioText, .knox-bio__closing');
  if (!objetivos.length) return;

  var ESTIRO_MAX = 0.018; // tope +-1.8%: sutil, no se lee como "efecto"
  var SENSIBILIDAD = 0.0007;
  var FRICCION = 0.85; // que tan rapido se apaga el impulso sin scroll nuevo

  var impulso = 0;
  var actual = 0;
  var lastScrollY = window.scrollY;
  var rafId = null;

  function pintar(valor) {
    var transform = valor ? 'scaleY(' + (1 + valor).toFixed(4) + ')' : '';
    for (var i = 0; i < objetivos.length; i++) objetivos[i].style.transform = transform;
  }

  function loop() {
    impulso *= FRICCION;
    actual += (impulso - actual) * 0.2;

    if (Math.abs(impulso) < 0.0004 && Math.abs(actual) < 0.0004) {
      impulso = 0;
      actual = 0;
      pintar(0);
      rafId = null;
      return;
    }
    pintar(actual);
    rafId = requestAnimationFrame(loop);
  }
  function startLoop() {
    if (rafId != null) return;
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener(
    'scroll',
    function () {
      var sy = window.scrollY;
      var delta = sy - lastScrollY;
      lastScrollY = sy;
      impulso = Math.min(ESTIRO_MAX, Math.max(-ESTIRO_MAX, impulso + delta * SENSIBILIDAD));
      startLoop();
    },
    { passive: true }
  );
})();
