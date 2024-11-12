(function () {
  const carousel = document.getElementById('carousel')
  const slides = carousel.querySelectorAll('.slide')

  // carousel-controls
  const nextBtn = carousel.querySelector('#next-btn')
  const prevBtn = carousel.querySelector('#prev-btn')
  const pausePlayBtn = carousel.querySelector('#pause-play-btn')

  //carousel-dots 
  const carouselDots = carousel.querySelector('#carousel-dots')
  const dots = carouselDots.querySelectorAll('.dot')

  // code keyboard
  const CODE_ARROW_LEFT = 'ArrowLeft'
  const CODE_ARROW_RIGHT = 'ArrowRight'
  const CODE_SPACE = 'Space'

  // icons
  const ICON_PAUSE = '<i class="fa-solid fa-pause"></i>'
  const ICON_PLAY = '<i class="fa-solid fa-play"></i>'

  const INTERVAL = 3000

  let currentSlide = 0
  let isPlaying = true
  let timerId = null
  let startPosX = null
  let endPosX = null

  function gotoSlide(n) {
    slides[currentSlide].classList.toggle('active')
    dots[currentSlide].classList.toggle('active')
    currentSlide = (n + slides.length) % slides.length
    slides[currentSlide].classList.toggle('active')
    dots[currentSlide].classList.toggle('active')
  }

  function prevSlide() {
    gotoSlide(currentSlide - 1)
  }
  function nextSlide() {
    gotoSlide(currentSlide + 1)
  }

  function pauseHandler() {
    if (!isPlaying) return
    clearInterval(timerId)
    pausePlayBtn.innerHTML = ICON_PLAY
    isPlaying = false
  }

  function playHandler() {
    pausePlayBtn.innerHTML = ICON_PAUSE
    isPlaying = true
    sliderAutoPlay()
  }

  function pausePlayHandler() {
    isPlaying ? pauseHandler() : playHandler()
  }

  function nextHandler() {
    pauseHandler()
    nextSlide()
  }

  function prevHandler() {
    pauseHandler()
    prevSlide()
  }

  function dotsHandler(e) {
    const { target } = e //  const target = e.target 
    if (target && target.classList.contains('dot')) {
      pauseHandler()
      gotoSlide(+target.dataset.slideTo)
    }
  }

  function pressKeyHandler(e) {
    const { code } = e
    if (code === CODE_ARROW_RIGHT) nextHandler()
    if (code === CODE_ARROW_LEFT) prevHandler()
    if (code === CODE_SPACE) {
      e.preventDefault()
      pausePlayHandler()
    }
  }

  function swipeStartHandler(e) {
    startPosX = e instanceof MouseEvent
      ? e.pageX // MouseEvent
      : e.changedTouches[0].pageX //TouchEvent
  }

  function swipeEndHandler(e) {
    console.log(e)
    endPosX = e instanceof MouseEvent
      ? endPosX = e.pageX // MouseEvent
      : e.changedTouches[0].pageX //TouchEvent
    if (endPosX - startPosX > 100) prevHandler()
    if (endPosX - startPosX < -100) nextHandler()

    console.log('swipeEndHandler', startPosX, endPosX);
  }

  function initListenners() {
    nextBtn.addEventListener('click', nextHandler)
    prevBtn.addEventListener('click', prevHandler)
    pausePlayBtn.addEventListener('click', pausePlayHandler)
    carouselDots.addEventListener('click', dotsHandler)
    document.addEventListener('keydown', pressKeyHandler)
    carousel.addEventListener('touchstart', swipeStartHandler)
    carousel.addEventListener('mousedown', swipeStartHandler)
    carousel.addEventListener('touchend', swipeEndHandler)
    carousel.addEventListener('mouseup', swipeEndHandler)
    carousel.addEventListener('dragstart', swipeEndHandler)
    carousel.addEventListener('dragend', swipeEndHandler)
  }

  function sliderAutoPlay() {
    timerId = setInterval(nextSlide, INTERVAL)
  }

  function init() {
    initListenners()
    sliderAutoPlay()
  }

  init()
}())




