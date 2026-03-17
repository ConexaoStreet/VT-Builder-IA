
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  $$('#navLinks a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.14 });

$$('.reveal').forEach(el => observer.observe(el));

const counters = $$('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.counter || 0);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, 28);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

counters.forEach(el => counterObserver.observe(el));

const tabs = $$('.tab');
const screens = {
  home: $('#preview-home'),
  catalogo: $('#preview-catalogo'),
  produto: $('#preview-produto'),
  admin: $('#preview-admin')
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    const key = tab.dataset.preview;
    if (screens[key]) screens[key].classList.add('active');
  });
});

document.addEventListener('mousemove', (e) => {
  const spotlight = $('.spotlight');
  if (!spotlight) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.background = `
    radial-gradient(620px 260px at ${x}% ${Math.max(0, y - 12)}%, rgba(255,255,255,.08), transparent 70%),
    radial-gradient(500px 320px at ${Math.min(100, x + 16)}% ${Math.min(100, y + 4)}%, rgba(255,255,255,.04), transparent 72%)
  `;
});
