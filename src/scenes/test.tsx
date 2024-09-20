import useConfig from "../hooks/useConfig"
import Car from "../objects/car"
import { OrbitControls, Plane, Sky } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { Euler, MeshPhongMaterial } from "three"

export default function TestScene() {
  const { config } = useConfig()
  const { camera } = useThree()

  camera.position.y = 3

  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25} />
      <directionalLight intensity={1.5} position={[3, 5, 10]} castShadow />
      <OrbitControls />

      <Car position={[0, 1, 0]} />

      <RigidBody>
        <Plane
          scale={[10, 10, 1]}
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
