import getStopHeight from './getStopHeight.js'

export default class Ball {
  constructor({ ctx, outerColor, outerThickness, innerColor, pos, radius, initVelocity }) {
    this.ctx = ctx
    this.outerColor = outerColor
    this.pos = pos
    this.radius = radius
    this.initVelocity = initVelocity

    this.ctx.fillStyle = innerColor
    this.ctx.lineWidth = outerThickness
  }

  spawn() {
    this.ctx.beginPath()
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
    this.ctx.fill()
    this.ctx.strokeStyle = this.outerColor
    this.ctx.stroke()
    this.ctx.closePath()
  }

  move({ xV = 0, yV = 0 }) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    ;(this.pos.x += xV), (this.pos.y += yV), this.spawn()
  }

  animate() {
    const height = this.ctx.canvas.clientHeight

    const stopHeight = getStopHeight(height, this.radius)

    setInterval(() => {
      this.pos.y > stopHeight ? (this.initVelocity.yV *= -0.75) : (this.initVelocity.yV += 0.17)
      // -0.75 is our bounce
      // .17 is our gravity acceleration

      this.move(this.initVelocity)
    }, 17)
  }
}
