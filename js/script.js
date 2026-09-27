const track = document.querySelector(".features-track");
const lists = document.querySelectorAll(".features-list");

let position = 0;
const speed = 1;

function moveFeatures() {
  position -= speed;

  const firstListWidth = lists[0].offsetWidth;

  if (Math.abs(position) >= firstListWidth) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;

  requestAnimationFrame(moveFeatures);
}

moveFeatures();