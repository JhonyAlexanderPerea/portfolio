# Portfolio — Jhony Alexander Perea

Portfolio personal construido con React + Vite + Tailwind CSS v4 + Framer Motion.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Build de producción

```bash
npm run build
npm run preview
```

src/data/profile.js
```

## Despliegue en GitHub Pages

Este repo incluye un workflow (`.github/workflows/deploy.yml`) que construye y despliega
automáticamente a GitHub Pages en cada push a `main`.

Pasos para activarlo (una sola vez):

1. Ve a Settings → Pages en tu repositorio de GitHub.
2. En "Build and deployment", selecciona Source: **GitHub Actions**.
3. Haz push a `main` — el deploy ocurrirá solo.

Tu sitio quedará disponible en:
`https://jhonyalexanderperea.github.io/portfolio/`
