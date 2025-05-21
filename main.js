document.addEventListener('DOMContentLoaded', () => {
  // Load config from localStorage if available
  let config = window.siteConfig;
  const savedConfig = localStorage.getItem('siteConfig');
  if (savedConfig) {
    try {
      config = Object.assign({}, config, JSON.parse(savedConfig));
      // Retain default boxPositions if not in savedConfig, to avoid errors if user clears localStorage
      if (config.boxPositions && window.siteConfig.boxPositions) {
        config.boxPositions = Object.assign({}, window.siteConfig.boxPositions, config.boxPositions);
      }
      if (config.colors && window.siteConfig.colors) {
        config.colors = Object.assign({}, window.siteConfig.colors, config.colors);
      }
    } catch (e) { /* ignore parse errors */ }
  }
  window.siteConfig = config;

  // Set accent color from config
  if (config && config.colors && config.colors.accent) {
    document.documentElement.style.setProperty('--accent', config.colors.accent);
  }

  // Config panel toggle logic is now exclusively in config.js
  // const configBtn = document.getElementById('config-toggle-btn');
  // const configPanel = document.getElementById('config-panel');
  // if (configBtn && configPanel) {
  //   configBtn.onclick = () => {
  //       configPanel.style.display = configPanel.style.display === 'none' ? 'block' : 'none';
  //   };
  // }

  const accentInput = document.getElementById('accentColorInput');
  // const applyBtn = document.getElementById('applyConfigBtn'); // This button is in the new planet config panel

  // Set initial accent color value
  if (accentInput && config && config.colors && config.colors.accent) {
      accentInput.value = config.colors.accent;
  }

  // The applyBtn for planet config is handled by config.js
  // Accent color input is also part of the planet config panel, so its apply logic is in config.js.
}); 

// About Me image drag-to-pan with localStorage persistence and image change (+ icon)
window.addEventListener('DOMContentLoaded', function() {
  const img = document.getElementById('profile-img');
  if (!img) return;
  let dragging = false, startX = 0, startY = 0, startPosX = 50, startPosY = 50;

  // Restore from localStorage (position)
  const saved = localStorage.getItem('profileImgPos');
  if (saved) {
    try {
      const { x, y } = JSON.parse(saved);
      document.documentElement.style.setProperty('--profile-img-pos-x', x + '%');
      document.documentElement.style.setProperty('--profile-img-pos-y', y + '%');
    } catch {}
  }

  // Restore image from localStorage
  const savedImg = localStorage.getItem('profileImgData');
  if (savedImg) {
    img.src = savedImg;
  }

  function setImgPos(x, y, save = true) {
    document.documentElement.style.setProperty('--profile-img-pos-x', x + '%');
    document.documentElement.style.setProperty('--profile-img-pos-y', y + '%');
    if (save) {
      localStorage.setItem('profileImgPos', JSON.stringify({ x, y }));
    }
  }

  img.addEventListener('mousedown', e => {
    dragging = true;
    img.style.cursor = 'grabbing';
    startX = e.clientX;
    startY = e.clientY;
    startPosX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--profile-img-pos-x')) || 50;
    startPosY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--profile-img-pos-y')) || 50;
    e.preventDefault();
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    let newX = Math.max(0, Math.min(100, startPosX + dx / 1.8));
    let newY = Math.max(0, Math.min(100, startPosY + dy / 1.8));
    setImgPos(newX, newY);
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    img.style.cursor = 'grab';
  });
  // Touch support
  img.addEventListener('touchstart', e => {
    dragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startPosX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--profile-img-pos-x')) || 50;
    startPosY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--profile-img-pos-y')) || 50;
    e.preventDefault();
  }, {passive: false});
  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    let newX = Math.max(0, Math.min(100, startPosX + dx / 1.8));
    let newY = Math.max(0, Math.min(100, startPosY + dy / 1.8));
    setImgPos(newX, newY);
  }, {passive: false});
  window.addEventListener('touchend', () => {
    dragging = false;
  });

  // Add + icon overlay for image change
  const plusIcon = document.createElement('span');
  plusIcon.textContent = '+';
  plusIcon.title = 'Change photo';
  plusIcon.style.position = 'absolute';
  plusIcon.style.bottom = '10px';
  plusIcon.style.right = '10px';
  plusIcon.style.width = '28px';
  plusIcon.style.height = '28px';
  plusIcon.style.background = '#00ffee';
  plusIcon.style.color = '#111';
  plusIcon.style.borderRadius = '50%';
  plusIcon.style.display = 'flex';
  plusIcon.style.alignItems = 'center';
  plusIcon.style.justifyContent = 'center';
  plusIcon.style.fontSize = '1.3em';
  plusIcon.style.fontWeight = 'bold';
  plusIcon.style.cursor = 'pointer';
  plusIcon.style.boxShadow = '0 2px 8px #00ffee88';
  plusIcon.style.zIndex = '10';
  plusIcon.style.transition = 'background 0.2s, color 0.2s';
  plusIcon.onmouseenter = () => { plusIcon.style.background = '#00bfff'; };
  plusIcon.onmouseleave = () => { plusIcon.style.background = '#00ffee'; };

  // Insert the icon in the image container (parent is the flex div)
  const imgContainer = img.parentNode;
  imgContainer.style.position = 'relative';
  imgContainer.appendChild(plusIcon);

  // Hidden file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  plusIcon.onclick = () => fileInput.click();
  fileInput.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      img.src = evt.target.result;
      localStorage.setItem('profileImgData', evt.target.result);
    };
    reader.readAsDataURL(file);
  };
  imgContainer.appendChild(fileInput);
}); 