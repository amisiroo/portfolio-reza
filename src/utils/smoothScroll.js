/**
 * RAF-based smooth scroll — zero dependencies, deterministic easing.
 * easeInOutCubic: t < .5 ? 4t^3 : (t-1)(2t-2)^2 + 1
 */
export function smoothScrollTo(targetY, duration = 450) {
  const startY = window.pageYOffset || document.documentElement.scrollTop;
  const diff = targetY - startY;
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}
