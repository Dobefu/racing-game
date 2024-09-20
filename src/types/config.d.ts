export {}

interface Config {
  debug?: DebugOptions
}

interface DebugOptions {
  stats?: boolean
  physics?: boolean
  wireframe?: boolean
}

declare global {
  var config: Config
}
