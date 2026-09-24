document.addEventListener("DOMContentLoaded", function () {
  const navigationContainer = document.getElementById("mainNav");
  const actionMenuLinks = document.querySelectorAll(".nav-item");
  const structuralPageSections = document.querySelectorAll("section[id], header[id]");

  function updateNavState() {
    if (window.scrollY > 24) {
      navigationContainer.classList.add("scrolled");
    } else {
      navigationContainer.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", () => {
    updateNavState();

    let targetedSectionId = "";
    structuralPageSections.forEach((section) => {
      const depthOffset = section.offsetTop - 120;
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

  const animateReveals = document.querySelectorAll(".io-reveal");
  const scrollIntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("io-visible");
          scrollIntersectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  animateReveals.forEach((node) => scrollIntersectionObserver.observe(node));
});
