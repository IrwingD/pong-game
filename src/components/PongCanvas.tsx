import { useEffect, useRef } from "react"
import { GameEngine } from "../engine/GameEngine"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../engine/constants"

export default function PongCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<GameEngine | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create engine once
    engineRef.current = new GameEngine()

    const loop = () => {
      const engine = engineRef.current
      if (!engine) return

      engine.update()

      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Set drawing color
      ctx.fillStyle = "white"

      // Draw left paddle
      ctx.fillRect(
        engine.leftPaddle.position.x,
        engine.leftPaddle.position.y,
        engine.leftPaddle.width,
        engine.leftPaddle.height
      )

      // Draw right paddle
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

      animationRef.current = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      style={{
        background: "black",
        display: "block"
      }}
    />
  )
}