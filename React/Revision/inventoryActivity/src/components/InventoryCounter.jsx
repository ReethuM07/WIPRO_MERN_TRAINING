import React from "react";
import { useState } from "react";

function InventoryCounter() {

  // Inventory stock starts from 0
  const [stock, setStock] = useState(0);

  return (
    <div className="bg-green-300 p-6 rounded shadow w-80 text-center">
      
      <h1 className="text-2xl font-bold mb-4">
        Inventory Stock
      </h1>

      <p className="text-lg mb-2">
        Available Stock:
      </p>

      <p className="text-3xl font-bold mb-6">
        {stock}
      </p>

      <div className="flex gap-2 justify-center">
        
        {/* Add Stock */}
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:cursor-pointer"
          onClick={() => setStock(stock + 1)}
        >
          Add Stock
        </button>

        {/* Remove Stock */}
        <button
          className="bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setStock(stock - 1)}
          disabled={stock === 0}
        >
          Remove Stock
        </button>

      </div>
    </div>
  );
}

export default InventoryCounter;
