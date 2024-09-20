import useConfig from "./hooks/useConfig"
import TestScene from "./scenes/test"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Perf } from "r3f-perf"
import { Suspense } from "react"

function App() {
  const { config } = useConfig()

  return (
    <div id="canvas-container">
      <Canvas shadows>
        {config.debug?.stats && <Perf position="top-left" />}

        <Suspense>
          <Physics debug={config.debug?.physics} gravity={[0, -9.8, 0]}>
            <TestScene />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
