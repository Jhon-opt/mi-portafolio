# 🚀 Jhon Mario Durango - Full-Stack Portfolio

Este es mi portafolio profesional, rediseñado para reflejar mi evolución como **Desarrollador Full-Stack** con un fuerte enfoque en **Backend (.NET/Node.js)** y arquitecturas modernas en **Frontend (Angular 20)**.

## ✨ Características Principales

-   **🌍 Internacionalización (i18n):** Soporte completo para Español e Inglés con cambio en tiempo real mediante Angular Signals.
-   **⌨️ Command Palette:** Consola interactiva (`Ctrl + K`) para navegación rápida y acciones del sistema.
-   **🛡️ Architecture Visualizer:** Efecto flip 3D en tarjetas de proyectos para mostrar diagramas de flujo de datos (Client -> Server -> DB).
-   **📊 GitHub Live Stats:** Integración dinámica con la API de GitHub para mostrar métricas de contribución reales.
-   **🌌 Interactive Background:** Sistema de partículas que reaccionan al cursor del usuario.
-   **🕹️ Commitment Catcher Game:** Un mini-juego interactivo integrado como Easter Egg.
-   **🔦 Spotlight Effect:** Resplandor dinámico en tarjetas de cristal (*Glassmorphism*).
-   **🪄 Scroll Reveal:** Animaciones de entrada fluidas basadas en Intersection Observer.
-   **🎶 Premium Media Player:** Reproductor de música minimalista integrado con la API de YouTube.

## 🛠️ Tech Stack

-   **Frontend:** Angular 20, TypeScript, Tailwind CSS 4, DaisyUI 5.
-   **Backend (en proyectos):** C# / .NET 8.0, Node.js (NestJS/Express), Go, Python.
-   **Infraestructura:** PostgreSQL, Docker, Redis, Firebase.

## 📦 Instalación y Ejecución

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar Entorno:**
    Crea el archivo `src/app/environments/environment.ts` con tus llaves de YouTube:
    ```typescript
    export const environment = {
      production: false,
      youtubeApiKey: 'TU_API_KEY',
      playlistId: 'TU_PLAYLIST_ID'
    };
    ```

3.  **Iniciar Servidor de Desarrollo:**
    ```bash
    npm start
    ```

## 🖼️ Guía de Recursos (Imágenes)

Para que el portafolio luzca impecable, asegúrate de añadir los siguientes archivos en `public/`:

### Logos de Tecnologías (`public/icons/`)
-   **Archivos:** `csharp.png`, `postgres.png`, `docker.png`, `node.png`, `angular.webp`, `ts.png`.
-   **Tamaño:** 256x256 px o 512x512 px (PNG transparente o WebP).

### Proyectos (`public/resources/`)
-   **Proyecto Tobon:** `proyecto-tobon.webp` (1200x800 px).
-   **Teslo Shop:** `teslo-shop.webp` (1200x600 px).
-   **Puntum Suite:** `puntum.webp` (800x800 px).
-   **Otros Proyectos:** 800x600 px.

---
Desarrollado con ❤️ por Jhon Mario Durango.
