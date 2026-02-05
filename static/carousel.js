class Carousel {
  constructor(selector) {
    this.carousel = document.querySelector(selector);
    this.slides = this.carousel.querySelectorAll('.slide');
    this.currentIndex = 0;
    
    this.prevBtn = this.carousel.querySelector('.prev');
    this.nextBtn = this.carousel.querySelector('.next');
    
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.updateSlides();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlides();
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - this.currentIndex)}%)`;
    });
  }
}

// 初始化轮播
document.addEventListener('DOMContentLoaded', () => {
  new Carousel('.carousel-container');
});
