import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3 className="text-center">Loading...</h3>;
  if (error) return <h3 className="text-danger text-center">{error}</h3>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product List</h2>

      {products.map((product) => (
        <div key={product.id} className="card mb-3">
          <div className="card-body">
            <h5>{product.name}</h5>
            <p>₹ {product.price}</p>

            <Link
              to={`/products/${product.id}`}
              className="btn btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
