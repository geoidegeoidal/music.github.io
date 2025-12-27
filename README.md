# 🌆 NEON BEATS // Cyberpunk Music Terminal

<div align="center">

![Music](https://img.shields.io/badge/Style-Cyberpunk-cyan?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Una terminal de música inmersiva para los nómadas digitales del futuro.** 🎧

[🌐 Ver Demo](https://geoidegeoidal.github.io/music.github.io/) | [📝 Reportar Bug](https://github.com/geoidegeoidal/music.github.io/issues)

</div>

---

## 📖 Sobre el Proyecto

**NEON BEATS** es más que un reproductor de música; es una experiencia visual y auditiva diseñada bajo una estética Cyberpunk/Synthwave. Permite a los usuarios gestionar su propia lista de reproducción de YouTube directamente desde la interfaz, todo envuelto en una atmósfera neón con efectos visuales dinámicos.

### ✨ Características Principales

- 📺 **Reproductor YouTube Integrado** - Disfruta de tus tracks favoritos sin salir de la terminal.
- 🛠️ **Gestión Dinámica de Enlaces** - Añade y elimina videos de YouTube en tiempo real.
- 🎨 **Visualizador Cyber-Master** - 6 modos optimizados de alta fidelidad (Neon Nebula, Liquid Horizon, Cyber Grid 3D, Void Portal, Stardust Cascade, Digital Sonar).
- 💾 **Persistencia Local** - Tus enlaces personalizados se guardan automáticamente en el navegador (`localStorage`).
- ⌨️ **Atajos de Teclado** - Control total mediante comandos rápidos.
- 🌊 **Estética Inmersiva** - Fondo de rejilla animada, líneas de escaneo (scanlines) y efectos de glitch.
- 📱 **Diseño Responsive** - Optimizado para terminales de todos los tamaños.

---

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica avanzada y API de `Canvas`.
- **CSS3 (Custom Properties & Animations)** - Sistema de diseño basado en variables neón y animaciones complejas.
- **JavaScript (Vanilla)** - Lógica de gestión de estado, manipulación del DOM y renderizado 2D/3D procedural.
- **YouTube Iframe API** - Integración robusta del reproductor.
- **Google Fonts** - Tipografías *Orbitron* y *Rajdhani* para ese acabado futurista.

---

## ⌨️ Atajos de Teclado (Control de Sistema)

| Comando | Acción |
| :--- | :--- |
| `Ctrl + A` | **Add**: Abrir consola para añadir nuevo enlace |
| `Ctrl + R` | **Remove**: Abrir consola para eliminar enlaces |
| `Ctrl + V` | **Visuals**: Alternar entre modo Video y Visualizador |
| `Ctrl + E` | **Effect**: Cambiar al siguiente efecto visual |

---

## 💻 Instalación y Desarrollo Local

### Requisitos
- Navegador web moderno con soporte para `Canvas` y `LocalStorage`.
- Conexión a la red para la carga de datos de YouTube.

### Pasos
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/geoidegeoidal/music.github.io.git
   ```
2. **Acceder al directorio**:
   ```bash
   cd music.github.io
   ```
3. **Ejecutar**:
   Simplemente abre `index.html` en tu navegador o usa un servidor local como *Live Server* o `python -m http.server`.

---

## 🎨 Personalización y Configuración

El sistema está diseñado para ser extensible:

- **Estilos**: Modifica las variables en `:root` dentro de `styles.css` para cambiar los colores neón dominantes.
- **Enlaces por Defecto**: Puedes editar el array `musicLinks` en `script.js` para pre-cargar tus propios tracks.

---

## 🤝 Contribuciones

Si deseas hackear el sistema y proponer mejoras:

1. Realiza un **Fork** del proyecto.
2. Crea una **rama** de feature (`git checkout -b feature/NewSync`).
3. Realiza tus **commits** (`git commit -m 'Add: New Sync Feature'`).
4. Haz **Push** a la rama (`git push origin feature/NewSync`).
5. Abre un **Pull Request**.

---

## 👤 Autor

**geoidegeoidal**

- GitHub: [@geoidegeoidal](https://github.com/geoidegeoidal)
- Repo: [music.github.io](https://github.com/geoidegeoidal/music.github.io)

---

<div align="center">

**Hecho con 💜 para los amantes del Cyberpunk y la música lofi**

⭐ Si te gusta este proyecto, considera darle una estrella en el repositorio.

</div>
