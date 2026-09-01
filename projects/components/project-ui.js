// Project UI Handler - Manages project card interactions and modals
class ProjectUIHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupModalHandling();
    }

    setupEventListeners() {
        // Use event delegation for project card clicks (now handled by sliding panels)
        // The sliding panels handle their own click events

        // Use event delegation for moon clicks (existing functionality)
        document.addEventListener('click', (e) => {
            const moon = e.target.closest('.moon');
            if (moon) {
                e.stopPropagation();
                const projectId = moon.getAttribute('data-project');
                if (projectId) {
                    this.showProjectModal(projectId);
                }
            }
        });
    }

    setupModalHandling() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;

        const closeBtn = modal.querySelector('.close-modal');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeProjectModal();
            }
        });
    }

    showProjectModal(projectId) {
        // Delegate to global handler (projects.js / window.projectData)
        if (typeof window.showProjectModal === 'function') {
            window.showProjectModal(projectId);
            return;
        }

        const modal = document.getElementById('projectModal');
        if (!modal) return;

        const data = window.projectData || (typeof projectData !== 'undefined' ? projectData : null);
        const project = data ? data[projectId] : null;

        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }

        const modalTitle = modal.querySelector('#modalProjectTitle');
        const modalContent = modal.querySelector('#modalProjectContent');
        if (!modalTitle || !modalContent) {
            console.error('Modal elements not found');
            return;
        }

        modalTitle.textContent = project.title;

        let content = `<div class="project-details">`;
        if (project.subTitle) {
            content += `<p class="project-subtitle">${project.subTitle}</p>`;
        }
        if (project.whatItIs) {
            content += `<div class="section"><h3>What it is</h3><p>${project.whatItIs}</p></div>`;
        }

        if (project.myContributions && project.myContributions.length) {
            content += `<div class="section"><h3>My Contributions</h3><ul>${project.myContributions.map(c => `<li>${c}</li>`).join('')}</ul></div>`;
        }
        if (project.howItWorks && project.howItWorks.length) {
            content += `<div class="section"><h3>How it works</h3><ul>${project.howItWorks.map(step => `<li>${step}</li>`).join('')}</ul></div>`;
        }
        if (project.pipelineWorkflow && project.pipelineWorkflow.length) {
            content += `<div class="section"><h3>Pipeline Workflow</h3><ul>${project.pipelineWorkflow.map(step => `<li>${step}</li>`).join('')}</ul></div>`;
        }
        if (project.keyFeatures && project.keyFeatures.length) {
            content += `<div class="section"><h3>Key Features</h3><ul>${project.keyFeatures.map(f => `<li>${f}</li>`).join('')}</ul></div>`;
        }
        if (project.impact) {
            content += `<div class="section"><h3>${project.impact.title || 'Impact'}</h3>`;
            if (project.impact.headers && project.impact.rows) {
                content += `<table class="details-table"><thead><tr>${project.impact.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
                project.impact.rows.forEach(row => {
                    content += `<tr>${project.impact.headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`;
                });
                content += `</tbody></table>`;
            }
            content += `</div>`;
        }
        if (project.productionEfficiency) {
            content += `<div class="section"><h3>${project.productionEfficiency.title || 'Production Efficiency'}</h3>`;
            if (project.productionEfficiency.headers && project.productionEfficiency.rows) {
                content += `<table class="details-table"><thead><tr>${project.productionEfficiency.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>`;
                project.productionEfficiency.rows.forEach(row => {
                    content += `<tr>${project.productionEfficiency.headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`;
                });
                content += `</tbody></table>`;
            }
            content += `</div>`;
        }
        if (project.myRole) {
            content += `<div class="section"><h3>My Role</h3><p>${project.myRole}</p></div>`;
        }
        const stack = project.techStack || project.toolingStack;
        if (stack && stack.length) {
            content += `<div class="section"><h3>Tech Stack</h3><div class="tech-stack">${stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div></div>`;
        }
        content += `</div>`;

        modalContent.innerHTML = content;
        modal.classList.add('active');
    }

    closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Method to update project card status
    updateProjectCardStatus(projectId, status, uptime, lastCheck) {
        const card = document.querySelector(`[data-project="${projectId}"]`);
        if (card) {
            const statusElement = card.querySelector('[style*="position:absolute;bottom:10px;left:15px"]');
            if (statusElement) {
                const statusEmoji = this.getStatusEmoji(status);
                const uptimeText = uptime > 0 ? ` | Uptime: ${uptime.toFixed(1)}%` : '';
                const timeText = lastCheck ? 
                    ` | Updated: ${lastCheck.toLocaleTimeString()}` : '';
                
                statusElement.innerHTML = `Status: ${statusEmoji} ${status}${uptimeText}${timeText}`;
            }
        }
    }

    getStatusEmoji(status) {
        switch (status) {
            case 'healthy': return '🟢';
            case 'down': return '🔴';
            case 'error': return '🟡';
            case 'active': return '🟢';
            case 'optimizing': return '🟡';
            case 'scaling': return '🔵';
            default: return '⚪';
        }
    }
}

// Initialize the UI handler when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.projectUIHandler = new ProjectUIHandler();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectUIHandler;
} 