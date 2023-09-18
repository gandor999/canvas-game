import CollisionDetector from '../CollisionDetector.js'

export default function listenForMouse({
  canvas,
  gameObject,
  objectIsHeldChecker,
  indexOfObject,
  gameObjects,
}) {
  // if we rely soley on isMousePointInsideBallArea to hold the ball the ball wont hold on right
  let holdingBall = false
  const collisionDetector = new CollisionDetector()

  const onMouseMove = e => {
    if (
      (collisionDetector.isMousePointInsideBallArea(
        { mouseX: e.pageX, mouseY: e.pageY },
        gameObject.getBallPos()
      ) &&
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
