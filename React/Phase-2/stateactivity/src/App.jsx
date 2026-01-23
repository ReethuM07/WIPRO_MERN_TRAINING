import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RegistrationForm from './components/RegisterationForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="container mt-5">
      <RegistrationForm />
    </div>
    </>
  )
}

export default App
