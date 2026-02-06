import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

function ProductList() {
  const { products } = useContext(ProductContext);

  return (
    <div className="container mt-4">
      <h2>Product List</h2>

      <Link to="/add" className="btn btn-success mb-3">
        Add Product
      </Link>

      {products.map((p) => (
        <div key={p.id} className="card mb-3">
          <div className="card-body">
            <h5>{p.name}</h5>
            <p>₹ {p.price}</p>
            <p>{p.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
