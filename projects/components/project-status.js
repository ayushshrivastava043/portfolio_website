// Project Status Monitor - Handles live status updates
class ProjectStatusMonitor {
    constructor() {
        this.projects = {
            'ai-assistant': {
                name: 'AI Assistant',
                description: 'Advanced AI-powered chatbot with natural language processing and context awareness',
                tech: ['Python', 'OpenAI API', 'WebSocket', 'React'],
                status: 'unknown',
                lastCheck: null,
                uptime: 0
            },
            'website-generator': {
                name: 'Website Generator',
                description: 'AI-powered tool that generates complete websites from simple descriptions',
                tech: ['JavaScript', 'HTML5', 'CSS3', 'AI Templates'],
                status: 'unknown',
                lastCheck: null,
                uptime: 0
            },
            'smart-dashboards': {
                name: 'Smart Dashboards',
                description: 'Interactive data visualization dashboards with real-time analytics',
                tech: ['React', 'D3.js', 'Chart.js', 'REST APIs'],
                status: 'unknown',
                lastCheck: null,
                uptime: 0
            },
            'news-portal': {
                name: 'News Portal',
                description: 'AI-curated news aggregation platform with personalized content',
                tech: ['Node.js', 'MongoDB', 'AI Curation', 'Real-time Updates'],
                status: 'unknown',
                lastCheck: null,
                uptime: 0
            },
            'pdf-modifier': {
                name: 'PDF Modifier',
                description: 'Advanced PDF processing tool with AI-powered content extraction',
                tech: ['Python', 'PyPDF2', 'AI OCR', 'Content Analysis'],
                status: 'unknown',
                lastCheck: null,
                uptime: 0
            },
            'pc-organizer': {
                name: 'PC File Organizer',
                description: 'Intelligent file organization system with AI-powered categorization',
                tech: ['Python', 'File System APIs', 'AI Classification', 'GUI'],
                status: 'unknown',
                lastCheck: null,
                uptime: 0
            },
            'ai-video-generator': {
                name: 'AI Video Generator',
                description: 'AI-powered video creation tool with automated editing and effects',
                tech: ['Python', 'OpenCV', 'AI Models', 'Video Processing'],
                status: 'unknown',
                lastCheck: null,
                uptime: 0
            }
        };
        
        this.init();
    }

    async init() {
        console.log('🚀 Project Status Monitor initialized');
        await this.checkAllProjects();
        
        // Check status every 5 minutes
        setInterval(() => this.checkAllProjects(), 300000);
        
        // Update UI every 30 seconds
        setInterval(() => this.updateUI(), 30000);
    }

    async checkProject(projectId) {
        const project = this.projects[projectId];
        if (!project) return;

        try {
            // Simulate health check (replace with actual API calls)
            const isHealthy = Math.random() > 0.1; // 90% uptime simulation
            
            project.status = isHealthy ? 'healthy' : 'down';
            project.lastCheck = new Date();
            
            if (isHealthy) {
                project.uptime = Math.min(100, project.uptime + 0.1);
            } else {
                project.uptime = Math.max(0, project.uptime - 0.5);
            }
            
            console.log(`✅ ${project.name}: ${project.status} (${project.uptime.toFixed(1)}% uptime)`);
            
        } catch (error) {
            console.error(`❌ Error checking ${project.name}:`, error);
            project.status = 'error';
            project.lastCheck = new Date();
        }
    }

    async checkAllProjects() {
        console.log('🔍 Checking all project statuses...');
        const promises = Object.keys(this.projects).map(projectId => 
            this.checkProject(projectId)
        );
        await Promise.all(promises);
    }

    updateUI() {
        Object.keys(this.projects).forEach(projectId => {
            const project = this.projects[projectId];
            const card = document.querySelector(`[data-project="${projectId}"]`);
            
            if (card) {
                const statusElement = card.querySelector('[style*="position:absolute;bottom:8px;left:8px"]');
                if (statusElement) {
                    const statusEmoji = this.getStatusEmoji(project.status);
                    const uptimeText = project.uptime > 0 ? ` | Uptime: ${project.uptime.toFixed(1)}%` : '';
                    const timeText = project.lastCheck ? 
                        ` | Updated: ${project.lastCheck.toLocaleTimeString()}` : '';
                    
                    statusElement.innerHTML = `Status: ${statusEmoji} ${project.status}${uptimeText}${timeText}`;
                }
            }
        });
    }

    getStatusEmoji(status) {
        switch (status) {
            case 'healthy': return '🟢';
            case 'down': return '🔴';
            case 'error': return '🟡';
            default: return '⚪';
        }
    }

    // Public method to get project status
    getProjectStatus(projectId) {
        return this.projects[projectId] || null;
    }

    // Public method to get all project statuses
    getAllStatuses() {
        return this.projects;
    }
}

// Initialize the monitor when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.projectStatusMonitor = new ProjectStatusMonitor();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectStatusMonitor;
} 