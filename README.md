# Portafolio - Brayan Alexander Rincón Martínez

Portafolio web personal de un desarrollador de software en formación. Diseño moderno con tema oscuro y modo claro, navegación intuitiva y galería interactiva de proyectos.

## Características

- 🎨 **Tema oscuro/claro**: Alternancia de temas con persistencia en localStorage
- 📱 **Diseño responsivo**: Optimizado para dispositivos móviles y escritorio
- 🖼️ **Galería interactiva**: 
  - Botón `+` para abrir galería de proyecto
  - Lightbox con 6 imágenes en grid 3x2
  - Visualización en tamaño completo con navegación prev/next
  - Transiciones suaves entre imágenes
  - Cierre con X, Escape, o clic en fondo
  - Navegación con teclado (← →)
- ⚡ **Navegación rápida**: Enlaces en sidebar para secciones principales
- 📄 **Secciones completas**: Hero, habilidades, experiencia, educación, proyectos, certificaciones

## Estructura

```text
Portafolio/
|-- assets/
|   |-- documents/
|   |   `-- Brayan Alexander Rincon Martinez.pdf
|   |-- icons/
|   `-- img/
|       |-- brayan-hero.png
|       |-- Recursos_Pagina (1-6).png
|       `-- ...
|-- css/
|   `-- styles.css
|-- js/
|   `-- main.js
|-- pages/
|   `-- experiencias.html
|-- index.html
`-- README.md
```

## Uso

1. Clona el repositorio
2. Abre `index.html` en tu navegador
3. Navega por las secciones usando el sidebar
4. En la sección de proyectos, pulsa el `+` para ver la galería

## Tecnologías

- HTML5
- CSS3 (custom properties, grid, animaciones)
- JavaScript vanilla (sin dependencias)

## Características de la galería

- Preload de imágenes para transiciones suaves
- Indicador de posición (imagen X de Y)
- Animaciones fade + scale (280ms)
- Wrap-around en navegación (última → primera)
- Accesible (ARIA labels, navegación por teclado)

## Licencia

Proyecto personal • 2026

