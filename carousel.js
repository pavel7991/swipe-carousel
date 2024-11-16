function Carousel(containerId = 'carousel', slideClass = '.slide', interval = 2000) {
  this.container = document.getElementById(containerId)
  this.slides = this.container.querySelectorAll(slideClass)
  this.INTERVAL = interval
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0
    this.isPlaying = true
    this.SLIDES_COUNT = this.slides.length

    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'

    this.ICON_PAUSE = '<i class="fa-solid fa-pause"></i>'
    this.ICON_PLAY = '<i class="fa-solid fa-play"></i>'
  },

  _initControls() {
    const controls = document.createElement('div')
    const PAUSE = `<div id="pause-play-btn" class="pause-btn">
        <i class="fa-solid fa-pause"></i>
      </div>`
    const PREV = `<div id="prev-btn" class="next-prev-btn">
        <i class="fa-solid fa-angle-left"></i>
      </div>`
    const NEXT = `<div id="next-btn" class="next-prev-btn">
        <i class="fa-solid fa-angle-right"></i>
      </div>`

    controls.innerHTML = PREV + PAUSE + NEXT
    controls.setAttribute('id', 'carousel-controls')
    controls.setAttribute('class', 'carousel-controls')
    this.container.appendChild(controls)

    this.nextBtn = this.container.querySelector('#next-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.pausePlayBtn = this.container.querySelector('#pause-play-btn')
  },

  _initDots() {
    const dotsPanel = document.createElement('ul')
    dotsPanel.setAttribute('id', 'carousel-dots')
    dotsPanel.setAttribute('class', 'carousel-dots')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      console.log(i)
      const dot = document.createElement('li')
      dot.setAttribute('class', i ? 'dot' : 'dot active')
      dot.dataset.slideTo = `${i}`
      dotsPanel.append(dot)
    }
    this.container.append(dotsPanel)
    this.carouselDots = this.container.querySelector('#carousel-dots')
    this.dots = this.carouselDots.querySelectorAll('.dot')
  },

  _gotoSlide(n) {
    this.slides[this.currentSlide].classList.toggle('active')
    this.dots[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
    this.slides[this.currentSlide].classList.toggle('active')
    this.dots[this.currentSlide].classList.toggle('active')
  },

  _prevSlide() {
    this._gotoSlide(this.currentSlide - 1)
  },

  _nextSlide() {
    this._gotoSlide(this.currentSlide + 1)
  },

  pause() {
    if (!this.isPlaying) return
    clearInterval(this.timerId)
    this.pausePlayBtn.innerHTML = this.ICON_PLAY
    this.isPlaying = false
  },

  play() {
    clearInterval(this.timerId);
    this.pausePlayBtn.innerHTML = this.ICON_PAUSE
    this.isPlaying = true
    this._sliderAutoPlay()
  },

  pausePlay() {
    this.isPlaying ? this.pause() : this.play()
  },

  next() {
    this.pause()
    this._nextSlide()
  },

  prev() {
    this.pause()
    this._prevSlide()
  },

  _dots(e) {
    const { target } = e //  const target = e.target
    if (target && target.classList.contains('dot')) {
      this.pause()
      this._gotoSlide(+target.dataset.slideTo)
    }
  },

  _pressKey(e) {
    const { code } = e
    if (code === this.CODE_ARROW_RIGHT) this.next()
    if (code === this.CODE_ARROW_LEFT) this.prev()
    if (code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlay()
    }
  },

  _initListenners() {
    this.nextBtn.addEventListener('click', this.next.bind(this))
    this.prevBtn.addEventListener('click', this.prev.bind(this))
    this.pausePlayBtn.addEventListener('click', this.pausePlay.bind(this))
    this.carouselDots.addEventListener('click', this._dots.bind(this))
    document.addEventListener('keydown', this._pressKey.bind(this))
  },

  _sliderAutoPlay() {
    this.timerId = setInterval(() => this._nextSlide(), this.INTERVAL)
  },

  init() {
    this._initProps()
    this._initControls()
    this._initDots()
    this._initListenners()
    this._sliderAutoPlay()
  },
}
Carousel.prototype.constructor = Carousel