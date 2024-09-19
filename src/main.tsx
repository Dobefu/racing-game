import "../config.ts"
import App from "./App.tsx"
import "./style.css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
