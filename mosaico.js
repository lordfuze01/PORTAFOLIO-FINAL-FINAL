// ====== TRABAJOS: MOSAICO + VISTA DE PROYECTO (estilo gilhuybrecht.com) ======
// Compartido por trabajos-grafico.html, trabajos-estrategia.html y
// trabajos-audiovisual.html. Lee los proyectos de proyectos.js (los de
// la categoria de <body data-categoria="...">) y arma:
//  1. El MOSAICO: todas las fotos de esos proyectos, cada proyecto
//     numerado 1, 2, 3... con su nombre sobre la primera foto. Al pasar
//     el cursor por un proyecto, los demas se apagan.
//  2. La VISTA del proyecto al hacer clic: sus fotos "vuelan" del
//     mosaico a la columna derecha (con giro 3D) y la informacion sube
//     a la izquierda. Clic en la columna izquierda (el cursor dice
//     "Back") o Esc: se cierra y las fotos vuelven a su lugar. Clic en
//     una foto (el cursor dice "Zoom"): la foto se enfoca sola al
//     centro; clic o Esc la devuelve. Si el proyecto trae "video"
//     (link de YouTube o Vimeo), el video va primero en esa columna.
//  4. Las AREAS de la cabecera (Graphic / Strategy / Audiovisual): una
//     hairline se desliza bajo el area que tenga el cursor.
//  3. La DIRECCION cambia a #id-del-proyecto: el link se puede compartir
//     y el boton "atras" del navegador cierra el proyecto.
// Sin GSAP, con "menos movimiento" o en pantallas de menos de 650px todo
// funciona igual, solo que sin los vuelos.
(function () {
  'use strict';

  var cuerpo = document.body;
  var categoria = cuerpo.getAttribute('data-categoria');
  var proyectos = (window.PROYECTOS || []).filter(function (p) {
    return p.categoria === categoria;
  });
  var mosaico = document.getElementById('mosaico');
  var vista = document.getElementById('vista');
  if (!mosaico || !vista) return;

  var cabecera = document.getElementById('mosaicoCabecera');
  var areas = document.getElementById('mosaicoAreas');
  var cursorEl = document.getElementById('mosaicoCursor');
  var cargador = document.getElementById('mosaicoCargador');
  var indice = document.getElementById('mosaicoIndice');

  var hayGsap = typeof gsap !== 'undefined';
  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var escritorio = window.matchMedia('(min-width: 650px)');

  // Los vuelos solo tienen sentido con la vista dividida (>=650px).
  function conVuelos() {
    return hayGsap && !menosMovimiento && escritorio.matches;
  }

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function esPendiente(valor) {
    return /^(coming soon|pr[oó]ximamente)/i.test(String(valor).trim());
  }
  // Proyecto sin fotos todavia: una sola casilla "Coming soon" en el
  // mosaico, para que igual se pueda abrir y leer.
  var HUECO = { hueco: true, ancho: 4, alto: 3 };
  function fotosDe(p) {
    return (p.fotos && p.fotos.length) ? p.fotos : [HUECO];
  }
  function imagen(f, extra) {
    if (f.hueco) return '<span class="mz-hueco"><span>Coming soon</span></span>';
    return '<img src="' + esc(f.src) + '" alt="' + esc(extra.alt) + '" width="' + f.ancho + '" height="' +
      f.alto + '" decoding="async"' + (extra.lazy ? ' loading="lazy"' : '') + ' />';
  }
  // Link de YouTube o Vimeo -> direccion para incrustarlo (o null).
  function videoEmbed(url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/);
    if (m) return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?rel=0';
    m = String(url).match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) return 'https://player.vimeo.com/video/' + m[1] + '?dnt=1';
    return null;
  }
  function buscar(id) {
    for (var k = 0; k < proyectos.length; k++) if (proyectos[k].id === id) return proyectos[k];
    return null;
  }
  function ponerRect(el, r) {
    el.style.left = r.left + 'px';
    el.style.top = r.top + 'px';
    el.style.width = r.width + 'px';
    el.style.height = r.height + 'px';
  }

  // ------------------------------------------------------------------
  // 1. MOSAICO
  // ------------------------------------------------------------------
  var items = [];
  if (!proyectos.length) {
    mosaico.innerHTML = '<p class="mosaico__vacio">New projects coming soon.</p>';
  }
  proyectos.forEach(function (p) {
    var fotos = fotosDe(p);
    fotos.forEach(function (f, i) {
      var a = document.createElement('a');
      a.className = 'mosaico__item' +
        (i === 0 ? ' mosaico__item--primero' : '') +
        (i >= 2 ? ' mosaico__item--extra' : '');
      a.href = '#' + p.id;
      a.setAttribute('data-proyecto', p.id);
      a.setAttribute('aria-label', 'Open ' + p.nombre + (fotos.length > 1 ? ', image ' + (i + 1) : ''));
      a.innerHTML =
        '<span class="mosaico__rotulo" aria-hidden="true">' +
          '<span class="mosaico__nombre">' + (i === 0 ? esc(p.nombre) : '') + '</span>' +
          '<span class="mosaico__num">' + (i + 1) + '</span>' +
        '</span>' +
        '<span class="mosaico__marco" style="aspect-ratio: ' + f.ancho + ' / ' + f.alto + '">' +
          imagen(f, { alt: '', lazy: items.length >= 14 }) +
        '</span>';
      mosaico.appendChild(a);
      items.push({ el: a, marco: a.querySelector('.mosaico__marco'), p: p, i: i });
    });
  });

  // Lista de proyectos de la cabecera (la columna "Recognition" de la
  // referencia): pasar el cursor resalta el proyecto, clic lo abre.
  if (indice) {
    var lista = indice.querySelector('ul');
    lista.innerHTML = proyectos.length
      ? proyectos.map(function (p) {
          return '<li><a href="#' + p.id + '" data-proyecto="' + p.id + '"><span class="mz-sube">' +
            esc(p.nombre) + '</span></a></li>';
        }).join('')
      : '<li><span class="mz-sube">Coming soon</span></li>';
  }

  // Resaltado: el proyecto bajo el cursor queda entero, los demas al 20%.
  var resaltado = null;
  function resaltar(id) {
    if (id === resaltado) return;
    resaltado = id;
    items.forEach(function (it) {
      it.el.classList.toggle('is-apagado', !!id && it.p.id !== id);
    });
  }
  if (conMouse) {
    // En los huecos entre fotos se mantiene el ultimo resaltado (si se
    // apagara y prendiera al cruzar cada hueco, parpadearia).
    mosaico.addEventListener('mouseover', function (e) {
      if (estado !== 'mosaico') return;
      var a = e.target.closest('.mosaico__item');
      if (a) resaltar(a.getAttribute('data-proyecto'));
    });
    mosaico.addEventListener('mouseleave', function () { resaltar(null); });
    if (indice) {
      indice.addEventListener('mouseover', function (e) {
        var a = e.target.closest('a[data-proyecto]');
        if (a && estado === 'mosaico') resaltar(a.getAttribute('data-proyecto'));
      });
      indice.addEventListener('mouseleave', function () { resaltar(null); });
    }
  }

  // ------------------------------------------------------------------
  // 2. VISTA DEL PROYECTO
  // ------------------------------------------------------------------
  var estado = 'mosaico'; // abriendo | abierta | foco | cerrando
  var actual = null;
  var origenFoco = null;
  var empujado = false;       // la entrada #id del historial la pusimos nosotros
  var cerrarAlAbrir = false;  // "atras" llego mientras se estaba abriendo
  var enfoque = null;

  function construirVista(p) {
    var ficha = (p.ficha || []).map(function (fila, k) {
      return '<li class="vista__dato"><span class="mz-sube vista__fila">' +
        '<span class="n">' + (k + 1) + '</span>' +
        '<span class="k">' + esc(fila[0]) + '</span>' +
        '<span class="v' + (esPendiente(fila[1]) ? ' is-pendiente' : '') + '">' + esc(fila[1]) + '</span>' +
        '</span></li>';
    }).join('');
    var embed = videoEmbed(p.video);
    // Con video y sin fotos, la casilla "Coming soon" no se muestra: la
    // del mosaico vuela directo al video.
    var fotos = fotosDe(p).map(function (f, i) {
      return '<figure class="vista__foto' + (f.hueco ? ' vista__foto--hueco' : '') + '" data-indice="' + i + '"' +
        (f.hueco && embed ? ' hidden' : '') + '>' + imagen(f, { alt: f.alt || p.nombre }) + '</figure>';
    }).join('');
    var video = embed
      ? '<div class="vista__video"><iframe src="' + esc(embed) + '" title="' + esc(p.nombre) + '"' +
        ' allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen loading="lazy"></iframe></div>'
      : '';
    vista.innerHTML =
      '<div class="vista__velo"></div>' +
      '<div class="vista__info">' +
        '<header class="vista__cabeza">' +
          '<h1 class="vista__titulo" id="vistaTitulo" tabindex="-1"><span class="mz-mascara"><span class="mz-sube">' +
            esc(p.nombre) + '</span></span></h1>' +
          '<a class="vista__pill" href="https://www.behance.net/santiagenciso1" target="_blank" rel="noopener">' +
            '<span class="mz-mascara"><span class="mz-sube">Behance ↗</span></span></a>' +
        '</header>' +
        (p.tipo ? '<p class="vista__tipo"><span class="mz-mascara"><span class="mz-sube">' + esc(p.tipo) +
          '</span></span></p>' : '') +
        '<p class="vista__desc">' + esc(p.descripcion || '') + '</p>' +
        '<div class="vista__fichaw"><div class="vista__resalte" aria-hidden="true"></div>' +
          '<ol class="vista__ficha">' + ficha + '</ol></div>' +
        '<button type="button" class="vista__volver">Back</button>' +
      '</div>' +
      '<div class="vista__media">' + video + fotos + '</div>';
  }

  // Parte la descripcion en lineas reales (como el js-up-split de la
  // referencia) para que suban una por una.
  function partirEnLineas(parrafo) {
    var palabras = parrafo.textContent.split(/\s+/).filter(Boolean);
    if (!palabras.length) return;
    parrafo.innerHTML = palabras.map(function (w) { return '<span>' + esc(w) + '</span>'; }).join(' ');
    var lineas = [];
    var arriba = null;
    Array.prototype.forEach.call(parrafo.children, function (s) {
      if (arriba === null || Math.abs(s.offsetTop - arriba) > 2) {
        lineas.push([]);
        arriba = s.offsetTop;
      }
      lineas[lineas.length - 1].push(s.textContent);
    });
    parrafo.innerHTML = lineas.map(function (l) {
      return '<span class="mz-mascara"><span class="mz-sube">' + l.map(esc).join(' ') + '</span></span>';
    }).join('');
  }

  function piezasInfo() {
    return Array.prototype.slice.call(vista.querySelectorAll('.vista__info .mz-sube'));
  }
  function fotosVista() {
    return Array.prototype.slice.call(vista.querySelectorAll('.vista__foto'));
  }
  // Fotos + video: lo que se apaga mientras vuelan las copias.
  function capasVista() {
    return Array.prototype.slice.call(vista.querySelectorAll('.vista__foto, .vista__video'));
  }
  // Donde "aterriza" la foto i al abrir (y de donde sale al cerrar): su
  // figura, o el video si la figura esta escondida.
  function marcoVista(figs, i) {
    var fig = figs[i];
    return (fig && fig.hidden && vista.querySelector('.vista__video')) || fig;
  }
  function propiosDe(p) {
    return items.filter(function (it) { return it.p.id === p.id; });
  }

  function conectarVista() {
    var info = vista.querySelector('.vista__info');
    var media = vista.querySelector('.vista__media');
    var velo = vista.querySelector('.vista__velo');

    vista.querySelector('.vista__volver').addEventListener('click', volver);
    // Clic en la columna de informacion (fuera de sus links) = Volver.
    info.addEventListener('click', function (e) {
      if (!conMouse || !escritorio.matches || e.target.closest('a, button')) return;
      volver();
    });
    // La rueda sobre la informacion mueve las fotos (como la referencia).
    info.addEventListener('wheel', function (e) {
      if (!escritorio.matches) return;
      media.scrollTop += e.deltaY;
      e.preventDefault();
    }, { passive: false });
    media.addEventListener('click', function (e) {
      var fig = e.target.closest('.vista__foto');
      if (fig && escritorio.matches && !fig.classList.contains('vista__foto--hueco')) enfocar(fig);
    });
    velo.addEventListener('click', desenfocar);

    // La pastilla que sigue a la fila de la ficha bajo el cursor.
    var envoltura = vista.querySelector('.vista__fichaw');
    var resalte = envoltura.querySelector('.vista__resalte');
    if (hayGsap && conMouse) {
      Array.prototype.forEach.call(envoltura.querySelectorAll('.vista__dato'), function (li) {
        li.addEventListener('mouseenter', function () {
          gsap.to(resalte, { y: li.offsetTop, height: li.offsetHeight, opacity: 1, duration: 0.35, ease: 'power3.out' });
        });
      });
      envoltura.addEventListener('mouseleave', function () {
        gsap.to(resalte, { opacity: 0, duration: 0.25 });
      });
    }
  }

  function bloquearScroll() {
    var barraScroll = window.innerWidth - document.documentElement.clientWidth;
    if (barraScroll > 0) cuerpo.style.paddingRight = barraScroll + 'px';
    document.documentElement.style.overflow = 'hidden';
  }
  function desbloquearScroll() {
    document.documentElement.style.overflow = '';
    cuerpo.style.paddingRight = '';
  }

  function atenuarFondo(valor) {
    mosaico.style.opacity = valor;
    [cabecera].forEach(function (el) {
      if (el) el.style.visibility = valor < 1 ? 'hidden' : '';
    });
  }

  function vuelo(img, rect) {
    var c = img.cloneNode();
    c.removeAttribute('loading');
    c.removeAttribute('id');
    c.className = 'mz-vuelo';
    c.alt = '';
    ponerRect(c, rect);
    document.body.appendChild(c);
    return c;
  }
  // Recorrido con giro 3D: se inclina a mitad de camino y llega derecha.
  function volar(tl, c, destino, inicio, duracion, giroY, giroX) {
    tl.to(c, { left: destino.left, top: destino.top, width: destino.width, height: destino.height,
               duration: duracion, ease: 'expo.inOut' }, inicio)
      .to(c, { rotationY: giroY, rotationX: giroX, transformPerspective: 1100,
               duration: duracion / 2, ease: 'sine.in' }, inicio)
      .to(c, { rotationY: 0, rotationX: 0, duration: duracion / 2, ease: 'sine.out' }, inicio + duracion / 2);
  }

  function abrir(id, opciones) {
    opciones = opciones || {};
    var p = buscar(id);
    if (!p || estado !== 'mosaico') return;
    estado = 'abriendo';
    actual = p;
    origenFoco = document.activeElement;
    resaltar(null);
    construirVista(p);
    bloquearScroll();
    vista.hidden = false;
    vista.scrollTop = 0;
    partirEnLineas(vista.querySelector('.vista__desc'));
    conectarVista();

    var propios = propiosDe(p);
    var figs = fotosVista();
    var piezas = piezasInfo();

    function listo() {
      estado = 'abierta';
      var titulo = document.getElementById('vistaTitulo');
      if (titulo) titulo.focus({ preventScroll: true });
      actualizarEtiqueta();
      if (cerrarAlAbrir) {
        cerrarAlAbrir = false;
        cerrar();
      }
    }

    if (!conVuelos() || opciones.directo) {
      propios.forEach(function (it) { it.marco.style.visibility = 'hidden'; });
      atenuarFondo(0.15);
      if (hayGsap && !menosMovimiento) {
        gsap.fromTo(vista, { autoAlpha: 0, y: escritorio.matches ? 0 : 24 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', clearProps: 'transform', onComplete: listo });
      } else {
        listo();
      }
      return;
    }

    gsap.set(piezas, { yPercent: 110 });
    var capas = capasVista();
    gsap.set(capas, { opacity: 0 });
    var vuelos = propios.map(function (it) {
      return {
        c: vuelo(it.marco.firstElementChild, it.marco.getBoundingClientRect()),
        destino: marcoVista(figs, it.i).getBoundingClientRect(),
      };
    });
    propios.forEach(function (it) { it.marco.style.visibility = 'hidden'; });

    var tl = gsap.timeline({
      onComplete: function () {
        capas.forEach(function (f) { f.style.opacity = ''; });
        vuelos.forEach(function (v) { v.c.remove(); });
        listo();
      },
    });
    tl.to(mosaico, { opacity: 0.15, duration: 0.6, ease: 'power2.out' }, 0)
      .to(cabecera, { autoAlpha: 0, duration: 0.35, ease: 'power2.out' }, 0);
    vuelos.forEach(function (v, k) {
      volar(tl, v.c, v.destino, k * 0.06, 1.05, -24, 12);
    });
    tl.to(piezas, { yPercent: 0, duration: 0.9, ease: 'expo.out', stagger: 0.035 }, 0.55);
  }

  function cerrar() {
    if (estado === 'abriendo') { cerrarAlAbrir = true; return; }
    if (estado === 'foco') { quitarFoco(); }
    if (estado !== 'abierta') return;
    estado = 'cerrando';
    ponerEtiqueta('');
    var p = actual;
    var propios = propiosDe(p);
    var figs = fotosVista();
    var piezas = piezasInfo();

    function terminar() {
      propios.forEach(function (it) { it.marco.style.visibility = ''; });
      vista.hidden = true;
      vista.innerHTML = '';
      if (hayGsap) gsap.set([vista, mosaico, cabecera], { clearProps: 'opacity,visibility,transform' });
      atenuarFondo(1);
      mosaico.style.opacity = '';
      desbloquearScroll();
      estado = 'mosaico';
      actual = null;
      ponerEtiqueta('');
      if (origenFoco && document.contains(origenFoco) && origenFoco.focus) {
        origenFoco.focus({ preventScroll: true });
      }
    }

    if (!conVuelos()) {
      if (hayGsap && !menosMovimiento) {
        gsap.to(vista, { autoAlpha: 0, duration: 0.3, ease: 'power2.in', onComplete: terminar });
      } else {
        terminar();
      }
      return;
    }

    var alto = window.innerHeight;
    var vuelos = [];
    propios.forEach(function (it) {
      var fig = marcoVista(figs, it.i);
      var desde = fig.getBoundingClientRect();
      if (desde.bottom < 0 || desde.top > alto) return; // fuera de pantalla: no vuela
      var pieza = fig.classList.contains('vista__video') ? it.marco.firstElementChild : fig.firstElementChild;
      vuelos.push({ c: vuelo(pieza, desde), destino: it.marco.getBoundingClientRect() });
      fig.style.opacity = 0;
    });

    var tl = gsap.timeline({
      onComplete: function () {
        vuelos.forEach(function (v) { v.c.remove(); });
        terminar();
      },
    });
    tl.to(piezas, { yPercent: -110, duration: 0.45, ease: 'power3.in', stagger: 0.015 }, 0)
      .to(capasVista(), { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
      .to(mosaico, { opacity: 1, duration: 0.7, ease: 'power2.inOut' }, 0.3)
      .to(cabecera, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0.55);
    vuelos.forEach(function (v, k) {
      volar(tl, v.c, v.destino, 0.1 + k * 0.05, 0.95, 20, -10);
    });
  }

  // Enfoque: una foto sola, grande, al centro de la pantalla.
  function enfocar(fig) {
    if (estado !== 'abierta') return;
    var img = fig.querySelector('img');
    var desde = fig.getBoundingClientRect();
    var proporcion = (img.naturalWidth && img.naturalHeight) ? img.naturalWidth / img.naturalHeight : desde.width / desde.height;
    var ancho = Math.min(window.innerWidth * 0.86, window.innerHeight * 0.86 * proporcion);
    var alto = ancho / proporcion;
    var destino = { left: (window.innerWidth - ancho) / 2, top: (window.innerHeight - alto) / 2, width: ancho, height: alto };
    var velo = vista.querySelector('.vista__velo');
    estado = 'foco';
    vista.classList.add('is-foco');
    var c = vuelo(img, desde);
    fig.style.opacity = 0;
    enfoque = { fig: fig, c: c };
    actualizarEtiqueta();
    if (!conVuelos()) {
      ponerRect(c, destino);
      velo.style.opacity = 1;
      return;
    }
    var tl = gsap.timeline();
    tl.to(velo, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0);
    volar(tl, c, destino, 0, 0.95, -16, 8);
  }

  function quitarFoco() {
    if (!enfoque) return;
    if (hayGsap) gsap.killTweensOf([enfoque.c, vista.querySelector('.vista__velo')]);
    enfoque.fig.style.opacity = '';
    enfoque.c.remove();
    var velo = vista.querySelector('.vista__velo');
    if (velo) velo.style.opacity = 0;
    vista.classList.remove('is-foco');
    enfoque = null;
    estado = 'abierta';
  }

  function desenfocar() {
    if (estado !== 'foco' || !enfoque) return;
    if (!conVuelos()) { quitarFoco(); actualizarEtiqueta(); return; }
    estado = 'cerrando';
    var e = enfoque;
    var destino = e.fig.getBoundingClientRect();
    var velo = vista.querySelector('.vista__velo');
    var tl = gsap.timeline({
      onComplete: function () {
        estado = 'foco';
        quitarFoco();
        actualizarEtiqueta();
      },
    });
    tl.to(velo, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 0.2);
    volar(tl, e.c, destino, 0, 0.9, 16, -8);
  }

  // ------------------------------------------------------------------
  // 3. DIRECCION (#proyecto) E HISTORIAL
  // ------------------------------------------------------------------
  function idDelHash() {
    var id = decodeURIComponent(location.hash.replace(/^#/, ''));
    return buscar(id) ? id : null;
  }
  function pedirAbrir(id) {
    if (estado !== 'mosaico' || !buscar(id)) return;
    history.pushState({ proyecto: id }, '', '#' + id);
    empujado = true;
    abrir(id);
  }
  // Volver desde la vista (clic a la izquierda, boton o Esc).
  function volver() {
    if (estado === 'foco') { desenfocar(); return; }
    if (estado !== 'abierta' && estado !== 'abriendo') return;
    if (empujado) {
      history.back(); // popstate cierra
    } else {
      history.replaceState(null, '', location.pathname + location.search);
      cerrar();
    }
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"][data-proyecto]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    pedirAbrir(a.getAttribute('data-proyecto'));
  });
  window.addEventListener('popstate', function () {
    var id = idDelHash();
    if (id) {
      if (estado === 'mosaico') {
        empujado = true;
        abrir(id);
      }
    } else if (estado !== 'mosaico') {
      empujado = false;
      cerrar();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && estado !== 'mosaico') {
      volver();
      return;
    }
    // Con la vista abierta, el tabulador no se escapa al mosaico de atras.
    if (e.key === 'Tab' && estado === 'abierta') {
      var enfocables = vista.querySelectorAll('a[href], button, [tabindex="-1"]');
      if (!enfocables.length) return;
      var primero = enfocables[0];
      var ultimo = enfocables[enfocables.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
  });

  // ------------------------------------------------------------------
  // CURSOR CON ETIQUETA (Back / Zoom / Close), solo con mouse
  // ------------------------------------------------------------------
  var etiqueta = '';
  var mouseX = -200;
  var mouseY = -200;
  function ponerEtiqueta(t) {
    if (!cursorEl || t === etiqueta) return;
    etiqueta = t;
    if (t) cursorEl.textContent = t;
    cursorEl.classList.toggle('is-visible', !!t);
  }
  function etiquetaPara(t) {
    if (estado === 'foco') return 'Close';
    if (estado !== 'abierta' || !t || !t.closest || !escritorio.matches) return '';
    if (t.closest('.vista__foto--hueco, .vista__video')) return '';
    if (t.closest('.vista__foto')) return 'Zoom';
    if (t.closest('a, button')) return '';
    if (t.closest('.vista__info')) return 'Back';
    return '';
  }
  function actualizarEtiqueta() {
    if (!conMouse) return;
    ponerEtiqueta(etiquetaPara(document.elementFromPoint(mouseX, mouseY)));
  }
  if (conMouse && cursorEl) {
    cuerpo.classList.add('con-cursor');
    var cursorX = mouseX;
    var cursorY = mouseY;
    var siguiendo = false;
    var seguir = function () {
      cursorX += (mouseX - cursorX) * 0.3;
      cursorY += (mouseY - cursorY) * 0.3;
      cursorEl.style.transform = 'translate3d(' + cursorX + 'px, ' + cursorY + 'px, 0) translate(-50%, -50%)';
      if (Math.abs(mouseX - cursorX) > 0.2 || Math.abs(mouseY - cursorY) > 0.2) requestAnimationFrame(seguir);
      else siguiendo = false;
    };
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ponerEtiqueta(etiquetaPara(e.target));
      if (!siguiendo) {
        siguiendo = true;
        requestAnimationFrame(seguir);
      }
    });
  }

  // ------------------------------------------------------------------
  // ENTRADA: cargador 0% -> 100% (la primera vez por sesion) y el
  // mosaico subiendo en ola desde abajo, como la referencia.
  // ------------------------------------------------------------------
  function quitarCargador() {
    document.documentElement.classList.remove('mz-cargando');
  }

  function entrada() {
    var textos = cabecera ? Array.prototype.slice.call(cabecera.querySelectorAll('.mz-sube')) : [];
    var fotos = items.map(function (it) { return it.el; });
    // El script del <head> ya decidio si toca cargador (primera vez en la
    // sesion); desde aqui la sesion queda marcada como vista.
    var conCargador = !!cargador && document.documentElement.classList.contains('mz-cargando');
    try { sessionStorage.setItem('knox-mosaico', '1'); } catch (e) { /* sin sessionStorage */ }

    if (!hayGsap || menosMovimiento) {
      quitarCargador();
      return;
    }
    gsap.set(textos, { yPercent: 110 });
    gsap.set(fotos, { y: function () { return window.innerHeight * 0.8; } });
    if (areas) gsap.set(areas, { autoAlpha: 0 });

    function mostrar() {
      gsap.to(textos, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.02 });
      gsap.to(fotos, { y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.05, delay: 0.1, clearProps: 'transform' });
      if (areas) gsap.to(areas, { autoAlpha: 1, duration: 0.8, delay: 0.2, ease: 'power2.out' });
    }

    if (!conCargador) {
      quitarCargador();
      mostrar();
      return;
    }

    var imgs = items.slice(0, 14).map(function (it) { return it.el.querySelector('img'); }).filter(Boolean);
    var total = imgs.length || 1;
    var cargadas = imgs.length ? 0 : 1;
    imgs.forEach(function (img) {
      if (img.complete) { cargadas++; return; }
      var una = function () { cargadas++; };
      img.addEventListener('load', una, { once: true });
      img.addEventListener('error', una, { once: true });
    });
    var inicio = performance.now();
    var mostrado = 0;
    (function contar() {
      var porTiempo = Math.min(100, ((performance.now() - inicio) / 1000) * 100);
      var porCarga = Math.min(100, (cargadas / total) * 100);
      var objetivo = performance.now() - inicio > 6000 ? 100 : Math.min(porTiempo, porCarga);
      mostrado += (objetivo - mostrado) * 0.25;
      if (objetivo >= 100 && mostrado > 99.4) {
        cargador.textContent = '100%';
        gsap.to(cargador, { autoAlpha: 0, duration: 0.5, delay: 0.15, onComplete: function () {
          quitarCargador();
          gsap.set(cargador, { clearProps: 'opacity,visibility' });
        } });
        gsap.delayedCall(0.25, mostrar);
        return;
      }
      cargador.textContent = Math.round(mostrado) + '%';
      requestAnimationFrame(contar);
    })();
  }

  // ------------------------------------------------------------------
  // 4. AREAS: la hairline se desliza al area bajo el cursor
  //    (o con foco de teclado) y vuelve a la actual al salir.
  // ------------------------------------------------------------------
  if (areas) {
    var lente = areas.querySelector('.mc-areas__linea');
    var enlaces = Array.prototype.slice.call(areas.querySelectorAll('a'));
    var actualArea = areas.querySelector('a[aria-current="page"]') || enlaces[0];
    var ponerLente = function (a) {
      if (!lente || !a) return;
      lente.style.width = a.offsetWidth + 'px';
      lente.style.transform = 'translateX(' + a.offsetLeft + 'px)';
      enlaces.forEach(function (x) { x.classList.toggle('is-lente', x === a); });
    };
    // Primera posicion sin animar (que no entre deslizandose desde 0).
    if (lente) lente.style.transition = 'none';
    ponerLente(actualArea);
    areas.classList.add('is-listo');
    requestAnimationFrame(function () { requestAnimationFrame(function () { if (lente) lente.style.transition = ''; }); });
    enlaces.forEach(function (a) {
      a.addEventListener('mouseenter', function () { ponerLente(a); });
      a.addEventListener('focus', function () { ponerLente(a); });
      a.addEventListener('blur', function () { ponerLente(actualArea); });
    });
    areas.addEventListener('mouseleave', function () { ponerLente(actualArea); });
    window.addEventListener('resize', function () { ponerLente(actualArea); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ponerLente(actualArea); });
  }

  // Llegar con #proyecto en la direccion (link compartido, o volver con
  // "adelante"): se abre directo, sin cargador ni vuelo.
  var inicial = idDelHash();
  if (inicial) {
    quitarCargador();
    try { sessionStorage.setItem('knox-mosaico', '1'); } catch (e) { /* sin sessionStorage */ }
    abrir(inicial, { directo: true });
  } else {
    entrada();
  }
})();
