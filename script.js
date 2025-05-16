// ============================
// MODAL: Carregamento dinâmico
// ============================
const unicoModal = document.getElementById('unicoModal');
const tituloModal = document.getElementById('unicoModalLabel');
const bodyModal = document.getElementById('unicoModalBody');

if (unicoModal) {
  unicoModal.addEventListener('show.bs.modal', event => {
    const trigger = event.relatedTarget;
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

          const form = bodyModal.querySelector('form');
          if (arquivo === 'anunciar.html' && form) {
            form.addEventListener('submit', function (e) {
              e.preventDefault();
              alert.success('Chácara anunciada com sucesso!');
            });
          }
        } else {
          bodyModal.innerHTML = '<p class="text-danger">Conteúdo não encontrado.</p>';
        }
      });
  });
}

// ============================
// Scroll reveal
// ============================
const scrollElements = document.querySelectorAll('.scroll-reveal');

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  scrollElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// ============================
// SweetAlert2 Toasts
// ============================
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  showCloseButton: true,
  customClass: {
    popup: 'custom-toast'
  }
});

const alert = {
  success: (message) => {
    Toast.fire({
      icon: 'success',
      title: message,
      customClass: { popup: 'toast-success' }
    });
  },
  error: (message) => {
    Toast.fire({
      icon: 'error',
      title: message,
      customClass: { popup: 'toast-error' }
    });
  },
  warning: (message) => {
    Toast.fire({
      icon: 'warning',
      title: message,
      customClass: { popup: 'toast-warning' }
    });
  }
};


// ============================
// Animação dos ícones
// ============================
function animarIcones() {
  const icones = document.querySelectorAll('.icone-animado');

  icones.forEach((icone, index) => {
    icone.style.animation = 'none';
    icone.offsetHeight;
    icone.style.animation = `bounce-up-down 1s ease-in-out 1`;
    icone.style.animationDelay = `${index * 0.5}s`;
    icone.style.opacity = '1';
  });
}

setInterval(animarIcones, 20000);

window.addEventListener('load', animarIcones);