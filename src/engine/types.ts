    export interface Vector {
  x: number
  y: number
}

export interface Paddle {
  position: Vector
  width: number
  height: number
  speed: number
}

export interface Ball {
  position: Vector
  velocity: Vector
  radius: number
}