// ====== KNOX HERO: "TextPressure" -- fuente variable que reacciona a la
// distancia del cursor (puerto vanilla del componente React Bits, mismo
// algoritmo: https://codepen.io/JuanFuentes/full/rgXKGQ). Requiere en el
// HTML un contenedor .knox-hero con un .text-pressure-title adentro,
// cuyos hijos directos sean .text-pressure-char (una letra cada uno). ======
(function () {
  'use strict';
  var title = document.querySelector('.text-pressure-title');
  if (!title) return;
  var container = title.closest('.knox-hero') || title.parentElement;
  var spans = Array.prototype.slice.call(title.querySelectorAll('.text-pressure-char'));
  if (!spans.length) return;

  // prefers-reduced-motion: el CSS ya deja un font-variation-settings fijo
  // (ver pagina.css) -- no conectamos el loop ni el tracking del cursor.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var mouse = { x: 0, y: 0 };
  var cursor = { x: 0, y: 0 };

  function centrarEnContenedor() {
    var rect = container.getBoundingClientRect();
    mouse.x = rect.left + rect.width / 2;
    mouse.y = rect.top + rect.height / 2;
    cursor.x = mouse.x;
    cursor.y = mouse.y;
  }
  centrarEnContenedor();

  window.addEventListener('mousemove', function (e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });
  window.addEventListener(
    'touchmove',
    function (e) {
      var t = e.touches[0];
      if (!t) return;
      cursor.x = t.clientX;
      cursor.y = t.clientY;
    },
    { passive: true }
  );

  function distancia(ax, ay, bx, by) {
    var dx = bx - ax;
    var dy = by - ay;
    return Math.sqrt(dx * dx + dy * dy);
  }

  // Misma formula que el original: cerca del cursor sube hacia maxVal
  // (+minVal, es el comportamiento real del componente de referencia),
  // lejos baja hasta minVal.
  function getAttr(distance, maxDist, minVal, maxVal) {
    var val = maxVal - Math.abs((maxVal * distance) / maxDist);
    return Math.max(minVal, val + minVal);
  }

  var MIN_FONT_SIZE = 56;
  function ajustarFontSize() {
    var containerW = container.getBoundingClientRect().width;
    var fontSize = Math.max(containerW / (spans.length / 2), MIN_FONT_SIZE);
    title.style.fontSize = fontSize + 'px';
  }
  ajustarFontSize();

  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(ajustarFontSize, 100);
  });

  // Roboto Flex no tiene eje 'ital' registrado (no hay eje italico real en
  // esta fuente) -- se deja afuera del font-variation-settings, a
  // diferencia del original que si lo incluye para fuentes que si lo
  // soportan.
  function animar() {
    mouse.x += (cursor.x - mouse.x) / 15;
    mouse.y += (cursor.y - mouse.y) / 15;

    var titleRect = title.getBoundingClientRect();
    var maxDist = titleRect.width / 2;

    spans.forEach(function (span) {
      var rect = span.getBoundingClientRect();
      var cx = rect.left + rect.width / 2;
      var cy = rect.top + rect.height / 2;
      var d = distancia(mouse.x, mouse.y, cx, cy);

      var wdth = Math.floor(getAttr(d, maxDist, 25, 126));
      var wght = Math.floor(getAttr(d, maxDist, 100, 700));
      var settings = "'wght' " + wght + ", 'wdth' " + wdth;
      if (span.style.fontVariationSettings !== settings) {
        span.style.fontVariationSettings = settings;
      }
    });

    requestAnimationFrame(animar);
  }
  requestAnimationFrame(animar);
})();
