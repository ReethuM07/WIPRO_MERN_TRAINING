import { useRef, useState } from "react";

function RegistrationForm() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let newErrors = {};

    const nameRegex = /^[A-Za-z]+$/;
    if (!firstName) newErrors.firstName = "First name is required";
    else if (!nameRegex.test(firstName))
      newErrors.firstName = "Only alphabets allowed";

    if (!lastName) newErrors.lastName = "Last name is required";
    else if (!nameRegex.test(lastName))
      newErrors.lastName = "Only alphabets allowed";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email))
      newErrors.email = "Invalid email format";

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Min 8 chars, uppercase, lowercase, number & special char required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("");
      return;
    }

    setErrors({});
    setStatus("Registration Successful ✅");
  };

  return (
    <div className="card p-4 shadow">
      <h3 className="text-center mb-3">User Registration Form</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            ref={firstNameRef}
            className="form-control"
            placeholder="First Name"
          />
          <small className="text-danger">{errors.firstName}</small>
        </div>

        <div className="mb-3">
          <input
            ref={lastNameRef}
            className="form-control"
            placeholder="Last Name"
          />
          <small className="text-danger">{errors.lastName}</small>
        </div>

        <div className="mb-3">
          <input
            ref={emailRef}
            className="form-control"
            placeholder="Email"
          />
          <small className="text-danger">{errors.email}</small>
        </div>

        <div className="mb-3">
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <small className="text-danger">{errors.password}</small>
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Register
        </button>
      </form>

      {status && (
        <div className="alert alert-success mt-3 text-center">
          {status}
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;
