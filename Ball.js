import getStopPos from './getStopPos.js'

export default class Ball {
  constructor({ canvas, outerColor, outerThickness, innerColor, pos, radius, initVelocity }) {
    ;(this.canvas = canvas), (this.ctx = this.canvas.getContext('2d'))
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

    this.pos.y > heightStopBottom ? (this.velocity.yV *= -bounce) : (this.velocity.yV += gravity)

    if (this.velocity.xV < friction && this.velocity.xV > -friction) {
      this.velocity.xV = 0
    } else {
      this.pos.x < 0 ? (this.velocity.xV += friction) : (this.velocity.xV -= friction)
    }

    if (this.pos.y < heightStopTop) this.velocity.yV *= -bounce
    if (this.pos.x > widthStopRight) this.velocity.xV *= -bounce

    if (this.pos.x < widthtStopLeft) this.velocity.xV *= -bounce

    this.move(this.velocity)
  }
}
