class Carousel {
  constructor(params) {
    const settings = this._initConfig(params)

    this.nameID = settings.containerID.slice(1)
    this.containerID = document.querySelector(settings.containerID)
    this.slides = this.containerID.querySelectorAll(settings.slideClass)
    this.INTERVAL = settings.interval
    this.isPlaying = settings.autoplay
    this.dotsPanel = settings.dotsPanel
    this.showBtnPlay = settings.showBtnPlay
    this.animate = settings.animate
    this.isHovered = false
  }

  _initConfig(objWithInnerParams) {
    const defaultSettings = {
      containerID: '#my-carousel',
      slideClass: '.slide',
      interval: 2000,
      autoplay: true,
      dotsPanel: true,
      showBtnPlay: true,
      animate: false,
    }
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
  _initClassElemets() {
    this.animate
      ? this.containerID.classList.add('carousel', `${this.animate}`)
      : this.containerID.classList.add('carousel')

    const containerSlides = document.createElement('div');
    containerSlides.classList.add('slides-container');

    this.slides.forEach(slide => {
      slide.classList.add('slide')
      containerSlides.appendChild(slide)
    })
    this.containerID.appendChild(containerSlides);
  }

  _prefixedID(prefix) {
    return `${prefix}-${this.nameID}`
  }

  _initControls() {
    const controls = document.createElement('div')

    const ID_PREV = this._prefixedID('prev-btn')
    const ID_NEXT = this._prefixedID('next-btn')
    const ID_PAUSE = this._prefixedID('pause-play-btn')

    const PAUSE = this.showBtnPlay ? `<div id="${ID_PAUSE}" class="pause-btn">
        ${this.isPlaying ? this.ICON_PAUSE : this.ICON_PLAY}
      </div>` : ``;
    const PREV = `<div id="${ID_PREV}" class="controls-btn">${this.ICON_PREV}</div>`
    const NEXT = `<div id="${ID_NEXT}" class="controls-btn">${this.ICON_NEXT}</div>`

    controls.innerHTML = PREV + PAUSE + NEXT
    controls.setAttribute('id', this._prefixedID('carousel-controls'))
    controls.setAttribute('class', 'carousel-controls')
    this.containerID.appendChild(controls)

    this.nextBtn = this.containerID.querySelector(`#${ID_NEXT}`)
    this.prevBtn = this.containerID.querySelector(`#${ID_PREV}`);
    this.showBtnPlay && (this.pausePlayBtn = this.containerID.querySelector(`#${ID_PAUSE}`))
  }

  _initDots() {
    if (!this.dotsPanel) return
    const dotsPanel = document.createElement('ul')
    const ID_DOTS_PANEL = this._prefixedID('carousel-dots')
    dotsPanel.setAttribute('id', ID_DOTS_PANEL)
    dotsPanel.setAttribute('class', 'carousel-dots')

    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const dot = document.createElement('li')
      dot.setAttribute('class', i ? 'dot' : 'dot active')
      dot.dataset.slideTo = `${i}`
      dotsPanel.append(dot)
    }
    this.containerID.append(dotsPanel)
    this.carouselDots = this.containerID.querySelector(`#${ID_DOTS_PANEL}`)
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
    this.showBtnPlay && (this.pausePlayBtn.innerHTML = this.ICON_PLAY)
    this.isPlaying = false
  }

  play() {
    clearInterval(this.timerId);
    this.showBtnPlay && (this.pausePlayBtn.innerHTML = this.ICON_PAUSE)
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
    e.preventDefault()
    if (!this.isHovered) return
    if (code === this.CODE_ARROW_RIGHT) this.next()
    if (code === this.CODE_ARROW_LEFT) this.prev()
    if (code === this.CODE_SPACE) this.pausePlay()
  }

  _initListenners() {
    this.nextBtn.addEventListener('click', this.next.bind(this))
    this.prevBtn.addEventListener('click', this.prev.bind(this))
    this.showBtnPlay && this.pausePlayBtn.addEventListener('click', this.pausePlay.bind(this))
    document.addEventListener('keydown', this._pressKey.bind(this))
    this.dotsPanel && this.carouselDots.addEventListener('click', this._dots.bind(this))

    this.containerID.addEventListener('mouseenter', () => this.isHovered = true)
    this.containerID.addEventListener('mouseleave', () => this.isHovered = false)
  }

  _sliderAutoPlay() {
    if (!this.isPlaying) return
    this.timerId = setInterval(() => this._nextSlide(), this.INTERVAL)
  }

  init() {
    this._initClassElemets()
    this._initProps()
    this._initControls()
    this._initDots()
    this._initListenners()
    this._sliderAutoPlay()
  }
}

export default Carousel