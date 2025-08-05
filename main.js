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

// --- PM Moons Positioning ---
function applyMoonPositions() {
  for (let i = 1; i <= 4; i++) {
    const x = document.getElementById(`moon${i}XInput`).value;
    const y = document.getElementById(`moon${i}YInput`).value;
    document.querySelectorAll('.planet.jupiter .moon-' + i).forEach(moon => {
      moon.style.left = x + '%';
      moon.style.top = y + '%';
    });
    localStorage.setItem(`moon${i}X`, x);
    localStorage.setItem(`moon${i}Y`, y);
  }
}

// Move applyConfigBtn initialization inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const applyConfigBtn = document.getElementById('applyConfigBtn');
  if (applyConfigBtn) {
    applyConfigBtn.addEventListener('click', applyMoonPositions);
  }

  // Restore moon positions from localStorage
  for (let i = 1; i <= 4; i++) {
    const x = localStorage.getItem(`moon${i}X`);
    const y = localStorage.getItem(`moon${i}Y`);
    if (x && y) {
      const xInput = document.getElementById(`moon${i}XInput`);
      const yInput = document.getElementById(`moon${i}YInput`);
      if (xInput && yInput) {
        xInput.value = x;
        yInput.value = y;
      }
      document.querySelectorAll('.planet.jupiter .moon-' + i).forEach(moon => {
        moon.style.left = x + '%';
        moon.style.top = y + '%';
      });
    }
  }
});

function positionMoons() {
    document.querySelectorAll('.moon-system').forEach(moonSystem => {
        const moons = moonSystem.querySelectorAll('.moon');
        const planet = moonSystem.parentElement;
        const planetRadius = planet.offsetWidth / 2;
        const moonOrbitRadius = planetRadius + 90; // distance from planet center
        const moonCount = moons.length;
        moons.forEach((moon, i) => {
            const angle = (2 * Math.PI * i) / moonCount;
            const x = Math.cos(angle) * moonOrbitRadius;
            const y = Math.sin(angle) * moonOrbitRadius;
            moon.style.position = 'absolute';
            moon.style.left = `calc(50% + ${x - moon.offsetWidth / 2}px)`;
            moon.style.top = `calc(50% + ${y - moon.offsetHeight / 2}px)`;
        });
    });
}
window.addEventListener('DOMContentLoaded', positionMoons);
window.addEventListener('resize', positionMoons); 

// Project Modal Functionality
function showProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('.modal-body');
    const project = projectData[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Build modal content
    let content = `
        <h2>${project.title}</h2>
        ${project.subTitle ? `<h3>${project.subTitle}</h3>` : ''}
        <p>${project.whatItIs}</p>
    `;

    // Add key features if they exist
    if (project.keyFeatures && project.keyFeatures.length) {
        content += `
            <h4>Key Features</h4>
            <ul>
                ${project.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;
    }

    // Add impact metrics if they exist
    if (project.impact) {
        content += `
            <h4>${project.impact.title}</h4>
            <table>
                <tr>
                    ${project.impact.headers.map(header => `<th>${header}</th>`).join('')}
                </tr>
                ${project.impact.rows.map(row => `
                    <tr>
                        ${Object.values(row).map(value => `<td>${value}</td>`).join('')}
                    </tr>
                `).join('')}
            </table>
        `;
    }

    // Add tech stack if it exists
    if (project.techStack && project.techStack.length) {
        content += `
            <h4>Tech Stack</h4>
            <div class="tech-stack">
                ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
    }

    // Add my role if it exists
    if (project.myRole) {
        content += `
            <h4>My Role</h4>
            <p>${project.myRole}</p>
        `;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
}

// Close modal when clicking the close button or outside the modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Use event delegation for moon clicks
    document.addEventListener('click', (e) => {
        const moon = e.target.closest('.moon');
        if (moon) {
            e.stopPropagation();
            const projectId = moon.getAttribute('data-project');
            if (projectId) {
                showProjectModal(projectId);
            }
        }
    });
}); 

// === DRAG & DROP FOR PLANETS AND MOONS ===
document.addEventListener('DOMContentLoaded', () => {
  // --- PLANETS ---
  const planetPositions = JSON.parse(localStorage.getItem('planetPositions') || '{}');
  document.querySelectorAll('.planet').forEach(planet => {
    const planetKey = planet.classList.contains('earth') ? 'earth' : planet.classList.contains('jupiter') ? 'jupiter' : 'saturn';
    // Restore position if saved
    if (planetPositions[planetKey]) {
      planet.style.position = 'absolute';
      planet.style.left = planetPositions[planetKey].left;
      planet.style.top = planetPositions[planetKey].top;
    }
    let isDragging = false, startX, startY, origLeft, origTop;
    let dragEnabled = false;
    planet.addEventListener('dblclick', e => {
      dragEnabled = true;
      planet.classList.add('draggable-planet');
    });
    planet.addEventListener('mousedown', e => {
      if (!dragEnabled) return;
      if (e.target.closest('.moon')) return; // Don't drag planet if moon is clicked
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = parseInt(planet.style.left || 0);
      origTop = parseInt(planet.style.top || 0);
      planet.style.position = 'absolute';
      planet.style.zIndex = 1002;
      document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      planet.style.left = (origLeft + dx) + 'px';
      planet.style.top = (origTop + dy) + 'px';
    });
    window.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      dragEnabled = false;
      planet.classList.remove('draggable-planet');
      planet.style.zIndex = '';
      document.body.style.userSelect = '';
      // Save position
      planetPositions[planetKey] = {
        left: planet.style.left,
        top: planet.style.top
      };
      localStorage.setItem('planetPositions', JSON.stringify(planetPositions));
    });
  });

  // --- MOONS ---
  const moonPositions = JSON.parse(localStorage.getItem('moonPositions') || '{}');
  document.querySelectorAll('.moon').forEach(moon => {
    const planetClass = moon.closest('.planet').classList[1];
    const moonClass = moon.classList[1];
    const moonKey = planetClass + '-' + moonClass; // e.g. 'earth-moon-1'
    // Restore position if saved
    if (moonPositions[moonKey]) {
      moon.style.left = moonPositions[moonKey].left;
      moon.style.top = moonPositions[moonKey].top;
    }
    let isDragging = false, startX, startY, origLeft, origTop;
    moon.addEventListener('mousedown', e => {
      e.stopPropagation();
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = parseInt(moon.style.left || 0);
      origTop = parseInt(moon.style.top || 0);
      moon.style.zIndex = 1003;
      document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', e => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      moon.style.left = (origLeft + dx) + 'px';
      moon.style.top = (origTop + dy) + 'px';
    });
    window.addEventListener('mouseup', e => {
      if (!isDragging) return;
      isDragging = false;
      moon.style.zIndex = '';
      document.body.style.userSelect = '';
      // Save position
      moonPositions[moonKey] = {
        left: moon.style.left,
        top: moon.style.top
      };
      localStorage.setItem('moonPositions', JSON.stringify(moonPositions));
    });
  });
}); 

// Three.js is loaded as a module in the HTML file
// Planet textures and materials are handled there 