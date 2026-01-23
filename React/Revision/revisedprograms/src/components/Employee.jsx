import React from "react";

function Employee({ name, role }) {

  const handlePromotion = () => {
    alert(`${name} has been promoted!`);
  };

  return (
    <div className="max-w-sm mx-auto my-4 p-4 border rounded-lg shadow-md bg-white">
      
      <p className="text-lg font-semibold text-gray-800">
        Name: <span className="font-normal">{name}</span>
      </p>

      <p className="text-md text-gray-600 mt-1">
        Role: <span className="font-medium">{role}</span>
      </p>

      <button
        type="button"
        onClick={handlePromotion}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded-md 
                   hover:bg-blue-700 transition duration-300"
      >
        Promote
      </button>
    </div>
  );
}

export default Employee;
