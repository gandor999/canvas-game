export default function isPointInsideBallArea(
  { mouseX, mouseY },
  { x: circleX, y: circleY, radius }
) {
  const distanceBetweenCenters = Math.sqrt(
    (mouseX - circleX) * (mouseX - circleX) + (mouseY - circleY) * (mouseY - circleY)
  )
  return distanceBetweenCenters <= radius
}
