import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'


function UncontrolledRegisterationForm() {

    const usernameRef = useRef();

    const passwordRef = useRef();

    const handleSubmit = (e) =>
        {
          e.preventDefault();
          alert("Value : " +usernameRef.current.value +" , "+passwordRef.current.value)
        }

  return (
    <div>
      
       <form>

        <h2>User Registeration Form</h2>

        <input ref = {usernameRef} />
        <input ref = {passwordRef} />

        

        <button onClick = {handleSubmit}>Submit</button>


      </form>
    </div>
  )
}

export default UncontrolledRegisterationForm
