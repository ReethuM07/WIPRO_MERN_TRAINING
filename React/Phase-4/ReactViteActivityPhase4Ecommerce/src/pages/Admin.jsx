import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API = "http://localhost:5000/products";

function Admin() {
  const [products, setProducts] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const handleSubmit = async (values, { resetForm }) => {
    const method = editItem ? "PUT" : "POST";
    const url = editItem ? `${API}/${editItem.id}` : API;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        price: Number(values.price),
      }),
    });

    resetForm();
    setEditItem(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-end max-w-md mx-auto mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Admin Panel</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mb-8">
        <Formik
          enableReinitialize
          initialValues={{
            name: editItem?.name || "",
            price: editItem?.price || "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            price: Yup.number().required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-3">
            <Field name="name" placeholder="Product Name" className="w-full border p-2 rounded" />
            <Field name="price" placeholder="Price" className="w-full border p-2 rounded" />
            <button className="w-full bg-blue-600 text-white py-2 rounded">
              {editItem ? "Update" : "Add"} Product
            </button>
          </Form>
        </Formik>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p>₹{p.price}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditItem(p)} className="bg-yellow-500 px-3 py-1 text-white rounded">Edit</button>
              <button onClick={() => deleteProduct(p.id)} className="bg-red-500 px-3 py-1 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
