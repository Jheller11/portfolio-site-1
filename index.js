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
      translateX: 300,
      duration: 2000,
      opacity: 1
    })
  }

  deactivate() {
    anime({
      targets: ['#' + this.name],
      translateX: -300,
      duration: 2000,
      opacity: 0
    })
  }
}

const contact = new Element('contact')
const projects = new Element('projects')
const about = new Element('about')

const elements = [contact, projects, about]
console.log(elements)

const buttons = document.querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('click', e => {
    let target = elements.find(element => {
      return e.target.name === element.name
    })
    target.activate()
  })
})

// create html for projects/about/contact
// hide all off screen
// when link clicked, animate onto screen
// if current active section => simultaneously animate off screen
