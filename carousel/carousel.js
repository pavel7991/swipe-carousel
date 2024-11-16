class Carousel {
  constructor(params) {
    const settings = this._initConfig(params)

    this.container = document.querySelector(settings.container)
    this.slides = this.container.querySelectorAll(settings.slideClass)
    this.INTERVAL = settings.interval
    this.isPlaying = settings.autoplay
    this.dotsPanel = settings.dotsPanel
    this.showBtnPlay = settings.showBtnPlay
  }

  _initConfig(objWithInnerParams) {
    const defaultSettings = {
      container: '#carousel',
      slideClass: '.slide',
      interval: 2000,
      autoplay: true,
      dotsPanel: true,
      showBtnPlay: true,
    }
    // resultObj.container = objWithInnerParams.container || defaultSettings.container
    // resultObj.slideClass = objWithInnerParams.slideClass || defaultSettings.slideClass
    // resultObj.interval = objWithInnerParams.interval || defaultSettings.interval
    return { ...defaultSettings, ...objWithInnerParams }
  }

  _initProps() {
    this.currentSlide = 0

    this.SLIDES_COUNT = this.slides.length

    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'

    this.ICON_PAUSE = '<i class="fa-solid fa-pause"></i>'
    this.ICON_PLAY = '<i class="fa-solid fa-play"></i>'
    this.ICON_PREV = '<i class="fa-solid fa-angle-left"></i>'
    this.ICON_NEXT = '<i class="fa-solid fa-angle-right"></i>'
  }

  _initControls() {
    const controls = document.createElement('div')
    const PAUSE = this.showBtnPlay ? `<div id="pause-play-btn" class="pause-btn">
        ${this.isPlaying ? this.ICON_PAUSE : this.ICON_PLAY}
      </div>` : ``;
    const PREV = `<div id="prev-btn" class="next-prev-btn">${this.ICON_PREV}</div>`
    const NEXT = `<div id="next-btn" class="next-prev-btn">${this.ICON_NEXT}</div>`

    controls.innerHTML = PREV + PAUSE + NEXT
    controls.setAttribute('id', 'carousel-controls')
    controls.setAttribute('class', 'carousel-controls')
    this.container.appendChild(controls)

    this.nextBtn = this.container.querySelector('#next-btn')
    this.prevBtn = this.container.querySelector('#prev-btn')
    this.showBtnPlay && (this.pausePlayBtn = this.container.querySelector('#pause-play-btn'))
  }

  _initDots() {
    if (!this.dotsPanel) return
    const dotsPanel = document.createElement('ul')
    dotsPanel.setAttribute('id', 'carousel-dots')
    dotsPanel.setAttribute('class', 'carousel-dots')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const dot = document.createElement('li')
      dot.setAttribute('class', i ? 'dot' : 'dot active')
      dot.dataset.slideTo = `${i}`
      dotsPanel.append(dot)
    }
    this.container.append(dotsPanel)
    this.carouselDots = this.container.querySelector('#carousel-dots')
    this.dots = this.carouselDots.querySelectorAll('.dot')
  }

  _gotoSlide(n) {
    this.slides[this.currentSlide].classList.toggle('active')
    this.dotsPanel && this.dots[this.currentSlide].classList.toggle('active')
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT
    this.slides[this.currentSlide].classList.toggle('active')
    this.dotsPanel && this.dots[this.currentSlide].classList.toggle('active')
  }


  _prevSlide() {
    this._gotoSlide(this.currentSlide - 1)
  }

  _nextSlide() {
    this._gotoSlide(this.currentSlide + 1)
  }

  pause() {
    if (!this.isPlaying) return
    clearInterval(this.timerId)
    this.pausePlayBtn.innerHTML = this.ICON_PLAY
    this.isPlaying = false
  }

  play() {
    clearInterval(this.timerId);
    this.pausePlayBtn.innerHTML = this.ICON_PAUSE
    this.isPlaying = true
    this._sliderAutoPlay()
  }

  pausePlay() {
    this.isPlaying ? this.pause() : this.play()
  }

  next() {
    this.pause()
    this._nextSlide()
  }

  prev() {
    this.pause()
    this._prevSlide()
  }

  _dots(e) {
    const { target } = e //  const target = e.target
    if (target && target.classList.contains('dot')) {
      this.pause()
      this._gotoSlide(+target.dataset.slideTo)
    }
  }

  _pressKey(e) {
    const { code } = e
    if (code === this.CODE_ARROW_RIGHT) this.next()
    if (code === this.CODE_ARROW_LEFT) this.prev()
    if (code === this.CODE_SPACE) {
      e.preventDefault()
      this.pausePlay()
    }
  }

  _initListenners() {
    this.nextBtn.addEventListener('click', this.next.bind(this))
    this.prevBtn.addEventListener('click', this.prev.bind(this))
    this.showBtnPlay && this.pausePlayBtn.addEventListener('click', this.pausePlay.bind(this))
    document.addEventListener('keydown', this._pressKey.bind(this))
    this.dotsPanel && this.carouselDots.addEventListener('click', this._dots.bind(this))
  }

  _sliderAutoPlay() {
    if (!this.isPlaying) return
    this.timerId = setInterval(() => this._nextSlide(), this.INTERVAL)
  }

  init() {
    this._initProps()
    this._initControls()
    this._initDots()
    this._initListenners()
    this._sliderAutoPlay()
  }
}

export default Carousel