import useConfig from "../hooks/useConfig"
import { Box, Cylinder, ShapeProps } from "@react-three/drei"
import { MeshProps } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { BufferGeometry, Euler, MeshPhongMaterial } from "three"

export default function Car(props: MeshProps) {
  const { config } = useConfig()

  const modelProps: ShapeProps<typeof BufferGeometry> = {
    castShadow: true,
  }

  const chassisMaterial = new MeshPhongMaterial({
    shininess: 1000,
    color: 0x7777ff,
    wireframe: config.debug?.wireframe,
  })

  const windowMaterial = new MeshPhongMaterial({
    shininess: 5000,
    color: 0xaaaaff,
    opacity: 0.5,
    transparent: true,
    wireframe: config.debug?.wireframe,
  })

  const wheelMaterial = new MeshPhongMaterial({
    color: 0x111111,
    wireframe: config.debug?.wireframe,
  })

  return (
    <mesh {...props}>
      <RigidBody>
        <Box {...modelProps} material={chassisMaterial} scale={[1, 0.5, 2]} />
        <Box
          {...modelProps}
          material={chassisMaterial}
          scale={[1, 0.25, 0.125]}
          position={[0, -0.125, 1.0625]}
        />
        <Box
          {...modelProps}
          material={chassisMaterial}
          scale={[1, 0.25, 0.125]}
          position={[0, -0.125, -1.0625]}
        />

        <Box
          {...modelProps}
          material={windowMaterial}
          scale={[0.75, 0.25, 0.75]}
          position={[0, 0.375, -0.25]}
        />
        {/* </RigidBody>

      <RigidBody> */}
        <Cylinder
          {...modelProps}
          material={wheelMaterial}
          rotation={new Euler(0, 0, (-Math.PI / 180) * 90)}
          scale={[0.2, 0.1, 0.2]}
          position={[-0.5, -0.25, -0.75]}
        />

        <Cylinder
          {...modelProps}
          material={wheelMaterial}
          rotation={new Euler(0, 0, (-Math.PI / 180) * 90)}
          scale={[0.2, 0.1, 0.2]}
          position={[-0.5, -0.25, 0.75]}
        />

        <Cylinder
          {...modelProps}
          material={wheelMaterial}
          rotation={new Euler(0, 0, (-Math.PI / 180) * 90)}
          scale={[0.2, 0.1, 0.2]}
          position={[0.5, -0.25, -0.75]}
        />

        <Cylinder
          {...modelProps}
          material={wheelMaterial}
          rotation={new Euler(0, 0, (-Math.PI / 180) * 90)}
          scale={[0.2, 0.1, 0.2]}
          position={[0.5, -0.25, 0.75]}
        />
      </RigidBody>
    </mesh>
  )
}
