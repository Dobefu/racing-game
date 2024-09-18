import TestScene from "./scenes/test"
import { Canvas } from "@react-three/fiber"
import { Perf } from "r3f-perf"

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <Perf position="top-left" />

        <TestScene />
      </Canvas>
    </div>
  )
}

export default App
