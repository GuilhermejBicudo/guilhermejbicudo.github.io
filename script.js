const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
const isPortuguese = document.documentElement.lang.toLowerCase().startsWith('pt');
const menuLabel = isPortuguese ? 'Abrir menu' : 'Open menu';
const closeMenuLabel = isPortuguese ? 'Fechar menu' : 'Close menu';

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? closeMenuLabel : menuLabel);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear()