export default function BrokenProductCard({ product }) {
  if (product.shouldThrow) {
    throw new Error("BrokenProductCard crashed intentionally");
  }

  return (
    <div className="card p-3">
      <h4>{product.name}</h4>
      <p>Product loaded successfully.</p>
    </div>
  );
}
