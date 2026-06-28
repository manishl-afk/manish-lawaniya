// Manishkumar Lawaniya — Personal Brand Site — shared behaviour

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('is-open'); });
    });
  }

  /* Mark active nav link */
  var here = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) {
      a.classList.add('is-active');
    }
  });

  /* Scroll-reveal + audit-trail + counters, all via one observer */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var revealTargets = document.querySelectorAll('.reveal, .audit-trail, [data-counter]');
  if (prefersReducedMotion) {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
      if (el.hasAttribute('data-counter')) animateCounter(el, true);
    });
  } else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (entry.target.hasAttribute('data-counter')) animateCounter(entry.target, false);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  function animateCounter(el, instant) {
    var target = parseFloat(el.getAttribute('data-counter'));
    var suffix = el.getAttribute('data-suffix') || '';
    var numEl = el.querySelector('.stat-num') || el;
    if (instant) { numEl.textContent = target + suffix; return; }
    var duration = 900;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = Math.floor(progress * target);
      numEl.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else numEl.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* Contact form -> mailto fallback (static site, no backend) */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = data.get('name') || '';
      var email = data.get('email') || '';
      var company = data.get('company') || '';
      var purpose = data.get('purpose') || 'General Inquiry';
      var message = data.get('message') || '';

      var subject = encodeURIComponent('[Website] ' + purpose + ' — ' + name);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Company: ' + company + '\n' +
        'Purpose: ' + purpose + '\n\n' +
        'Message:\n' + message
      );
      window.location.href = 'mailto:manish.l@superrecords.com.au?subject=' + subject + '&body=' + body;

      var note = document.getElementById('form-note');
      if (note) {
        note.textContent = 'Opening your email client to send this — if nothing happens, email manish.l@superrecords.com.au directly.';
        note.style.display = 'block';
      }
    });
  }

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Blog: search + category filter */
  var postGrid = document.getElementById('post-grid');
  if (postGrid) {
    var posts = Array.prototype.slice.call(postGrid.querySelectorAll('.post-card'));
    var searchInput = document.getElementById('blog-search');
    var pills = document.querySelectorAll('.filter-pill');
    var noResults = document.getElementById('no-results');
    var activeFilter = 'all';

    function applyFilters() {
      var query = (searchInput && searchInput.value || '').trim().toLowerCase();
      var visibleCount = 0;
      posts.forEach(function (post) {
        var matchesCategory = activeFilter === 'all' || post.getAttribute('data-category') === activeFilter;
        var matchesSearch = !query || post.textContent.toLowerCase().indexOf(query) !== -1;
        var show = matchesCategory && matchesSearch;
        post.hidden = !show;
        if (show) visibleCount++;
      });
      if (noResults) noResults.hidden = visibleCount !== 0;
    }

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('is-active'); });
        pill.classList.add('is-active');
        activeFilter = pill.getAttribute('data-filter');
        applyFilters();
      });
    });

    if (searchInput) searchInput.addEventListener('input', applyFilters);
  }
});
