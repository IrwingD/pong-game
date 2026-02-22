import type { Ball, Paddle } from "./types"
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  BALL_RADIUS,
} from "./constants"
import { updateBall } from "./physics"
import { checkPaddleCollision } from "./collision"

export class GameEngine {
  leftPaddle: Paddle
  rightPaddle: Paddle
  ball: Ball

  constructor() {
    this.leftPaddle = {
      position: { x: 30, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      speed: 6,
    }

    this.rightPaddle = {
      position: { x: CANVAS_WIDTH - 50, y: CANVAS_HEIGHT / 2 - PADDLE_HEIGHT / 2 },
      width: PADDLE_WIDTH,
      height: PADDLE_HEIGHT,
      speed: 6,
    }

    this.ball = {
      position: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 },
      velocity: { x: 5, y: 4 },
      radius: BALL_RADIUS,
    }
  }

  update() {
    updateBall(this.ball)

    if (checkPaddleCollision(this.ball, this.leftPaddle) ||
        checkPaddleCollision(this.ball, this.rightPaddle)) {
      this.ball.velocity.x *= -1
    }

    // Reset if out of bounds
    if (this.ball.position.x < 0 || this.ball.position.x > CANVAS_WIDTH) {
      this.ball.position = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 }
    }
  }
}