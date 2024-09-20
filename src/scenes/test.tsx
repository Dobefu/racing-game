import useConfig from "../hooks/useConfig"
import Car from "../objects/car"
import { Plane, Sky } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { Euler, Mesh, MeshPhongMaterial } from "three"

export default function TestScene() {
  const { config } = useConfig()
  const { camera } = useThree()

  const carRef = useRef<Mesh>(null)

  useFrame(() => {
    if (!carRef.current?.parent) return

    camera.position.set(
      carRef.current.parent.position.x,
      carRef.current.parent.position.y + 2,
      carRef.current.parent.position.z + 4,
    )
  })

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25} />
      <directionalLight intensity={1.5} position={[3, 5, 10]} castShadow />

      <Car ref={carRef} position={[0, 0.5, 0]} />

      <RigidBody type="fixed">
        <Plane
          scale={[1000, 1000, 1]}
          rotation={new Euler((-Math.PI / 180) * 90, 0, 0)}
          receiveShadow
          material={
            new MeshPhongMaterial({
              color: 0x55cc55,
              wireframe: config.debug?.wireframe,
            })
          }
        />
      </RigidBody>
    </>
  )
}
