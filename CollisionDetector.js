import getStopPos from './util/getStopPos.js'

export default class CollisionDetector {
  constructor(gameObjects) {
    this.gameObjects = gameObjects
  }

  isMousePointInsideBallArea({ mouseX, mouseY }, { x: circleX, y: circleY, radius }) {
    const distanceBetweenCenters = Math.sqrt(
      (mouseX - circleX) * (mouseX - circleX) + (mouseY - circleY) * (mouseY - circleY)
    )
    return distanceBetweenCenters <= radius
  }

  areCirclesTouching = (ballI, ballJ) => {
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

  listenCollisionsBetweenBallObjects = () => {
    for (let i = 0; i < this.gameObjects.length; i++) {
      const gameObjectI = this.gameObjects[i]

      for (let j = 0; j < this.gameObjects.length; j++) {
        if (j == i) continue

        const gameObjectJ = this.gameObjects[j]

        // ADDNEXT: collision detection for rect vs rect, circle vs rect
        if (this.areCirclesTouching(gameObjectI, gameObjectJ)) {
          console.log('balls are touching!')
        }
      }
    }
  }

  // NOTE: should I make a CollisionHandler class instead
  handleCollisionsFromBallToWall = ({ ball, clientHeight, clientWidth }) => {
    const heightStopBottom = getStopPos(clientHeight, ball.radius)
    const heightStopTop = ball.radius
    const widthStopRight = getStopPos(clientWidth, ball.radius)
    const widthtStopLeft = ball.radius

    // logic for gravity and bouncing on bottom
    if (ball.pos.y > heightStopBottom) {
      ball.velocity.yV < ball.bounce && ball.velocity.yV >= 0
        ? (ball.velocity.yV = 0)
        : ((ball.pos.y = heightStopBottom), (ball.velocity.yV *= -ball.bounce))
    } else {
      ball.velocity.yV += ball.gravity
    }

    // logic for slowing down due to friction
    if (ball.velocity.xV < ball.friction && ball.velocity.xV > -ball.friction) {
      ball.velocity.xV = 0
    } else {
      ball.pos.x < 0 ? (ball.velocity.xV += ball.friction) : (ball.velocity.xV -= ball.friction)
    }

    // logic for the rest of the bouncing
    if (ball.pos.y < heightStopTop) (ball.pos.y = heightStopTop), (ball.velocity.yV *= -ball.bounce)
    if (ball.pos.x > widthStopRight)
      (ball.pos.x = widthStopRight), (ball.velocity.xV *= -ball.bounce)

    if (ball.pos.x < widthtStopLeft)
      (ball.pos.x = widthtStopLeft), (ball.velocity.xV *= -ball.bounce)

    ball.move(ball.velocity)
  }
}
