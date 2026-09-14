/**
 * Agentic Portfolio Brain — retrieve → tool-route → compose.
 * Grounded only on knowledge_base.json (never invents facts).
 * The public Render API currently has a STALE KB — do not trust it unless
 * grounded context is sent and validated.
 */
(function () {
  'use strict';

  var STOP = {
    a: 1, an: 1, the: 1, is: 1, are: 1, was: 1, were: 1, be: 1, been: 1,
    to: 1, of: 1, in: 1, on: 1, for: 1, and: 1, or: 1, at: 1, by: 1, with: 1,
    from: 1, as: 1, it: 1, this: 1, that: 1, his: 1, her: 1, he: 1, she: 1,
    do: 1, does: 1, did: 1, what: 1, who: 1, how: 1, when: 1, where: 1, why: 1,
    can: 1, you: 1, me: 1, my: 1, your: 1, about: 1, tell: 1, please: 1,
  };

  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .replace(/[^a-z0-9+#.\-\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function tokens(s) {
    return norm(s)
      .split(' ')
      .filter(function (t) {
        return t.length > 1 && !STOP[t];
      });
  }

  function unique(arr) {
    var seen = {};
    return arr.filter(function (x) {
      if (seen[x]) return false;
      seen[x] = 1;
      return true;
    });
  }

  /** Detect portfolio entities for tool routing */
  function detectEntities(msg) {
    var m = norm(msg);
    var hits = [];
    var map = [
      ['verifast', /verifast|flash.?sale|grounding|600\+?|e-?commerce clients/],
      ['cgi', /\bcgi\b|bell canada|genai pilot|telecom/],
      ['dkpr', /dkpr|e-?learn|elearn/],
      ['salud', /salud|health app|freemium health/],
      ['bp', /\bbp\b|board strategy|divestment|iems|lightsource|geopolitical/],
      ['vlab', /v-?lab|vlab|wind|vr training|tam|sam|som/],
      ['durham', /durham|mba|business school/],
      ['neo', /\bneo\b|rag assistant/],
      ['finbot', /finbot|bharatgpt|investment chat/],
      ['agentcore', /agentcore|bedrock|langgraph|myagentcore/],
      ['agentforce', /agentforce|salesforce|data cloud|\bdmo/],
      ['video', /video|minimax|midjourney|shotcut|youtube/],
      ['skills', /skill|tech stack|technologies|expertise|tools|safe agile|python|programming|languages?/],
      ['contact', /contact|email|linkedin|github|hire|available|open to|reach/],
      ['projects', /project|built|portfolio builds|technical projects/],
      ['experience', /experience|career|background|resume|cv|work history|years/],
      ['location', /where|based|location|durham|uk|live|living/],
      ['rag', /\brag\b|faiss|retrieval|semantic retrieval/],
      [
        'about',
        /what (does|do) (ayush|he)|who is ayush|tell me about ayush|introduce|his (job|role|work)|what is ayush/,
      ],
    ];
    map.forEach(function (pair) {
      if (pair[1].test(m)) hits.push(pair[0]);
    });
    if (/\bayush\b/.test(m) && hits.length === 0) hits.push('about');
    if (/\bagentic\b/.test(m) && hits.indexOf('verifast') === -1) hits.push('verifast');
    return unique(hits);
  }

  function buildChunks(kb) {
    var chunks = [];
    var about = kb.about_ayush || {};
    chunks.push({
      id: 'about',
      type: 'profile',
      text:
        (about.name || 'Ayush Shrivastava') +
        ' — ' +
        (about.profession || '') +
        '. ' +
        (about.bio || '') +
        ' Location: ' +
        (about.location || '') +
        '. Education: ' +
        (about.education || '') +
        '.',
      tags: ['ayush', 'about', 'who', 'profile', 'mba', 'durham', 'product manager'],
    });

    (kb.experience || []).forEach(function (e, i) {
      chunks.push({
        id: 'exp-' + i,
        type: 'experience',
        text:
          e.company +
          ' — ' +
          e.role +
          (e.period ? ' (' + e.period + ')' : '') +
          '. ' +
          (e.highlights || []).join(' '),
        tags: tokens(e.company + ' ' + e.role + ' ' + (e.highlights || []).join(' ')),
      });
    });

    (kb.consulting || []).forEach(function (c, i) {
      chunks.push({
        id: 'con-' + i,
        type: 'consulting',
        text: c.name + ': ' + c.summary,
        tags: tokens(c.name + ' ' + c.summary),
      });
    });

    (kb.projects || []).forEach(function (p, i) {
      chunks.push({
        id: 'proj-' + i,
        type: 'project',
        text:
          p.name +
          ' — ' +
          (p.description || '') +
          ' Tech: ' +
          ((p.tech || []).join(', ') || 'n/a'),
        tags: tokens(p.name + ' ' + (p.description || '') + ' ' + ((p.tech || []).join(' ') || '')),
      });
    });

    var skills = kb.skills;
    if (skills && typeof skills === 'object' && !Array.isArray(skills)) {
      var skillText = Object.keys(skills)
        .map(function (k) {
          return k.replace(/_/g, ' ') + ': ' + (skills[k] || []).join(', ');
        })
        .join('. ');
      chunks.push({
        id: 'skills',
        type: 'skills',
        text: 'Skills — ' + skillText,
        tags: tokens(skillText + ' skills tech stack expertise'),
      });
    }

    var contact = kb.contact || {};
    chunks.push({
      id: 'contact',
      type: 'contact',
      text:
        'Contact — Email: ' +
        (contact.email || '') +
        '. LinkedIn: ' +
        (contact.linkedin || '') +
        '. GitHub: ' +
        (contact.github || '') +
        '.',
      tags: ['contact', 'email', 'linkedin', 'github', 'hire', 'connect'],
    });

    (kb.faqs || []).forEach(function (f, i) {
      chunks.push({
        id: 'faq-' + i,
        type: 'faq',
        text: f.answer,
        tags: (f.keywords || []).map(norm),
        keywords: f.keywords || [],
      });
    });

    return chunks;
  }

  function scoreChunk(chunk, queryTokens, entities, msg) {
    var score = 0;
    var hay = norm(chunk.text + ' ' + (chunk.tags || []).join(' '));
    var tagSet = {};
    (chunk.tags || []).forEach(function (t) {
      tagSet[norm(t)] = 1;
    });

    queryTokens.forEach(function (t) {
      if (tagSet[t]) score += 4;
      else if (hay.indexOf(t) !== -1) score += 2;
    });

    // Entity boosts
    var entityBoost = {
      verifast: /verifast|flash|grounding|e-commerce/,
      cgi: /cgi|bell canada|genai pilot/,
      dkpr: /dkpr|e-learn/,
      salud: /salud|health app/,
      bp: /\bbp\b|divestment|iems|board strategy/,
      vlab: /v-lab|vlab|wind|vr training|tam/,
      durham: /durham|mba/,
      neo: /\bneo\b|rag assistant|faiss/,
      finbot: /finbot|bharatgpt/,
      agentcore: /agentcore|bedrock|langgraph|myagentcore/,
      agentforce: /agentforce|salesforce|data cloud/,
      video: /video|minimax|midjourney|shotcut/,
      skills: /skills —|langgraph|safe agile/,
      contact: /contact —|email:|linkedin:/,
      projects: /neo —|finbot —|myagentcore|agentforce/,
      experience: /verifast|cgi inc|dkpr/,
      about: /product manager|durham university|bridges technical|about_ayush|ayush shrivastava —/,
      location: /durham, uk|based in durham/,
      rag: /rag|faiss|retrieval/,
    };

    entities.forEach(function (ent) {
      var re = entityBoost[ent];
      if (re && re.test(hay)) score += 12;
      if (chunk.type === 'faq' && (chunk.keywords || []).some(function (k) {
        return norm(k).indexOf(ent) !== -1 || ent.indexOf(norm(k)) !== -1;
      })) {
        score += 8;
      }
    });

    // FAQ keyword density (prefer specific multi-hit FAQs)
    if (chunk.type === 'faq' && chunk.keywords) {
      var hits = 0;
      var weight = 0;
      chunk.keywords.forEach(function (k) {
        var kk = norm(k);
        if (kk && msg.indexOf(kk) !== -1) {
          hits += 1;
          weight += Math.min(kk.length, 14);
        }
      });
      if (hits) score += hits * 6 + weight;
      // Penalize ultra-generic single-keyword FAQs unless they clearly hit
      if (hits === 1 && chunk.keywords.length <= 2) score -= 2;
    }

    // Type affinity
    if (entities.indexOf('skills') >= 0 && chunk.type === 'skills') score += 10;
    if (entities.indexOf('contact') >= 0 && chunk.type === 'contact') score += 10;
    if (entities.indexOf('about') >= 0 && chunk.type === 'profile') score += 14;
    if (
      (entities.indexOf('projects') >= 0 || entities.indexOf('neo') >= 0) &&
      chunk.type === 'project'
    ) {
      score += 6;
    }
    if (
      (entities.indexOf('experience') >= 0 ||
        entities.indexOf('verifast') >= 0 ||
        entities.indexOf('cgi') >= 0) &&
      chunk.type === 'experience'
    ) {
      score += 6;
    }
    if (
      (entities.indexOf('salud') >= 0 ||
        entities.indexOf('bp') >= 0 ||
        entities.indexOf('vlab') >= 0 ||
        entities.indexOf('durham') >= 0) &&
      chunk.type === 'consulting'
    ) {
      score += 6;
    }

    return score;
  }

  function retrieve(kb, message, limit) {
    var msg = norm(message);
    var qTokens = unique(tokens(message));
    var entities = detectEntities(message);
    var chunks = buildChunks(kb);
    var ranked = chunks
      .map(function (c) {
        return { chunk: c, score: scoreChunk(c, qTokens, entities, msg) };
      })
      .filter(function (x) {
        return x.score > 0;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });

    return {
      entities: entities,
      hits: ranked.slice(0, limit || 4),
      topScore: ranked.length ? ranked[0].score : 0,
    };
  }

  function isGreeting(message) {
    return /^(hi|hey|hello|hola|yo|sup|wassup|howdy)[!.?\s]*$/i.test(String(message || '').trim()) ||
      /^(good (morning|afternoon|evening)|what'?s up)[!.?\s]*$/i.test(String(message || '').trim());
  }

  function compose(message, kb, retrieval) {
    var trace = [];
    var templates = kb.templates || {};

    if (isGreeting(message)) {
      trace.push({ tool: 'greet', status: 'ok' });
      return {
        intent: 'greeting',
        text:
          templates.greeting ||
          "Hey! I'm Ayush's AI assistant. Ask about Verifast, CGI, Durham MBA consulting, or technical projects.",
        confidence: 1,
        trace: trace,
        fromApi: false,
      };
    }

    trace.push({
      tool: 'retrieve_kb',
      status: 'ok',
      entities: retrieval.entities,
      topScore: retrieval.topScore,
      docs: retrieval.hits.map(function (h) {
        return h.chunk.id + '(' + h.score + ')';
      }),
    });

    if (!retrieval.hits.length || retrieval.topScore < 6) {
      trace.push({ tool: 'compose', status: 'low_confidence' });
      return {
        intent: 'general',
        text:
          templates.fallback ||
          "I can answer from Ayush's portfolio knowledge — try: Verifast experience, CGI GenAI pilot, Durham MBA / Salud / BP / V-Lab, Neo RAG, skills, or contact.",
        confidence: 0.2,
        trace: trace,
        fromApi: false,
      };
    }

    // Prefer a strong FAQ answer if it clearly wins
    var top = retrieval.hits[0];
    if (top.chunk.type === 'faq' && top.score >= 14) {
      trace.push({ tool: 'faq_answer', status: 'ok', id: top.chunk.id });
      return {
        intent: 'faq',
        text: top.chunk.text,
        confidence: Math.min(0.98, 0.55 + top.score / 40),
        trace: trace,
        fromApi: false,
      };
    }

    // Profile / "what does Ayush do" — lead with about, then top experience
    if (retrieval.entities.indexOf('about') >= 0) {
      var aboutHit = retrieval.hits.filter(function (h) {
        return h.chunk.type === 'profile';
      })[0];
      var expBits = retrieval.hits
        .filter(function (h) {
          return h.chunk.type === 'experience';
        })
        .slice(0, 2)
        .map(function (h) {
          return h.chunk.text;
        });
      var aboutText = aboutHit ? aboutHit.chunk.text : '';
      if (!aboutText) {
        var a = kb.about_ayush || {};
        aboutText =
          (a.name || 'Ayush Shrivastava') +
          ' — ' +
          (a.profession || '') +
          '. ' +
          (a.bio || '');
      }
      var composed = aboutText;
      if (expBits.length) composed += ' Recent work: ' + expBits.join(' ');
      if (composed.length > 900) composed = composed.slice(0, 880).replace(/\s+\S*$/, '') + '…';
      trace.push({ tool: 'profile_answer', status: 'ok' });
      return {
        intent: 'about',
        text: composed,
        confidence: 0.92,
        trace: trace,
        fromApi: false,
        context: composed,
      };
    }

    // Compose from top chunks (dedupe by type preference)
    var parts = [];
    var seenType = {};
    retrieval.hits.forEach(function (h) {
      if (h.score < 6) return;
      // Avoid dumping every FAQ; one FAQ max unless it's the best
      if (h.chunk.type === 'faq' && parts.length && h !== top) return;
      if (seenType[h.chunk.type] && h.chunk.type !== 'experience' && h.chunk.type !== 'project' && h.chunk.type !== 'consulting') {
        return;
      }
      if (h.chunk.type === 'experience' || h.chunk.type === 'project' || h.chunk.type === 'consulting') {
        // allow multiple
      } else {
        seenType[h.chunk.type] = 1;
      }
      parts.push(h.chunk.text);
    });

    // Cap length for speech bubble UX
    var text = parts.slice(0, 3).join(' ');
    if (text.length > 900) text = text.slice(0, 880).replace(/\s+\S*$/, '') + '…';

    trace.push({ tool: 'compose_grounded', status: 'ok', parts: parts.length });
    return {
      intent: retrieval.entities[0] || top.chunk.type || 'retrieved',
      text: text,
      confidence: Math.min(0.95, 0.45 + retrieval.topScore / 35),
      trace: trace,
      fromApi: false,
      context: parts.join('\n'),
    };
  }

  function resolveKb(kb) {
    if (kb && kb.about_ayush && (kb.experience || kb.faqs)) return kb;
    if (typeof window !== 'undefined' && window.PORTFOLIO_KB && window.PORTFOLIO_KB.about_ayush) {
      return window.PORTFOLIO_KB;
    }
    return kb || {};
  }

  function answer(message, kb) {
    kb = resolveKb(kb);
    var retrieval = retrieve(kb, message, 5);
    return compose(message, kb, retrieval);
  }

  /**
   * Local-only agentic answer. API polish disabled by default because the
   * public Render service has served stale/wrong portfolio facts.
   */
  async function answerAsync(message, kb, opts) {
    opts = opts || {};
    var local = answer(message, kb);
    // Never call external API unless explicitly forced AND local confidence is low
    // AND caller passes allowStaleRisk (kept off in production config).
    if (!opts.useApi || !opts.apiUrl || !opts.allowStaleRisk || local.confidence >= 0.55) {
      return local;
    }
    return local;
  }

  window.ChatbotBrain = {
    detectEntities: detectEntities,
    retrieve: retrieve,
    answer: answer,
    answerAsync: answerAsync,
    pickIntent: function (message) {
      return answer(message, {}).intent;
    },
    isPortfolioIntent: function (message) {
      return detectEntities(message).length > 0 || isGreeting(message);
    },
  };
})();
