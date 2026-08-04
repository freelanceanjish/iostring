document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Interactive Top-Level Nav Visibility states & Scrollspy Engine
  const navigationContainer = document.getElementById("mainNav");
  const actionMenuLinks = document.querySelectorAll(".nav-item");
  const structuralPageSections = document.querySelectorAll("section, header");
  const heroSlides = document.querySelectorAll(".io-hero-slide");
  const heroFrames = document.querySelectorAll(".io-hero-frame");
  let activeSlideIndex = 0;
  let heroSlideTimer;

  function setHeroSlide(index) {
    activeSlideIndex = index;
    heroSlides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    heroFrames.forEach((frame, i) => {
      frame.classList.toggle("active", i === index);
      frame.setAttribute("aria-pressed", i === index ? "true" : "false");
    });
  }

  function startHeroRotation() {
    clearInterval(heroSlideTimer);
    heroSlideTimer = setInterval(() => {
      setHeroSlide((activeSlideIndex + 1) % heroSlides.length);
    }, 7000);
  }

  heroFrames.forEach((frame) => {
    frame.setAttribute("aria-pressed", frame.classList.contains("active") ? "true" : "false");
    frame.addEventListener("click", () => {
      setHeroSlide(Number(frame.getAttribute("data-slide")));
      startHeroRotation();
    });
  });

  if (heroSlides.length) {
    setHeroSlide(0);
    startHeroRotation();
  }

  function updateNavState() {
    if (window.scrollY > 40) {
      navigationContainer.classList.add("scrolled");
      navigationContainer.classList.remove("hero-top");
    } else {
      navigationContainer.classList.remove("scrolled");
      navigationContainer.classList.add("hero-top");
    }
  }

  window.addEventListener("scroll", () => {
    updateNavState();

    // Process section intersection coordinates dynamically
    let targetedSectionId = "";
    structuralPageSections.forEach((section) => {
      const depthOffset = section.offsetTop - 140;
      if (window.scrollY >= depthOffset) {
        targetedSectionId = section.getAttribute("id");
      }
    });

    actionMenuLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${targetedSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  updateNavState();

  // 2. Programmatic On-Scroll Reveal Observer Engine
  const animateReveals = document.querySelectorAll('.io-reveal, .io-reveal-left, .io-reveal-right');
  const scrollIntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, sequenceIdx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('io-visible');
        }, sequenceIdx * 50);
        scrollIntersectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  animateReveals.forEach((node) => scrollIntersectionObserver.observe(node));

  // 3. Practice area cross-filtering for services grid
  const dynamicFilterToggles = document.querySelectorAll(".io-svc-tab");
  const platformServiceCards = document.querySelectorAll(".io-service-card");

  dynamicFilterToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      dynamicFilterToggles.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      const operationalFilterTag = btn.getAttribute("data-filter");

      platformServiceCards.forEach((card) => {
        const structuralCategory = card.getAttribute("data-category");
        
        if (operationalFilterTag === "all" || structuralCategory === operationalFilterTag) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
          }, 30);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(12px) scale(0.98)";
          setTimeout(() => {
            card.style.display = "none";
          }, 280);
        }
      });
    });
  });
});
