import { useEffect, useRef } from "react"
import { GameEngine } from "../engine/GameEngine"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../engine/constants"

export default function PongCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef(new GameEngine())

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const loop = () => {
      const engine = engineRef.current
      engine.update()

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Draw paddles
      ctx.fillRect(
        engine.leftPaddle.position.x,
        engine.leftPaddle.position.y,
        engine.leftPaddle.width,
        engine.leftPaddle.height
      )

      ctx.fillRect(
        engine.rightPaddle.position.x,
        engine.rightPaddle.position.y,
        engine.rightPaddle.width,
        engine.rightPaddle.height
      )

      // Draw ball
      ctx.beginPath()
      ctx.arc(
        engine.ball.position.x,
        engine.ball.position.y,
        engine.ball.radius,
        0,
        Math.PI * 2
      )
      ctx.fill()

      requestAnimationFrame(loop)
    }

    loop()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{ background: "black" }}
    />
  )
}