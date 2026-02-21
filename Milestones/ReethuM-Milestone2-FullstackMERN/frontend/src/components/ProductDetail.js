import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("Error loading product");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>₹{product.price}</p>
        <p>{product.category}</p>

        <button className="btn btn-secondary mt-3"onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
}

export default ProductDetail;

