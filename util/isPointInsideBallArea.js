export default function isPointInsideBallArea(
  { mouseX, mouseY },
  { x: circleX, y: circleY, radius }
) {
  return (
    mouseX > circleX ||
    mouseX < circleX + 2 * radius ||
    mouseY < circleY ||
    mouseY > circleY - 2 * radius
  )
}
