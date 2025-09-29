function createHeader() {
  const h = document.createElement('header');
  h.className = 'app-header';
  h.innerHTML = `
    <img src="lahun-logo.jpeg" alt="logo" class="logo">
    <h1 class="gold-text">قطاع اللاهون - الكتيب</h1>

    <!-- أزرار للكمبيوتر -->
    <nav class="header-nav desktop-nav">
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

    <!-- قائمة منسدلة للموبايل -->
     <div class="mobile-nav">
      <select id="mobile-select">
       <option value="">اختر القسم</option>
        <option value="1-4">المقدمة</option>
         <option value="5-5">الرؤية والرسالة</option>
          <option value="6-6">الأهداف الاستراتيجية</option>
           <option value="7-7">الرؤية المستقبلية</option> 
           <option value="8-21">المنشآت والمصادر الحيوية</option> 
           <option value="22-22">بيانات ومساحات القطاع</option> 
           <option value="23-23">تطور المساحات المنزرعة</option>
            <option value="24-27">المنتجات المنزرعة</option> 
            <option value="28-28">القيمة الإيجارية للصوب</option>
             <option value="29-36">الخدمات وآلية العمل</option> 
             <option value="37-40">شركاء النجاح</option>
              </select>
               </div>
  `;
  return h;
}

function init() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(createHeader());

  const container = document.getElementById("pdf-viewer");
  container.innerHTML = `<div id="loader"></div><div id="pdf-pages"></div>`;

  const url = "Booklet-compressed.pdf";
  let pdfDoc = null;

  pdfjsLib.getDocument(url).promise.then(function(pdf) {
    pdfDoc = pdf;
    renderPageRange(1, 4); // افتراضياً المقدمة
  });

  function renderPageRange(start, end) {
    const viewer = document.getElementById("pdf-pages");
    viewer.innerHTML = "";
    document.getElementById("loader").style.display = "block";

    let rendered = 0;
    for (let num = start; num <= end && num <= pdfDoc.numPages; num++) {
      pdfDoc.getPage(num).then(function(page) {
        const scale = 1.2;
        const viewport = page.getViewport({ scale: scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        viewer.appendChild(canvas);

        page.render({ canvasContext: ctx, viewport: viewport }).promise.then(() => {
          rendered++;
          if (rendered === (end - start + 1)) {
            document.getElementById("loader").style.display = "none";
          }
        });
      });
    }
  }

  // أزرار الكمبيوتر
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-btn")) {
      const start = parseInt(e.target.getAttribute("data-start"));
      const end = parseInt(e.target.getAttribute("data-end"));
      if (pdfDoc) renderPageRange(start, end);
    }
  });

  // قائمة الموبايل
  document.addEventListener("change", (e) => {
    if (e.target.id === "mobile-select" && e.target.value) {
      const [start, end] = e.target.value.split("-").map(Number);
      if (pdfDoc) renderPageRange(start, end);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
