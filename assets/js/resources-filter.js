/**
 * Client-side filter/search for resources.html
 * Supports ?q=&cat=&type=&avail= URL deep-links.
 */
(function () {
  'use strict';

  var resources = window.PORTAL_RESOURCES || [];
  var state = { q: '', category: 'All', type: 'All', avail: 'All' };
  var cats = ['All', 'AI', 'Consulting', 'Technical'];
  var types = ['All', 'PDF', 'Excel', 'Word', 'GitHub', 'PPT'];
  var avails = [
    { id: 'All', label: 'All' },
    { id: 'Ready', label: 'Ready' },
    { id: 'Pending', label: 'Needs file' },
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isReady(r) {
    return !!(r.href && !r.todo);
  }

  function readUrl() {
    var p = new URLSearchParams(window.location.search);
    var q = (p.get('q') || '').trim();
    var cat = p.get('cat') || 'All';
    var type = p.get('type') || 'All';
    var avail = p.get('avail') || 'All';
    if (cats.indexOf(cat) === -1) cat = 'All';
    if (types.indexOf(type) === -1) type = 'All';
    if (!avails.some(function (a) { return a.id === avail; })) avail = 'All';
    state.q = q;
    state.category = cat;
    state.type = type;
    state.avail = avail;
  }

  function writeUrl() {
    var p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.category !== 'All') p.set('cat', state.category);
    if (state.type !== 'All') p.set('type', state.type);
    if (state.avail !== 'All') p.set('avail', state.avail);
    var qs = p.toString();
    var next = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', next);
    }
  }

  function hasActiveFilters() {
    return !!(state.q || state.category !== 'All' || state.type !== 'All' || state.avail !== 'All');
  }

  function countFor(kind, value) {
    return resources.filter(function (r) {
      if (kind === 'category') {
        return value === 'All' || (r.categories && r.categories.indexOf(value) !== -1);
      }
      if (kind === 'type') {
        return value === 'All' || r.type === value;
      }
      if (kind === 'avail') {
        if (value === 'All') return true;
        if (value === 'Ready') return isReady(r);
        return !isReady(r);
      }
      return true;
    }).length;
  }

  function chip(label, active, onClick, count) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'resources-chip' + (active ? ' is-active' : '');
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.textContent = typeof count === 'number' ? label + ' (' + count + ')' : label;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderFilters() {
    var catEl = document.getElementById('resource-cat-filters');
    var typeEl = document.getElementById('resource-type-filters');
    var availEl = document.getElementById('resource-avail-filters');
    if (!catEl || !typeEl) return;

    catEl.innerHTML = '';
    typeEl.innerHTML = '';
    cats.forEach(function (c) {
      catEl.appendChild(
        chip(c, state.category === c, function () {
          state.category = c;
          sync();
        }, countFor('category', c))
      );
    });
    types.forEach(function (t) {
      typeEl.appendChild(
        chip(t, state.type === t, function () {
          state.type = t;
          sync();
        }, countFor('type', t))
      );
    });

    if (availEl) {
      availEl.innerHTML = '';
      avails.forEach(function (a) {
        availEl.appendChild(
          chip(a.label, state.avail === a.id, function () {
            state.avail = a.id;
            sync();
          }, countFor('avail', a.id))
        );
      });
    }
  }

  function filtered() {
    var q = state.q.toLowerCase();
    return resources.filter(function (r) {
      var hay = [r.title, r.description, r.type]
        .concat(r.categories || [])
        .join(' ')
        .toLowerCase();
      var matchQ = !q || hay.indexOf(q) !== -1;
      var matchC =
        state.category === 'All' ||
        (r.categories && r.categories.indexOf(state.category) !== -1);
      var matchT = state.type === 'All' || r.type === state.type;
      var matchA =
        state.avail === 'All' ||
        (state.avail === 'Ready' ? isReady(r) : !isReady(r));
      return matchQ && matchC && matchT && matchA;
    });
  }

  function updateMeta(list) {
    var meta = document.getElementById('resources-meta');
    var clearBtn = document.getElementById('resources-clear');
    if (meta) {
      var total = resources.length;
      var n = list.length;
      var readyN = resources.filter(isReady).length;
      meta.textContent =
        n === total
          ? 'Showing ' + n + ' resources · ' + readyN + ' ready'
          : 'Showing ' + n + ' of ' + total + ' · ' + readyN + ' ready';
    }
    if (clearBtn) {
      clearBtn.hidden = !hasActiveFilters();
    }
  }

  function clearFilters() {
    state.q = '';
    state.category = 'All';
    state.type = 'All';
    state.avail = 'All';
    var search = document.getElementById('resource-search');
    if (search) search.value = '';
    sync();
  }

  function renderGrid() {
    var grid = document.getElementById('resources-grid');
    var empty = document.getElementById('resources-empty');
    if (!grid) return;
    var list = filtered();
    grid.innerHTML = '';
    updateMeta(list);

    if (empty) {
      empty.hidden = list.length > 0;
    }

    list.forEach(function (r, i) {
      var card = document.createElement('article');
      card.className = 'ui-card dashboard-card resources-card';
      card.style.animationDelay = Math.min(i, 8) * 0.05 + 's';
      card.setAttribute('data-resource-id', r.id || '');

      var tags = (r.categories || [])
        .concat([r.type])
        .map(function (t) {
          return '<span class="skill-tag">' + esc(t) + '</span>';
        })
        .join('');

      var related = '';
      if (r.related && r.related.href) {
        related =
          '<a class="resources-related" href="' +
          esc(r.related.href) +
          '">' +
          esc(r.related.label || 'Related') +
          ' →</a>';
      }

      var action = '';
      if (isReady(r)) {
        action =
          '<a class="btn-ui btn-ui--primary" href="' +
          esc(r.href) +
          '" target="_blank" rel="noopener noreferrer">' +
          (r.download ? 'Download' : 'Open') +
          '</a>';
      } else if (r.href && r.todo) {
        action =
          '<p class="resources-todo"><!-- TODO: confirm file -->Path set — pending confirm before marking ready</p>';
      } else {
        action =
          '<p class="resources-todo"><!-- TODO: add resource -->File or link not uploaded yet</p>';
      }

      var statusBadge = isReady(r)
        ? '<span class="resources-ready">Ready</span>'
        : '<span class="resources-needs">Needs file</span>';

      card.innerHTML =
        '<div class="resources-card__top">' +
        '<span class="resources-type-icon">' +
        esc(r.type || '?') +
        '</span>' +
        statusBadge +
        '</div>' +
        '<h2 class="dashboard-item__title">' +
        esc(r.title) +
        '</h2>' +
        '<p class="dashboard-item__desc">' +
        esc(r.description) +
        '</p>' +
        '<div class="skill-tags" style="margin-top:0.75rem">' +
        tags +
        '</div>' +
        (related ? '<div class="resources-card__related">' + related + '</div>' : '') +
        '<div class="resources-card__action">' +
        action +
        '</div>';

      grid.appendChild(card);
    });
  }

  function sync() {
    writeUrl();
    renderFilters();
    renderGrid();
  }

  function boot() {
    readUrl();
    var search = document.getElementById('resource-search');
    if (search) {
      search.value = state.q;
      search.addEventListener('input', function () {
        state.q = search.value.trim();
        writeUrl();
        renderGrid();
      });
    }

    var clearBtn = document.getElementById('resources-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearFilters);
    }

    var emptyClear = document.getElementById('resources-empty-clear');
    if (emptyClear) {
      emptyClear.addEventListener('click', clearFilters);
    }

    renderFilters();
    renderGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
