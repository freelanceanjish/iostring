document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id], header[id]");

  function onScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 16);
    }

    let activeId = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        activeId = section.id;
      }
    });
    navLinks.forEach((link) => {
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
