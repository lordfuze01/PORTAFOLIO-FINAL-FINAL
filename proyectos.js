// ==================================================================
// PROYECTOS -- la informacion de cada proyecto vive AQUI, una sola vez.
// La usan las paginas de categoria (trabajos-grafico.html,
// trabajos-estrategia.html, trabajos-audiovisual.html) para armar el
// mosaico y la vista del proyecto que se abre al hacer clic (ver
// mosaico.js).
//
// >>> PARA AGREGAR FOTOS a un proyecto: suma una linea en su lista
//     "fotos", en el orden en que se deben ver:
//         { src: 'imagenes/mi-foto.jpg', ancho: 2000, alto: 1333, alt: 'descripcion corta' },
//     "ancho" y "alto" son los pixeles reales de la imagen (sirven para
//     reservar su espacio en el mosaico sin que salte al cargar).
//     Mientras mas fotos tenga un proyecto, mas se llena el mosaico.
// >>> PARA AGREGAR UN PROYECTO: copia uno de los bloques { ... } y
//     cambia los datos. "categoria" decide en que pagina aparece
//     ('grafico', 'estrategia' o 'audiovisual') e "id" es el nombre que
//     sale en la direccion (trabajos-grafico.html#mordiendo).
// >>> Un dato que aun no existe se escribe 'Coming soon' (sale en gris).
// >>> PROYECTO SIN FOTOS TODAVIA: deja  fotos: []  y en el mosaico sale
//     una casilla rayada "Coming soon" que igual se puede abrir.
// >>> PARA PONER UN VIDEO: agrega  video: 'link de YouTube o Vimeo'
//     (el link normal, como https://youtu.be/abc123XYZ00). Sale primero,
//     arriba de las fotos, al abrir el proyecto. Si es de YouTube puede
//     estar como "No listado".
// >>> El sitio esta en INGLES: nombre, tipo, descripcion y ficha van en
//     ingles.
// ==================================================================
window.PROYECTOS = [
  // ---------------- GRAPHIC ----------------
  {
    // >>> PENDIENTE: tipo, descripcion, ficha y fotos reales.
    id: 'galopea',
    categoria: 'grafico',
    nombre: 'Galopea Visual Identity',
    tipo: 'Visual identity',
    descripcion: 'Coming soon: more about this project.',
    ficha: [
      ['Date', 'Coming soon'],
      ['Tools', 'Coming soon'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    fotos: [],
  },
  {
    // >>> PENDIENTE: tipo, descripcion, ficha y fotos reales.
    id: 'monchispets',
    categoria: 'grafico',
    nombre: 'Monchispets Creative Direction',
    tipo: 'Creative direction',
    descripcion: 'Coming soon: more about this project.',
    ficha: [
      ['Date', 'Coming soon'],
      ['Tools', 'Coming soon'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    fotos: [],
  },

  // ---------------- STRATEGY ----------------
  {
    // >>> PENDIENTE: tipo, descripcion, ficha y fotos reales.
    id: 'siicor',
    categoria: 'estrategia',
    nombre: 'SIICOR 2 Renewal',
    tipo: 'Strategy',
    descripcion: 'Coming soon: more about this project.',
    ficha: [
      ['Date', 'Coming soon'],
      ['Tools', 'Coming soon'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    fotos: [],
  },
  {
    // >>> PENDIENTE: tipo, descripcion, ficha y fotos reales.
    id: 'unlock-your-wings',
    categoria: 'estrategia',
    nombre: 'Unlock Your Wings',
    tipo: 'Strategy',
    descripcion: 'Coming soon: more about this project.',
    ficha: [
      ['Date', 'Coming soon'],
      ['Tools', 'Coming soon'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    fotos: [],
  },

  // ---------------- AUDIOVISUAL ----------------
  {
    id: 'mordiendo',
    categoria: 'audiovisual',
    nombre: 'Mordiendo el polvo',
    tipo: 'Photography · Audiovisual',
    descripcion:
      'A photographic and graphic collection about motorsport in the region. ' +
      'Cohesive, dynamic visual pieces.',
    ficha: [
      ['Date', 'Feb 2025 — Present'],
      ['Tools', 'Photography · Lightroom · Slow shutter'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    fotos: [
      { src: 'foto-portada.jpg', ancho: 2560, alto: 1707, alt: 'Mordiendo el polvo collection' },
    ],
  },
  {
    // >>> PENDIENTE: tipo, descripcion, ficha, video y fotos reales.
    id: 'i-dont-like-sand',
    categoria: 'audiovisual',
    nombre: "I Don't Like Sand",
    tipo: 'Audiovisual',
    descripcion: 'Coming soon: more about this project.',
    ficha: [
      ['Date', 'Coming soon'],
      ['Tools', 'Coming soon'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    // video: 'https://youtu.be/XXXXXXXXXXX',
    fotos: [],
  },
  {
    id: 'especiferal',
    categoria: 'audiovisual',
    nombre: 'Especiferal',
    tipo: 'Collection · Industrial · Editorial',
    descripcion:
      'A speculative collection of accessories and products inspired by feral ' +
      'species. Illustration, editorial, industrial design and visual communication.',
    ficha: [
      ['Date', 'Mar — May 2025'],
      ['Tools', 'InDesign · Fusion 360 · 3D printing'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    fotos: [
      { src: 'imagenes/especiferal-hover.jpg', ancho: 900, alto: 675, alt: 'Especiferal' },
    ],
  },
  {
    // >>> PENDIENTE: reemplazar tipo, descripcion y ficha con la info real.
    id: 'elsabio',
    categoria: 'audiovisual',
    nombre: 'El sabio se parcha el bobo se estresa',
    tipo: 'Coming soon',
    descripcion: 'Coming soon: more about this project.',
    ficha: [
      ['Date', 'Coming soon'],
      ['Tools', 'Coming soon'],
      ['Process', 'Coming soon'],
      ['Final product', 'Coming soon'],
    ],
    fotos: [
      { src: 'imagenes/elsabio.jpg', ancho: 1305, alto: 585, alt: 'El sabio se parcha el bobo se estresa' },
    ],
  },
];
