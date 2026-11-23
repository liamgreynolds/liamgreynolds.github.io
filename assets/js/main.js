// Liam Reynolds — portfolio: lightbox, full-map toggle, pamphlet slideshow.
(function () {
  // Lightbox: click any image to view it full-screen. Images inside links
  // (project grid cards) are skipped so they keep navigating instead.
  // Inside the lightbox: + / - buttons, mouse wheel and double-click zoom
  // further (up to 6x); drag to pan while zoomed. Close with the x, Esc,
  // or a click on the dark backdrop.
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  if (box && boxImg) {
    var zoomIn = document.getElementById('lb-zoom-in');
    var zoomOut = document.getElementById('lb-zoom-out');
    var scale = 1, tx = 0, ty = 0;
    boxImg.draggable = false;
    function apply() {
      boxImg.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
      boxImg.classList.toggle('zoomed', scale > 1);
      if (zoomOut) zoomOut.disabled = scale <= 1;
    }
    function setZoom(s) {
      scale = Math.min(6, Math.max(1, s));
      if (scale === 1) { tx = 0; ty = 0; }
      apply();
    }
    function reset() { scale = 1; tx = 0; ty = 0; apply(); }
    document.querySelectorAll('img').forEach(function (img) {
      if (img.id === 'lightbox-img' || img.closest('a')) return;
      img.classList.add('zoomable');
      img.addEventListener('click', function () {
        boxImg.src = img.currentSrc || img.src;
        boxImg.alt = img.alt || '';
        reset();
        box.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });
    function close() {
      box.hidden = true;
      boxImg.src = '';
      reset();
      document.body.style.overflow = '';
    }
    box.addEventListener('click', function (e) { if (e.target === box) close(); });
    var closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !box.hidden) close();
    });
    if (zoomIn) zoomIn.addEventListener('click', function () { setZoom(scale * 1.4); });
    if (zoomOut) zoomOut.addEventListener('click', function () { setZoom(scale / 1.4); });
    box.addEventListener('wheel', function (e) {
      e.preventDefault();
      setZoom(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15));
    }, { passive: false });
    boxImg.addEventListener('dblclick', function () { setZoom(scale > 1 ? 1 : 2.5); });
    var drag = null;
    boxImg.addEventListener('pointerdown', function (e) {
      if (scale <= 1) return;
      drag = { x: e.clientX - tx, y: e.clientY - ty };
      boxImg.setPointerCapture(e.pointerId);
      boxImg.classList.add('dragging');
    });
    boxImg.addEventListener('pointermove', function (e) {
      if (!drag) return;
      var mx = (scale - 1) * boxImg.offsetWidth / 2 + 80;
      var my = (scale - 1) * boxImg.offsetHeight / 2 + 80;
      tx = Math.min(mx, Math.max(-mx, e.clientX - drag.x));
      ty = Math.min(my, Math.max(-my, e.clientY - drag.y));
      apply();
    });
    ['pointerup', 'pointercancel'].forEach(function (ev) {
      boxImg.addEventListener(ev, function () {
        drag = null;
        boxImg.classList.remove('dragging');
      });
    });
  }

  // Chebeague: "View Full Map" toggle reveals the front-and-back image.
  var toggle = document.getElementById('fullmap-toggle');
  var fullmap = document.getElementById('fullmap');
  if (toggle && fullmap) {
    toggle.addEventListener('click', function () {
      var show = fullmap.hidden;
      fullmap.hidden = !show;
      toggle.textContent = show ? 'Hide Full Map' : 'View Full Map';
      if (show) fullmap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Vermont pamphlet slideshow.
  var show = document.getElementById('slideshow');
  if (show) {
    var slides = show.querySelectorAll('.slide');
    var cur = document.getElementById('slide-cur');
    var idx = 0;
    function go(n) {
      slides[idx].classList.remove('active');
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add('active');
      if (cur) cur.textContent = idx + 1;
    }
    show.querySelector('.prev').addEventListener('click', function () { go(idx - 1); });
    show.querySelector('.next').addEventListener('click', function () { go(idx + 1); });
  }
})();
