document.addEventListener("DOMContentLoaded", function () {
  
  // 1. Interactive Top-Level Nav Visibility states & Scrollspy Engine
  const navigationContainer = document.getElementById("mainNav");
  const actionMenuLinks = document.querySelectorAll(".nav-item");
  const structuralPageSections = document.querySelectorAll("section, header");

  window.addEventListener("scroll", () => {
    // Nav bar sizing adjustment metrics
    if (window.scrollY > 40) {
      navigationContainer.classList.add("scrolled");
    } else {
      navigationContainer.classList.remove("scrolled");
    }

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

  // 3. Chapter 5 Practice Area Cross-Filtering Control Logic Matrix
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

  // 4. Live Counter Acceleration Engine for Quantifiable Analytics Strings
  const quantitativeMetrics = document.querySelectorAll(".io-result-num, .io-stat-num, .io-case-qstat-num");
  const metricsIntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const metricDOMNode = entry.target;
        const terminalTarget = parseFloat(metricDOMNode.innerText.replace(/[^0-9.]/g, ''));
        const semanticSuffix = metricDOMNode.innerText.replace(/[0-9.]/g, '');
        
        if (isNaN(terminalTarget)) return;

        let trackingBase = 0;
        const completeSteps = 60;
        const deltaIncremental = terminalTarget / completeSteps;
        let executionIndex = 0;

        const countingTimer = setInterval(() => {
          trackingBase += deltaIncremental;
          executionIndex++;
          
          if (executionIndex >= completeSteps) {
            metricDOMNode.innerText = terminalTarget + semanticSuffix;
            clearInterval(countingTimer);
          } else {
            metricDOMNode.innerText = (Number.isInteger(terminalTarget) ? Math.round(trackingBase) : trackingBase.toFixed(1)) + semanticSuffix;
          }
        }, 20);

        metricsIntersectionObserver.unobserve(metricDOMNode);
      }
    });
  }, { threshold: 0.1 });

  quantitativeMetrics.forEach((statNode) => metricsIntersectionObserver.observe(statNode));
});
