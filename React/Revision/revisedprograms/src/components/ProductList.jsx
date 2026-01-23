import React from 'react'
import Product from './Product'

function ProductList() {
    const handlerBuy = (productName) => {
        alert(productName + " added to a cart")
    }

  return (
    <div className='bg-fuchsia-100 p-4 rounded-lg'>
      <Product productname = "Laptop" productprice = {70000} Buy={() => handlerBuy("Laptop")} />
      <Product productname = "Mouse" productprice = {700} Buy={() => handlerBuy("Mouse")} />
      <Product productname = "Keyboard" productprice = {7000} Buy={() => handlerBuy("Keyboard")}/>
        
    </div>
  )
}

export default ProductList
