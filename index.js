import SwipeCarousel from './carousel/swipe-carousel.js'

const carousel = new SwipeCarousel()

const parallaxCarousel = new SwipeCarousel({
  containerID: '#parallax-carousel',
  slideClass: '.item',
  animate: 'parallax',
  interval: 4000,
})

const fadeScaleCarousel = new SwipeCarousel({
  containerID: '#fade-scale-carousel',
  interval: 3000,
  animate: 'fade-scale',
  showBtnPlay: false,
})

const flipCarousel = new SwipeCarousel({
  containerID: '#flip-carousel',
  animate: 'flip',
  showBtnPlay: false,
  dotsPanel: false,
  autoplay: false
})


carousel.init()
parallaxCarousel.init()
fadeScaleCarousel.init()
flipCarousel.init()





