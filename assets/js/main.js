/* ==========================================================================
   main.js — Portfolio Website
   All interactivity for Sagena Dev's portfolio.
   Organized into clearly named function groups, all called from DOMContentLoaded.
   ========================================================================== */

/* ==========================================================================
   UTILITIES — PURE FUNCTIONS
   ========================================================================== */

/**
 * Validates an email address.
 * Pure function: no side effects, returns a result object.
 * @param {string} email - The email address to validate
 * @returns {{ valid: boolean, error: string | null }} Validation result
 */
function validateEmail(email) {
  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: 'Email address is required.' };
  }
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true, error: null };
}

/* ==========================================================================
   DATA — CERTIFICATIONS
   ===== YOUR CERTIFICATIONS — EDIT HERE =====
   Add, remove, or update entries below to display your own certificates.
   Each entry appears as one card in the "My Certifications" section.
   ========================================================================== */

// LOGO OPTIONS (pick one per entry):
//   logoImg  — path to a local image file, e.g. 'assets/images/certs/aws.png'
//   logoIcon — a Font Awesome class,  e.g. 'fab fa-aws'
//              or a Devicons class,   e.g. 'devicon-google-plain colored'
//
// URL: paste the full verification link from your certificate provider.

const CERTIFICATIONS = [
  {
    issuer:   'Dicoding',
    name:     'AI Praktis untuk Produktivitas',
    platform: 'Dicoding',
    year:     2026,
    logoImg:  'assets/images/certs/dicoding.png',
    logoAlt:  'Dicoding logo',
    url:      'https://www.dicoding.com/certificates/2VX30K723XYQ',
  },
  {
    issuer:   'RevoU',
    name:     'Intro to Software Engineering',
    platform: 'RevoU',
    year:     2026,
    logoImg:  'assets/images/certs/revou.png',
    logoAlt:  'RevoU logo',
    certImg:  'assets/images/certs/sertirevou.jpg',
    url:      '#',
  },
  {
    issuer:   'Google',
    name:     'Google Data Analytics Certificate',
    platform: 'Coursera',
    year:     2022,
    // logoImg: 'assets/images/certs/google.png',
    // logoAlt: 'Google logo',
    logoIcon: 'devicon-google-plain colored',
    url:      'https://coursera.org/verify/your-google-cert-id',
  },
  {
    issuer:   'freeCodeCamp',
    name:     'JavaScript Algorithms and Data Structures',
    platform: 'freeCodeCamp',
    year:     2022,
    logoIcon: 'fab fa-free-code-camp',
    url:      'https://freecodecamp.org/certification/sagenadev/javascript-algorithms-and-data-structures',
  },
];

/* ===== END CERTIFICATIONS ===== */

/* ===== PROJECTS DATA ===== */
const PROJECTS = [
  {
    name:        'PONPES ONLINE',
    description: 'Application for pesantren activities.',
    image:       'https://ponpesonline.web.id/_next/image?url=%2Flogo.png&w=64&q=75',
    imageAlt:    'PONPES ONLINE project management tool screenshot',
    tags:        ['React', 'MongoDB'],
    liveUrl:     'https://ponpesonline.web.id/',
    repoUrl:     'https://github.com/sagenadev/taskflow',
  },
  {
    name:        'E-Commerce Website',
    description: 'Full-featured online store with cart, checkout, and Stripe payments.',
    image:       'https://placehold.co/800x450/1a1a2e/7C3AED?text=E-Commerce',
    imageAlt:    'E-Commerce website screenshot',
    tags:        ['React.js', 'Tailwind', 'Stripe'],
    liveUrl:     'https://shop.example.com',
    repoUrl:     'https://github.com/sagenadev/ecommerce',
  },
  {
    name:        'DevConnect',
    description: 'Developer Social Platform — real-time chat and code sharing.',
    image:       'https://placehold.co/800x450/1a1a2e/7C3AED?text=DevConnect',
    imageAlt:    'DevConnect developer social platform screenshot',
    tags:        ['MERN Stack', 'Socket.io'],
    liveUrl:     'https://devconnect.example.com',
    repoUrl:     'https://github.com/sagenadev/devconnect',
  },
  {
    name:        'Weather App',
    description: 'Real-time weather dashboard with 5-day forecast and location search.',
    image:       'https://placehold.co/800x450/1a1a2e/7C3AED?text=Weather+App',
    imageAlt:    'Weather App dashboard screenshot',
    tags:        ['React.js', 'OpenWeather API'],
    liveUrl:     'https://weather.example.com',
    repoUrl:     'https://github.com/sagenadev/weather-app',
  },
];
/* ===== END PROJECTS DATA ===== */

