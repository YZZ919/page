(() => {
  const grid = document.querySelector('.photo-grid');
  const viewer = document.querySelector('.photo-viewer');
  if (!grid || !viewer) {
    return;
  }

  const source = viewer.querySelector('#viewer-source');
  const img = viewer.querySelector('#viewer-image');
  const closeBtn = viewer.querySelector('.photo-viewer__close');
  const rotateButtons = viewer.querySelectorAll('[data-rotate]');

  let rotation = 0;

  const applyRotation = () => {
    if (img) {
      img.style.transform = `rotate(${rotation}deg)`;
    }
  };

  const openViewer = (link) => {
    const fullJpg = link.getAttribute('href');
    const fullWebp = link.getAttribute('data-full-webp');
    const initial = parseInt(link.getAttribute('data-rotation') || '0', 10);
    const alt = link.querySelector('img')?.getAttribute('alt') || '照片预览';

    rotation = Number.isFinite(initial) ? initial : 0;
    if (source) {
      source.setAttribute('srcset', fullWebp || '');
    }
    if (img) {
      img.src = fullJpg || '';
      img.alt = alt;
    }

    applyRotation();
    viewer.classList.add('is-active');
    document.body.classList.add('viewer-open');
  };

  const closeViewer = () => {
    viewer.classList.remove('is-active');
    document.body.classList.remove('viewer-open');
  };

  grid.querySelectorAll('.photo-link').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      openViewer(link);
    });
  });

  rotateButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const delta = parseInt(btn.getAttribute('data-rotate') || '0', 10);
      rotation = (rotation + delta + 3600) % 360;
      applyRotation();
    });
  });

  viewer.addEventListener('click', (event) => {
    if (event.target === viewer || event.target === viewer.querySelector('.photo-viewer__backdrop')) {
      closeViewer();
    }
  });

  closeBtn?.addEventListener('click', closeViewer);

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && viewer.classList.contains('is-active')) {
      closeViewer();
    }
  });
})();
