import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/ProductList";
import AddProductForm from "./components/AddProductForm";
import { lazy, Suspense } from "react";

const ProductDetail = lazy(() =>
  import("./components/ProductDetail")
);

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="container mt-4">
          <h2 className="text-center mb-4">Product Dashboard</h2>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<Suspense fallback={<p>Loading product...</p>}><ProductDetail /></Suspense>}/>
            <Route path="/add" element={<AddProductForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;






