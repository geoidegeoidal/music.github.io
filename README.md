# 🌆 NEON BEATS - Cyberpunk Music Player

<div align="center">

![Music](https://img.shields.io/badge/Music-Cyberpunk%20%7C%20Synthwave-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-ONLINE-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Sumérgete en el mundo cyberpunk con beats synthwave, lofi y música ambiental** 🎧⚡

[🌐 Ver Demo](https://geoidegeoidal.github.io/music.github.io/) | [📝 Reportar Bug](https://github.com/geoidegeoidal/music.github.io/issues)

</div>

---

## 📖 Sobre el Proyecto

**NEON BEATS** es una aplicación web cyberpunk diseñada para reproducir música synthwave, lofi y ambient de YouTube. Con una interfaz futurista inspirada en la estética cyberpunk, efectos visuales de scanlines y grid animado, proporciona una experiencia inmersiva perfecta para programar, estudiar o sumergirse en el futuro digital.

### ✨ Características

- 🎬 **Reproductor de YouTube embebido** - Reproducción directa de videos
- 🎨 **Estética Cyberpunk** - Interfaz futurista con efectos neon y glitch
- 🌐 **Grid animado y Scanlines** - Efectos visuales inmersivos
- ➕ **Gestión dinámica de links** - Añade y elimina canciones en tiempo real
- 💾 **Persistencia con LocalStorage** - Tus links personalizados se guardan automáticamente
- ⌨️ **Atajos de teclado** - Ctrl+A (añadir) | Ctrl+R (eliminar)
- 🎯 **8 tracks curados** - Mix de lofi, synthwave, cyberpunk y ambient
- 🔔 **Sistema de notificaciones** - Feedback visual con estilo cyberpunk
- 📱 **Responsive** - Se adapta a diferentes tamaños de pantalla
- ⚡ **Vanilla JavaScript** - Sin dependencias, carga ultra rápida

---

## 🖼️ Vista Previa

<div align="center">

```
┌──────────────────────────────────────────────────────────────┐
│  NEON BEATS // CYBERPUNK MUSIC TERMINAL //                  │
├──────────────────────────────────────────────────────────────┤
│  [Lofi Hip Hop] [Synthwave Mix] [Chillwave] [+ ADD LINK]    │
│  [Cyberpunk 2077] [Dark Synthwave] [Lofi Jazz] [- REMOVE]   │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│               [Reproductor de YouTube]                       │
│                                                              │
│           🌆 Cyberpunk Beats to Code To 🌆                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

*Interfaz cyberpunk con grid animado, scanlines y efectos neon*

</div>

---

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos avanzados con animaciones y efectos visuales
  - Grid animado cyberpunk
  - Scanlines y efectos glitch
  - Neon glow effects
- **JavaScript (Vanilla)** - Interactividad sin frameworks
  - Sistema de gestión de links dinámico
  - LocalStorage para persistencia
  - Modales interactivos
  - Sistema de notificaciones
- **YouTube Embed API** - Integración de videos
- **Google Fonts** - Tipografías Orbitron y Rajdhani (cyberpunk)

---

## 💻 Instalación y Uso

### Requisitos Previos

- Un navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para cargar videos de YouTube)

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/geoidegeoidal/music.github.io.git
   ```

2. **Navega al directorio**
   ```bash
   cd music.github.io
   ```

3. **Abre el archivo en tu navegador**
   ```bash
   # Opción 1: Abre directamente
   open index.html
   
   # Opción 2: Usa un servidor local
   python -m http.server 8000
   # Luego visita http://localhost:8000
   ```

### Uso

1. Abre la página web
2. Haz clic en cualquiera de los links de música en el navegador superior
3. Disfruta de la música 🎶
4. **Añadir nuevos links:** Haz clic en "+ ADD LINK" o presiona `Ctrl+A`
5. **Eliminar links:** Haz clic en "- REMOVE LINK" o presiona `Ctrl+R`
6. Tus links personalizados se guardan automáticamente en tu navegador

---

## 📁 Estructura del Proyecto

```
music.github.io/
│
├── index.html          # Estructura principal de la página
├── styles.css          # Estilos y animaciones
├── script.js           # Lógica de reproducción
└── README.md           # Este archivo
```

### Descripción de Archivos

- **`index.html`**: Estructura HTML con header cyberpunk, navegador de links dinámico y contenedor del reproductor
- **`styles.css`**: Tema cyberpunk completo con grid animado, scanlines, efectos glitch, neon glow y diseño responsive
- **`script.js`**: Sistema completo de gestión de links, persistencia con localStorage, modales interactivos, notificaciones y atajos de teclado

---

## 🎨 Personalización

### Agregar Nuevas Canciones

**Opción 1: Mediante la interfaz (Recomendado)**
1. Haz clic en el botón "+ ADD LINK" o presiona `Ctrl+A`
2. Completa el formulario:
   - **Link Name:** Nombre del track (ej: "Vaporwave Mix")
   - **Category:** Categoría descriptiva (ej: "Retro Vibes")
   - **YouTube Video ID:** ID del video (ej: "dQw4w9WgXcQ")
3. Haz clic en "Confirm"
4. ¡Tu link se guarda automáticamente!

**Opción 2: Editar código directamente**

Edita el archivo `script.js` y añade un nuevo objeto al array `musicLinks`:

```javascript
{
  name: "Tu Canción",
  category: "Tu Categoría",
  videoId: "ID_DEL_VIDEO"
}
```

### Eliminar Links

1. Haz clic en "- REMOVE LINK" o presiona `Ctrl+R`
2. Selecciona los links que deseas eliminar
3. Confirma la acción

### Cambiar Colores del Tema

Edita `styles.css` y modifica las variables CSS en `:root`:

```css
:root {
  --neon-cyan: #00f3ff;      /* Cyan neon */
  --neon-pink: #ff00ff;      /* Pink neon */
  --neon-purple: #bd00ff;    /* Purple neon */
  --dark-bg: #0a0a0f;        /* Fondo oscuro */
  --grid-color: rgba(0, 243, 255, 0.2); /* Color del grid */
}
```

### Ajustar Animaciones

Modifica las animaciones del grid y scanlines en `styles.css`:

```css
.cyberpunk-grid {
  animation: gridPulse 4s ease-in-out infinite; /* Velocidad del grid */
}

.scanlines {
  animation: scan 8s linear infinite; /* Velocidad de scanlines */
}
```

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas y apreciadas. Si deseas mejorar el proyecto:

1. **Fork** el proyecto
2. Crea una **rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. Abre un **Pull Request**

### Ideas para Contribuir

- 🎵 Agregar más opciones de música predeterminadas
- 🎨 Crear temas alternativos (Matrix, Tron, etc.)
- 📱 Mejorar la experiencia móvil
- ⚙️ Agregar controles personalizados del reproductor
- 🌙 Implementar más efectos visuales (particles, etc.)
- 💾 Exportar/importar configuración de links
- 🔊 Control de volumen integrado
- 🎭 Modo teatro/pantalla completa
- 🎲 Reproducción aleatoria
- 📋 Crear playlists personalizadas

---

## 📝 Lista de Tareas

- [x] Reproductor básico de YouTube
- [x] Navegación entre videos
- [x] Efectos visuales cyberpunk (grid, scanlines, glitch)
- [x] Diseño responsive
- [x] Sistema de gestión dinámica de links
- [x] Persistencia con LocalStorage
- [x] Atajos de teclado (Ctrl+A, Ctrl+R)
- [x] Sistema de notificaciones
- [x] Modales interactivos
- [ ] Control de volumen integrado
- [ ] Lista de reproducción automática
- [ ] Modo de pantalla completa
- [ ] Exportar/importar configuración
- [ ] Temas alternativos

---

## 📜 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

## 👤 Autor

**geoidegeoidal**

- GitHub: [@geoidegeoidal](https://github.com/geoidegeoidal)
- Proyecto: [music.github.io](https://github.com/geoidegeoidal/music.github.io)

---

## 🌟 Agradecimientos

- Gracias a todos los creadores de música synthwave, lofi y cyberpunk en YouTube
- Inspirado en la estética de Blade Runner, Cyberpunk 2077 y la cultura synthwave
- Comunidad de desarrolladores web y entusiastas del cyberpunk
- Efectos visuales inspirados en terminales retro y animaciones futuristas

---

<div align="center">

**Hecho con 💜 y ⚡ para los amantes del cyberpunk y la música synthwave**

⭐ Si te gusta este proyecto, considera darle una estrella

🌆 **Welcome to the future. Jack in and press play.** 🌆

</div>