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
        const modal = document.getElementById('projectModal');
        const modalBody = modal.querySelector('.modal-body');
        const project = projectsData[projectId]; // Using projectsData from projects-data.js
        
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

        // Add how it works if it exists
        if (project.howItWorks && project.howItWorks.length) {
            content += `
                <h4>How It Works</h4>
                <ul>
                    ${project.howItWorks.map(step => `<li>${step}</li>`).join('')}
                </ul>
            `;
        }

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

        // Add action buttons
        if (project.liveUrl || project.githubUrl) {
            content += `
                <div class="project-actions">
                    ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn btn-primary">Live Demo</a>` : ''}
                    ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">View Code</a>` : ''}
                </div>
            `;
        }

        modalBody.innerHTML = content;
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