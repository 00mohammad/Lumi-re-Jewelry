const track = document.querySelector('.features-track');
const lists = document.querySelectorAll('.features-list');

if (track && lists.length) {
  let position = 0;
  const speed = 1;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function moveFeatures() {
    if (prefersReducedMotion) {
      return;
    }

    position -= speed;

    const firstListWidth = lists[0].getBoundingClientRect().width;

    if (Math.abs(position) >= firstListWidth) {
      position = 0;
    }

    track.style.transform = `translate3d(${position}px, 0, 0)`;
    requestAnimationFrame(moveFeatures);
  }

  requestAnimationFrame(moveFeatures);
}
