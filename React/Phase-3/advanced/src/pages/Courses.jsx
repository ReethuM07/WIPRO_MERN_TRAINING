import React from 'react'
import withAuth from '../hoc/withAuth'

function Courses() {
  return (
    <div>
      <h3>The courses details.</h3>
    </div>
  )
}

export default withAuth(Courses)