/* ==========================================================================
   DATA — SKILLS
   ========================================================================== */

const SKILLS = [
  { name: 'HTML',       icon: 'devicon-html5-plain colored',       label: 'HTML5' },
  { name: 'CSS',        icon: 'devicon-css3-plain colored',        label: 'CSS3' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain colored',  label: 'JavaScript' },
  { name: 'React',      icon: 'devicon-react-original colored',    label: 'React.js' },
  { name: 'Node.js',    icon: 'devicon-nodejs-plain colored',      label: 'Node.js' },
  { name: 'MongoDB',    icon: 'devicon-mongodb-plain colored',     label: 'MongoDB' },
  { name: 'Tailwind',   icon: 'devicon-tailwindcss-plain colored', label: 'Tailwind CSS' },
  { name: 'Git',        icon: 'devicon-git-plain colored',         label: 'Git & GitHub' },
];

/* ==========================================================================
   NAVIGATION — initNavbar()
   ========================================================================== */

/**
 * Scrolls smoothly to the element matching targetId (e.g. "#about").
 * Returns early without throwing if the target doesn't exist.
 * @param {string} targetId - A CSS selector string like "#section-id"
 */
function smoothScrollTo(targetId) {
  const target = document.querySelector(targetId);
  if (!target) return;
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Initialises all navigation bar behaviour:
 *  - Adds/removes .scrolled on <header> based on scroll position
 *  - Toggles mobile menu (.nav-open) via the hamburger button
 *  - Closes mobile menu when a nav link is clicked
 *  - Wires smooth-scroll to every [href^="#"] anchor
 */
function initNavbar() {
  const header    = document.getElementById('navbar');
  const hamburger = header?.querySelector('.hamburger');
  const navLinks  = header?.querySelectorAll('.nav-links a');

  if (!header) return;

  // ── Scroll listener: toggle .scrolled ──────────────────────────────────
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  // Run once on init in case the page is already scrolled
  onScroll();

  // ── Hamburger: toggle mobile menu ──────────────────────────────────────
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // ── Nav links: close mobile menu on click ──────────────────────────────
  navLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  // ── Smooth scroll: wire all [href^="#"] anchors ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Only intercept non-empty hash links
      if (!href || href === '#') return;
      e.preventDefault();
      smoothScrollTo(href);
    });
  });
}

/* ==========================================================================
   STATS COUNTER — initStatsCounter()
   ========================================================================== */

/**
 * Animates a numeric counter from `start` to `end` over `duration` ms.
 * Uses requestAnimationFrame for smooth 60fps counting.
 * Appends a "+" suffix (read from data-suffix attribute, defaulting to "+")
 * once the animation completes.
 *
 * @param {HTMLElement} element  - The element whose textContent is updated
 * @param {number}      start    - Starting value (typically 0)
 * @param {number}      end      - Target value (from data-target attribute)
 * @param {number}      duration - Animation duration in milliseconds
 */
