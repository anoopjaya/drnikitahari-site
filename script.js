document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const dotsContainer = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const wrapper = document.getElementById("carouselWrapper");
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  let currentIndex = 0;
  let autoPlayTimer = null;

  // Create navigation dots
  slides.forEach((_, idx) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
    if (idx === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.querySelectorAll("button"));

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === currentIndex);
    });
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });

    const slideWidth = slides[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3800);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
    startAutoPlay();
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
    startAutoPlay();
  });

  // Pause rotation on hover so visitor can inspect the photo
  wrapper.addEventListener("mouseenter", stopAutoPlay);
  wrapper.addEventListener("mouseleave", startAutoPlay);
  window.addEventListener("resize", () => goToSlide(currentIndex));

  // Mobile menu toggle
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
// Close all dropdowns cleanly
  const dropdowns = Array.from(document.querySelectorAll(".navbar .dropdown"));

  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("open");
      const btn = dropdown.querySelector(".dropbtn");
      if (btn) {
        btn.setAttribute("aria-expanded", "false");
        if (document.activeElement === btn) {
          btn.blur();
        }
      }
    });
  }

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".dropbtn");
    if (!btn) return;

    const isLeadership = btn.textContent.includes("Leadership");

    btn.addEventListener("click", (e) => {
      if (isLeadership) {
        closeAllDropdowns();
        return; // Allow normal navigation to #recognition
      }

      e.preventDefault();
      const willOpen = !dropdown.classList.contains("open");
      closeAllDropdowns();

      if (willOpen) {
        dropdown.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close open dropdown when clicking outside or on another navbar link
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar .dropdown")) {
      closeAllDropdowns();
    }
  });

  // Close dropdown after selecting an item inside it
  document.querySelectorAll(".navbar .dropdown-content a").forEach((link) => {
    link.addEventListener("click", () => {
      closeAllDropdowns();
    });
  });
  startAutoPlay();
});