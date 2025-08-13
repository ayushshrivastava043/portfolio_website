// Comprehensive Showcase Styles for A/B Testing
class ShowcaseStyles {
    constructor() {
        this.styles = {};
        this.init();
    }

    init() {
        this.defineStyles();
        this.setupGlobalStyles();
    }

    defineStyles() {
        // Style 1: Interactive Carousel
        this.styles.carousel = {
            name: 'Interactive Carousel',
            description: 'Multi-slide carousel with smooth transitions',
            apply: (container) => {
                container.innerHTML = this.generateCarouselHTML();
                this.setupCarouselFunctionality();
            }
        };

        // Style 2: 3D Flip Cards
        this.styles.flip3d = {
            name: '3D Flip Cards',
            description: '3D rotation with multiple information faces',
            apply: (container) => {
                container.innerHTML = this.generate3DFlipHTML();
                this.setup3DFlipFunctionality();
            }
        };

        // Style 3: Accordion Style
        this.styles.accordion = {
            name: 'Accordion Style',
            description: 'Collapsible sections with smooth animations',
            apply: (container) => {
                container.innerHTML = this.generateAccordionHTML();
                this.setupAccordionFunctionality();
            }
        };

        // Style 4: Tabbed Interface
        this.styles.tabs = {
            name: 'Tabbed Interface',
            description: 'Multiple tabs with rich content areas',
            apply: (container) => {
                container.innerHTML = this.generateTabbedHTML();
                this.setupTabbedFunctionality();
            }
        };

        // Style 5: Timeline Flow
        this.styles.timeline = {
            name: 'Timeline Flow',
            description: 'Horizontal timeline with interactive nodes',
            apply: (container) => {
                container.innerHTML = this.generateTimelineHTML();
                this.setupTimelineFunctionality();
            }
        };

        // Style 6: Dashboard Widgets
        this.styles.dashboard = {
            name: 'Dashboard Widgets',
            description: 'Dashboard-style with multiple widgets',
            apply: (container) => {
                container.innerHTML = this.generateDashboardHTML();
                this.setupDashboardFunctionality();
            }
        };

        // Style 7: Modal Deep Dives
        this.styles.modals = {
            name: 'Modal Deep Dives',
            description: 'Click to open detailed modal overlays',
            apply: (container) => {
                container.innerHTML = this.generateModalHTML();
                this.setupModalFunctionality();
            }
        };

        // Style 8: Card Stack Parallax
        this.styles.stack = {
            name: 'Card Stack Parallax',
            description: 'Stacked cards with parallax scrolling',
            apply: (container) => {
                container.innerHTML = this.generateStackHTML();
                this.setupStackFunctionality();
            }
        };
    }

    generateCarouselHTML() {
        return `
            <div class="carousel-container" style="
                width: 100%; overflow: hidden; position: relative;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 15px; padding: 20px;
            ">
                <div class="carousel-track" style="
                    display: flex; transition: transform 0.5s ease;
                    gap: 20px; padding: 20px;
                ">
                    ${this.generateCarouselSlides()}
                </div>
                <div class="carousel-nav" style="
                    position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%);
                    display: flex; gap: 10px;
                ">
                    ${this.generateCarouselDots()}
                </div>
                <button class="carousel-arrow prev" style="
                    position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
                    background: rgba(255,255,255,0.2); border: none; color: white;
                    padding: 10px; border-radius: 50%; cursor: pointer;
                ">‹</button>
                <button class="carousel-arrow next" style="
                    position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
                    background: rgba(255,255,255,0.2); border: none; color: white;
                    padding: 10px; border-radius: 50%; cursor: pointer;
                ">›</button>
            </div>
        `;
    }

    generate3DFlipHTML() {
        return `
            <div class="flip3d-container" style="
                display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 30px; perspective: 1000px;
            ">
                ${this.generate3DFlipCards()}
            </div>
        `;
    }

    generateAccordionHTML() {
        return `
            <div class="accordion-container" style="
                max-width: 800px; margin: 0 auto;
            ">
                ${this.generateAccordionSections()}
            </div>
        `;
    }

    generateTabbedHTML() {
        return `
            <div class="tabbed-container" style="
                max-width: 1000px; margin: 0 auto;
            ">
                <div class="tab-nav" style="
                    display: flex; border-bottom: 2px solid #333;
                    margin-bottom: 20px;
                ">
                    ${this.generateTabNavigation()}
                </div>
                <div class="tab-content" style="
                    min-height: 400px; padding: 20px;
                    background: rgba(255,255,255,0.1); border-radius: 10px;
                ">
                    ${this.generateTabContent()}
                </div>
            </div>
        `;
    }

    generateTimelineHTML() {
        return `
            <div class="timeline-container" style="
                position: relative; padding: 40px 0;
            ">
                <div class="timeline-line" style="
                    position: absolute; left: 50%; top: 0; bottom: 0;
                    width: 4px; background: linear-gradient(to bottom, #667eea, #764ba2);
                    transform: translateX(-50%);
                "></div>
                ${this.generateTimelineNodes()}
            </div>
        `;
    }

