console.log('working')

const start = document.getElementById('start')
console.log(start)

var cssSelector = () =>
  anime({
    targets: '#cssSelector .el',
    translateX: -250
  })

start.addEventListener('click', cssSelector)

// create html for projects/about/contact
// hide all off screen
// when link clicked, animate onto screen
// if current active section => simultaneously animate off screen
