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


// ========================================
// Featured Products
// ========================================

const featuredList = document.querySelector(".featured-list");

const prevButton = document.querySelector(
  ".featured-navigation button:first-child"
);

const nextButton = document.querySelector(
  ".featured-navigation button:last-child"
);

const featuredItem = document.querySelector(".featured-item");

function getScrollAmount() {
  const gap = parseFloat(
    getComputedStyle(featuredList).gap
  ) || 0;

  return featuredItem.offsetWidth + gap;
}

nextButton.addEventListener("click", () => {
  featuredList.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth",
  });
});

prevButton.addEventListener("click", () => {
  featuredList.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth",
  });
});