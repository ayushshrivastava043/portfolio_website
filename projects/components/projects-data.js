// Projects Data - Updated with actual AI projects
const projectsData = {
  'ai-assistant': {
    title: 'AI Assistant',
    description: 'Advanced AI-powered chatbot with natural language processing and context awareness',
    detailedDescription: 'A sophisticated AI assistant that understands context, learns from conversations, and provides intelligent responses. Features include natural language processing, sentiment analysis, and multi-modal interaction capabilities.',
    tech: ['Python', 'OpenAI API', 'WebSocket', 'React', 'Natural Language Processing'],
    status: 'Active',
    demoUrl: 'http://localhost:4000',
    codeUrl: '#',
    features: ['Context Awareness', 'Multi-language Support', 'Sentiment Analysis', 'Real-time Learning'],
    goals: 'To create an intelligent conversational AI that can assist users with complex tasks, understand context, and provide personalized responses.',
    progress: 'Core NLP engine completed, WebSocket integration working, actively developing advanced conversation memory and learning algorithms.',
    roadmap: 'Implement multi-modal interactions (voice, image), add plugin system for external integrations, and develop mobile app version.',
    innovations: 'Novel context-aware conversation flow, adaptive learning from user interactions, and intelligent response generation.',
    lastUpdated: 'This Week'
  },
  'website-generator': {
    title: 'Website Generator',
    description: 'AI-powered tool that generates complete websites from simple descriptions',
    detailedDescription: 'Revolutionary AI tool that creates fully functional websites from natural language descriptions. Automatically generates HTML, CSS, and JavaScript with modern design patterns and responsive layouts.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'AI Templates', 'Responsive Design'],
    status: 'Active',
    demoUrl: 'http://localhost:4000/website-generator',
    codeUrl: '#',
    features: ['AI-Powered Generation', 'Responsive Design', 'Modern UI/UX', 'Custom Templates'],
    goals: 'To revolutionize website creation by making professional development accessible to non-technical users through AI-powered generation.',
    progress: 'AI generation engine functional, template system working, actively developing advanced customization and optimization features.',
    roadmap: 'Add e-commerce templates, integrate with popular CMS systems, implement AI-powered content generation, and add multi-language support.',
    innovations: 'AI-driven layout optimization, intelligent content placement, and automated responsive design generation.',
    lastUpdated: 'This Week'
  },
  'smart-dashboards': {
    title: 'Smart Dashboards',
    description: 'Interactive data visualization dashboards with real-time analytics',
    detailedDescription: 'Dynamic dashboards that provide real-time insights through interactive charts, graphs, and data visualizations. Features advanced filtering, drill-down capabilities, and automated reporting.',
    tech: ['React', 'D3.js', 'Chart.js', 'REST APIs', 'Real-time Data'],
    status: 'Active',
    demoUrl: '#',
    codeUrl: '#',
    features: ['Real-time Updates', 'Interactive Charts', 'Custom Widgets', 'Data Export'],
    goals: 'To transform complex data into actionable insights through intuitive, interactive visualizations that enable data-driven decision making.',
    progress: 'Core visualization components completed, real-time data integration working, actively developing advanced analytics and custom widget system.',
    roadmap: 'Implement AI-powered insights, add predictive analytics, create mobile-responsive dashboards, and integrate with more data sources.',
    innovations: 'Real-time data streaming, intelligent chart selection, and automated insight generation.',
    lastUpdated: 'This Week'
  },
  'news-portal': {
    title: 'News Portal',
    description: 'AI-curated news aggregation platform with personalized content',
    detailedDescription: 'Intelligent news platform that uses AI to curate and personalize content based on user preferences. Features include automated categorization, sentiment analysis, and recommendation engines.',
    tech: ['Node.js', 'MongoDB', 'AI Curation', 'Real-time Updates', 'Personalization'],
    status: 'Active',
    demoUrl: '#',
    codeUrl: '#',
    features: ['AI Curation', 'Personalized Content', 'Real-time Updates', 'Multi-source Aggregation'],
    goals: 'To revolutionize news consumption by providing personalized, AI-curated content that matches individual interests and reading preferences.',
    progress: 'AI curation engine functional, user preference system implemented, actively developing advanced recommendation algorithms and content analysis.',
    roadmap: 'Add multi-language support, implement social features, create mobile apps, and integrate with more news sources.',
    innovations: 'AI-powered content curation, intelligent sentiment analysis, and personalized recommendation engines.',
    lastUpdated: 'This Week'
  },
  'pdf-modifier': {
    title: 'PDF Modifier',
    description: 'Advanced PDF processing tool with AI-powered content extraction',
    detailedDescription: 'Sophisticated PDF processing tool that uses AI to extract, analyze, and modify content. Features include OCR, content analysis, automated form filling, and intelligent text extraction.',
    tech: ['Python', 'PyPDF2', 'AI OCR', 'Content Analysis', 'Machine Learning'],
    status: 'Active',
    demoUrl: '#',
    codeUrl: '#',
    features: ['AI OCR', 'Content Analysis', 'Form Processing', 'Batch Operations'],
    goals: 'To transform PDF processing from manual, time-consuming tasks to intelligent, automated operations using AI and machine learning.',
    progress: 'OCR engine functional, content analysis working, actively developing advanced form processing and batch operation capabilities.',
    roadmap: 'Implement AI-powered form recognition, add collaborative editing features, create cloud-based processing, and integrate with document management systems.',
    innovations: 'AI-powered OCR with high accuracy, intelligent content analysis, and automated form processing.',
    lastUpdated: 'This Week'
  },
  'pc-organizer': {
    title: 'PC File Organizer',
    description: 'Intelligent file organization system with AI-powered categorization',
    detailedDescription: 'Smart file management system that automatically organizes files using AI classification. Features include intelligent folder creation, duplicate detection, and automated backup organization.',
    tech: ['Python', 'File System APIs', 'AI Classification', 'GUI', 'Automation'],
    status: 'Active',
    demoUrl: '#',
    codeUrl: '#',
    features: ['AI Classification', 'Duplicate Detection', 'Automated Organization', 'Smart Search'],
    goals: 'To eliminate the chaos of digital file management through intelligent, AI-powered organization that works automatically in the background.',
    progress: 'AI classification engine functional, duplicate detection working, actively developing advanced organization algorithms and user interface.',
    roadmap: 'Add cloud storage integration, implement collaborative organization, create mobile app, and add advanced search capabilities.',
    innovations: 'AI-powered file categorization, intelligent duplicate detection, and automated organization patterns.',
    lastUpdated: 'This Week'
  },
  'ai-video-generator': {
    title: 'AI Video Generator',
    description: 'AI-powered video creation tool with automated editing and effects',
    detailedDescription: 'Revolutionary video creation tool that uses AI to generate, edit, and enhance videos automatically. Features include automated scene detection, intelligent editing, and AI-generated effects.',
    tech: ['Python', 'OpenCV', 'AI Models', 'Video Processing', 'Computer Vision'],
    status: 'Active',
    demoUrl: '#',
    codeUrl: '#',
    features: ['AI Video Generation', 'Automated Editing', 'Smart Effects', 'Batch Processing'],
    goals: 'To democratize video creation by making professional-quality video production accessible to everyone through AI-powered automation.',
    progress: 'Video processing engine functional, AI editing algorithms working, actively developing advanced effects and batch processing capabilities.',
    roadmap: 'Implement AI-generated content, add collaborative editing, create mobile app, and integrate with popular video platforms.',
    innovations: 'AI-powered scene detection, intelligent editing algorithms, and automated effect generation.',
    lastUpdated: 'This Week'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
} 