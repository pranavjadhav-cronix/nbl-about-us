class PromoBar extends HTMLElement {
  constructor() {
    super();
    this.isPaused = false;
    this.controlBtn = this.querySelector('.promo-bar-control');
    this.marquees = this.querySelectorAll('.marquee');
    this.playIcon = this.querySelector('.promo-bar-play-icon');
    this.pauseIcon = this.querySelector('.promo-bar-pause-icon');
    this.model = this.querySelector('.model-country-selector');
    this.btn = this.querySelector('.country-model-button');
    this.span = this.querySelector('.close');

    this.togglePlayPause = this.togglePlayPause.bind(this);
    this.modelOpen = this.modelOpen.bind(this);
    this.modelClose = this.modelClose.bind(this);
  }

  connectedCallback() {
    this.controlBtn.addEventListener('click', this.togglePlayPause);
    this.btn.addEventListener('click', this.modelOpen);
    this.span.addEventListener('click', this.modelClose);
  }

  disconnectedCallback() {
    this.controlBtn.removeEventListener('click', this.togglePlayPause);
    this.btn.removeEventListener('click', this.modelOpen);
    this.span.removeEventListener('click', this.modelClose);
  }

  modelOpen() {
    this.model.classList.add('modal-open');
    document.querySelector('body').classList.add('overflow-hidden');
  }

  modelClose() {
    this.model.classList.remove('modal-open');
    this.model.classList.remove('modal-open-footer');
    document.querySelector('body').classList.remove('overflow-hidden');
  }

  togglePlayPause() {
    this.isPaused = !this.isPaused;
    this.marquees.forEach((marquee) => {
      marquee.style.animationPlayState = this.isPaused ? 'paused' : 'running';
      marquee.setAttribute('aria-live', this.isPaused ? 'off' : 'polite');
    });
    this.updateButtonIcon();
  }

  updateButtonIcon() {
    this.playIcon.classList.toggle('hidden', !this.isPaused);
    this.pauseIcon.classList.toggle('hidden', this.isPaused);
    this.controlBtn.setAttribute('aria-pressed', isPaused);
  }
}

customElements.define('promo-bar', PromoBar);
