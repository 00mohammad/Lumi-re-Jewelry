const featuredList = document.querySelector(".featured-list");

const prevButton = document.querySelector(
  ".featured-navigation button:first-child",
);

const nextButton = document.querySelector(
  ".featured-navigation button:last-child",
);

const items = [...featuredList.querySelectorAll(".featured-item")];

const gap =
  parseFloat(getComputedStyle(featuredList).gap) || 0;

const itemWidth = items[0].offsetWidth + gap;


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

  featuredList.insertBefore(
    clone,
    featuredList.firstChild,
  );
});


// Start from the original first item

featuredList.scrollLeft =
  itemWidth * items.length;


// Slow smooth scroll

function smoothScroll(distance, duration = 1000) {
  const start = featuredList.scrollLeft;
  const startTime = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(
      elapsed / duration,
      1,
    );

    const ease =
      1 - Math.pow(1 - progress, 3);

    featuredList.scrollLeft =
      start + distance * ease;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}


// Next

nextButton.addEventListener("click", () => {
  smoothScroll(itemWidth, 1000);
});


// Previous

prevButton.addEventListener("click", () => {
  smoothScroll(-itemWidth, 1000);
});


// Infinite loop

featuredList.addEventListener("scroll", () => {
  const totalWidth =
    itemWidth * items.length;

  if (
    featuredList.scrollLeft >=
    totalWidth * 2
  ) {
    featuredList.scrollLeft -= totalWidth;
  }

  if (featuredList.scrollLeft <= 0) {
    featuredList.scrollLeft += totalWidth;
  }
});