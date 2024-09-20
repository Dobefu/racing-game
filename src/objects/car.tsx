import useConfig from "../hooks/useConfig"
import { Controls } from "../types/controls"
import {
  Box,
  Cylinder,
  ShapeProps,
  useKeyboardControls,
} from "@react-three/drei"
import { GroupProps, useFrame } from "@react-three/fiber"
import {
  RapierRigidBody,
  RigidBody,
  useRevoluteJoint,
} from "@react-three/rapier"
import { createRef, forwardRef, Ref, RefObject, useRef } from "react"
import {
  BufferGeometry,
  Mesh,
  MeshPhongMaterial,
  Vector3,
  Vector3Tuple,
} from "three"

const WheelJoint = ({
  index,
  body,
  wheel,
  bodyAnchor,
  wheelAnchor,
  rotationAxis,
}: {
  index: number
  body: RefObject<RapierRigidBody>
  wheel: RefObject<RapierRigidBody>
  bodyAnchor: Vector3Tuple
  wheelAnchor: Vector3Tuple
  rotationAxis: Vector3Tuple
}) => {
  const [_, get] = useKeyboardControls<Controls>()

  const joint = useRevoluteJoint(body, wheel, [
    bodyAnchor,
    wheelAnchor,
    rotationAxis,
  ])

  useFrame(() => {
    const input = get()

    if (joint.current) {
      if (input.forward) {
        wheel.current?.applyTorqueImpulse(new Vector3(-0.1, 0, 0), true)
      }

      if (input.left && index % 2 === 0) {
        wheel.current?.applyTorqueImpulse(
          new Vector3(input.backward ? 0.2 : -0.2, 0, 0),
          true,
        )
      }

      if (input.right && index % 2 !== 0) {
        wheel.current?.applyTorqueImpulse(
          new Vector3(input.backward ? 0.2 : -0.2, 0, 0),
          true,
        )
      }

      if (input.backward) {
        wheel.current?.applyTorqueImpulse(new Vector3(0.1, 0, 0), true)
      }
    }
  })

  return null
}

export default forwardRef(function Car(props: GroupProps, ref: Ref<Mesh>) {
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
    [0.75, -0.25, -1.1],
    [-0.75, -0.25, -1.1],
    [0.75, -0.25, 1.1],
    [-0.75, -0.25, 1.1],
  ]

  const wheelRefs = useRef(
    wheelPositions.map(() => createRef<RapierRigidBody>()),
  )

  return (
    <group {...props}>
      <RigidBody ref={chassisBody} colliders="cuboid" type="dynamic">
        <Box
          ref={ref}
          {...modelProps}
          material={chassisMaterial}
          scale={[1, 0.5, 2]}
        />
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
          scale={[0.5, 1, 1]}
          angularDamping={0.1}
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
          index={index}
          body={chassisBody}
          wheel={wheelRefs.current[index]}
          bodyAnchor={wheelPosition}
          wheelAnchor={[0, 0, 0]}
          rotationAxis={[1, 0, 0]}
        />
      ))}
    </group>
  )
})
