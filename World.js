import Border from './Border.js'
import Ball from './Ball.js'

export default class World {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
  }

  loadWorld() {
    const border = new Border(this.canvas, this.ctx)
    border.draw()

    const ball = new Ball({
      canvas: this.canvas,

      innerColor: '#44CCFF',
      outerThickness: 1,
      pos: { x: 10, y: 10 },
      radius: 10,
      initVelocity: { xV: 10, yV: 15 },
    })

    const ball2 = new Ball({
      canvas: this.canvas,

      innerColor: '#E0FF4F',
      outerThickness: 1,
      pos: { x: 50, y: 100 },
      radius: 10,
      initVelocity: { xV: 20, yV: 19 },
    })

    ball.spawn()
    ball2.spawn()

    const playWorld = () => {
      requestAnimationFrame(playWorld, canvas)
      this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
      ball.animate()
      ball2.animate()
    }

    playWorld()
  }
}
