import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addBook } from "../flux/BookActions";
import { useNavigate } from "react-router-dom";

const BookSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
});

function AddBook() {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h3>Add New Book</h3>

      <Formik
        initialValues={{ title: "", author: "", price: "" }}
        validationSchema={BookSchema}
        onSubmit={async (values, { resetForm }) => {
          const newBook = {
            id: Date.now(),
            title: values.title,
            author: values.author,
            price: Number(values.price)
          };

          try {
            await fetch("http://localhost:3001/books", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newBook)
            });

            addBook(newBook);
            resetForm();
            navigate("/home");
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Form>
          <div className="mb-2">
            <Field className="form-control" name="title" placeholder="Title" />
            <div className="text-danger">
              <ErrorMessage name="title" />
            </div>
          </div>

          <div className="mb-2">
            <Field className="form-control" name="author" placeholder="Author" />
            <div className="text-danger">
              <ErrorMessage name="author" />
            </div>
          </div>

          <div className="mb-3">
            <Field className="form-control" name="price" placeholder="Price" />
            <div className="text-danger">
              <ErrorMessage name="price" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default AddBook;
