const areCirclesTouching = (ballI, ballJ) => {
  const { x: xi, y: yi, radius: radiusi } = ballI.getBallPos()
  const { x: xj, y: yj, radius: radiusj } = ballJ.getBallPos()

  // Math.pow is so slow, let's just square them naively instead
  const distanceBetweenCenters = Math.sqrt((xi - xj) * (xi - xj) + (yi - yj) * (yi - yj))

  return (
    distanceBetweenCenters <= radiusi - radiusj ||
    distanceBetweenCenters <= radiusj - radiusi ||
    distanceBetweenCenters <= radiusi + radiusj
  )
}

export default class CollisionDetector {
  constructor(gameObjects) {
    this.gameObjects = gameObjects
  }

  listenCollisions() {
    for (let i = 0; i < this.gameObjects.length; i++) {
      const gameObjectI = this.gameObjects[i]

      for (let j = 0; j < this.gameObjects.length; j++) {
        if (j == i) continue

        const gameObjectJ = this.gameObjects[j]

        // ADDNEXT: collision detection for rect vs rect, circle vs rect
        if (areCirclesTouching(gameObjectI, gameObjectJ)) {
            console.log("balls are touching!")
        }
      }
    }
  }
}
