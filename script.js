// ========================================
// CYBERPUNK MUSIC PLAYER - LINK MANAGEMENT SYSTEM
// ========================================

// Configuration: Easy to add/remove links
const musicLinks = [
  {
    name: "Lofi Hip Hop",
    category: "Beats to Relax",
    videoId: "jfKfPfyJRdk",
    alternateId: "5qap5aO4i9A" // Lofi Girl - beats to relax/study to
  },
  {
    name: "Synthwave Mix",
    category: "Cyberpunk Vibes",
    videoId: "4xDzrJKXOOY",
    alternateId: "MVPTGNGiI-4" // The Midnight - Synthwave Mix
  },
  {
    name: "Chillwave",
    category: "Dreamy Sounds",
    videoId: "UedTcufyrHc",
    alternateId: "rUxyKA_-grg" // ChilledCow - Chillhop Music
  },
  {
    name: "Cyberpunk 2077",
    category: "Game Soundtrack",
    videoId: "P0Ggoot0l3g",
    alternateId: "P_B_GalsJrE" // Cyberpunk 2077 Radio Mix
  },
  {
    name: "Dark Synthwave",
    category: "Night Drive",
    videoId: "qk07gNH95yE",
    alternateId: "qk07gNH95yE" // Dark Synthwave Mix
  },
  {
    name: "Lofi Jazz",
    category: "Study Music",
    videoId: "Dx5qFachd3A",
    alternateId: "DWcJFNfaw9c" // Lofi Jazz Hip Hop Mix
  },
  {
    name: "Outrun",
    category: "Retro Wave",
    videoId: "MV_3Dpw-BRY",
    alternateId: "MV_3Dpw-BRY" // Outrun Mix
  },
  {
    name: "Blade Runner",
    category: "Ambient Sci-Fi",
    videoId: "RScZrvTebeA",
    alternateId: "RScZrvTebeA" // Blade Runner Blues
  }
];

// ========================================
// DOM ELEMENTS
// ========================================

const playerContainer = document.querySelector('#player-container');
const navLinksContainer = document.querySelector('#nav-links');
const addLinkBtn = document.querySelector('#add-link-btn');
const removeLinkBtn = document.querySelector('#remove-link-btn');
const visualizerBtn = document.querySelector('#visualizer-btn');
const changeEffectBtn = document.querySelector('#change-effect-btn');

// ========================================
// VISUALIZER STATE
// ========================================

let isVisualizerMode = false;
let currentEffectIndex = 0;
let visualizerAnimation = null;
const effects = ['NEON ORB', 'SILK FLOW', 'ZEN RAIN', 'INFINITY CIRCLE', 'SACRED MANDALA', 'COSMIC MIST'];

// Audio API State
let audioContext = null;
let analyser = null;
let dataArray = null;
let source = null;
let audioInitStarted = false;

function getVisualizerCanvas() {
  return document.querySelector('#visualizer-canvas');
}

// ========================================
// INITIALIZE LINKS
// ========================================

function initializeLinks() {
  navLinksContainer.innerHTML = '';

  musicLinks.forEach((link, index) => {
    const linkElement = document.createElement('a');
    linkElement.className = 'nav-link';
    linkElement.href = '#';
    linkElement.dataset.videoId = link.videoId;
    linkElement.dataset.index = index;
    linkElement.innerHTML = `
      <span class="link-name">${link.name}</span>
      <span class="link-category">${link.category}</span>
    `;

    linkElement.addEventListener('click', handleLinkClick);
    navLinksContainer.appendChild(linkElement);
  });
}

// ========================================
// HANDLE LINK CLICK
// ========================================

