import {Component} from "react";
import {ProductContext} from "../context/ProductContext";
import ProductCard from "./ProductCard";
import {Link} from "react-router-dom";

class ProductList extends Component {
  static contextType = ProductContext;
  render() {
    const { products } = this.context;
    return (
      <>
        <Link to="/add" className="btn btn-success mb-3">Add Product</Link>
        <div className="row">
          {products.map(p => (
            <div className="col-md-4 mb-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default ProductList;
