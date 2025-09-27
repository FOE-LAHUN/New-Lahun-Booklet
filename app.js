function createHeader() {
  const h = document.createElement('header');
  h.className = 'app-header';
  h.innerHTML = `
    <img src="lahun-logo.jpeg" alt="logo" class="logo">
    <h1 class="gold-text">قطاع اللاهون - الكتيب</h1>
    <nav class="header-nav">
      <button class="nav-btn" data-start="1" data-end="4">المقدمة</button>
      <button class="nav-btn" data-start="5" data-end="5">الرؤية والرسالة</button>
      <button class="nav-btn" data-start="6" data-end="6">الأهداف الاستراتيجية</button>
      <button class="nav-btn" data-start="7" data-end="7">الرؤية المستقبلية</button>
      <button class="nav-btn" data-start="9" data-end="19">المنشآت والمصادر الحيوية</button>
      <button class="nav-btn" data-start="20" data-end="20">بيانات ومساحات القطاع</button>
      <button class="nav-btn" data-start="21" data-end="21">تطور المساحات المنزرعة</button>
      <button class="nav-btn" data-start="22" data-end="22">المنتجات المنزرعة</button>
      <button class="nav-btn" data-start="23" data-end="23">القيمة الإيجارية للصوب</button>
      <button class="nav-btn" data-start="24" data-end="30">الخدمات وآلية العمل</button>
      <button class="nav-btn" data-start="31" data-end="33">شركاء النجاح</button>
    </nav>
  `;
  return h;
}

function init() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(createHeader());

  const container = document.getElementById("pdf-viewer");
  container.innerHTML = `<div id="pdf-pages"></div>`;

  const url = "Booklet-compressed.pdf";
  let pdfDoc = null;

  pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdfDoc = pdf;
    // افتراضياً نعرض المقدمة
    renderPageRange(1, 4);
  });

  function renderPageRange(start, end) {
    const viewer = document.getElementById("pdf-pages");
    viewer.innerHTML = ""; // امسح أي محتوى قديم

    for (let num = start; num <= end && num <= pdfDoc.numPages; num++) {
      pdfDoc.getPage(num).then(function(page) {
        const scale = 1.2;
        const viewport = page.getViewport({ scale: scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        viewer.appendChild(canvas);

        page.render({ canvasContext: ctx, viewport: viewport });
      });
    }
  }

  // ربط الأزرار بالصفحات
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-btn")) {
      const start = parseInt(e.target.getAttribute("data-start"));
      const end = parseInt(e.target.getAttribute("data-end"));
      if (pdfDoc) {
        renderPageRange(start, end);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
