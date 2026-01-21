import React from 'react'
import { useState } from 'react';

function EmployeeCounter() {

    //Here in a state you are setting an initial value as 10 fter that you can set or get the value from useState
    const [getCount, setCount] = useState(10);
    //useState : It is used to store the content and get the content. basically it is state management which is dynamic
  return (
    //It will return or render HTML code and its a jsx file where we html + js code and internally

    //To check Tailwind we can apply tailwind class name. here the class name should be className keyword 
    // because in js there is already class exist as a keyword exist
    <div className="bg-amber-400 p-6 rounded shadow w-80 text-center">
     
      <h1 className = 'text-2xl font-bold mb-4'>Employee Count</h1>
      
      {/* getCount is dynamic so we have to specify in {} even styling, obj, props it is in{} */}
      The value of counter available is : <p className='text-3xl mb-6'>{getCount}</p>
      
      <div className='flex gap-0.5'>
      <button className = "bg-red-700 text-white px-4 py-2 rounded hover: cursor-pointer" onClick={() => setCount(getCount+1)}>Add Employee</button>
      <button className = "bg-red-700 text-white px-4 py-2 rounded hover: cursor-pointer" onClick={() => setCount(getCount-1)}>Removing Employee</button>
    </div>
    </div>
  )
}

export default EmployeeCounter
