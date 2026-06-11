/* ========================================
   FEDERICO BROCCA — PORTFOLIO JS
   Typewriter · Scroll Reveal · Nav
   ======================================== */

// --- TYPEWRITER EFFECT ---
function typeWriter(element, text, speed = 55, callback) {
  let i = 0;
  element.textContent = '';
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, speed);
}

function runTerminalSequence() {
  const cmd1 = document.querySelector('.typewriter[data-text="whoami"]');
  const outWhoami = document.getElementById('out-whoami');
  const lineRole = document.getElementById('line-role');
  const cmd2 = lineRole?.querySelector('.typewriter');
  const outRoles = document.getElementById('out-roles');
  const lineStatus = document.getElementById('line-status');
  const cmd3 = lineStatus?.querySelector('.typewriter');
  const outStatus = document.getElementById('out-status');
  const lineEnd = document.getElementById('line-end');

  if (!cmd1) return;

  typeWriter(cmd1, 'whoami', 60, () => {
    setTimeout(() => {
      outWhoami?.classList.remove('hidden');
      outWhoami?.classList.add('visible');

      setTimeout(() => {
        lineRole?.classList.remove('hidden');
        lineRole?.classList.add('visible');
        if (cmd2) {
          typeWriter(cmd2, 'cat roles.txt', 60, () => {
            setTimeout(() => {
              outRoles?.classList.remove('hidden');
              outRoles?.classList.add('visible');

              setTimeout(() => {
                lineStatus?.classList.remove('hidden');
                lineStatus?.classList.add('visible');
                if (cmd3) {
                  typeWriter(cmd3, 'echo $STATUS', 60, () => {
                    setTimeout(() => {
                      outStatus?.classList.remove('hidden');
                      outStatus?.classList.add('visible');
                      setTimeout(() => {
                        lineEnd?.classList.remove('hidden');
                        lineEnd?.classList.add('visible');
                      }, 300);
                    }, 200);
                  });
                }
              }, 400);
            }, 200);
          });
        }
      }, 400);
    }, 200);
  });
}

// --- SCROLL REVEAL ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.section-header, .about-grid, .skills-grid, .projects-grid, .hobbies-grid, .goals-grid, .contact-content');
  reveals.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- NAVBAR SCROLL BEHAVIOR ---
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observerNav.observe(s));

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
  });

  // Close on link click (mobile)
  links.forEach(l => {
    l.addEventListener('click', () => navLinks?.classList.remove('open'));
  });
}

// --- GLITCH EFFECT on hero name (subtle) ---
function initGlitch() {
  const name = document.querySelector('.hero-name');
  if (!name) return;
  setInterval(() => {
    if (Math.random() > 0.92) {
      name.style.textShadow = `${Math.random() * 4 - 2}px 0 var(--red), ${Math.random() * -4 + 2}px 0 var(--blue)`;
      setTimeout(() => { name.style.textShadow = 'none'; }, 80);
    }
  }, 2000);
}

// --- EASTER EGG: Konami Code ---
function initKonami() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        showKonami();
      }
    } else {
      pos = 0;
    }
  });
}

function showKonami() {
  const msg = document.createElement('div');
  msg.style.cssText = `
    position:fixed; bottom:2rem; left:50%; transform:translateX(-50%);
    background:#1a1f2e; border:1px solid #00ff88; color:#00ff88;
    font-family:'JetBrains Mono',monospace; font-size:0.85rem;
    padding:0.75rem 1.5rem; border-radius:6px; z-index:9999;
    box-shadow:0 0 30px rgba(0,255,136,0.3);
  `;
  msg.textContent = '🔓 Access granted. Welcome, hacker.';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

// --- COPY EMAIL on click ---
function initCopyEmail() {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;
  emailLink.addEventListener('click', (e) => {
    const email = emailLink.href.replace('mailto:', '');
    if (navigator.clipboard && email !== 'tua@email.com') {
      navigator.clipboard.writeText(email).then(() => {
        const val = emailLink.querySelector('.contact-val');
        if (val) {
          const orig = val.textContent;
          val.textContent = '✓ Copiato!';
          setTimeout(() => { val.textContent = orig; }, 1500);
        }
      });
    }
  });
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  // Small delay before starting terminal animation
  setTimeout(runTerminalSequence, 400);
  initScrollReveal();
  initNavbar();
  initGlitch();
  initKonami();
  initCopyEmail();
});
