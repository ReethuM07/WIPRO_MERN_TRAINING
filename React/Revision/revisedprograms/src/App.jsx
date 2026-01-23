import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import EmployeeCounter from './components/EmployeeCounter'
import ProductList from './components/ProductList'
import EmployeeList from './components/EmployeeList'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <div>
     <p className = "read-the-docs">
          Content from App.jsx
        </p>
        <EmployeeCounter />
        <div>
      <h1>Product Listing</h1>
      <ProductList />
        </div>


        <div>
          <h1>Employee List</h1>
          <EmployeeList />
        </div>
    </div>
    
    </>
  )
}

export default App
