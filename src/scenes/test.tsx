import { Box, OrbitControls, Plane, Sky } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"
import { Euler, MeshPhongMaterial } from "three"

export default function TestScene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={1.5} position={[3, 5, 10]} castShadow />
      <OrbitControls />

      <RigidBody>
        <Box castShadow material={new MeshPhongMaterial()} />
      </RigidBody>

      <RigidBody>
        <Plane
          position={[0, -2, 0]}
          scale={[10, 10, 1]}
          rotation={new Euler((-Math.PI / 180) * 90, 0, 0)}
          receiveShadow
          material={new MeshPhongMaterial({ shininess: 10 })}
        />
      </RigidBody>
    </>
  )
}
