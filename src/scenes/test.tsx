import Box from "../objects/Box"
import { OrbitControls, Plane, Sky } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { Euler, MeshBasicMaterial } from "three"

export default function TestScene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />
      <OrbitControls />

      <Box />

      <RigidBody>
        <mesh
          position={[0, -2, 0]}
          scale={[10, 10, 1]}
          rotation={new Euler((-Math.PI / 180) * 90, 0, 0)}
        >
          <Plane material={new MeshBasicMaterial()} />
          <meshPhongMaterial />
        </mesh>
      </RigidBody>
    </>
  )
}
