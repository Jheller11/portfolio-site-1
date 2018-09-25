const views = document.querySelectorAll('.view')
const links = document.querySelectorAll('.header-link')

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

class Slider {
  constructor(
    array,
    links,
    up = undefined,
    down = undefined,
    sections = [],
    activeSlide = 0
  ) {
    this.array = array
    this.links = links
    this.up = up
    this.down = down
    this.sections = sections
    this.activeSlide = activeSlide
  }

  initialize() {
    let sections = []
    this.array.forEach(element => {
      let newSection = new Slide(element)
      sections.push(newSection)
    })
    this.sections = sections
    this.addListeners()
  }

  setActiveLink() {
    this.links.forEach(link => {
      link.setAttribute('style', '')
    })
    this.links[this.activeSlide].setAttribute(
      'style',
      'transform: scale(1.1); color: rgb(29, 52, 97)'
    )
  }

  addListeners() {
    window.addEventListener('scroll', () => {
      this.activeSlide = this.getActiveSlide()
      this.setActiveLink()
    })
  }

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

const portfolioSlider = new Slider(views, links)

portfolioSlider.initialize()
portfolioSlider.setActiveLink()
