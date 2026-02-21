export default function Loader({ message = "Loading..." }) {
  return (
    <div className="text-center mt-4">
      <div className="spinner-border text-primary" />
      <p className="mt-2 fw-semibold">{message}</p>
    </div>
  );
}
