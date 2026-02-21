import { Suspense, useState, lazy } from "react";
import Loader from "./components/Loader";
import Dashboard from "./pages/Dashboard";
import Shop from "./pages/Shop";
import ExampleWithModal from "./pages/ExampleWithModal";

// const CourseDetails = lazy(() => import("./components/CourseDetails"));
// const InstructorProfile = lazy(() => import("./components/InstructorProfile"));

const lazyWithDelay = (importFn, delay = 2500) => {
  return lazy(() =>
    Promise.all([
      importFn(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([module]) => module)
  );
};

const CourseDetails = lazyWithDelay(
  () => import("./components/CourseDetails"),
  500
);

const InstructorProfile = lazyWithDelay(
  () => import("./components/InstructorProfile"),
  500
);


export default function App() {
  const [showCourse, setShowCourse] = useState(false);
  const [showInstructor, setShowInstructor] = useState(false);

  return (
    <div className="container py-4">
      <header className="bg-primary text-white text-center p-3 rounded mb-4">
        <h2>Online Learning Platform</h2>
      </header>

      <button
        className="btn btn-outline-primary me-2"
        onClick={() => setShowCourse(prev => !prev)}
      >
        Toggle Course Details
      </button>

      <button
        className="btn btn-outline-secondary"
        onClick={() => setShowInstructor(prev => !prev)}
      >
        Toggle Instructor
      </button>

      {showCourse && (
        <Suspense fallback={<Loader message="Loading Course Details..." />}>
          <CourseDetails courseId={1} />
        </Suspense>
      )}

      {showInstructor && (
        <Suspense fallback={<Loader message="Loading Instructor Profile..." />}>
          <InstructorProfile instructorId={2} />
        </Suspense>
      )}

      <hr />
      <Dashboard />
      <hr />
      <Shop />
      <hr />
      <ExampleWithModal />
    </div>
  );
}
