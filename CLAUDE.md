# Fullstack Guide

Guía educativa bilingüe (ES/EN) desplegada en GitHub Pages: https://devleonmat.github.io/fullstack-guide/

## Stack
- React 19 + Vite 7 + Tailwind CSS 3 (sin router: cada sección es un tab y su id va en el hash, p. ej. `#solid`)
- `react-syntax-highlighter` (vía `src/components/CodeBlock.jsx`), `lucide-react`, `react-icons`, `framer-motion`
- Deploy: `.github/workflows/deploy.yml` (push a `main` → release automático + GitHub Pages)

## Comandos
- `npm run dev` — servidor de desarrollo (puerto 5173)
- `npm run build` — build de producción
- `npm run lint` — ESLint (el repo ya tiene errores previos en otros componentes; no introducir nuevos)
- `npm test` — tests con `node:test` (`tests/*.test.js`, sin dependencias extra)

## Rutas clave
- `src/App.jsx` — tabs, categorías, hash de navegación, carga lazy de cada sección
- `src/components/<Seccion>.jsx` — una sección por archivo; textos con `tx(es, en)` o `src/translations.js`
- `src/components/CodeBlock.jsx` — bloque de código compartido (respeta Study Mode; props opcionales `highlightLines`, `highlightTone`, `collapsible`)
- `src/data/searchIndex.js` — índice de la búsqueda global
- `src/index.css` — overrides del tema claro (`[data-theme="light"]` sobre clases slate/colores concretos)

## Sección SOLID
- `src/components/Solid.jsx` — layout, intro, resumen/quiz final, progreso
- `src/components/solid/` — componentes reutilizables (bloques de lección, comparador, ejercicios, diagramas)
- `src/components/solid/lessons/*.js` — contenido como datos JS puros (sin JSX) para poder testearlo con Node
- Código Java resaltado: líneas que empiezan con `!` en las plantillas (`mark()` en `lessons/mark.js`)

## Restricciones
- Mantener ids de tabs (`#solid`, etc.) y el soporte ES/EN en todo contenido nuevo
- Colores: usar clases que tengan override de tema claro en `src/index.css`
- Clases Tailwind completas (no interpoladas) para que el JIT las detecte

## Workflow
- Ramas `feat/*` desde `origin/main`; PR a `main`
- Verificación visual la hace el usuario en el navegador