function handleLinkClick(event) {
  event.preventDefault();

  const videoId = event.currentTarget.dataset.videoId;
  const index = parseInt(event.currentTarget.dataset.index);
  const link = musicLinks[index];

  // Remove active class from all links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // Add active class to clicked link
  event.currentTarget.classList.add('active');

  // Stop visualizer if active
  if (isVisualizerMode) {
    stopVisualizer();
    isVisualizerMode = false;
    visualizerBtn.textContent = '🎨 VISUAL EFFECTS';
    visualizerBtn.style.borderColor = 'var(--neon-cyan)';
    visualizerBtn.style.color = 'var(--neon-cyan)';
  }

  // Load video with enhanced styling
  // Note: alternateId is available for future fallback implementation
  const primaryVideoId = link.videoId;

  // Get existing canvas before replacing innerHTML
  const existingCanvas = playerContainer.querySelector('#visualizer-canvas');

  playerContainer.innerHTML = `
    <iframe 
      id="youtube-player"
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/${primaryVideoId}?autoplay=1&enablejsapi=1" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;

  // Re-add the canvas element if it existed
  if (existingCanvas) {
    playerContainer.appendChild(existingCanvas);
  } else {
    // Create canvas if it doesn't exist
    const canvas = document.createElement('canvas');
    canvas.id = 'visualizer-canvas';
    canvas.className = 'visualizer-canvas';
    canvas.style.display = 'none';
    playerContainer.appendChild(canvas);
  }
}

// ========================================
// ADD LINK FUNCTIONALITY
// ========================================

function showAddLinkModal() {
  const modal = createModal('Add New Link', [
    { label: 'Link Name', id: 'link-name', placeholder: 'e.g., Vaporwave Mix' },
    { label: 'Category', id: 'link-category', placeholder: 'e.g., Retro Vibes' },
    { label: 'YouTube Video ID', id: 'video-id', placeholder: 'e.g., dQw4w9WgXcQ' }
  ], (data) => {
    if (data.name && data.category && data.videoId) {
      musicLinks.push({
        name: data.name,
        category: data.category,
        videoId: data.videoId
      });
      initializeLinks();
      saveLinksToCookie();
      showNotification('Link added successfully!', 'success');
    }
  });

  document.body.appendChild(modal);
}

// ========================================
// REMOVE LINK FUNCTIONALITY
// ========================================

function showRemoveLinkModal() {
  if (musicLinks.length === 0) {
    showNotification('No links to remove!', 'error');
    return;
  }

  const modal = document.createElement('div');
  modal.className = 'modal active';

  let optionsHTML = musicLinks.map((link, index) =>
    `<div style="margin: 10px 0;">
      <label style="display: flex; align-items: center; cursor: pointer;">
        <input type="checkbox" value="${index}" style="width: auto; margin-right: 10px;">
        <span>${link.name} - ${link.category}</span>
      </label>
    </div>`
  ).join('');

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Remove Links</h2>
      <p style="margin-bottom: 15px; color: var(--text-secondary);">Select links to remove:</p>
      <div style="max-height: 300px; overflow-y: auto;">
        ${optionsHTML}
      </div>
      <div class="modal-buttons">
        <button class="modal-btn cancel">Cancel</button>
        <button class="modal-btn confirm">Remove Selected</button>
      </div>
    </div>
  `;

  const cancelBtn = modal.querySelector('.cancel');
  const confirmBtn = modal.querySelector('.confirm');

  cancelBtn.addEventListener('click', () => {
    modal.remove();
  });

  confirmBtn.addEventListener('click', () => {
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]:checked');
    const indicesToRemove = Array.from(checkboxes).map(cb => parseInt(cb.value));

    if (indicesToRemove.length > 0) {
      // Remove in reverse order to maintain correct indices
      indicesToRemove.sort((a, b) => b - a).forEach(index => {
        musicLinks.splice(index, 1);
      });

      initializeLinks();
      saveLinksToCookie();
      showNotification(`${indicesToRemove.length} link(s) removed!`, 'success');
    }

    modal.remove();
  });

  document.body.appendChild(modal);
}

// ========================================
// MODAL CREATOR
// ========================================

