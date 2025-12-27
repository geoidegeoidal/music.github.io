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

// ========================================
// VISUALIZER STATE
// ========================================

let isVisualizerMode = false;
let visualizerAnimation = null;

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

function toggleVisualizer() {
  isVisualizerMode = !isVisualizerMode;
  
  if (isVisualizerMode) {
    visualizerBtn.textContent = '📺 VIDEO MODE';
    visualizerBtn.style.borderColor = 'var(--neon-pink)';
    visualizerBtn.style.color = 'var(--neon-pink)';
    startVisualizer();
    showNotification('Visual effects activated!', 'success');
  } else {
    visualizerBtn.textContent = '🎨 VISUAL EFFECTS';
    visualizerBtn.style.borderColor = 'var(--neon-cyan)';
    visualizerBtn.style.color = 'var(--neon-cyan)';
    stopVisualizer();
    showNotification('Video mode activated!', 'success');
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
  
  // Visualizer styles
  const barCount = 64;
  const barWidth = canvas.width / barCount;
  let hue = 180; // Start with cyan
  
  // Animation function
  // Note: This is a decorative visualizer with procedurally generated animations
  // For real-time audio analysis, the Web Audio API would need to be integrated
  // with the YouTube player, which requires additional setup and permissions
  function animate() {
    if (!isVisualizerMode) return;
    
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 10, 20, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Generate pseudo-random bars (simulating audio data)
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < barCount; i++) {
      // Create wave-like pattern
      const normalizedIndex = i / barCount;
      const wave1 = Math.sin(time * 2 + normalizedIndex * Math.PI * 2) * 0.5 + 0.5;
      const wave2 = Math.sin(time * 3 + normalizedIndex * Math.PI * 4) * 0.3 + 0.5;
      const wave3 = Math.sin(time * 1.5 + normalizedIndex * Math.PI) * 0.2 + 0.5;
      
      const barHeight = (wave1 * wave2 * wave3) * canvas.height * 0.8;
      const x = i * barWidth;
      const y = canvas.height - barHeight;
      
      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(x, y, x, canvas.height);
      
      // Cycle through neon colors
      const barHue = (hue + i * 2) % 360;
      gradient.addColorStop(0, `hsla(${barHue}, 100%, 60%, 0.9)`);
      gradient.addColorStop(1, `hsla(${barHue + 30}, 100%, 50%, 0.7)`);
      
      // Draw bar
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 2, barHeight);
      
      // Add glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = `hsla(${barHue}, 100%, 60%, 0.8)`;
    }
    
    // Slowly change hue for color cycling
    hue = (hue + 0.5) % 360;
    
    // Draw center circle (like Windows Media Player)
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80 + Math.sin(time * 2) * 20;
    
    const circleGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    circleGradient.addColorStop(0, 'rgba(0, 243, 255, 0.3)');
    circleGradient.addColorStop(0.5, 'rgba(189, 0, 255, 0.2)');
    circleGradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
    
    ctx.fillStyle = circleGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw rotating particles
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
      const angle = (time + i / particleCount) * Math.PI * 2;
      const particleRadius = radius + 40;
      const px = centerX + Math.cos(angle) * particleRadius;
      const py = centerY + Math.sin(angle) * particleRadius;
      
      ctx.fillStyle = `hsla(${(hue + i * 30) % 360}, 100%, 60%, 0.6)`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsla(${(hue + i * 30) % 360}, 100%, 60%, 0.9)`;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    
    visualizerAnimation = requestAnimationFrame(animate);
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
  });
  
  console.log('%c🌆 CYBERPUNK MUSIC PLAYER 🌆', 'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
  console.log('%cSystem initialized. Ready to jack in...', 'color: #ff00ff; font-size: 14px;');
  console.log('%cKeyboard Shortcuts: Ctrl+A (Add Link) | Ctrl+R (Remove Link) | Ctrl+V (Visual Effects)', 'color: #a0a0ff; font-size: 12px;');
});

// Load links when script loads
loadLinksFromCookie();
initializeLinks();
