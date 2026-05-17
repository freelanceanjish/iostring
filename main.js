(function() {
  var elements = document.querySelectorAll('.io-reveal, .io-reveal-left, .io-reveal-right');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() { entry.target.classList.add('io-visible'); }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  elements.forEach(function(el) { observer.observe(el); });

  // Animate result numbers
  function animateNumber(el) {
    var target = parseFloat(el.textContent.replace(/[^0-9.]/g, ''));
    var suffix = el.textContent.replace(/[0-9.]/g, '');
    if (isNaN(target)) return;
    var start = 0; var duration = 1800;
    var step = function(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * ease * 10) / 10;
      el.textContent = (Number.isInteger(target) ? Math.round(current) : current) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  var resultObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var nums = entry.target.querySelectorAll('.io-result-num, .io-stat-num');
        nums.forEach(animateNumber);
        resultObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.io-results-grid, .io-stats-row').forEach(function(el) {
    resultObs.observe(el);
  });
})();