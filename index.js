import SwipeCarousel from './carousel/swipe-carousel.js'

const carousel = new SwipeCarousel({
  containerID: '#my-carousel',
  slideClass: '.slide',
})

const carousel2 = new SwipeCarousel({
  containerID: '#my-carousel-2',
  slideClass: '.slide',
  interval: 5000,
  autoplay: false,
  showBtnPlay: false,
})

const carousel3 = new SwipeCarousel({
  containerID: '#my-carousel-3',
  slideClass: '.slide',
  dotsPanel: false,
})



carousel.init()
carousel2.init()
carousel3.init()