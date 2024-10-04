import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="bg-gray-300 text-gray-800">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
