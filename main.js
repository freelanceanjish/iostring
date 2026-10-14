document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mainNav");
  const jumpLinks = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id], header[id]");
  const scrollOffset = 110;

  function onScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    }

    let activeId = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - scrollOffset) {
        activeId = section.id;
      }
    });

    const serviceIds = new Set(["agile", "data", "ai"]);
    jumpLinks.forEach((link) => {
      const href = link.getAttribute("href");
      let active = href === `#${activeId}`;
      if (href === "#services" && serviceIds.has(activeId)) active = true;
      link.classList.toggle("active", active);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const reveals = document.querySelectorAll(".io-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
});
