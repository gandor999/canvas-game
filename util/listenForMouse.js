import isPointInsideBallArea from './isPointInsideBallArea.js'

export default function listenForMouse(canvas, gameObject) {
  const onMouseMove = e => {
    if (isPointInsideBallArea({ mouseX: e.pageX, mouseY: e.pageY }, gameObject.getBallPos())) {
      gameObject.turnOffPhysics()
      gameObject.pos.x = e.pageX
      gameObject.pos.y = e.pageY
    }

    canvas.addEventListener(
      'mouseup',
      () => {
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
