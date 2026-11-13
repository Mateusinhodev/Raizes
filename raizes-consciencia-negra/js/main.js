const modal = document.querySelector('#infoModal');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');

function abrirModal(titulo, texto) {
  if (!modal || !modalTitle || !modalText) return;
  modalTitle.textContent = titulo;
  modalText.textContent = texto;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-close-modal]').forEach((botao) => botao.addEventListener('click', fecharModal));
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') fecharModal();
});

document.querySelectorAll('.learn-more').forEach((botao) => {
  botao.addEventListener('click', () => abrirModal('Cultura afro-brasileira', botao.dataset.info));
});

document.querySelectorAll('.person-more').forEach((botao) => {
  botao.addEventListener('click', () => {
    const [nome, texto] = botao.dataset.person.split('|');
    abrirModal(nome, texto);
  });
});

const contrastToggle = document.querySelector('#contrastToggle');
if (contrastToggle) {
  contrastToggle.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    const ativo = document.body.classList.contains('high-contrast');
    contrastToggle.setAttribute('aria-pressed', ativo);
    contrastToggle.title = ativo ? 'Desativar alto contraste' : 'Ativar alto contraste';
  });
}

const reflectionInput = document.querySelector('#reflectionInput');
const saveReflection = document.querySelector('#saveReflection');
const reflectionFeedback = document.querySelector('#reflectionFeedback');
if (reflectionInput && saveReflection) {
  try {
    reflectionInput.value = localStorage.getItem('raizes-reflexao') || '';
  } catch (erro) {
    console.info('Armazenamento local indisponível neste navegador.');
  }
  saveReflection.addEventListener('click', () => {
    const texto = reflectionInput.value.trim();
    if (!texto) {
      reflectionFeedback.textContent = 'Escreva sua reflexão antes de guardar.';
      return;
    }
    try {
      localStorage.setItem('raizes-reflexao', texto);
      reflectionFeedback.textContent = 'Sua reflexão foi guardada neste dispositivo.';
    } catch (erro) {
      reflectionFeedback.textContent = 'Não foi possível guardar neste navegador.';
    }
  });
}

// Evita que imagens externas quebradas deixem espaços vazios no layout.
document.querySelectorAll('img').forEach((imagem) => {
  imagem.addEventListener('error', () => {
    imagem.style.opacity = '0.25';
    imagem.alt = `${imagem.alt} (imagem externa indisponível)`;
  });
});
