let main = document.querySelector('main')
let height = document.body.scrollHeight

document.addEventListener('scroll', e => {
  main.setAttribute(
    'style',
    `background-color: rgba(79, 90, 91, ${e.path[1].scrollY / height / 3}) `
  )
})
