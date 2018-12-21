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

// stars
// background div

const starContainer = document.querySelector('.star-container')

// define star class
class Star {
  constructor(position, size, color, blinking) {
    this.position = position
    this.size = size
    this.color = color
    this.blinking = blinking
  }

  //   generate string for inline style when element added
  style() {
    let string = `top: ${this.position[0]}px; left: ${
      this.position[1]
    }px; background-color: ${this.color}; width: ${this.size}px; height: ${
      this.size
    }px; ${
      this.blinking ? 'animation: blink 2s infinite ease-in-out' : ''
    }; animation-delay: ${random(0, 4)}s;`
    return string
  }
}

// random num generator for star properties
const random = (min, max) => {
  return Math.floor(Math.random() * max) + min
}

// animate?
const animate = () => {
  let blinking = Math.random() >= 0.5
  return blinking
}

// color?
const color = () => {
  let color = Math.random()
  if (color >= 0.33) {
    return '0, 0%, 100%'
  } else {
    return color >= 0.165 ? '0, 59%, 70%' : '230, 59%, 70%'
  }
}
var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

// star generator
const createStars = amount => {
  for (let i = amount; i > 0; i--) {
    let star = new Star(
      [random(10, 690), random(10, w)],
      random(2, 2),
      `hsl( ${color()})`,
      animate()
    )
    let div = document.createElement('div')
    div.setAttribute('class', 'star')
    div.setAttribute('style', star.style())
    starContainer.appendChild(div)
  }
}

// shooting star generator

const shootingStar = () => {
  let shooter = new Star(
    [random(100, -200), random(100, -200)],
    random(2, 2),
    `hsl( ${color()})`
  )
  let div = document.createElement('div')
  div.setAttribute('class', 'shooting-star')
  div.setAttribute('style', shooter.style())
  starContainer.appendChild(div)
}

createStars(100)
shootingStar()
