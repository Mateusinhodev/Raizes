const periodos = {
  colonial: {
    data: 'SÉCULOS XVI–XIX',
    titulo: 'Escravização e resistência',
    texto: 'Milhões de africanos foram trazidos à força para o Brasil. Ao longo de todo esse período, ocorreram fugas, revoltas, negociações, preservação cultural e formação de comunidades de resistência.'
  },
  palmares: {
    data: 'SÉCULO XVII',
    titulo: 'Quilombo dos Palmares',
    texto: 'Palmares foi uma grande comunidade formada por pessoas que resistiam à escravização, localizada na região da atual Alagoas. Zumbi tornou-se uma de suas lideranças mais lembradas, e Dandara é associada à resistência do quilombo.'
  },
  abolicao: {
    data: '13 DE MAIO DE 1888',
    titulo: 'Abolição legal da escravidão',
    texto: 'A Lei Áurea determinou o fim legal da escravidão no Brasil. A liberdade jurídica, porém, não veio acompanhada de políticas suficientes de reparação e inclusão, e desigualdades raciais permaneceram.'
  },
  hoje: {
    data: 'SÉCULOS XX–XXI',
    titulo: 'Memória, direitos e reconhecimento',
    texto: 'Movimentos negros, pesquisadores, educadores e artistas seguem ampliando o debate público, defendendo direitos, valorizando a cultura afro-brasileira e fortalecendo a educação antirracista.'
  }
};

const timelineCard = document.querySelector('#timelineCard');
document.querySelectorAll('.time-tab').forEach((botao) => {
  botao.addEventListener('click', () => {
    const periodo = periodos[botao.dataset.period];
    if (!periodo || !timelineCard) return;

    document.querySelectorAll('.time-tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    botao.classList.add('active');
    botao.setAttribute('aria-selected', 'true');
    timelineCard.innerHTML = `<span class="timeline-date">${periodo.data}</span><h4>${periodo.titulo}</h4><p>${periodo.texto}</p>`;
  });
});
