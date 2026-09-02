const menu = document.querySelector('.menu');
const header = document.querySelector('.nav-shell');
menu.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => header.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('nav a')];
const setActive = () => {
  const y = scrollY + innerHeight * .35;
  let id = 'home';
  sections.forEach(section => { if (section.offsetTop <= y) id = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
};
addEventListener('scroll', setActive, { passive: true });
setActive();
