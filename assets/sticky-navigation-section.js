document.addEventListener('DOMContentLoaded', () => {
  const stickyNav = document.querySelector('[data-sticky-nav]');
  const selectSizeBtn = document.querySelector('[data-select-size-btn]');
  const addToCartButton = document.querySelector('.product-form__submit');
  const stickyAddToCartButton = document.querySelector('.sticky-add-to-cart');

  /**
   * Checks if the element is visible in the viewport.
   * @param {HTMLElement} element - The element to check for visibility.
   * @returns {boolean} - True if the element is visible, false otherwise.
   */
  const isElementInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.bottom > 0 && // Element is at least partially visible vertically
      rect.right > 0 && // Element is at least partially visible horizontally
      rect.left < (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  /**
   * Toggles the visibility of the sticky navigation section
   * based on the visibility of the "Add to Cart" button.
   */
  const toggleStickyNav = () => {
    if (!isElementInViewport(addToCartButton)) {
      // Show sticky navigation if the "Add to Cart" button is not visible
      stickyNav.classList.add('show');
    } else {
      // Hide sticky navigation if the "Add to Cart" button is visible
      stickyNav.classList.remove('show');
    }
  };

  /**
   * Select Size Behaviour (goes to the top of the page)
   */
  selectSizeBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  /**
   * Add to Cart Behaviour
   */
  const handleStickyAddToCartClick = async () => {
    const spinner = stickyAddToCartButton.querySelector('.loading__spinner');

    stickyAddToCartButton.classList.add('loading');
    stickyAddToCartButton.disabled = true;
    spinner.classList.remove('hidden');

    addToCartButton?.click();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    stickyAddToCartButton.classList.remove('loading');
    stickyAddToCartButton.disabled = false;
    spinner.classList.add('hidden');
  };

  // Initialize the sticky "Add to Cart" button click event
  stickyAddToCartButton?.addEventListener('click', handleStickyAddToCartClick);

  // Initial check in case the page loads with the button out of view
  toggleStickyNav();

  // Add a scroll event listener to monitor changes in the viewport
  window.addEventListener('scroll', toggleStickyNav);

  // Optionally, monitor window resizing as well if layout changes on resize
  window.addEventListener('resize', toggleStickyNav);
});
