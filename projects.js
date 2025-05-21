// Projects data
const projectData = {
    'ai-sales': {
        title: 'AI Sales Agent',
        description: 'Automated sales chatbot for e-commerce platforms',
        functionality: [
            'Natural language understanding and processing',
            'Customer intent classification',
            'Product recommendations based on preferences',
            'Objection handling and guided selling',
            'Omnichannel deployment (web, mobile, messaging)'
        ],
        keyFeatures: [
            'Contextual awareness across conversation',
            'Memory of past interactions',
            'Personalized product matching',
            'Dynamic pricing suggestions',
            'Sentiment analysis for response tuning'
        ],
        metrics: {
            conversionRate: '32% increase',
            responseTime: '98% reduction',
            customerSatisfaction: '27% improvement'
        },
        role: 'Lead Developer & Product Manager',
        techStack: ['OpenAI GPT-4', 'Python', 'Flask', 'MongoDB', 'React', 'AWS Lambda']
    },
    'ai-video': {
        title: 'AI Video Pipeline',
        description: 'End-to-end video generation system using AI',
        functionality: [
            'Text-to-script conversion',
            'Script-to-storyboard generation',
            'Voice synthesis with natural intonation',
            'Image generation for visuals',
            'Automated video compositing and rendering'
        ],
        keyFeatures: [
            'Custom voice cloning',
            'Style-consistent imagery',
            'Dynamic pacing based on content',
            'Automatic music matching',
            'Multi-format export options'
        ],
        metrics: {
            productionTime: '94% reduction',
            costSavings: '87% reduction',
            outputQuality: '4.7/5 rating'
        },
        role: 'Technical Architect & AI Specialist',
        techStack: ['Stable Diffusion', 'ElevenLabs', 'Python', 'FFMPEG', 'LangChain', 'GCP']
    },
    'ai-api': {
        title: 'API Orchestration Engine',
        description: 'Centralized automation engine for API workflows',
        functionality: [
            'API integration management',
            'Workflow automation',
            'Custom trigger definition',
            'Error handling and recovery',
            'Performance monitoring'
        ],
        keyFeatures: [
            'No-code interface',
            'Conditional logic branching',
            'Templated transformation recipes',
            'Rate limiting and throttling',
            'Detailed logging and analytics'
        ],
        metrics: {
            developmentSpeed: '75% improvement',
            systemUptime: '99.98%',
            apiCosts: '63% reduction'
        },
        role: 'Lead Engineer & System Designer',
        techStack: ['Node.js', 'Express', 'Redis', 'Docker', 'Kubernetes', 'Prometheus']
    }
};

// DOM elements
const planets = document.querySelectorAll('.planet');
const moons = document.querySelectorAll('.moon');
const projectModal = document.getElementById('projectModal');
const modalBody = projectModal.querySelector('.modal-body');
const closeModalBtn = projectModal.querySelector('.close-modal');

// Add event listeners to planets
planets.forEach(planet => {
    planet.addEventListener('click', () => {
        // Handle planet clicks if needed
    });
});

// Add event listeners to moons
moons.forEach(moon => {
    moon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent planet click
        const projectId = moon.getAttribute('data-project');
        
        if (projectId && projectData[projectId]) {
            showProjectModal(projectId);
        }
    });
});

// Close modal when clicking the close button
closeModalBtn.addEventListener('click', () => {
    projectModal.classList.remove('active');
});

// Close modal when clicking outside the content
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
    }
});

// Function to show project modal
function showProjectModal(projectId) {
    const project = projectData[projectId];
    
    if (!project) return;
    
    // Create modal content
    const content = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        
        <h3>Functionality</h3>
        <ul>
            ${project.functionality.map(item => `<li>${item}</li>`).join('')}
        </ul>
        
        <h3>Key Features</h3>
        <ul>
            ${project.keyFeatures.map(item => `<li>${item}</li>`).join('')}
        </ul>
        
        <h3>Results & Impact</h3>
        <div class="metrics-grid" style="display:grid;grid-template-columns:repeat(3, 1fr);gap:15px;margin:20px 0;">
            ${Object.entries(project.metrics).map(([key, value]) => `
                <div style="background:rgba(0,255,238,0.1);padding:15px;border-radius:10px;text-align:center;">
                    <div style="font-size:1.8rem;color:var(--accent);margin-bottom:5px;">${value}</div>
                    <div style="color:#aaa;text-transform:capitalize;">${key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
            `).join('')}
        </div>
        
        <h3>Role</h3>
        <p>${project.role}</p>
        
        <h3>Tech Stack</h3>
        <div class="tech-stack">
            ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
        </div>
    `;
    
    modalBody.innerHTML = content;
    projectModal.classList.add('active');
}

// Add animation to moons
function animateMoons() {
    planets.forEach(planet => {
        const moons = planet.querySelectorAll('.moon');
        
        moons.forEach((moon, index) => {
            // Add subtle floating animation
            const delay = index * 0.5; // Stagger the animations
            moon.style.animation = `floatMoon 3s ease-in-out ${delay}s infinite alternate`;
        });
    });
}

// Initialize animations
animateMoons();

// Add keyframe animation to head
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatMoon {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(-10px) scale(1.05); }
}
`;
document.head.appendChild(style); 