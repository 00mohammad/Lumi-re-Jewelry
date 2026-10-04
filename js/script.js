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

  track.style.transform = `translateX(${position}px`;

  requestAnimationFrame(moveFeatures);
}

moveFeatures();

const featuredList = document.querySelector(".featured-list");

const prevButton = document.querySelector(
  ".featured-navigation button:first-child",
);

const nextButton = document.querySelector(
  ".featured-navigation button:last-child",
);

const items = [...featuredList.querySelectorAll(".featured-item")];

let isScrolling = false;

function isMobileCarousel() {
  return window.innerWidth === 375 || window.innerWidth === 425;
}

function getItemWidth() {
  const item = featuredList.querySelector(".featured-item");

  if (!item) return 0;

  const gap = parseFloat(getComputedStyle(featuredList).gap) || 0;

  return item.offsetWidth + gap;
}

function enableCarousel() {
  if (!isMobileCarousel()) return;

  // Clone first items
  items.forEach((item) => {
    const clone = item.cloneNode(true);

    clone.classList.add("featured-clone");

    featuredList.appendChild(clone);
  });

  // Clone last items
  items.forEach((item) => {
    const clone = item.cloneNode(true);

    clone.classList.add("featured-clone");

    featuredList.insertBefore(clone, featuredList.firstChild);
  });

  // Start from original items
  const itemWidth = getItemWidth();

  featuredList.scrollLeft = itemWidth * items.length;
}

function smoothScroll(distance, duration = 700) {
  if (isScrolling) return;

  isScrolling = true;

  // Slow smooth scroll

  const start = featuredList.scrollLeft;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const ease = 1 - Math.pow(1 - progress, 3);

    featuredList.scrollLeft = start + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isScrolling = false;
      checkInfiniteLoop();
    }
  }

  requestAnimationFrame(animate);
}

function checkInfiniteLoop() {
  const itemWidth = getItemWidth();
  const totalWidth = itemWidth * items.length;

  if (featuredList.scrollLeft >= totalWidth * 2) {
    featuredList.scrollLeft -= totalWidth;
  }

  if (featuredList.scrollLeft <= 0) {
    featuredList.scrollLeft += totalWidth;
  }
}

nextButton.addEventListener("click", () => {
  if (!isMobileCarousel()) return;

  smoothScroll(getItemWidth());
});

prevButton.addEventListener("click", () => {
  if (!isMobileCarousel()) return;

  smoothScroll(-getItemWidth());
});

featuredList.addEventListener("scroll", () => {
  if (!isMobileCarousel()) return;

  checkInfiniteLoop();
});

enableCarousel();
