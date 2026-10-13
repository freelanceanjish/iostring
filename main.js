document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mainNav");
  const jumpLinks = document.querySelectorAll(".nav-item, .subnav-item");
  const sections = document.querySelectorAll("section[id], header[id]");
  const scrollOffset = 128;

  function onScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 16);
    }

    let activeId = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - scrollOffset) {
        activeId = section.id;
      }
    });
    jumpLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  }

  window.addEventListener("scroll", onScroll);
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
    { threshold: 0.12 }
  );
  reveals.forEach((el) => observer.observe(el));
});
