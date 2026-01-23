import { useParams } from "react-router-dom";

function Category() {
  const { name } = useParams();

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="mt-3">Products under {name}</p>
    </div>
  );
}

export default Category;
