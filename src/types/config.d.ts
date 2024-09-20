export {}

interface Config {
  debug?: DebugOptions
  controls?: ControlsOptions
}

interface DebugOptions {
  stats?: boolean
  physics?: boolean
  wireframe?: boolean
}

interface ControlsOptions {
  forward?: string
  backward?: string
  left?: string
  right?: string
}

declare global {
  var config: Config
}
