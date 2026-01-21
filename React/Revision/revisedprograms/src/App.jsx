import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import EmployeeCounter from './components/EmployeeCounter'

import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
     <p className = "read-the-docs">
          Content from App.jsx
        </p>
        <EmployeeCounter />

        
    </>
  )
}

export default App
