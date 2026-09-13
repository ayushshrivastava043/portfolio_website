/**
 * Lazy-load hero / collage videos.
 * Use data-src instead of src; plays when near viewport.
 * On narrow screens, only activates the first N videos.
 */
(function () {
  'use strict';

  var MOBILE_MAX = 2;
  var isNarrow =
    window.matchMedia && window.matchMedia('(max-width: 768px)').matches;

  function activate(video) {
    if (!video || video.dataset.lazyLoaded === '1') return;
    var src = video.getAttribute('data-src');
    if (!src) return;
    video.src = src;
    video.dataset.lazyLoaded = '1';
    video.load();
    var play = video.play();
    if (play && typeof play.catch === 'function') {
      play.catch(function () {});
    }
  }

  function boot() {
    var videos = Array.prototype.slice.call(
      document.querySelectorAll('video[data-src]')
    );
    if (!videos.length) return;

    if (isNarrow) {
      videos.forEach(function (v, i) {
        if (i >= MOBILE_MAX) {
          v.setAttribute('hidden', '');
          v.removeAttribute('data-src');
        }
      });
      videos = videos.filter(function (v, i) {
        return i < MOBILE_MAX;
      });
    }

    if (!('IntersectionObserver' in window)) {
      videos.forEach(activate);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          activate(entry.target);
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    videos.forEach(function (v) {
      v.setAttribute('preload', 'none');
      io.observe(v);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
