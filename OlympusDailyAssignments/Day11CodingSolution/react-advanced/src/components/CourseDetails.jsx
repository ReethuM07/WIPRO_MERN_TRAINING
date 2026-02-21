export default function CourseDetails({ courseId }) {
  return (
    <div className="card p-3 mt-3">
      <h4>Course Details</h4>
      <p>Course ID: {courseId}</p>
      <p>Advanced React concepts with performance optimization.</p>
    </div>
  );
}
