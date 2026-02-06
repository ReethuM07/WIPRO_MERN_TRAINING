import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
