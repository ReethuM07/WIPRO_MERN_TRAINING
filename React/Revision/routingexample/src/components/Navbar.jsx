import React from 'react'
import  Link  from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav style = {{padding: "10px" ,background: "#eee"}}>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/contact">Contact</Link>
        
        </nav>
    </div>
  )
}

export default Navbar
