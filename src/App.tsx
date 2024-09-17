import { Canvas } from "@react-three/fiber"

function App() {
  return (
    <div id="canvas-container">
      <Canvas>
        <mesh>
          <boxGeometry />
        </mesh>
      </Canvas>
    </div>
  )
}

export default App
