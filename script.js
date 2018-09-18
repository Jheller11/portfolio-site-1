let me = document.body.querySelector('#me')

let positions = ['images/front.png', 'images/walk3.png', 'images/walk2.png']
let num = 0

me.addEventListener('click', e => {
  e.preventDefault()
  num === 2 ? (num = 0) : null
  me.setAttribute('src', positions[num + 1])
  num += 1
})
