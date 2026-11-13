const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('ativo');
    const aberto = mainNav.classList.contains('ativo');
    menuToggle.setAttribute('aria-expanded', aberto);
    menuToggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('ativo');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });
}