    generateDashboardHTML() {
        return `
            <div class="dashboard-container" style="
                display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px; padding: 20px;
            ">
                ${this.generateDashboardWidgets()}
            </div>
        `;
    }

    generateModalHTML() {
        return `
            <div class="modal-container" style="
                display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 25px;
            ">
                ${this.generateModalCards()}
            </div>
        `;
    }

    generateStackHTML() {
        return `
            <div class="stack-container" style="
                display: flex; flex-direction: column; gap: 0;
                transform-style: preserve-3d; perspective: 1000px;
            ">
                ${this.generateStackCards()}
            </div>
        `;
    }

    // Generate specific content for each style
    generateCarouselSlides() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project], index) => `
            <div class="carousel-slide" style="
                min-width: 300px; background: rgba(255,255,255,0.1);
                border-radius: 10px; padding: 20px; backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
            ">
                <h3 style="color: white; margin-bottom: 15px;">${project.title}</h3>
                <p style="color: #ccc; margin-bottom: 20px;">${project.whatItIs}</p>
                <div style="display: flex; gap: 10px;">
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; color: white; font-size: 12px;">
                        ${project.category}
                    </span>
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; color: white; font-size: 12px;">
                        ${project.status}
                    </span>
                </div>
            </div>
        `).join('');
    }

    generate3DFlipCards() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project]) => `
            <div class="flip-card" style="
                width: 100%; height: 400px; perspective: 1000px;
            ">
                <div class="flip-card-inner" style="
                    position: relative; width: 100%; height: 100%;
                    text-align: center; transition: transform 0.8s;
                    transform-style: preserve-3d;
                ">
                    <div class="flip-card-front" style="
                        position: absolute; width: 100%; height: 100%;
                        backface-visibility: hidden; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 15px; padding: 20px; display: flex; flex-direction: column; justify-content: center;
                    ">
                        <h3 style="color: white; margin-bottom: 15px;">${project.title}</h3>
                        <p style="color: #ccc;">Click to flip for details</p>
                    </div>
                    <div class="flip-card-back" style="
                        position: absolute; width: 100%; height: 100%;
                        backface-visibility: hidden; background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                        border-radius: 15px; padding: 20px; transform: rotateY(180deg);
                    ">
                        <h4 style="color: white; margin-bottom: 10px;">Tech Stack</h4>
                        <p style="color: #ccc; font-size: 14px;">${project.techStack}</p>
                        <h4 style="color: white; margin: 15px 0 10px;">Features</h4>
                        <p style="color: #ccc; font-size: 14px;">${project.keyFeatures}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateAccordionSections() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project], index) => `
            <div class="accordion-section" style="
                border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; margin-bottom: 10px;
                overflow: hidden;
            ">
                <button class="accordion-header" style="
                    width: 100%; padding: 20px; background: rgba(255,255,255,0.1);
                    border: none; color: white; text-align: left; cursor: pointer;
                    display: flex; justify-content: space-between; align-items: center;
                ">
                    <span>${project.title}</span>
                    <span class="accordion-icon" style="transition: transform 0.3s;">+</span>
                </button>
                <div class="accordion-content" style="
                    max-height: 0; overflow: hidden; transition: max-height 0.3s ease;
                    background: rgba(255,255,255,0.05);
                ">
                    <div style="padding: 20px; color: #ccc;">
                        <p><strong>What it is:</strong> ${project.whatItIs}</p>
                        <p><strong>How it works:</strong> ${project.howItWorks}</p>
                        <p><strong>Tech Stack:</strong> ${project.techStack}</p>
                        <p><strong>Status:</strong> ${project.status}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    generateTabNavigation() {
        const tabs = ['Overview', 'Technology', 'Process', 'Results'];
        return tabs.map(tab => `
            <button class="tab-btn" style="
                padding: 15px 30px; background: none; border: none; color: white;
                cursor: pointer; border-bottom: 3px solid transparent;
                transition: all 0.3s;
            " data-tab="${tab.toLowerCase()}">${tab}</button>
        `).join('');
    }

    generateTabContent() {
        return `
            <div class="tab-panel active" data-tab="overview">
                <h3 style="color: white; margin-bottom: 20px;">Project Overview</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    ${this.generateOverviewCards()}
                </div>
            </div>
        `;
    }

    generateTimelineNodes() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project], index) => `
            <div class="timeline-node" style="
                position: relative; margin: 40px 0; display: flex;
                ${index % 2 === 0 ? 'justify-content: flex-start' : 'justify-content: flex-end'};
            ">
                <div class="timeline-content" style="
                    width: 45%; background: rgba(255,255,255,0.1);
                    padding: 20px; border-radius: 10px; backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.2);
                ">
                    <h4 style="color: white; margin-bottom: 10px;">${project.title}</h4>
                    <p style="color: #ccc; font-size: 14px;">${project.whatItIs}</p>
                    <div style="margin-top: 15px;">
                        <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; color: white; font-size: 12px;">
                            ${project.status}
                        </span>
                    </div>
                </div>
                <div class="timeline-dot" style="
                    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
                    width: 20px; height: 20px; background: #667eea;
                    border-radius: 50%; border: 4px solid white;
                "></div>
            </div>
        `).join('');
    }

    generateDashboardWidgets() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project]) => `
            <div class="dashboard-widget" style="
                background: rgba(255,255,255,0.1); border-radius: 15px; padding: 20px;
                backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);
                transition: transform 0.3s;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h4 style="color: white; margin: 0;">${project.title}</h4>
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; color: white; font-size: 12px;">
                        ${project.status}
                    </span>
                </div>
                <div style="color: #ccc; font-size: 14px; margin-bottom: 15px;">
                    ${project.whatItIs.substring(0, 100)}...
                </div>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${project.techStack.split(',').slice(0, 3).map(tech => 
                        `<span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 10px; color: white; font-size: 11px;">
                            ${tech.trim()}
                        </span>`
                    ).join('')}
                </div>
            </div>
        `).join('');
    }

    generateModalCards() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project]) => `
            <div class="modal-card" style="
                background: rgba(255,255,255,0.1); border-radius: 15px; padding: 20px;
                backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);
                cursor: pointer; transition: transform 0.3s;
            " data-project="${id}">
                <h3 style="color: white; margin-bottom: 15px;">${project.title}</h3>
                <p style="color: #ccc; margin-bottom: 20px;">${project.whatItIs.substring(0, 150)}...</p>
                <button class="modal-trigger" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none; color: white; padding: 10px 20px;
                    border-radius: 25px; cursor: pointer;
                ">View Details</button>
            </div>
        `).join('');
    }

    generateStackCards() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project], index) => `
            <div class="stack-card" style="
                background: rgba(255,255,255,0.1); border-radius: 15px; padding: 20px;
                backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);
                margin-bottom: -20px; transform: translateZ(${-index * 10}px);
                transition: transform 0.3s;
            ">
                <h3 style="color: white; margin-bottom: 15px;">${project.title}</h3>
                <p style="color: #ccc; margin-bottom: 20px;">${project.whatItIs}</p>
                <div style="display: flex; gap: 10px;">
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; color: white; font-size: 12px;">
                        ${project.category}
                    </span>
                    <span style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 15px; color: white; font-size: 12px;">
                        ${project.status}
                    </span>
                </div>
            </div>
        `).join('');
    }

    generateOverviewCards() {
        const projects = window.projectsData || {};
        return Object.entries(projects).map(([id, project]) => `
            <div style="
                background: rgba(255,255,255,0.1); border-radius: 10px; padding: 15px;
                backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);
            ">
                <h4 style="color: white; margin-bottom: 10px;">${project.title}</h4>
                <p style="color: #ccc; font-size: 14px;">${project.whatItIs}</p>
            </div>
        `).join('');
    }

    setupGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .carousel-container:hover .carousel-arrow {
                opacity: 1;
            }
            .carousel-arrow {
                opacity: 0.5;
                transition: opacity 0.3s;
            }
            .flip-card:hover .flip-card-inner {
                transform: rotateY(180deg);
            }
            .accordion-header:hover {
                background: rgba(255,255,255,0.2) !important;
            }
            .accordion-header.active .accordion-icon {
                transform: rotate(45deg);
            }
            .tab-btn:hover {
                background: rgba(255,255,255,0.1);
                border-bottom-color: #667eea;
            }
            .tab-btn.active {
                border-bottom-color: #667eea;
                background: rgba(255,255,255,0.1);
            }
            .dashboard-widget:hover {
                transform: translateY(-5px);
            }
            .modal-card:hover {
                transform: scale(1.05);
            }
            .stack-card:hover {
                transform: translateZ(20px) scale(1.02);
            }
        `;
        document.head.appendChild(style);
    }

    // Setup functionality for each style
    setupCarouselFunctionality() {
        // Carousel navigation logic
        console.log('Carousel functionality setup');
    }

    setup3DFlipFunctionality() {
        // 3D flip logic
        console.log('3D flip functionality setup');
    }

    setupAccordionFunctionality() {
        // Accordion logic
        console.log('Accordion functionality setup');
    }

    setupTabbedFunctionality() {
        // Tabbed interface logic
        console.log('Tabbed functionality setup');
    }

    setupTimelineFunctionality() {
        // Timeline logic
        console.log('Timeline functionality setup');
    }

    setupDashboardFunctionality() {
        // Dashboard logic
        console.log('Dashboard functionality setup');
    }

    setupModalFunctionality() {
        // Modal logic
        console.log('Modal functionality setup');
    }

    setupStackFunctionality() {
        // Stack logic
        console.log('Stack functionality setup');
    }
}

// Initialize Showcase Styles
document.addEventListener('DOMContentLoaded', () => {
    window.showcaseStyles = new ShowcaseStyles();
}); 