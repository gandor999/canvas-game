import isPointInsideBallArea from './isPointInsideBallArea.js'

export default function listenForMouse(canvas, gameObject) {
  // if we rely soley on isPointInsideBallArea to hold the ball the ball wont hold on right
  let holdingBall = false
  const onMouseMove = e => {
    if (isPointInsideBallArea({ mouseX: e.pageX, mouseY: e.pageY }, gameObject.getBallPos()) || holdingBall) {
      holdingBall = true
      gameObject.turnOffPhysics()
      gameObject.pos.x = e.pageX
      gameObject.pos.y = e.pageY
    }

    canvas.addEventListener(
      'mouseup',
      () => {
        holdingBall = false
        canvas.removeEventListener('mousemove', onMouseMove, false)
        gameObject.turnOnPhysics()
      },
      false
    )
  }

  const onMouseDown = () => {
    canvas.addEventListener('mousemove', onMouseMove, false)
  }

  canvas.addEventListener('mousedown', onMouseDown, false)
}
