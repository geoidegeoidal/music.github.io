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
const effects = ['ETHEREAL SPHERE', 'AURORA CURTAINS', 'STARDUST CASCADE', 'VOID PORTAL', 'FRACTAL BLOOM', 'NEBULA CORE'];

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

    if (effects[currentEffectIndex] === 'ETHEREAL SPHERE') {
      drawEthereal(ctx, canvas, frame, bassPulse);
    } else if (effects[currentEffectIndex] === 'AURORA CURTAINS') {
      drawAurora(ctx, canvas, frame, bassPulse);
    } else if (effects[currentEffectIndex] === 'STARDUST CASCADE') {
      drawStardust(ctx, canvas, frame, bassPulse, particles);
    } else if (effects[currentEffectIndex] === 'VOID PORTAL') {
      drawVoid(ctx, canvas, frame, bassPulse, midPulse);
    } else if (effects[currentEffectIndex] === 'FRACTAL BLOOM') {
      drawFractal(ctx, canvas, frame, bassPulse);
    } else if (effects[currentEffectIndex] === 'NEBULA CORE') {
      drawNebulaCore(ctx, canvas, frame, bassPulse, midPulse, particles);
    }

    visualizerAnimation = requestAnimationFrame(animate);
  }

  function drawEthereal(ctx, canvas, frame, pulse) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const count = 2000; // High density
    const radius = Math.min(canvas.width, canvas.height) * 0.28 * pulse;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      let x = radius * Math.cos(theta) * Math.sin(phi);
      let y = radius * Math.sin(theta) * Math.sin(phi);
      let z = radius * Math.cos(phi);

      const rot = frame * 0.005;
      let nx = x * Math.cos(rot) + z * Math.sin(rot);
      let nz = -x * Math.sin(rot) + z * Math.cos(rot);
      x = nx; z = nz;

      const perspective = 1000 / (1000 - z);
      const px = x * perspective;
      const py = y * perspective;

      const hue = (i * 0.1 + frame * 0.5) % 360;
      const alpha = Math.max(0.1, (z + radius) / (2 * radius)) * pulse * 0.5;

      ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
      ctx.shadowBlur = 10 * pulse;
      ctx.shadowColor = ctx.fillStyle;

      ctx.beginPath();
      ctx.arc(px, py, 1.2 * perspective, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawAurora(ctx, canvas, frame, pulse) {
    const layers = 5;
    ctx.globalCompositeOperation = 'screen';

    for (let l = 0; l < layers; l++) {
      ctx.beginPath();
      const hue = (160 + l * 40 + frame * 0.1) % 360;
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.5, `hsla(${hue}, 100%, 50%, ${0.2 * pulse})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 40 + l * 20;

      for (let i = 0; i < canvas.width; i += 20) {
        const yOffset = Math.sin(i * 0.002 + frame * 0.01 + l) * 150 * pulse;
        const y = canvas.height / 2 + yOffset;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.bezierCurveTo(i - 10, y - 50, i - 10, y + 50, i, y);
      }
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawStardust(ctx, canvas, frame, pulse, particles) {
    ctx.globalCompositeOperation = 'lighter';
    particles.forEach((p, i) => {
      p.y += p.speed * 1.5 * pulse;
      p.x += Math.sin(frame * 0.01 + i) * 0.5;

      if (p.y > canvas.height) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      const hue = (frame * 0.5 + p.y * 0.1) % 360;
      ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${0.6 * pulse})`;
      ctx.shadowBlur = 15 * pulse;
      ctx.shadowColor = ctx.fillStyle;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
      ctx.fill();

      // Trail
      ctx.beginPath();
      ctx.strokeStyle = `hsla(${hue}, 100%, 50%, ${0.1 * pulse})`;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y - 40 * pulse);
      ctx.stroke();
    });
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawVoid(ctx, canvas, frame, pulse, midPulse) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rings = 20;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.globalCompositeOperation = 'screen';

    for (let i = 0; i < rings; i++) {
      const z = (i * 40 + frame * 2 * pulse) % (rings * 40);
      const radius = (rings * 40 - z) * 1.5 * pulse;
      const alpha = (1 - z / (rings * 40)) * pulse;

      ctx.beginPath();
      const hue = (frame + i * 10) % 360;
      ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${alpha * 0.5})`;
      ctx.lineWidth = 3 * midPulse;
      ctx.shadowBlur = 20 * pulse;
      ctx.shadowColor = ctx.strokeStyle;

      // Draw hex polygons instead of circles
      const sides = 6;
      for (let s = 0; s <= sides; s++) {
        const ang = (s / sides) * Math.PI * 2 + frame * 0.01;
        const x = Math.cos(ang) * radius;
        const y = Math.sin(ang) * radius;
        if (s === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawFractal(ctx, canvas, frame, pulse) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const petals = 8;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.globalCompositeOperation = 'lighter';

    for (let i = 0; i < petals; i++) {
      ctx.rotate((Math.PI * 2) / petals);
      const hue = (frame * 0.5 + i * 45) % 360;

      ctx.beginPath();
      ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${0.4 * pulse})`;
      ctx.lineWidth = 2;

      for (let j = 0; j < 3; j++) {
        const size = 100 * (j + 1) * pulse;
        const x = Math.sin(frame * 0.02) * size;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(size, -size, size, size, 0, size * 1.5);
        ctx.stroke();
      }

      // Glowing centers
      ctx.fillStyle = `hsla(${hue}, 100%, 50%, ${0.2 * pulse})`;
      ctx.beginPath();
      ctx.arc(0, 200 * pulse, 30 * pulse, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
  }

  function drawNebulaCore(ctx, canvas, frame, pulse, midPulse, particles) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Core glow
    const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 300 * pulse);
    coreGrad.addColorStop(0, `rgba(189, 0, 255, ${0.1 * pulse})`);
    coreGrad.addColorStop(0.5, `rgba(0, 243, 255, ${0.05 * pulse})`);
    coreGrad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = coreGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = 'screen';
    particles.forEach((p, i) => {
      p.angle += 0.003 * p.speed * pulse;
      const radius = p.distance * midPulse * (1 + Math.sin(frame * 0.01) * 0.2);

      const x = centerX + Math.cos(p.angle) * radius;
      const y = centerY + Math.sin(p.angle) * radius;

      const hue = (p.angle * 100 + frame * 0.2) % 360;
      const pSize = p.size * 20 * pulse;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, pSize);
      grad.addColorStop(0, `hsla(${hue}, 100%, 70%, ${0.3 * pulse})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, pSize, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalCompositeOperation = 'source-over';
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
