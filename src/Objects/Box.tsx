import { MeshProps, useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { type Mesh } from "three"

export default function Box(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!)

  useFrame((_state, delta) => {
    meshRef.current.rotation.y += 1 * delta
  })

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry />
      <meshPhongMaterial />
    </mesh>
  )
}
