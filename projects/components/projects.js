// Projects data
const projectData = {
    'ai-sales': {
        title: 'Verifast — Agentic AI Sales Platform',
        whatItIs: 'Agentic AI sales assistant platform serving 600+ e-commerce clients. Architecture: intent detection, orchestration layer (tool/action calling), semantic retrieval pipeline, and business rules/guardrails for safety.',
        myContributions: [
            'Owned Verifast case study end-to-end — platform architecture and production delivery',
            'Diagnosed flash-sale stale grounding (batch sync vs real-time price/stock); shipped immediate and long-term fixes',
            'Built automated pre-go-live evaluation set for data quality',
            'Sandbox testing, edge-case breaking, narrow rollout to 1–2 clients before wide release'
        ],
        keyFeatures: [
            'Intent detection + orchestration',
            'Semantic search / RAG grounding',
            'Business rules guardrails',
            'Pre-go-live automated evaluation'
        ],
        myRole: 'Agentic AI Product — architecture ownership, production incident response, rollout discipline.',
        techStack: ['Agentic AI', 'RAG', 'Semantic Search', 'Orchestration', 'E-commerce Integrations']
    },
    'ai-video': {
        title: 'AI Video Content Pipeline',
        whatItIs: 'End-to-end side project: scripts via ChatGPT, video via Minimax/Imagine AI, images via Midjourney, editing via Shotcut. Exploring Indian history/culture content and youth comedy/lifestyle formats for US and Indian audiences.',
        pipelineWorkflow: [
            'Script generation (ChatGPT)',
            'Visual generation (Midjourney / Imagine AI)',
            'Video assembly (Minimax)',
            'Edit and export (Shotcut)'
        ],
        keyFeatures: [
            'Multi-format short-form content',
            'History/culture and lifestyle comedy tracks',
            'Modular pipeline — each step understood before scaling'
        ],
        myRole: 'Solo builder — full pipeline design and content experimentation.',
        techStack: ['ChatGPT', 'Midjourney', 'Minimax', 'Imagine AI', 'Shotcut']
    },
    'ai-api': {
        title: 'Neo RAG + AWS Bedrock AgentCore / LangGraph',
        whatItIs: 'Neo: personal RAG assistant (Flask, FAISS, Gemini/OpenAI fallback, multi-tenant) built chapter-by-chapter. Plus AWS Bedrock AgentCore and full LangGraph agent deployment as interview-readiness exercises.',
        keyFeatures: [
            'KB-first portfolio chatbot pattern',
            'FAISS vector retrieval',
            'LangGraph agent workflows',
            'AWS Bedrock AgentCore hands-on'
        ],
        myRole: 'Solo builder — deep conceptual understanding over demo scaffolding.',
        techStack: ['Flask', 'FAISS', 'LangGraph', 'AWS Bedrock AgentCore', 'Gemini', 'OpenAI']
    },
    // PM Projects Start Here
    'pm-telecom': {
        title: 'Salud.ai Consultancy Sprint (Durham MBA)',
        subTitle: 'US freemium health app',
        whatItIs: 'Co-founded and coordinated a consultancy sprint for Salud.ai. Led AI and data strategy across GTM (Pod A), data/AI strategy (Pod B), KPI framework, survey instruments, and Jira tickets across US and India content platforms.',
        myContributions: [
            'GTM strategy (Pod A) and data & AI strategy (Pod B)',
            'KPI framework and survey instrument design',
            '15-minute client-facing presentation with full script',
            'Adapted presentation style mid-engagement for business vs academic audiences'
        ],
        keyFeatures: ['GTM strategy', 'AI/data strategy', 'KPI framework', 'Client presentation'],
        myRole: 'Co-founder & AI/Data Strategy Lead — Durham MBA consultancy sprint',
        techStack: ['Jira', 'Excel', 'PowerPoint', 'Survey design']
    },
    'pm-hrsuite': {
        title: 'BP Board Strategy Case (Durham MBA)',
        subTitle: 'Major consulting case',
        whatItIs: 'Board strategy report: asset divestment analysis, IEMS proposition for data centres (Lightsource BP renewables + gas backup + Castrol cooling), AI transformation strategy (four pillars), and Geopolitical Intelligence Unit recommendation.',
        myContributions: [
            'PowerPoint decks and boardroom speech notes',
            'Excel financial models',
            'Word appendices for supporting analysis'
        ],
        keyFeatures: ['Asset divestment', 'IEMS for data centres', 'AI transformation (4 pillars)', 'Geopolitical Intelligence Unit'],
        myRole: 'Consulting team member — Durham MBA',
        techStack: ['Excel', 'PowerPoint', 'Word']
    },
    'pm-websites': {
        title: 'V-Lab Strategic Consulting & Advisory',
        whatItIs: 'Advising V-Lab on agentic AI use cases (solution architecture through market positioning). Led student consulting project on market entry for India, China, and Australia in wind energy VR training.',
        myContributions: [
            'Built/corrected TAM/SAM/SOM models from first principles',
            'Six novel agentic AI service concepts on digital shadow data',
            'Cross-document positioning framework (pricing, Innovate UK plan, Xodus report)',
            'Multi-country master reports and Australia Excel financial model'
        ],
        keyFeatures: ['Market entry strategy', 'TAM/SAM/SOM modeling', 'Agentic AI service concepts', 'Positioning framework'],
        myRole: 'Lead consultant & ongoing advisor',
        techStack: ['Excel', 'Word', 'Market research', 'Agentic AI architecture']
    },
    'pm-edtech': {
        title: 'MBA Coursework Portfolio',
        whatItIs: 'Selected Durham MBA deliverables: CGI agile sprint operations report, Tesla sustainability essay, Patagonia supply chain (Applied Strategic Management), Salud.ai consultancy essay, Verifast PM assignment, Lyon IBC journal, Philippines country manager simulation.',
        myContributions: ['Applied strategy across operations, sustainability, consulting, and project management modules'],
        keyFeatures: ['Multi-disciplinary MBA coursework', 'Real company case studies'],
        myRole: 'MBA candidate — Durham University Business School',
        techStack: ['Excel', 'Word', 'PowerPoint', 'Case analysis']
    },
    // PM Projects End Here

    // ───── Product-Management Projects (legacy keys) ─────
    'pm-bell-esim': {
        title: 'eSIM Activation & DTH Self-Install',
        description: 'End-to-end telecom solution for e-SIM activation and DTH self-installation',
        functionality: [
            'Order provisioning via microservices',
            'Automated billing integration',
            'Self-serve UI flows for end-users',
            'SAFe-driven sprint planning & blockers removal',
        ],
        keyFeatures: [
            '10% reduction in provisioning errors',
            '30% faster delivery through CI/CD and automation',
            'Stakeholder demos cut query time by 50%',
        ],
        role: 'Product Specialist (Bell Canada)',
        techStack: ['Spring Boot', 'Kafka', 'Oracle BRM', 'Jira/Confluence'],
    },
    'pm-kenboxtech': {
        title: 'KenboxTech HR-Suite Revamp',
        description: 'Wireframes, UX/UI and new features for LMS, LDS & BES modules',
        functionality: [
            'Figma prototype → high-fi UI designs',
            'User stories & acceptance criteria for 30+ features',
            'SME across Learning, Leadership & Behavior modules',
        ],
        keyFeatures: [
            '18% velocity boost after story refinement',
            'Skill-gap analytics & AI-powered quiz engine',
        ],
        role: 'Product Manager & UX Lead',
        techStack: ['Figma', 'Miro', 'React', 'Django'],
    },
    'pm-webdev': {
        title: 'Multi-Brand Website Builds',
        description: 'Responsive site templates, branding, copy & integrations',
        functionality: [
            'Brand mood-boards & copy decks',
            'HTML/Tailwind/React responsive templates',
            'Stripe, Calendly & HubSpot form hookups',
        ],
        keyFeatures: [
            '6 sites live in 9 months, 4-week cycles',
            'Lighthouse scores 90+ and GA4 tracking',
        ],
        role: 'Full-Stack PM & Developer',
        techStack: ['Next.js', 'TailwindCSS', 'Netlify', 'GA4'],
    },
    'pm-edtech': {
        title: 'Banking EdTech Platform',
        description: 'Customer-awareness, training & engagement modules',
        functionality: [
            'Requirements → functional specs (10% timeline gain)',
            'Wireflows & A/B UX tweaks (+15% engagement)',
            'Animated SCORM modules with dev handoff',
        ],
        keyFeatures: [
            '10% faster delivery through clear UAT',
            '20% fewer post-launch fixes',
        ],
        role: 'Business Analyst & UX Coordinator',
        techStack: ['Adobe XD', 'Storyline 360', 'Firebase'],
    },

    // ───── Business Development Projects ─────
    'biz-kpi-playbook': {
        title: 'Verifast — Agentic AI Product',
        description: '600+ e-commerce clients · intent, orchestration, retrieval, guardrails',
        functionality: [
            'Production flash-sale grounding incident diagnosis & fix',
            'Automated pre-go-live evaluation set',
            'Sandbox testing & narrow client rollout discipline',
        ],
        keyFeatures: [
            'Agentic platform architecture ownership',
            'Data quality automation before go-live',
        ],
        role: 'Agentic AI Product',
        techStack: ['Agentic AI', 'RAG', 'Semantic Search', 'Orchestration'],
    },
    'biz-esim-dth-launch': {
        title: 'DKPR E-Learn',
        description: 'Early-career e-learning role — details pending update',
        functionality: ['Specific contributions to be added'],
        keyFeatures: ['⚠️ Content pending — ask about Verifast or CGI for recent work'],
        role: 'TBD',
        techStack: ['E-learning'],
    },
    'biz-genai-pilot': {
        title: 'CGI — GenAI Pilot (Bell Canada)',
        description: 'BSA → Associate PM · customer enquiry automation in ~4 months',
        functionality: [
            'Structured use cases & measurable success criteria',
            'Agile transformation with real waterfall pain-point example',
            'Team navigation through restructuring',
        ],
        keyFeatures: [
            'GenAI platform pilot from undefined success to delivery',
            'Stakeholder alignment across scattered ideas',
        ],
        role: 'Business System Analyst → Associate Product Manager',
        techStack: ['GenAI', 'Agile/SAFe', 'Workflow documentation'],
    },
    'biz-edtech-expansion': {
        title: 'EdTech Revenue Expansion',
        description: 'Virtual-class & gamified modules for DKPR',
        functionality: [
            'Market research → MRD & pricing',
            'Demo road-shows & feedback loops',
        ],
        keyFeatures: [
            '2× revenue YoY',
            '15% higher engagement',
        ],
        role: 'Business Analyst',
        techStack: ['Word', 'Zoom', 'SurveyMonkey'],
    },
    'biz-green-build': {
        title: 'Green-Build Cost-Save Initiative',
        description: 'Eco-materials ROI model & waste-reduction in infra build',
        functionality: [
            'Supplier negotiations for fly-ash mix',
            'Spatial planning for green space +30%',
        ],
        keyFeatures: [
            '25% less material waste',
            '10% cost reduction',
        ],
        role: 'Site Engineer & Analyst',
        techStack: ['AutoCAD', 'GIS', 'Excel'],
    },
};

