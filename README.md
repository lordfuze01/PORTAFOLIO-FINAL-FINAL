# BY KNOX — Portafolio

Sitio estático (HTML + CSS + JavaScript). Para verlo en tu máquina basta con
abrir `index.html` con doble clic.

## Estructura

- `index.html` — intro (conejo) + landing con el efecto de scroll.
- `knox.html` — ¿Quién es Knox?
- `trabajos.html` — Trabajos (índice interactivo).
- `contacto.html` — Contacto.
- `pagina.css` — estilos de las páginas internas.
- `lib/` — librerías locales (GSAP y Lottie).
- `foto-portada.jpg` — imagen de portada (optimizada).
- `_headers` — cabeceras de caché.
- `wrangler.jsonc` — config de Cloudflare (sirve el sitio desde la raíz).

## Despliegue (Cloudflare)

El sitio está conectado a Cloudflare (proyecto **byknox**) desde este repo de
GitHub. Cada `git push` a la rama `main` **redespliega el sitio solo**.

`wrangler.jsonc` sirve los assets desde la raíz (`"directory": "."`).

## Flujo de trabajo

```powershell
cd "C:\Users\mudki\Documents\PORTAFOLIO"
# ...hacer cambios...
git add -A
git commit -m "describe el cambio"
git push
```

## Notas

- Las imágenes fuente pesadas no se suben al repo (`.gitignore`); el sitio usa
  la versión optimizada `foto-portada.jpg`.
