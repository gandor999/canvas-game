import Border from './Border.js'
import Ball from './game-objects/Ball.js'
import listenForMouse from './util/listenForMouse.js'

export default class World {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
  }

  playWorld(gameObjects) {
    requestAnimationFrame(() => {
      this.playWorld(gameObjects)
    }, canvas)
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    gameObjects.forEach(gameObject => {
      gameObject.animate()
    })
  }

  spawnObjects(gameObjects) {
    gameObjects.forEach(gameObject => {
      gameObject.spawn()
    })
  }

  loadWorld() {
    const border = new Border(this.canvas, this.ctx)
    border.draw()

    const ball = new Ball({
      canvas: this.canvas,
      innerColor: '#44CCFF',
      outerThickness: 1,
      pos: { x: 20, y: 20 },
      radius: 20,
      initVelocity: { xV: 100, yV: 150 },
    })

    const ball2 = new Ball({
      canvas: this.canvas,
      innerColor: '#E0FF4F',
      outerThickness: 1,
      pos: { x: 50, y: 100 },
      radius: 10,
      initVelocity: { xV: 20, yV: 19 },
    })

    const gameObjects = [ball, ball2]

    this.spawnObjects(gameObjects)

    this.playWorld(gameObjects)

    gameObjects.forEach(gameObject => {
      listenForMouse(this.canvas, gameObject)
    })
  }
}
