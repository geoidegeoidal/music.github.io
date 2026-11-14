# 🌆 NEON BEATS // Cyberpunk Music Terminal

<div align="center">

![Music](https://img.shields.io/badge/Style-Cyberpunk-cyan?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**Una terminal de música inmersiva para los nómadas digitales del futuro.** 🎧

[🌐 Abrir reproductor](https://geoidegeoidal.github.io/music.github.io/) · [⌨️ Controles](#controles) · [💻 Desarrollo local](#desarrollo-local) · [📝 Reportar bug](https://github.com/geoidegeoidal/music.github.io/issues)

</div>

---

## Primeros pasos

1. Abre el [reproductor web](https://geoidegeoidal.github.io/music.github.io/) y selecciona una entrada de la lista.
2. Usa **Add** para añadir nombre, categoría e **ID del video de YouTube**; el campo no solicita la URL completa.
3. Alterna entre video y visualizador, y cambia de efecto con los controles de la interfaz o los atajos.

> **Conexión necesaria:** el audio y video se reproducen desde YouTube, no desde archivos incluidos en este repositorio. La disponibilidad depende del video, de los permisos de reproducción insertada y del navegador. No es un reproductor offline.

## 📖 Sobre el Proyecto

**NEON BEATS** es más que un reproductor de música; es una experiencia visual y auditiva diseñada bajo una estética Cyberpunk/Synthwave. Permite a los usuarios gestionar su propia lista de reproducción de YouTube directamente desde la interfaz, todo envuelto en una atmósfera neón con efectos visuales dinámicos.

### ✨ Características Principales

- 📺 **Reproductor YouTube Integrado** - Disfruta de tus tracks favoritos sin salir de la terminal.
- 🛠️ **Gestión Dinámica de Enlaces** - Añade y elimina videos de YouTube en tiempo real.
- 🎨 **Visualizador Cyber-Master** - 6 modos visuales (Neon Nebula, Liquid Horizon, Cyber Grid 3D, Void Portal, Stardust Cascade, Digital Sonar).
- 💾 **Persistencia Local** - Tus enlaces personalizados se guardan en este navegador mediante `localStorage`, si el almacenamiento está disponible. No se sincronizan entre dispositivos; borrar los datos del sitio elimina la lista guardada.
- ⌨️ **Atajos de Teclado** - Control total mediante comandos rápidos.
- 🌊 **Estética Inmersiva** - Fondo de rejilla animada, líneas de escaneo (scanlines) y efectos de glitch.
- 📱 **Diseño Responsive** - Optimizado para terminales de todos los tamaños.

---

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica avanzada y API de `Canvas`.
- **CSS3 (Custom Properties & Animations)** - Sistema de diseño basado en variables neón y animaciones complejas.
- **JavaScript (Vanilla)** - Lógica de gestión de estado, manipulación del DOM y renderizado 2D/3D procedural.
- **YouTube embebido** - Reproducción a través de un iframe de YouTube.
- **Google Fonts** - Tipografías *Orbitron* y *Rajdhani* para ese acabado futurista.

---

## Controles

| Comando | Acción |
| :--- | :--- |
| `Ctrl + A` | **Add**: Abrir consola para añadir nuevo enlace |
| `Ctrl + R` | **Remove**: Abrir consola para eliminar enlaces |
| `Ctrl + V` | **Visuals**: Alternar entre modo Video y Visualizador |
| `Ctrl + E` | **Effect**: Cambiar al siguiente efecto visual |

Estos atajos están implementados con `Ctrl` y sustituyen acciones habituales del navegador mientras la página recibe el evento. También puedes usar los controles visibles de la interfaz.

---

## Desarrollo local

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
3. **Servir los archivos** (con Python instalado):
   ```bash
   python -m http.server 8080
   ```
4. Abre [http://localhost:8080](http://localhost:8080). No hay instalación de paquetes ni compilación: el proyecto utiliza HTML, CSS y JavaScript estáticos.

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
3. Realiza tus **commits** (`git commit -m 'feat: add new visual effect'`).
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
