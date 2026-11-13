const elementosReveal = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas, observer) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        observer.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  elementosReveal.forEach((elemento) => observador.observe(elemento));
} else {
  elementosReveal.forEach((elemento) => elemento.classList.add('visible'));
}

const scrollProgress = document.querySelector('#scrollProgress');
window.addEventListener('scroll', () => {
  const altura = document.documentElement.scrollHeight - window.innerHeight;
  const progresso = altura > 0 ? (window.scrollY / altura) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${progresso}%`;
});
