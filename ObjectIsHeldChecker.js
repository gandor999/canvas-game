export default class ObjectIsHeldChecker {
  constructor() {}

  isThereAnotherObjectHeld(gameObjects, indexOfObjectToObserve) {
    let isTherOtherObjectHeld = false

    gameObjects.forEach((gameObject, i) => {
      if (i != indexOfObjectToObserve && gameObject.thisObjectIsHeld) {
        isTherOtherObjectHeld = true
      }
    })

    return isTherOtherObjectHeld
  }
}
