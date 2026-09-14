/**
 * Full-page Ask AI — uses ChatbotBrain + knowledge_base.json (same as widget).
 * Supports ?q= auto-ask and ?ctx= context banner.
 */
(function () {
  'use strict';

  var messagesEl;
  var form;
  var input;
  var sendBtn;
  var promptsEl;
  var contextEl;
  var busy = false;
  var history = [];
  var kb = null;

  function append(role, text) {
    var div = document.createElement('div');
    div.className = 'ask-msg ask-msg--' + role;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function getParam(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || '';
    } catch (e) {
      return '';
    }
  }

  function setQueryParam(q) {
    try {
      var p = new URLSearchParams(window.location.search);
      if (q) p.set('q', q);
      else p.delete('q');
      var qs = p.toString();
      var next = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', next);
      }
    } catch (e) {
      /* ignore */
    }
  }

  function setBusy(on) {
    busy = on;
    if (input) input.disabled = on;
    if (sendBtn) {
      sendBtn.disabled = on;
      sendBtn.textContent = on ? '…' : 'Send';
    }
    if (promptsEl) {
      promptsEl.querySelectorAll('button').forEach(function (b) {
        b.disabled = on;
      });
    }
  }

  function loadKb() {
    if (window.PORTFOLIO_KB && window.PORTFOLIO_KB.about_ayush) {
      return Promise.resolve(window.PORTFOLIO_KB);
    }
    var url =
      (window.CHATBOT_CONFIG && window.CHATBOT_CONFIG.knowledgeBaseUrl) ||
      'assets/data/knowledge_base.json?v=103';
    return fetch(url)
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .catch(function () {
        return window.PORTFOLIO_KB || null;
      });
  }

  async function replyTo(text) {
    if (!kb) kb = await loadKb();

    if (window.ChatbotBrain && kb) {
      if (typeof window.ChatbotBrain.answerAsync === 'function') {
        var result = await window.ChatbotBrain.answerAsync(text, kb, {
          useApi: !!(
            window.CHATBOT_CONFIG &&
            (window.CHATBOT_CONFIG.useApiForChat === true ||
              window.CHATBOT_CONFIG.allowGroundedApiPolish === true)
          ),
          apiUrl:
            (window.CHATBOT_CONFIG && window.CHATBOT_CONFIG.apiUrl) ||
            'https://portfolio-chatbot-api-slev.onrender.com/chat',
          history: history,
        });
        console.log('⚡ Brain:', result.intent, result.confidence, result.trace);
        return result.text;
      }
      var sync = window.ChatbotBrain.answer(text, kb);
      if (sync && sync.text) {
        console.log('⚡ Brain intent:', sync.intent);
        return sync.text;
      }
    }

    return (
      (kb && kb.templates && kb.templates.fallback) ||
      'Try: What does Ayush do? | Verifast experience | Durham MBA | Skills & tools'
    );
  }

  async function send(text, opts) {
    var content = String(text || '').trim();
    if (!content || busy) return;
    opts = opts || {};

    append('user', content);
    history.push({ role: 'user', content: content });
    input.value = '';
    setBusy(true);
    if (opts.updateUrl !== false) setQueryParam(content);

    var thinking = append('assistant', 'Thinking…');
    thinking.classList.add('ask-msg--thinking');

    var answer = await replyTo(content);
    thinking.remove();
    append('assistant', answer);
    history.push({ role: 'assistant', content: answer });
    setBusy(false);
    input.focus();
  }

  function wirePrompts() {
    if (!promptsEl) return;
    promptsEl.querySelectorAll('[data-ask-prompt]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var q = btn.getAttribute('data-ask-prompt') || btn.textContent;
        send(q);
      });
    });
  }

  function showContext(ctx) {
    if (!contextEl || !ctx) return;
    contextEl.hidden = false;
    contextEl.querySelector('[data-ask-ctx-label]').textContent = ctx;
  }

  function boot() {
    messagesEl = document.getElementById('ask-messages');
    form = document.getElementById('ask-form');
    input = document.getElementById('ask-input');
    sendBtn = document.getElementById('ask-send');
    promptsEl = document.getElementById('ask-prompts');
    contextEl = document.getElementById('ask-context');
    if (!messagesEl || !form || !input) return;

    var ctx = getParam('ctx').trim();
    var q = getParam('q').trim();

    if (ctx) showContext(ctx);

    if (!q) {
      append(
        'assistant',
        "Hey — ask about Verifast, CGI, Durham MBA consulting, or technical projects. Or tap a suggestion below."
      );
    } else {
      append('assistant', 'Answering your question…');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      send(input.value);
    });

    wirePrompts();
    loadKb().then(function (data) {
      kb = data;
    });

    if (q) {
      input.value = q;
      send(q, { updateUrl: false });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
