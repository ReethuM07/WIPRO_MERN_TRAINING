import InventoryCard from "./InventoryCard";

function InventoryList() {
  const products = [
    { id: 1, name: "Computer", price: 99000, category: "Electronics" },
    { id: 2, name: "Sofa", price: 25000, category: "Furniture" },
    { id: 3, name: "Pen", price: 120, category: "Stationery" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Inventory Catalog</h2>

      <div className="row">
        {products.map((product) => (
          <InventoryCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
}

export default InventoryList;
