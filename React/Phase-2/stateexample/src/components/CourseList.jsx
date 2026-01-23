import { useEffect, useState } from "react";
const API_URL = "http://localhost:3000/courses";
function CourseList() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setCourses(data);
  };
 
  const addCourse = async () => {
    const newCourse = { name, duration };
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    });
    fetchCourses();
    setName("");
    setDuration("");
  };
 
  const updateCourse = async (id) => {
  const courseToUpdate = courses.find((c) => c.id === id);
  if (!courseToUpdate) {
    console.error("Course not found");
    return;
  }
  await fetch(`http://localhost:3001/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...courseToUpdate,
      duration: "40 hrs",
    }),
  });
  fetchCourses();
};

  
  const deleteCourse = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    fetchCourses();
  };
  return (
    <div>
      <h2>Course Management</h2>
      <input
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <button onClick={addCourse}>Add Course</button>
      <hr />
      {courses.map((course) => (
        <div key={course.id}>
          <b>{course.name}</b> - {course.duration}
          <button onClick={() => updateCourse(course.id)}>Update</button>
          <button onClick={() => deleteCourse(course.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
export default CourseList;