import isPointInsideBallArea from './isPointInsideBallArea.js'

export default function listenForMouse({
  canvas,
  gameObject,
  objectIsHeldChecker,
  indexOfObject,
  gameObjects,
}) {
  // if we rely soley on isPointInsideBallArea to hold the ball the ball wont hold on right
  let holdingBall = false
  const onMouseMove = e => {
    if (
      (isPointInsideBallArea({ mouseX: e.pageX, mouseY: e.pageY }, gameObject.getBallPos()) &&
        !objectIsHeldChecker.isThereAnotherObjectHeld(gameObjects, indexOfObject)) ||
      holdingBall
    ) {
      holdingBall = true
      gameObject.thisObjectIsHeld = true
      gameObject.pos.x = e.pageX
      gameObject.pos.y = e.pageY
      gameObject.turnOffPhysics()
    }

    canvas.addEventListener(
      'mouseup',
      () => {
        holdingBall = false
        gameObject.thisObjectIsHeld = false
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
