class Element {
  constructor(name) {
    this.name = name
  }

  target() {
    let target = document.querySelector('#' + this.name)
    console.log(target)
  }

  activate() {
    anime({
      targets: ['#' + this.name],
      translateX: 200,
      duration: 1000,
      opacity: 1,
      delay: 250,
      zIndex: 1
    })
  }

  deactivate() {
    anime({
      targets: ['#' + this.name],
      translateX: -500,
      duration: 1000,
      opacity: 0,
      zIndex: 0
    })
  }
}

const contact = new Element('contact')
const projects = new Element('projects')
const about = new Element('about')
let active = contact

const elements = [contact, projects, about]

const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('click', e => {
    let target = elements.find(element => {
      return e.target.name === element.name
    })
    active.deactivate()
    active = target
    target.activate()
  })
})

elements.forEach(element => {
  element.deactivate()
})
