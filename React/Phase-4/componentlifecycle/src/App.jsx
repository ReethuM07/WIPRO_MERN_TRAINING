import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { Suspense, lazy } from "react";
const Dashboard = lazy(() => {
  console.log(" Importing Dashboard...");
  return import("./components/Dashboard");
});
function App() {
  const [show, setShow] = useState(false);
  return (
    <>
    <div>
      <button onClick={() => setShow(true)}>
        Load Dashboard
      </button>
      {show && (
        <Suspense fallback={<h2>Loading Dashboard...</h2>}>
          <Dashboard />
        </Suspense>
      )}
      </div>


      <div>
        {/* <Employee2/> */}
        <button onClick={() => setShow(!show)}>
        {show ? "Hide Notifications" : "Show Notifications"}
        </button>
        {show && <NotificationPanel />}
    </div>
    </>
  );
}
export default App;




