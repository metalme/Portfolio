const themeToggle = document.querySelector(".theme-toggle");
const sideLinks = document.querySelectorAll(".side-link");
const sections = [...sideLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
});

function setActiveLink() {
  let currentSection = sections[0];

  sections.forEach((section) => {
    const box = section.getBoundingClientRect();
    if (box.top <= 160) {
      currentSection = section;
    }
  });

  if (!currentSection) {
    return;
  }

  sideLinks.forEach((link) => {
    link.classList.toggle(
      "is-active",
      link.getAttribute("href") === `#${currentSection.id}`
    );
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();

// Galería de proyecto: abrir / cerrar overlay
document.addEventListener("DOMContentLoaded", () => {
  const galleryToggle = document.querySelector(".gallery-toggle");
  const overlay = document.getElementById("galleryOverlay");
  const closeBtn = overlay?.querySelector(".gallery-close");

  function openGallery() {
    if (!overlay) return;
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGallery() {
    if (!overlay) return;
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryToggle?.addEventListener("click", openGallery);
  closeBtn?.addEventListener("click", closeGallery);

  // Cerrar galería al hacer click en el fondo (si no hay lightbox abierto)
  overlay?.addEventListener("click", (e) => {
    const lightbox = document.getElementById("lightbox");
    const lightboxOpen = lightbox && lightbox.getAttribute("aria-hidden") === "false";
    if (lightboxOpen) {
      // Si se hace click fuera de la imagen (en el fondo del lightbox), cerrar lightbox
      if (e.target === lightbox) {
        lightbox.setAttribute("aria-hidden", "true");
      }
      return;
    }

    if (e.target === overlay) closeGallery();
  });

  document.addEventListener("keydown", (e) => {
    const lightbox = document.getElementById("lightbox");
    const lightboxOpen = lightbox && lightbox.getAttribute("aria-hidden") === "false";
    if (e.key === "Escape") {
      if (lightboxOpen) {
        lightbox.setAttribute("aria-hidden", "true");
      } else if (overlay && overlay.getAttribute("aria-hidden") === "false") {
        closeGallery();
      }
    }
  });

  // Lightbox: abrir imagen en tamaño completo al hacer click, con navegación prev/next
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const lightboxClose = lightbox?.querySelector(".lightbox-close");
  const lightboxPrev = lightbox?.querySelector(".lightbox-prev");
  const lightboxNext = lightbox?.querySelector(".lightbox-next");
  const galleryImages = overlay?.querySelectorAll(".gallery-grid img") || [];

  const imageSrcList = Array.from(galleryImages).map((i) => i.src);
  let currentIndex = -1;

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Imagen";
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  // Reemplazo con transición suave: preload + fade
  function openLightboxByIndex(index) {
    if (index < 0 || index >= imageSrcList.length) return;
    currentIndex = index;
    const newSrc = imageSrcList[currentIndex];
    const newAlt = galleryImages[currentIndex]?.alt || "Imagen";
    if (!lightbox || !lightboxImg) return;

    const isClosed = lightbox.getAttribute("aria-hidden") === "true";

    const preload = new Image();
    preload.src = newSrc;
    preload.onload = () => {
      if (isClosed) {
        // Abrir lightbox y animar entrada
        lightboxImg.style.opacity = 0;
        lightboxImg.style.transform = "scale(0.98)";
        lightboxImg.src = newSrc;
        lightboxImg.alt = newAlt;
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        requestAnimationFrame(() => {
          lightboxImg.style.opacity = 1;
          lightboxImg.style.transform = "scale(1)";
        });
        return;
      }

      // Ya abierto: animar cambio
      lightboxImg.style.opacity = 0;
      lightboxImg.style.transform = "scale(0.98)";
      setTimeout(() => {
        lightboxImg.src = newSrc;
        lightboxImg.alt = newAlt;
        requestAnimationFrame(() => {
          lightboxImg.style.opacity = 1;
          lightboxImg.style.transform = "scale(1)";
        });
      }, 260);
    };
  }

  function prevImage() {
    if (imageSrcList.length === 0) return;
    currentIndex = (currentIndex - 1 + imageSrcList.length) % imageSrcList.length;
    openLightboxByIndex(currentIndex);
  }

  function nextImage() {
    if (imageSrcList.length === 0) return;
    currentIndex = (currentIndex + 1) % imageSrcList.length;
    openLightboxByIndex(currentIndex);
  }

  galleryImages.forEach((img, idx) => {
    img.addEventListener("click", (e) => {
      openLightboxByIndex(idx);
    });
  });

  lightboxPrev?.addEventListener("click", (e) => {
    e.stopPropagation();
    prevImage();
  });

  lightboxNext?.addEventListener("click", (e) => {
    e.stopPropagation();
    nextImage();
  });

  lightboxClose?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  // cerrar lightbox al hacer click fuera de la imagen
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // navegación por teclado
  document.addEventListener("keydown", (e) => {
    if (lightbox && lightbox.getAttribute("aria-hidden") === "false") {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    }
  });
});
