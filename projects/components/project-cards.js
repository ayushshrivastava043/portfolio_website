// Project Cards Generator - Creates sliding info panel project showcases
class ProjectCardsGenerator {
    constructor() {
        this.init();
    }

    init() {
    this.renderSimpleCards();
    }

  renderSimpleCards() {
        const container = document.querySelector('.projects-portal-section .project-cards-container');
        if (!container) return;
        container.innerHTML = '';

        Object.keys(projectsData).forEach(projectId => {
      const p = projectsData[projectId];
      const card = `
        <div class="simple-project-card" data-project="${projectId}" style="
          background: radial-gradient(120% 140% at 10% 10%, rgba(0,255,238,0.15), transparent 60%), rgba(0,0,0,0.6);
          border: 1px solid rgba(0,255,238,0.25);
          border-radius: 14px;
          box-shadow: 0 6px 28px rgba(0,255,238,0.18);
          padding: 18px 18px 40px 18px;
          text-align: left;
          min-height: 220px;
                position: relative;
        ">
          <h3 style="color:#00ffee;margin:0 0 8px 0;font-size:22px;font-weight:700;">${p.title}</h3>
          <p style="color:#cfd8dc;font-size:14px;line-height:1.6;margin:0 0 14px 0;">${p.description || ''}</p>
          <div style="display:flex;justify-content:center;margin:15px 0;">
            <button onclick="showDeepDive('${projectId}')" style="background:linear-gradient(135deg,#00ffee,#00bcd4);color:#111;border:none;padding:10px 18px;border-radius:12px;font-size:13px;cursor:pointer;transition:all 0.3s ease;font-weight:600;box-shadow:0 4px 15px rgba(0,255,238,0.3);">🔍 Deep Dive</button>
          </div>
          <div style="position:absolute;bottom:8px;left:8px;color:#8bc34a;font-size:12px;opacity:0.9;">Status: ${p.status || 'Active'}</div>
            </div>
        `;
      container.insertAdjacentHTML('beforeend', card);
    });

    // layout grid similar to screenshot
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    container.style.gap = '22px';
    }

    generateDetailedMetrics(project) {
        const metrics = [
            { label: 'Response Time', value: '<2s', status: '🟢 Excellent' },
            { label: 'Accuracy', value: '92%', status: '🟡 Good' },
            { label: 'Uptime', value: '99.2%', status: '🟢 Stable' },
            { label: 'User Satisfaction', value: '4.3/5', status: '🟡 Improving' },
            { label: 'Processing Speed', value: '15s/page', status: '🟡 Optimizing' },
            { label: 'Error Rate', value: '0.3%', status: '🟢 Low' }
        ];

        return metrics.map(metric => `
            <div style="background:rgba(0,0,0,0.3);border:1px solid rgba(0,255,238,0.2);border-radius:10px;padding:12px;text-align:center;">
                <div style="color:rgba(0,255,238,0.8);font-size:12px;font-family:'Orbitron',sans-serif;margin-bottom:4px;">${metric.label}</div>
                <div style="color:rgba(255,255,255,0.9);font-size:14px;font-weight:bold;margin-bottom:4px;">${metric.value}</div>
                <div style="color:rgba(255,255,255,0.7);font-size:10px;">${metric.status}</div>
            </div>
        `).join('');
    }

    truncateDescription(description, maxLength) {
        if (description.length <= maxLength) return description;
        return description.substring(0, maxLength) + '...';
    }

    // Method to handle card clicks for sliding panels
    setupSlidingPanels() {
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.sliding-project-card');
            if (card && !e.target.closest('.close-panel') && !e.target.closest('button[onclick*="window.open"]')) {
                card.classList.add('panel-open');
            }
        });
    }

    // Method to update a specific project card
    updateProjectCard(projectId, updates) {
        const card = document.querySelector(`[data-project="${projectId}"]`);
        if (!card) return;

        const project = projectsData[projectId];
        if (!project) return;

        // Update title
        const titleElement = card.querySelector('h3');
        if (titleElement && updates.title) {
            titleElement.textContent = updates.title;
        }

        // Update description
        const descElement = card.querySelector('p');
        if (descElement && updates.description) {
            descElement.textContent = this.truncateDescription(updates.description, 200);
        }
    }

    // Method to add a new project card
    addProjectCard(projectId, projectData) {
        const container = document.querySelector('.projects-portal-section .project-cards-container');
        if (!container) return;

        const cardHTML = this.createSlidingPanelCard(projectId, projectData);
        container.insertAdjacentHTML('beforeend', cardHTML);
    }

    // Method to remove a project card
    removeProjectCard(projectId) {
        const card = document.querySelector(`[data-project="${projectId}"]`);
        if (card) {
            card.remove();
        }
    }

    // Method to filter projects by category
    filterProjectsByCategory(category) {
        const cards = document.querySelectorAll('.sliding-project-card');
        cards.forEach(card => {
            const projectId = card.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project && project.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Method to show all projects
    showAllProjects() {
        const cards = document.querySelectorAll('.sliding-project-card');
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }
}

// Initialize the cards generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.projectCardsGenerator = new ProjectCardsGenerator();
    // Setup sliding panels after cards are generated
    setTimeout(() => {
        window.projectCardsGenerator.setupSlidingPanels();
    }, 100);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectCardsGenerator;
} 