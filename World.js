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
      ctx: this.ctx,
      innerColor: '#44CCFF',
      outerThickness: 1,
      pos: { x: 50, y: 10 },
      radius: 10,
      initVelocity: { yV: 1 },
    })

    ball.spawn()
    ball.animate()
  }
}
