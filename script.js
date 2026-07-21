const i18n = {
  en: {
    lang: 'en', menu: ['About', 'Experience', 'Projects', 'Let\'s talk <span aria-hidden="true">↗</span>'],
    hero: ['<span></span> Open to opportunities', 'Data that<br><em>moves</em> decisions.', 'I\'m <strong>Guilherme Bicudo</strong>, a Data Analyst. I turn commercial data into clarity, automation and better business decisions.', 'Explore projects <span aria-hidden="true">↓</span>', 'Download résumé <span aria-hidden="true">↓</span>'],
    labels: ['<span>01</span> About me', '<span>02</span> Experience', '<span>03</span> Education', '<span>04</span> Selected projects'],
    project: ['Analysis that tells a story <em>and points to the next move.</em>', 'Olist Business Intelligence', 'An end-to-end e-commerce analysis: data preparation, SQL queries and a dashboard to track sales, delivery and customer behavior.', 'Customer Retention Analytics', 'A customer-retention analytics solution that transforms ERP sales data into actionable insights on purchasing behavior, retention and growth opportunities.', 'View details <span aria-hidden="true">↗</span>'],
    contact: ['<span></span> Contact', 'Let\'s turn data into <em>direction.</em>', 'I\'m open to discussing projects, opportunities and data challenges.', 'Back to top ↑']
  },
  pt: {
    lang: 'pt-BR', menu: ['Sobre', 'Experiência', 'Projetos', 'Vamos conversar <span aria-hidden="true">↗</span>'],
    hero: ['<span></span> Disponível para oportunidades', 'Dados que<br><em>movem</em> decisões.', 'Sou <strong>Guilherme Bicudo</strong>, Analista de Dados. Transformo dados comerciais em clareza, automações e decisões de negócio melhores.', 'Explorar projetos <span aria-hidden="true">↓</span>', 'Baixar currículo <span aria-hidden="true">↓</span>'],
    labels: ['<span>01</span> Sobre mim', '<span>02</span> Experiência', '<span>03</span> Formação', '<span>04</span> Projetos selecionados'],
    project: ['Análises que contam uma história <em>e indicam o próximo passo.</em>', 'Olist Business Intelligence', 'Uma análise ponta a ponta de e-commerce: preparação de dados, consultas SQL e painel para acompanhar vendas, entregas e comportamento de clientes.', 'Analytics de Retenção de Clientes', 'Solução analítica que transforma dados de vendas do ERP em insights acionáveis sobre comportamento de compra, retenção e oportunidades de crescimento.', 'Ver detalhes <span aria-hidden="true">↗</span>'],
    contact: ['<span></span> Contato', 'Vamos transformar dados em <em>direção.</em>', 'Estou aberto a conversar sobre projetos, oportunidades e desafios de dados.', 'Voltar ao topo ↑']
  }
};
const all = (selector) => [...document.querySelectorAll(selector)];
const html = (element, value) => { if (element) element.innerHTML = value; };
function setLanguage(language) {
  const text = i18n[language];
  if (!text) return;
  document.documentElement.lang = text.lang;
  all('.nav-links > a').forEach((item, index) => html(item, text.menu[index]));
  html(document.querySelector('.hero .eyebrow'), text.hero[0]);
  html(document.querySelector('.hero h1'), text.hero[1]);
  html(document.querySelector('.hero-description'), text.hero[2]);
  all('.hero-actions a').forEach((item, index) => html(item, text.hero[index + 3]));
  all('.section-label').forEach((item, index) => html(item, text.labels[index]));
  html(document.querySelector('.project-intro h2'), text.project[0]);
  all('.project-card h3').forEach((item, index) => html(item, text.project[index * 2 + 1]));
  all('.project-card p').forEach((item, index) => html(item, text.project[index * 2 + 2]));
  all('.project-link').forEach((item) => html(item, text.project[5]));
  html(document.querySelector('.contact .eyebrow'), text.contact[0]);
  html(document.querySelector('.contact h2'), text.contact[1]);
  html(document.querySelector('.contact h2 + p'), text.contact[2]);
  html(document.querySelector('.footer > a:last-child'), text.contact[3]);
  all('[data-language]').forEach((item) => item.toggleAttribute('aria-current', item.dataset.language === language));
  localStorage.setItem('portfolio-language', language);
}
all('[data-language]').forEach((item) => item.addEventListener('click', (event) => { event.preventDefault(); setLanguage(item.dataset.language); }));
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => { const open = navLinks.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
all('.nav-links a').forEach((link) => link.addEventListener('click', () => { navLinks.classList.remove('open'); menuButton?.setAttribute('aria-expanded', 'false'); }));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
all('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
setLanguage(localStorage.getItem('portfolio-language') || (document.documentElement.lang.startsWith('pt') ? 'pt' : 'en'));
