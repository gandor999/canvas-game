import World from './World.js'

function createHiPPICanvas(width, height) {
  const ratio = window.devicePixelRatio
  const canvas = document.getElementById('canvas')

  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
  canvas.getContext('2d').scale(ratio, ratio)

  return canvas
}

function setupCanvas() {
  const canvas = createHiPPICanvas(800, 500)

  const world = new World(canvas)

  world.loadWorld()
}

window.addEventListener('load', () => {
  setupCanvas()
})
