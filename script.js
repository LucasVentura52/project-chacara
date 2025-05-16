
  const unicoModal = document.getElementById('unicoModal');
  const tituloModal = document.getElementById('unicoModalLabel');
  const bodyModal = document.getElementById('unicoModalBody');

  unicoModal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget; // quem abriu o modal
    const titulo = trigger.getAttribute('data-titulo') || 'Modal';
    const arquivo = trigger.getAttribute('data-arquivo');

    tituloModal.textContent = titulo;
    bodyModal.innerHTML = '<div class="text-center text-muted">Carregando conteúdo...</div>';

    if (!arquivo) {
      bodyModal.innerHTML = '<p class="text-danger">Arquivo não especificado.</p>';
      return;
    }

    fetch(arquivo)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const container = doc.querySelector('.container') || doc.body;

        if (container) {
          bodyModal.innerHTML = container.innerHTML;
        } else {
          bodyModal.innerHTML = '<p class="text-danger">Conteúdo não encontrado.</p>';
        }
      })
      .catch(() => {
        bodyModal.innerHTML = '<p class="text-danger">Erro ao carregar conteúdo.</p>';
      });
  });