// Defer DOM queries and listeners until DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const planets = document.querySelectorAll('.planet');
    const moons = document.querySelectorAll('.moon');
    const projectModal = document.getElementById('projectModal');
    const closeModalBtn = projectModal ? projectModal.querySelector('.close-modal') : null;

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
    if (closeModalBtn && projectModal) {
        closeModalBtn.addEventListener('click', () => {
            projectModal.classList.remove('active');
        });
    }

    // Close modal when clicking outside the content
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
            }
        });
    }
});

// Helper function to generate a list
function generateList(items) {
    if (!items || items.length === 0) return '';
    return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

// Helper function to generate a table
function generateTable(tableData) {
    if (!tableData || !tableData.rows || tableData.rows.length === 0) return '';
    let tableHTML = '<table class="details-table">';
    if (tableData.headers) {
        tableHTML += '<thead><tr>';
        tableData.headers.forEach(header => tableHTML += `<th>${header}</th>`);
        tableHTML += '</tr></thead>';
    }
    tableHTML += '<tbody>';
    tableData.rows.forEach(row => {
        tableHTML += '<tr>';
        tableData.headers.forEach(header => tableHTML += `<td>${row[header] || ''}</td>`);
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';
    return tableHTML;
}

// Function to show project modal
function showProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) {
        console.error('Project not found:', projectId);
        return;
    }

    const modal = document.getElementById('projectModal');
    if (!modal) {
        console.error('Modal not found');
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
        content += `<h4 class="project-subtitle">${project.subTitle}</h4>`;
    }
    if (project.whatItIs) {
        content += `<div class="section"><h3>What it is</h3><p>${project.whatItIs}</p></div>`;
    }
    if (project.myContributions) {
        content += `<div class="section"><h3>My Contributions</h3><ul>${project.myContributions.map(contribution => `<li>${contribution}</li>`).join('')}</ul></div>`;
    }
    if (project.howItWorks) {
        content += `<div class="section"><h3>How it works</h3><ul>${project.howItWorks.map(step => `<li>${step}</li>`).join('')}</ul></div>`;
    }
    if (project.pipelineWorkflow) {
        content += `<div class="section"><h3>Pipeline Workflow</h3><ul>${project.pipelineWorkflow.map(step => `<li>${step}</li>`).join('')}</ul></div>`;
    }
    if (project.useCaseExample) {
        content += `<div class="section"><h3>${project.useCaseExample.title || 'Use Case Example'}</h3>`;
        if (project.useCaseExample.description) {
            content += `<p>${project.useCaseExample.description}</p>`;
        }
        content += `<ul>${project.useCaseExample.steps.map(step => `<li>${step}</li>`).join('')}</ul>`;
        if (project.useCaseExample.outro) {
            content += `<p>${project.useCaseExample.outro}</p>`;
        }
        content += `</div>`;
    }
    if (project.keyFeatures) {
        content += `<div class="section"><h3>Key Features</h3><ul>${project.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}</ul></div>`;
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
    // Tech Stack or Tooling Stack
    const stack = project.techStack || project.toolingStack;
    const stackTitle = project.techStack ? 'Tech Stack' : 'Tooling / Stack';
    if (stack) {
        content += `<div class="section"><h3>${stackTitle}</h3><div class="tech-stack">${stack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}</div></div>`;
    }
    content += `</div>`;
    
    modalContent.innerHTML = content;
    modal.classList.add('active');
}

// Add animation to moons
function animateMoons() {
    if (window && window.PlanetPositioning) return; // keep transforms static when config-driven
    const planets = document.querySelectorAll('.planet');
    planets.forEach(planet => {
        const moons = planet.querySelectorAll('.moon');
        moons.forEach((moon, index) => {
            const delay = index * 0.5;
            moon.style.animation = `floatMoon 3s ease-in-out ${delay}s infinite alternate`;
        });
    });
}
document.addEventListener('DOMContentLoaded', animateMoons);

// Add keyframe animation to head & table styles
const style = document.createElement('style');
style.innerHTML = `
@keyframes floatMoon {
    /* neutral when config-driven; animation guarded above */
    0% { opacity: 1; }
    100% { opacity: 1; }
}
.details-table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
    font-size: 0.9em;
}
.details-table th, .details-table td {
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 10px;
    text-align: left;
}
.details-table th {
    background-color: rgba(0, 255, 238, 0.1);
    color: var(--accent);
}
.details-table tbody tr:nth-child(odd) {
    background-color: rgba(255, 255, 255, 0.05);
}
`;
document.head.appendChild(style);

// Make projectData and showProjectModal globally accessible
window.projectData = projectData;
window.showProjectModal = showProjectModal; 