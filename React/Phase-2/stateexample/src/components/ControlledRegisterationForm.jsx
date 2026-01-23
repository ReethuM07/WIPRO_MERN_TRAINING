import { useState } from 'react'
import React from 'react'

function ControlledRegisterationForm() {

        const[getName, setName] = useState("")
        const[getEmail, setEmail] = useState("")

        const handleSubmit = (e) =>
        {
          e.preventDefault();
          alert(`Registeration Form Submitted : ${getName}, ${getEmail}`)
        }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <h2>User Registeration Form</h2>
        <input type="text" placeholder="Enter Name" value={getName} onChange={(e) => setName(e.target.value)}/>
        <input type="email" placeholder="Enter email" value={getEmail} onChange={(e) => setEmail(e.target.value)}/>
        <button>Submit</button>


      </form>
    </div>
  )
}

export default ControlledRegisterationForm
