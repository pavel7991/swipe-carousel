function SwipeCarousel() {
  Carousel.apply(this, arguments)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype)
SwipeCarousel.prototype.constructor = SwipeCarousel

SwipeCarousel.prototype._initListenners = function () {
  Carousel.prototype._initListenners.apply(this);
  this.container.addEventListener('touchstart', this.swipeStartHandler.bind(this))
  this.container.addEventListener('mousedown', this.swipeStartHandler.bind(this))
  this.container.addEventListener('touchend', this.swipeEndHandler.bind(this))
  this.container.addEventListener('mouseup', this.swipeEndHandler.bind(this))
}

SwipeCarousel.prototype.swipeStartHandler = function (e) {
  this.startPosX = e instanceof MouseEvent
    ? e.pageX // MouseEvent
    : e.changedTouches[0].pageX //TouchEvent
}

SwipeCarousel.prototype.swipeEndHandler = function (e) {
  this.endPosX = e instanceof MouseEvent
    ? this.endPosX = e.pageX // MouseEvent
    : e.changedTouches[0].pageX //TouchEvent
  if (this.endPosX - this.startPosX > 100) this.prev()
  if (this.endPosX - this.startPosX < -100) this.next()
}



