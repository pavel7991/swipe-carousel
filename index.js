import SwipeCarousel from './carousel/swipe-carousel.js'

const carousel1 = new SwipeCarousel({
  containerID: '#my-carousel',
  slideClass: '.slide',
})

const carousel2 = new SwipeCarousel({
  containerID: '#my-carousel-2',
  interval: 4000,
  animate: 'parallax',
})

const carousel3 = new SwipeCarousel({
  containerID: '#my-carousel-3',
  slideClass: '.item',
  interval: 3000,
  animate: 'fade-scale',
  showBtnPlay: false,
})

const carousel4 = new SwipeCarousel({
  containerID: '#my-carousel-4',
  animate: 'flip',
  showBtnPlay: false,
  dotsPanel: false,
  autoplay: false
})


carousel1.init()
carousel2.init()
carousel3.init()
carousel4.init()