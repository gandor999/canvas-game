import getStopPos from './getStopPos.js'

export default class Ball {
  constructor({ ctx, outerColor, outerThickness, innerColor, pos, radius, initVelocity }) {
    this.ctx = ctx
    this.outerColor = outerColor
    this.pos = pos
    this.radius = radius
    this.velocity = initVelocity

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
    const { clientHeight, clientWidth } = this.ctx.canvas

    const heightStopBottom = getStopPos(clientHeight, this.radius)
    const heightStopTop = this.radius
    const widthStopRight = getStopPos(clientWidth, this.radius)
    const widthtStopLeft = this.radius

    const friction = 0.04
    const gravity = 0.2
    const bounce = Math.sqrt(2.3 * gravity)

    // -0.75 is our bounce
    // .1 is our gravity acceleration
    setInterval(() => {
      console.log('velocity', this.velocity)
      this.pos.y > heightStopBottom ? (this.velocity.yV *= -bounce) : (this.velocity.yV += gravity)

      if (this.velocity.xV < friction && this.velocity.xV > -friction) {
        this.velocity.xV = 0
      } else {
        this.pos.x < 0 ? (this.velocity.xV += friction) : (this.velocity.xV -= friction)
      }

      if (this.pos.y < heightStopTop) this.velocity.yV *= -bounce
      if (this.pos.x > widthStopRight) this.velocity.xV *= -bounce

      if (this.pos.x < widthtStopLeft) this.velocity.xV *= -bounce

      // ADDNEXT: make the ball bounce off the ceiling as well as the right and left wall

      this.move(this.velocity)
    }, 17)
  }
}
