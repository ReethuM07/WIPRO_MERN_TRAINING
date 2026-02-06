import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    price: "",
    category: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    price: Yup.number().required("Price required").positive(),
    category: Yup.string().required("Category required"),
  });

  const onSubmit = (values, { resetForm }) => {
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        addProduct(data);
        resetForm();
        navigate("/");
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Product</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-3">
            <label>Name</label>
            <Field name="name" className="form-control" />
            <ErrorMessage name="name" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <Field name="price" className="form-control" />
            <ErrorMessage name="price" className="text-danger" />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <Field name="category" className="form-control" />
            <ErrorMessage name="category" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddProduct;
