import React from 'react'
import { FaRupeeSign } from "react-icons/fa";

function Product(props) {
  return (
    <div>
     
        <p>{props.productname}</p>
        <div className='relative'>
        <p>Price : <FaRupeeSign className='absolute'/><span>{props.productprice} </span></p>
    </div>
    <button className="bg-blue-500 text-white px-3 py-2 mt-2 rounded hover: cursor-pointer" onClick={props.Buy}>Buy</button>
    </div>
  )
}

export default Product

