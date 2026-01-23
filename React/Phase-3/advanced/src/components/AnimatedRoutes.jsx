import React from 'react'
import {Routes ,Route , useLocation} from "react-router-dom"
import{CSSTransition, TransitionGroup} from 'react-transition-group'
import {useRef} from "react"
import Home from '../pages/Home'
import Employee from '../pages/Employee'
import Courses from '../pages/Courses'
import Admin from '../pages/Admin'
import withAuth from '../hoc/withAuth'
function AnimatedRoutes() {
    const location = useLocation(); 
    const nodeRef = useRef(null);
  return (
    <div>
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={300} nodeRef ={nodeRef}>
            <div ref={nodeRef}>
            <Routes location={location}>
                <Route path="/" element ={<Home />}/>
                <Route path="/employees" element ={<Employee/>}/>
                <Route path="/courses" element ={<Courses/>}/>
                <Route path="/admin" element ={<Admin/>}/>

            </Routes>
            </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
export default AnimatedRoutes
//use Ref we have used to remember the DOM Element :
// because when transition tries to animate , then it won't find dom element so react throws an transition error