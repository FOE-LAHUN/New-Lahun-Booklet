// Minimal plain JS app (no React)
// Shows logo + PDF in the same page

function createHeader() {
  const h = document.createElement('header');
  h.className = 'app-header';
  h.innerHTML = `
    <img src="lahun-logo.jpeg" alt="logo" class="logo">
    <h1>قطاع اللاهون - الكتيب</h1>
  `;
  return h;
}

function createPdfViewer() {
  const section = document.createElement('section');
  section.className = 'pdf-section';
  section.innerHTML = `
    <div class="pdf-wrap">
      <iframe src="Booklet-compressed.pdf" title="booklet" class="pdf-frame"></iframe>
    </div>
    <div class="logo-wrap">
      <img src="lahun-logo.jpeg" alt="logo large" class="logo-large">
    </div>
  `;
  return section;
}

function init() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(createHeader());
  root.appendChild(createPdfViewer());
  const footer = document.createElement('footer');
  footer.className = 'app-footer';
  footer.textContent = '© قطاع اللاهون';
  root.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', init);
