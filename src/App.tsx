import { Sky } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Box from "./Objects/Box"
import { Euler } from "three"

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} />

        <Box rotation={new Euler(0.3, 0, 0)} />
      </Canvas>
    </div>
  )
}

export default App
