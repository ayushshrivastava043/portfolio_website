// website/config.js

window.siteConfig = {
  // Box positions (for absolute positioning, if needed)
  boxPositions: {
    projects: { left: '100px', top: '50px' },
    news: { left: '300px', top: '50px' },
    // Add more as needed
  },

  // Colors
  colors: {
    accent: '#00ffee',
    background: '#23283a',
    box: '#23283a',
    boxText: '#fff',
    sidebarBg: 'rgba(0,0,0,0.6)',
  },

  // Sidebar settings
  sidebar: {
    width: '300px',
    top: '100px',
    background: 'rgba(0,0,0,0.6)',
  },

  // Hero section
  hero: {
    image: 'assets/b01130e6-680b-4623-95ad-427a48bb9515.png',
    maxHeight: '600px',
  }
};

// Config Panel Toggle
const configToggleBtn = document.getElementById('config-toggle-btn');
const configPanel = document.getElementById('config-panel');
const applyConfigBtn = document.getElementById('applyConfigBtn');
const resetConfigBtn = document.getElementById('resetConfigBtn');

// Planet elements
const earth = document.querySelector('.planet.earth');
const jupiter = document.querySelector('.planet.jupiter');
const saturn = document.querySelector('.planet.saturn');

// Default planet positions and sizes
const defaultSettings = {
    earth: { x: -400, y: -200, z: 0, rotate: 0, size: 280 },  // AI Projects top-left
    jupiter: { x: 0, y: 300, z: 0, rotate: 0, size: 280 },    // PM Projects bottom-center
    saturn: { x: 400, y: -200, z: 0, rotate: 0, size: 280 }   // Business Projects top-right
};

// Function to apply transform and size to a planet
function applyStylesToPlanet(planet, settings) {
    planet.style.transform = `translate3d(${settings.x}px, ${settings.y}px, ${settings.z}px) rotate(${settings.rotate}deg)`;
    planet.style.width = `${settings.size}px`;
    planet.style.height = `${settings.size}px`;
}

// Apply planet positions and sizes
function applyPlanetSettings() {
    const settings = {
        earth: {
            x: parseInt(document.getElementById('earthXInput').value) || 0,
            y: parseInt(document.getElementById('earthYInput').value) || 0,
            z: parseInt(document.getElementById('earthZInput').value) || 0,
            rotate: parseInt(document.getElementById('earthRotateInput').value) || 0,
            size: parseInt(document.getElementById('earthSizeInput').value) || defaultSettings.earth.size
        },
        jupiter: {
            x: parseInt(document.getElementById('jupiterXInput').value) || 0,
            y: parseInt(document.getElementById('jupiterYInput').value) || 0,
            z: parseInt(document.getElementById('jupiterZInput').value) || 0,
            rotate: parseInt(document.getElementById('jupiterRotateInput').value) || 0,
            size: parseInt(document.getElementById('jupiterSizeInput').value) || defaultSettings.jupiter.size
        },
        saturn: {
            x: parseInt(document.getElementById('saturnXInput').value) || 0,
            y: parseInt(document.getElementById('saturnYInput').value) || 0,
            z: parseInt(document.getElementById('saturnZInput').value) || 0,
            rotate: parseInt(document.getElementById('saturnRotateInput').value) || 0,
            size: parseInt(document.getElementById('saturnSizeInput').value) || defaultSettings.saturn.size
        }
    };

    // Apply to each planet
    applyStylesToPlanet(earth, settings.earth);
    applyStylesToPlanet(jupiter, settings.jupiter);
    applyStylesToPlanet(saturn, settings.saturn);

    // Save to localStorage
    localStorage.setItem('planetSettings', JSON.stringify(settings));
}

// Reset to default positions and sizes
function resetPlanetSettings() {
    // Reset input values
    Object.entries(defaultSettings).forEach(([planet, S]) => {
        document.getElementById(`${planet}XInput`).value = S.x;
        document.getElementById(`${planet}YInput`).value = S.y;
        document.getElementById(`${planet}ZInput`).value = S.z;
        document.getElementById(`${planet}RotateInput`).value = S.rotate;
        document.getElementById(`${planet}SizeInput`).value = S.size;
    });

    // Apply default settings
    applyStylesToPlanet(earth, defaultSettings.earth);
    applyStylesToPlanet(jupiter, defaultSettings.jupiter);
    applyStylesToPlanet(saturn, defaultSettings.saturn);

    // Clear localStorage
    localStorage.removeItem('planetSettings');
}

// Initialize planet positions and sizes
function initializePlanetSettings() {
    const savedSettings = localStorage.getItem('planetSettings');
    const settings = savedSettings ? JSON.parse(savedSettings) : defaultSettings;

    // Set input values
    Object.entries(settings).forEach(([planet, S]) => {
        document.getElementById(`${planet}XInput`).value = S.x;
        document.getElementById(`${planet}YInput`).value = S.y;
        document.getElementById(`${planet}ZInput`).value = S.z;
        document.getElementById(`${planet}RotateInput`).value = S.rotate;
        document.getElementById(`${planet}SizeInput`).value = S.size;
    });

    // Apply settings
    applyStylesToPlanet(earth, settings.earth);
    applyStylesToPlanet(jupiter, settings.jupiter);
    applyStylesToPlanet(saturn, settings.saturn);
}

// Event listeners
applyConfigBtn.addEventListener('click', applyPlanetSettings);
resetConfigBtn.addEventListener('click', resetPlanetSettings);

// Initialize settings when the page loads
window.addEventListener('DOMContentLoaded', () => {
    initializePlanetSettings();
    
    // Load saved accent color
    const savedAccentColor = localStorage.getItem('accentColor');
    if (savedAccentColor) {
        accentColorInput.value = savedAccentColor;
        document.documentElement.style.setProperty('--accent', savedAccentColor);
    }
});

// Accent color handling
const accentColorInput = document.getElementById('accentColorInput');
accentColorInput.addEventListener('change', (e) => {
    document.documentElement.style.setProperty('--accent', e.target.value);
    localStorage.setItem('accentColor', e.target.value);
});

// Toggle config panel
configToggleBtn.addEventListener('click', () => {
    configPanel.style.display = configPanel.style.display === 'none' ? 'block' : 'none';
    configToggleBtn.classList.toggle('panel-open');
}); 