document.addEventListener("DOMContentLoaded", function () {
  // background parallax, mirrors the Wix "reveal" scroll effect
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var layers = Array.prototype.slice.call(document.querySelectorAll(".parallax-bg"));
  if (layers.length && !reduceMotion) {
    var ticking = false;
    var updateParallax = function () {
      var viewportH = window.innerHeight;
      layers.forEach(function (layer) {
        var rect = layer.parentElement.getBoundingClientRect();
        var progress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
        layer.style.transform = "translateY(" + (progress * -40) + "px)";
      });
      ticking = false;
    };
    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateParallax();
  }

  var toggle = document.querySelector(".menu-toggle");
  var links = document.querySelector("nav.links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var closeBtn = lightbox.querySelector(".close");
    document.querySelectorAll(".gallery img").forEach(function (img) {
      img.addEventListener("click", function () {
        lightboxImg.src = img.src;
        lightbox.classList.add("open");
      });
    });
    closeBtn.addEventListener("click", function () {
      lightbox.classList.remove("open");
    });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
  }
});
