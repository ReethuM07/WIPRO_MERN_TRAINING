import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ProductContext } from "../context/ProductContext";

function AddProductForm() {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ name: "", price: "", category: "", description: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        price: Yup.number().required("Required"),
        category: Yup.string().required("Required"),
        description: Yup.string().required("Required")
      })}
      onSubmit={(values, { resetForm }) => {
        fetch("http://localhost:5000/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
          .then(res => res.json())
          .then(data => {
            setProducts([...products, data]);
            resetForm();
            alert("Product added successfully");
          });
      }}>
      <Form>
      
        <Field name="name" className="form-control mb-2" placeholder="Name" />
        <ErrorMessage name="name" component="div" className="text-danger" />

        <Field name="price" className="form-control mb-2" placeholder="Price" />
        <ErrorMessage name="price" component="div" className="text-danger" />

        <Field name="category" className="form-control mb-2" placeholder="Category" />
        <ErrorMessage name="category" component="div" className="text-danger" />

        <Field name="description" className="form-control mb-2" placeholder="Description" />
        <ErrorMessage name="description" component="div" className="text-danger" />

        <button className="btn btn-primary">Add Product</button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
      </Form>
    </Formik>
  );
}

export default AddProductForm;
