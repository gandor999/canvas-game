export default class Border {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
  }

  draw() {
    this.canvas.style.border = '1px solid #000'
    this.ctx.strokeRect(0, 0, this.canvas.style.width, this.canvas.style.height)
  }
}
