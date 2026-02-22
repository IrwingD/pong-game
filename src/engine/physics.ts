import { Ball } from "./types"
import { CANVAS_HEIGHT } from "./constants"

export function updateBall(ball: Ball) {
  ball.position.x += ball.velocity.x
  ball.position.y += ball.velocity.y

  // Bounce top & bottom
  if (
    ball.position.y - ball.radius < 0 ||
    ball.position.y + ball.radius > CANVAS_HEIGHT
  ) {
    ball.velocity.y *= -1
  }
}