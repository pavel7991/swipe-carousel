import SwipeCarousel from './carousel/swipe-carousel.js'

const carousel = new SwipeCarousel({
  container: '#my-carousel',
  slideClass: '.slide',
  interval: 2000,
  autoplay: false,
  dotsPanel: true,
  showBtnPlay: false,
})

carousel.init()