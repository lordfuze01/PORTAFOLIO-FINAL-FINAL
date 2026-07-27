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
