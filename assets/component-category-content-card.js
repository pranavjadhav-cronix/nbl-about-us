window.addEventListener('load', () => {
  const mobilePaddingLeft = 16;

  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const scrollEventHandle = (rootEl, nextIndex) => {
    const scroll = rootEl.querySelector(
      '.category-content-card-cards:not([hidden]) .category-content-card-cards-scroll',
    );
    const list = scroll.previousElementSibling;
    if (list.tagName !== 'OL') {
      return;
    }
    const sliders = scroll.querySelectorAll('.category-content-card-slider');
    let index = -1;
    for (let i = 0; i < sliders.length; i++) {
      if (sliders[i].classList.contains('active')) {
        index = i + nextIndex;
        break;
      }
    }
    if (index < 0 || index > sliders.length - 1) {
      return;
    }
    sliders.forEach((slider, i) => {
      if (i === index) {
        slider.classList.add('active');
        if (i === 0 || i === sliders.length - 1) {
          slider.setAttribute('disabled', 'disabled');
        }
      } else {
        slider.classList.remove('active');
        slider.removeAttribute('disabled');
      }
    });
    if (index === 0) {
      scroll
        .querySelector('.category-content-card-control-previous')
        .setAttribute('disabled', 'disabled');
    } else {
      scroll
        .querySelector('.category-content-card-control-previous')
        .removeAttribute('disabled');
    }
    if (index === sliders.length - 1) {
      scroll
        .querySelector('.category-content-card-control-next')
        .setAttribute('disabled', 'disabled');
    } else {
      scroll
        .querySelector('.category-content-card-control-next')
        .removeAttribute('disabled');
    }
    const rect = list.children[index].getBoundingClientRect();
    list.scrollLeft += rect.left - mobilePaddingLeft;
  };

  document.querySelectorAll('.category-content-card').forEach((rootEl) => {
    document
      .querySelectorAll('.category-content-card-cards ol')
      .forEach((card) => {
        card.addEventListener(
          'scroll',
          debounce(() => {
            let activeItem;
            let scrollItem;
            const activeSliders = rootEl.querySelectorAll(
              '.category-content-card-cards:not([hidden]) .category-content-card-cards-scroll .category-content-card-slider',
            );
            if (card.scrollLeft >= card.scrollWidth - card.clientWidth) {
              scrollItem = card.children.length - 1;
            }
            for (
              let i = 0;
              i < card.children.length &&
              (activeItem === undefined || scrollItem === undefined);
              i++
            ) {
              if (
                activeItem === undefined &&
                activeSliders[i].classList.contains('active')
              ) {
                activeItem = i;
              }
              if (
                scrollItem === undefined &&
                card.children[i].getBoundingClientRect().left -
                  mobilePaddingLeft >=
                  0
              ) {
                scrollItem = i;
              }
            }
            scrollEventHandle(rootEl, scrollItem - activeItem);
          }, 100),
        );
      });

    const controlButtons = document.querySelectorAll(
      '.category-content-card-controls button',
    );
    controlButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const nextIndex = event.currentTarget.classList.contains(
          'category-content-card-control-previous',
        )
          ? -1
          : 1;
        scrollEventHandle(rootEl, nextIndex);
      });
    });
  });
});
