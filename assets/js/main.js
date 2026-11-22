// Liam Reynolds — portfolio: lightbox, full-map toggle, pamphlet slideshow.
(function () {
  // Lightbox: click any .zoomable image to view it full-screen.
  var box = document.getElementById('lightbox');
  var boxImg = document.getElementById('lightbox-img');
  if (box && boxImg) {
    document.querySelectorAll('.zoomable').forEach(function (img) {
      img.addEventListener('click', function () {
        boxImg.src = img.currentSrc || img.src;
        boxImg.alt = img.alt || '';
        box.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });
    function close() {
      box.hidden = true;
      boxImg.src = '';
      document.body.style.overflow = '';
    }
    box.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !box.hidden) close();
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
