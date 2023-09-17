import getStopPos from '../util/getStopPos.js'

export default class Ball {
  constructor({ canvas, outerThickness, innerColor, pos, radius, initVelocity }) {
    ;(this.canvas = canvas), (this.ctx = this.canvas.getContext('2d'))
    this.pos = pos
    this.radius = radius
    this.velocity = initVelocity
    this.innerColor = innerColor
    this.outerThickness = outerThickness

    this.turnOnPhysics()
    this.thisObjectIsHeld = false
    this.isOtherObjectHeld = false
  }

  // note: a canvas element only has one context all throughout so the reason why you could not get the innerColor of the first ball to be retained is because the ctx object that has been passed down has been the same! To fix this we need to think of the properties of the ball to be that of when we will draw it on the canvas
  spawn() {
    this.ctx.fillStyle = this.innerColor
    this.ctx.lineWidth = this.outerThickness
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

  getBallPos() {
    return {
      x: this.pos.x,
      y: this.pos.y,
      radius: this.radius,
    }
  }

  turnOffPhysics() {
    ;(this.friction = 0), (this.gravity = 0), (this.bounce = 0), (this.velocity = { xV: 0, yV: 0 })
  }

  turnOnPhysics() {
    ;(this.friction = 0.04), (this.gravity = 0.2), (this.bounce = Math.sqrt(2 * this.gravity))
  }

  animate() {
    const { clientHeight, clientWidth } = this.ctx.canvas

    const heightStopBottom = getStopPos(clientHeight, this.radius)
    const heightStopTop = this.radius
    const widthStopRight = getStopPos(clientWidth, this.radius)
    const widthtStopLeft = this.radius

    // logic for gravity and bouncing on bottom
    if (this.pos.y > heightStopBottom) {
      this.velocity.yV < this.bounce && this.velocity.yV >= 0
        ? (this.velocity.yV = 0)
        : ((this.pos.y = heightStopBottom), (this.velocity.yV *= -this.bounce))
    } else {
      this.velocity.yV += this.gravity
    }

    // logic for slowing down due to friction
    if (this.velocity.xV < this.friction && this.velocity.xV > -this.friction) {
      this.velocity.xV = 0
    } else {
      this.pos.x < 0 ? (this.velocity.xV += this.friction) : (this.velocity.xV -= this.friction)
    }

    // logic for the rest of the bouncing
    if (this.pos.y < heightStopTop) (this.pos.y = heightStopTop), (this.velocity.yV *= -this.bounce)
    if (this.pos.x > widthStopRight)
      (this.pos.x = widthStopRight), (this.velocity.xV *= -this.bounce)

    if (this.pos.x < widthtStopLeft)
      (this.pos.x = widthtStopLeft), (this.velocity.xV *= -this.bounce)

    this.move(this.velocity)
  }

  // ADDNEXT: have ball move on mouse let go velocity
}
