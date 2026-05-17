document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Navigation Controller & Sticky Scroll Handler
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    let activeId = "";
    sections.forEach((sect) => {
      if (window.scrollY >= (sect.offsetTop - 120)) {
        activeId = sect.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${activeId}`) link.classList.add("active");
    });
  });

  // 2. Element Scroll Intersection Reveal Engine
  const nodes = document.querySelectorAll('.reveal-node');
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        elementObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  nodes.forEach((n) => elementObserver.observe(n));

  // 3. Practice Capability Grid Filter Module
  const filterButtons = document.querySelectorAll(".dr-filter-btn");
  const serviceCards = document.querySelectorAll(".dr-service-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const targetFilter = btn.getAttribute("data-filter");

      serviceCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (targetFilter === "all" || cardCategory === targetFilter) {
          card.style.display = "block";
          setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 40);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => { card.style.display = "none"; }, 300);
        }
      });
    });
  });

  // 4. Numerical Telemetry Metrics Counter Acceleration Animation
  const numericMetrics = document.querySelectorAll(".dr-stat-num, .dr-hero-metric");
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const targetNum = parseFloat(element.innerText.replace(/[^0-9.]/g, ''));
        const unitSuffix = element.innerText.replace(/[0-9.]/g, '');
        if (isNaN(targetNum)) return;

        let currentNum = 0;
        const animationSteps = 50;
        const incrementValue = targetNum / animationSteps;
        let stepIndex = 0;

        const counterInterval = setInterval(() => {
          currentNum += incrementValue;
          stepIndex++;
          if (stepIndex >= animationSteps) {
            element.innerText = targetNum + unitSuffix;
            clearInterval(counterInterval);
          } else {
            element.innerText = (Number.isInteger(targetNum) ? Math.round(currentNum) : currentNum.toFixed(1)) + unitSuffix;
          }
        }, 25);
        metricsObserver.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  numericMetrics.forEach((m) => metricsObserver.observe(m));
});
