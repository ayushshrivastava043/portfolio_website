/**
 * Portal motion — Intersection Observer reveals.
 * Auto-marks common portal elements; respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  var REDUCE =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var SELECTORS = [
    '.hero-text > *',
    '.home-highlights .ui-card',
    '.portal-page .section-title',
    '.portal-page .section-subtitle',
    '.experience-card',
    '.project-card',
    '.skill-card',
    '.case-study__crumb',
    '.case-study__meta',
    '.case-study__title',
    '.case-study__lede',
    '.case-study__toc',
    '.case-study__section',
    '.case-study__aside',
    '.case-study__actions',
    '.ask-prompts',
    '.ask-context',
    '.ask-chat',
    '.ask-cta',
    '.about-profile',
    '.about-connect',
    '.resources-toolbar',
    '.resources-meta',
  ];

  function mark(el, index) {
    if (!el || el.classList.contains('motion-in')) return;
    el.classList.add('motion-in');
    el.style.setProperty('--motion-delay', Math.min(index, 10) * 0.06 + 's');
  }

  function collect() {
    var list = [];
    SELECTORS.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        list.push(el);
      });
    });
    return list;
  }

  function revealAll(nodes) {
    nodes.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  function observe(nodes) {
    if (!('IntersectionObserver' in window)) {
      revealAll(nodes);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function boot() {
    document.documentElement.classList.add('motion-ready');
    var nodes = collect();
    nodes.forEach(mark);

    if (REDUCE) {
      revealAll(nodes);
      return;
    }

    /* Hero children: start visible cascade immediately */
    var heroKids = document.querySelectorAll('.hero-text > .motion-in');
    if (heroKids.length) {
      requestAnimationFrame(function () {
        heroKids.forEach(function (el) {
          el.classList.add('is-visible');
        });
      });
    }

    var rest = [];
    nodes.forEach(function (el) {
      if (!el.closest || !el.closest('.hero-text')) rest.push(el);
    });
    observe(rest.length ? rest : nodes);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
