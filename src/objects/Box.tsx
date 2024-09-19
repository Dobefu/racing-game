import { MeshProps } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"

export default function Box(props: MeshProps) {
  return (
    <RigidBody>
      <mesh {...props}>
        <boxGeometry />
        <meshPhongMaterial />
      </mesh>
    </RigidBody>
  )
}
