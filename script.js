// each section of html
const views = document.querySelectorAll('.view')
// each link in header
const links = document.querySelectorAll('.header-link')
// button to move up one section
const up = document.querySelector('.up')
// button to move down one section
const down = document.querySelector('.down')

// each section of html will be an instance of this class
class Slide {
  constructor(element) {
    this.element = element.id
    this.top = element.offsetTop
  }

  smoothScroll() {
    window.scroll({
      top: this.top,
      behavior: 'smooth'
    })
  }
}

// controller for buttons, slides, monitoring active section, initiating scroll etc.
class Slider {
  constructor(array, links, up, down, sections = [], activeSlide = 0) {
    this.array = array
    this.links = links
    this.up = up
    this.down = down
    this.sections = sections
    this.activeSlide = activeSlide
  }
  // create functionality based on page layout
  initialize() {
    let sections = []
    this.array.forEach(element => {
      let newSection = new Slide(element)
      sections.push(newSection)
    })
    up.setAttribute('style', 'opacity: 0')
    down.setAttribute('style', 'animation: bounce 1s ease-in-out infinite')
    this.sections = sections
    this.addListeners()
    this.setActiveLink()
  }
  // update nav bar to reflect active section link
  setActiveLink() {
    this.links.forEach(link => {
      link.setAttribute('style', '')
    })
    this.links[this.activeSlide].setAttribute(
      'style',
      'transform: scale(1.1); color: rgb(29, 52, 97);'
    )
  }

  addListeners() {
    window.addEventListener('scroll', () => {
      this.activeSlide = this.getActiveSlide()
      this.setActiveLink()
      if (this.activeSlide === 0) {
        this.up.setAttribute('style', 'opacity: 0')
      } else if (this.activeSlide === this.sections.length - 1) {
        this.down.setAttribute('style', 'opacity: 0')
      } else {
        this.up.setAttribute('style', 'opacity: 1')
        this.down.setAttribute('style', 'opacity: 1')
      }
    })
    this.up.addEventListener('click', () => {
      if (this.activeSlide > 0) {
        this.activeSlide -= 1
        this.sections[this.activeSlide].smoothScroll()
      }
    })
    this.down.addEventListener('click', () => {
      if (this.activeSlide < this.sections.length - 1) {
        this.activeSlide += 1
        this.sections[this.activeSlide].smoothScroll()
      }
    })
  }
  // find active section based on screen scroll position
  getActiveSlide() {
    let tops = this.sections.map(slide => {
      return slide.top
    })
    let scrollPosition = window.scrollY
    let arr = []
    tops.forEach((top, i) => {
      if (scrollPosition >= top - 40) {
        arr.push(i)
      }
    })
    return arr[arr.length - 1]
  }
}

// initialize the slider
const portfolioSlider = new Slider(views, links, up, down)
portfolioSlider.initialize()
