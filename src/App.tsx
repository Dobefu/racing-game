import useConfig from "./hooks/useConfig"
import TestScene from "./scenes/test"
import { Controls } from "./types/controls"
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { Perf } from "r3f-perf"
import { Suspense, useMemo } from "react"

function App() {
  const { config } = useConfig()

  const keyboardMap = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.forward, keys: config.controls?.forward ?? ["w"] },
      { name: Controls.backward, keys: config.controls?.backward ?? ["s"] },
      { name: Controls.left, keys: config.controls?.left ?? ["a"] },
      { name: Controls.right, keys: config.controls?.right ?? ["d"] },
    ],
    [],
  )

  return (
    <div id="canvas-container">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows>
          {config.debug?.stats && <Perf position="top-left" />}

          <Suspense>
            <Physics debug={config.debug?.physics} gravity={[0, -9.8, 0]}>
              <TestScene />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}

export default App
