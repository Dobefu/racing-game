export {}

interface Config {
  debug: boolean
}

declare global {
  var config: Config
}
