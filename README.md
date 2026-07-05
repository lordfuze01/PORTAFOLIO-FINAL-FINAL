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
- `foto-portada.jpg` — imagen de portada (optimizada).
- `_headers` — cabeceras de caché para Cloudflare Pages.

## Subirlo a internet con Cloudflare Pages

### Opción A — Con GitHub (recomendada, deploy automático)

1. Sube este repo a GitHub (ver más abajo).
2. Entra al panel de Cloudflare → **Workers & Pages → Create → Pages**.
3. **Connect to Git** y elige tu repositorio.
4. En la configuración de build:
   - **Framework preset:** `None`
   - **Build command:** *(déjalo vacío)*
   - **Build output directory:** `/`
5. **Save and Deploy.** Tendrás una URL `https://tu-proyecto.pages.dev`.
6. Cada `git push` vuelve a desplegar el sitio solo.

### Opción B — Subida directa (sin Git)

1. Cloudflare → **Workers & Pages → Create → Pages → Upload assets**.
2. Arrastra el contenido de la carpeta (los `.html`, `pagina.css`, `lib/`,
   `foto-portada.jpg`, `_headers`).
3. Deploy.

## Subir el repo a GitHub

```powershell
cd "C:\Users\mudki\Documents\PORTAFOLIO"
git remote add origin https://github.com/TU-USUARIO/portafolio-knox.git
git push -u origin main
```

De ahí en adelante: `git add -A`, `git commit -m "..."`, `git push`.

## Notas

- Las imágenes fuente pesadas (`FOTO PORTADA FINAL.jpg`, etc.) no se suben al
  repo (`.gitignore`); el sitio usa la versión optimizada `foto-portada.jpg`.
