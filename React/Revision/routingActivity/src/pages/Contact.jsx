function Contact() {
  return (
    <div className="container-fluid mt-5">
      <div className="row justify-content-center">
        <div className="col-11 col-md-8 col-lg-6">
          <h2>Contact Us</h2>

          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="4"></textarea>
            </div>

            <button className="btn btn-success w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