function animateCounter(element, start, end, duration) {
  const suffix = element.dataset.suffix ?? '+';
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed  = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic for a natural deceleration
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (end - start) * eased);

    element.textContent = progress < 1 ? String(current) : `${end}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Observes all [data-target] elements with an IntersectionObserver.
 * When each element enters the viewport (threshold 0.5), triggers
 * animateCounter() once and then unobserves the element.
 */
function initStatsCounter() {
  const counterEls = document.querySelectorAll('[data-target]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        if (!isNaN(target)) {
          animateCounter(el, 0, target, 1500);
        }
        obs.unobserve(el);   // fire once only
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   DYNAMIC CONTENT RENDERING
   ========================================================================== */

/**
 * Renders skill cards into #skills-grid.
 * Pure function: accepts an array of skill objects and sets innerHTML.
 * @param {Array<{ name: string, icon: string, label: string }>} skills
 */
function renderSkills(skills) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = skills
    .map(
      (skill) =>
        `<div class="card skill-card">` +
        `<i class="${skill.icon}" aria-hidden="true"></i>` +
        `<span>${skill.label}</span>` +
        `</div>`
    )
    .join('');
}

/**
 * Resolves the logo markup for a certification card.
 * Priority: logoImg > logoIcon > fallback first letter.
 *
 * @param {{ issuer: string, logoImg?: string, logoAlt?: string, logoIcon?: string }} cert
 * @returns {string} HTML string for the logo element
 */
function getCertLogo(cert) {
  if (cert.logoImg) {
    const alt = cert.logoAlt || `${cert.issuer} logo`;
    return `<img src="${cert.logoImg}" alt="${alt}" class="cert-logo-img">`;
  }
  if (cert.logoIcon) {
    return `<i class="${cert.logoIcon} cert-logo-icon" aria-hidden="true"></i>`;
  }
  return `<span class="cert-logo-fallback" aria-hidden="true">${cert.issuer.charAt(0)}</span>`;
}

/**
 * Renders certification cards into #certs-grid.
 * Pure function: accepts an array of certification objects and sets innerHTML.
 *
 * @param {Array<{
 *   issuer: string,
 *   name: string,
 *   platform: string,
 *   year: number,
 *   url: string,
 *   logoImg?: string,
 *   logoAlt?: string,
 *   logoIcon?: string
 * }>} certs
 */
function renderCertifications(certs) {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;
  grid.innerHTML = certs
    .map(
      (cert) =>
        `<div class="cert-card">` +
          `<div class="cert-card-header">` +
            `<div class="cert-logo">${getCertLogo(cert)}</div>` +
            `<a class="cert-link"` +
              ` href="${cert.certImg || cert.url}"` +  // Prioritas: certImg dulu, kalau tidak ada baru url
              ` target="_blank"` +
              ` rel="noopener noreferrer"` +
              ` aria-label="View ${cert.name} certificate (opens in new tab)"` +
            `>` +
              `<i class="fas fa-external-link-alt" aria-hidden="true"></i>` +
            `</a>` +
          `</div>` +
          `<h3 class="cert-name">${cert.name}</h3>` +
          `<p class="cert-platform">${cert.platform}</p>` +
          `<p class="cert-year">${cert.year}</p>` +
        `</div>`
    )
    .join('');
}

/**
 * Renders project cards into #projects-grid.
 * Pure function: accepts an array of project objects and sets innerHTML.
 *
 * @param {Array<{
 *   name: string,
 *   description: string,
 *   image: string,
 *   imageAlt: string,
 *   tags: string[],
 *   liveUrl: string,
 *   repoUrl: string
 * }>} projects
 */
function renderProjects(projects) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = projects.map(p => `
    <article class="card project-card">
      <div class="project-image-container">
        <img src="${p.image}" alt="${p.imageAlt}" loading="lazy">
        <div class="project-overlay">
          <div class="overlay-content">
             <a href="${p.liveUrl}" target="_blank" class="btn btn-primary btn-sm">View Demo</a>
          </div>
        </div>
      </div>
      <div class="project-card-body">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="project-tags">
          ${p.tags.map(t => `<span class="badge">${t}</span>`).join('')}
        </div>
        <div class="project-links">
          <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="repo-link">
            <i class="fab fa-github" aria-hidden="true"></i> GitHub
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/**
 * Renders all dynamic content sections.
 * Called first in DOMContentLoaded so cards are in the DOM
 * before any IntersectionObservers are set up.
 */
