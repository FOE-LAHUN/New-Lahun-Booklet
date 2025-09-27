function createHeader() {
  const h = document.createElement('header');
  h.className = 'app-header';
  h.innerHTML = `
    <img src="lahun-logo.jpeg" alt="logo" class="logo">
    <h1 class="gold-text">قطاع اللاهون - الكتيب</h1>
  `;
  return h;
}

function init() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(createHeader());

  // تحميل وعرض PDF باستخدام PDF.js
  const url = "Booklet-compressed.pdf";
  const container = document.getElementById("pdf-viewer");

  pdfjsLib.getDocument(url).promise.then(function(pdf) {
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      pdf.getPage(pageNum).then(function(page) {
        const scale = 1.2;
        const viewport = page.getViewport({ scale: scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        container.appendChild(canvas);

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    }
  });

  const footer = document.createElement('footer');
  footer.className = 'app-footer';
  footer.textContent = '© قطاع اللاهون';
  root.appendChild(footer);
}

document.addEventListener('DOMContentLoaded', init);
