# 🎵 Lofi Music Player

<div align="center">

![Music](https://img.shields.io/badge/Music-Lofi-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Un espacio para los que disfrutan el fino arte de escuchar música lofi** 🎧

[🌐 Ver Demo](https://geoidegeoidal.github.io/music.github.io/) | [📝 Reportar Bug](https://github.com/geoidegeoidal/music.github.io/issues)

</div>

---

## 📖 Sobre el Proyecto

**Lofi Music Player** es una aplicación web minimalista y elegante diseñada para reproducir música lofi de YouTube. Con una interfaz limpia y un efecto visual de ruido animado, proporciona una experiencia relajante perfecta para estudiar, trabajar o simplemente relajarse.

### ✨ Características

- 🎬 **Reproductor de YouTube embebido** - Reproducción directa de videos lofi
- 🎨 **Diseño minimalista** - Interfaz oscura y elegante
- 🌊 **Efecto de ruido animado** - Fondo con animación de grano para ambiente retro
- 🎯 **6 opciones de música** - Selección curada de tracks lofi
- 📱 **Responsive** - Se adapta a diferentes tamaños de pantalla
- ⚡ **Carga rápida** - Sin dependencias pesadas

---

## 🖼️ Vista Previa

<div align="center">

```
┌─────────────────────────────────────────────┐
│  Opción 1 | Opción 2 | Opción 3 | ...      │
├─────────────────────────────────────────────┤
│                                             │
│         [Reproductor de YouTube]            │
│                                             │
│         🎵 Lofi beats to study to 🎵       │
│                                             │
└─────────────────────────────────────────────┘
```

*Interfaz con fondo animado y reproductor centrado*

</div>

---

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y animaciones
- **JavaScript (Vanilla)** - Interactividad sin frameworks
- **YouTube Embed iframes** - Integración de videos
- **Google Fonts** - Tipografía Delicious Handrawn

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
2. Haz clic en cualquiera de las opciones del menú superior (Opción 1-6)
3. Disfruta de la música lofi 🎶
4. Cambia de track cuando quieras haciendo clic en otra opción

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

- **`index.html`**: Contiene la estructura HTML con el navegador de opciones y el contenedor del reproductor
- **`styles.css`**: Define el tema oscuro, la animación de ruido de fondo y el diseño responsive
- **`script.js`**: Maneja los eventos de clic y carga los videos de YouTube dinámicamente

---

## 🎨 Personalización

### Agregar Nuevas Canciones

Edita el archivo `index.html` y agrega un nuevo elemento `<li>` con el ID del video de YouTube:

```html
<li><a href="#" data-video-id="TU_VIDEO_ID_AQUI">Opción 7</a></li>
```

### Cambiar Colores

Edita `styles.css` y modifica las variables de color:

```css
background-color: #111111;  /* Color de fondo */
background-color: #2d2d2d;  /* Color del navegador */
color: #fff;                /* Color del texto */
```

### Ajustar el Tamaño del Reproductor

Modifica el `padding-bottom` en `styles.css`:

```css
#player-container {
    padding-bottom: 42%;  /* Ajusta este valor */
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

- 🎵 Agregar más opciones de música
- 🎨 Mejorar el diseño visual
- 📱 Optimizar para móviles
- ⚙️ Agregar controles personalizados
- 🌙 Implementar tema claro/oscuro
- 💾 Guardar preferencias del usuario

---

## 📝 Lista de Tareas

- [x] Reproductor básico de YouTube
- [x] Navegación entre videos
- [x] Efecto de ruido animado
- [x] Diseño responsive
- [ ] Agregar más videos
- [ ] Control de volumen
- [ ] Lista de reproducción automática
- [ ] Modo de pantalla completa

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

- Gracias a todos los creadores de música lofi en YouTube
- Inspirado en la comunidad de música lofi hip hop
- Efecto de ruido inspirado en técnicas de texturización web

---

<div align="center">

**Hecho con 💜 para los amantes de la música lofi**

⭐ Si te gusta este proyecto, considera darle una estrella

</div>