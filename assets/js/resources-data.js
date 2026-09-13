/**
 * Resources hub data — do not invent files.
 * Set todo:false and href when a real file/link is supplied.
 */
window.PORTAL_RESOURCES = [
  {
    id: 'bp-excel',
    title: 'BP Board Strategy — Excel financial models',
    description: 'Financial models supporting asset divestment and IEMS analysis.',
    categories: ['Consulting'],
    type: 'Excel',
    href: null,
    download: true,
    todo: true, // TODO: add resource file under assets/resources/
    related: { label: 'BP case study', href: 'consulting-bp.html' },
  },
  {
    id: 'bp-word',
    title: 'BP Board Strategy — Word appendices',
    description: 'Supporting appendices for the board strategy pack.',
    categories: ['Consulting'],
    type: 'Word',
    href: null,
    download: true,
    todo: true, // TODO: add resource
    related: { label: 'BP case study', href: 'consulting-bp.html' },
  },
  {
    id: 'bp-deck',
    title: 'BP Board Strategy — Presentation deck',
    description: 'Boardroom PowerPoint for the BP strategy case.',
    categories: ['Consulting'],
    type: 'PPT',
    href: null,
    download: true,
    todo: true, // TODO: add resource
    related: { label: 'BP case study', href: 'consulting-bp.html' },
  },
  {
    id: 'vlab-excel',
    title: 'V-Lab — Australia market Excel model',
    description: 'TAM/SAM/SOM and market-entry model for Australia wind VR training.',
    categories: ['Consulting', 'AI'],
    type: 'Excel',
    href: null,
    download: true,
    todo: true, // TODO: add resource
    related: { label: 'V-Lab case study', href: 'consulting-v-lab.html' },
  },
  {
    id: 'vlab-reports',
    title: 'V-Lab — Multi-country market reports',
    description: 'India / China / Australia wind energy VR market entry reports.',
    categories: ['Consulting'],
    type: 'PDF',
    href: null,
    download: true,
    todo: true, // TODO: add resource
    related: { label: 'V-Lab case study', href: 'consulting-v-lab.html' },
  },
  {
    id: 'salud-deck',
    title: 'Salud.ai — Client presentation',
    description: '15-minute consultancy sprint presentation with script.',
    categories: ['Consulting', 'AI'],
    type: 'PPT',
    href: null,
    download: true,
    todo: true, // TODO: add resource
    related: { label: 'Salud.ai case study', href: 'consulting-salud-ai.html' },
  },
  {
    id: 'resume',
    title: 'Resume (PDF)',
    description: 'Latest CV for Applied AI / GenAI Product roles.',
    categories: ['Technical'],
    type: 'PDF',
    href: 'assets/your_resume.pdf',
    download: true,
    todo: true, // TODO: confirm resume path / replace file
    related: { label: 'Contact', href: 'contact.html' },
  },
  {
    id: 'github',
    title: 'GitHub profile',
    description: 'Public repositories and experiments.',
    categories: ['Technical', 'AI'],
    type: 'GitHub',
    href: 'https://github.com/ayushshrivastava1292',
    download: false,
    todo: false,
  },
  {
    id: 'neo-repo',
    title: 'Neo RAG Assistant — source',
    description: 'Flask + FAISS personal RAG assistant codebase.',
    categories: ['AI', 'Technical'],
    type: 'GitHub',
    href: null,
    download: false,
    todo: true, // TODO: add public repo URL
    related: { label: 'Projects', href: 'projects.html' },
  },
  {
    id: 'myagentcore-repo',
    title: 'MyAgentcore — source',
    description: 'Custom agent framework for deploying AI agents.',
    categories: ['AI', 'Technical'],
    type: 'GitHub',
    href: null,
    download: false,
    todo: true, // TODO: add public repo URL
    related: { label: 'Projects', href: 'projects.html' },
  },
];
