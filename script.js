const views = document.querySelectorAll('.view')
const links = document.querySelectorAll('.header-link')
const up = document.querySelector('.up')
const down = document.querySelector('.down')

console.log(up, down)

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
  constructor(array, links, up, down, sections = [], activeSlide = 0) {
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
    up.setAttribute('style', 'opacity: 0')
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
      if (this.activeSlide === 0) {
        up.setAttribute('style', 'opacity: 0')
      } else if (this.activeSlide === this.sections.length - 1) {
        down.setAttribute('style', 'opacity: 0')
      } else {
        up.setAttribute('style', 'opacity: 1')
        down.setAttribute('style', 'opacity: 1')
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

const portfolioSlider = new Slider(views, links, up, down)

portfolioSlider.initialize()
portfolioSlider.setActiveLink()
