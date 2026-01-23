import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ControlledRegisterationForm from './components/ControlledRegisterationForm'
import UncontrolledRegisterationForm from './components/UncontrolledRegisterationForm'
import JsonRegistrationForm from './components/JsonRegistrationForm'
import JsonUncontrolledRegForm from './components/JsonUncontrolledRegForm'
import CourseList from './components/CourseList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ControlledRegisterationForm />
      <br></br>
      <UncontrolledRegisterationForm/> */}

      <JsonRegistrationForm/>
      <CourseList />
      
      {/* <JsonUncontrolledRegForm /> */}
    </>
  )
}

export default App
