document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mainNav");
  const jumpLinks = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll("section[id], header[id], article[id]");
  const scrollOffset = 100;

  function onScroll() {
    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 12);
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

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const drawer = document.querySelector(".io-nav-drawer");
  if (drawer) {
    drawer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => drawer.removeAttribute("open"));
    });
  }

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
    { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
  );
  reveals.forEach((el) => observer.observe(el));
});
