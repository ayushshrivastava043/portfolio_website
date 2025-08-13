// Projects data
const projectData = {
    'ai-sales': {
        title: '🤖 1. AI Sales Agent for E-commerce',
        whatItIs: 'A smart, retrieval-augmented chatbot deployed on e-commerce platforms to deliver personalized shopping experiences in real-time—like a human sales rep on every page. Built using GPT + Qdrant, connected to Shopify APIs, and backed by live data and business logic.',
        howItWorks: [
            'Understands user queries (e.g., "vegan protein under ₹2,000")',
            'Fetches matching products via vector similarity search',
            'Applies cart logic, stock status, and promo rules',
            'Offers contextual upsells or coupon nudges',
            'Escalates based on sentiment or friction'
        ],
        keyFeatures: [
            'Memory-based personalization',
            'Hindi/English auto-switching',
            'Drop-off detection and funnel tracking',
            'Real-time dashboard via Prometheus & Grafana'
        ],
        impact: {
            title: 'Impact (Pilot Results)',
            headers: ['Metric', 'Before', 'After', 'Change'],
            rows: [
                { 'Metric': 'Conversion Rate', 'Before': '2.3 %', 'After': '4.1 %', 'Change': '+79 %' },
                { 'Metric': 'Avg. Order Value', 'Before': '₹1,480', 'After': '₹1,930', 'Change': '+30 %' },
                { 'Metric': 'CSAT', 'Before': '3.8/5', 'After': '4.5/5', 'Change': '↑ 0.7 pts' },
                { 'Metric': 'Support Tickets', 'Before': '18/1k users', 'After': '6/1k users', 'Change': '–67 %' }
            ]
        },
        myRole: 'Product lead & architect—designed the retrieval flow, managed rollout, and led a cross-functional dev team.',
        techStack: ['Python', 'FastAPI', 'GPT-4o', 'Qdrant', 'Shopify API', 'Redis', 'Socket.IO', 'Prometheus', 'Grafana']
    },
    'ai-video': {
        title: '🎬 2. AI Video Generation Pipeline (Script to Screen)',
        whatItIs: 'An automated pipeline that transforms a single-line prompt into a narrated video with visuals, voice-over, editing, and export-ready MP4. Used to produce explainer and mythology series at scale with zero manual editing.',
        pipelineWorkflow: [
            'Prompt (e.g., "Why did the Vijayanagara Empire collapse?")',
            'ChatGPT creates scene-wise script',
            'Midjourney / Stable Diffusion generates visuals',
            'Google TTS creates voiceovers',
            'Minimax & FFmpeg compile and render',
            'Whisper generates captions',
            'Auto-publish to YouTube/S3'
        ],
        keyFeatures: [
            'Modular templates (documentary, promo, mythology)',
            'Multi-language audio & captions',
            'Visual and audio pacing auto-synced',
            'Budget-guarded runs with GPU usage tracking'
        ],
        productionEfficiency: {
            title: 'Production Efficiency',
            headers: ['Metric', 'Manual', 'AI Pipeline', 'Reduction'],
            rows: [
                { 'Metric': 'Time/video', 'Manual': '~3 days', 'AI Pipeline': '48 mins', 'Reduction': '–97 %' },
                { 'Metric': 'Cost/video', 'Manual': '₹28k', 'AI Pipeline': '₹4.2k', 'Reduction': '–85 %' },
                { 'Metric': 'View-through', 'Manual': '42 %', 'AI Pipeline': '61 %', 'Reduction': '+19 %' }
            ]
        },
        myRole: 'Designed architecture, scripted prompt logic, deployed orchestrator with Airflow, and published full Indian history video series.',
        techStack: ['LangChain', 'ChatGPT', 'Midjourney', 'Stable Diffusion XL', 'Google TTS', 'Minimax', 'FFmpeg', 'Whisper', 'Airflow', 'GCP']
    },
    'ai-api': {
        title: '⚙️ 3. End-to-End API Orchestration Framework',
        whatItIs: 'A centralized automation engine that connects services like Shopify, HubSpot, Twilio, Asana, and Stripe. Incoming webhooks trigger multi-step workflows—managed through simple YAML, no manual intervention needed.',
        useCaseExample: {
            title: 'Use Case Example – High-Value Order Automation',
            description: 'When a Shopify order > ₹3,000 is received:',
            steps: [
                '✅ WhatsApp DM is sent via Twilio',
                '✅ HubSpot contact is created/updated',
                '✅ Asana task is added for warehouse packing'
            ],
            outro: 'All from a single orders/create webhook.'
        },
        keyFeatures: [
            'YAML-based flow definitions',
            'Idempotent execution',
            'Rate-limit aware',
            'Namespace queues for multi-client safety',
            'Full observability with Prometheus'
        ],
        myRole: 'Architected event model, built rule engine, containerized backend, and enabled ops teams to own automation without dev handholding.',
        techStack: ['Python', 'FastAPI', 'Redis Streams', 'Celery', 'RabbitMQ', 'HashiCorp Vault', 'Prometheus', 'Grafana', 'Twilio API', 'HubSpot API', 'Shopify API', 'Asana API']
    },
    // PM Projects Start Here
    'pm-telecom': {
        title: '📡 1. Dual-Track Telecom Rollout – Bell Canada',
        subTitle: '(eSIM Activation & DTH Self-Installation)',
        whatItIs: 'A pair of customer-facing journeys that let subscribers activate an e-SIM in minutes and install DTH hardware without a field visit—underpinned by microservice-based order-provisioning and billing flows.',
        myContributions: [
            'Solution design: Authored end-to-end functional-design docs; mapped legacy calls to new REST services',
            'SAFe Agile lead: Ran 2 squads (dev + QA), cleared blockers, trimmed sprint slippage by 30%',
            'Error & delay cuts: Automation + CI checks lowered provisioning errors 10% and delivery delays 30%',
            'Stakeholder comms: Interactive demos for execs cut clarification time nearly in half'
        ],
        keyFeatures: [
            'Self-service eSIM activation',
            'DTH hardware self-installation',
            'Automated provisioning workflows',
            'Real-time order tracking'
        ],
        impact: {
            title: 'Impact Metrics',
            headers: ['Metric', 'Before', 'After', 'Change'],
            rows: [
                { 'Metric': 'Provisioning Errors', 'Before': '12%', 'After': '2%', 'Change': '-83%' },
                { 'Metric': 'Delivery Time', 'Before': '72h', 'After': '48h', 'Change': '-33%' },
                { 'Metric': 'Customer Satisfaction', 'Before': '3.2/5', 'After': '4.1/5', 'Change': '+28%' }
            ]
        },
        myRole: 'Product Manager & Technical Lead',
        techStack: ['Microservices', 'Spring Boot', 'Kafka', 'Oracle BRM', 'Jira/Confluence', 'SAFe']
    },
    'pm-hrsuite': {
        title: '👥 2. KenboxTech HR-Suite Revamp',
        subTitle: '(LMS, LDS & BES Modules)',
        whatItIs: 'A ground-up redesign of KenboxTech\'s HR platform—new navigation, dashboards, and mobile-ready flows spanning Learning Management (LMS), Leadership Development (LDS), and Behavior Evaluation (BES).',
        myContributions: [
            'Re-imagined IA & UX: low-fidelity sketches → high-fidelity Figma prototypes',
            'Wrote epics & user stories for 30+ new features (skill-gap analytics, AI quiz engine, pulse surveys)',
            'Acted as SME across three modules, aligning dev & QA on acceptance criteria',
            'Guided dev handoff; sprint velocity +18% after story refinement workshops'
        ],
        keyFeatures: [
            'Unified learning dashboard',
            'Mobile-first design',
            'Automated skill assessments',
            'Leadership development tracking'
        ],
        impact: {
            title: 'Platform Impact',
            headers: ['Metric', 'Before', 'After', 'Change'],
            rows: [
                { 'Metric': 'User Engagement', 'Before': '45%', 'After': '78%', 'Change': '+73%' },
                { 'Metric': 'Mobile Usage', 'Before': '12%', 'After': '58%', 'Change': '+383%' },
                { 'Metric': 'Training Completion', 'Before': '65%', 'After': '92%', 'Change': '+42%' }
            ]
        },
        myRole: 'Product Manager & UX Lead',
        techStack: ['Figma', 'Miro', 'React', 'Django', 'Azure DevOps']
    },
    'pm-websites': {
        title: '🌐 3. Multi-Brand Website Builds & Launches',
        whatItIs: 'Full-service site projects—branding, copy, wireframes, front-end code, and GTM setup—for startups in AI services, boutique retail, and professional coaching.',
        myContributions: [
            'Defined brand voice & visual mood boards with founders',
            'Built responsive templates (HTML/Tailwind/React) with Lighthouse 90+ scores',
            'Integrated Stripe, Calendly, and HubSpot forms; set up GA4 & basic SEO',
            'Delivered 6 sites in 9 months, each live within 4-week cycles'
        ],
        keyFeatures: [
            'Custom brand identity',
            'Responsive design',
            'SEO optimization',
            'Analytics integration'
        ],
        impact: {
            title: 'Project Metrics',
            headers: ['Metric', 'Target', 'Achieved', 'Status'],
            rows: [
                { 'Metric': 'Sites Delivered', 'Target': '6', 'Achieved': '6', 'Status': '✅' },
                { 'Metric': 'Avg. Lighthouse Score', 'Target': '90+', 'Achieved': '92', 'Status': '✅' },
                { 'Metric': 'Avg. Load Time', 'Target': '<2s', 'Achieved': '1.8s', 'Status': '✅' }
            ]
        },
        myRole: 'Full-Stack Product Manager',
        techStack: ['React/Next.js', 'TailwindCSS', 'Netlify', 'GA4', 'Stripe']
    },
    'pm-edtech': {
        title: '🎓 4. Banking-EdTech Content Platform',
        whatItIs: 'A modular e-learning product for a banking client—customer-awareness, compliance training, and gamified employee-engagement tracks.',
        myContributions: [
            'Ran workshops to turn loose requirements into signed-off functional specs, improving timeline predictability 10%',
            'Crafted clickable wireflows; A/B tweaks boosted learner engagement 15%',
            'Partnered with motion designers to embed animated explainers, lowering drop-off rates',
            'Oversaw UAT & release notes, trimming post-launch fixes by 20%'
        ],
        keyFeatures: [
            'Interactive learning modules',
            'Gamified assessments',
            'Progress tracking',
            'Mobile learning support'
        ],
        impact: {
            title: 'Learning Impact',
            headers: ['Metric', 'Before', 'After', 'Change'],
            rows: [
                { 'Metric': 'Engagement Rate', 'Before': '42%', 'After': '57%', 'Change': '+36%' },
                { 'Metric': 'Drop-off Rate', 'Before': '35%', 'After': '18%', 'Change': '-49%' },
                { 'Metric': 'Assessment Pass Rate', 'Before': '68%', 'After': '89%', 'Change': '+31%' }
            ]
        },
        myRole: 'Product Manager & Learning Designer',
        techStack: ['Adobe XD', 'Storyline 360', 'SCORM', 'Firebase', 'Slack/ClickUp']
    },
    // PM Projects End Here

    // ───── Product-Management Projects ─────
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
        title: 'KPI-Driven AI Growth Playbook',
        description: 'Defined OKRs & dashboards to drive engagement & GMV',
        functionality: [
            'North-star metrics & quarterly targets',
            'Feature prioritization by latency & conversion lift',
        ],
        keyFeatures: [
            '25% jump in user engagement',
            '10% GMV growth',
        ],
        role: 'AI Product Manager',
        techStack: ['Grafana', 'Looker', 'Python'],
    },
    'biz-esim-dth-launch': {
        title: 'e-SIM & DTH Market Launch',
        description: 'Go-to-market playbooks, pricing & CX for Bell Canada',
        functionality: [
            'Exec demos & go/no-go gates',
            'Cross-team SLA negotiation',
        ],
        keyFeatures: [
            'Service live in <6 months',
            '30% faster delivery',
        ],
        role: 'Sr. Business System Analyst',
        techStack: ['PowerPoint', 'Confluence', 'Excel'],
    },
    'biz-genai-pilot': {
        title: 'Generative-AI Telecom Pilot',
        description: 'LLM FAQs & ticket-triage POC at CGI',
        functionality: [
            'Cost-benefit model & sponsor buy-in',
            'Pilot metrics capture for ops efficiency',
        ],
        keyFeatures: [
            'Ops efficiency gains green-lit for FY25',
        ],
        role: 'Sr. Business Analyst',
        techStack: ['Excel', 'OpenAI API', 'UiPath'],
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

// Make projectData globally accessible
window.projectData = projectData; 