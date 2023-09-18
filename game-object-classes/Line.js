export default class Line {
  constructor({ ctx, color, beginPos, endPos }) {
    this.ctx = ctx
    this.color = color
    this.beginPos = beginPos
    this.endPos = endPos
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.moveTo(this.beginPos.x, this.beginPos.y)
    this.ctx.lineTo(this.endPos.x, this.endPos.y)
    this.ctx.strokeStyle = this.color
    this.ctx.stroke()
  }
}
