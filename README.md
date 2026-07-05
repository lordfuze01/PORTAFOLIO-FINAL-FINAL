# BY KNOX — Portafolio

Sitio estático (HTML + CSS + JavaScript). No necesita build ni servidor:
para verlo en tu máquina basta con abrir `index.html` con doble clic.

## Estructura

- `index.html` — intro (conejo) + landing con el efecto de scroll.
- `knox.html` — ¿Quién es Knox?
- `trabajos.html` — Trabajos (índice interactivo).
- `contacto.html` — Contacto.
- `pagina.css` — estilos de las páginas internas.
- `lib/` — librerías locales (GSAP y Lottie), funcionan sin internet.
- `foto-portada.jpg` — imagen de portada.
- `netlify.toml` — configuración de despliegue.

## Subirlo a internet con Netlify

### Opción A — Arrastrar y soltar (la más rápida)

1. Entra a **https://app.netlify.com/drop**
2. Inicia sesión (o crea una cuenta gratis).
3. Arrastra **toda la carpeta `PORTAFOLIO`** a la zona de "Drag and drop".
4. En segundos tendrás una URL pública (ej. `https://algo-random.netlify.app`).
5. En *Site settings → Change site name* puedes ponerle un nombre bonito.

### Opción B — Con Git (despliegue continuo)

1. Sube esta carpeta a un repositorio de GitHub.
2. En Netlify: *Add new site → Import an existing project → GitHub*.
3. Elige el repo. No pongas comando de build; *Publish directory* = `.`
4. Cada vez que hagas *push*, Netlify actualiza el sitio solo.

## Notas

- La foto pesa varios MB. Si quieres que cargue más rápido en internet,
  se puede comprimir sin pérdida visible (pídemelo).
- `DSC04623-2.jpg` no se usa actualmente en el sitio.
