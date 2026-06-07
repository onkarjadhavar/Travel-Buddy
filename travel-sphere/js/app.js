// ============================================================
// app.js — TravelSphere Core Application
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initDB();
  initTheme();
  initNav();
  initBackToTop();
  initLoadingScreen();
  initCounters();
  initNewsletter();
  setActiveNav();
});

// ── Loading Screen ───────────────────────────────────────────
function initLoadingScreen() {
  const screen = document.getElementById('loadingScreen');
  if (!screen) return;
  setTimeout(() => screen.classList.add('hidden'), 1200);
}

// ── Theme ────────────────────────────────────────────────────
function initTheme() {
  const saved = Storage.get(DB.theme) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  Storage.set(DB.theme, next);
  updateThemeIcon(next);
}
function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.innerHTML = theme === 'dark'
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>`;
}

// ── Navigation ───────────────────────────────────────────────
function initNav() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      const open = mobileNav.classList.contains('open');
      if (open) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    }));
  }
}
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });
}

// ── Back to Top ──────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Toast ────────────────────────────────────────────────────
function showToast(title, msg = '', type = 'info') {
  const icons = {
    success: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,
    info: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>`,
  };
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.add('hide'); setTimeout(() => toast.remove(), 350); }, 4500);
}

// ── Modal ────────────────────────────────────────────────────
function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); document.body.style.overflow = ''; }
}
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open'), document.body.style.overflow = '';
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Lightbox ─────────────────────────────────────────────────
let lightboxImages = [];
let lightboxIndex = 0;
function initLightbox(images) {
  lightboxImages = images;
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lbPrev')?.addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
  document.getElementById('lbNext')?.addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
    if (e.key === 'Escape') closeLightbox();
  });
}
function openLightbox(index) {
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  showLightboxImage(index);
}
function showLightboxImage(index) {
  if (lightboxImages.length === 0) return;
  lightboxIndex = (index + lightboxImages.length) % lightboxImages.length;
  const img = document.getElementById('lbImg');
  const counter = document.getElementById('lbCounter');
  if (img) img.src = lightboxImages[lightboxIndex];
  if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
}
function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Animated Counters ────────────────────────────────────────
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: .5 });
  counters.forEach(c => observer.observe(c));
}
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Newsletter ───────────────────────────────────────────────
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = form.querySelector('input[type=email]')?.value;
    if (!email || !isValidEmail(email)) {
      showToast('Invalid email', 'Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed!', 'Welcome to TravelSphere. Expect amazing deals!', 'success');
    form.reset();
  });
}

// ── Form Validation ──────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[+]?[\d\s\-().]{7,15}$/.test(phone);
}
function validateField(input, rule) {
  const errEl = input.parentElement?.querySelector('.form-error')
    || input.closest('.form-group')?.querySelector('.form-error');
  const valid = rule(input.value.trim());
  input.classList.toggle('error', !valid);
  if (errEl) errEl.classList.toggle('show', !valid);
  return valid;
}

// ── INR Formatter ───────────────────────────────────────────
function formatINR(amount) {
  if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(1) + ' Cr';
  if (amount >= 100000) return '₹' + (amount / 100000).toFixed(1) + ' L';
  return '₹' + amount.toLocaleString('en-IN');
}

// ── Stars HTML ───────────────────────────────────────────────
function starsHTML(rating) {
  let html = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star${i > rating ? ' empty' : ''}">★</span>`;
  }
  html += `<span class="rating-text">${rating.toFixed(1)}</span></div>`;
  return html;
}

// ── Price Symbol ─────────────────────────────────────────────
function priceSymbol(range) {
  const map = { '$': 'Budget', '$$': 'Mid-Range', '$$$': 'Premium', '$$$$': 'Luxury' };
  return map[range] || range;
}

// ── Format Date ──────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function daysBetween(d1, d2) {
  return Math.max(0, Math.round((new Date(d2) - new Date(d1)) / 86400000));
}