function createModal(title, fields, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'modal active';

  const fieldsHTML = fields.map(field => `
    <div>
      <label for="${field.id}">${field.label}</label>
      <input type="text" id="${field.id}" placeholder="${field.placeholder}">
    </div>
  `).join('');

  modal.innerHTML = `
    <div class="modal-content">
      <h2>${title}</h2>
      ${fieldsHTML}
      <div class="modal-buttons">
        <button class="modal-btn cancel">Cancel</button>
        <button class="modal-btn confirm">Confirm</button>
      </div>
    </div>
  `;

  const cancelBtn = modal.querySelector('.cancel');
  const confirmBtn = modal.querySelector('.confirm');

  cancelBtn.addEventListener('click', () => {
    modal.remove();
  });

  confirmBtn.addEventListener('click', () => {
    const data = {};
    fields.forEach(field => {
      const input = modal.querySelector(`#${field.id}`);
      const key = field.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      data[key] = input.value;
    });

    onConfirm(data);
    modal.remove();
  });

  return modal;
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? 'rgba(0, 243, 255, 0.2)' : 'rgba(255, 0, 110, 0.2)'};
    border: 2px solid ${type === 'success' ? 'var(--neon-cyan)' : 'var(--neon-magenta)'};
    color: white;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.9rem;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 0 20px ${type === 'success' ? 'var(--neon-cyan)' : 'var(--neon-magenta)'};
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// COOKIE MANAGEMENT (Optional persistence)
// ========================================

function saveLinksToCookie() {
  try {
    localStorage.setItem('cyberpunk-music-links', JSON.stringify(musicLinks));
  } catch (e) {
    console.log('Could not save to localStorage');
  }
}

function loadLinksFromCookie() {
  try {
    const saved = localStorage.getItem('cyberpunk-music-links');
    if (saved) {
      const loadedLinks = JSON.parse(saved);
      musicLinks.length = 0;
      musicLinks.push(...loadedLinks);
    }
  } catch (e) {
    console.log('Could not load from localStorage');
  }
}

// ========================================
// VISUALIZER FUNCTIONALITY
// ========================================

async function initAudio() {
  if (audioInitStarted) return;
  audioInitStarted = true;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaStreamSource(stream);

    source.connect(analyser);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    showNotification('Microphone synced successfully!', 'success');
  } catch (err) {
    console.error('Audio initialization failed:', err);
    showNotification('Mic access denied. Using simulated beats.', 'error');
    audioInitStarted = false; // Allow retry
  }
}

function toggleVisualizer() {
  isVisualizerMode = !isVisualizerMode;

  if (isVisualizerMode) {
    if (!audioContext) initAudio();

    visualizerBtn.textContent = '📺 VIDEO MODE';
    visualizerBtn.style.borderColor = 'var(--neon-pink)';
    visualizerBtn.style.color = 'var(--neon-pink)';
    changeEffectBtn.style.display = 'inline-block';
    startVisualizer();
    showNotification(`Visuals activated: ${effects[currentEffectIndex]}`, 'success');
  } else {
    visualizerBtn.textContent = '🎨 VISUAL EFFECTS';
    visualizerBtn.style.borderColor = 'var(--neon-cyan)';
    visualizerBtn.style.color = 'var(--neon-cyan)';
    changeEffectBtn.style.display = 'none';
    stopVisualizer();
    showNotification('Video mode activated!', 'success');
  }
}

function changeEffect() {
  currentEffectIndex = (currentEffectIndex + 1) % effects.length;
  showNotification(`Effect: ${effects[currentEffectIndex]}`, 'success');

  // Restart with new effect
  if (isVisualizerMode) {
    stopVisualizer();
    startVisualizer();
  }
}

