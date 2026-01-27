import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values) => {
            if (values.username === "Reethu" && values.password === "qwerty") {
              localStorage.setItem("admin", "true");
              navigate("/admin");
            } else {
              alert("Invalid credentials");
            }
          }}
        >
          <Form className="space-y-3">
            <div>
              <Field
                name="username"
                placeholder="Username"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AdminLogin;