function renderContent() {
  renderSkills(SKILLS);
  renderCertifications(CERTIFICATIONS);
  renderProjects(PROJECTS);
}

/* ==========================================================================
   SCROLL REVEAL — initScrollReveal()
   ========================================================================== */

/**
 * Observes all [data-reveal] elements with an IntersectionObserver.
 * When each element enters the viewport, adds the `.visible` class once
 * and then unobserves it (fires once per element).
 *
 * The CSS guard `.js-loaded [data-reveal]` ensures elements start hidden
 * only when JS is available, so content is always visible without JS.
 */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);   // fire once only
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   ACTIVE NAV — initActiveNav()
   ========================================================================== */

/**
 * Tracks which section is currently in view using IntersectionObserver
 * and applies the `.active` class to the matching nav link.
 *
 * Uses threshold: 0.5 so a section must be at least half-visible before
 * its nav link is highlighted.
 */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        // Remove .active from all nav links
        navLinks.forEach((link) => link.classList.remove('active'));
        // Add .active to the matching link
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================================
   CONTACT FORM — initContactForm()
   ========================================================================== */

/**
 * Initialises the contact form in the footer.
 * Validates the email input on submit using validateEmail().
 * Shows #form-error on invalid input and #form-success on valid submission.
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const emailInput = document.getElementById('contact-email');
  const errorEl    = document.getElementById('form-error');
  const successEl  = document.getElementById('form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = validateEmail(emailInput.value);
    if (!result.valid) {
      errorEl.textContent = result.error;
      errorEl.style.display = 'block';
      successEl.style.display = 'none';
      emailInput.classList.add('error');
    } else {
      errorEl.style.display = 'none';
      successEl.textContent = "Thanks! We'll be in touch soon.";
      successEl.style.display = 'block';
      emailInput.classList.remove('error');
      emailInput.value = '';
    }
  });
}

/* ==========================================================================
   PREMIUM EFFECTS — initPremiumEffects()
   ========================================================================== */

function initPremiumEffects() {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  const cards = document.querySelectorAll('.card');
  const typingEl = document.getElementById('typing-text');
  const heroIcons = document.querySelectorAll('.floating-icon');

  // ── Custom Cursor ──────────────────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    if (cursor) cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    if (follower) {
      setTimeout(() => {
        follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }, 50);
    }
  });

  // ── Card Spotlight Effect ──────────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    // Only update cards currently in viewport for performance
    const visibleCards = Array.from(cards).filter(card => {
      const rect = card.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

    visibleCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ── Hero Parallax ──────────────────────────────────────────────────────
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    heroIcons.forEach(icon => {
      const speed = 20;
      icon.style.transform = `translate(calc(-50% + var(--x) + ${deltaX * speed}px), calc(-50% + var(--y) + ${deltaY * speed}px))`;
    });
  });

  // ── Magnetic Buttons ──────────────────────────────────────────────────
  const magneticBtns = document.querySelectorAll('.btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // ── Typing Effect ──────────────────────────────────────────────────────
  if (typingEl) {
    const text = typingEl.textContent;
    typingEl.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        typingEl.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50);
      }
    };
    setTimeout(type, 1000);
  }
}

/* ==========================================================================
   ENTRY POINT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mark HTML so CSS reveal-guard activates
  document.documentElement.classList.add('js-loaded');

  // Render dynamic content first so cards are in the DOM before observers
  renderContent();

  // Initialise navigation
  initNavbar();

  // Initialise stats counter animation
  initStatsCounter();

  // Initialise scroll reveal animations (after renderContent so dynamic cards are in DOM)
  initScrollReveal();

  // Initialise active nav highlighting
  initActiveNav();

  // Initialise contact form validation
  initContactForm();

  // Initialise premium interactivity
  initPremiumEffects();

  // Set footer copyright year dynamically
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Back to Top ────────────────────────────────────────────────────────
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
