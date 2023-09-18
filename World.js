import Border from './Border.js'
import CollisionDetector from './CollisionDetector.js'
import ObjectIsHeldChecker from './ObjectIsHeldChecker.js'
import Ball from './game-object-classes/Ball.js'
import listenForMouse from './util/listenForMouse.js'
import ballsRoster from './game-object-roster/ballsRoster.js'

export default class World {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
  }

  playWorld(gameObjects) {
    const collisionDetector = new CollisionDetector(gameObjects)

    requestAnimationFrame(() => {
      this.playWorld(gameObjects)
    }, canvas)
    this.ctx.clearRect(0, 0, this.ctx.canvas.clientWidth, this.ctx.canvas.clientHeight)
    gameObjects.forEach(gameObject => {
      gameObject.animate()
    })

    collisionDetector.listenCollisionsBetweenBallObjects()
  }

  spawnObjects(gameObjects) {
    gameObjects.forEach(gameObject => {
      gameObject.spawn()
    })
  }

  loadWorld() {
    const border = new Border(this.canvas, this.ctx)
    border.draw()

    const gameBalls = ballsRoster.map(
      ball =>
        new Ball({
          canvas: this.canvas,
          ...ball,
        })
    )

    const gameObjects = [...gameBalls]

    this.spawnObjects(gameObjects)

    this.playWorld(gameObjects)

    const objectIsHeldChecker = new ObjectIsHeldChecker()

    gameObjects.forEach((gameObject, indexOfObject, gameObjects) => {
      listenForMouse({
        canvas: this.canvas,
        gameObject,
        objectIsHeldChecker,
        indexOfObject,
        gameObjects,
      })
    })
  }
}
