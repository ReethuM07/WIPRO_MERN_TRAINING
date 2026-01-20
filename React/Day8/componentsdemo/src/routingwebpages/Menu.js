import React from 'react'
import { NavLink } from "react-router-dom";


function Menu(){

    return (
      <div>
        <h3>Link Tag</h3>
        <ul type="">
          <li><NavLink to = "/">Home</NavLink></li>
          <li><NavLink to = "/about">About Us</NavLink></li>
          <li><NavLink to = "/contact">Contact Us </NavLink></li>
        
        </ul>

        <h4>Anchor Tag</h4>
        <a href= "/"> Home</a>&nbsp;&nbsp;&nbsp;
        <a href= "/about">About Us</a>&nbsp;&nbsp;&nbsp;
        <a href = "/contact">Contact Us </a>&nbsp;&nbsp;&nbsp;
      </div>
    )
  }


export default Menu
