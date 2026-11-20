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

  startAutoPlay();
});