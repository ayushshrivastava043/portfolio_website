/**
 * Portfolio Chatbot Brain — single source of truth for answers.
 * Loads knowledge_base.json and routes by intent (not fragile one-off regex).
 */
(function () {
    'use strict';

    const INTENTS = [
        {
            id: 'greeting',
            score(msg) {
                if (/^(hi|hey|hello|hola|yo|sup|wassup|howdy)[!.?\s]*$/i.test(msg)) return 10;
                if (/what'?s up|good (morning|afternoon|evening)/i.test(msg)) return 9;
                return 0;
            },
        },
        {
            id: 'what_does_do',
            score(msg) {
                if (/what (does|do) (ayush|he) do|does ayush do|his (job|work|role)/i.test(msg)) return 10;
                if (/ayush/.test(msg) && /do|work|build|role/.test(msg)) return 7;
                return 0;
            },
        },
        {
            id: 'skills',
            score(msg) {
                if (/skill|tech stack|technologies|expertise|what (can|does) he know/i.test(msg)) return 10;
                return 0;
            },
        },
        {
            id: 'projects',
            score(msg) {
                if (/project|built|portfolio|what has (he|ayush)|showcase|demo/i.test(msg)) return 10;
                if (/chatbot|workflow|avatar|portal|agentic/i.test(msg)) return 6;
                return 0;
            },
        },
        {
            id: 'consulting',
            score(msg) {
                if (/salud|durham|mba|consulting|v-lab|vlab|bp board|strategy case/.test(msg)) return 10;
                return 0;
            },
        },
        {
            id: 'experience',
            score(msg) {
                if (/experience|career|background|resume|cv|work history|job/i.test(msg)) return 10;
                return 0;
            },
        },
        {
            id: 'contact',
            score(msg) {
                if (/contact|email|linkedin|reach|hire|available|connect with/i.test(msg)) return 10;
                return 0;
            },
        },
        {
            id: 'about',
            score(msg) {
                if (/who is ayush|about ayush|tell me about|what can you tell|introduce/i.test(msg)) return 10;
                if (/ayush/.test(msg)) return 5;
                return 0;
            },
        },
    ];

    function pickIntent(message) {
        const msg = String(message || '').trim();
        let best = { id: 'general', score: 0 };
        for (const intent of INTENTS) {
            const s = intent.score(msg);
            if (s > best.score) best = { id: intent.id, score: s };
        }
        return best.id;
    }

    function aboutBlock(kb) {
        const about = kb.about_ayush || {};
        const projects = kb.projects || [];
        const name = about.name || 'Ayush Shrivastava';
        const profession = about.profession || 'AI Product Manager & GenAI Strategist';
        const bio = about.bio || '';
        const highlights = projects.slice(0, 3).map(p => p.name).filter(Boolean).join(', ');
        let text = `${name} is an ${profession}. ${bio}`.trim();
        if (highlights) text += ` Notable work includes ${highlights}.`;
        return text;
    }

    function whatDoesDo(kb) {
        const about = kb.about_ayush || {};
        const projects = kb.projects || [];
        const name = about.name || 'Ayush Shrivastava';
        const profession = about.profession || 'AI Product Manager & GenAI Strategist';
        const bio = about.bio || '';
        const builds = projects.slice(0, 3).map(p => p.name).filter(Boolean).join(', ');
        let text = `${name} is an ${profession}. ${bio}`.trim();
        if (builds) text += ` He builds products like ${builds}.`;
        return text;
    }

    function skillsAnswer(kb) {
        const s = kb.skills;
        if (s && !Array.isArray(s) && typeof s === 'object') {
            return Object.entries(s)
                .map(([cat, items]) => `${cat.replace(/_/g, ' ')}: ${(items || []).join(', ')}`)
                .join(' | ');
        }
        const skills = Array.isArray(s) ? s : [];
        return skills.length
            ? `Ayush's key skills include ${skills.join(', ')}.`
            : 'Ayush works across AI product management, GenAI, Python, and workflow automation.';
    }

    function projectsAnswer(kb) {
        const projects = kb.projects || [];
        if (!projects.length) {
            return 'Ayush has built agentic chatbots, visual workflow tools, and AI portal integrations.';
        }
        return projects
            .map(p => (p.description ? `${p.name} — ${p.description}` : p.name))
            .join(' | ');
    }

    function experienceAnswer(kb) {
        const exp = kb.experience || [];
        if (exp.length) {
            return exp.slice(0, 3).map(e =>
                `${e.company} — ${e.role}: ${(e.highlights || []).slice(0, 2).join('; ')}`
            ).join(' | ');
        }
        return aboutBlock(kb);
    }

    function contactAnswer(kb) {
        const c = kb.contact || {};
        const parts = [];
        if (c.email) parts.push(`Email: ${c.email}`);
        if (c.linkedin) parts.push(`LinkedIn: ${c.linkedin}`);
        if (c.github) parts.push(`GitHub: ${c.github}`);
        if (parts.length) {
            return `You can reach Ayush here — ${parts.join('. ')}.`;
        }
        return "Check the Contact section on this portfolio page, or connect via LinkedIn.";
    }

    function faqMatch(message, kb) {
        const msg = message.toLowerCase();
        for (const faq of kb.faqs || []) {
            const keys = faq.keywords || [];
            if (keys.some(k => msg.includes(String(k).toLowerCase()))) {
                return faq.answer;
            }
        }
        return null;
    }

    function buildAnswer(intent, kb, message) {
        const faq = faqMatch(message, kb);
        if (faq) return faq;

        switch (intent) {
            case 'greeting':
                return (kb.templates && kb.templates.greeting) ||
                    "Hey! I'm Ayush's AI assistant. Ask about his projects, skills, experience, or how to contact him.";
            case 'what_does_do':
                return whatDoesDo(kb);
            case 'skills':
                return skillsAnswer(kb);
            case 'projects':
                return projectsAnswer(kb);
            case 'consulting':
                return (kb.consulting || []).map(c => `${c.name}: ${c.summary}`).join(' | ') ||
                    'Durham MBA consulting: Salud.ai, BP board strategy, V-Lab advisory.';
            case 'experience':
                return experienceAnswer(kb);
            case 'contact':
                return contactAnswer(kb);
            case 'about':
                return aboutBlock(kb);
            default:
                return (kb.templates && kb.templates.fallback) ||
                    "I'm Ayush's portfolio assistant. Try asking: What does Ayush do? What are his skills? What projects has he built?";
        }
    }

    window.ChatbotBrain = {
        pickIntent,
        answer(message, kb) {
            const intent = pickIntent(message);
            const text = buildAnswer(intent, kb, message);
            return { intent, text, fromApi: false };
        },
        isPortfolioIntent(message) {
            return pickIntent(message) !== 'general';
        },
    };
})();
