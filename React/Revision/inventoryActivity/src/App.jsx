import InventoryCounter from "./components/InventoryCounter";
import "./App.css";

function App() {
  return (
    <>
      <h2 className="text-xl text-center mt-6">
        Manager Inventory Screen
      </h2>

      <div className="flex justify-center mt-6">
        <InventoryCounter />
      </div>
    </>
  );
}

export default App;