function startVisualizer() {
  const visualizerCanvas = getVisualizerCanvas();
  if (!visualizerCanvas) return;

  visualizerCanvas.style.display = 'block';
  const canvas = visualizerCanvas;
  const ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  // State for effects
  let frame = 0;
  const particles = [];

  // Initialize particles for sphere/storm
  function initParticles(count) {
    particles.length = 0;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000 - 500,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 0.5,
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 200 + 50,
        color: i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-pink)'
      });
    }
  }

  initParticles(200);

  function animate() {
    if (!isVisualizerMode) return;
    frame++;

    // Clear canvas
    ctx.fillStyle = 'rgba(5, 5, 8, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reactivity Logic
    let bassPulse = 1;
    let midPulse = 1;

    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);

      // Calculate averages for different frequency bands
      // Bass is usually 0-10 in an array of size 128 (fftSize 256)
      let bassSum = 0;
      for (let i = 0; i < 10; i++) bassSum += dataArray[i];
      let bassAvg = bassSum / 10;

      // Mid frequencies
      let midSum = 0;
      for (let i = 10; i < 40; i++) midSum += dataArray[i];
      let midAvg = midSum / 30;

      bassPulse = 1 + (bassAvg / 255) * 1.2;
      midPulse = 1 + (midAvg / 255) * 0.8;
    } else {
      // Fallback to simulation if mic is not available
      const time = Date.now() * 0.001;
      const rhythm = Math.sin(time * 2) * 0.5 + Math.sin(time * 4) * 0.3 + Math.sin(time * 8) * 0.2;
      const beat = Math.pow(Math.abs(rhythm), 4) * 1.5;
      bassPulse = 1 + beat * 0.5;
    }

    if (effects[currentEffectIndex] === 'NEON ORB') {
      drawOrb(ctx, canvas, frame, bassPulse);
    } else if (effects[currentEffectIndex] === 'SILK FLOW') {
      drawSilk(ctx, canvas, frame, bassPulse);
    } else if (effects[currentEffectIndex] === 'ZEN RAIN') {
      drawRain(ctx, canvas, frame, bassPulse, particles);
    } else if (effects[currentEffectIndex] === 'INFINITY CIRCLE') {
      drawCircleTunnel(ctx, canvas, frame, bassPulse, midPulse);
    } else if (effects[currentEffectIndex] === 'SACRED MANDALA') {
      drawMandala(ctx, canvas, frame, bassPulse);
    } else if (effects[currentEffectIndex] === 'COSMIC MIST') {
      drawMist(ctx, canvas, frame, bassPulse, midPulse, particles);
    }

    visualizerAnimation = requestAnimationFrame(animate);
  }

  function drawOrb(ctx, canvas, frame, pulse) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const count = 1200;
    const radius = Math.min(canvas.width, canvas.height) * 0.25 * pulse;

    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      let x = radius * Math.cos(theta) * Math.sin(phi);
      let y = radius * Math.sin(theta) * Math.sin(phi);
      let z = radius * Math.cos(phi);

      const rotX = frame * 0.005;
      const rotY = frame * 0.007;

      let nx = x * Math.cos(rotY) + z * Math.sin(rotY);
      let nz = -x * Math.sin(rotY) + z * Math.cos(rotY);
      x = nx; z = nz;

      let ny = y * Math.cos(rotX) - z * Math.sin(rotX);
      nz = y * Math.sin(rotX) + z * Math.cos(rotX);
      y = ny; z = nz;

      const perspective = 800 / (800 - z);
      const px = x * perspective;
      const py = y * perspective;
      const pSize = Math.max(0.05, 1.0 * perspective * pulse);

      const alpha = Math.max(0.1, (z + radius) / (2 * radius)) * 0.6;
      ctx.fillStyle = i % 2 === 0 ? `rgba(0, 243, 255, ${alpha})` : `rgba(189, 0, 255, ${alpha})`;

      ctx.beginPath();
      ctx.arc(px, py, pSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSilk(ctx, canvas, frame, pulse) {
    const lines = 8;
    const spacing = canvas.height / (lines + 1);

    for (let j = 0; j < lines; j++) {
      ctx.beginPath();
      ctx.lineWidth = 1.5 * pulse;
      const hue = (200 + j * 10 + frame * 0.2) % 360;
      ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${0.3 * pulse})`;

      for (let i = 0; i < canvas.width; i += 10) {
        const yOffset = Math.sin(i * 0.005 + frame * 0.02 + j) * 60 * pulse;
        const y = (j + 1) * spacing + yOffset;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.bezierCurveTo(i - 5, y, i - 5, y, i, y);
      }
      ctx.stroke();
    }
  }

  function drawRain(ctx, canvas, frame, pulse, particles) {
    particles.forEach(p => {
      p.y += p.speed * 2 * pulse; // Slower, more peaceful
      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      const opacity = Math.min(0.4, (p.speed / 2) * pulse);
      ctx.fillStyle = p.color === 'var(--neon-cyan)' ? `rgba(0, 243, 255, ${opacity})` : `rgba(189, 0, 255, ${opacity})`;

      const length = 20 * p.speed * pulse;
      ctx.fillRect(p.x, p.y, 1, length);
    });
  }

  function drawCircleTunnel(ctx, canvas, frame, pulse, midPulse) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rings = 12;

    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < rings; i++) {
      const z = (i * 60 + frame * 1.5 * pulse) % (rings * 60);
      const radius = (rings * 60 - z) * pulse;
      const alpha = (1 - z / (rings * 60)) * 0.5;

      ctx.beginPath();
      ctx.strokeStyle = i % 2 === 0 ? `rgba(0, 243, 255, ${alpha})` : `rgba(189, 0, 255, ${alpha})`;
      ctx.lineWidth = 1 * midPulse;
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Secondary aura
      ctx.beginPath();
      ctx.strokeStyle = `rgba(189, 0, 255, ${alpha * 0.2})`;
      ctx.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawMandala(ctx, canvas, frame, pulse) {
    const slices = 12;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(frame * 0.005);

    for (let i = 0; i < slices; i++) {
      ctx.rotate((Math.PI * 2) / slices);

      ctx.beginPath();
      const hue = (220 + i * 15) % 360;
      ctx.strokeStyle = `hsla(${hue}, 70%, 70%, ${0.4 * pulse})`;
      ctx.lineWidth = 1;

      const x = Math.sin(frame * 0.02) * 150 * pulse;
      const y = Math.cos(frame * 0.02) * 150;

      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(x, y, 0, 200 * pulse);
      ctx.stroke();

      // Soft circles at ends
      ctx.fillStyle = `hsla(${hue}, 80%, 80%, ${0.2 * pulse})`;
      ctx.beginPath();
      ctx.arc(0, 200 * pulse, 5 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawMist(ctx, canvas, frame, pulse, midPulse, particles) {
    ctx.globalAlpha = 0.5;
    particles.forEach((p, i) => {
      p.angle += 0.005 * p.speed;

      const radius = p.distance * midPulse * 1.5;
      const x = canvas.width / 2 + Math.cos(p.angle) * radius;
      const y = canvas.height / 2 + Math.sin(p.angle) * radius;

      ctx.beginPath();
      const hue = (240 + p.distance * 0.1 + frame * 0.1) % 360;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, p.size * 10 * pulse);
      grad.addColorStop(0, `hsla(${hue}, 90%, 70%, ${0.3 * pulse})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.arc(x, y, p.size * 15 * pulse, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;
  }

  animate();
}

function stopVisualizer() {
  if (visualizerAnimation) {
    cancelAnimationFrame(visualizerAnimation);
    visualizerAnimation = null;
  }
  const visualizerCanvas = getVisualizerCanvas();
  if (visualizerCanvas) {
    visualizerCanvas.style.display = 'none';
  }
}

// Handle window resize for visualizer
window.addEventListener('resize', () => {
  const visualizerCanvas = getVisualizerCanvas();
  if (isVisualizerMode && visualizerCanvas) {
    visualizerCanvas.width = visualizerCanvas.offsetWidth;
    visualizerCanvas.height = visualizerCanvas.offsetHeight;
  }
});

// ========================================
// EVENT LISTENERS
// ========================================

addLinkBtn.addEventListener('click', showAddLinkModal);
removeLinkBtn.addEventListener('click', showRemoveLinkModal);
visualizerBtn.addEventListener('click', toggleVisualizer);
changeEffectBtn.addEventListener('click', changeEffect);

// ========================================
// INITIALIZE ON LOAD
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  loadLinksFromCookie();
  initializeLinks();

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Press 'A' to add link
    if (e.key === 'a' && e.ctrlKey) {
      e.preventDefault();
      showAddLinkModal();
    }
    // Press 'R' to remove link
    if (e.key === 'r' && e.ctrlKey) {
      e.preventDefault();
      showRemoveLinkModal();
    }
    // Press 'V' to toggle visualizer
    if (e.key === 'v' && e.ctrlKey) {
      e.preventDefault();
      toggleVisualizer();
    }
    // Press 'E' to change effect
    if (e.key === 'e' && e.ctrlKey) {
      e.preventDefault();
      changeEffect();
    }
  });

  console.log('%c🌆 CYBERPUNK MUSIC PLAYER 🌆', 'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
  console.log('%cSystem initialized. Ready to jack in...', 'color: #ff00ff; font-size: 14px;');
  console.log('%cKeyboard Shortcuts: Ctrl+A (Add) | Ctrl+R (Remove) | Ctrl+V (Visuals) | Ctrl+E (Change Effect)', 'color: #a0a0ff; font-size: 12px;');
});

// Load links when script loads
loadLinksFromCookie();
initializeLinks();
