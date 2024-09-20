import useConfig from "../hooks/useConfig"
import { Box, Cylinder, ShapeProps } from "@react-three/drei"
import { GroupProps, useFrame } from "@react-three/fiber"
import {
  RapierRigidBody,
  RigidBody,
  useRevoluteJoint,
  useSpringJoint,
} from "@react-three/rapier"
import { createRef, RefObject, useRef } from "react"
import { BufferGeometry, MeshPhongMaterial, Vector3Tuple } from "three"

const WheelJoint = ({
  body,
  wheel,
  bodyAnchor,
  wheelAnchor,
  rotationAxis,
}: {
  body: RefObject<RapierRigidBody>
  wheel: RefObject<RapierRigidBody>
  bodyAnchor: Vector3Tuple
  wheelAnchor: Vector3Tuple
  rotationAxis: Vector3Tuple
}) => {
  const joint = useRevoluteJoint(body, wheel, [
    bodyAnchor,
    wheelAnchor,
    rotationAxis,
  ])

  useSpringJoint(body, wheel, [bodyAnchor, wheelAnchor, 0, 0, 0])

  useFrame(() => {
    if (joint.current) {
      joint.current.configureMotorVelocity(-20, 10)
    }
  })

  return null
}

export default function Car(props: GroupProps) {
  const { config } = useConfig()

  const modelProps: ShapeProps<typeof BufferGeometry> = {
    castShadow: true,
    receiveShadow: true,
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

  const chassisBody = useRef<RapierRigidBody>(null)

  const wheelPositions: [number, number, number][] = [
    [0.6, -0.25, -0.75],
    [0.6, -0.25, 0.75],
    [-0.6, -0.25, -0.75],
    [-0.6, -0.25, 0.75],
  ]

  const wheelRefs = useRef(
    wheelPositions.map(() => createRef<RapierRigidBody>()),
  )

  return (
    <group {...props}>
      <RigidBody ref={chassisBody} colliders="cuboid" type="dynamic">
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
      </RigidBody>

      {wheelPositions.map((wheelPosition, index) => (
        <RigidBody
          position={wheelPosition}
          colliders="hull"
          type="dynamic"
          key={index}
          ref={wheelRefs.current[index]}
          scale={[0.1, 0.2, 0.2]}
        >
          <Cylinder
            rotation={[0, 0, Math.PI / 2]}
            args={[1, 1, 1, 32]}
            castShadow
            receiveShadow
            material={wheelMaterial}
          />
        </RigidBody>
      ))}
      {wheelPositions.map((wheelPosition, index) => (
        <WheelJoint
          key={index}
          body={chassisBody}
          wheel={wheelRefs.current[index]}
          bodyAnchor={wheelPosition}
          wheelAnchor={[0, 0, 0]}
          rotationAxis={[1, 0, 0]}
        />
      ))}
    </group>
  )
}
