import Box from "../objects/Box"
import { Sky } from "@react-three/drei"
import { Euler } from "three"

export default function TestScene() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} />

      <Box rotation={new Euler(0.3, 0, 0)} />
    </>
  )
}
