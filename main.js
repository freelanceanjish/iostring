document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 8) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
});
