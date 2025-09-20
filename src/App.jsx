import { useState } from 'react'
import AppRouter from './config/routing/router'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppRouter/>
    </>
  )
}

export default App
