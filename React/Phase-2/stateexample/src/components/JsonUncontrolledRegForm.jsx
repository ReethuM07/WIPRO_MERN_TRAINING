import { useRef, useState } from "react";

function JsonUncontrolledRegForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Registration done (Uncontrolled)");
    e.target.reset();
  };

  return (
    <div>
      <h3>Uncontrolled Registration Form</h3>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} placeholder="Email" />
        <input type="password" ref={passwordRef} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default JsonUncontrolledRegForm;