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

// Inline moon edit/positioning removed: handled by config system

// Project Modal Functionality
function showProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = modal.querySelector('#modalProjectContent');
    const modalTitle = modal.querySelector('#modalProjectTitle');
    const project = projectsData[projectId];
    
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    // Update modal title
    modalTitle.textContent = project.title;

    // Build modal content
    let content = `
        <div style="margin-bottom: 20px;">
            <h3 style="color: #00ffee; margin-bottom: 10px;">About This Project</h3>
            <p style="line-height: 1.6; color: #e8e8e8;">${project.whatItIs}</p>
        </div>
    `;

    // Add how it works if it exists
    if (project.howItWorks && project.howItWorks.length) {
        content += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #00ffee; margin-bottom: 10px;">🔧 How It Works</h4>
                <ul style="padding-left: 20px; color: #e8e8e8;">
                    ${project.howItWorks.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Add key features if they exist
    if (project.keyFeatures && project.keyFeatures.length) {
        content += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #00ffee; margin-bottom: 10px;">🚀 Key Features</h4>
                <ul style="padding-left: 20px; color: #e8e8e8;">
                    ${project.keyFeatures.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    // Add tech stack if it exists
    if (project.techStack && project.techStack.length) {
        content += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #00ffee; margin-bottom: 10px;">⚡ Technology Stack</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${project.techStack.map(tech => `<span style="background: rgba(0,255,238,0.1); color: #00ffee; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(0,255,238,0.3); font-size: 12px;">${tech}</span>`).join('')}
                </div>
            </div>
        `;
    }

    // Add my role if it exists
    if (project.myRole) {
        content += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #00ffee; margin-bottom: 10px;">👨‍💻 My Role</h4>
                <p style="color: #e8e8e8; line-height: 1.6;">${project.myRole}</p>
            </div>
        `;
    }

    // Add impact metrics if they exist
    if (project.impact) {
        content += `
            <div style="margin-bottom: 20px;">
                <h4 style="color: #00ffee; margin-bottom: 10px;">📊 ${project.impact.title}</h4>
                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; color: #e8e8e8;">
                        <thead>
                            <tr style="border-bottom: 1px solid rgba(0,255,238,0.3);">
                                ${project.impact.headers.map(header => `<th style="padding: 8px; text-align: left; color: #00ffee; font-size: 12px;">${header}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${project.impact.rows.map(row => `
                                <tr style="border-bottom: 1px solid rgba(0,255,238,0.1);">
                                    ${Object.values(row).map(value => `<td style="padding: 8px; font-size: 12px;">${value}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Add project links if they exist
    if (project.liveUrl || project.githubUrl) {
        content += `
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" style="background: linear-gradient(135deg, #00ffee, #0077b5); color: #111; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">🌐 Live Demo</a>` : ''}
                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" style="background: linear-gradient(135deg, #0077b5, #00ffee); color: #111; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px;">💻 View Code</a>` : ''}
            </div>
        `;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
}

// Close modal when clicking the close button or outside the modal
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    if (!modal) return; // Exit if modal doesn't exist
    
    const closeBtn = modal.querySelector('.close-modal');
    if (!closeBtn) return; // Exit if close button doesn't exist
    
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
  if (window && window.PlanetPositioning) return; // Skip drag/restore when config system is active
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