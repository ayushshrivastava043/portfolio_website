/**
 * Shared site chrome — loads nav + footer partials into placeholders.
 * Usage: <div id="site-nav-root"></div> … <div id="site-footer-root"></div>
 *         <script src="assets/js/site-chrome.js"></script>
 */
(function () {
  'use strict';

  var BASE = (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].src || '';
      if (src.indexOf('site-chrome.js') !== -1) {
        return src.replace(/assets\/js\/site-chrome\.js.*$/, '');
      }
    }
    return '';
  })();

  function resolve(path) {
    return BASE + path;
  }

  function markActive(root) {
    var page = (document.body.getAttribute('data-page') || '').toLowerCase();
    if (!page) return;
    root.querySelectorAll('[data-nav]').forEach(function (link) {
      if (link.getAttribute('data-nav') === page) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  function wireNav(root) {
    var toggle = root.querySelector('.site-nav__toggle');
    var menu = root.querySelector('#site-nav-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  function inject(id, html) {
    var el = document.getElementById(id);
    if (!el) return null;
    el.outerHTML = html;
    return document.querySelector('[data-chrome="' + (id.indexOf('nav') >= 0 ? 'nav' : 'footer') + '"]') ||
      document.querySelector('.' + (id.indexOf('nav') >= 0 ? 'site-nav' : 'site-footer'));
  }

  function loadPartial(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Failed to load ' + url);
      return res.text();
    });
  }

  function wireTheme(root) {
    var btn = root.querySelector('#site-theme-toggle') || document.getElementById('site-theme-toggle');
    function apply(theme) {
      var light = theme === 'light';
      document.documentElement.classList.toggle('theme-light', light);
      document.body.classList.toggle('theme-light', light);
      try {
        window.localStorage.setItem('portal-theme', light ? 'light' : 'dark');
      } catch (e) { /* ignore */ }
      if (btn) btn.textContent = light ? 'Dark' : 'Light';
    }

    var stored = null;
    try {
      stored = window.localStorage.getItem('portal-theme');
    } catch (e) { /* ignore */ }
    apply(stored === 'light' ? 'light' : 'dark');

    if (btn && !btn._themeWired) {
      btn._themeWired = true;
      btn.addEventListener('click', function () {
        var next = document.documentElement.classList.contains('theme-light')
          ? 'dark'
          : 'light';
        apply(next);
      });
    }
  }

  function boot() {
    Promise.all([
      loadPartial(resolve('partials/nav.html')),
      loadPartial(resolve('partials/footer.html')),
    ])
      .then(function (parts) {
        var navHtml = parts[0];
        var footerHtml = parts[1];

        var navRoot = document.getElementById('site-nav-root');
        var footerRoot = document.getElementById('site-footer-root');

        if (navRoot) {
          navRoot.outerHTML = navHtml;
          var nav = document.querySelector('.site-nav');
          if (nav) {
            markActive(nav);
            wireNav(nav);
            wireTheme(nav);
          }
        } else {
          wireTheme(document);
        }
        if (footerRoot) {
          footerRoot.outerHTML = footerHtml;
          var year = document.querySelector('[data-year]');
          if (year) year.textContent = String(new Date().getFullYear());
        }

        document.dispatchEvent(new CustomEvent('site-chrome:ready'));
      })
      .catch(function (err) {
        console.error('[site-chrome]', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