// ── Skeleton Cards ───────────────────────────────────────────
function renderSkeletons(container, count = 6) {
  container.innerHTML = Array(count).fill(`
    <div class="skeleton-card">
      <div class="skeleton skel-img"></div>
      <div class="skel-body">
        <div class="skeleton skel-line"></div>
        <div class="skeleton skel-line short"></div>
        <div class="skeleton skel-line xshort"></div>
      </div>
    </div>`).join('');
}

// ── Tabs ─────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]');
      if (!group) return;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector(`[data-panel="${btn.dataset.tab}"]`);
      panel?.classList.add('active');
    });
  });
}

// ── FAQ ──────────────────────────────────────────────────────
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      item.classList.toggle('open');
      answer.classList.toggle('open');
    });
  });
}

// ── Lazy Load Images ─────────────────────────────────────────
function initLazyImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.src = e.target.dataset.src;
        e.target.removeAttribute('data-src');
        observer.unobserve(e.target);
      }
    });
  }, { rootMargin: '200px' });
  imgs.forEach(img => observer.observe(img));
}

// ── Shared Nav HTML ──────────────────────────────────────────
function getNavHTML() {
  return `
  <nav class="navbar" role="navigation" aria-label="Main navigation">
    <div class="container">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo" aria-label="TravelSphere Home">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
          Travel<span>Sphere</span>
        </a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="destinations.html">Destinations</a>
          <a href="packages.html">Packages</a>
          <a href="hotels.html">Hotels</a>
          <a href="trip-planner.html">Plan Trip</a>
          <a href="bookings.html">Bookings</a>
          <a href="reviews.html">Reviews</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="nav-actions">
          <button class="btn-icon" id="themeToggle" onclick="toggleTheme()" aria-label="Toggle dark mode" title="Toggle theme">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>
          </button>
          <a href="bookings.html" class="btn btn-primary btn-sm">My Bookings</a>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
  <nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">
    <a href="index.html">Home</a>
    <a href="destinations.html">Destinations</a>
    <a href="packages.html">Packages</a>
    <a href="hotels.html">Hotels</a>
    <a href="trip-planner.html">Plan Trip</a>
    <a href="bookings.html">Bookings</a>
    <a href="reviews.html">Reviews</a>
    <a href="contact.html">Contact</a>
  </nav>`;
}

function getFooterHTML() {
  return `
  <footer role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
            Travel<span style="color:rgba(255,255,255,.6)">Sphere</span>
          </a>
          <p>Your premium travel companion for extraordinary journeys. Curated experiences in 80+ countries, hand-picked hotels, and personalised itineraries.</p>
          <div class="footer-socials">
            <a href="#" class="social-btn" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/></svg>
            </a>
            <a href="#" class="social-btn" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 2a4.48 4.48 0 00-4.47 4.95A12.74 12.74 0 013 4.5s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" class="social-btn" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" class="social-btn" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="destinations.html">All Destinations</a></li>
            <li><a href="packages.html">Travel Packages</a></li>
            <li><a href="hotels.html">Hotels</a></li>
            <li><a href="trip-planner.html">Trip Planner</a></li>
            <li><a href="reviews.html">Reviews</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="contact.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Centre</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="#">Safety</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 TravelSphere. All rights reserved.</span>
        <span>Made with ♥ for explorers worldwide</span>
      </div>
    </div>
  </footer>`;
}

function getLightboxHTML() {
  return `
  <div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
    <button class="lightbox-close" id="lbClose" aria-label="Close lightbox">✕</button>
    <button class="lightbox-btn lightbox-prev" id="lbPrev" aria-label="Previous image">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <img id="lbImg" src="" alt="Gallery image" class="lightbox-img">
    <button class="lightbox-btn lightbox-next" id="lbNext" aria-label="Next image">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
    </button>
    <div class="lightbox-counter" id="lbCounter"></div>
  </div>`;
}

function getBackToTopHTML() {
  return `<button class="back-to-top" id="backToTop" aria-label="Back to top">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
  </button>`;
}

function getLoadingHTML() {
  return `<div class="loading-screen" id="loadingScreen" role="status" aria-label="Loading">
    <div class="loading-logo">✈ TravelSphere</div>
    <div class="loading-bar"><div class="loading-progress"></div></div>
  </div>`;
}
