/* ============================================================
   LUCAS ALVES — JAVASCRIPT DO PORTFÓLIO
   Recursos:
   1. Estado de rolagem suave da barra de navegação
   2. Alternância do menu móvel
   3. Destaque do link de navegação ativo
   4. Animação de digitação (título do herói)
   5. Aparecimento gradual com Intersection Observer
   ============================================================ */

/* ── 1. Estado de rolagem da barra de navegação ── */
const navbar = document.getElementById('barra-navegacao');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


/* ── 2. Alternância do menu móvel ── */
const navToggle = document.getElementById('alternar-menu');
const navLinks  = document.getElementById('menu-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Fechar menu quando um link é clicado
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


/* ── 3. Link de navegação ativo na rolagem ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.links-menu a');

const activateLink = () => {
  let current = '';
  const scrollY = window.scrollY + 100;

  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop) {
      current = sec.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === `#${current}`) {
      a.style.color = 'var(--blue-deep)';
      a.style.background = 'var(--blue-pale)';
    }
  });
};

window.addEventListener('scroll', activateLink, { passive: true });
activateLink(); // run on load


/* ── 4. Animação de digitação ── */
const typingEl = document.getElementById('texto-digitacao');
const phrases  = [
  'Desenvolvedor Web',
  'Desenvolvedor Front-End',
  'Solucionador de Problemas',
  'Codificador Criativo'
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
  }

  // Determine next delay
  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    // Pausar no final da frase
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(typeEffect, delay);
}

// Iniciar digitação após a animação do herói se estabelecer
setTimeout(typeEffect, 900);


/* ── 5. Aparecimento gradual na rolagem (Intersection Observer) ── */
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling cards slightly
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Adicionar atrasos de escalonamento aos filhos da grade
document.querySelectorAll('.skills-grid .skill-card').forEach((el, i) => {
  el.classList.add('fade-in');
  el.dataset.delay = i * 70;
});

document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
  el.dataset.delay = i * 120;
});

document.querySelectorAll('.lang-card').forEach((el, i) => {
  el.classList.add('fade-in');
  el.dataset.delay = i * 150;
});

// Observe all fade-in elements (re-query to include newly added ones)
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Smooth scroll for all anchor links without changing URL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});