import { Ball, Paddle } from "./types"

export function checkPaddleCollision(ball: Ball, paddle: Paddle) {
  return (
    ball.position.x - ball.radius < paddle.position.x + paddle.width &&
    ball.position.x + ball.radius > paddle.position.x &&
    ball.position.y - ball.radius < paddle.position.y + paddle.height &&
    ball.position.y + ball.radius > paddle.position.y
  )
}