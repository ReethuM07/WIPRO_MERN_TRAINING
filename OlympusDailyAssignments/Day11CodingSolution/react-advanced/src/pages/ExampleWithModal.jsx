import { useState } from "react";
import Modal from "../components/Modal";

export default function ExampleWithModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>Portal Modal Example</h2>
      <button className="btn btn-success" onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h4>Modal Title</h4>
        <p>This modal is rendered via a portal(outside main DOM).</p>
      </Modal>
    </div>
  );
}
