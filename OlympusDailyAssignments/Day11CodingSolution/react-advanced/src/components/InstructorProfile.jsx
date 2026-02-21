export default function InstructorProfile({ instructorId }) {
  return (
    <div className="card p-3 mt-3">
      <h4>Instructor Profile</h4>
      <p>Instructor ID: {instructorId}</p>
      <p>Senior React Instructor with 10+ years experience.</p>
    </div>
  );
}
