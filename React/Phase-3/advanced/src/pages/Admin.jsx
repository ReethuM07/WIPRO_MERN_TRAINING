import React from 'react'
import withAuth from '../hoc/withAuth'

function Admin() {
  return (
    <div>
      <h3>Admin Dashbord</h3>
    </div>
  )
}

export default withAuth(Admin)