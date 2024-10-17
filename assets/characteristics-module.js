// Scroll Event Handling

// Cache the progress bar element to avoid repeated DOM lookups
const progressBar = document.querySelector('.multiple-progress-bar');

// Use requestAnimationFrame to optimize scroll handling
let isScrolling = false;

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const elementTop =
    progressBar.getBoundingClientRect().top + window.innerHeight;

  if (scrollPosition > elementTop) {
    progressBar.classList.add('progressbar-active');
  } else {
    progressBar.classList.remove('progressbar-active');
  }
  isScrolling = false;
};

window.addEventListener(
  'scroll',
  () => {
    if (!isScrolling) {
      requestAnimationFrame(handleScroll);
      isScrolling = true;
    }
  },
  {passive: true},
);

// Click Event Handling

document.addEventListener('click', (event) => {
  const target = event.target;
  const button = target.closest('.tooltip-btn');
  const closeButton = target.closest('.tooltip-close-btn');

  if (button || closeButton) {
    const leftHeading = target.closest('.left-heading');
    if (!leftHeading) return; // Prevent errors if the element is not found

    const tooltipPopup = leftHeading.querySelector('.main-tooltip-popup');
    if (!tooltipPopup) return;

    if (button) {
      tooltipPopup.classList.toggle('active');
    } else if (closeButton) {
      tooltipPopup.classList.remove('active');
    }
  }
});
