const menuBtn = document.getElementById('menuBtn');
const topnav = document.querySelector('.topnav');

if (menuBtn && topnav) {
  menuBtn.addEventListener('click', () => {
    topnav.classList.toggle('mobile-open');
    if (topnav.classList.contains('mobile-open')) {
      Object.assign(topnav.style, {
        display: 'flex',
        position: 'fixed',
        top: '78px',
        left: '16px',
        right: '16px',
        flexDirection: 'column',
        padding: '18px',
        borderRadius: '24px',
        background: '#111116',
        border: '1px solid rgba(255,255,255,.08)'
      });
    } else {
      topnav.removeAttribute('style');
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.addEventListener('mousemove', (e) => {
  const spotlight = document.querySelector('.spotlight');
  if (!spotlight) return;
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  spotlight.style.background = `
    radial-gradient(620px 260px at ${x}% ${Math.max(0, y - 12)}%, rgba(255,255,255,.07), transparent 70%),
    radial-gradient(520px 320px at ${Math.min(100, x + 16)}% ${Math.min(100, y + 4)}%, rgba(255,255,255,.04), transparent 72%)
  `;
});
